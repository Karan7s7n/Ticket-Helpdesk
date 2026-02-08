import { createClient, Session, User } from "@supabase/supabase-js";

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables!");
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Re-export types for convenience
export type { Session, User };
