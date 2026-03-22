import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : '') || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : '') || '';

const isSupabaseConfigured = supabaseUrl !== '' && supabaseAnonKey !== '';

if (!isSupabaseConfigured) {
  console.warn('Supabase URL or Anon Key is missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

// Create a dummy client if not configured to prevent immediate crash, 
// but we'll check isSupabaseConfigured before making calls.
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // We'll handle null checks in components

export { isSupabaseConfigured };

// Types for our database
export interface UserProfile {
  id: string; // Supabase Auth UID
  email: string;
  display_name: string;
  photo_url: string | null;
  role: 'user' | 'admin';
  membership_id: string | null;
  membership_status: 'active' | 'inactive' | 'pending';
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  discipline: string;
  instructor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  tier_id: string;
  tier_name: string;
  price: string;
  status: 'active' | 'inactive' | 'pending';
  start_date: string;
  end_date: string | null;
  created_at: string;
}
