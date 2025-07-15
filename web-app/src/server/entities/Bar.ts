import { z } from "zod";

export const BarSchema = z.object({
  id: z.string(),
  sheetId: z.string(),
  index: z.number().int(),
  beatCount: z.number().int().positive(),
  beatDuration: z.string(), // e.g., '1/4'
});

export type Bar = z.infer<typeof BarSchema>;
