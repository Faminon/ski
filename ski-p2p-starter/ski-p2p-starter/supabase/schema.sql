-- Schemas
create schema if not exists app;
create extension if not exists pgcrypto;

-- Users & profiles (Supabase provides auth.users)
create table if not exists app.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Resorts
create table if not exists app.resorts (
  slug text primary key, -- e.g. 'chamonix-mont-blanc'
  name text not null,
  country text not null default 'FR',
  lat double precision,
  lng double precision
);

-- Listings (chalet/apartment)
create table if not exists app.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  resort_slug text references app.resorts(slug) on delete set null,
  title text not null,
  description text,
  nightly_price_eur numeric(10,2) not null check (nightly_price_eur > 0),
  max_guests int not null check (max_guests > 0),
  thumbnail_url text,
  created_at timestamptz default now()
);

-- Availability (simple date ranges)
create table if not exists app.availability (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references app.listings(id) on delete cascade not null,
  start_date date not null,
  end_date date not null,
  constraint valid_range check (start_date < end_date)
);

-- Bookings
create table if not exists app.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references app.listings(id) on delete cascade not null,
  guest_id uuid references auth.users(id) on delete set null,
  start_date date not null,
  end_date date not null,
  guests int not null check (guests > 0),
  status text not null default 'pending', -- pending|confirmed|cancelled
  created_at timestamptz default now()
);

-- Reviews
create table if not exists app.reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references app.listings(id) on delete cascade not null,
  author_id uuid references auth.users(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- Public view for mobile (restricted columns)
create or replace view public.listings_public as
  select l.id, l.title, l.nightly_price_eur, l.max_guests, l.resort_slug, l.thumbnail_url, l.description
  from app.listings l;

alter view public.listings_public owner to postgres;

-- Row Level Security
alter table app.profiles enable row level security;
alter table app.listings enable row level security;
alter table app.availability enable row level security;
alter table app.bookings enable row level security;
alter table app.reviews enable row level security;

-- Policies
create policy "profiles are viewable by everyone" on app.profiles for select using (true);
create policy "users can update own profile" on app.profiles for update using (auth.uid() = id);

create policy "listings are viewable by everyone" on app.listings for select using (true);
create policy "owners can manage own listings" on app.listings for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create policy "availability viewable by everyone" on app.availability for select using (true);
create policy "owners manage availability of own listings" on app.availability
  for all using (exists (select 1 from app.listings l where l.id = availability.listing_id and l.owner_id = auth.uid()))
  with check (exists (select 1 from app.listings l where l.id = availability.listing_id and l.owner_id = auth.uid()));

create policy "bookings selectable by owner or guest" on app.bookings for select using (
  auth.uid() = guest_id or exists (select 1 from app.listings l where l.id = bookings.listing_id and l.owner_id = auth.uid())
);
create policy "logged in users can insert bookings" on app.bookings for insert with check (auth.uid() is not null);
create policy "guest can update own booking" on app.bookings for update using (auth.uid() = guest_id);

create policy "reviews viewable by everyone" on app.reviews for select using (true);
create policy "logged in users can insert reviews" on app.reviews for insert with check (auth.uid() is not null);

-- Sample resorts
insert into app.resorts (slug, name, country, lat, lng) values
  ('chamonix', 'Chamonix', 'FR', 45.9237, 6.8694),
  ('val-thorens', 'Val Thorens', 'FR', 45.2970, 6.5810)
on conflict (slug) do nothing;
