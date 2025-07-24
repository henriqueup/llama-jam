import { createMiddleware, json } from "@tanstack/react-start";
import { ZodError } from "zod";
import { formatZodError } from "~/utils/zod";
import { BadRequestError } from "./errors";

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
