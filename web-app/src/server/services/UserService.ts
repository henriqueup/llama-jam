import bcrypt from "bcrypt";
import type { User } from "../entities/User";
import { EmailSchema, PasswordSchema } from "../entities/User";
import { SqliteUserRepository } from "../repositories/Sqlite/SqliteUserRepository";

export interface IUserService {
  createUser(
    user: Omit<User, "id" | "passwordHash"> & { password?: string }
  ): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}

export class UserService implements IUserService {
  constructor(private userRepository = new SqliteUserRepository()) {}

  async createUser(
    user: Omit<User, "id" | "passwordHash"> & { password?: string }
  ): Promise<User> {
    const email = EmailSchema.parse(user.email);
    const password = PasswordSchema.parse(user.password);

    const passwordHash = await bcrypt.hash(password, 10);
    return this.userRepository.create({
      email,
      passwordHash,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    EmailSchema.parse(email);
    return this.userRepository.findByEmail(email);
  }
}
