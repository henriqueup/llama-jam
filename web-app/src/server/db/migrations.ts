import { Database } from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initializeDatabase(db: Database): Promise<void> {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();

  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  const statements = schema.split(";").filter((stmt) => stmt.trim());

  for (const statement of statements) {
    if (statement.trim()) {
      db.prepare(statement).run();
    }
  }

  const initialMigration = db.prepare(`
    INSERT OR IGNORE INTO migrations (name) VALUES ('initial_schema')
  `);
  initialMigration.run();
}

export async function runMigrations(db: Database): Promise<void> {
  const migrationsDir = path.join(__dirname, "migrations");
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  const appliedMigrations = db
    .prepare(
      `
    SELECT name FROM migrations ORDER BY id
  `
    )
    .all() as Array<{ name: string }>;

  const appliedMigrationNames = appliedMigrations.map((row) => row.name);

  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  // Apply new migrations
  for (const file of migrationFiles) {
    const migrationName = path.basename(file, ".sql");

    if (!appliedMigrationNames.includes(migrationName)) {
      const migrationPath = path.join(migrationsDir, file);
      const migration = fs.readFileSync(migrationPath, "utf8");

      const statements = migration.split(";").filter((stmt) => stmt.trim());

      db.transaction(() => {
        for (const statement of statements) {
          if (statement.trim()) {
            db.prepare(statement).run();
          }
        }

        db.prepare(
          `
          INSERT INTO migrations (name) VALUES (?)
        `
        ).run(migrationName);
      })();

      console.log(`Applied migration: ${migrationName}`);
    }
  }
}
