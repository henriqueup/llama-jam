import { Database } from "better-sqlite3";
import { nanoid } from "nanoid";
import { getDatabase } from "./config";
import { initializeDatabase, runMigrations } from "./migrations";

interface DefaultInstrument {
  name: string;
  type: "melodic" | "percussion";
  trackCount: number;
  tuning?: string;
}

const defaultInstruments: DefaultInstrument[] = [
  {
    name: "Guitar",
    type: "melodic",
    trackCount: 6,
    tuning: "E4,B3,G3,D3,A2,E2",
  },
  {
    name: "Bass",
    type: "melodic",
    trackCount: 4,
    tuning: "G2,D2,A1,E1",
  },
  {
    name: "Drums",
    type: "percussion",
    trackCount: 8,
  },
];

async function seedDefaultInstruments(db: Database) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO instruments (id, name, type, track_count, tuning)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const instrument of defaultInstruments) {
    stmt.run(
      nanoid(),
      instrument.name,
      instrument.type,
      instrument.trackCount,
      instrument.tuning || null
    );
  }
}

export async function initializeLlamaJamDb() {
  const db = getDatabase();

  try {
    await initializeDatabase(db);

    await runMigrations(db);

    await seedDefaultInstruments(db);

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
