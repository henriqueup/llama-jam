import { Redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { ZodError } from "zod";
import { BadRequestError } from "~/server/errors";
import { formatZodError } from "./zod";

function isRedirect(error: unknown): error is Redirect {
  return (error as Redirect).statusCode !== undefined;
}

export function parseErrorMessage(error: Error | Redirect) {
  if (isRedirect(error)) return null;

  if (error instanceof BadRequestError || error.name === "BadRequestError") {
    return error.message;
  }
  if (error instanceof ZodError || error.name === "ZodError") {
    return formatZodError(error as ZodError);
  }

  const defaultErrorMessage = "An unexpected error occurred.";
  toast.error(error.message || defaultErrorMessage);

  return defaultErrorMessage;
}
