import type { User } from "../entities/User";
import { SqliteUserRepository } from "../repositories/Sqlite/SqliteUserRepository";
import bcrypt from "bcrypt";

export interface IUserService {
  createUser(user: Omit<User, "id" | "passwordHash"> & { password?: string }): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}

export class UserService implements IUserService {
  constructor(private userRepository = new SqliteUserRepository()) {}

  async createUser(user: Omit<User, "id" | "passwordHash"> & { password?: string }): Promise<User> {
    if (!user.password) {
      throw new Error("Password is required");
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    return this.userRepository.create({ email: user.email, passwordHash });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
