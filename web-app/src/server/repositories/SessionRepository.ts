import { Session } from "../entities/Session";

export interface SessionRepository {
  createSession(userId: string): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  deleteSession(sessionId: string): Promise<void>;
}
