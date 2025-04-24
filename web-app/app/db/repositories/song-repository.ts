import { getDb, transaction } from '../../lib/db';
import { type Song, type SongInfo } from '../../lib/models/song';
import { v4 as uuidv4 } from 'uuid';

/**
 * Repository for Song entity
 */
export class SongRepository {
  /**
   * Create a new song
   */
  create(song: Song): string {
    const db = getDb();
    const id = song.id || uuidv4();
    
    try {
      const stmt = db.prepare(`
        INSERT INTO songs (id, name, artist)
        VALUES (?, ?, ?)
      `);
      
      stmt.run(id, song.name, song.artist);
      return id;
    } catch (error: any) {
      // Check for unique constraint violation
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error(`Song '${song.name} - ${song.artist}' already exists.`);
      }
      throw error;
    }
  }
  
  /**
   * Get a song by ID
   */
  get(id: string): Song | null {
    const db = getDb();
    
    const song = db.prepare(`
      SELECT id, name, artist, created_at as createdAt
      FROM songs
      WHERE id = ?
    `).get(id) as Song | undefined;
    
    if (!song) return null;
    
    // Convert createdAt string to Date if it exists
    if (song.createdAt && typeof song.createdAt === 'string') {
      song.createdAt = new Date(song.createdAt);
    }
    
    return song;
  }
  
  /**
   * List all songs
   */
  list(): SongInfo[] {
    const db = getDb();
    
    const songs = db.prepare(`
      SELECT id, name, artist, created_at as createdAt
      FROM songs
      ORDER BY name ASC
    `).all() as SongInfo[];
    
    // Convert createdAt strings to Dates
    return songs.map(song => ({
      ...song,
      createdAt: new Date(song.createdAt as unknown as string)
    }));
  }
  
  /**
   * Update a song
   */
  update(song: Song): void {
    const db = getDb();
    
    try {
      const stmt = db.prepare(`
        UPDATE songs
        SET name = ?, artist = ?
        WHERE id = ?
      `);
      
      const result = stmt.run(song.name, song.artist, song.id);
      
      if (result.changes === 0) {
        throw new Error(`Song with id ${song.id} not found.`);
      }
    } catch (error: any) {
      // Check for unique constraint violation
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error(`Song '${song.name} - ${song.artist}' already exists.`);
      }
      throw error;
    }
  }
  
  /**
   * Delete multiple songs
   */
  deleteMany(ids: string[]): void {
    if (ids.length === 0) return;
    
    transaction(db => {
      const stmt = db.prepare(`
        DELETE FROM songs
        WHERE id = ?
      `);
      
      for (const id of ids) {
        stmt.run(id);
      }
    });
  }
}
