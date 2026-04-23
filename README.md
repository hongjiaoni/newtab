# NewTab

[中文](README.zh-CN.md) | [English](README.md)

NewTab is a customizable + sync-first new tab page: search, wallpapers, themes, fonts, website shortcuts and tag management, plus a consistent cloud profile across devices.

## Highlights

- Sites + tags: CRUD, drag to reorder, tag view, right-click actions
- Search engines: quick switch, enabled list management, cloud-synced preferences
- Wallpapers: curated categories, daily picks, solid color backgrounds, custom uploads (premium)
- Themes + fonts: light/dark, style presets, full palette control, Chinese/English font pairing, live preview
- Cloud sync: Supabase Auth + Postgres + Storage, local cache + remote refresh
- Membership: tiered access + Paddle payment flow
- Feedback & support: in-product feedback + Gumroad support link

## Quick Start

Static-first (recommended for UI/front-end work):

```bash
npx serve public -l 3000
```

Or run the local server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Cloud Setup

- Configure Supabase + Google OAuth + Storage bucket: `wallpapers`
- Fill in `public/config.js`

Deployment notes: `DEPLOY.md`

## Contributing

PRs are welcome. Prefer small, focused changes and avoid large rewrites in one shot.

Good areas to help:

- Sync consistency and sync-status UX
- Theme preview vs. actual rendering alignment
- Modal/menu UX and accessibility (keyboard, screen readers)
- i18n + copy consistency

More features: `FEATURE_LIST.md`

## License

No license file yet. Add one (MIT or Apache-2.0) before going fully public.
