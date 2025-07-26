import { nanoid } from "nanoid";
import { getDatabase } from "../../db/config";
import { Session, SessionSchema } from "../../entities/Session";
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

    return SessionSchema.parse(newSession);
  }

  async getSession(sessionId: string): Promise<Session | null> {
    const stmt = this.db.prepare(
      "SELECT id, user_id as userId, created_at as createdAt, expires_at as expiresAt FROM sessions WHERE id = ?"
    );
    const result = stmt.get(sessionId) as Session | undefined;
    if (!result) return null;

    return SessionSchema.parse(result);
  }

  async deleteSession(sessionId: string): Promise<void> {
    const stmt = this.db.prepare("DELETE FROM sessions WHERE id = ?");
    stmt.run(sessionId);
  }
}
