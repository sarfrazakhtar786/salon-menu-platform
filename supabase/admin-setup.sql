-- =============================================================================
-- SalonMenu.pk — Admin auth setup (run in Supabase SQL Editor)
-- =============================================================================
-- Prerequisites:
--   1. Authentication → Providers → Email enabled
--   2. Create user: Authentication → Users → Add user (email + password)
--   3. Replace YOUR_ADMIN_EMAIL below, then run this file
--   4. Run supabase/admin-auth-policies.sql if not already applied
-- =============================================================================

-- Auto-create profile on signup (safe to re-run)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Promote your admin user (edit email)
insert into public.profiles (id, role, full_name)
select u.id, 'admin', coalesce(u.raw_user_meta_data ->> 'full_name', split_part(u.email, '@', 1))
from auth.users u
where u.email = 'YOUR_ADMIN_EMAIL@example.com'
on conflict (id) do update
set role = 'admin';

-- Verify
select u.email, p.role, p.full_name
from auth.users u
join public.profiles p on p.id = u.id
where p.role = 'admin';
