import { nanoid } from "nanoid";
import { getDatabase } from "~/server/db/config";
import { User, UserSchema } from "~/server/entities/User";
import { IUserRepository } from "../UserRepository";

export class SqliteUserRepository implements IUserRepository {
  private db = getDatabase();

  async create(user: Omit<User, "id">): Promise<User | null> {
    const newUser = {
      id: nanoid(),
      ...user,
    };

    const stmt = this.db.prepare(
      "INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)"
    );

    try {
      stmt.run(newUser.id, newUser.email, newUser.passwordHash);
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return null;
      }
      throw error;
    }

    return UserSchema.parse(newUser);
  }

  async findById(id: string): Promise<User | null> {
    const stmt = this.db.prepare(
      "SELECT id, email, password_hash as passwordHash FROM users WHERE id = ?"
    );
    const result = stmt.get(id) as User | undefined;
    if (!result) return null;

    return UserSchema.parse(result);
  }

  async findByEmail(email: string): Promise<User | null> {
    const stmt = this.db.prepare(
      "SELECT id, email, password_hash as passwordHash FROM users WHERE email = ?"
    );
    const result = stmt.get(email) as User | undefined;
    if (!result) return null;

    return UserSchema.parse(result);
  }
}
