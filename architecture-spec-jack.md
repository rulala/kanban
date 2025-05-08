# Architectural Specification for Kanban Board Application

## Technology Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: React's built-in state and props (no external libraries)
- **Data Fetching**: Next.js built-in data fetching capabilities
- **Database**: Local JSON database (with potential to migrate to SQLite)

## Project Structure

Type-based organization with separate directories for different types of components:

```
/kanban
  /pages
    index.js         # Main board page
    /api
      /tasks
        index.js     # GET all tasks, POST new task
        [id].js      # GET, PATCH, DELETE specific task
  /components
    Board.jsx        # Main board component
    Column.jsx       # Column component (To Do, Doing, Done)
    TaskCard.jsx     # Individual task card
    TaskForm.jsx     # Form for adding new tasks
  /styles
    globals.css      # Global styles and Tailwind imports
  /lib
    db.js            # Database interaction functions
  /data
    tasks.json       # JSON data storage
  next.config.js
  package.json
  tailwind.config.js
  postcss.config.js
```

## Data Models

### Task

Minimal data structure for tasks:

```javascript
{
  id: String,        // Unique identifier
  title: String,     // Task title
  status: String     // "todo", "doing", or "done"
}
```

## API Endpoints

RESTful API structure:

- **GET /api/tasks**
  - Returns all tasks

- **POST /api/tasks**
  - Creates a new task
  - Body: `{ title: String, status: String }`
  - Returns the created task

- **GET /api/tasks/[id]**
  - Returns a specific task by ID

- **PATCH /api/tasks/[id]**
  - Updates a specific task
  - Body: `{ title?: String, status?: String }`
  - Returns the updated task

- **DELETE /api/tasks/[id]**
  - Deletes a specific task
  - Returns success status

## Component Architecture

### Board Component
- Holds the overall state of tasks
- Fetches tasks from the API on load
- Renders three Column components
- Renders the TaskForm component

### Column Component
- Displays tasks filtered by status ("todo", "doing", or "done")
- Renders TaskCard components for each task

### TaskCard Component
- Displays individual task information
- Contains UI controls for moving and deleting tasks

### TaskForm Component
- Simple form for creating new tasks
- Submits to the API and updates parent state

## State Management

- Use React's useState and useEffect hooks for local component state
- Pass state and handler functions as props between components
- Fetch data from API endpoints using Next.js data fetching

## Error Handling

- Use try/catch blocks for API calls
- Display simple error messages to users when operations fail
- Log errors to console for debugging

## Performance Considerations

- Keep the application simple and minimal
- Optimize component rendering with proper React practices
- Limit unnecessary re-renders by using appropriate React hooks
