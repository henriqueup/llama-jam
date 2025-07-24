import { createServerFn } from "@tanstack/react-start";
import { BadRequestError } from "../errors";
import { errorHandlingMiddleware, loggingMiddleware } from "../middleware";
import { SessionService } from "../services/SessionService";
import { UserService } from "../services/UserService";
import { createSession, deleteSession, parseSession } from "../utils/session";

export const registerUser = createServerFn({ method: "POST" })
  .middleware([loggingMiddleware, errorHandlingMiddleware])
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new BadRequestError("Invalid data format");
    }

    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password)
      throw new BadRequestError("Email and password are required");

    return {
      email: email.toString(),
      password: password.toString(),
    };
  })
  .handler(async ({ data: { email, password } }) => {
    const userService = new UserService();
    const user = await userService.createUser({ email, password });

    createSession(user.id);
    return { id: user.id, email: user.email };
  });

export const loginUser = createServerFn({ method: "POST" })
  .middleware([loggingMiddleware, errorHandlingMiddleware])
  .validator((data) => {
    if (!(data instanceof FormData)) {
      throw new BadRequestError("Invalid data format");
    }

    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password)
      throw new BadRequestError("Email and password are required");

    return {
      email: email.toString(),
      password: password.toString(),
    };
  })
  .handler(async ({ data: { email, password } }) => {
    const userService = new UserService();
    const user = await userService.authenticateUser(email, password);

    createSession(user.id);
    return { id: user.id, email: user.email };
  });

export const getCurrentUser = createServerFn({ method: "GET" })
  .middleware([loggingMiddleware, errorHandlingMiddleware])
  .handler(async () => {
    const sessionId = parseSession();
    if (!sessionId) return null;

    const sessionService = new SessionService();
    const user = await sessionService.getUserFromSession(sessionId);

    if (!user) {
      deleteSession();
      return null;
    }

    return user;
  });

export const logoutUser = createServerFn({ method: "POST" })
  .middleware([loggingMiddleware, errorHandlingMiddleware])
  .handler(async () => {
    const sessionId = parseSession();
    if (!sessionId) return;

    const sessionService = new SessionService();
    await sessionService.deleteSession(sessionId);

    deleteSession();
  });
