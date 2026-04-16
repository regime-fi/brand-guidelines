# CLAUDE.md — Brand Guidelines

REGIME.fi brand identity system. Hosted on GitHub Pages at the project domain.

## What This Repo Is

- `index.html` — Brand guidelines page (dark/light mode toggle, color system, typography, components, social media assets). Hosted via GitHub Pages.
- `images/` — Source HTML and rendered PNG assets for social media avatars and headers.
- `regime-fi-brand-guidelines.html` — Legacy v1 guidelines (superseded by `index.html`).

## Rendering Social Media Assets

```bash
npm install
node images/render.js
```

This uses Puppeteer to render all avatar and header PNGs from their source HTML files. Output: 22 images (7 avatars + 4 headers, dark and light variants each).

### Source Files

- `images/avatar.html` — Dark mode avatar source (lightweight-charts + R wordmark with vignette)
- `images/avatar-light.html` — Light mode avatar source
- `images/header.html` — Dark mode header source (lightweight-charts + REGIME.fi wordmark with vignette)
- `images/header-light.html` — Light mode header source
- `images/render.js` — Puppeteer render script for all platforms and variants

### Platform Sizes

**Avatars:** Twitter/YouTube (800x800), Telegram/Discord/Facebook/Instagram/GitHub (1024x1024)

**Headers:** Twitter (1500x500), Facebook (1640x624 @2x), YouTube (2560x1440), Discord (960x540)

## Brand Colors

### Dark Mode (canonical)
- Background: `#080C16` (Void)
- Text: `#E8EDF8` (Frost/Ghost)
- Teal accent: `#00C2A8`
- Candle up: `#00D68F`, down: `#FF4D6A`
- Grid lines: `rgba(45,106,255,0.14)`

### Light Mode
- Background: `#FAFBFD` (Base)
- Text: `#111827` (Primary)
- Teal accent: `#00A88E`
- Candle up: `#00B377`, down: `#E0435C`

## Fonts

- **Syne 800** — Display, headings, wordmark
- **IBM Plex Mono** — Data, numerics, code
- **DM Sans** — Body, UI text

## Deployment

Push to `main` — GitHub Pages serves `index.html` automatically. Domain configured via `CNAME`.
