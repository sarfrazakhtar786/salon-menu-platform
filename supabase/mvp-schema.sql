-- =============================================================================
-- SalonMenu.pk — MVP database schema (Supabase / PostgreSQL)
-- =============================================================================
-- How to use:
--   1. Create a project at https://supabase.com
--   2. Open SQL Editor → New query
--   3. Paste this entire file and click Run
--   4. Optional: run seed section at the bottom after schema succeeds
--
-- Matches current static JSON: salons, services, packages, gallery, reviews,
-- WhatsApp booking, and future owner dashboard / leads.
-- =============================================================================

-- Extensions
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------

create type public.user_role as enum ('customer', 'salon_owner', 'admin');

create type public.salon_status as enum ('draft', 'published', 'archived');

create type public.verification_status as enum ('unverified', 'pending', 'verified');

create type public.booking_status as enum (
  'draft',
  'sent_whatsapp',
  'acknowledged',
  'completed',
  'cancelled'
);

create type public.lead_type as enum (
  'owner_listing',
  'newsletter',
  'contact'
);

create type public.social_platform as enum (
  'instagram',
  'facebook',
  'tiktok',
  'youtube',
  'whatsapp'
);

-- -----------------------------------------------------------------------------
-- Profiles (extends auth.users when you enable Supabase Auth)
-- -----------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'customer',
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'App users; salon owners link to salons via salon_members.';

-- -----------------------------------------------------------------------------
-- Reference: cities
-- -----------------------------------------------------------------------------

create table public.cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  province text,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index cities_active_order_idx on public.cities (is_active, display_order);

-- -----------------------------------------------------------------------------
-- Salons (core listing)
-- -----------------------------------------------------------------------------

create table public.salons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status public.salon_status not null default 'draft',
  verification_status public.verification_status not null default 'unverified',

  name text not null,
  tagline text,
  city_id uuid references public.cities (id) on delete set null,
  city_name text not null,
  area text,
  address text,
  phone text,
  whatsapp text not null,
  timings text,
  weekly_off text,

  brand_color char(7) default '#BD8282',
  price_level text,
  hero_image_url text,

  stats_clients_label text,
  stats_experience_label text,
  stats_rating numeric(2, 1) check (stats_rating is null or (stats_rating >= 0 and stats_rating <= 5)),

  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint salons_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index salons_status_city_idx on public.salons (status, city_name);
create index salons_featured_idx on public.salons (is_featured) where status = 'published';
create index salons_whatsapp_idx on public.salons (whatsapp);

comment on table public.salons is 'Salon listing; public site reads status = published only.';

-- Owner ↔ salon (multi-staff later)
create table public.salon_members (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique (salon_id, user_id)
);

create index salon_members_user_idx on public.salon_members (user_id);

-- Business tags (Ladies Only, Bridal Expert, …)
create table public.business_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table public.salon_tags (
  salon_id uuid not null references public.salons (id) on delete cascade,
  tag_id uuid not null references public.business_tags (id) on delete cascade,
  primary key (salon_id, tag_id)
);

-- Social links
create table public.salon_social_links (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  platform public.social_platform not null,
  url text not null,
  unique (salon_id, platform)
);

-- Gallery images (ordered)
create table public.salon_gallery_images (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index salon_gallery_salon_order_idx on public.salon_gallery_images (salon_id, sort_order);

-- Service categories (per salon — matches JSON "Facial", "Hair", …)
create table public.service_categories (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  name text not null,
  slug text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  unique (salon_id, slug)
);

create index service_categories_salon_idx on public.service_categories (salon_id, sort_order);

-- Individual services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  category_id uuid not null references public.service_categories (id) on delete cascade,
  name text not null,
  description text,
  duration_label text,
  price_pkr int not null check (price_pkr >= 0),
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_salon_category_idx on public.services (salon_id, category_id, sort_order);
create index services_price_idx on public.services (salon_id, price_pkr);

-- Packages / combos
create table public.packages (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  name text not null,
  price_pkr int not null check (price_pkr >= 0),
  original_price_pkr int check (original_price_pkr is null or original_price_pkr >= 0),
  promo_tag text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.package_items (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages (id) on delete cascade,
  label text not null,
  sort_order int not null default 0
);

create index packages_salon_idx on public.packages (salon_id, sort_order);

-- Reviews (salon page testimonials)
create table public.salon_reviews (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  author_name text not null,
  body text not null,
  stars smallint not null check (stars between 1 and 5),
  is_verified boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index salon_reviews_salon_idx on public.salon_reviews (salon_id, is_published);

-- Booking requests (WhatsApp flow — store for analytics / future dashboard)
create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons (id) on delete cascade,
  status public.booking_status not null default 'sent_whatsapp',

  customer_name text not null,
  customer_phone text not null,
  preferred_date date,
  preferred_time time,
  notes text,

  services_snapshot jsonb not null default '[]'::jsonb,
  total_pkr int,
  whatsapp_message text,

  source text default 'salon_menu',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index booking_requests_salon_created_idx on public.booking_requests (salon_id, created_at desc);

-- Platform leads (List Your Salon, newsletter, etc.)
create table public.platform_leads (
  id uuid primary key default gen_random_uuid(),
  lead_type public.lead_type not null,
  name text,
  email text,
  phone text,
  message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index platform_leads_type_created_idx on public.platform_leads (lead_type, created_at desc);

-- -----------------------------------------------------------------------------
-- updated_at trigger
-- -----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger salons_set_updated_at
  before update on public.salons
  for each row execute function public.set_updated_at();

create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

create trigger packages_set_updated_at
  before update on public.packages
  for each row execute function public.set_updated_at();

create trigger booking_requests_set_updated_at
  before update on public.booking_requests
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup (when Auth enabled)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

-- Run only after enabling Supabase Auth:
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Row Level Security (RLS)
-- -----------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.cities enable row level security;
alter table public.salons enable row level security;
alter table public.salon_members enable row level security;
alter table public.business_tags enable row level security;
alter table public.salon_tags enable row level security;
alter table public.salon_social_links enable row level security;
alter table public.salon_gallery_images enable row level security;
alter table public.service_categories enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.package_items enable row level security;
alter table public.salon_reviews enable row level security;
alter table public.booking_requests enable row level security;
alter table public.platform_leads enable row level security;

-- Helper: is salon owner or admin
create or replace function public.is_salon_member(p_salon_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.salon_members sm
    where sm.salon_id = p_salon_id
      and sm.user_id = auth.uid()
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- Public read: published salon ecosystem
create policy "cities_public_read"
  on public.cities for select
  using (is_active = true);

create policy "salons_public_read"
  on public.salons for select
  using (status = 'published');

create policy "salon_tags_public_read"
  on public.salon_tags for select
  using (
    exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "business_tags_public_read"
  on public.business_tags for select
  using (true);

create policy "salon_social_public_read"
  on public.salon_social_links for select
  using (
    exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "salon_gallery_public_read"
  on public.salon_gallery_images for select
  using (
    exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "service_categories_public_read"
  on public.service_categories for select
  using (
    is_active = true
    and exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "services_public_read"
  on public.services for select
  using (
    is_active = true
    and exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "packages_public_read"
  on public.packages for select
  using (
    is_active = true
    and exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "package_items_public_read"
  on public.package_items for select
  using (
    exists (
      select 1
      from public.packages p
      join public.salons s on s.id = p.salon_id
      where p.id = package_id and s.status = 'published' and p.is_active = true
    )
  );

create policy "salon_reviews_public_read"
  on public.salon_reviews for select
  using (
    is_published = true
    and exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

-- Anyone can submit booking + leads (anon OK for MVP)
create policy "booking_requests_insert"
  on public.booking_requests for insert
  with check (
    exists (
      select 1 from public.salons s
      where s.id = salon_id and s.status = 'published'
    )
  );

create policy "platform_leads_insert"
  on public.platform_leads for insert
  with check (true);

-- Profiles: own row only
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Salon owners: manage their salons (when Auth + salon_members populated)
create policy "salons_owner_select"
  on public.salons for select
  using (public.is_salon_member(id) or public.is_admin());

create policy "salons_owner_update"
  on public.salons for update
  using (public.is_salon_member(id) or public.is_admin());

-- Admins: full access on salons (extend similar policies later for child tables)

-- -----------------------------------------------------------------------------
-- Convenience view: public salon card (homepage / explore)
-- -----------------------------------------------------------------------------

create or replace view public.v_published_salons as
select
  s.id,
  s.slug,
  s.name,
  s.tagline,
  s.city_name,
  s.area,
  s.price_level,
  s.hero_image_url,
  s.stats_rating,
  s.is_featured,
  s.whatsapp,
  coalesce(
    (
      select jsonb_agg(bt.name order by bt.name)
      from public.salon_tags st
      join public.business_tags bt on bt.id = st.tag_id
      where st.salon_id = s.id
    ),
    '[]'::jsonb
  ) as business_tags
from public.salons s
where s.status = 'published';

grant select on public.v_published_salons to anon, authenticated;

-- =============================================================================
-- SEED: cities + tags (safe to re-run with ON CONFLICT)
-- =============================================================================

insert into public.cities (name, slug, province, display_order) values
  ('Lahore', 'lahore', 'Punjab', 1),
  ('Karachi', 'karachi', 'Sindh', 2),
  ('Islamabad', 'islamabad', 'ICT', 3),
  ('Rawalpindi', 'rawalpindi', 'Punjab', 4),
  ('Faisalabad', 'faisalabad', 'Punjab', 5),
  ('Multan', 'multan', 'Punjab', 6),
  ('Sahiwal', 'sahiwal', 'Punjab', 7),
  ('Gujranwala', 'gujranwala', 'Punjab', 8)
on conflict (slug) do nothing;

insert into public.business_tags (name, slug) values
  ('Ladies Only', 'ladies-only'),
  ('Unisex', 'unisex'),
  ('Bridal Expert', 'bridal-expert'),
  ('Home Service', 'home-service'),
  ('Parking', 'parking'),
  ('Premium Makeup', 'premium-makeup'),
  ('Nail Art', 'nail-art'),
  ('Card Payment', 'card-payment')
on conflict (slug) do nothing;

-- =============================================================================
-- Done. Next steps:
--   • Migrate salons/data.json → INSERT scripts or Edge Function
--   • Enable Auth → uncomment on_auth_user_created trigger
--   • Storage bucket: salon-heroes, salon-gallery
--   • See docs/supabase-mvp-schema.md for ERD notes
-- =============================================================================
