import type { User } from "../entities/User";

export interface IUserService {
  createUser(user: Omit<User, "id">): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}

export class UserService implements IUserService {
  async createUser(user: Omit<User, "id">): Promise<User> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async getUserById(id: string): Promise<User | null> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async getUserByEmail(email: string): Promise<User | null> {
    // Implementation to be added
    throw new Error("Not implemented");
  }
}
