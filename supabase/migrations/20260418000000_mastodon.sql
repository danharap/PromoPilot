-- Run in Supabase SQL editor if not already applied
alter table platform_connections add column if not exists platform_base_url text;

create table if not exists mastodon_instance_apps (
  instance_host text primary key,
  client_id text not null,
  client_secret text not null,
  redirect_uri text not null,
  created_at timestamptz default now()
);

alter table mastodon_instance_apps enable row level security;
