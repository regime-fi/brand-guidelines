---
name: on-brand
description: Apply REGIME.fi brand guidelines when creating any visual asset — HTML pages, PDFs, images, whitepapers, logos, avatars, favicons, presentations, social media graphics, email templates, or any design work. TRIGGER when creating or modifying visual output for REGIME.fi.
---

# REGIME.fi Brand Compliance

Apply these rules to ALL visual output for REGIME.fi — HTML, PDF, images, whitepapers, presentations, social graphics, favicons, avatars, OG images, email templates, print materials, pitch decks, or any design artifact.

The canonical source is `regime-fi-brand-guidelines.html` in this repo. This skill extracts the enforceable rules. When in doubt, open the HTML file and check.

---

## 0. Mode Selection

REGIME.fi supports two color modes: **Dark** (default) and **Light**. Choose based on context:

| Mode | When to use |
|------|-------------|
| **Dark** (default) | Dashboard, app UI, social media graphics, OG images, favicons, avatars, presentations, pitch decks |
| **Light** | Whitepapers, long-form documents, PDFs intended for print or reading, technical papers, legal documents |

**Dark is canonical.** If no mode is specified, use dark. Light mode is for content designed to be read at length — documents where dark-on-light improves readability.

Both modes share the same typography, spacing, components, motion, and voice rules. Only the color tokens differ.

---

## 1. Color System — Dark Mode (default)

### Base Palette (backgrounds & surfaces)

| Token | Hex | Role |
|-------|-----|------|
| Void | `#080C16` | App/page background |
| Abyss | `#0D1223` | Card backgrounds |
| Surface | `#131A2E` | Elevated cards, inputs |
| Raised | `#1B2540` | Active states, tabs |
| Overlay | `#243054` | Modals, overlays |
| Border | `#1E2A45` | Default borders (1px solid) |
| Border2 | `#2D3E60` | Hover/active borders |

### Brand Blue (primary interaction)

| Token | Hex | Usage |
|-------|-----|-------|
| Blue 900 | `#042C53` | Subtle backgrounds |
| Blue 700 | `#1440C4` | Hover states |
| Blue 500 | `#2D6AFF` | Primary CTAs (Stake, Connect) |
| Blue 300 | `#7AA8FF` | Direction badges (SHORT/LONG) |
| Blue 100 | `#C8DEFF` | Active tab highlights |

### Yield Teal (live states & activity)

| Token | Hex | Usage |
|-------|-----|-------|
| Teal 900 | `#003D33` | Subtle backgrounds |
| Teal 700 | `#007A6A` | Hover states |
| Teal 500 | `#00C2A8` | Wordmark ".fi", LIVE badge, chart lines, active indicators |
| Teal 300 | `#5CEDD9` | Hover teal buttons |
| Teal 100 | `#BFFAF3` | Light teal text on dark |

### Reward Amber (value & earnings)

| Token | Hex | Usage |
|-------|-----|-------|
| Amber 900 | `#3D2000` | Subtle backgrounds |
| Amber 700 | `#A85500` | Hover states |
| Amber 500 | `#F5A623` | NAV per share, APY, win rate, key metrics, claimable rewards |
| Amber 300 | `#FFC96B` | Light amber accents |
| Amber 100 | `#FFE9BC` | Lightest amber |

### Signal Colors (RESERVED for financial delta only)

| Token | Hex | Usage |
|-------|-----|-------|
| Up | `#00D68F` | Positive PnL, price increase, system healthy |
| Up dim | `#003D26` | Background tint for positive |
| Down | `#FF4D6A` | Negative PnL, loss, risk warning |
| Down dim | `#3D0010` | Background tint for negative |

**HARD RULE:** Green and red are NEVER used for decoration, navigation, or general UI. They mean money gained or money lost. Period.

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Ghost | `#E8EDF8` | Primary text |
| Muted | `#8A96B3` | Secondary text, labels |
| Subtle | `#3D4A6B` | Tertiary, disabled |

---

## 1b. Color System — Light Mode

Used for whitepapers, long-form documents, and print-oriented PDFs. Accent colors are darkened slightly for adequate contrast on light backgrounds. All semantic roles remain the same.

### Base Palette (backgrounds & surfaces)

| Token | Hex | Role |
|-------|-----|------|
| Base | `#FAFBFD` | Page background |
| Card | `#F0F2F7` | Card backgrounds, sidebar |
| Elevated | `#E8EBF2` | Elevated cards, diagram backgrounds |
| Border | `#D4D9E4` | All borders (1px solid) |

### Brand Accents (adjusted for light-bg contrast)

| Token | Dark Hex | Light Hex | Notes |
|-------|----------|-----------|-------|
| Brand Blue | `#2D6AFF` | `#2D6AFF` | Same — sufficient contrast on both |
| Yield Teal | `#00C2A8` | `#00A88E` | Darkened for WCAG contrast on white |
| Reward Amber | `#F5A623` | `#D48E1A` | Darkened for readability on light |
| Signal Green | `#00D68F` | `#00B377` | Darkened for contrast |
| Signal Red | `#FF4D6A` | `#E0435C` | Darkened for contrast |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#111827` | Headings, primary body text |
| Secondary | `#4B5563` | Body copy, descriptions |
| Subtle | `#9CA3AF` | Captions, metadata, labels |

### Light Mode Accents (for badges, callouts, tinted backgrounds)

Use the same 10-12% opacity pattern as dark mode, just with the light-adjusted accent colors:

- Blue tint: `rgba(45, 106, 255, 0.08-0.10)` with `rgba(45, 106, 255, 0.2)` border
- Teal tint: `rgba(0, 168, 142, 0.08-0.10)` with `rgba(0, 168, 142, 0.2)` border
- Amber tint: `rgba(212, 142, 26, 0.08-0.10)` with `rgba(212, 142, 26, 0.2)` border

### Hero / Cover Areas (light mode)

Use a subtle gradient background instead of flat white:
```
background: linear-gradient(135deg, #EEF1F8 0%, #E0E6F4 50%, #EEF1F8 100%);
```

Optional radial glows for visual depth (very low opacity):
```
radial-gradient(circle at 30% 40%, rgba(45, 106, 255, 0.06) 0%, transparent 50%),
radial-gradient(circle at 70% 60%, rgba(0, 168, 142, 0.05) 0%, transparent 50%)
```

### Inline Code (light mode)

```
background: #F0F2F7;
border: 1px solid #D4D9E4;
color: #0E7C6B;
```

### CSS Custom Properties (light mode)

```css
:root {
  --bg-base: #FAFBFD;
  --bg-card: #F0F2F7;
  --bg-elevated: #E8EBF2;
  --border: #D4D9E4;
  --brand-blue: #2D6AFF;
  --yield-teal: #00A88E;
  --reward-amber: #D48E1A;
  --profit-green: #00B377;
  --loss-red: #E0435C;
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --text-subtle: #9CA3AF;
}
```

### Wordmark on Light

- `REGIME` in `#0D1223` (Abyss) + `.fi` in `#00A88E` (light teal)
- Never use white text on light backgrounds

---

## 2. Typography

Three fonts. Three roles. Never mix.

| Font | Weight | Role | Used For |
|------|--------|------|----------|
| **Syne** | 700, 800 | Display | Wordmark, headlines, section titles, CTA button labels |
| **IBM Plex Mono** | 400, 500 | Data | ALL numbers, prices, percentages, addresses, hex values, table data, labels, code |
| **DM Sans** | 400, 500 | Body | Body copy, nav items, descriptions, tooltips, error messages |

### Type Scale

| Level | Size | Weight | Font |
|-------|------|--------|------|
| Display | 56px | 800 | Syne |
| H1 | 36px | 800 | Syne |
| H2 | 24px | 700 | Syne |
| H3 | 18px | 700 | Syne |
| Body | 15px | 400 | DM Sans |
| Label | 11px | 500 | IBM Plex Mono (uppercase, 0.08em tracking) |
| Caption | 11px | 400 | DM Sans |

### Google Fonts Import

```
https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap
```

---

## 3. Logo & Wordmark

The wordmark is `REGIME.fi` rendered in **Syne 800** with `.fi` in **Yield Teal (#00C2A8)**. There is no separate icon or logomark.

### Rules

- `.fi` is ALWAYS Yield Teal `#00C2A8` — never any other color
- ALWAYS uppercase `REGIME`
- ALWAYS Syne 800 — never substitute fonts
- Minimum clear space: 1x cap-height on all sides
- Dark surface: white text + teal `.fi` (primary)
- Light surface: `#0D1223` text + teal `.fi` (secondary)

### Don'ts

- Don't recolor `.fi` in any color other than `#00C2A8`
- Don't use any font other than Syne 800
- Don't use lowercase, italics, or reduced opacity
- Don't add effects (shadows, outlines, gradients) to the wordmark

### For Favicons & Avatars

Use `R` in Syne 800, white on Void (`#080C16`) background, or `R.` with the dot in Teal. Keep it simple — the wordmark IS the brand.

---

## 4. Spacing & Layout

- **4pt grid, 8pt rhythm.** All spacing uses multiples of 4px. Primary rhythm is 8px.
- Never use arbitrary values like 5px, 7px, 15px.

| Token | Size |
|-------|------|
| xs | 4px |
| sm | 8px |
| sm+ | 12px |
| md | 16px |
| md+ | 20px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

### Border Radius

- 4px — small elements (checkboxes, chips)
- 8px — buttons, inputs
- 12px — cards (max for rectangular elements)
- 100px (pill) — badges only

**Don't use rounded corners > 12px on cards.** Pill shapes are for badges only.

### Borders

**Dark mode:**
- Default: `1px solid #1E2A45`
- Hover/active: `1px solid #2D3E60`
- Focus: `1px solid rgba(0, 194, 168, 0.3)`

**Light mode:**
- Default: `1px solid #D4D9E4`
- Focus: `1px solid #2D6AFF`

Use 1px solid borders to define card depth — NOT drop shadows (both modes).

---

## 5. Components

### Buttons

| Variant | Background | Text | Usage |
|---------|-----------|------|-------|
| Primary | `#2D6AFF` | white | Single primary CTA per screen |
| Teal | `#00C2A8` | `#080C16` | Wallet actions only |
| Outline | transparent | Ghost | Secondary actions (1px border) |
| Ghost | transparent | Muted | Tertiary/nav |
| Danger | `rgba(255,77,106,0.12)` | `#FF4D6A` | Destructive (always confirm first) |

Sizes: sm (6px 14px, 12px font), default (10px 20px, 14px font), lg (14px 28px, 16px font, Syne 700).

### Badges

12% opacity background + 30% opacity border + full color text. Pill shape (border-radius: 100px). IBM Plex Mono 11px 500.

| Variant | Color |
|---------|-------|
| Live | Green `#00D68F` (with animated pulse dot) |
| Blue | `#7AA8FF` (direction: SHORT/LONG) |
| Teal | `#00C2A8` (staking status) |
| Amber | `#F5A623` (metrics) |
| Red | `#FF4D6A` (risk warnings) |

### Stat/Metric Cards

- Background: dark `#0D1223` / light `#F0F2F7`
- Border: dark `1px solid #1E2A45` / light `1px solid #D4D9E4`
- Border-radius: 12px
- Label: IBM Plex Mono 10px uppercase, Muted color
- Value: IBM Plex Mono 30px 500
- Value colors: Amber for monetary/reward values, Teal for activity metrics, primary text for neutral counts

### Tables

- Header: IBM Plex Mono 10px uppercase, Muted. Dark: no bg / Light: `#F0F2F7` bg
- Data cells: IBM Plex Mono 12px
- Row borders: dark `1px solid rgba(30, 42, 69, 0.5)` / light `1px solid #D4D9E4`
- Numeric columns right-aligned
- PnL values colored with signal green/red (use light-adjusted variants in light mode)

### Inputs

- Background: dark `#131A2E` / light `#F0F2F7`
- Border: dark `1px solid #1E2A45` / light `1px solid #D4D9E4`
- Focus border: `#2D6AFF` (same in both modes)
- Text: IBM Plex Mono 14px, primary text color
- Label: IBM Plex Mono 10px uppercase, Muted

---

## 6. Motion

| Type | Duration | Easing | Use |
|------|----------|--------|-----|
| Micro-interaction | 150-200ms | ease-out | Hover, button press, badges |
| Panel transition | 250-300ms | ease-out enter, ease-in exit | Modals, drawers, slide-ins |
| Data update | 400ms | ease-out | Price ticks, PnL changes (fade up from 4px) |
| Chart draw | 600ms | ease-out | Initial line draw (one-time, no loop) |

### Rules

- Only animate `transform` and `opacity` — never `width`, `height`, or layout properties
- Always implement `@media (prefers-reduced-motion: reduce)` on keyframe animations
- No decorative animation — every motion must communicate cause and effect
- No bouncing, no playful easing

---

## 7. Voice & Tone

The voice is an engineer's, not a marketer's. Numbers over adjectives.

### Do

- "AI-driven mean reversion on gTrade. Fully autonomous. Verifiable on-chain."
- "71.0% win rate. 3.55 profit factor. 62 total trades. Open book."
- "Stake Now. No lock-up. Withdraw anytime."

### Don't

- "Our revolutionary AI-powered trading solution..."
- "Join thousands of happy stakers..."
- "Get started on your journey to financial freedom today!"

### Voice Attributes

Precise. Data-first. Transparent. Confident. NOT hype. NOT vague. NOT salesy.

---

## 8. Do / Don't Summary

### Do

- Dark mode as default — light mode only for long-form documents/whitepapers
- IBM Plex Mono for EVERY number, percentage, price, and address
- Chart lines in Yield Teal (dark: `#00C2A8`, light: `#00A88E`)
- Amber exclusively for monetary/reward values
- Signal green/red for positive/negative financial delta ONLY
- Syne 800 for all display type
- 1px solid borders for card depth, not drop shadows
- Animate only transform/opacity
- Use the darkened accent variants in light mode for WCAG contrast
- Keep the same font system across both modes

### Don't

- Use neon yellow-green (`#C9FF00`) — the old brand is dead
- Use purple or pink gradients — this is finance, not a chatbot
- Use emoji as UI icons — Lucide or Heroicons SVG only
- Use green for decorative elements (will be misread as positive signal)
- Use serif fonts anywhere
- Use font weights below 400 or above 800
- Add decorative animation
- Use rounded corners > 12px on cards
- Hardcode hex values — always use CSS custom properties or design tokens
- Use dark mode accent colors on light backgrounds without adjusting for contrast
- Use light mode as default for anything other than documents/whitepapers

---

## 9. Asset-Specific Guidance

### Dashboard / App UI (dark mode)

- Set `background: #080C16` on body
- Import all three Google Fonts
- Use dark mode CSS custom properties for all colors
- Max content width: 960px, centered
- Section dividers: `1px solid #1E2A45`

### Whitepapers / Long-Form Documents (light mode)

- Set `background: #FAFBFD` on body
- Use light mode CSS custom properties
- Max content width: 800px, centered
- Hero area: gradient background `linear-gradient(135deg, #EEF1F8, #E0E6F4, #EEF1F8)`
- Section dividers: `1px solid #D4D9E4`
- Sidebar navigation: `#F0F2F7` background with `#D4D9E4` border
- Callout boxes: `#F0F2F7` background, `1px solid #D4D9E4`, `3px solid #2D6AFF` left border
- Stat cards: `#F0F2F7` background, `1px solid #D4D9E4`, values in `#00A88E` (light teal)
- Diagrams: `#F0F2F7` background, flow nodes in `#E8EBF2` with `#D4D9E4` borders
- Highlighted nodes: `#2D6AFF` border with `rgba(45, 106, 255, 0.15)` box-shadow
- Teal nodes: `#00A88E` border with `rgba(0, 168, 142, 0.15)` box-shadow
- Tables: header bg `#F0F2F7`, all borders `1px solid #D4D9E4`
- Print stylesheet: simplify to `--bg-base: #fff`, `--bg-card: #f5f5f5`, remove glows/shadows

### PDFs / Print

- Use light mode palette for readability
- Ensure Syne and IBM Plex Mono are embedded
- Minimum wordmark size: 24px equivalent
- Print media query: flatten backgrounds to white/light grey, remove box-shadows
- Keep headings with following content (`page-break-after: avoid`)
- Keep diagrams, tables, callouts together (`page-break-inside: avoid`)

### Social Media / OG Images (dark mode)

- Void background, wordmark centered or bottom-left
- Use the 48px grid pattern as subtle background texture: `rgba(45, 106, 255, 0.04)` lines
- Optional teal radial glow: `rgba(0, 194, 168, 0.08)`
- Key metric in IBM Plex Mono, Amber colored
- Keep it minimal — data is the hero

### Favicons (dark mode)

- 16x16, 32x32, 180x180 (apple-touch), 512x512
- `R` in Syne 800, white on Void background
- Or `R.` with dot in Teal for larger sizes
- No background gradients or effects

### Avatars / Profile Images (dark mode)

- Circular crop of wordmark or `R.` mark
- Void background
- Ensure Teal dot is visible at small sizes

### Logos for Dark/Light Contexts

- Dark (default): White `REGIME` + Teal `#00C2A8` `.fi` on Void
- Light: Abyss `#0D1223` `REGIME` + Teal `#00A88E` `.fi` on light background
- Never place the dark wordmark on a dark background or vice versa
