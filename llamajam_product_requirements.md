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
- I want to define instruments, including their tuning, so I can represent them accurately.
- I want to set a tempo for the song so I can control the playback speed.
- I want to add Sheets to a song and associate them with Instruments so I can build up the full arrangement.
- I want to configure Bars in each Sheet with specific time signatures so I can represent the song’s rhythm correctly.
- I want to place Notes using drag-and-drop, keyboard shortcuts, or copy-paste so I can input music quickly and flexibly.
- I want to save all my changes to a song periodically or manually so they are persisted on the server.
- I want to play and pause the playback so I can test how my song sounds.
- I want to seek to specific bars so I can edit or listen to specific parts of a song.
- I want to edit or delete my songs so I can keep my library organized.
- I want to log in securely with email and password so I can access my songs.

## 5. Core Features

### 5.1 Song Management

- Create a new song with title, artist, tempo, and difficulty.
- Save an entire song structure (including sheets, bars, and notes) in a single batch operation to the server.
- Delete existing songs.
- Songs are public and visible to all users.
- **Difficulty**: Predefined list (`Easy`, `Medium`, `Hard`) to ensure consistent search and filtering.

### 5.2 Instrument Setup

- Define instruments as either **melodic** or **percussion**.
- Specify the number of tracks (e.g., 6 for a guitar).
- Define the tuning for each track of a melodic instrument (e.g., "E4,B3,G3,D3,A2,E2").
- Instruments are reusable across Sheets and Songs.

### 5.3 Sheet Editor

- Add, edit, and delete Sheets associated with a Song and Instrument.
- Sheets contain a sequence of Bars and define Note placement per track.
- All edits are saved locally in the client state until explicitly saved to the server by the user.

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

- Synthetic audio playback using a default soundfont via the WebAudio API.
- Global tempo (BPM) control for the song.
- Controls:
  - Play/Pause
  - Seek to a specific point (click or bar-skip)
- Real-time visual feedback: A cursor or highlight will move across the tablature to indicate the current playback position.

### 5.5 Search

- Search for songs by:
  - Title
  - Artist
- Filter songs by `Difficulty`.

### 5.6 Authentication

- Basic email and password registration/login.
- Authenticated users can manage (create/edit/delete) their own songs.

## 6. Non-Functional Requirements

- **Framework**: Web application built using **TanStack Start**.
- **Database**: **SQLite** for MVP.
- **Performance**:
  - Sheet editor should maintain smooth rendering (60fps) on a song with up to 200 bars.
  - Audio playback should start within 200ms of the user pressing play.
- **Security**:
  - User passwords must be securely hashed using a strong algorithm (e.g., bcrypt).
  - API endpoints for creating/modifying data must be protected and require authentication.
- **User Experience**:
  - The application should provide clear feedback for user actions (e.g., success/error toasts for saving a song).
  - The application should launch with 2-3 pre-loaded example songs for visitors to explore.
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
  - `tempo`
  - `userId` (creator)

- **Instrument**

  - `id`
  - `name`
  - `type` (`melodic` | `percussion`)
  - `trackCount`
  - `tuning` (comma separated e.g. guitar standard tuning: "E4,B3,G3,D3,A2,E2")

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
  - `pitch`
  - `duration`
  - `startTime`

## 8. Out of Scope for MVP

- Song versioning and history
- Comments, ratings, and other community features
- **Soundfont customization** or instrument presets (a default soundfont will be provided).
- Export/import (e.g., MIDI, MusicXML)
- Advanced accessibility or mobile-specific features
