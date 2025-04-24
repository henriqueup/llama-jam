import { SongRepository } from '../../db/repositories/song-repository';
import { SongSchema } from '../../lib/models/song';
import { z } from 'zod';

// Create repository instance
const songRepository = new SongRepository();

// GET /api/songs/:songId - Get a song by ID
export async function loader({ params }: { params: { songId: string } }) {
  try {
    const song = songRepository.get(params.songId);

    if (!song) {
      return Response.json({ error: 'Song not found' }, { status: 404 });
    }

    return Response.json({ song });
  } catch (error) {
    console.error(`Error fetching song ${params.songId}:`, error);
    return Response.json({ error: 'Failed to fetch song' }, { status: 500 });
  }
}

// PUT /api/songs/:songId - Update a song
export async function action({ request, params }: { request: Request, params: { songId: string } }) {
  try {
    const formData = await request.formData();
    const songData = {
      id: params.songId,
      name: formData.get('name'),
      artist: formData.get('artist'),
    };

    // Validate song data
    const validatedData = SongSchema.parse(songData);

    // Update song
    songRepository.update(validatedData);

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }

    console.error(`Error updating song ${params.songId}:`, error);

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return Response.json({ error: error.message }, { status: 404 });
      }
      if (error.message.includes('already exists')) {
        return Response.json({ error: error.message }, { status: 409 });
      }
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ error: 'Failed to update song' }, { status: 500 });
  }
}

// DELETE /api/songs/:songId - Delete a song
export async function destroy({ params }: { params: { songId: string } }) {
  try {
    songRepository.deleteMany([params.songId]);
    return Response.json({ success: true });
  } catch (error) {
    console.error(`Error deleting song ${params.songId}:`, error);
    return Response.json({ error: 'Failed to delete song' }, { status: 500 });
  }
}
