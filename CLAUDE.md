# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kanban board application built with SvelteKit, Svelte 5, and Supabase. Three columns (To Do, Doing, Done) with drag-and-drop task management.

## Tech Stack

- Languages: TypeScript, JavaScript
- Frameworks: Svelte 5, SvelteKit
- Backend: Supabase (PostgreSQL)
- Styling: Tailwind CSS, DaisyUI
- Tools: npm, Vite

## Code Style & Conventions

### Import/Module Standards

- Use `$lib/` alias for imports
- Order: external deps, then internal, then types
- Prefer named exports except for Svelte components

### Naming Conventions

- Functions: camelCase (`createTask`, `deleteTask`)
- Components: PascalCase (`TaskCard.svelte`)
- Types/Interfaces: PascalCase (`Task`, `User`)
- Files: camelCase for utils, PascalCase for components
- Constants: UPPER_SNAKE_CASE

### Patterns to Follow

- Ship-first: Make it work, optimize later
- Use SvelteKit form actions for mutations
- Optimistic UI updates with error rollback
- Single source of truth: server load functions

## Development Workflow

- Commit when it works to main branch
- Simple commit messages: "add task deletion"
- No PRs, communicate directly
- Manual testing only

## Testing Strategy

- Manual browser testing
- Team demos for feature validation
- Test core flows: create, move, delete tasks

## Environment Setup

```bash
# Install dependencies
npm install

# Required .env.local
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Development server
npm run dev
```

## Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## Project Structure

- `/src/routes` - Pages and server functions
- `/src/lib` - Components and utilities  
- `types.ts` - All TypeScript interfaces
- `supabase.ts` - Database client setup

## Review Process Guidelines

Before committing:

1. **Test manually** - Create, move, delete tasks work
2. **Check formatting** - Run Prettier
3. **Verify auth flow** - Login/logout works
4. **Test error cases** - Network failures show toasts

Keep it simple, make it work, ship it.

## Context Management Instructions

### Context refresh

Check `docs/` folder, review `ARCHITECTURE.md` and `FUNCTIONAL.md`. Check progress in `TICKETS.md`. Confirm understanding of current ticket before implementing.

### Context reset

Update `TICKETS.md` with completed work, create/update `HISTORY_[NAME].md` with progress summary. Update this file only if new patterns emerge.

## Known Issues & Workarounds

- Full page refresh after mutations (by design, not a bug)
- No real-time sync between users (MVP scope)