-- Maricel Beauty Center
--
-- This runs in the SAME Supabase project as Artisan Salon, so every table is
-- prefixed `mbc_` to keep the two businesses' data completely separate.
-- Do not point MBC at Artisan's `services` / `bookings` tables.

create table if not exists public.mbc_services (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  price numeric(10, 2) not null,
  price_label text,               -- e.g. "From AED 25" when price is a floor
  duration_minutes integer not null default 60,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (category, name)
);

create table if not exists public.mbc_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  service_id uuid references public.mbc_services on delete set null,

  full_name text not null,
  phone text not null,
  email text,

  service_label text not null,    -- snapshot: survives a service being renamed
  booking_date date not null,
  time_slot text not null,
  notes text,

  amount numeric(10, 2) not null default 0,
  status text not null default 'pending'
    check (status in ('pending','confirmed','in_progress','completed','cancelled')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','partial','paid','refunded')),
  stripe_payment_intent_id text,
  stripe_session_id text,

  created_at timestamptz not null default now()
);

create index if not exists mbc_bookings_date_idx
  on public.mbc_bookings (booking_date, status);
create index if not exists mbc_bookings_user_idx
  on public.mbc_bookings (user_id);

alter table public.mbc_services enable row level security;
alter table public.mbc_bookings enable row level security;

-- Postgres has no "create policy if not exists", so each policy is dropped
-- first — that keeps this file safe to re-run after a partial apply.

-- Price list is public; writes go through the service role only.
drop policy if exists "mbc services are publicly readable" on public.mbc_services;
create policy "mbc services are publicly readable" on public.mbc_services
  for select using (true);

-- Bookings are written ONLY by the server action, which uses the service-role
-- key and bypasses RLS. Deliberately no public insert policy: the anon key is
-- visible in client-side JS, so `with check (true)` would let anyone POST
-- junk rows straight into this table.
drop policy if exists "anyone can request an mbc booking" on public.mbc_bookings;

-- Signed-in clients may read back their own appointments.
drop policy if exists "users read their own mbc bookings" on public.mbc_bookings;
create policy "users read their own mbc bookings" on public.mbc_bookings
  for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Seed the published price list
-- ---------------------------------------------------------------------------
insert into public.mbc_services (category, name, price, price_label, duration_minutes, sort_order) values
  ('Hair Services', 'Hair Cut', 80, null, 45, 1),
  ('Hair Services', 'Wash & Blow Dry', 120, null, 45, 2),
  ('Hair Services', 'Root Color', 180, null, 90, 3),
  ('Hair Services', 'Full Hair Color', 250, null, 120, 4),
  ('Hair Services', 'Hair Spa Treatment', 220, null, 60, 5),
  ('Hair Services', 'Keratin Treatment', 650, null, 180, 6),

  ('Nail Care', 'Classic Manicure', 60, null, 45, 10),
  ('Nail Care', 'Classic Pedicure', 80, null, 45, 11),
  ('Nail Care', 'Gel Manicure', 120, null, 60, 12),
  ('Nail Care', 'Gel Pedicure', 140, null, 60, 13),
  ('Nail Care', 'Nail Extension', 220, null, 90, 14),
  ('Nail Care', 'Nail Art', 25, 'From AED 25', 30, 15),

  ('Skin Care / Facials', 'Express Facial', 150, null, 30, 20),
  ('Skin Care / Facials', 'Deep Cleansing Facial', 220, null, 60, 21),
  ('Skin Care / Facials', 'Hydrating Facial', 250, null, 60, 22),
  ('Skin Care / Facials', 'Anti-Aging Facial', 320, null, 75, 23),
  ('Skin Care / Facials', 'Brightening Facial', 280, null, 60, 24),
  ('Skin Care / Facials', 'Premium Guinot Facial', 380, null, 90, 25),

  ('Brows & Lashes', 'Eyebrow Threading', 35, null, 20, 30),
  ('Brows & Lashes', 'Upper Lip Threading', 20, null, 15, 31),
  ('Brows & Lashes', 'Brow Tint', 60, null, 30, 32),
  ('Brows & Lashes', 'Lash Tint', 60, null, 30, 33),
  ('Brows & Lashes', 'Lash Lift', 180, null, 60, 34),
  ('Brows & Lashes', 'Brow Lamination', 200, null, 60, 35),
  ('Brows & Lashes', 'Eyelash Extension', 250, null, 90, 36),

  ('Waxing', 'Underarms', 35, null, 20, 40),
  ('Waxing', 'Half Arms', 50, null, 30, 41),
  ('Waxing', 'Full Arms', 80, null, 40, 42),
  ('Waxing', 'Half Legs', 70, null, 40, 43),
  ('Waxing', 'Full Legs', 120, null, 60, 44),
  ('Waxing', 'Full Body Wax', 280, 'From AED 280', 120, 45),

  ('Makeup & Styling', 'Hair Styling', 150, null, 60, 50),
  ('Makeup & Styling', 'Party Makeup', 250, null, 60, 51),
  ('Makeup & Styling', 'Soft Glam Makeup', 350, null, 75, 52),
  ('Makeup & Styling', 'Bridal Makeup', 850, 'From AED 850', 150, 53),

  ('Body & Massage', 'Relaxing Massage (60 min)', 180, null, 60, 60),
  ('Body & Massage', 'Deep Tissue Massage (60 min)', 220, null, 60, 61),
  ('Body & Massage', 'Hot Oil Massage (60 min)', 220, null, 60, 62),
  ('Body & Massage', 'Hot Stone Therapy', 260, null, 75, 63)
on conflict (category, name) do nothing;
