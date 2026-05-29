# Vercel — Supabase env (live site)

`assets/js/supabase-config.js` is **not in git**. Vercel creates it on each deploy from environment variables.

## 1. Add environment variables

1. Open [vercel.com](https://vercel.com) → your **SalonMenu** project  
2. **Settings** → **Environment Variables**  
3. Add these for **Production** (and **Preview** if you want Supabase on preview URLs too):

| Name | Value | Notes |
|------|--------|--------|
| `SUPABASE_URL` | `https://gboumwlckcekduhfuzkg.supabase.co` | Supabase → Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | `eyJ...` | Settings → API → **anon public** (not service_role) |
| `SUPABASE_ENABLED` | `true` | Optional; if omitted, enabled when URL + key are set |

4. **Save**

## 2. Redeploy

After saving env vars:

- **Deployments** → latest deployment → **⋯** → **Redeploy**  
  (env vars only apply to **new** builds)

Or push a new commit to `main`.

Build runs `npm run build`, which writes `assets/js/supabase-config.js` into the deployment bundle.

## 3. Verify live

1. Open your site (e.g. `https://salonmenu.pk` or `*.vercel.app`)  
2. Homepage should show **3 salons** from Supabase (same as SQL seed)  
3. **F12 → Network** → filter `supabase.co` — requests should return `200`  
4. If salons are missing, check **Deployments → Build Logs** for `supabase-config.js written (Supabase enabled)`

## 4. Local development

**Option A — file (simplest)**

```bash
copy assets\js\supabase-config.example.js assets\js\supabase-config.js
```

Edit `url` and `anonKey`, set `enabled: true`. File stays local (gitignored).

**Option B — `.env.local`**

Create `.env.local` in project root (already gitignored):

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_ENABLED=true
```

Then:

```bash
npm run build:config
```

## 5. Troubleshooting

| Symptom | Fix |
|--------|-----|
| Build failed: **No Output Directory named `public`** | This repo is static at **root**, not `public/`. `vercel.json` sets `"outputDirectory": "."`. In Vercel → **Settings → Build** → clear **Output Directory** or set to `.` (not `public`). |
| Live `/admin/*` or Supabase JS **404** | Deployment failed or is old — **Redeploy** latest `main` after build succeeds. |
| Live site uses `data.json` only | Redeploy after adding env vars; confirm build log shows Supabase enabled |
| `supabase-config.js` 404 locally | Copy example file or run `npm run build:config` |
| CORS / 401 from Supabase | Wrong key (use **anon public**); check RLS policies in `mvp-schema.sql` |
| Keys in git history | Rotate anon key in Supabase if you ever committed `supabase-config.js` |

## 6. Security

- **anon** key in the browser is normal for Supabase; access is limited by **RLS**  
- Never add **service_role** or database password to Vercel env for this static site  
- `SUPABASE_*` vars are embedded in the built JS file at deploy time (same as a committed config file)
