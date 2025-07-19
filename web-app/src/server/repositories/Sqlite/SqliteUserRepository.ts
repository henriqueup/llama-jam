import { nanoid } from "nanoid";
import { getDatabase } from "~/server/db/config";
import { User } from "~/server/entities/User";
import { IUserRepository } from "../UserRepository";

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
