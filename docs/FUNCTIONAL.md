# FUNCTIONAL.md

## Project Overview
A web-based Kanban board for task management with real-time updates and drag-and-drop functionality.

## Core Features

### 1. Authentication
- Server-side authentication using Supabase Auth
- Login page with email/password
- Session management via SvelteKit hooks
- Redirect to login when unauthenticated

### 2. Board Layout
- Three fixed columns: "To Do", "Doing", "Done"
- Task counter per column
- Responsive layout using DaisyUI components

### 3. Task Management

#### Create Tasks
- Add button opens form with fields:
  - Title (required, max 100 chars)
  - Description (optional, max 500 chars)
- Optimistic UI updates
- Toast notification on success/error

#### View Tasks
- Display as cards showing:
  - Title
  - Description preview
  - Created date
- Load all tasks on page load via server function

#### Update Tasks
- Drag-and-drop between columns
- Click card to edit title/description
- Optimistic updates with rollback on failure

#### Delete Tasks
- Delete button on task card
- Confirmation modal before deletion
- Toast notification on completion

### 4. Real-time Sync
- Not implemented in MVP (using form actions instead)
- Page invalidation after actions to sync state

### 5. User Feedback
- Toast notifications for all actions
- Loading states during server operations
- Error messages for failed operations

## User Flows

### First-time User
1. Navigate to app → Redirect to login
2. Sign up with email/password
3. Land on empty board
4. Create first task
5. Move task between columns

### Returning User
1. Navigate to app with session → See board
2. View existing tasks in columns
3. Perform CRUD operations
4. Sign out via button

## Data Model

### Task
```typescript
{
  id: string
  title: string
  description?: string
  status: 'todo' | 'doing' | 'done'
  user_id: string
  created_at: timestamp
  updated_at: timestamp
}
```

## Constraints
- No multi-user collaboration (user sees only their tasks)
- No task assignment
- No due dates or priorities
- No subtasks or dependencies
- No file attachments
- No activity history