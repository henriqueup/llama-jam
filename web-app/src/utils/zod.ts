import { ZodError } from "zod";

export function formatZodError(error: ZodError): string {
  return error.errors.map((e) => e.message).join("\n");
}

