-- =============================================================================
-- SalonMenu.pk — Admin RLS policies (run after mvp-schema.sql)
-- Safe to re-run: drops existing policy names first, then recreates.
-- =============================================================================

-- Admins can read onboarding leads in dashboard / future UI
drop policy if exists "platform_leads_admin_select" on public.platform_leads;
create policy "platform_leads_admin_select"
  on public.platform_leads for select
  using (public.is_admin());

-- Admins can mark leads reviewed (optional workflow)
drop policy if exists "platform_leads_admin_update" on public.platform_leads;
create policy "platform_leads_admin_update"
  on public.platform_leads for update
  using (public.is_admin());

-- Admins can insert salons (draft publish later via seed SQL remains primary path)
drop policy if exists "salons_admin_insert" on public.salons;
create policy "salons_admin_insert"
  on public.salons for insert
  with check (public.is_admin());

-- Verify (optional)
-- select policyname, tablename from pg_policies
-- where schemaname = 'public'
--   and policyname in (
--     'platform_leads_admin_select',
--     'platform_leads_admin_update',
--     'salons_admin_insert'
--   );

-- Note: child tables (services, gallery, etc.) still need admin policies before
-- one-click publish from the browser. MVP publish path remains seed SQL.
