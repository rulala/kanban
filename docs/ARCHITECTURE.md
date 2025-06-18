# ARCHITECTURE.md

## Tech Stack
- **Frontend**: Svelte 5 + SvelteKit
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + DaisyUI
- **Language**: TypeScript
- **Package Manager**: npm

## Architecture Pattern
Client-side heavy with server-side authentication:
- Authentication handled in SvelteKit hooks/load functions
- Direct Supabase client calls from components
- Form actions for data mutations
- Page invalidation for state updates

## Project Structure
```
src/
├── routes/
│   ├── +layout.server.ts    # Auth check
│   ├── +page.svelte         # Kanban board
│   ├── +page.server.ts      # Load tasks, form actions
│   └── login/
│       └── +page.svelte     # Login form
├── lib/
│   ├── KanbanBoard.svelte  # Main board container
│   ├── TaskCard.svelte      # Draggable task
│   ├── AddTaskForm.svelte   # Task creation
│   ├── Modal.svelte         # Reusable modal
│   ├── types.ts             # All TypeScript interfaces
│   ├── supabase.ts          # Supabase client setup
│   └── utils.ts             # Helper functions
└── app.d.ts                 # SvelteKit types
```

## Component Architecture

### Page Components
- `+page.svelte` - Orchestrates the board, handles load data
- `login/+page.svelte` - Authentication UI

### UI Components
- `KanbanBoard.svelte` - Renders columns, manages drag-drop
- `TaskCard.svelte` - Individual task display and interactions
- `AddTaskForm.svelte` - Task creation form
- `Modal.svelte` - Generic modal wrapper

### Component Communication
- Props down for data
- Form actions for mutations
- Page invalidation triggers re-render

## Data Flow

### Read Flow
1. `+page.server.ts` load() fetches tasks from Supabase
2. Data passed to `+page.svelte` as props
3. Props distributed to child components

### Write Flow
1. User interaction triggers form submission
2. Form action in `+page.server.ts` handles mutation
3. Optimistic update in UI
4. Action completes → page invalidates → fresh data loads
5. Rollback on error with toast notification

## Database Schema

### Tables
```sql
tasks (
  id: uuid primary key
  title: text not null
  description: text
  status: text not null check (status in ('todo', 'doing', 'done'))
  user_id: uuid references auth.users not null
  created_at: timestamp default now()
  updated_at: timestamp default now()
)
```

### Security
- Row Level Security (RLS) enabled
- Users can only CRUD their own tasks

## Authentication Flow
1. SvelteKit `hooks.server.ts` checks session
2. `+layout.server.ts` validates auth state
3. Redirect to `/login` if unauthenticated
4. Supabase handles signup/signin
5. Session stored in cookies

## Error Handling Strategy
- Try-catch blocks around all Supabase calls
- User-friendly error messages via toast
- Form action failures return error objects
- Network errors show retry option

## Performance Considerations
- No client-side state management (simpler but more network calls)
- Full page data refresh after mutations
- Optimistic UI for perceived performance
- Minimal component re-renders