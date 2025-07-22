# Project: Llama-Jam

- This project is a TanStack powered website.
- Refer to these files for context on the project:
  - llamajam_product_requirements.md
  - llamajam_technical_architecture.md
  - llamajam_implementation_steps.md
- Refer to these files for context on TanStack:
  - .gemini/tanstack-form-digest.txt
  - .gemini/tanstack-query-digest.txt
  - .gemini/tanstack-router-digest.txt
  - .gemini/tanstack-table-digest.txt

## Package installation

- Refer to the package.json file at web-app/package.json

## Reference Workflow

The login workflow shows an example of the complete base structure for pages and server functions. It should be used as a reference for new pages and workflows being added. Here's what it covers:

- web-app/src/routes/login.route.tsx
  - route page definition
  - form definition with tanstack/form
    - custom ui library component usage
    - field validations using zod schemas
    - general form structure and submission
  - mutation request handling with tanstack/query
  - query parameter handling and redirects
- web-app/src/server/functions/auth.ts
  - server function definition with tanstack/start
  - server function middleware and validation
    - validations using zod schemas
  - service layer usage
- web-app/src/server/services/UserService.ts
  - service layer definition
  - interface + class structure
  - repository layer usage
- web-app/src/server/repositories/UserRepository.ts
  - repository interface definition
- web-app/src/server/repositories/Sqlite/SqliteUserRepository.ts
  - repository layer definition using Sqlite
  - Sqlite usage with better-sqlite3 helpers from web-app/src/server/db/config.ts

## Additional Guidelines

### Entities

- Used by both the front and back end
- Defined at web-app/src/server/entities/
- Should be defined based off a Zod schema

### Middleware

- Defined at web-app/src/server/middleware.ts
- Currently global middlewares seem a bit bugged, so we're adding them directly on the server function definitions

### Zod usage

- Use zod for schema validations
  - Prefer defining custom messages
  - Use refine methods when validations are more complex

### Utils

- There are multiple utils folders localized per context
- e.g.:
  - web-app/src/utils/
    - general utils for the whole app
  - web-app/src/components/utils.ts
    - UI component utils
  - web-app/src/server/utils.ts
    - Server specific utils
