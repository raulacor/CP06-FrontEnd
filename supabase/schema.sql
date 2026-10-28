-- Run once in Supabase → SQL Editor. Safe to re-run.
-- Change the email in is_owner() to the one you use to log in to the dashboard.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.featured_projects (
  repo_name text primary key,
  created_at timestamptz not null default now()
);

-- Only the site owner may read messages or change featured projects.
create or replace function public.is_owner()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'raul.azzi.corsi@gmail.com'
$$;

alter table public.messages enable row level security;
alter table public.featured_projects enable row level security;

grant insert on public.messages to anon, authenticated;
grant select, update on public.messages to authenticated;
grant select on public.featured_projects to anon, authenticated;
grant insert, delete on public.featured_projects to authenticated;

drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message" on public.messages
  for insert to anon, authenticated
  with check (answered = false);

drop policy if exists "Owner reads messages" on public.messages;
create policy "Owner reads messages" on public.messages
  for select to authenticated
  using (public.is_owner());

drop policy if exists "Owner updates messages" on public.messages;
create policy "Owner updates messages" on public.messages
  for update to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists "Anyone reads featured projects" on public.featured_projects;
create policy "Anyone reads featured projects" on public.featured_projects
  for select to anon, authenticated
  using (true);

drop policy if exists "Owner adds featured projects" on public.featured_projects;
create policy "Owner adds featured projects" on public.featured_projects
  for insert to authenticated
  with check (public.is_owner());

drop policy if exists "Owner removes featured projects" on public.featured_projects;
create policy "Owner removes featured projects" on public.featured_projects
  for delete to authenticated
  using (public.is_owner());
