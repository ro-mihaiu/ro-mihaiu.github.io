# Latest news - v1.6.6

Draft release notes for the next website version.

Compared against: `v1.6.5`
Current change range: `v1.6.5..HEAD`
Suggested compare link: https://github.com/ro-mihaiu/ro-mihaiu.github.io/compare/v1.6.5...v1.6.6

## Summary

This update turns the site from a mostly static portfolio into a more complete Minecraft services hub. Since `v1.6.5`, the website gained a commission/contact flow, stronger build browsing tools, improved player warp pages, SEO metadata, analytics hooks, sitemap/robots files, and setup documentation for notifications.

## Highlights

- Added a full contact and build commission page with username, build type, subserver, budget, timeframe, project details, YouTube reference, schematic upload validation, and photo previews.
- Added `/api/commission` and `/api/send-commission` endpoints for commission notifications through Discord webhook, Resend, or email-style fallback flows.
- Added setup documentation for Discord webhook and email notification options.
- Added build search, category filtering, sorting, result counts, and empty-state handling on the builds page.
- Reworked the homepage gallery to use real build data and real build images instead of placeholder cards.
- Added an interactive draggable "Owned player warps" dashboard on the homepage.
- Expanded player warp data and pages with clearer copy, better status presentation, copy buttons, and new/updated warps such as `mihu-money`, `mihu-shop`, `mihu-casino`, `mihu-rentals`, `mihu-farm`, `dungeon`, and `workers-guild`.
- Improved build detail pages with Next.js image rendering, better metadata, Open Graph tags, and JSON-LD structured data.
- Added `robots.txt`, `sitemap.xml`, custom document metadata, and Google Analytics wiring.
- Polished site copy, navbar/contact links, page metadata, accessibility hints, and visual styling across the main pages.

## What changed since v1.6.5

### New

- `src/pages/contact.tsx`
- `src/pages/api/commission.ts`
- `src/pages/api/send-commission.ts`
- `src/pages/_document.tsx`
- `public/robots.txt`
- `public/sitemap.xml`
- `EMAIL_SETUP_GUIDE.md`
- `DISCORD_WEBHOOK_QUICKSTART.md`
- `SETUP_COMPLETE.md`
- `.env.example`

### Updated

- `README.md`
- `src/pages/index.tsx`
- `src/pages/builds.tsx`
- `src/pages/builds/[slug].tsx`
- `src/pages/player-warps.tsx`
- `src/pages/player-warps/[id].tsx`
- `src/pages/tos.tsx`
- `src/pages/cookies.tsx`
- `src/pages/_app.tsx`
- `src/data/warps.ts`
- `src/components/AboutSection.tsx`
- `src/components/ContactSection.tsx`
- `src/components/GallerySection.tsx`
- `src/components/Hero.tsx`
- `src/components/Navbar.tsx`
- `src/components/OwnershipSection.tsx`
- `src/components/ServerLifeSection.tsx`
- `src/styles/globals.css`

## Release notes

### Commission requests

The site now has a dedicated commission request workflow. Visitors can describe a build, select the subserver, add a budget/timeframe, include a YouTube reference, and attach local reference files. The form first tries the API endpoint, then falls back to opening an email draft if the backend is unavailable.

### Notifications

Commission submissions can be routed through a Discord webhook or Resend. The included docs explain how to configure each option and how to switch between them.

### Builds browsing

The builds portfolio now supports searching, category filters, sorting, and clear result counts. Build detail pages also use optimized images and richer metadata for sharing and search.

### Player warps

Player warp content was expanded and polished. The warp overview explains how to use copy buttons, individual warp pages have better structured information, and the homepage now includes a draggable warp dashboard for a more interactive overview of owned locations.

### SEO and analytics

The release adds core SEO files, page-level meta descriptions, structured data, Open Graph metadata, and Google Analytics script loading.

## Notes before publishing

- Do not publish `.env.local` or any real webhook URL in the release text.
- If this release is published as `v1.6.6`, create the tag after committing the current source changes.
- Generated folders such as `.next` and `out` should usually be excluded from release summaries unless the release intentionally includes a static export.
