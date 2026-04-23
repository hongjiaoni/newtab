# NewTab

[English](README.md) | [中文](README.zh-CN.md)

NewTab is a customizable, sync-first new tab page: fast search, wallpapers, themes, fonts, website shortcuts, cloud sync, and a growing set of product features.

## Features

- Sites + tags: add/edit/delete, reorder, tag view, right-click menus
- Search engines: switch quickly, manage enabled engines, sync preferences
- Wallpapers: built-in categories, daily picks, solid colors, custom uploads (premium)
- Themes + fonts: light/dark, style presets, full color control, bilingual fonts, live preview
- Cloud sync: Supabase Auth + Postgres + Storage, local cache + remote refresh
- Membership: tier gating + Paddle payment flows
- Feedback + support: in-product feedback + Gumroad support link

## Quick Start

Static-first (recommended for UI work):

```bash
npx serve public -l 3000
```

Or run the local server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Setup (Cloud)

- Configure Supabase + Google OAuth + Storage bucket `wallpapers`
- Fill in [`public/config.js`](/E:/Docs/Cursor/git/newtab/public/config.js)

Deployment details: [`DEPLOY.md`](/E:/Docs/Cursor/git/newtab/DEPLOY.md)

## Contributing

PRs are welcome. Please keep changes focused and avoid large rewrites.

Good areas to help:

- sync consistency and status UX
- theme + preview polish
- modal/menu UX and accessibility
- i18n cleanup and copy improvements

More project notes: [`FEATURE_LIST.md`](/E:/Docs/Cursor/git/newtab/FEATURE_LIST.md)

## License

No license file yet. Add one (MIT or Apache-2.0) before going fully public.
