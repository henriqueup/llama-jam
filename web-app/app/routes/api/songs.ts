import { SongRepository } from '../../db/repositories/song-repository';
import { SongSchema } from '../../lib/models/song';
import { initializeDatabase } from '../../db/migrations/init';
import { z } from 'zod';

// Initialize database
initializeDatabase();

// Create repository instance
const songRepository = new SongRepository();

// GET /api/songs - List all songs
export async function loader() {
  try {
    const songs = songRepository.list();
    return Response.json({ songs });
  } catch (error) {
    console.error('Error fetching songs:', error);
    return Response.json({ error: 'Failed to fetch songs' }, { status: 500 });
  }
}

// POST /api/songs - Create a new song
export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const songData = {
      name: formData.get('name'),
      artist: formData.get('artist'),
    };

    // Validate song data
    const validatedData = SongSchema.parse(songData);

    // Create song
    const songId = songRepository.create(validatedData);

    return Response.json({ id: songId }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }

    console.error('Error creating song:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to create song' },
      { status: error instanceof Error && error.message.includes('already exists') ? 409 : 500 }
    );
  }
}
