# LlamaJam MVP – Product Requirements Document (PRD)

## 1. Overview
LlamaJam is a web-based tablature library that enables users to create, edit, and play back song tablatures. It is designed for beginner and amateur musicians seeking to learn songs or share their own arrangements using a simplified notation system.

## 2. Goals
- Provide a simple, intuitive interface for creating and editing song tablatures.
- Enable users to play back their creations in-browser with accurate timing.
- Offer basic song discovery and management features.
- Ensure smooth performance for editing and playback, even in complex songs.

## 3. User Roles
- **Authenticated User**: Can create, edit, and delete public songs.
- **Visitor**: Can browse and play existing public songs.

## 4. User Stories

### As a Visitor:
- I want to search for a song by title, artist, or difficulty so I can find songs I want to learn.
- I want to view a song’s tablature so I can follow along with it.
- I want to play back a song so I can hear how it should sound.

### As an Authenticated User:
- I want to create a new song so I can add my own tablature.
- I want to define instruments and their track layout so I can represent the instruments in my song accurately.
- I want to add Sheets to a song and associate them with Instruments so I can build up the full arrangement.
- I want to configure Bars in each Sheet with specific time signatures so I can represent the song’s rhythm correctly.
- I want to place Notes using drag-and-drop, keyboard shortcuts, or copy-paste so I can input music quickly and flexibly.
- I want to play and pause the playback so I can test how my song sounds.
- I want to seek to specific bars so I can edit or listen to specific parts of a song.
- I want to edit or delete my songs so I can keep my library organized.
- I want to log in securely with email and password so I can access my songs.

## 5. Core Features

### 5.1 Song Management
- Create a new song with title, artist, and difficulty.
- Edit or delete existing songs.
- Songs are public and visible to all users.

### 5.2 Instrument Setup
- Define instruments as either **melodic** or **percussion**.
- Specify the number of tracks (e.g., 6 for a guitar).
- Instruments are reusable across Sheets and Songs.

### 5.3 Sheet Editor
- Add, edit, and delete Sheets associated with a Song and Instrument.
- Sheets contain a sequence of Bars and define Note placement per track.

#### Notes
- Users can input Notes via:
  - Drag-and-drop
  - Keyboard shortcuts
  - Copy-paste
- Each Note includes:
  - Track index
  - Pitch (for melodic instruments)
  - Duration
  - Start time within the Bar

#### Bars
- Each Bar specifies:
  - **Number of beats** (e.g., 4)
  - **Beat duration** (e.g., quarter note = 1/4)
  - Allows precise time alignment for Notes within the bar

### 5.4 Playback
- Synthetic audio playback using the WebAudio API.
- Controls:
  - Play/Pause
  - Seek to a specific point (click or bar-skip)
- Real-time visual follow-along of Notes as they are played

### 5.5 Search
- Search for songs by:
  - Title
  - Artist
  - Difficulty

### 5.6 Authentication
- Basic email and password registration/login.
- Authenticated users can manage (create/edit/delete) their own songs.

## 6. Non-Functional Requirements
- Web application built using **TanStack Start**.
- Database: **SQLite** for MVP.
- Performance:
  - Optimized rendering of Sheets in-browser
  - Low-latency audio playback
- Accessibility and scalability are **not** priorities for the MVP.

## 7. Data Model (MVP)

### Entities

- **User**
  - `id`
  - `email`
  - `passwordHash`

- **Song**
  - `id`
  - `title`
  - `artist`
  - `difficulty`
  - `userId` (creator)

- **Instrument**
  - `id`
  - `name`
  - `type` (`melodic` | `percussion`)
  - `trackCount`

- **Sheet**
  - `id`
  - `songId`
  - `instrumentId`

- **Bar**
  - `id`
  - `sheetId`
  - `index` (position in sheet)
  - `beatCount` (e.g., 4)
  - `beatDuration` (e.g., 1/4 for quarter note)

- **Note**
  - `id`
  - `barId`
  - `trackIndex`
  - `pitch` (nullable for percussion)
  - `duration`
  - `startTime`

## 8. Out of Scope for MVP
- Song versioning and history
- Comments, ratings, and other community features
- Soundfont customization or instrument presets
- Export/import (e.g., MIDI, MusicXML)
- Advanced accessibility or mobile-specific features
