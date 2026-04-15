# Dashboard Brand Rebrand — Design Spec

**Date:** 2026-04-01  
**Source:** `.claude/regime-fi-brand-guidelines.html` (v1.0)

## Summary

Update the Next.js dashboard to match the REGIME.fi brand guidelines v1.0. Replace the current Deep Obsidian theme (lime/cyan/Inter) with the new color system (blue/teal/amber) and three-font typography (Syne/IBM Plex Mono/DM Sans). Remove glassmorphism in favor of solid card backgrounds with 1px borders.

## Color Token Changes

| Token | Old | New | Semantic Role |
|---|---|---|---|
| `regime-bg` | `#0B0E11` | `#080C16` | App background (Void) |
| `regime-card` | `#12151A` | `#0D1223` | Card backgrounds (Abyss) |
| `regime-card-light` | `#1A1E25` | `#131A2E` | Elevated cards (Surface) |
| `regime-border` | `#2A2E37` | `#1E2A45` | Default borders |
| `regime-text` | `#E8EAED` | `#E8EDF8` | Primary text (Ghost) |
| `regime-text-secondary` | `#6B7280` | `#8A96B3` | Secondary text (Muted) |
| `regime-profit` | `#DFFF00` | `#00D68F` | Positive PnL only (signal green) |
| `regime-loss` | `#FF4757` | `#FF4D6A` | Negative PnL only (signal red) |
| `regime-accent` | `#00D4FF` | `#2D6AFF` | Primary CTAs, direction badges (Brand Blue) |
| `regime-highlight` | `#FBBF24` | `#F5A623` | NAV, APY, win rate, monetary values (Amber) |

**New tokens:**
- `regime-teal`: `#00C2A8` — chart line, live badge, `.fi` wordmark, active indicators
- `regime-raised`: `#1B2540` — active tab states, hover backgrounds
- `regime-border2`: `#2D3E60` — hover/active border state
- `regime-subtle`: `#3D4A6B` — subtle/tertiary text

**Removed tokens:**
- `regime-accent-purple` — not in brand system

## Typography Changes

| Role | Old | New |
|---|---|---|
| Display/Headings | Inter 600-800 | Syne 700-800 |
| Data/Numerics | IBM Plex Mono 400-500 | IBM Plex Mono 400-500 (unchanged) |
| Body/UI | Inter 400-500 | DM Sans 400-500 |

**Font loading:** Replace Inter with Syne + DM Sans in `layout.tsx` Google Fonts import. Update `--font-sans` to DM Sans. Add `--font-display` for Syne.

## Card Style Changes

Remove `.glass-card` backdrop blur effect. Replace with:
- Solid `Abyss` (#0D1223) background
- 1px solid `#1E2A45` border
- 12px border radius
- No drop shadows

## Component-Specific Changes

### Header.tsx
- `.fi` suffix: teal (`#00C2A8`), not accent
- Wordmark: Syne 800 font
- Live badge: green signal color background

### PortfolioChart.tsx
- Chart line: `#00C2A8` (teal) for profit, `#FF4D6A` for loss
- Area fill: teal-based gradients
- Crosshair: `#2D6AFF` (blue)
- Grid/label colors: updated to new border/text tokens

### Positions.tsx
- LONG badge: blue (`bg-regime-accent/10 text-regime-accent border-regime-accent/20`)
- SHORT badge: blue (same as LONG — both use Brand Blue per brand guidelines)
- PnL colors: green/red signal colors (unchanged semantic use)

### Signals.tsx
- SHORT direction: blue text, not red
- LONG direction: blue text, not green (direction ≠ PnL)

### StakePanel.tsx
- Stake button: blue (primary CTA), not lime
- Unstake button: outline style, not red fill
- Input focus: blue border

### KpiCards.tsx
- Stat values: amber for monetary metrics (NAV, win rate, profit factor)
- Remove gradient text effect — use solid amber
- Card background: solid, no gradient

### StrategyTabs.tsx
- Active tab: blue bottom border, raised background
- Remove purple gradient

### page.tsx
- Hero headline: Syne 800
- Remove lime/cyan gradient text — use Ghost white or teal accent
- Stat cards: amber values

### StatusBar.tsx
- Connected dot: green (signal use — system healthy)
- Connecting: amber
- Disconnected: red

### TradeLog.tsx
- Replace accent-purple references with teal or blue
- Update badge color mapping

### CompareView.tsx
- Update conditional colors to new tokens

## What Stays the Same

- Layout structure and component hierarchy
- Framer Motion animation patterns
- WebSocket protocol and data flow
- Lightweight Charts library (just color updates)
- Lucide icons
- Responsive breakpoints
