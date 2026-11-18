create table if not exists public.guide_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'hikima-forge-website',
  consent_to_delivery boolean not null default false,
  created_at timestamptz not null default now(),
  constraint guide_subscribers_email_length check (char_length(email) between 5 and 254)
);
create index if not exists guide_subscribers_created_at_idx on public.guide_subscribers (created_at desc);
alter table public.guide_subscribers enable row level security;
-- No public table grants / insert policies; only the trusted Edge Function inserts via a server-side secret key.
revoke all on table public.guide_subscribers from anon, authenticated;
