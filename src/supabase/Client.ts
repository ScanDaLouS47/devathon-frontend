import { createClient } from '@supabase/supabase-js';

const supabase_url = import.meta.env.SUPABASE_URL || 'https://xyiqucxpwnvmembqwevm.supabase.co';
const supabase_key = import.meta.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5aXF1Y3hwd252bWVtYnF3ZXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NTA5NTQsImV4cCI6MjAzNzQyNjk1NH0.qS9IaOlprknZwiPeIiyfKEW0TFfAyU5Z2isj54pivrk';

export const client = createClient(supabase_url, supabase_key);
