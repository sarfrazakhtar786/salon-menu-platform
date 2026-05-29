# Supabase setup — SalonMenu.pk

## 1. Run SQL (order matters)

1. [`supabase/mvp-schema.sql`](../supabase/mvp-schema.sql) — tables + RLS  
2. [`supabase/seed-demo-salons.sql`](../supabase/seed-demo-salons.sql) — noor, glamour, rose-beauty-parlour  

Verify:

```sql
select slug, name, city_name from public.salons;
```

You should see **3 rows**.

## 2. Connect the website

### Local

1. Supabase → **Project Settings** → **API** → copy **Project URL** and **anon public** key  
2. Copy [`assets/js/supabase-config.example.js`](../assets/js/supabase-config.example.js) → `supabase-config.js` (gitignored)  
3. Set `enabled: true`, `url`, and `anonKey`  
4. Refresh the site — homepage + salon pages load from Supabase  

Or use `.env.local` + `npm run build:config` (see [VERCEL.md](./VERCEL.md#4-local-development)).

### Live (Vercel)

Do **not** commit `supabase-config.js`. Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and redeploy — full steps in **[VERCEL.md](./VERCEL.md)**.

If Supabase fails, the app **falls back** to `/salons/data.json`.

## 3. Regenerate seed after JSON changes

```bash
node scripts/generate-supabase-seed.mjs
```

Then re-run `seed-demo-salons.sql` in Supabase.

## 4. What writes to the database

| Action | Table |
|--------|--------|
| Homepage / salon menu read | `salons` + related tables |
| Booking form submit | `booking_requests` |
| Newsletter (when enabled) | `platform_leads` |

## 5. Security notes

- **anon key** in frontend is normal for Supabase; RLS limits what it can do  
- Never put **service_role** key in the browser  
- Keep **database password** in a password manager (not in git)

## 6. Git + deploy

- `supabase-config.js` is in [`.gitignore`](../.gitignore) — never commit it  
- Vercel builds it from env: [VERCEL.md](./VERCEL.md)
