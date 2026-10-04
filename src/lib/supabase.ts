import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactMessage, SubmissionResult } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('YOUR_SUPABASE')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const POSTGRES_TABLE_SCHEMA_SQL = `-- NEXORA AI Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from web contact form
CREATE POLICY "Allow public insert to contact_messages"
ON contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated admins to view messages
CREATE POLICY "Allow authenticated read contact_messages"
ON contact_messages
FOR SELECT
TO authenticated
USING (true);
`;

/**
 * Submits a contact message either to Supabase or to the local verified store
 */
export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'created_at'>
): Promise<SubmissionResult> {
  // Validate basic constraints
  if (!data.name || !data.name.trim()) {
    return { success: false, message: 'Name is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    return { success: false, message: 'A valid email address is required.' };
  }
  if (!data.message || data.message.trim().length < 5) {
    return { success: false, message: 'Message must be at least 5 characters long.' };
  }

  const payload: ContactMessage = {
    name: data.name.trim(),
    email: data.email.trim(),
    company: data.company?.trim() || undefined,
    message: data.message.trim(),
  };

  // If live Supabase client is configured, submit to PostgreSQL
  if (supabase) {
    try {
      const { data: record, error } = await supabase
        .from('contact_messages')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('[NEXORA Supabase Error]:', error);
        return {
          success: false,
          message: error.message || 'Failed to submit message to Supabase.',
        };
      }

      return {
        success: true,
        message: 'Your message has been securely recorded in Supabase PostgreSQL.',
        record: record as ContactMessage,
        isSimulated: false,
      };
    } catch (err: unknown) {
      console.error('[NEXORA Supabase Network Error]:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown database error occurred.';
      return {
        success: false,
        message: `Network error connecting to Supabase: ${errMsg}`,
      };
    }
  }

  // Graceful simulated mode when env variables are pending
  const simulatedRecord: ContactMessage = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
    ...payload,
    created_at: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(localStorage.getItem('nexora_contact_messages') || '[]');
    existing.unshift(simulatedRecord);
    localStorage.setItem('nexora_contact_messages', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore storage issues in private modes
  }

  // Provide realistic latency
  await new Promise((res) => setTimeout(res, 600));

  return {
    success: true,
    message: 'Message registered successfully. (Operating in verified dev mode; configure VITE_SUPABASE_URL for production sync).',
    record: simulatedRecord,
    isSimulated: true,
  };
}

export function getLocalStoredMessages(): ContactMessage[] {
  try {
    return JSON.parse(localStorage.getItem('nexora_contact_messages') || '[]');
  } catch {
    return [];
  }
}
