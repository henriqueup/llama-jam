import { UserService } from "./UserService";
import { SqliteSessionRepository } from "../repositories/Sqlite/SqliteSessionRepository";
import { Session } from "../entities/Session";

export interface ISessionService {
  createSession(userId: string): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  getUserFromSession(sessionId: string): Promise<any | null>; // TODO: Define User type
  deleteSession(sessionId: string): Promise<void>;
}

export class SessionService implements ISessionService {
  constructor(private sessionRepository = new SqliteSessionRepository()) {}

  async createSession(userId: string) {
    return this.sessionRepository.createSession(userId);
  }

  async getSession(sessionId: string) {
    return this.sessionRepository.getSession(sessionId);
  }

  async getUserFromSession(sessionId: string) {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    const userService = new UserService();
    return await userService.getUserById(session.userId);
  }

  async deleteSession(sessionId: string) {
    return this.sessionRepository.deleteSession(sessionId);
  }
}
