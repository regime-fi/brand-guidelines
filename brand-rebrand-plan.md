# Dashboard Brand Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Next.js dashboard to match REGIME.fi brand guidelines v1.0 — new color system, typography, and card styling.

**Architecture:** All color tokens are centralized in `globals.css` via Tailwind v4 `@theme` directive. Most changes cascade automatically. Component-level changes are needed where semantic color assignments change (e.g., direction badges switching from green/cyan to blue) or where hex values are hardcoded (chart).

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, Lightweight Charts, Framer Motion, RainbowKit

---

### Task 1: Update globals.css — color tokens, fonts, card style

**Files:**
- Modify: `web/app/globals.css`

- [ ] **Step 1: Replace the Google Fonts import and @theme block**

Replace the entire content of `web/app/globals.css` with:

```css
@import 'tailwindcss';
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');

@theme {
  --color-regime-bg: #080C16;
  --color-regime-card: #0D1223;
  --color-regime-card-light: #131A2E;
  --color-regime-raised: #1B2540;
  --color-regime-border: #1E2A45;
  --color-regime-border2: #2D3E60;
  --color-regime-text: #E8EDF8;
  --color-regime-text-secondary: #8A96B3;
  --color-regime-subtle: #3D4A6B;
  --color-regime-profit: #00D68F;
  --color-regime-loss: #FF4D6A;
  --color-regime-accent: #2D6AFF;
  --color-regime-teal: #00C2A8;
  --color-regime-highlight: #F5A623;
  --font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-display: 'Syne', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}

body {
  background-color: var(--color-regime-bg);
  color: var(--color-regime-text);
  font-family: var(--font-sans);
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Solid card style — 1px border, no glassmorphism */
.regime-card {
  background: var(--color-regime-card);
  border: 1px solid var(--color-regime-border);
  border-radius: 12px;
}

/* Hide TradingView branding on Lightweight Charts */
#tv-attr-logo {
  display: none !important;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-regime-card);
}
::-webkit-scrollbar-thumb {
  background: var(--color-regime-border);
  border-radius: 3px;
}
```

Key changes:
- Fonts: Inter → Syne + DM Sans (IBM Plex Mono stays)
- Added `--font-display` for Syne
- `--font-sans` now DM Sans
- All color tokens updated per brand guidelines
- Removed `--color-regime-accent-purple`
- Added `--color-regime-teal`, `--color-regime-raised`, `--color-regime-border2`, `--color-regime-subtle`
- Replaced `.glass-card` with `.regime-card` (solid background, 1px border, 12px radius)

- [ ] **Step 2: Verify the file is saved correctly**

Run: `head -20 web/app/globals.css`
Expected: See the new imports and @theme block with `#080C16` as regime-bg.

- [ ] **Step 3: Commit**

```bash
git add web/app/globals.css
git commit -m "style: update color tokens, fonts, and card style for brand rebrand"
```

---

### Task 2: Update layout.tsx — font classes

**Files:**
- Modify: `web/app/layout.tsx`

- [ ] **Step 1: Update the body className to use DM Sans as default**

The font is loaded via CSS `@import` in globals.css and applied via `--font-sans`, so `layout.tsx` just needs the existing `antialiased` class. No changes needed to layout.tsx since fonts are applied via CSS custom properties now.

Actually, verify the current layout.tsx doesn't reference Inter anywhere. It doesn't — it relies on globals.css. Skip this task, fonts are handled by Task 1.

- [ ] **Step 1: Mark as complete — no changes needed**

layout.tsx already delegates font loading to globals.css. The `@import` in globals.css handles loading Syne + DM Sans + IBM Plex Mono, and `--font-sans` applies DM Sans as the body font.

---

### Task 3: Update providers.tsx — RainbowKit theme colors

**Files:**
- Modify: `web/app/providers.tsx`

- [ ] **Step 1: Update RainbowKit accent color from cyan to Brand Blue**

In `web/app/providers.tsx`, change the `darkTheme` call:

```tsx
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#2D6AFF',
            accentColorForeground: '#FFFFFF',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
```

Changes:
- `accentColor`: `#00D4FF` → `#2D6AFF` (Brand Blue)
- `accentColorForeground`: `#0B0E11` → `#FFFFFF` (white text on blue is more readable than dark)

- [ ] **Step 2: Commit**

```bash
git add web/app/providers.tsx
git commit -m "style: update RainbowKit theme to Brand Blue accent"
```

---

### Task 4: Update Header.tsx — wordmark and live badge

**Files:**
- Modify: `web/app/components/Header.tsx`

- [ ] **Step 1: Update wordmark font to Syne, .fi to teal, live badge to green signal**

Replace the full content of `Header.tsx`:

```tsx
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-extrabold tracking-tight text-regime-text font-[var(--font-display)]">
          REGIME<span className="text-regime-teal">.fi</span>
        </h1>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-regime-profit/12 border border-regime-profit/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-regime-profit opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-regime-profit" />
          </span>
          <span className="text-[10px] font-semibold text-regime-profit uppercase tracking-wider font-mono">Live</span>
        </div>
      </div>
      <ConnectButton
        chainStatus="icon"
        accountStatus="address"
        showBalance={false}
      />
    </div>
  );
}
```

Changes:
- Wordmark: added `font-[var(--font-display)]` for Syne
- `.fi`: `text-regime-accent` → `text-regime-teal`
- Live badge bg: `bg-regime-profit/10` → `bg-regime-profit/12` (per brand guideline badge pattern)
- Live badge border: `border-regime-profit/20` → `border-regime-profit/30`
- Live text: added `font-mono` for IBM Plex Mono per brand guidelines

- [ ] **Step 2: Commit**

```bash
git add web/app/components/Header.tsx
git commit -m "style: update Header wordmark to Syne, .fi to teal, live badge styling"
```

---

### Task 5: Update page.tsx — hero, stat cards, glass-card → regime-card

**Files:**
- Modify: `web/app/page.tsx`

- [ ] **Step 1: Update the StatCard component**

Replace the `StatCard` function (lines 16–57) with:

```tsx
function StatCard({ label, value, valueColor, icon: Icon, tooltip, index }: {
  label: string;
  value: string;
  valueColor: string;
  icon: React.ElementType;
  tooltip: string;
  index: number;
}) {
  const [showTip, setShowTip] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="regime-card p-5 relative group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-regime-card-light">
          <Icon className="w-4 h-4 text-regime-teal" />
        </div>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            className="p-1 text-regime-text-secondary hover:text-regime-text transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {showTip && (
            <div className="absolute right-0 top-full mt-1 w-48 p-2 text-[11px] text-regime-text-secondary bg-regime-card border border-regime-border rounded-lg shadow-xl z-50">
              {tooltip}
            </div>
          )}
        </div>
      </div>
      <div className={`text-3xl sm:text-4xl font-bold tabular-nums font-mono ${valueColor}`}>
        {value}
      </div>
      <div className="text-[10px] text-regime-text-secondary mt-1 uppercase tracking-wider font-mono">{label}</div>
    </motion.div>
  );
}
```

Changes:
- `glass-card rounded-2xl` → `regime-card` (solid card, 12px radius from CSS class)
- Icon color: `text-regime-accent` → `text-regime-teal`
- Icon bg: `bg-regime-card-light/80` → `bg-regime-card-light` (no opacity)
- Value: added `font-mono` (IBM Plex Mono for numbers per brand)
- Label: `text-xs` → `text-[10px]`, added `font-mono` (per brand label spec)

- [ ] **Step 2: Update the hero section**

Replace the hero section (lines 91–109) with:

```tsx
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-10 sm:mt-14 mb-8 sm:mb-10"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.05] font-[var(--font-display)]">
              <span className="text-regime-text">
                Autonomous
              </span>
              <br />
              <span className="text-regime-teal">
                Trading Fund
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-regime-text-secondary max-w-lg leading-relaxed">
              AI-driven mean reversion on gTrade. Fully autonomous crypto trading with verifiable on-chain performance.
            </p>
          </motion.div>
```

Changes:
- Added `font-[var(--font-display)]` for Syne on the headline
- Replaced gradient text (`bg-gradient-to-r from-regime-accent via-regime-profit to-regime-accent bg-clip-text text-transparent`) with solid `text-regime-teal`

- [ ] **Step 3: Update stat card color assignments**

In the stat cards section (around lines 112–145), update the color values:

Change the "All-Time Return" stat:
- `valueColor` stays: `isProfit ? 'text-regime-profit' : 'text-regime-loss'` (correct — this IS financial delta)

Change the "Win Rate" stat:
- `valueColor`: change from `(stats?.winRate ?? 0) >= 50 ? 'text-regime-profit' : 'text-regime-loss'` to `'text-regime-highlight'`
  (Win rate is a monetary metric → amber per brand)

Change the "Profit Factor" stat:
- `valueColor`: change from `"text-regime-accent"` to `"text-regime-teal"`

Change the "Total Trades" stat:
- `valueColor` stays: `"text-regime-text"` (correct — neutral metric)

- [ ] **Step 4: Commit**

```bash
git add web/app/page.tsx
git commit -m "style: update page hero, stat cards, and card styling for brand rebrand"
```

---

### Task 6: Update PortfolioChart.tsx — chart colors and card style

**Files:**
- Modify: `web/app/components/PortfolioChart.tsx`

- [ ] **Step 1: Update hardcoded chart colors in the createChart effect**

In the `createChart` options (around line 48), update:

```tsx
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8A96B3',
        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(30, 42, 69, 0.3)', style: LineStyle.Solid },
      },
      crosshair: {
        vertLine: { color: '#2D6AFF', width: 1, style: LineStyle.Dashed, labelBackgroundColor: '#131A2E' },
        horzLine: { color: '#2D6AFF', width: 1, style: LineStyle.Dashed, labelBackgroundColor: '#131A2E' },
      },
```

Changes:
- `textColor`: `#6B7280` → `#8A96B3` (Muted)
- `fontFamily`: `Inter` → `IBM Plex Mono` (monospace for chart numerics per brand)
- Grid horzLines color: updated to new border token rgba
- Crosshair color: `#00D4FF` → `#2D6AFF` (Brand Blue)
- Label backgrounds: `#1A1E25` → `#131A2E` (Surface)

- [ ] **Step 2: Update area series colors**

In the `addSeries(AreaSeries, ...)` call (around line 78), update:

```tsx
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: '#00C2A8',
      topColor: 'rgba(0, 194, 168, 0.12)',
      bottomColor: 'rgba(0, 194, 168, 0.0)',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 5,
      crosshairMarkerBorderColor: '#00C2A8',
      crosshairMarkerBackgroundColor: '#080C16',
      priceFormat: { type: 'custom', formatter: (price: number) => formatNav(price) },
    });
```

Changes:
- Line color: `#DFFF00` → `#00C2A8` (Yield Teal)
- Area fill: lime → teal rgba values
- Crosshair marker border: `#DFFF00` → `#00C2A8`
- Crosshair marker background: `#0B0E11` → `#080C16` (Void)

- [ ] **Step 3: Update the dynamic color logic in the data update effect**

In the second `useEffect` (around line 132), update:

```tsx
    const lineColor = isProfit ? '#00C2A8' : '#FF4D6A';
    seriesRef.current.applyOptions({
      lineColor,
      topColor: isProfit ? 'rgba(0, 194, 168, 0.12)' : 'rgba(255, 77, 106, 0.12)',
      bottomColor: isProfit ? 'rgba(0, 194, 168, 0.0)' : 'rgba(255, 77, 106, 0.0)',
      crosshairMarkerBorderColor: lineColor,
    });
```

Changes:
- Profit line: `#DFFF00` → `#00C2A8` (Teal)
- Loss line: `#FF4757` → `#FF4D6A` (brand red)
- Area fills: updated rgba values

- [ ] **Step 4: Update the JSX — replace glass-card, update range button colors**

Replace the outer div (line 154):
- `glass-card rounded-2xl` → `regime-card`

Update the range buttons (around line 169):
- Active: `bg-regime-accent/15 text-regime-accent` → `bg-regime-accent/15 text-regime-accent` (Brand Blue now — stays same class name but new color value)
- Container: `bg-regime-card-light/50` → `bg-regime-card-light`

Update the NAV display font — add `font-mono` to the NAV value span (line 159).

Full updated return JSX:

```tsx
  return (
    <div className="regime-card h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] uppercase tracking-wider text-regime-text-secondary font-mono">NAV Per Share</span>
          <span className={`text-xl font-bold tabular-nums font-mono ${isProfit ? 'text-regime-highlight' : 'text-regime-loss'}`}>
            {formatNav(currentNav)}
          </span>
          <span className={`text-xs font-semibold tabular-nums font-mono ${isRangeProfit ? 'text-regime-profit/70' : 'text-regime-loss/70'}`}>
            {isRangeProfit ? '+' : ''}{rangeChangePct}%
          </span>
        </div>
        <div className="flex items-center gap-1 bg-regime-card-light rounded-lg p-0.5">
          {rangeButtons.map((r) => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer font-mono ${
                range === r ? 'bg-regime-accent/15 text-regime-accent' : 'text-regime-text-secondary hover:text-regime-text'
              }`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex-1 min-h-[200px]">
        <div ref={chartContainerRef} className="h-full" />
        {filtered.length < 2 && (
          <div className="absolute inset-0 flex items-center justify-center text-regime-text-secondary text-sm">
            Collecting data...
          </div>
        )}
      </div>
    </div>
  );
```

Key changes:
- `glass-card rounded-2xl` → `regime-card`
- NAV label: `text-xs` → `text-[10px]` + `font-mono`
- NAV value: added `font-mono`, `isProfit` uses `text-regime-highlight` (Amber for monetary value) instead of `text-regime-profit`
- Range change %: still uses profit/loss (this IS financial delta — correct)
- Range buttons: added `font-mono`
- Container bg: removed `/50` opacity

- [ ] **Step 5: Commit**

```bash
git add web/app/components/PortfolioChart.tsx
git commit -m "style: update chart colors to Teal/Blue, solid card, mono fonts"
```

---

### Task 7: Update Positions.tsx — direction badges to blue, card style

**Files:**
- Modify: `web/app/components/Positions.tsx`

- [ ] **Step 1: Update DirectionBadge to use blue for both LONG and SHORT**

Replace the `DirectionBadge` function:

```tsx
function DirectionBadge({ direction }: { direction: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-regime-accent/12 text-regime-accent border border-regime-accent/20 font-mono">
      {direction === 'long' ? '\u25B2' : '\u25BC'} {direction}
    </span>
  );
}
```

Changes: Both LONG and SHORT use blue badges per brand guidelines. Added `font-mono`.

- [ ] **Step 2: Update direction color references throughout**

Replace all instances of `dirColor` logic. In `OpenPositionDetail`, `ClosedPositionDetail`, `OpenTable` mobile, `OpenTable` desktop, `ClosedTable` mobile, `ClosedTable` desktop — change:

```tsx
const dirColor = pos.direction === 'long' ? 'text-regime-profit' : 'text-regime-accent';
```

to:

```tsx
const dirColor = 'text-regime-accent';
```

This applies to all 6 places where `dirColor` is defined in the file.

- [ ] **Step 3: Update ShowMoreButton**

Replace:
```tsx
className="w-full py-2 text-xs text-regime-accent hover:text-regime-accent-purple transition-colors border-t border-regime-border/50"
```
with:
```tsx
className="w-full py-2 text-xs text-regime-accent hover:text-regime-text transition-colors border-t border-regime-border/50 font-mono"
```

Removes `accent-purple` reference, uses `text` for hover instead.

- [ ] **Step 4: Update glass-card reference and tab buttons**

Replace `glass-card rounded-2xl` in the main Positions wrapper (line 374) with `regime-card`.

Update the open/closed tab buttons — replace `bg-regime-accent/15 text-regime-accent` — actually these are fine since `accent` is now Brand Blue. No change needed.

- [ ] **Step 5: Commit**

```bash
git add web/app/components/Positions.tsx
git commit -m "style: update Positions direction badges to blue, solid card"
```

---

### Task 8: Update StakePanel.tsx — button colors, card style, input focus

**Files:**
- Modify: `web/app/components/StakePanel.tsx`

- [ ] **Step 1: Update the outer card and header icon**

Replace `glass-card rounded-2xl` (line 73) with `regime-card`.

Change the shield icon color:
- `text-regime-accent` → `text-regime-teal`

- [ ] **Step 2: Update the yield estimator section**

Replace the yield estimator div (around line 129):

```tsx
            {mode === 'stake' && amountNum > 0 && (
              <div className="bg-regime-highlight/5 border border-regime-highlight/10 rounded-xl px-4 py-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-regime-highlight/80 uppercase tracking-wider font-medium font-mono">
                  <Zap className="w-3 h-3" />
                  Estimated Returns
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-regime-text-secondary">Shares received</span>
                  <span className="text-sm font-semibold tabular-nums text-regime-text font-mono">{previewShares.toFixed(2)}</span>
                </div>
                {estimatedMonthlyYield !== null && (
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-regime-text-secondary">Est. monthly yield</span>
                    <span className="text-sm font-semibold tabular-nums text-regime-highlight font-mono">{formatValue(estimatedMonthlyYield)}</span>
                  </div>
                )}
              </div>
            )}
```

Changes: All `regime-profit` references in yield estimator → `regime-highlight` (Amber for monetary values). Added `font-mono` to numeric displays.

- [ ] **Step 3: Update the submit button**

Replace the submit button (around line 155):

```tsx
            <button onClick={handleSubmit}
              className={`w-full py-4 rounded-xl text-sm font-bold transition-all cursor-pointer capitalize shadow-lg font-[var(--font-display)] ${
                mode === 'stake'
                  ? 'bg-regime-accent text-white hover:shadow-regime-accent/30 hover:shadow-xl'
                  : 'bg-transparent text-regime-text border border-regime-border2 hover:bg-regime-raised'
              }`}>
              {mode === 'stake' ? 'Stake Now' : 'Unstake'}
            </button>
```

Changes:
- Stake button: `bg-regime-profit text-regime-bg` → `bg-regime-accent text-white` (Blue primary CTA per brand)
- Unstake button: `bg-regime-loss/90 text-white` → outline style per brand (secondary action)
- Added `font-[var(--font-display)]` for Syne on CTA buttons per brand guidelines

- [ ] **Step 4: Update the disconnected state**

Replace the disconnected section (around lines 202–220):

```tsx
          <div className="flex-1 flex flex-col items-center justify-center space-y-5 py-4">
            <div className="p-3 rounded-2xl bg-regime-teal/5 border border-regime-teal/10">
              <Shield className="w-8 h-8 text-regime-teal" />
            </div>
            <div className="text-center space-y-1.5">
              <div className="text-base font-semibold text-regime-text font-[var(--font-display)]">Start earning today</div>
              <div className="text-xs text-regime-text-secondary max-w-[240px] mx-auto leading-relaxed">
                Connect your wallet to stake into the autonomous trading fund
              </div>
            </div>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button onClick={openConnectModal}
                  className="w-full py-4 rounded-xl text-sm font-bold transition-all cursor-pointer bg-regime-teal text-regime-bg hover:shadow-regime-teal/30 hover:shadow-xl shadow-lg shadow-regime-teal/20 font-[var(--font-display)]">
                  Connect Wallet to Stake
                </button>
              )}
            </ConnectButton.Custom>
          </div>
```

Changes:
- Icon container: `regime-accent` → `regime-teal`
- "Start earning today": added Syne font
- Connect button: `bg-regime-profit` → `bg-regime-teal` (Teal for wallet actions per brand)
- Added Syne font to button

- [ ] **Step 5: Update input focus colors**

Change the input's focus classes (around line 114):
- `focus:border-regime-accent/40 focus:ring-regime-accent/20` stays the same class names (accent is now Brand Blue)

No change needed — the accent token already maps to blue.

- [ ] **Step 6: Commit**

```bash
git add web/app/components/StakePanel.tsx
git commit -m "style: update StakePanel buttons, yield estimator, and card style"
```

---

### Task 9: Update Signals.tsx — direction colors, remove accent-purple

**Files:**
- Modify: `web/app/components/Signals.tsx`

- [ ] **Step 1: Update direction colors**

In `SignalDetail` (line 45), change:
```tsx
const dirColor = isLong ? 'text-regime-profit' : 'text-regime-loss';
```
to:
```tsx
const dirColor = 'text-regime-accent';
```

In the contributing signals section (line 89), change:
```tsx
const csColor = cs.direction === 'long' ? 'text-regime-profit' : cs.direction === 'short' ? 'text-regime-loss' : 'text-regime-text-secondary';
```
to:
```tsx
const csColor = cs.direction === 'long' || cs.direction === 'short' ? 'text-regime-accent' : 'text-regime-text-secondary';
```

In the main signal list (line 140-141), change:
```tsx
const dirColor = isLong ? 'text-regime-profit' : 'text-regime-loss';
```
to:
```tsx
const dirColor = 'text-regime-accent';
```

- [ ] **Step 2: Update card style and show-more button**

Replace the outer card div (line 123):
- `bg-gradient-to-br from-regime-card-light to-regime-card rounded-xl border border-regime-border` → `regime-card`

Replace the show-more button (line 171):
- `text-regime-accent hover:text-regime-accent-purple` → `text-regime-accent hover:text-regime-text`

- [ ] **Step 3: Commit**

```bash
git add web/app/components/Signals.tsx
git commit -m "style: update Signals direction colors to blue, remove accent-purple"
```

---

### Task 10: Update TradeLog.tsx — badge colors, remove accent-purple

**Files:**
- Modify: `web/app/components/TradeLog.tsx`

- [ ] **Step 1: Update badgeMap — replace accent-purple with teal**

Replace the `badgeMap` object:

```tsx
const badgeMap: Record<string, { label: string; className: string }> = {
  signal: { label: 'SIG', className: 'bg-regime-teal/20 text-regime-teal' },
  trade: { label: 'TRD', className: 'bg-regime-accent/20 text-regime-accent' },
  paper_open: { label: 'OPEN', className: 'bg-regime-profit/20 text-regime-profit' },
  paper_close: { label: 'CLOSE', className: 'bg-regime-highlight/20 text-regime-highlight' },
  snapshot: { label: 'SNAP', className: 'bg-regime-text-secondary/10 text-regime-text-secondary/60' },
  status: { label: 'SYS', className: 'bg-regime-text-secondary/10 text-regime-text-secondary/60' },
};
```

Change: `signal` badge from `accent-purple` → `teal`.

- [ ] **Step 2: Update card style and show-more button**

Replace the outer card div (line 28):
- `bg-gradient-to-br from-regime-card-light to-regime-card rounded-xl border border-regime-border` → `regime-card`

Replace the show-more button (line 62):
- `text-regime-accent hover:text-regime-accent-purple` → `text-regime-accent hover:text-regime-text`

Update timestamp color (line 48):
- `text-regime-accent` → `text-regime-teal` (teal for live activity indicators)

- [ ] **Step 3: Commit**

```bash
git add web/app/components/TradeLog.tsx
git commit -m "style: update TradeLog badge colors, remove accent-purple"
```

---

### Task 11: Update StrategyTabs.tsx — remove purple gradient

**Files:**
- Modify: `web/app/components/StrategyTabs.tsx`

- [ ] **Step 1: Update active tab styling**

Replace the active tab class (line 30):
```tsx
'bg-gradient-to-r from-regime-accent/20 to-regime-accent-purple/20 text-regime-text border-b-2 border-regime-accent'
```
with:
```tsx
'bg-regime-raised text-regime-text border-b-2 border-regime-accent'
```

Changes: Remove purple gradient, use solid `raised` background. Blue bottom border stays (accent is now Brand Blue).

- [ ] **Step 2: Commit**

```bash
git add web/app/components/StrategyTabs.tsx
git commit -m "style: update StrategyTabs active state, remove purple gradient"
```

---

### Task 12: Update StatusBar.tsx — use signal colors correctly

**Files:**
- Modify: `web/app/components/StatusBar.tsx`

- [ ] **Step 1: Verify StatusBar colors**

The StatusBar already uses:
- `bg-regime-profit` for connected (green — system healthy, correct per brand signal rule)
- `bg-regime-highlight` for connecting (amber — correct)
- `bg-regime-loss` for disconnected (red — correct)

These are all valid uses of signal colors per brand guidelines. No changes needed to the color logic.

However, update the backdrop blur:
- `bg-regime-bg/80 backdrop-blur-sm` → `bg-regime-bg` (no glassmorphism per brand)

- [ ] **Step 2: Commit**

```bash
git add web/app/components/StatusBar.tsx
git commit -m "style: remove backdrop blur from StatusBar"
```

---

### Task 13: Update CompareView.tsx — color updates

**Files:**
- Modify: `web/app/components/CompareView.tsx`

- [ ] **Step 1: Update conditional value colors and card style**

Replace `rounded-2xl` (line 27) with `rounded-xl` (12px per brand — `rounded-xl` = 12px in Tailwind).

Update total value color (line 50):
```tsx
className={`py-2 pr-4 text-right font-mono ${row.totalValue >= 1000 ? 'text-regime-profit' : 'text-regime-loss'}`}
```
Change to:
```tsx
className="py-2 pr-4 text-right font-mono text-regime-highlight"
```
(Total value is a monetary metric → always amber, not profit/loss coloring.)

Update profit factor color (line 56):
```tsx
className={`py-2 pr-4 text-right font-mono ${row.profitFactor >= 1 ? 'text-regime-profit' : 'text-regime-loss'}`}
```
Change to:
```tsx
className="py-2 pr-4 text-right font-mono text-regime-teal"
```
(Profit factor is an activity metric → teal.)

Update heading font:
```tsx
<h2 className="text-lg font-semibold text-regime-text mb-4">
```
Change to:
```tsx
<h2 className="text-lg font-bold text-regime-text mb-4 font-[var(--font-display)]">
```

- [ ] **Step 2: Commit**

```bash
git add web/app/components/CompareView.tsx
git commit -m "style: update CompareView metric colors and heading font"
```

---

### Task 14: Update KpiCards.tsx — remove gradient text, update colors

**Files:**
- Modify: `web/app/components/KpiCards.tsx`

- [ ] **Step 1: Update card backgrounds and colors**

Replace the `Card` component background:
```tsx
className="bg-gradient-to-br from-regime-card-light to-regime-card rounded-xl p-4 border border-regime-border min-h-[100px]"
```
with:
```tsx
className="bg-regime-card rounded-xl p-4 border border-regime-border min-h-[100px]"
```

Same for `SkeletonCard` — remove the gradient.

- [ ] **Step 2: Update KpiCards color assignments**

Change "Total Value" card (line 54-57):
```tsx
color="bg-gradient-to-r from-regime-accent to-regime-accent-purple bg-clip-text text-transparent"
```
to:
```tsx
color="text-regime-highlight"
```

Change "Win Rate" card (line 64):
```tsx
color={stats.winRate >= 50 ? 'text-regime-profit' : 'text-regime-loss'}
```
to:
```tsx
color="text-regime-highlight"
```
(Win rate is a monetary metric → amber)

"Profit Factor" card already uses `text-regime-highlight` — correct.

- [ ] **Step 3: Commit**

```bash
git add web/app/components/KpiCards.tsx
git commit -m "style: update KpiCards remove gradient text, use amber for metrics"
```

---

### Task 15: Verify build and visual check

**Files:** None (verification only)

- [ ] **Step 1: Run the build**

Run: `cd web && npm run build`
Expected: Successful build with no errors. There may be warnings about unused imports if `regime-accent-purple` was referenced — these should have been caught in prior tasks.

- [ ] **Step 2: Search for any remaining old token references**

Run a search for `accent-purple`, `glass-card`, `#DFFF00`, `#00D4FF`, `#0B0E11`, and `Inter` across `web/` to catch any stragglers.

- [ ] **Step 3: Fix any remaining references found in step 2**

- [ ] **Step 4: Final commit if any fixes were made**

```bash
git add -A web/
git commit -m "style: clean up remaining old brand references"
```
