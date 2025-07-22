import { createServerFn } from "@tanstack/react-start";
import { setHeader } from "@tanstack/react-start/server";
import bcrypt from "bcrypt";
import { BadRequestError } from "../errors";
import { errorHandlingMiddleware, loggingMiddleware } from "../middleware";
import { SessionService } from "../services/SessionService";
import { UserService } from "../services/UserService";

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
    const user = await userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid email or password");
    }

    createSession(user.id);
    return { id: user.id, email: user.email };
  });

async function createSession(userId: string) {
  const sessionService = new SessionService();
  const session = await sessionService.createSession(userId);

  setHeader("Set-Cookie", `session_id=${session.id}; HttpOnly; Path=/;`);
}
