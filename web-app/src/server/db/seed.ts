import { getDatabase } from "./config";
import { InstrumentService } from "../services/InstrumentService";
import { SongService } from "../services/SongService";
import { UserService } from "../services/UserService";

async function seed() {
  const db = getDatabase();

  // Create services
  const userService = new UserService();
  const instrumentService = new InstrumentService();
  const songService = new SongService();

  // Seed users
  const user1 = await userService.createUser({
    email: "user1@example.com",
    passwordHash: "hashed_password_1", // Replace with actual hashed passwords
  });

  const user2 = await userService.createUser({
    email: "user2@example.com",
    passwordHash: "hashed_password_2", // Replace with actual hashed passwords
  });

  // Seed instruments
  const guitar = await instrumentService.createInstrument({
    name: "Acoustic Guitar",
    type: "melodic",
    trackCount: 6,
    tuning: "E4,B3,G3,D3,A2,E2",
  });

  const drums = await instrumentService.createInstrument({
    name: "Drum Kit",
    type: "percussion",
    trackCount: 8,
    tuning: null,
  });

  // Seed songs
  await songService.createSong({
    title: "Wonderwall",
    artist: "Oasis",
    difficulty: "beginner",
    tempo: 87,
    userId: user1.id,
  });

  await songService.createSong({
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    difficulty: "advanced",
    tempo: 82,
    userId: user2.id,
  });

  console.log("Database seeded successfully!");
  db.close();
}

seed().catch((error) => {
  console.error("Failed to seed database:", error);
});
