import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.number(),
  expiresAt: z.number(),
});

export type Session = z.infer<typeof SessionSchema>;