import { Session } from "../entities/Session";

export type CreateSession = Omit<Session, "id">;

export interface SessionRepository {
  createSession(session: CreateSession): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  deleteSession(sessionId: string): Promise<void>;
}
