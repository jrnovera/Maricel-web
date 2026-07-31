-- Maricel Beauty Center — admin-managed hero images (Home carousel + per-page banners)

create table if not exists public.mbc_hero_images (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  sort_order integer not null default 0,
  eyebrow text,
  title_lead text not null,
  title_accent text,
  body text,
  image text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists mbc_hero_images_page_idx
  on public.mbc_hero_images (page_key, is_active, sort_order);

alter table public.mbc_hero_images enable row level security;

drop policy if exists "mbc hero images are publicly readable" on public.mbc_hero_images;
create policy "mbc hero images are publicly readable" on public.mbc_hero_images
  for select using (is_active = true);
