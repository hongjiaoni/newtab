-- ============================================
-- NewTab Staging Initialization (Full)
-- Assumes Supabase default auth schema: auth.users
-- Includes existing tables + premium + feedback + new features:
-- - search_logs
-- - search_engines (global)
-- - app_settings (home_footer)
-- ============================================

begin;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================
-- 1) Core tables
-- =============================

create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,

  membership_tier integer default 1,
  stripe_customer_id text,
  subscription_status text default 'inactive',
  subscription_end_date timestamp with time zone,

  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile." on public.profiles;
drop policy if exists "Users can insert their own profile." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;

create policy "Users can view their own profile."
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

create table if not exists public.user_home_settings (
  user_id uuid references auth.users not null primary key,
  view_mode text default 'general',
  engine_index integer default 0,
  engine_id text,
  enabled_engine_ids jsonb default '[]'::jsonb,
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

drop policy if exists "Users can view their own home settings." on public.user_home_settings;
drop policy if exists "Users can insert their own home settings." on public.user_home_settings;
drop policy if exists "Users can update their own home settings." on public.user_home_settings;

create policy "Users can view their own home settings."
  on public.user_home_settings for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own home settings."
  on public.user_home_settings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own home settings."
  on public.user_home_settings for update
  using ( auth.uid() = user_id );

create table if not exists public.user_sites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  url text not null,
  show_on_home boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create unique index if not exists user_sites_user_id_id_unique on public.user_sites(user_id, id);

alter table public.user_sites enable row level security;

drop policy if exists "Users can view their own sites." on public.user_sites;
drop policy if exists "Users can insert their own sites." on public.user_sites;
drop policy if exists "Users can update their own sites." on public.user_sites;
drop policy if exists "Users can delete their own sites." on public.user_sites;

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

create index if not exists idx_user_sites_user_id on public.user_sites(user_id);

create table if not exists public.user_tags (
  user_id uuid references auth.users not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, name)
);

alter table public.user_tags enable row level security;

drop policy if exists "Users can view their own tags." on public.user_tags;
drop policy if exists "Users can insert their own tags." on public.user_tags;
drop policy if exists "Users can update their own tags." on public.user_tags;
drop policy if exists "Users can delete their own tags." on public.user_tags;

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

create index if not exists idx_user_tags_user_id on public.user_tags(user_id);

create table if not exists public.user_site_tags (
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

drop policy if exists "Users can view their own site-tag links." on public.user_site_tags;
drop policy if exists "Users can insert their own site-tag links." on public.user_site_tags;
drop policy if exists "Users can delete their own site-tag links." on public.user_site_tags;

create policy "Users can view their own site-tag links."
  on public.user_site_tags for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own site-tag links."
  on public.user_site_tags for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own site-tag links."
  on public.user_site_tags for delete
  using ( auth.uid() = user_id );

create index if not exists idx_user_site_tags_user_id on public.user_site_tags(user_id);
create index if not exists idx_user_site_tags_site_id on public.user_site_tags(site_id);

create table if not exists public.user_site_order (
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

drop policy if exists "Users can view their own site order." on public.user_site_order;
drop policy if exists "Users can insert their own site order." on public.user_site_order;
drop policy if exists "Users can update their own site order." on public.user_site_order;
drop policy if exists "Users can delete their own site order." on public.user_site_order;

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

create index if not exists idx_user_site_order_user_id on public.user_site_order(user_id);

create table if not exists public.user_tag_order (
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

drop policy if exists "Users can view their own tag order." on public.user_tag_order;
drop policy if exists "Users can insert their own tag order." on public.user_tag_order;
drop policy if exists "Users can update their own tag order." on public.user_tag_order;
drop policy if exists "Users can delete their own tag order." on public.user_tag_order;

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

create index if not exists idx_user_tag_order_user_id on public.user_tag_order(user_id);

-- =============================
-- 2) Wallpapers
-- =============================

create table if not exists public.wallpaper_categories (
  id bigint generated by default as identity primary key,
  name text unique not null,
  name_en text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.wallpaper_categories enable row level security;

drop policy if exists "Categories are viewable by everyone." on public.wallpaper_categories;

create policy "Categories are viewable by everyone."
  on public.wallpaper_categories for select
  using ( true );

insert into public.wallpaper_categories (name, name_en) values
('风景', 'Landscape'),
('纯色', 'Solid Color'),
('每日推荐', 'Daily Recommendation'),
('Custom', 'Custom')
on conflict do nothing;

create table if not exists public.wallpapers (
  id bigint generated by default as identity primary key,
  url text not null,
  category text not null,
  source text default 'system',
  user_id uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.wallpapers enable row level security;

drop policy if exists "Wallpapers are viewable by everyone." on public.wallpapers;
drop policy if exists "Users can delete their own wallpapers." on public.wallpapers;
drop policy if exists "Users can insert their own wallpapers." on public.wallpapers;

create policy "Wallpapers are viewable by everyone."
  on public.wallpapers for select
  using ( true );

create policy "Users can delete their own wallpapers."
  on public.wallpapers for delete
  using ( auth.uid() = user_id );

create policy "Users can insert their own wallpapers."
  on public.wallpapers for insert
  with check ( auth.uid() = user_id );

-- =============================
-- 3) Sync RPC
-- =============================

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

  insert into public.user_home_settings (
    user_id,
    view_mode,
    engine_index,
    engine_id,
    enabled_engine_ids,
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
    nullif(p_payload#>>'{settings,engineId}', ''),
    coalesce(p_payload#>'{settings,enabledEngineIds}', '[]'::jsonb),
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
    engine_id = excluded.engine_id,
    enabled_engine_ids = excluded.enabled_engine_ids,
    date_format_index = excluded.date_format_index,
    time_format = excluded.time_format,
    locale = excluded.locale,
    wallpaper = excluded.wallpaper,
    theme = excluded.theme,
    color_mode = excluded.color_mode,
    schema_version = excluded.schema_version,
    updated_at = excluded.updated_at;

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

-- =============================
-- 4) New user hook
-- =============================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;

  insert into public.user_home_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================
-- 5) Premium + normalized theme/font settings
-- =============================

create table if not exists public.user_subscriptions (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  stripe_subscription_id text unique,
  stripe_payment_intent_id text,
  tier integer not null,
  amount integer not null,
  currency text default 'usd',
  status text not null,
  started_at timestamp with time zone,
  ends_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.user_subscriptions enable row level security;

drop policy if exists "Users can view their own subscriptions." on public.user_subscriptions;

create policy "Users can view their own subscriptions."
  on public.user_subscriptions for select
  using ( auth.uid() = user_id );

create index if not exists idx_user_subscriptions_user_id on public.user_subscriptions(user_id);
create index if not exists idx_user_subscriptions_stripe_id on public.user_subscriptions(stripe_subscription_id);

create table if not exists public.upload_quota (
  user_id uuid references auth.users primary key,
  wallpaper_count integer default 0,
  max_wallpapers integer default 50,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.upload_quota enable row level security;

drop policy if exists "Users can view their own quota." on public.upload_quota;

create policy "Users can view their own quota."
  on public.upload_quota for select
  using ( auth.uid() = user_id );

create or replace function public.increment_wallpaper_count()
returns trigger as $$
begin
  insert into public.upload_quota (user_id, wallpaper_count)
  values (new.user_id, 1)
  on conflict (user_id)
  do update set
    wallpaper_count = upload_quota.wallpaper_count + 1,
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_wallpaper_upload on public.wallpapers;
create trigger on_wallpaper_upload
  after insert on public.wallpapers
  for each row
  when (new.source = 'user')
  execute procedure public.increment_wallpaper_count();

create or replace function public.decrement_wallpaper_count()
returns trigger as $$
begin
  update public.upload_quota
  set wallpaper_count = greatest(0, wallpaper_count - 1),
      updated_at = now()
  where user_id = old.user_id;
  return old;
end;
$$ language plpgsql security definer;

drop trigger if exists on_wallpaper_delete on public.wallpapers;
create trigger on_wallpaper_delete
  after delete on public.wallpapers
  for each row
  when (old.source = 'user')
  execute procedure public.decrement_wallpaper_count();

create or replace function public.can_upload_wallpaper(p_user_id uuid)
returns boolean as $$
declare
  v_count integer;
  v_max integer;
begin
  select wallpaper_count, max_wallpapers
  into v_count, v_max
  from public.upload_quota
  where user_id = p_user_id;

  if not found then
    return true;
  end if;

  return v_count < v_max;
end;
$$ language plpgsql security definer;

drop policy if exists "Users can upload their own wallpapers." on public.wallpapers;
drop policy if exists "Tier 2+ can upload custom wallpapers." on public.wallpapers;

create policy "Tier 2+ can upload custom wallpapers."
  on public.wallpapers for insert
  with check (
    auth.uid() = user_id
    and (
      select membership_tier from public.profiles where id = auth.uid()
    ) >= 2
    and public.can_upload_wallpaper(auth.uid())
  );

create or replace function public.enforce_profile_update_restrictions()
returns trigger as $$
begin
  if auth.role() = 'service_role' then
    return new;
  end if;

  if auth.uid() is null or auth.uid() <> old.id then
    raise exception 'not allowed';
  end if;

  if new.membership_tier is distinct from old.membership_tier then
    raise exception 'membership_tier is managed by server';
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_enforce_profile_update_restrictions on public.profiles;
create trigger trg_enforce_profile_update_restrictions
  before update on public.profiles
  for each row
  execute procedure public.enforce_profile_update_restrictions();

create table if not exists public.user_theme_settings (
  user_id uuid references auth.users not null primary key,
  theme_settings jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.user_theme_settings enable row level security;

drop policy if exists "Users can view their own theme settings." on public.user_theme_settings;
drop policy if exists "Users can insert their own theme settings." on public.user_theme_settings;
drop policy if exists "Users can update their own theme settings." on public.user_theme_settings;

create policy "Users can view their own theme settings."
  on public.user_theme_settings for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own theme settings."
  on public.user_theme_settings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own theme settings."
  on public.user_theme_settings for update
  using ( auth.uid() = user_id );

create table if not exists public.user_font_settings (
  user_id uuid references auth.users not null primary key,
  font_settings jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.user_font_settings enable row level security;

drop policy if exists "Users can view their own font settings." on public.user_font_settings;
drop policy if exists "Users can insert their own font settings." on public.user_font_settings;
drop policy if exists "Users can update their own font settings." on public.user_font_settings;

create policy "Users can view their own font settings."
  on public.user_font_settings for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own font settings."
  on public.user_font_settings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own font settings."
  on public.user_font_settings for update
  using ( auth.uid() = user_id );

create or replace function public.enforce_premium_settings_access()
returns trigger as $$
declare
  v_tier integer;
begin
  if auth.role() = 'service_role' then
    return new;
  end if;

  select membership_tier into v_tier from public.profiles where id = auth.uid();
  v_tier := coalesce(v_tier, 1);

  if v_tier < 2 then
    raise exception 'premium membership required';
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_enforce_premium_theme_settings on public.user_theme_settings;
create trigger trg_enforce_premium_theme_settings
  before insert or update on public.user_theme_settings
  for each row
  execute procedure public.enforce_premium_settings_access();

drop trigger if exists trg_enforce_premium_font_settings on public.user_font_settings;
create trigger trg_enforce_premium_font_settings
  before insert or update on public.user_font_settings
  for each row
  execute procedure public.enforce_premium_settings_access();

-- =============================
-- 6) Feedback
-- =============================

create table if not exists public.feedback (
  id bigint generated by default as identity primary key,
  type text not null check (type in ('bug', 'feature', 'other')),
  content text not null,
  email text,
  user_id uuid references auth.users,
  user_agent text,
  status text default 'new' check (status in ('new', 'reviewed', 'resolved', 'closed')),
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.feedback enable row level security;

drop policy if exists "Anyone can submit feedback" on public.feedback;
drop policy if exists "Users can view their own feedback" on public.feedback;

create policy "Anyone can submit feedback"
  on public.feedback for insert
  with check (true);

create policy "Users can view their own feedback"
  on public.feedback for select
  using (auth.uid() = user_id);

create index if not exists feedback_user_id_idx on public.feedback(user_id);
create index if not exists feedback_status_idx on public.feedback(status);
create index if not exists feedback_created_at_idx on public.feedback(created_at desc);

-- =============================
-- 7) New: search logs
-- =============================

create table if not exists public.search_logs (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  query text not null,
  engine_id text,
  engine_url text,
  locale text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.search_logs enable row level security;

drop policy if exists "Users can insert their own search logs." on public.search_logs;
drop policy if exists "Users can view their own search logs." on public.search_logs;
drop policy if exists "Users can delete their own search logs." on public.search_logs;

create policy "Users can insert their own search logs."
  on public.search_logs for insert
  with check ( auth.uid() = user_id );

create policy "Users can view their own search logs."
  on public.search_logs for select
  using ( auth.uid() = user_id );

create policy "Users can delete their own search logs."
  on public.search_logs for delete
  using ( auth.uid() = user_id );

create index if not exists idx_search_logs_user_id on public.search_logs(user_id);
create index if not exists idx_search_logs_created_at on public.search_logs(created_at desc);

-- =============================
-- 8) New: global search engines
-- =============================

create table if not exists public.search_engines (
  id text primary key,
  name_en text,
  name_zh text,
  url text not null,
  icon text,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.search_engines enable row level security;

drop policy if exists "Search engines are viewable by everyone." on public.search_engines;
drop policy if exists "Only service_role can manage search engines." on public.search_engines;

create policy "Search engines are viewable by everyone."
  on public.search_engines for select
  using ( true );

create policy "Only service_role can manage search engines."
  on public.search_engines for all
  using ( auth.role() = 'service_role' )
  with check ( auth.role() = 'service_role' );

create index if not exists idx_search_engines_sort on public.search_engines(sort_order);

insert into public.search_engines (id, name_en, name_zh, url, icon, sort_order, is_active) values
('google', 'Google', '谷歌', 'https://www.google.com/search?q=', 'https://www.google.com/favicon.ico', 10, true),
('bing', 'Bing', '必应', 'https://www.bing.com/search?q=', 'https://www.bing.com/favicon.ico', 20, true),
('baidu', 'Baidu', '百度', 'https://www.baidu.com/s?wd=', 'https://www.baidu.com/favicon.ico', 30, true),
('xiaohongshu', 'Xiaohongshu', '小红书', 'https://www.xiaohongshu.com/search_result?keyword=', 'https://www.xiaohongshu.com/favicon.ico', 40, true),
('duckduckgo', 'DuckDuckGo', 'DuckDuckGo', 'https://duckduckgo.com/?q=', 'https://duckduckgo.com/favicon.ico', 50, true)
on conflict (id) do nothing;

-- =============================
-- 9) New: app settings (home footer)
-- =============================

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.app_settings enable row level security;

drop policy if exists "App settings are viewable by everyone." on public.app_settings;
drop policy if exists "Only service_role can manage app settings." on public.app_settings;

create policy "App settings are viewable by everyone."
  on public.app_settings for select
  using ( true );

create policy "Only service_role can manage app settings."
  on public.app_settings for all
  using ( auth.role() = 'service_role' )
  with check ( auth.role() = 'service_role' );

insert into public.app_settings (key, value) values
('home_footer', '{"text_zh":"欢迎使用 NewTab","text_en":"Welcome to NewTab","url":"https://www.newtab.online"}'::jsonb)
on conflict (key) do nothing;

-- =============================
-- 10) Generic updated_at trigger helper
-- =============================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_search_engines_updated_at on public.search_engines;
create trigger trg_search_engines_updated_at
  before update on public.search_engines
  for each row execute procedure public.set_updated_at();

drop trigger if exists trg_app_settings_updated_at on public.app_settings;
create trigger trg_app_settings_updated_at
  before update on public.app_settings
  for each row execute procedure public.set_updated_at();

commit;
