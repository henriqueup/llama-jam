import { getDatabase } from "./config";
import { initializeDatabase, runMigrations } from "./migrations";

export async function initializeLlamaJamDb() {
  const db = getDatabase();

  try {
    await initializeDatabase(db);

    await runMigrations(db);

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
