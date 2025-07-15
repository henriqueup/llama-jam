import { getDatabase } from "../db/config";
import type { User } from "../entities/User";
import type { IUserRepository } from "./UserRepository";
import { nanoid } from "nanoid";

export class SqliteUserRepository implements IUserRepository {
  private db = getDatabase();

  async create(user: Omit<User, "id">): Promise<User> {
    const newUser = {
      id: nanoid(),
      ...user,
    };

    const stmt = this.db.prepare(
      "INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)"
    );
    stmt.run(newUser.id, newUser.email, newUser.passwordHash);

    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
    const result = stmt.get(id) as User | undefined;
    return result ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const stmt = this.db.prepare("SELECT * FROM users WHERE email = ?");
    const result = stmt.get(email) as User | undefined;
    return result ?? null;
  }
}
