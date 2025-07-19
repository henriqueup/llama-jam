# LlamaJam MVP – Technical Architecture Document

## 1. Overview

LlamaJam is a full-stack web application built with **TanStack Start** that enables users to create, edit, and play back song tablatures. This document outlines the technical architecture for the MVP, detailing the technology stack, architectural layers, and data flow.

---

## 2. Tech Stack

### Frontend

- **React** (via TanStack Start)
- **TanStack Router** – File-based routing and layouts
- **TanStack Query** – Declarative data fetching and caching
- **TanStack Table** – For rendering structured tabular views
- **TailwindCSS** – Utility-first styling
- **Shadcn UI / Radix UI** – Composable and accessible UI components
- **Lucide** – Icon set
- **Zod** – Schema validation for forms and server functions
- **Zustand + immer** – Lightweight, immutable-friendly client state management

### Backend

- **TanStack Start Server Functions** – API routes scoped to pages
- **Nitro.js** – Full-stack runtime used by TanStack Start
- **better-sqlite3** – Embedded SQLite database for fast, in-process access

---

## 3. Architecture Overview

LlamaJam uses a **Layered Architecture**:

### 3.1 Entry Layer – Server Functions

- Acts as the boundary between the client and backend logic.
- Implemented via TanStack Start `+page.server.ts` files.
- Handles:
  - Input validation (via Zod)
  - Routing to appropriate use cases in the business layer
  - Returning formatted responses

### 3.2 Business Layer – Entities & Use Cases

- Contains application logic and domain models.
- Models core concepts: `Song`, `Sheet`, `Instrument`, `Bar`, `Note`, `User`
- Implements use cases such as:
  - `createSong`, `editSheet`, `addNoteToBar`, `playbackSong`
- Pure functions where possible for high testability

### 3.3 Repository Layer – SQLite Persistence

- Implements direct access to SQLite using **better-sqlite3**
- Repository interfaces (e.g. `SongRepository`, `NoteRepository`) are consumed by the business layer
- Handles:
  - Data CRUD
  - SQL schema
  - Performance optimization (e.g. indices)

---

## 4. Directory Structure (Proposed)

```
/src
  /routes                   # Pages
    /                         # Index
      +index.tsx                # Song detail/list UI
    /editor
      +editor.tsx               # Editor interface
  /components
    /ui                       # Shadcn / Radix UI wrappers
    /[page/feature]           # Page / Feature specific components
    utils.ts
  /state                    # Zustand stores
  /server
    /functions                # Server functions
    /services                 # Business logic (use cases) e.g. create Song, update Song
    /entities                 # Domain models (Zod + TypeScript types) and operations (e.g. add a Note to a Bar)
    /repositories             # Database access logic
    /db
      schema.sql                # SQLite schema
      migrations/               # Migration scripts
      data/                     # Seeding and local SQLite
  /utils                    # Helper functions
    webAudio.ts               # WebAudio API utils
```

---

## 5. Data Flow

```
[ UI Interaction ]
      ↓
[ Zustand State or Form Submission ]
      ↓
[ Server Function (Zod Validated) ]
      ↓
[ Business Layer (Use Case) ]
      ↓
[ Repository Layer (better-sqlite3) ]
      ↓
[ SQLite Database ]
      ↑
[ Response ]
      ↑
[ Render or Revalidate via TanStack Query ]
```

---

## 6. Playback System

- Uses the **WebAudio API** for browser-based audio playback.
- Handles:
  - Scheduling note playback
  - Syncing playhead with visual bar/note highlighting
  - Controls: Play / Pause / Seek / Skip Bars

---

## 7. Performance Notes

- **Rendering**:
  - Editor is optimized for rapid, responsive changes.
  - Large sheets use memoization and/or virtualization techniques.
- **Audio Timing**:
  - Audio scheduling is buffered ahead to ensure smooth timing.
- **State Sync**:
  - TanStack Query manages consistency with server for shared data.
  - Zustand used for transient local states (e.g. currently selected note).

---

## 8. Security Considerations

- **Authentication**:
  - Email + password login (server-side hashed with bcrypt or similar).
- **Input Validation**:
  - All server inputs validated via **Zod**.
- **Database Safety**:
  - Parameterized queries with better-sqlite3 to prevent SQL injection.

---

## 9. Deployment

- **SQLite** is suitable for MVP and local/dev use.
- Easily deployable to:
  - Node-based services (Railway, Render)
  - Edge-compatible platforms (via Nitro adapter)
- Environment:
  - `.env` config for secrets
  - TanStack Start supports Vite for optimized bundling

---

## 10. Future Enhancements

- **Database**:
  - Move to PostgreSQL or similar for scalability
- **Authentication**:
  - Support OAuth and external identity providers
- **Editor**:
  - Real-time collaboration via WebSockets or CRDTs
- **Playback**:
  - Custom soundfonts, sample packs, or MIDI export
- **Import/Export**:
  - Support MusicXML, MIDI, Guitar Pro formats
