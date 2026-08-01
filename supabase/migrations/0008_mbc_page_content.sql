-- Maricel Beauty Center — admin-editable copy for every marketing section.
--
-- Deliberately a generic key/value store rather than a column per headline:
-- the field list, labels and grouping live in the admin's content schema
-- (maricel-admin/lib/content-schema.ts), so adding a new editable string is a
-- code change on both apps and never a migration. A missing or empty row means
-- "use the copy hardcoded in the page", which keeps the site rendering fine
-- before an admin has touched anything.

create table if not exists public.mbc_page_content (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  field_key text not null,
  value text not null default '',
  updated_at timestamptz not null default now(),
  unique (page_key, field_key)
);

create index if not exists mbc_page_content_page_idx
  on public.mbc_page_content (page_key);

alter table public.mbc_page_content enable row level security;

drop policy if exists "mbc page content is publicly readable" on public.mbc_page_content;
create policy "mbc page content is publicly readable" on public.mbc_page_content
  for select using (true);
