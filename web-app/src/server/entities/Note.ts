import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string(),
  barId: z.string(),
  trackIndex: z.number().int().nonnegative(),
  pitch: z.string().nullable(),
  duration: z.string(), // e.g., '1/4'
  startTime: z.string(), // e.g., '1/4'
});

export type Note = z.infer<typeof NoteSchema>;
