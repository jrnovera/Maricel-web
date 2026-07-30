-- Maricel Beauty Center — admin-managed gallery + blog SEO fields

-- ---------------------------------------------------------------------------
-- Gallery
-- ---------------------------------------------------------------------------
create table if not exists public.mbc_gallery (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  caption text not null,
  category text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists mbc_gallery_active_idx
  on public.mbc_gallery (is_active, sort_order, created_at desc);

alter table public.mbc_gallery enable row level security;

drop policy if exists "mbc gallery is publicly readable" on public.mbc_gallery;
create policy "mbc gallery is publicly readable" on public.mbc_gallery
  for select using (is_active = true);

-- ---------------------------------------------------------------------------
-- Blog SEO fields
-- ---------------------------------------------------------------------------
alter table public.mbc_blog_posts
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists author text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists updated_at timestamptz not null default now();

-- ---------------------------------------------------------------------------
-- Storage bucket for staff-uploaded gallery images and blog covers.
-- Public read so <Image> can load them; writes go through the service-role
-- key from the staff portal only.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('mbc-media', 'mbc-media', true)
on conflict (id) do update set public = true;

drop policy if exists "mbc media is publicly readable" on storage.objects;
create policy "mbc media is publicly readable" on storage.objects
  for select using (bucket_id = 'mbc-media');
