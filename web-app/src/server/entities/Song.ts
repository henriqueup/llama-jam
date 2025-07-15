import { z } from "zod";

export const SongDifficulties = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

export const SongSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  difficulty: z.enum(SongDifficulties),
  tempo: z.number().int().positive(),
  userId: z.string(),
});

export type Song = z.infer<typeof SongSchema>;
