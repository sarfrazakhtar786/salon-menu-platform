-- =============================================================================
-- SalonMenu.pk — Admin RLS policies (run after mvp-schema.sql)
-- =============================================================================

-- Admins can read onboarding leads in dashboard / future UI
create policy "platform_leads_admin_select"
  on public.platform_leads for select
  using (public.is_admin());

-- Admins can mark leads reviewed (optional workflow)
create policy "platform_leads_admin_update"
  on public.platform_leads for update
  using (public.is_admin());

-- Admins can read all salons (including draft) — complements salons_owner_select
create policy "salons_admin_insert"
  on public.salons for insert
  with check (public.is_admin());

-- Note: child tables (services, gallery, etc.) still need admin policies before
-- one-click publish from the browser. MVP publish path remains seed SQL.
