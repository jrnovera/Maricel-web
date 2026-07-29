-- Maricel Beauty Center — staff portal
--
-- Shares the Supabase project with Artisan Salon, so everything stays under
-- the `mbc_` prefix. MBC staff are tracked separately from Artisan staff:
-- a row in mbc_profiles is what makes someone MBC staff.

create table if not exists public.mbc_profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  role text check (role in ('admin', 'therapist')),
  created_at timestamptz not null default now()
);

-- Deliberately NOT auto-created on signup: a public customer signing up must
-- not become staff. Rows here are added explicitly by an admin.

alter table public.mbc_bookings
  add column if not exists assigned_therapist_id uuid
    references public.mbc_profiles(id) on delete set null;

create index if not exists mbc_bookings_therapist_idx
  on public.mbc_bookings (assigned_therapist_id);

alter table public.mbc_profiles enable row level security;

-- Staff reads/writes all go through the service-role client behind an auth
-- gate, so the only policy needed is "let a user see their own row".
drop policy if exists "mbc staff read own profile" on public.mbc_profiles;
create policy "mbc staff read own profile" on public.mbc_profiles
  for select using (auth.uid() = id);
