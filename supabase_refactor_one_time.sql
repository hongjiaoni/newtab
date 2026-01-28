-- ============================================
-- ONE-TIME REFACTOR MIGRATION (DESTRUCTIVE)
-- Normalize home data: sites/tags/orders/settings into separate tables
-- Removes profiles JSON columns and wallpapers.title
-- ============================================

begin;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================
-- 1) New normalized tables
-- =============================

-- 1.1 user_home_settings
create table if not exists public.user_home_settings (
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

-- 1.2 user_sites
create table if not exists public.user_sites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  url text not null,
  show_on_home boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.user_sites add constraint if not exists user_sites_user_id_id_unique unique (user_id, id);

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

-- 1.3 user_tags
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

-- 1.4 user_site_tags
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

-- 1.5 order tables
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

-- 1.6 theme/font settings tables (if premium migration not yet applied)
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

-- Optional enforcement trigger (tier>=2)
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
-- 2) Migrate data from legacy profiles JSON columns
-- =============================

-- 2.1 Home settings
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
)
select
  p.id,
  coalesce(p.settings->>'viewMode', 'general'),
  coalesce((p.settings->>'engineIndex')::int, 0),
  coalesce((p.settings->>'dateFormatIndex')::int, 0),
  coalesce(p.settings->>'timeFormat', '24h'),
  coalesce(p.settings->>'locale', 'zh'),
  nullif(p.settings->>'wallpaper', ''),
  coalesce(p.settings->>'theme', 'handdrawn'),
  coalesce(p.settings->>'colorMode', 'light'),
  coalesce((p.settings->>'schema_version')::int, 1),
  coalesce(p.updated_at, timezone('utc'::text, now()))
from public.profiles p
where p.id is not null
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

-- 2.2 Tags
insert into public.user_tags (user_id, name, updated_at)
select p.id, t.value, coalesce(p.updated_at, timezone('utc'::text, now()))
from public.profiles p
cross join lateral jsonb_array_elements_text(coalesce(p.tags, '[]'::jsonb)) as t(value)
on conflict (user_id, name)
do update set updated_at = excluded.updated_at;

-- 2.3 Sites + mapping old_id -> new uuid
create temporary table tmp_site_id_map (
  user_id uuid not null,
  old_id text not null,
  new_id uuid not null,
  primary key (user_id, old_id)
) on commit drop;

insert into tmp_site_id_map (user_id, old_id, new_id)
select
  p.id,
  coalesce(s->>'id', uuid_generate_v4()::text) as old_id,
  uuid_generate_v4() as new_id
from public.profiles p
cross join lateral jsonb_array_elements(coalesce(p.sites, '[]'::jsonb)) as s;

insert into public.user_sites (id, user_id, name, url, show_on_home, created_at, updated_at)
select
  m.new_id,
  p.id,
  coalesce(s->>'name', ''),
  coalesce(s->>'url', ''),
  coalesce((s->>'showOnHome')::boolean, true),
  coalesce(p.created_at, timezone('utc'::text, now())),
  coalesce(p.updated_at, timezone('utc'::text, now()))
from public.profiles p
cross join lateral jsonb_array_elements(coalesce(p.sites, '[]'::jsonb)) as s
join tmp_site_id_map m
  on m.user_id = p.id
 and m.old_id = coalesce(s->>'id', m.old_id)
on conflict (id)
do nothing;

-- 2.4 site-tags
insert into public.user_site_tags (user_id, site_id, tag_name, created_at)
select
  p.id,
  m.new_id,
  tag.value,
  timezone('utc'::text, now())
from public.profiles p
cross join lateral jsonb_array_elements(coalesce(p.sites, '[]'::jsonb)) as s
join tmp_site_id_map m
  on m.user_id = p.id
 and m.old_id = coalesce(s->>'id', m.old_id)
cross join lateral jsonb_array_elements_text(coalesce(s->'tags', '[]'::jsonb)) as tag(value)
;

-- Ensure tags referenced by site-tags exist
insert into public.user_tags (user_id, name, updated_at)
select distinct p.id, tag.value, coalesce(p.updated_at, timezone('utc'::text, now()))
from public.profiles p
cross join lateral jsonb_array_elements(coalesce(p.sites, '[]'::jsonb)) as s
cross join lateral jsonb_array_elements_text(coalesce(s->'tags', '[]'::jsonb)) as tag(value)
on conflict (user_id, name)
do update set updated_at = excluded.updated_at;

-- 2.5 orders
insert into public.user_site_order (user_id, site_id, position)
select
  p.id,
  m.new_id,
  (ord.ordinality - 1)
from public.profiles p
cross join lateral jsonb_array_elements_text(coalesce(p.site_order, '[]'::jsonb)) with ordinality as ord(value, ordinality)
join tmp_site_id_map m
  on m.user_id = p.id
 and m.old_id = ord.value;

insert into public.user_tag_order (user_id, tag_name, position)
select
  p.id,
  ord.value,
  (ord.ordinality - 1)
from public.profiles p
cross join lateral jsonb_array_elements_text(coalesce(p.tag_order, '[]'::jsonb)) with ordinality as ord(value, ordinality)
where ord.value is not null and ord.value <> '';

-- 2.6 theme/font settings
insert into public.user_theme_settings (user_id, theme_settings, updated_at)
select p.id, coalesce(p.theme_settings, '{}'::jsonb), coalesce(p.updated_at, timezone('utc'::text, now()))
from public.profiles p
on conflict (user_id)
do update set theme_settings = excluded.theme_settings, updated_at = excluded.updated_at;

insert into public.user_font_settings (user_id, font_settings, updated_at)
select p.id, coalesce(p.font_settings, '{}'::jsonb), coalesce(p.updated_at, timezone('utc'::text, now()))
from public.profiles p
on conflict (user_id)
do update set font_settings = excluded.font_settings, updated_at = excluded.updated_at;

-- =============================
-- 3) Drop legacy columns (DESTRUCTIVE)
-- =============================

alter table public.profiles
  drop column if exists sites,
  drop column if exists tags,
  drop column if exists tag_order,
  drop column if exists site_order,
  drop column if exists settings,
  drop column if exists theme_settings,
  drop column if exists font_settings;

alter table public.wallpapers drop column if exists title;

-- =============================
-- 4) Transactional sync RPC
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

-- =============================
-- 5) Update handle_new_user to create default home settings
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

commit;
