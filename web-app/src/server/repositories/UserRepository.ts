import type { User } from "../entities/User";

export interface IUserRepository {
  create(user: Omit<User, "id" | "passwordHash"> & { passwordHash: string }): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
