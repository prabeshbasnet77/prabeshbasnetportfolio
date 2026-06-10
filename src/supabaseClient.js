import { createClient } from '@supabase/supabase-js';

// Fallback to dummy strings if Vercel environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jzffvdxxsrlazedgbkqi.supabase.co/rest/v1/";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_sJMQMaTdyKeOKMPlIizjCg_2HPxBjQC";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);