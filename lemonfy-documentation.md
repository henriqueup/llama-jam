# Lemonfy Documentation
This is a document generated by Augment Agent under the following prompt:
```
Hey Augment! The current workspace is divided into 2 root forlders, @lemonfy/ and @llama-jam/. The former is the original implementation of my Songsterr inspired website. It is built using the T3 stack, leveraging mainly nextjs. The latter is supposed to be (eventually and with your help) a new version of the same system, but using a simpler stack based on React Router.

First of all, can you provide a documentation on how @lemonfy/ is built? I'd like you to create sections for the following:
- Architecture
- Libraries and packages used
- Features and functionalities
```

## Overview
[Lemonfy](https://github.com/henriqueup/lemonfy) is a web application inspired by [Songsterr](https://www.songsterr.com/), designed to create and playback songs with an intuitive sheet-like interface. The project serves as a showcase of software engineering skills and provides a platform for experimenting with different technologies and frameworks.

## Architecture

### Tech Stack
Lemonfy is built using the [T3 Stack](https://create.t3.gg/), which combines several modern technologies:

1. **Next.js** - React framework for server-rendered applications
2. **tRPC** - End-to-end typesafe API layer
3. **Prisma** - Type-safe ORM for database access
4. **Tailwind CSS** - Utility-first CSS framework
5. **TypeScript** - Strongly typed programming language

### Project Structure
The project follows a modular architecture with clear separation of concerns:

```
lemonfy/website/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── env/             # Environment configuration
│   ├── hooks/           # Custom React hooks
│   ├── icons/           # SVG icons
│   ├── mocks/           # Test mocks
│   ├── pages/           # Next.js pages and API routes
│   ├── server/          # Server-side code
│   │   ├── api/         # tRPC API definitions
│   │   ├── domains/     # Business logic
│   │   ├── entities/    # Data models
│   │   └── repositories/# Data access layer
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
```

### Backend Architecture
The backend follows a layered architecture:

1. **API Layer** (tRPC routers) - Handles HTTP requests and responses
2. **Domain Layer** - Contains business logic and rules
3. **Repository Layer** - Abstracts data access operations
4. **Entity Layer** - Defines data models and validation schemas

### Frontend Architecture
The frontend uses a component-based architecture with:

1. **Pages** - Next.js page components
2. **Components** - Reusable UI components
3. **Stores** - Global state management using Zustand
4. **Hooks** - Custom React hooks for shared logic

## Libraries and Packages

### Core Libraries
- **Next.js** (v13.4.1) - React framework for server-rendered applications
- **React** (v18.2.0) - UI library
- **TypeScript** - Type-safe JavaScript
- **tRPC** (v10.38.2) - End-to-end typesafe API
- **Prisma** (v5.3.0) - ORM for database access
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Zustand** (v4.4.1) - Lightweight state management
- **Immer** (v10.0.2) - Immutable state updates

### Form Handling
- **React Hook Form** (v7.46.1) - Form state management
- **Zod** (v3.22.2) - Schema validation

### UI Components
- **Radix UI** - Headless UI components
  - Accordion, Alert Dialog, Checkbox, Dialog, Dropdown Menu, etc.
- **Lucide React** (v0.241.0) - Icon library
- **class-variance-authority** (v0.6.1) - Component styling variants
- **tailwind-merge** (v1.14.0) - Merge Tailwind CSS classes
- **clsx** (v1.2.1) - Conditional class names

### Data Fetching
- **@tanstack/react-query** (v4.35.3) - Data fetching and caching
- **superjson** (v1.9.1) - JSON serialization with rich data types

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## Features and Functionalities

### Core Features
1. **Song Management**
   - Create, read, update, and delete songs
   - Song metadata (name, artist)
   - Multiple instruments per song

2. **Sheet Editor**
   - Interactive music sheet interface
   - Add/remove bars
   - Add/remove notes
   - Copy bars
   - Multiple tracks support

3. **Music Playback**
   - Play/pause/stop controls
   - Rewind functionality
   - Visual cursor tracking during playback
   - Web Audio API integration

4. **Instrument Support**
   - Multiple instrument types
   - Fretted instruments (guitar, bass, etc.)
   - Custom tunings

### User Interface
1. **Navigation**
   - Top bar menu
   - Instrument tabs
   - Editor controls

2. **Theme Support**
   - Light/dark mode
   - Responsive design

3. **Editing Tools**
   - Note duration selection
   - Octave selection
   - Keyboard shortcuts

### Data Persistence
1. **Database Integration**
   - MySQL database (via PlanetScale)
   - Prisma ORM for type-safe queries
   - Entity relationships (songs, instruments, sheets, etc.)

2. **Change Tracking**
   - Unsaved changes detection
   - Undo/redo functionality

### Audio Engine
1. **Web Audio API**
   - Real-time audio synthesis
   - Precise timing for note playback
   - Audio scheduling

2. **Playback Controls**
   - Play/pause/stop
   - Rewind/fast-forward
   - Tempo control

## Technical Implementation Details

### State Management
Lemonfy uses Zustand for state management, with separate stores for:
- **Editor Store** - Manages the state of the sheet editor
- **Player Store** - Handles playback state
- **Global Store** - Application-wide state

### Form Handling
Forms are implemented using React Hook Form with Zod for validation:
- Type-safe form schemas
- Validation error handling
- Form state management

### Audio Processing
The application uses the Web Audio API for sound generation:
- AudioContext for audio processing
- OscillatorNode for tone generation
- Precise scheduling for accurate playback

### Data Flow
1. User interactions trigger actions in the UI
2. Actions update the Zustand store
3. Components react to state changes
4. API calls are made using tRPC
5. Server processes requests through domain logic
6. Data is persisted via repositories to the database

### Deployment
- Vercel for hosting
- PlanetScale for database
- CI/CD workflow via GitHub Actions

## Future Enhancements
Based on the TODOs in the codebase:
- Add Key Instruments view
- Add Bar copy/paste
- Add mouse support improvements
- Add automatic save
- Add multiple Instrument playback support
- Add metronome
- Potential migration to Next.js App Router
