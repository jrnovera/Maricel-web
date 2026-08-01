-- Maricel Beauty Center — public-facing staff profile fields
--
-- The live `profiles` table (staff/role membership) predates this repo's
-- migrations, so it's extended here rather than recreated. These columns let
-- an admin choose which staff show on the public Our Team page, with their
-- own photo, public-facing title, and bio.

alter table public.profiles
  add column if not exists photo_url text,
  add column if not exists display_role text,
  add column if not exists bio text,
  add column if not exists show_on_site boolean not null default false,
  add column if not exists sort_order integer not null default 0;
