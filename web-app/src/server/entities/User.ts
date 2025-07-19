import { z } from "zod";

export const EmailSchema = z
  .string()
  .email({ message: "Invalid email address" })
  .refine((email) => email.trim().length > 0, {
    message: "Email cannot be empty",
  });

export const PasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  });

export const UserSchema = z.object({
  id: z.string(),
  email: EmailSchema,
  passwordHash: z.string(),
});

export type User = z.infer<typeof UserSchema>;
