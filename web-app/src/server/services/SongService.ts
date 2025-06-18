import type { Song } from "../entities/Song";

export interface ISongService {
  createSong(song: Omit<Song, "id">): Promise<Song>;
  getSongById(id: string): Promise<Song | null>;
  getSongsByUserId(userId: string): Promise<Song[]>;
  updateSong(id: string, song: Partial<Omit<Song, "id">>): Promise<Song>;
  deleteSong(id: string): Promise<void>;
}

export class SongService implements ISongService {
  async createSong(song: Omit<Song, "id">): Promise<Song> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async getSongById(id: string): Promise<Song | null> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async getSongsByUserId(userId: string): Promise<Song[]> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async updateSong(id: string, song: Partial<Omit<Song, "id">>): Promise<Song> {
    // Implementation to be added
    throw new Error("Not implemented");
  }

  async deleteSong(id: string): Promise<void> {
    // Implementation to be added
    throw new Error("Not implemented");
  }
}
