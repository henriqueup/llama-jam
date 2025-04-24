import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'llama-jam.db');

let db: Database.Database | null = null;

/**
 * Get a database connection
 * @returns SQLite database connection
 */
export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // For better performance
    db.pragma('journal_mode = WAL');
  }
  
  return db;
}

/**
 * Close the database connection
 */
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

/**
 * Execute a transaction
 * @param callback Function to execute within the transaction
 * @returns Result of the callback function
 */
export function transaction<T>(callback: (db: Database.Database) => T): T {
  const db = getDb();
  
  try {
    db.exec('BEGIN TRANSACTION');
    const result = callback(db);
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
