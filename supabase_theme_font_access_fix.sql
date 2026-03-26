-- Allow authenticated tier 1+ users to write theme/font settings.
-- This aligns the database with the current product rule:
-- users who can open theme customization should be able to save it.

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

  if v_tier < 1 then
    raise exception 'theme settings require an authenticated user';
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
