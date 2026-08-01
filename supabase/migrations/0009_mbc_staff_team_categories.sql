-- Maricel Beauty Center — multiple public-facing role tags per staff member
--
-- `profiles.role` stays a single admin|therapist value — that's portal login
-- permission, not public branding, and must never be conflated with it. This
-- adds a separate array so the public Our Team page can group someone under
-- Therapist, Beauty Specialist, Support Team and/or Admin at once.

alter table public.profiles
  add column if not exists team_categories text[] not null default '{}';
