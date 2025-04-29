import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_API_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_API_PROJECT_API_KEYS

export const supabase = createClient(supabaseUrl, supabaseKey)

