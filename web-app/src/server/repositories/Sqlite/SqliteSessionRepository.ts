import { nanoid } from "nanoid";
import { getDatabase } from "../../db/config";
import { Session } from "../../entities/Session";
import { CreateSession, SessionRepository } from "../SessionRepository";

export class SqliteSessionRepository implements SessionRepository {
  private db = getDatabase();

  async createSession(session: CreateSession): Promise<Session> {
    const newSession = {
      id: nanoid(),
      ...session,
    };

    const stmt = this.db.prepare(
      "INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)"
    );
    stmt.run(
      newSession.id,
      newSession.userId,
      newSession.createdAt,
      newSession.expiresAt
    );

    return newSession;
  }

  async getSession(sessionId: string): Promise<Session | null> {
    const stmt = this.db.prepare("SELECT * FROM sessions WHERE id = ?");
    const result = stmt.get(sessionId) as Session | undefined;

    return result ?? null;
  }

  async deleteSession(sessionId: string): Promise<void> {
    const stmt = this.db.prepare("DELETE FROM sessions WHERE id = ?");
    stmt.run(sessionId);
  }
}
