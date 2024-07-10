import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://usulmxneezppkohegsak.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdWxteG5lZXpwcGtvaGVnc2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDk1MDcsImV4cCI6MjAzNjE4NTUwN30.2LM1mAEey0paCX3YJpSqwljc94nCx-7FZ0B7cYNrNJ8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
