import { SqliteSongRepository } from "../repositories/Sqlite/SqliteSongRepository";
import type { Song } from "../entities/Song";

export interface ISongService {
  createSong(song: Omit<Song, "id">): Promise<Song>;
  getSongById(id: string): Promise<Song | null>;
  getSongsByUserId(userId: string): Promise<Song[]>;
  updateSong(id: string, song: Partial<Omit<Song, "id">>): Promise<Song>;
  deleteSong(id: string): Promise<void>;
}

export class SongService implements ISongService {
  constructor(private songRepository: SqliteSongRepository) {}

  async createSong(song: Omit<Song, "id">): Promise<Song> {
    return this.songRepository.create(song);
  }

  async getSongById(id: string): Promise<Song | null> {
    return this.songRepository.findById(id);
  }

  async getSongsByUserId(userId: string): Promise<Song[]> {
    return this.songRepository.findByUserId(userId);
  }

  async updateSong(id: string, song: Partial<Omit<Song, "id">>): Promise<Song> {
    return this.songRepository.update(id, song);
  }

  async deleteSong(id: string): Promise<void> {
    return this.songRepository.delete(id);
  }
}
