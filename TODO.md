# Tools Expansion — Task Plan

## Steps
- [x] Explore repo & gather site conventions (Navbar, pages, styles, tailwind config)
- [x] Verify RGBirdflop API (works server-side via Node fetch; confirmed NO CORS headers -> must proxy)
- [x] Create `src/pages/tools/discord/timestamp.tsx` — Discord timestamp generator
- [x] Create `src/pages/tools/discord/role-color.tsx` — Discord role color converter
- [x] Update `src/pages/tools/discord/index.tsx` — move tools from "coming soon" to available
- [x] Create `src/pages/tools/minecraft/index.tsx` — Minecraft tools hub (like /tools/discord)
- [x] Create `src/pages/tools/minecraft/gradient.tsx` — Minecraft gradient generator at /tools/minecraft/gradient (removed Birdflop credit)
- [x] Create `src/pages/api/rgb.ts` — server-side proxy for Birdflop API (fixes CORS "Failed to fetch")
- [x] Update gradient.tsx to call `/api/rgb` proxy instead of direct Birdflop URL
- [x] Update `src/components/Navbar.tsx` — Tools dropdown -> Discord + Minecraft
- [x] Fix gradient formatting: inject &l/&o/&n/&m after each color code (API doesn't emit format codes)
- [x] Remove obfuscate option; preview renders bold/italic/underline/strikethrough
- [x] Verify TypeScript compiles (tsc --noEmit passes)
