-- ============================================================
-- Fix 1: Update enforce_premium_settings_access trigger
-- Change threshold from v_tier < 2 to v_tier < 1 so that
-- tier 1+ (basic member) users can save theme/font settings.
-- ============================================================

create or replace function public.enforce_premium_settings_access()
returns trigger as $$
declare
  v_tier integer;
begin
  if auth.role() = 'service_role' then
    return new;
  end if;

  if auth.uid() is null then
    return new;
  end if;

  select membership_tier into v_tier
  from public.profiles
  where id = auth.uid();

  v_tier := coalesce(v_tier, 1);

  -- FIX: Changed from v_tier < 2 to v_tier < 1
  -- This allows tier 1+ users to save theme/font settings
  if v_tier < 1 then
    raise exception 'theme settings require an authenticated user';
  end if;

  return new;
end;
$$ language plpgsql security definer;

-- Re-apply triggers (idempotent)
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


-- ============================================================
-- Fix 2: Add font columns to user_home_settings table
-- This provides a SECOND persistence path for fonts through
-- the sync_home_config RPC, which is NOT blocked by the trigger.
-- ============================================================

alter table public.user_home_settings
  add column if not exists font_chinese text,
  add column if not exists font_english text;


-- ============================================================
-- Fix 3: Update sync_home_config RPC to persist font fields
-- ============================================================

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
    engine_id,
    enabled_engine_ids,
    date_format_index,
    time_format,
    locale,
    wallpaper,
    theme,
    color_mode,
    font_chinese,
    font_english,
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
    nullif(p_payload#>>'{settings,fontChinese}', ''),
    nullif(p_payload#>>'{settings,fontEnglish}', ''),
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
    font_chinese = excluded.font_chinese,
    font_english = excluded.font_english,
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
  insert into public.user_sites (user_id, id, name, url, show_on_home, updated_at)
  select
    v_uid,
    coalesce(value->>'id', value->>'name'),
    value->>'name',
    value->>'url',
    coalesce((value->>'showOnHome')::boolean, true),
    v_updated_at
  from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb))
  on conflict (user_id, id)
  do update set
    name = excluded.name,
    url = excluded.url,
    show_on_home = excluded.show_on_home,
    updated_at = excluded.updated_at;

  delete from public.user_sites
  where user_id = v_uid
    and id not in (
      select coalesce(value->>'id', value->>'name')
      from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb))
    );

  -- Site tags
  delete from public.user_site_tags
  where user_id = v_uid
    and site_id not in (
      select coalesce(value->>'id', value->>'name')
      from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb))
    );

  insert into public.user_site_tags (user_id, site_id, tag_name, updated_at)
  select v_uid, s.site_id, s.tag_name, v_updated_at
  from (
    select
      coalesce(site.value->>'id', site.value->>'name') as site_id,
      tag.value::text as tag_name
    from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb)) as site,
    jsonb_array_elements_text(coalesce(site.value->'tags', '[]'::jsonb)) as tag
  ) s
  on conflict (user_id, site_id, tag_name)
  do update set updated_at = excluded.updated_at;

  -- Site order
  delete from public.user_site_order
  where user_id = v_uid;

  insert into public.user_site_order (user_id, site_id, position, updated_at)
  select v_uid, value, idx, v_updated_at
  from jsonb_array_elements_text(coalesce(p_payload->'site_order', '[]'::jsonb))
  with ordinality as t(value, idx)
  on conflict (user_id, site_id)
  do update set
    position = excluded.position,
    updated_at = excluded.updated_at;

  -- Tag order
  delete from public.user_tag_order
  where user_id = v_uid;

  insert into public.user_tag_order (user_id, tag_name, position, updated_at)
  select v_uid, value, idx, v_updated_at
  from jsonb_array_elements_text(coalesce(p_payload->'tag_order', '[]'::jsonb))
  with ordinality as t(value, idx)
  on conflict (user_id, tag_name)
  do update set
    position = excluded.position,
    updated_at = excluded.updated_at;

end;
$$ language plpgsql security definer;
