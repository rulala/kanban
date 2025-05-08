# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Kanban board application that allows users to manage tasks across three columns: "To Do", "Doing", and "Done". The application includes:

- A static board UI with three columns
- Database integration for task storage
- API endpoints for task management
- UI components for adding, updating, and deleting tasks

## Architecture

The project will have a frontend for the Kanban board UI and a backend with database integration. Key components will include:

1. **Frontend**: UI components for the board, columns, and task cards
2. **Backend**: API endpoints for task CRUD operations
3. **Database**: Storage for task data

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
```

## Coding Standards

1. **Simplicity First**: Apply KISS principles - keep components and functions focused on a single responsibility.

2. **Minimal Dependencies**: Use built-in React/Next.js capabilities rather than external libraries where possible.

3. **Error Handling**: Implement basic try/catch blocks for API calls and data operations.

4. **Naming Conventions**:
   - Components: PascalCase (e.g., `TaskCard`)
   - Functions/variables: camelCase (e.g., `handleSubmit`)
   - API routes: kebab-case or follow Next.js conventions

5. **State Management**: Use React's built-in state and props instead of external state management libraries.

6. **API Structure**: Follow RESTful principles for API endpoints.

7. **Code Formatting**: Keep formatting minimal without strict requirements.

## Development Tools

As the project is just starting, specific build commands, test frameworks, and linting tools will be determined during development. Once established, they will be documented here for future reference.

## Important Notes

- The project does not include authentication or deployment features as specified in TASK.md.
- No form validation required for this version.
- No testing is required for this workshop project.