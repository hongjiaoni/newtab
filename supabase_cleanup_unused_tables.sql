-- ============================================
-- Supabase cleanup for tables no longer used by the app
-- Date: 2026-03-22
--
-- Current app code has been standardized on:
-- - user_home_settings + sync_home_config
-- - user_sites / user_tags / user_site_tags / order tables
-- - user_theme_settings / user_font_settings
--
-- The tables below are candidates for removal because the app no longer
-- reads or writes them directly:
-- - user_home_config
-- - user_color_config
-- - custom_themes
--
-- Run the audit section first. If the counts and last-update timestamps look
-- safe, then run the DROP section.
-- ============================================

-- ==========
-- Audit
-- ==========

select
  'user_home_config' as table_name,
  count(*) as row_count,
  max(updated_at) as last_updated_at
from public.user_home_config
union all
select
  'user_color_config' as table_name,
  count(*) as row_count,
  max(updated_at) as last_updated_at
from public.user_color_config
union all
select
  'custom_themes' as table_name,
  count(*) as row_count,
  max(created_at) as last_updated_at
from public.custom_themes;

-- Optional backups before cleanup
create table if not exists public.backup_user_home_config_20260322 as
select * from public.user_home_config;

create table if not exists public.backup_user_color_config_20260322 as
select * from public.user_color_config;

create table if not exists public.backup_custom_themes_20260322 as
select * from public.custom_themes;

-- ==========
-- Drop
-- ==========

drop table if exists public.user_home_config cascade;
drop table if exists public.user_color_config cascade;
drop table if exists public.custom_themes cascade;
