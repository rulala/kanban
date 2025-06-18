// This file can be regenerated using Supabase CLI for full type safety
// For now, we'll define basic types matching our schema

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'todo' | 'doing' | 'done'
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status: 'todo' | 'doing' | 'done'
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'doing' | 'done'
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}