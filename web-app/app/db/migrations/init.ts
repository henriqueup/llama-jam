import fs from 'fs';
import path from 'path';
import { getDb } from '../../lib/db';

/**
 * Initialize the database with the schema
 */
export function initializeDatabase(): void {
  const db = getDb();
  
  try {
    // Check if migrations table exists
    const migrationsTableExists = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='migrations'
    `).get();
    
    // Create migrations table if it doesn't exist
    if (!migrationsTableExists) {
      db.exec(`
        CREATE TABLE migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
    
    // Check if schema has been applied
    const schemaApplied = db.prepare(`
      SELECT id FROM migrations WHERE name = 'initial_schema'
    `).get();

    // Apply schema if it hasn't been applied yet
    if (!schemaApplied) {
      console.log('Initializing database schema...');
      
      // Read and execute schema SQL
      const schemaPath = path.join(process.cwd(), 'app', 'db', 'sql', 'schema.sql');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      
      // Execute schema in a transaction
      db.exec('BEGIN TRANSACTION');
      try {
        db.exec(schemaSql);
        
        // Record migration
        db.prepare(`
          INSERT INTO migrations (name) VALUES ('initial_schema')
        `).run();
        
        db.exec('COMMIT');
        console.log('Database schema initialized successfully');
      } catch (error) {
        db.exec('ROLLBACK');
        console.error('Failed to initialize database schema:', error);
        throw error;
      }
    } else {
      console.log('Database schema already initialized');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
