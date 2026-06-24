-- Run this in your Supabase project's SQL Editor (left sidebar) before anything else.

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  preferred_date date,
  status text default 'new', -- new, contacted, booked, closed
  created_at timestamptz default now()
);

alter table leads enable row level security;

-- Anyone (including non-logged-in visitors) can submit the public booking form.
create policy "Anyone can submit a lead"
  on leads for insert
  to anon
  with check (true);

-- Only the signed-in business owner can see leads.
create policy "Authenticated users can view leads"
  on leads for select
  to authenticated
  using (true);

-- Only the signed-in business owner can update lead status.
create policy "Authenticated users can update leads"
  on leads for update
  to authenticated
  using (true);
