import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Basic song schema
export const SongSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Song name is required"),
  artist: z.string().min(1, "Artist name is required"),
  createdAt: z.date().optional(),
});

// Song info schema (for listing)
export const SongInfoSchema = SongSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});

// Export types
export type Song = z.infer<typeof SongSchema>;
export type SongInfo = z.infer<typeof SongInfoSchema>;

/**
 * Create a new song
 */
export function createSong(name: string, artist: string, id?: string): Song {
  return {
    id: id || uuidv4(),
    name,
    artist,
  };
}
