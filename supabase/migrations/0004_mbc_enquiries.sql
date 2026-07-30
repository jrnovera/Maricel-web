-- Maricel Beauty Center — website enquiries
--
-- Replaces the old mailto: contact form. The website writes here through the
-- service-role client (server action) and the staff portal reads it.

create table if not exists public.mbc_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  subject text,
  service text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists mbc_enquiries_inbox_idx
  on public.mbc_enquiries (is_read, created_at desc);

alter table public.mbc_enquiries enable row level security;

-- No public policies: reads and writes both go through the service-role key
-- behind the server action / staff auth gate. The anon key ships in client JS,
-- so an insert policy here would let anyone POST junk straight into the table.

-- ---------------------------------------------------------------------------
-- Stripe columns are no longer used — payment is settled at the salon.
-- ---------------------------------------------------------------------------
alter table public.mbc_bookings drop column if exists stripe_payment_intent_id;
alter table public.mbc_bookings drop column if exists stripe_session_id;
