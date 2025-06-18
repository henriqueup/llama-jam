import { z } from "zod";

export const InstrumentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["melodic", "percussion"]),
  trackCount: z.number().positive().int(),
  tuning: z.string().nullable(),
});

export type Instrument = z.infer<typeof InstrumentSchema>;
