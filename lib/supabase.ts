import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://rybjhdbecuegrjvpnatc.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5YmpoZGJlY3VlZ3JqdnBuYXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMzE0OTUsImV4cCI6MjAzNjgwNzQ5NX0.XfAECiyA_TpkVSAqG833uhwaMSpe26__ISfscYHCsuQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
