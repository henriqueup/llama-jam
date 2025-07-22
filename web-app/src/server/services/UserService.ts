import bcrypt from "bcrypt";
import type { User, UserResponse } from "../entities/User";
import { EmailSchema, PasswordSchema } from "../entities/User";
import { BadRequestError } from "../errors";
import { SqliteUserRepository } from "../repositories/Sqlite/SqliteUserRepository";

export interface IUserService {
  createUser(
    user: Omit<User, "id" | "passwordHash"> & { password?: string }
  ): Promise<UserResponse>;
  getUserById(id: string): Promise<UserResponse | null>;
  authenticateUser(email: string, password: string): Promise<UserResponse>;
}

export class UserService implements IUserService {
  constructor(private userRepository = new SqliteUserRepository()) {}

  async createUser(
    user: Omit<User, "id" | "passwordHash"> & { password?: string }
  ): Promise<UserResponse> {
    const email = EmailSchema.parse(user.email);
    const password = PasswordSchema.parse(user.password);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
      email,
      passwordHash,
    });

    return this.omitPasswordHash(newUser);
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findById(id);
    return this.omitPasswordHash(user);
  }

  async authenticateUser(
    email: string,
    password: string
  ): Promise<UserResponse> {
    EmailSchema.parse(email);
    PasswordSchema.parse(password);

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new BadRequestError("Invalid email or password");

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) throw new BadRequestError("Invalid email or password");

    return this.omitPasswordHash(user);
  }

  private omitPasswordHash(user: null): null;
  private omitPasswordHash(user: User): UserResponse;
  private omitPasswordHash(user: User | null): UserResponse | null;
  private omitPasswordHash(user: User | null): UserResponse | null {
    if (!user) return null;
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
