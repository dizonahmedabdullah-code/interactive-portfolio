# InteractivePortfolio — Claude Code Guidelines

## Project Overview
A personal interactive portfolio website. The goal is a memorable, production-grade frontend that avoids all generic AI aesthetics. Every design decision should feel intentional and context-specific.

---

## Stack & Architecture

- **Framework:** React or Next.js (default to Next.js App Router with Server Components)
- **Styling:** Tailwind CSS — check `package.json` for v3 vs v4 before writing config
- **Animation:** Framer Motion for UI interactions; GSAP/ThreeJS only for isolated full-page scrolltelling or canvas backgrounds — never mix the two in the same component tree
- **Icons:** `@phosphor-icons/react` or `@radix-ui/react-icons` — verify installed package before importing; standardize `strokeWidth` to `1.5` globally
- **Images:** Use `https://picsum.photos/seed/{random_string}/800/600` for placeholders — never Unsplash

### Component Rules
- Interactive/animated components **must** be isolated Client Components (`'use client'` at the top)
- Server Components render static layout only
- Perpetual animations must be memoized (`React.memo`) in their own microscopic Client Component — never trigger parent re-renders
- Use `useState`/`useReducer` locally; global state only to avoid deep prop-drilling
- `useEffect` animations must always include cleanup functions

---

## Design System Dials

| Dial | Value | Meaning |
|------|-------|---------|
| DESIGN_VARIANCE | 8 | Asymmetric layouts, masonry, fractional CSS Grid, massive negative space |
| MOTION_INTENSITY | 6 | Fluid CSS transitions + Framer Motion; spring physics on all interactives |
| VISUAL_DENSITY | 4 | Normal app spacing — breathable but not art-gallery sparse |

**Mobile override (DESIGN_VARIANCE 4–10):** Any asymmetric layout above `md:` must collapse to strict single-column (`w-full px-4 py-8`) below 768px — no horizontal scroll ever.

---

## Typography

- **Display:** `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body:** `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- **Allowed fonts:** `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi` — pair a distinctive display font with a refined body font
- **Banned fonts:** Inter, Roboto, Arial, system-ui, Space Grotesk — no exceptions

---

## Color

- Max **1 accent color**, saturation < 80%
- Base palette: absolute neutrals — `Zinc` or `Slate` scale
- No purple/blue AI gradients ("The Lila Ban")
- No pure `#000000` — use Zinc-950 or off-black
- No oversaturated accents, no gradient text on large headers
- No outer glow box-shadows — use inner borders (`border-white/10`) and tinted diffusion shadows instead
- Commit to one palette end-to-end: do not mix warm and cool grays

---

## Layout Rules

- **No centered Hero sections** (DESIGN_VARIANCE > 4) — use Split Screen, Left-Aligned, or Asymmetric Whitespace
- **No 3-equal-card horizontal rows** — use 2-column zig-zag, asymmetric grid, or horizontal scroll
- Full-height sections: always `min-h-[100dvh]`, never `h-screen`
- Page container: `max-w-[1400px] mx-auto` or `max-w-7xl`
- Grid over flex-math: use `grid grid-cols-1 md:grid-cols-3 gap-6`, never `w-[calc(33%-1rem)]`
- Cards only when elevation communicates hierarchy — prefer `border-t`, `divide-y`, or negative space
- Z-index only for systemic layers (sticky nav, modals, overlays) — no arbitrary `z-50` spam

---

## Motion & Animation

- Animate exclusively via `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Spring physics on all interactive elements: `type: "spring", stiffness: 100, damping: 20`
- Use `layout` and `layoutId` props for smooth re-ordering and shared element transitions
- Staggered list/grid reveals: `staggerChildren` (Framer) or `animation-delay: calc(var(--index) * 100ms)`
- Grain/noise overlays on `fixed` pseudo-elements only (`fixed inset-0 z-50 pointer-events-none`) — never on scrolling containers
- Magnetic hover/continuous animations: use `useMotionValue` + `useTransform` — never `useState` for these
- Wrap dynamic lists in `<AnimatePresence>`

---

## Interaction States (Mandatory)

Every interactive component must implement:
- **Loading:** Skeleton loaders matching layout geometry — no generic spinners
- **Empty state:** Beautifully composed with a clear call to action
- **Error state:** Inline, clear error reporting
- **Active/press feedback:** `-translate-y-[1px]` or `scale-[0.98]` on `:active`

---

## Content & Copy Rules

- No generic names ("John Doe", "Sarah Chan") — use creative, realistic names
- No predictable fake data (`99.99%`, `50%`) — use organic numbers (`47.2%`, `+1 (312) 847-1928`)
- No filler AI copywriting: "Elevate", "Seamless", "Unleash", "Next-Gen" — use concrete verbs
- No startup slop brand names: "Acme", "Nexus", "SmartFlow"
- No emoji in code, markup, or content — use Phosphor/Radix icons or SVG

---

## Absolute Bans (AI Tells to Avoid)

- Inter / Roboto / Arial / system fonts
- Purple gradients on white or dark backgrounds
- Centered hero with text over a dark image
- 3 equal cards in a horizontal row
- `h-screen` on full-height sections
- `box-shadow` neon outer glows
- Unsplash image URLs
- Generic circular loading spinners
- Custom mouse cursors
- Emojis anywhere in the UI

---

## Pre-Flight Checklist

Before every component delivery:
- [ ] Global state used only to avoid deep prop-drilling?
- [ ] Mobile layout collapse guaranteed for high-variance designs?
- [ ] Full-height sections use `min-h-[100dvh]`?
- [ ] `useEffect` animations have cleanup functions?
- [ ] Empty, loading, and error states implemented?
- [ ] Perpetual animations isolated in their own memoized Client Components?
- [ ] No font/color/layout from the banned list?
- [ ] Tailwind version matched to `package.json` (v3 vs v4)?
