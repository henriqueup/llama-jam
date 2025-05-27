import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createDatabase() {
  const dbPath =
    process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "data", "llamajam.db")
      : path.join(__dirname, "data", "llamajam.db");

  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = new Database(dbPath);

  db.pragma("foreign_keys = ON");

  return db;
}

// Global database instance
let db: Database.Database | null = null;

// Get database instance (singleton pattern)
export function getDatabase(): Database.Database {
  if (!db) {
    db = createDatabase();
  }
  return db;
}

// Close database connection (useful for cleanup)
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
