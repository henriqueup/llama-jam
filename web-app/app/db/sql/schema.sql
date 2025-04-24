-- SQLite schema for Llama Jam
-- Based on the original Prisma schema from Lemonfy

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  artist TEXT NOT NULL,
  UNIQUE(name, artist)
);

-- Instruments table
CREATE TABLE IF NOT EXISTS instruments (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  track_count INTEGER NOT NULL,
  is_fretted INTEGER NOT NULL
);

-- Instrument tunings table
CREATE TABLE IF NOT EXISTS instrument_tunings (
  id TEXT PRIMARY KEY,
  instrument_id TEXT,
  pitch TEXT NOT NULL,
  FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE
);

-- Song instruments table (join table)
CREATE TABLE IF NOT EXISTS song_instruments (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  song_id TEXT NOT NULL,
  instrument_id TEXT NOT NULL,
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE,
  FOREIGN KEY (instrument_id) REFERENCES instruments(id) ON DELETE CASCADE
);

-- Sheets table
CREATE TABLE IF NOT EXISTS sheets (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  track_count INTEGER NOT NULL,
  song_instrument_id TEXT NOT NULL UNIQUE,
  FOREIGN KEY (song_instrument_id) REFERENCES song_instruments(id) ON DELETE CASCADE
);

-- Bars table
CREATE TABLE IF NOT EXISTS bars (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  beat_count INTEGER NOT NULL,
  dibobinador INTEGER NOT NULL,
  tempo INTEGER NOT NULL,
  start REAL NOT NULL,
  capacity REAL NOT NULL,
  index_num INTEGER NOT NULL,
  sheet_id TEXT NOT NULL,
  FOREIGN KEY (sheet_id) REFERENCES sheets(id) ON DELETE CASCADE
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  track_index INTEGER NOT NULL,
  start REAL NOT NULL,
  duration REAL NOT NULL,
  pitch TEXT NOT NULL,
  has_sustain INTEGER NOT NULL DEFAULT 0,
  is_sustain INTEGER NOT NULL DEFAULT 0,
  sheet_id TEXT NOT NULL,
  FOREIGN KEY (sheet_id) REFERENCES sheets(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_song_instruments_song_id ON song_instruments(song_id);
CREATE INDEX IF NOT EXISTS idx_song_instruments_instrument_id ON song_instruments(instrument_id);
CREATE INDEX IF NOT EXISTS idx_instrument_tunings_instrument_id ON instrument_tunings(instrument_id);
CREATE INDEX IF NOT EXISTS idx_bars_sheet_id ON bars(sheet_id);
CREATE INDEX IF NOT EXISTS idx_notes_sheet_id ON notes(sheet_id);
CREATE INDEX IF NOT EXISTS idx_notes_track_index_start ON notes(track_index, start);
