import type { Song } from "../entities/Song";

export interface ISongRepository {
  create(song: Omit<Song, "id">): Promise<Song>;
  findById(id: string): Promise<Song | null>;
  findByUserId(userId: string): Promise<Song[]>;
  update(id: string, song: Partial<Omit<Song, "id">>): Promise<Song>;
  delete(id: string): Promise<void>;
}
