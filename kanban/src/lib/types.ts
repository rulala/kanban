// Task type matching the database schema
export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'doing' | 'done'
  user_id: string
  created_at: string
  updated_at: string
}

// Task status type for reuse
export type TaskStatus = Task['status']

// Form action response types
export interface ActionResponse {
  success: boolean
  error?: string
}