import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import type { Database } from './database.types'

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
)

// Note: For server-side auth in SvelteKit, we'll create server-specific clients
// in the server routes using @supabase/ssr