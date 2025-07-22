-- Initial database schema for LlamaJam

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  difficulty TEXT CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
  tempo INTEGER NOT NULL CHECK(tempo > 0),
  user_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Instruments table
CREATE TABLE IF NOT EXISTS instruments (
  id TEXT PRIMARY KEY,  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('melodic', 'percussion')) NOT NULL,
  track_count INTEGER NOT NULL CHECK(track_count > 0),
  tuning TEXT, -- comma separated tuning notes (e.g. "E4,B3,G3,D3,A2,E2"), NULL for percussion
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  -- Ensure tuning is provided for melodic instruments and not for percussion
  CHECK ((type = 'melodic' AND tuning IS NOT NULL) OR (type = 'percussion' AND tuning IS NULL))
);

-- Sheets table (connects songs with instruments)
CREATE TABLE IF NOT EXISTS sheets (
  id TEXT PRIMARY KEY,
  song_id TEXT NOT NULL,
  instrument_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE,
  FOREIGN KEY(instrument_id) REFERENCES instruments(id)
);

-- Bars table
CREATE TABLE IF NOT EXISTS bars (
  id TEXT PRIMARY KEY,
  sheet_id TEXT NOT NULL,
  "index" INTEGER NOT NULL, -- position in sheet
  beat_count INTEGER NOT NULL CHECK(beat_count > 0),
  beat_duration TEXT NOT NULL, -- stored as fraction e.g. '1/4'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(sheet_id) REFERENCES sheets(id) ON DELETE CASCADE,
  UNIQUE(sheet_id, "index")
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  bar_id TEXT NOT NULL,
  track_index INTEGER NOT NULL CHECK(track_index >= 0),
  pitch TEXT, -- can be NULL for percussion instruments
  duration TEXT NOT NULL, -- stored as fraction e.g. '1/4'
  start_time TEXT NOT NULL, -- stored as fraction e.g. '1/4'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(bar_id) REFERENCES bars(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_songs_user ON songs(user_id);
CREATE INDEX IF NOT EXISTS idx_sheets_song ON sheets(song_id);
CREATE INDEX IF NOT EXISTS idx_bars_sheet ON bars(sheet_id);
CREATE INDEX IF NOT EXISTS idx_notes_bar ON notes(bar_id);
CREATE INDEX IF NOT EXISTS idx_songs_search ON songs(title, artist);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at INTEGER NOT NULL, -- Unix timestamp
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

