# TICKETS.md

## Ticket Status Template

When updating tickets, please include:
```
Status: ⏳ IN PROGRESS | ✅ COMPLETE | 🚫 BLOCKED
Completed: [Date/Time]
Additional work done: [Any extra features/improvements]
Notes: [Important decisions, deviations, or blockers]
Cross-dependencies resolved: [List any other tickets partially completed]
```

---

## TICKET-001: Project Setup & Environment

**Assignee**: Patrick  
**Dependencies**: None  
**Status**: ⬜ TODO

### Description
Initialize SvelteKit project with TypeScript, install dependencies, and configure development environment.

### Deliverables
- Fresh SvelteKit project with TypeScript
- Tailwind CSS + DaisyUI configured
- Supabase client library installed
- Environment variables setup (.env.local)
- Basic folder structure as per ARCHITECTURE.md
- Prettier configured for code formatting

### Definition of Done
- `npm run dev` starts the development server
- Tailwind/DaisyUI styles work in a test component
- TypeScript compilation successful
- Team members can clone and run locally

---

## TICKET-002: Supabase Database Setup

**Assignee**: Max  
**Dependencies**: TICKET-001 (environment ready)  
**Status**: ⬜ TODO

### Description
Create Supabase project, configure database schema, and set up authentication.

### Deliverables
- Supabase project created
- Tasks table created with schema from ARCHITECTURE.md
- Row Level Security (RLS) policies configured
- Auth configured for email/password
- Connection tested from local environment

### Definition of Done
- Database accessible via Supabase client
- RLS policies prevent cross-user data access
- Can manually create a test user in Supabase dashboard
- Environment variables confirmed working

---

## TICKET-003: Type Definitions & Utilities

**Assignee**: Patrick  
**Dependencies**: TICKET-001  
**Status**: ⬜ TODO

### Description
Create TypeScript interfaces and utility functions that will be shared across the application.

### Deliverables
- `lib/types.ts` with Task interface and status type
- `lib/supabase.ts` with configured client
- `lib/utils.ts` with any helper functions (initially empty)
- `app.d.ts` updated with SvelteKit types

### Definition of Done
- All interfaces match data model from FUNCTIONAL.md
- Supabase client exportable and typed
- No TypeScript errors

---

## TICKET-004: Authentication Flow

**Assignee**: Max  
**Dependencies**: TICKET-002, TICKET-003  
**Status**: ⬜ TODO

### Description
Implement server-side authentication with login page and session management.

### Deliverables
- `routes/login/+page.svelte` with email/password form
- `hooks.server.ts` for session handling  
- `+layout.server.ts` for auth checks
- Sign up and sign in functionality
- Sign out functionality
- Redirect logic for unauthenticated users

### Definition of Done
- Users can sign up with email/password
- Users can log in and see their session
- Unauthenticated users redirect to /login
- Sign out clears session and redirects

---

## TICKET-005: Modal Component

**Assignee**: Rula  
**Dependencies**: TICKET-001, TICKET-003  
**Status**: ⬜ TODO

### Description
Create reusable modal component for confirmations and dialogs.

### Deliverables
- `lib/Modal.svelte` component
- Props for title, content, actions
- Keyboard support (Esc to close)
- Click outside to close
- Smooth animations with Tailwind

### Definition of Done
- Modal can be imported and used with custom content
- Proper accessibility (focus trap, ARIA)
- Animations work smoothly
- Can handle confirm/cancel actions

---

## TICKET-006: Task Data Layer

**Assignee**: Max  
**Dependencies**: TICKET-002, TICKET-004  
**Status**: ⬜ TODO

### Description
Implement server-side data loading and form actions for task CRUD operations.

### Deliverables
- `+page.server.ts` with load function for tasks
- Form actions: createTask, updateTask, deleteTask
- Error handling with try-catch blocks
- Return proper action data/errors

### Definition of Done
- Load function fetches user's tasks
- All CRUD actions work via form POST
- Errors return user-friendly messages
- Actions trigger page invalidation

---

## TICKET-007: Task Card Component

**Assignee**: Rula  
**Dependencies**: TICKET-003, TICKET-005  
**Status**: ⬜ TODO

### Description
Create task card component with edit and delete functionality.

### Deliverables
- `lib/TaskCard.svelte` component
- Display title, description preview, created date
- Delete button with modal confirmation
- Click to edit (emit event/callback)
- Optimistic UI preparation

### Definition of Done
- Cards display task data correctly
- Delete shows confirmation modal
- Cards are styled with DaisyUI
- Proper event handling for actions

---

## TICKET-008: Add Task Form

**Assignee**: Rula  
**Dependencies**: TICKET-003  
**Status**: ⬜ TODO

### Description
Create form component for adding new tasks.

### Deliverables
- `lib/AddTaskForm.svelte` component
- Title field (required, max 100 chars)
- Description field (optional, max 500 chars)
- Submit button with loading state
- Form validation and error display
- Reset after successful submission

### Definition of Done
- Form validates on client side
- Shows loading state during submission
- Clears on success
- Displays errors clearly

---

## TICKET-009: Kanban Board Component

**Assignee**: Patrick  
**Dependencies**: TICKET-007, TICKET-008  
**Status**: ⬜ TODO

### Description
Create main board component with three columns and drag-and-drop functionality.

### Deliverables
- `lib/KanbanBoard.svelte` component
- Three columns: To Do, Doing, Done
- Task counter per column
- Drag and drop between columns
- Responsive layout with DaisyUI

### Definition of Done
- Board renders three columns
- Tasks appear in correct columns
- Drag and drop moves tasks
- Task counts update correctly
- Mobile responsive

---

## TICKET-010: Main Page Integration

**Assignee**: Patrick  
**Dependencies**: TICKET-006, TICKET-009  
**Status**: ⬜ TODO

### Description
Wire up the main page with all components and server data.

### Deliverables
- Update `routes/+page.svelte`
- Integrate KanbanBoard with server data
- Handle form actions for all operations
- Add sign out button
- Loading states during operations

### Definition of Done
- Page loads user's tasks
- All CRUD operations work
- Sign out functions properly
- Loading feedback visible

---

## TICKET-011: Toast Notifications

**Assignee**: Rula  
**Dependencies**: TICKET-005  
**Status**: ⬜ TODO

### Description
Implement toast notification system for user feedback.

### Deliverables
- Toast component or integration
- Success messages for all actions
- Error messages with details
- Auto-dismiss after timeout
- Stack multiple toasts

### Definition of Done
- All actions show appropriate toasts
- Errors are user-friendly
- Toasts don't block UI
- Clear visual hierarchy

---

## TICKET-012: Optimistic Updates

**Assignee**: Max  
**Dependencies**: TICKET-010  
**Status**: ⬜ TODO

### Description
Implement optimistic UI updates with rollback on error.

### Deliverables
- Immediate UI updates on user actions
- Rollback logic on server errors
- Maintain UI consistency
- Smooth transitions

### Definition of Done
- Task moves appear instant
- Failures revert to previous state
- Error toasts explain what happened
- No UI glitches or jumps

---

## TICKET-013: Final Testing & Polish

**Assignee**: All (Rula leads)  
**Dependencies**: TICKET-001 through TICKET-012  
**Status**: ⬜ TODO

### Description
Complete manual testing of all features and fix any issues.

### Deliverables
- Test all user flows from FUNCTIONAL.md
- Fix any bugs discovered
- Ensure consistent styling
- Update README with setup instructions
- Team demo preparation

### Definition of Done
- All features work as specified
- No console errors
- UI is consistent and polished
- README has clear setup steps
- Ready for workshop demo

---

## Development Order

### Phase 1 - Foundation (Parallel)
- Patrick: TICKET-001 → TICKET-003
- Max: TICKET-002 → TICKET-004
- Rula: Wait for TICKET-001, then TICKET-005

### Phase 2 - Core Components (Parallel)
- Max: TICKET-006 → TICKET-012
- Rula: TICKET-007 → TICKET-008 → TICKET-011
- Patrick: TICKET-009 → TICKET-010

### Phase 3 - Integration & Polish
- All: TICKET-013 (led by Rula)