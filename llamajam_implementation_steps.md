# Implementation Plan

Main phases:

1. Project Setup and Infrastructure
2. Authentication System
3. Core Data Models and Database
4. Editor UI and State Management
5. Playback System
6. Search and Navigation
7. Testing and Quality Assurance
8. Build and Deployment

---

### 1. Project Setup and Infrastructure

**Goal:** Establish the foundational project structure and tooling.

1.  **Set up SQLite**: Integrate `better-sqlite3` for database access.
2.  **Configure UI Components**: Set up and configure `Shadcn UI`.
3.  **Directory Structure**: Organize directories according to the technical architecture.
4.  **Styling**: Configure `TailwindCSS`.
5.  **Validation**: Add and configure `Zod` for type-safe validation.

### 2. Authentication System

**Goal:** Implement secure user registration and login.

1.  **User Model**: Create the `User` model and repository.
2.  **Password Hashing**: Set up `bcrypt` for secure password hashing.
3.  **API Routes**: Add authentication server functions (`/login`, `/register`, `/logout`).
4.  **Session Management**: Implement session handling to manage user login state.
5.  **Protected Routes**: Create middleware to protect routes that require authentication.

### 3. Core Data Models and Database

**Goal:** Define the application's data structure and persistence layer.

1.  **Database Schema**:
    - Write the `schema.sql` file defining all entities: `User`, `Song` (with `tempo`), `Instrument`, `Sheet`, `Bar`, and `Note`.
2.  **Repositories**:
    - Implement `SongRepository` with methods for creating, reading, updating, and deleting songs. The update method will accept the entire song data structure.
    - Implement `InstrumentRepository` for instrument management.
3.  **Business Logic**:
    - Implement a `SongService` that handles the business logic for creating and updating songs, taking the full song object as input.
4.  **Data Seeding**:
    - Create a script to seed the database with 2-3 sample songs and a default set of instruments.

### 4. Editor UI and State Management

**Goal:** Build the interactive song editor.

1.  **Zustand Stores**:
    - `EditorStore`: Manages the complete state of the song being edited (notes, bars, tempo, etc.).
    - `PlaybackStore`: Manages playback state (playing, paused, current position).
    - `UIStore`: Manages UI state (modals, notifications).
2.  **Editor Components**:
    - `SheetGrid`: The main component for displaying the tablature.
    - `BarComponent`: Renders a single bar with its notes.
    - `NoteComponent`: Renders an individual note.
    - `InstrumentEditor`: A form for creating/editing instruments, including tuning.
    - `SongDetailsEditor`: A form for editing song metadata like title, artist, and tempo.
3.  **Editor Interactions**:
    - Implement the three note input methods: drag-and-drop, keyboard shortcuts, and copy-paste.
    - Implement a "Save" button that sends the entire song state from the `EditorStore` to the server.
    - Add auto-save functionality that triggers the save operation periodically.

### 5. Playback System

**Goal:** Enable in-browser audio playback of the song.

1.  **Sound Generation**:
    - Integrate a lightweight soundfont library to generate instrument sounds.
2.  **WebAudio API Integration**:
    - `AudioContext`: Manage the core Web Audio API object.
    - `NoteScheduler`: A service to schedule notes for playback based on their start time and the song's tempo.
    - `PlaybackControls`: Implement UI controls for play, pause, and seeking.
3.  **Visual Feedback**:
    - Implement a playback cursor or highlight that moves across the `SheetGrid` in real-time.

### 6. Search and Navigation

**Goal:** Allow users to discover and navigate to songs.

1.  **Song List View**:
    - Create a page displaying a list or grid of all public songs.
2.  **Search and Filter**:
    - Implement a search bar to find songs by title or artist.
    - Add UI controls to filter songs by difficulty (`Easy`, `Medium`, `Hard`).
3.  **Routing**:
    - Set up routes for the song list, the song editor, and user profiles.
    - Implement navigation guards to ensure only authenticated users can access the editor.

### 7. Testing and Quality Assurance

**Goal:** Ensure the application is reliable and bug-free.

1.  **Unit Tests**:
    - Write unit tests for all services and repositories.
    - Test utility functions and complex state logic in Zustand stores.
2.  **Integration Tests**:
    - Write integration tests for the API endpoints to verify authentication and data operations.
3.  **UI/Component Tests**:
    - Write tests for key UI components to ensure they render and behave correctly.

### 8. Build and Deployment

**Goal:** Prepare the application for production.

1.  **Production Build**:
    - Create a script to generate an optimized production build of the application.
2.  **Environment Configuration**:
    - Ensure the application can be configured for different environments (development vs. production).
