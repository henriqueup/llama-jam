import { createMiddleware, json } from "@tanstack/react-start";
import { ZodError } from "zod";
import { formatZodError } from "~/utils/zod";
import { BadRequestError } from "./errors";
import { SessionService } from "./services/SessionService";
import { parseSession } from "./utils/session";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    console.log("Request received:", data);
    const result = await next();
    console.log("Response processed:", result);
    return result;
  }
);

export const errorHandlingMiddleware = createMiddleware().server(
  async ({ next }) => {
    try {
      const result = await next();
      return result;
    } catch (error) {
      if (error instanceof BadRequestError) {
        console.error("Bad Request Error:", error.message);
        throw json(
          { name: error.name, message: error.message },
          { status: 400 }
        );
      } else if (error instanceof ZodError) {
        console.error("Validation Error:", error.errors);
        throw json(
          { name: error.name, message: formatZodError(error) },
          { status: 400 }
        );
      }

      throw error;
    }
  }
);

export const sessionRequiredMiddleware = createMiddleware().server(
  async ({ next }) => {
    const sessionId = parseSession();

    if (!sessionId) {
      throw json({}, { status: 401 });
    }

    const sessionService = new SessionService();
    const user = await sessionService.getUserFromSession(sessionId);

    if (!user) {
      throw json({}, { status: 401 });
    }

    return next({ context: { user } });
  }
);
