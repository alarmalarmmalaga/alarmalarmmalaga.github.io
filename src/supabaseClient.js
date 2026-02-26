import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Error: Supabase environment variables are missing at build time.\n' +
    'For Vite applications, these variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) ' +
    'must be available when the "npm run build" command is executed.\n\n' +
    '- Locally: Ensure they are in your .env file.\n' +
    '- GitHub Actions: Ensure they are set in GitHub Secrets or Variables for the repository or environment.\n' +
    'If you see this error in the browser after a deployment, it means the build artifact was generated without these variables.'
  );
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
