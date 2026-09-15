// Supabase client bootstrap. Loaded after the supabase-js CDN script.
// Anon/publishable key — safe to expose client-side, RLS restricts it to
// insert + select on card_sort_submissions only. See CLAUDE.md.
const SUPABASE_URL = 'https://odjdxzztksjbhrerhpzd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__0El-tUbdx8DQO24xi8siQ_usKwbsBE';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
