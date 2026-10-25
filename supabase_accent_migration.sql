-- ============================================================
-- NewTab 主题色迁移 (2026-10)
-- 在 Supabase SQL Editor 中执行本文件(幂等,可重复执行)。
-- 需先执行过 supabase_folders_migration.sql 与 supabase_glass_migration.sql。
-- 1) user_home_settings 增加 accent_color 列:系统色名(blue / purple / pink / red /
--    orange / yellow / green / graphite)或自定义 #rrggbb
-- 2) 更新 sync_home_config RPC 写入 accent_color(其余与 glass 迁移一致)
-- ============================================================

-- ---------- Schema ----------
alter table public.user_home_settings
  add column if not exists accent_color text not null default 'blue';

-- ---------- RPC: sync_home_config (+ accent) ----------
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
    accent_color,
    zoom_level,
    open_behavior,
    workbench,
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
    'glass',
    coalesce(p_payload#>>'{settings,appearance}', p_payload#>>'{settings,colorMode}', 'auto'),
    -- preset name or #rrggbb; anything else falls back to blue
    case
      when p_payload#>>'{settings,accent}' ~ '^(blue|purple|pink|red|orange|yellow|green|graphite|#[0-9a-fA-F]{6})$'
        then lower(p_payload#>>'{settings,accent}')
      else 'blue'
    end,
    coalesce(p_payload#>>'{settings,zoomLevel}', '100'),
    coalesce(p_payload#>>'{settings,openBehavior}', 'newtab'),
    coalesce(p_payload->'workbench', '{}'::jsonb),
    null,
    null,
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
    accent_color = excluded.accent_color,
    zoom_level = excluded.zoom_level,
    open_behavior = excluded.open_behavior,
    workbench = excluded.workbench,
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

  -- Sites upsert + delete missing (folders stored as type='folder' rows)
  insert into public.user_sites (user_id, id, name, url, show_on_home, type, children, icon, updated_at)
  select
    v_uid,
    (value->>'id')::uuid,
    coalesce(value->>'name', ''),
    coalesce(value->>'url', ''),
    coalesce((value->>'showOnHome')::boolean, true),
    case when value->>'type' = 'folder' then 'folder' else 'link' end,
    case when value->>'type' = 'folder' then coalesce(value->'children', '[]'::jsonb) else '[]'::jsonb end,
    -- custom icon: https URL, small data:image, or a text icon "text:#rrggbb:Label";
    -- anything else is null (falls back to favicon)
    case
      when value->>'customIcon' ~ '^(https://|data:image/(png|jpeg|webp|gif);base64,|text:#[0-9a-fA-F]{6}:.)'
        and length(value->>'customIcon') <= 60000 then value->>'customIcon'
      else null
    end,
    v_updated_at
  from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb))
  on conflict (user_id, id)
  do update set
    name = excluded.name,
    url = excluded.url,
    show_on_home = excluded.show_on_home,
    type = excluded.type,
    children = excluded.children,
    icon = excluded.icon,
    updated_at = excluded.updated_at;

  delete from public.user_sites
  where user_id = v_uid
    and id not in (
      select (value->>'id')::uuid
      from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb))
    );

  -- Rebuild site-tag relations (user_site_tags has created_at, not updated_at)
  delete from public.user_site_tags
  where user_id = v_uid;

  insert into public.user_site_tags (user_id, site_id, tag_name, created_at)
  select
    v_uid,
    (site.value->>'id')::uuid,
    tag.value::text,
    now()
  from jsonb_array_elements(coalesce(p_payload->'sites', '[]'::jsonb)) as site,
  lateral jsonb_array_elements_text(coalesce(site.value->'tags', '[]'::jsonb)) as tag(value)
  where (site.value->>'id')::uuid is not null;

  -- Site order
  delete from public.user_site_order
  where user_id = v_uid;

  insert into public.user_site_order (user_id, site_id, position)
  select v_uid, value::uuid, idx
  from jsonb_array_elements_text(coalesce(p_payload->'site_order', '[]'::jsonb))
  with ordinality as t(value, idx)
  on conflict (user_id, site_id)
  do update set
    position = excluded.position;

  -- Tag order
  delete from public.user_tag_order
  where user_id = v_uid;

  insert into public.user_tag_order (user_id, tag_name, position)
  select v_uid, value, idx
  from jsonb_array_elements_text(coalesce(p_payload->'tag_order', '[]'::jsonb))
  with ordinality as t(value, idx)
  on conflict (user_id, tag_name)
  do update set
    position = excluded.position;

end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.sync_home_config(jsonb) from public;
grant execute on function public.sync_home_config(jsonb) to authenticated;