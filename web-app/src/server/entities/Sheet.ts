import { z } from "zod";

export const SheetSchema = z.object({
  id: z.string(),
  songId: z.string(),
  instrumentId: z.string(),
});

export type Sheet = z.infer<typeof SheetSchema>;
