# Admin onboarding (live)

**Option A — admin only.** Salon owners do **not** get login, signup, or dashboard in this phase. Owners are onboarded by your team via this form + manual publish.

Admin-only salon onboarding form with Supabase Auth.

## URLs

| Page | URL |
|------|-----|
| Login | `https://salon-menu-platform.vercel.app/admin/login.html` |
| Onboard form | `https://salon-menu-platform.vercel.app/admin/onboard.html` |

(Custom domain later: `/admin/login.html` on your domain.)

Pages use `noindex` — not for public SEO.

**If you get 404:** Vercel is serving an old deployment. Dashboard → **Deployments** → latest commit `e6556e9` or newer → **Redeploy**, or wait for the Git push after this doc update.

## One-time Supabase setup

### 1. Enable Email auth

Supabase → **Authentication** → **Providers** → **Email** → enable.

### 2. Create admin user

**Authentication** → **Users** → **Add user** → email + password.

### 3. Run SQL (in order)

1. [`supabase/admin-setup.sql`](../supabase/admin-setup.sql) — edit `YOUR_ADMIN_EMAIL@example.com` first  
2. [`supabase/admin-auth-policies.sql`](../supabase/admin-auth-policies.sql)

Verify:

```sql
select u.email, p.role from auth.users u join public.profiles p on p.id = u.id where p.role = 'admin';
```

### 4. Deploy site

Vercel env (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) must be set — same as main site.

## Daily workflow

1. Open `https://your-domain.com/admin/login.html`  
2. Sign in as admin  
3. Fill salon form → **Save to Supabase** (`platform_leads`, source `admin_onboard_form`)  
4. **Download data.json** → merge into repo `salons/data.json`  
5. `npm run db:seed-sql` → run SQL in Supabase  
6. Verify live `/salons/{slug}`

## Security notes

- Only users with `profiles.role = 'admin'` can open the form.  
- **Salon owners:** no auth, no self-serve listing — WhatsApp / phone only until a future owner portal.  
- Session stored in browser (Supabase Auth). Use a strong password.  
- Anon key in frontend is normal; admin actions are gated by **RLS** + **JWT role**.  
- Do not create `salon_owner` users or share admin credentials with clients.

## Local dev

```bash
python -m http.server 4173
```

Open `http://127.0.0.1:4173/admin/login.html` (needs `assets/js/supabase-config.js`).

Legacy local form: [`local-tools/salon-onboarding-form.html`](../local-tools/salon-onboarding-form.html) (no auth).
