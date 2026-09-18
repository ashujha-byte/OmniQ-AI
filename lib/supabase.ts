import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fggjhtmelnlfxxfaeerc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Oew2uXIoZEpEyyx4mHM_8A_O_oXK2B_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);