/**
 * Copy to supabase-config.js (gitignored) for local dev.
 * Live: Vercel env SUPABASE_URL + SUPABASE_ANON_KEY — see docs/VERCEL.md
 * Dashboard → Project Settings → API
 */
window.SALONMENU_SUPABASE = {
  enabled: true,
  url: "https://YOUR_PROJECT_REF.supabase.co",
  anonKey: "YOUR_ANON_PUBLIC_KEY"
};
