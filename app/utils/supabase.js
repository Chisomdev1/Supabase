import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fesagjsfmosovfqrsmha.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlc2FnanNmbW9zb3ZmcXJzbWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTExMDAsImV4cCI6MjA1OTcyNzEwMH0.O9aUwzr6kFtjjrgwEDQ0hcJCZTdTk0dWDEU2LjNtWf0"

export const supabase = createClient(supabaseUrl, supabaseKey)
