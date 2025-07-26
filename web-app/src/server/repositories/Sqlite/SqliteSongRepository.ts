
import { nanoid } from "nanoid";
import { getDatabase } from "~/server/db/config";
import { Song, SongSchema } from "~/server/entities/Song";
import { ISongRepository } from "../SongRepository";

export class SqliteSongRepository implements ISongRepository {
  private db = getDatabase();

  async create(song: Omit<Song, "id">): Promise<Song> {
    const newSong = {
      id: nanoid(),
      ...song,
    };

    const stmt = this.db.prepare(
      "INSERT INTO songs (id, title, artist, difficulty, tempo, user_id) VALUES (?, ?, ?, ?, ?, ?)"
    );

    stmt.run(newSong.id, newSong.title, newSong.artist, newSong.difficulty, newSong.tempo, newSong.userId);

    return SongSchema.parse(newSong);
  }

  async findById(id: string): Promise<Song | null> {
    const stmt = this.db.prepare(
      "SELECT id, title, artist, difficulty, tempo, user_id as userId FROM songs WHERE id = ?"
    );
    const result = stmt.get(id) as Song | undefined;
    if (!result) return null;

    return SongSchema.parse(result);
  }

  async findByUserId(userId: string): Promise<Song[]> {
    const stmt = this.db.prepare(
      "SELECT id, title, artist, difficulty, tempo, user_id as userId FROM songs WHERE user_id = ?"
    );
    const results = stmt.all(userId) as Song[];
    return results.map((song) => SongSchema.parse(song));
  }

  async update(id: string, song: Partial<Omit<Song, "id">>): Promise<Song> {
    const existingSong = await this.findById(id);
    if (!existingSong) {
      throw new Error("Song not found");
    }

    const updatedSong = { ...existingSong, ...song };

    const stmt = this.db.prepare(
      "UPDATE songs SET title = ?, artist = ?, difficulty = ?, tempo = ? WHERE id = ?"
    );

    stmt.run(updatedSong.title, updatedSong.artist, updatedSong.difficulty, updatedSong.tempo, id);

    return SongSchema.parse(updatedSong);
  }

  async delete(id: string): Promise<void> {
    const stmt = this.db.prepare("DELETE FROM songs WHERE id = ?");
    stmt.run(id);
  }
}
