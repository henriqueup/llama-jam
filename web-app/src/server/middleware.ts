import { createMiddleware } from "@tanstack/react-start";
import { UnauthorizedError } from "./errors";
import { getCurrentUser } from "./utils/session";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    console.log("Request received:", data);
    const result = await next();
    console.log("Response processed:", result);
    return result;
  }
);

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError("Unauthorized");
  }
  return next({ context: { user } });
});
