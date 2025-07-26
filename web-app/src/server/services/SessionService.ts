import { Session } from "../entities/Session";
import { UserResponse } from "../entities/User";
import { SqliteSessionRepository } from "../repositories/Sqlite/SqliteSessionRepository";
import { UserService } from "./UserService";

export interface ISessionService {
  createSession(userId: string): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  getUserFromSession(sessionId: string): Promise<UserResponse | null>;
  deleteSession(sessionId: string): Promise<void>;
}

export class SessionService implements ISessionService {
  constructor(private sessionRepository = new SqliteSessionRepository()) {}

  async createSession(userId: string) {
    const createdAt = Date.now();
    const expiresAt = createdAt + 60 * 60 * 1000; // 1 hour in milliseconds

    return this.sessionRepository.createSession({
      userId,
      createdAt,
      expiresAt,
    });
  }

  async getSession(sessionId: string) {
    return this.sessionRepository.getSession(sessionId);
  }

  async getUserFromSession(sessionId: string) {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    if (session.expiresAt < Date.now()) {
      await this.deleteSession(sessionId);
      return null;
    }

    const userService = new UserService();
    return await userService.getUserById(session.userId);
  }

  async deleteSession(sessionId: string) {
    return this.sessionRepository.deleteSession(sessionId);
  }
}
