-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (replaces 'users' and 'settings' tables)
-- Links to Supabase Auth.users
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,

  -- Membership system
  membership_tier integer default 1, -- 1=basic, 2=premium, 3=super
  stripe_customer_id text,
  subscription_status text default 'inactive', -- 'active', 'inactive', 'cancelled'
  subscription_end_date timestamp with time zone,

  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Profiles
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;

create policy "Users can view their own profile."
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 1.1 User Home Settings (replaces profiles.settings)
create table public.user_home_settings (
  user_id uuid references auth.users not null primary key,
  view_mode text default 'general',
  engine_index integer default 0,
  date_format_index integer default 0,
  time_format text default '24h',
  locale text default 'zh',
  wallpaper text,
  theme text default 'handdrawn',
  color_mode text default 'light',
  schema_version integer default 1,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.user_home_settings enable row level security;

create policy "Users can view their own home settings."
  on public.user_home_settings for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own home settings."
  on public.user_home_settings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own home settings."
  on public.user_home_settings for update
  using ( auth.uid() = user_id );

-- 1.2 User Sites
create table public.user_sites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  url text not null,
  show_on_home boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.user_sites add constraint user_sites_user_id_id_unique unique (user_id, id);

alter table public.user_sites enable row level security;

create policy "Users can view their own sites."
  on public.user_sites for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own sites."
  on public.user_sites for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own sites."
  on public.user_sites for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own sites."
  on public.user_sites for delete
  using ( auth.uid() = user_id );

create index idx_user_sites_user_id on public.user_sites(user_id);

-- 1.3 User Tags (normalized, keyed by name per user)
create table public.user_tags (
  user_id uuid references auth.users not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, name)
);

alter table public.user_tags enable row level security;

create policy "Users can view their own tags."
  on public.user_tags for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own tags."
  on public.user_tags for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own tags."
  on public.user_tags for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own tags."
  on public.user_tags for delete
  using ( auth.uid() = user_id );

create index idx_user_tags_user_id on public.user_tags(user_id);

-- 1.4 Site <-> Tag relation
create table public.user_site_tags (
  user_id uuid references auth.users not null,
  site_id uuid not null,
  tag_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, site_id, tag_name),
  foreign key (user_id, site_id)
    references public.user_sites(user_id, id)
    on delete cascade,
  foreign key (user_id, tag_name)
    references public.user_tags(user_id, name)
    on update cascade
    on delete cascade
);

alter table public.user_site_tags enable row level security;

create policy "Users can view their own site-tag links."
  on public.user_site_tags for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own site-tag links."
  on public.user_site_tags for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own site-tag links."
  on public.user_site_tags for delete
  using ( auth.uid() = user_id );

create index idx_user_site_tags_user_id on public.user_site_tags(user_id);
create index idx_user_site_tags_site_id on public.user_site_tags(site_id);

-- 1.5 Order tables
create table public.user_site_order (
  user_id uuid references auth.users not null,
  site_id uuid not null,
  position integer not null,
  primary key (user_id, site_id),
  constraint user_site_order_position_unique unique (user_id, position),
  foreign key (user_id, site_id)
    references public.user_sites(user_id, id)
    on delete cascade
);

alter table public.user_site_order enable row level security;

create policy "Users can view their own site order."
  on public.user_site_order for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own site order."
  on public.user_site_order for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own site order."
  on public.user_site_order for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own site order."
  on public.user_site_order for delete
  using ( auth.uid() = user_id );

create index idx_user_site_order_user_id on public.user_site_order(user_id);

create table public.user_tag_order (
  user_id uuid references auth.users not null,
  tag_name text not null,
  position integer not null,
  primary key (user_id, tag_name),
  constraint user_tag_order_position_unique unique (user_id, position),
  foreign key (user_id, tag_name)
    references public.user_tags(user_id, name)
    on update cascade
    on delete cascade
);

alter table public.user_tag_order enable row level security;

create policy "Users can view their own tag order."
  on public.user_tag_order for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own tag order."
  on public.user_tag_order for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own tag order."
  on public.user_tag_order for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own tag order."
  on public.user_tag_order for delete
  using ( auth.uid() = user_id );

create index idx_user_tag_order_user_id on public.user_tag_order(user_id);

-- 2. Wallpaper Categories Table
create table public.wallpaper_categories (
  id bigint generated by default as identity primary key,
  name text unique not null,
  name_en text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Categories (Public Read, Admin Write - assuming 'service_role' or manual insert for now)
alter table public.wallpaper_categories enable row level security;

create policy "Categories are viewable by everyone."
  on public.wallpaper_categories for select
  using ( true );

-- Initial Categories
insert into public.wallpaper_categories (name, name_en) values
('风景', 'Landscape'),
('纯色', 'Solid Color'),
('每日推荐', 'Daily Recommendation'),
('Custom', 'Custom')
on conflict do nothing;

-- 3. Wallpapers Table (replaces 'daily_wallpapers' and 'user_wallpapers')
create table public.wallpapers (
  id bigint generated by default as identity primary key,
  url text not null,
  category text not null,
  source text default 'system', -- 'system' or 'user'
  user_id uuid references auth.users, -- null for system wallpapers
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Wallpapers
alter table public.wallpapers enable row level security;

create policy "Wallpapers are viewable by everyone."
  on public.wallpapers for select
  using ( true );

create policy "Users can delete their own wallpapers."
  on public.wallpapers for delete
  using ( auth.uid() = user_id );

create policy "Users can insert their own wallpapers."
  on public.wallpapers for insert
  with check ( auth.uid() = user_id );

-- 4. Transactional sync RPC for normalized home config
-- p_payload format:
-- {
--   sites: [{id, name, url, tags:[], showOnHome}],
--   tags: ["tag"],
--   site_order: ["uuid"],
--   tag_order: ["tag"],
--   settings: {viewMode, engineIndex, dateFormatIndex, timeFormat, locale, wallpaper, theme, colorMode, schema_version},
--   updated_at: "ISO"
-- }
create or replace function public.sync_home_config(p_payload jsonb)
returns void as $$
declare
  v_uid uuid;
  v_updated_at timestamptz;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  v_updated_at := coalesce((p_payload->>'updated_at')::timestamptz, now());

  -- Home settings upsert
  insert into public.user_home_settings (
    user_id,
    view_mode,
    engine_index,
    date_format_index,
    time_format,
    locale,
    wallpaper,
    theme,
    color_mode,
    schema_version,
    updated_at
  ) values (
    v_uid,
    coalesce(p_payload#>>'{settings,viewMode}', 'general'),
    coalesce((p_payload#>>'{settings,engineIndex}')::int, 0),
    coalesce((p_payload#>>'{settings,dateFormatIndex}')::int, 0),
    coalesce(p_payload#>>'{settings,timeFormat}', '24h'),
    coalesce(p_payload#>>'{settings,locale}', 'zh'),
    nullif(p_payload#>>'{settings,wallpaper}', ''),
    coalesce(p_payload#>>'{settings,theme}', 'handdrawn'),
    coalesce(p_payload#>>'{settings,colorMode}', 'light'),
    coalesce((p_payload#>>'{settings,schema_version}')::int, 1),
    v_updated_at
  )
  on conflict (user_id)
  do update set
    view_mode = excluded.view_mode,
    engine_index = excluded.engine_index,
    date_format_index = excluded.date_format_index,
    time_format = excluded.time_format,
    locale = excluded.locale,
    wallpaper = excluded.wallpaper,
    theme = excluded.theme,
    color_mode = excluded.color_mode,
    schema_version = excluded.schema_version,
    updated_at = excluded.updated_at;

  -- Tags upsert + delete missing
  insert into public.user_tags (user_id, name, updated_at)
  select v_uid, value, v_updated_at
  from jsonb_array_elements_text(coalesce(p_payload->'tags', '[]'::jsonb))
  on conflict (user_id, name)
  do update set updated_at = excluded.updated_at;

  delete from public.user_tags
  where user_id = v_uid
    and name not in (
      select value from jsonb_array_elements_text(coalesce(p_payload->'tags', '[]'::jsonb))
    );

  -- Sites upsert + delete missing
  insert into public.user_sites (id, user_id, name, url, show_on_home, updated_at)
  select
    (elem->>'id')::uuid,
    v_uid,
    coalesce(elem->>'name', ''),
    coalesce(elem->>'url', ''),
    coalesce((elem->>'showOnHome')::boolean, true),
    v_updated_at
  from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb)) as elem
  on conflict (id)
  do update set
    name = excluded.name,
    url = excluded.url,
    show_on_home = excluded.show_on_home,
    updated_at = excluded.updated_at
  where public.user_sites.user_id = v_uid;

  delete from public.user_sites
  where user_id = v_uid
    and id not in (
      select (elem->>'id')::uuid
      from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb)) as elem
    );

  -- Rebuild site-tag relations
  delete from public.user_site_tags where user_id = v_uid;

  insert into public.user_site_tags (user_id, site_id, tag_name, created_at)
  select
    v_uid,
    us.id as site_id,
    t.value as tag_name,
    now()
  from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb)) as s
  join public.user_sites us
    on us.user_id = v_uid
   and us.id = (s->>'id')::uuid
  cross join lateral jsonb_array_elements_text(coalesce(s->'tags', '[]'::jsonb)) as t(value);

  -- Rebuild orders
  delete from public.user_site_order where user_id = v_uid;
  insert into public.user_site_order (user_id, site_id, position)
  select v_uid, us.id, (v.ordinality - 1)
  from jsonb_array_elements_text(coalesce(p_payload->'site_order', '[]'::jsonb)) with ordinality as v(value, ordinality)
  join public.user_sites us
    on us.user_id = v_uid
   and us.id = (v.value)::uuid;

  delete from public.user_tag_order where user_id = v_uid;
  insert into public.user_tag_order (user_id, tag_name, position)
  select v_uid, v.value, (v.ordinality - 1)
  from jsonb_array_elements_text(coalesce(p_payload->'tag_order', '[]'::jsonb)) with ordinality as v(value, ordinality);
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.sync_home_config(jsonb) from public;
grant execute on function public.sync_home_config(jsonb) to authenticated;

-- Function to handle new user signup (auto-create profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');

  insert into public.user_home_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Trigger to call the function on sign up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
