# Latest news - v1.6.7

Draft release notes for the next website version.

Compared against: `v1.6.6`
Current change range: `v1.6.5..HEAD`
Suggested compare link: https://github.com/ro-mihaiu/ro-mihaiu.github.io/compare/v1.6.6...v1.6.7

## Summary

This update refines the commission/contact experience and expands the in-server “Questions / Reports” flow with local validation + media previews. It also clarifies routing for the `/commissions` page (SEO-friendly route that reuses the shared form).

## Highlights

- Improved `/contact` “Questions / Reports” submission UX:
  - Client-side image file type validation for common formats (.jpg/.png/.jpeg/.gif/.webp/.bmp).
  - Inline photo preview gallery with per-image removal.
  - Automatic webhook vs `mailto:` fallback when Discord webhook is not configured.
- `/commissions` page now has its own SEO-friendly route:
  - Uses `document.title` and keeps the path distinct, while reusing the shared report/commission form UI.
- Player warp pages now render a richer guide section:
  - When a warp has `rules`, they are displayed as structured guide rules.
  - When `guide` content exists, it is rendered as formatted markdown.
  - Shows a clear fallback when no guide content is available.

## What changed since v1.6.6

### Updated

- `src/pages/contact.tsx`
  - Added client-side photo validation and preview/remove controls.
  - Added `mailto:` fallback flow when `NEXT_PUBLIC_DISCORD_WEBHOOK_URL` is missing.
- `src/pages/commissions.tsx`
  - Ensures the `/commissions` route is distinct (title set on mount) while reusing the existing shared form.
- `src/pages/player-warps/[id].tsx`
  - Improved guide rendering logic (rules list vs markdown `guide`).

### Notes

- This release note draft intentionally focuses on the user-facing behavior changes that are observable in the current source, not on previously documented v1.6.5/v1.6.6 features.

## Notes before publishing

- Do not publish `.env.local` (or any real webhook / API keys) as part of the release notes.
- If you rotate Discord/webhook secrets, update the **deployment environment variables** and redeploy before publishing.
- If this release is published as `v1.6.7`, create the tag after committing the current source changes.


