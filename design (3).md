# Pan Audio Private Ltd — Website Design Specification
## `design.md` · Version 1.0 · Liquid Glass Design System

> **Reference:** Smart Home Hub UI (attached image `333333333.webp` + motion study `22222.mp4`)
> **Mapped to:** Pan Audio PRD v1.0
> **Aesthetic:** Liquid Glass · Glassmorphism · Depth-of-Field Environments · Warm Neutral Palette

---

## Table of Contents

1. [Design Philosophy & Reference Analysis](#1-design-philosophy--reference-analysis)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Glassmorphism Component Library](#4-glassmorphism-component-library)
5. [Layout & Spatial System](#5-layout--spatial-system)
6. [Animation & Motion System](#6-animation--motion-system)
7. [Page-by-Page Design Specs](#7-page-by-page-design-specs)
8. [Component Design Specs](#8-component-design-specs)
9. [Responsive Design System](#9-responsive-design-system)
10. [CSS Design Tokens](#10-css-design-tokens)
11. [Asset & Media Guidelines](#11-asset--media-guidelines)

---

## 1. Design Philosophy & Reference Analysis

### 1.1 Core Visual Principles Extracted from Reference

The Smart Home Hub UI reference reveals **five foundational design patterns** that must govern every Pan Audio page:

---

#### PATTERN 1 — Depth-of-Field Background Environment
The reference uses a **photographically blurred living-room backdrop** (mean luminance ≈ RGB 80,82,83). This is NOT a gradient or solid colour — it is a *contextual depth environment*. The blurred background creates a sense of real-world immersion and makes foreground glass panels "float" naturally.

**→ Pan Audio Application:** Every hero section uses a **looping video background** with a CSS `blur(3px)` + `brightness(0.75)` overlay. Static pages use ambient photographic backgrounds of AV installations, conference rooms, or server racks — all blurred at the CSS level (`filter: blur(6px)`) to replicate the bokeh depth.

---

#### PATTERN 2 — Dual Glass Tier System (Dark Glass + Light Glass)
The reference uses **two distinct glass card types simultaneously**:

| Glass Type | Reference Element | Avg RGB | Use Case |
|---|---|---|---|
| **Dark Glass** | "Device Battery" card | `(61, 44, 40)` | High-emphasis callouts, stats, hero panels on dark backgrounds |
| **Light Glass** | "Today's Power" card | `(224, 216, 214)` | Secondary cards, detail panels, product specs |
| **White Glass** | "Connected Devices" panel | `(214, 216, 213)` | Primary content panels, sidebars, modals |

**→ Pan Audio Application:** Solutions cards use Light Glass. Featured stat counters use Dark Glass. Product modals use White Glass over blurred backgrounds.

---

#### PATTERN 3 — Floating Annotation Labels
The reference has **small floating pill labels** ("Lights", "Power", "Connection") with thin connector lines pointing to the product. These labels are dark semi-transparent glass (`avg RGB 76–93`), white text, small rounded pills. They float at 3D-feeling positions around the central element.

**→ Pan Audio Application:** Product hero sections feature floating spec labels — e.g., around a speaker image: `"500W RMS"`, `"DSPPA"`, `"IP65 Rated"`. Around a projector: `"7200 Lumens"`, `"Laser 3LCD"`, `"WUXGA"`. Thin SVG connector lines animate in on scroll.

---

#### PATTERN 4 — Soft Frame Container
The entire reference UI sits within a **large rounded outer frame** (border-radius ≈ 24–32px) with a subtle border `rgba(176,176,176,0.5)`. This creates a "device screen" or "premium demo" aesthetic.

**→ Pan Audio Application:** Hero sections and featured content areas are contained within soft-rounded glass frames. The website outer wrapper on large screens uses `max-width: 1440px` with a `border: 1px solid rgba(235,235,235,0.6)` soft frame, giving the site a premium, contained feeling on ultra-wide displays.

---

#### PATTERN 5 — Warm Neutral Foundation
The reference palette is built on **warm neutrals, not cool greys**. Dark cards have warm near-black (`#13100F`). Light cards have warm white (`#F0EDEC`). The accent orange (`RGB 238, 82, 44` → `#EE522C`) is the sole warm saturated colour, making every CTA immediately focal.

**→ Pan Audio Application:** The PRD's `#E8471C` accent is confirmed by the reference. All neutrals lean warm. No cool blues or purple-greys anywhere in the system.

---

### 1.2 Motion Study Observations (from `22222.mp4`)

From the video reference, the following motion principles are extracted:

- **Liquid morphing blur transitions:** Panel entry uses a progressive blur-clear effect (blur `18px → 0`) over `600ms`
- **Elastic spring scaling:** Cards entering from below use `scale(0.92) → scale(1.0)` with a spring overshoot (`stiffness: 280, damping: 22`)
- **Continuous ambient animation:** Background video loops with a very slow 0.3× speed playback feel — meditative, not distracting
- **Staggered reveal grid:** Multiple cards reveal with a `80ms` stagger per item — creates a "breathing" wave effect
- **Smooth scroll-parallax:** Background moves at `0.4×` scroll speed vs foreground elements at `1.0×` — deepens perceived depth
- **Glow pulse on accent:** The orange CTA button has a subtle `box-shadow` glow that pulses on a `2s infinite` cycle

---

## 2. Color System

### 2.1 Primary Palette

```css
/* ─── PRIMARY COLOUR TOKENS ─────────────────────────────── */

--color-bg-base:          #F7F7F5;   /* Off-white page background */
--color-bg-pure:          #FFFFFF;   /* Pure white (modals, input bg) */
--color-border-soft:      #EBEBEB;   /* Soft grey borders, dividers */
--color-accent:           #E8471C;   /* Pan Audio Orange — CTAs, highlights */
--color-accent-hover:     #D43E18;   /* Accent on hover (darkened 8%) */
--color-accent-glow:      rgba(232, 71, 28, 0.22);  /* Glow shadow */

/* ─── DARK MODE / DARK GLASS TOKENS ─────────────────────── */

--color-dark-base:        #131110;   /* Warm near-black (dark glass bg) */
--color-dark-surface:     #1E1A19;   /* Elevated dark surface */
--color-dark-border:      rgba(255,255,255,0.10);  /* Subtle border on dark */

/* ─── TEXT ───────────────────────────────────────────────── */

--color-text-primary:     #1C1A18;   /* Warm charcoal for body text */
--color-text-secondary:   #6E6961;   /* Warm mid-grey for captions */
--color-text-muted:       #A8A09A;   /* Muted, disabled states */
--color-text-on-dark:     #F5F2F0;   /* Light text on dark glass */
--color-text-on-accent:   #FFFFFF;   /* White text on orange bg */

/* ─── GLASS PANEL FILLS ──────────────────────────────────── */

--glass-light-fill:       rgba(255, 255, 255, 0.72);   /* Light glass panels */
--glass-light-fill-hover: rgba(255, 255, 255, 0.85);
--glass-dark-fill:        rgba(19, 17, 16, 0.82);      /* Dark glass panels */
--glass-dark-fill-hover:  rgba(19, 17, 16, 0.92);
--glass-neutral-fill:     rgba(247, 247, 245, 0.60);   /* Mid glass (on video) */
--glass-border-light:     rgba(255, 255, 255, 0.40);   /* Light glass border */
--glass-border-dark:      rgba(255, 255, 255, 0.08);   /* Dark glass border */

/* ─── FUNCTIONAL ─────────────────────────────────────────── */

--color-success:          #2DB363;   /* Green for active states / toggles */
--color-warning:          #F59E0B;   /* Amber for warnings */
--color-error:            #DC2626;   /* Red for errors */
```

### 2.2 Colour Usage Map

| Surface / Context | Token | Hex / Value |
|---|---|---|
| Page background | `--color-bg-base` | `#F7F7F5` |
| Hero section (over video) | `--glass-neutral-fill` | `rgba(247,247,245,0.60)` |
| Product/solution cards (light) | `--glass-light-fill` | `rgba(255,255,255,0.72)` |
| Stats / callout cards (dark) | `--glass-dark-fill` | `rgba(19,17,16,0.82)` |
| Modals | `--glass-light-fill` | `rgba(255,255,255,0.72)` |
| Navigation bar (scrolled) | `rgba(247,247,245,0.85)` + blur | — |
| CTA Buttons | `--color-accent` | `#E8471C` |
| Active nav link underline | `--color-accent` | `#E8471C` |
| Footer background | `--color-dark-base` | `#131110` |
| Body text | `--color-text-primary` | `#1C1A18` |
| Card metadata / captions | `--color-text-secondary` | `#6E6961` |

### 2.3 Accent Gradient (for decorative use only)

```css
--gradient-accent: linear-gradient(135deg, #E8471C 0%, #F4651A 100%);
--gradient-accent-glow: radial-gradient(ellipse at center, rgba(232,71,28,0.3) 0%, transparent 70%);
--gradient-hero-overlay: linear-gradient(180deg, rgba(19,17,16,0.15) 0%, rgba(19,17,16,0.55) 100%);
```

---

## 3. Typography System

### 3.1 Font Stack

The reference UI uses a clean geometric sans-serif. For Pan Audio's premium identity:

```css
/* ─── FONT IMPORTS ──────────────────────────────────────── */
/* Primary Display: Sora — geometric, distinctive, premium */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

/* Body / UI: DM Sans — friendly, readable, modern */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

/* Monospace (specs, technical data): JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

--font-display: 'Sora', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

### 3.2 Type Scale

| Token | Role | Font | Weight | Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `--text-display-xl` | Page H1, hero headline | Sora | 700 | `clamp(52px, 6vw, 80px)` | 1.08 | `-0.03em` |
| `--text-display-lg` | Section H2 | Sora | 600 | `clamp(36px, 4vw, 56px)` | 1.12 | `-0.025em` |
| `--text-display-md` | Sub-section H3 | Sora | 600 | `clamp(24px, 2.5vw, 32px)` | 1.20 | `-0.02em` |
| `--text-heading` | Card titles, H4 | Sora | 600 | `20px / 22px` | 1.30 | `-0.01em` |
| `--text-subheading` | Labels, nav items | DM Sans | 500 | `15px / 16px` | 1.40 | `0.01em` |
| `--text-body-lg` | Lead paragraphs | DM Sans | 400 | `18px` | 1.65 | `0` |
| `--text-body` | Body copy | DM Sans | 400 | `16px` | 1.60 | `0` |
| `--text-body-sm` | Captions, meta | DM Sans | 400 | `14px` | 1.55 | `0.005em` |
| `--text-label` | Tags, badges, pills | DM Sans | 500 | `12px` | 1.40 | `0.04em` (uppercase) |
| `--text-cta` | Button text | DM Sans | 600 | `15px` | 1.20 | `0.01em` |
| `--text-spec` | Technical specs | JetBrains Mono | 400 | `13px` | 1.50 | `0` |

### 3.3 Typography Usage Rules

- **Display text only in Sora.** Never use Sora for body copy below 18px.
- **All caps only for label-tier text** — category tags, section eyebrows, stat labels.
- **No bold (700) weight in body text** — strong emphasis uses colour `#E8471C`, not weight.
- **Spec tables and technical data** always in `JetBrains Mono` — this creates a premium "datasheet" feel that reinforces technical credibility.
- **Line length:** 60–75 characters max for body paragraphs. Use `max-width: 65ch` on prose blocks.

---

## 4. Glassmorphism Component Library

### 4.1 Glass Panel Variants

#### Light Glass Panel (Primary)
*Reference: "Today's Power" card, "Connected Devices" panel*

```css
.glass-light {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.50);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.07),
    0 1px 0 rgba(255, 255, 255, 0.80) inset,   /* top highlight */
    0 -1px 0 rgba(0, 0, 0, 0.04) inset;         /* bottom depth */
}

.glass-light:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.10),
    0 1px 0 rgba(255, 255, 255, 0.90) inset;
  transform: translateY(-4px);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

#### Dark Glass Panel (High-Emphasis Callout)
*Reference: "Device Battery" card (avg RGB 61,44,40)*

```css
.glass-dark {
  background: rgba(19, 17, 16, 0.84);
  backdrop-filter: blur(28px) saturate(140%);
  -webkit-backdrop-filter: blur(28px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 24px;
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.30),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
  color: #F5F2F0;
}

/* Orange accent line on dark glass (replicate reference's warm tones) */
.glass-dark::before {
  content: '';
  position: absolute;
  bottom: 0; left: 12px; right: 12px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #E8471C, transparent);
  border-radius: 0 0 24px 24px;
  opacity: 0.6;
}
```

#### Frosted Nav Glass
*Reference: top navigation bar (avg RGB 179,180,179)*

```css
.glass-nav {
  background: rgba(247, 247, 245, 0.82);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(235, 235, 235, 0.60);
  box-shadow: 0 1px 24px rgba(0, 0, 0, 0.05);
}
```

#### Modal Glass (Deep Blur)
```css
.glass-modal {
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.60);
  border-radius: 32px;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.95) inset;
}
```

#### Hero Glass Overlay Panel
*Reference: centre content area over blurred bg*

```css
.glass-hero-panel {
  background: rgba(247, 247, 245, 0.10);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 28px;
  box-shadow:
    0 8px 48px rgba(0, 0, 0, 0.12),
    0 1px 0 rgba(255, 255, 255, 0.30) inset;
}
```

### 4.2 Floating Annotation Label
*Reference: "Lights", "Power", "Connection" floating pills*

```css
.floating-label {
  background: rgba(19, 17, 16, 0.76);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 6px 14px;
  color: rgba(245, 242, 240, 0.92);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  pointer-events: none;
}

.floating-label .icon {
  width: 14px;
  height: 14px;
  opacity: 0.70;
}

/* Connector line (SVG absolute-positioned) */
.floating-connector {
  stroke: rgba(255, 255, 255, 0.25);
  stroke-width: 1;
  stroke-dasharray: 3 4;
  fill: none;
}
```

### 4.3 Glass Toggle Switch
*Reference: Living Room / Kitchen / Front Door toggles*

```css
.glass-toggle {
  width: 42px; height: 24px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255,255,255,0.20);
  position: relative;
  cursor: pointer;
  transition: background 0.25s ease;
}

.glass-toggle.active {
  background: #2DB363;
  border-color: rgba(45, 179, 99, 0.40);
}

.glass-toggle-thumb {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  position: absolute;
  top: 2px; left: 2px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glass-toggle.active .glass-toggle-thumb {
  transform: translateX(18px);
}
```

### 4.4 Circular Progress / Radial Timer
*Reference: "05:12 Remaining" radial indicator with orange ticks*

```css
/* SVG-based radial progress */
.radial-progress {
  --progress: 0.65; /* 0.0 → 1.0 */
  --radius: 52px;
  --stroke: 3px;
  --circumference: calc(2 * 3.14159 * var(--radius));
}

.radial-progress-track {
  stroke: rgba(235, 235, 235, 0.25);
  stroke-width: var(--stroke);
  fill: none;
}

.radial-progress-fill {
  stroke: #E8471C;
  stroke-width: var(--stroke);
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: var(--circumference);
  stroke-dashoffset: calc(var(--circumference) * (1 - var(--progress)));
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Tick marks (replicate reference's radial dashes) */
.radial-ticks {
  stroke: #E8471C;
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0;
}

.radial-ticks.active { opacity: 1; }
```

---

## 5. Layout & Spatial System

### 5.1 Grid System

```css
/* Base Grid */
--grid-columns: 12;
--grid-gutter:  clamp(16px, 2.5vw, 32px);
--grid-margin:  clamp(20px, 5vw, 80px);
--grid-max:     1440px;

/* Section Vertical Rhythm */
--section-gap-xl:   clamp(100px, 12vw, 160px);  /* Between major sections */
--section-gap-lg:   clamp(64px, 8vw, 100px);     /* Within section components */
--section-gap-md:   clamp(40px, 5vw, 64px);
--section-gap-sm:   clamp(24px, 3vw, 40px);
```

### 5.2 Spacing Scale

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
```

### 5.3 Border Radius Scale

```css
--radius-xs:    8px;    /* Input fields, small badges */
--radius-sm:    12px;   /* Inline tags, small buttons */
--radius-md:    16px;   /* Small cards, chips */
--radius-lg:    20px;   /* Image containers */
--radius-xl:    24px;   /* Product cards, standard panels */
--radius-2xl:   28px;   /* Large glass panels, hero panels */
--radius-3xl:   32px;   /* Modals, full-bleed sections */
--radius-pill:  999px;  /* Buttons, tags, toggles */
```

### 5.4 Shadow Elevation System

```css
/* Inspired by reference image's layered depth */

--shadow-0:  none;
--shadow-1:  0 1px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
--shadow-2:  0 2px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
--shadow-3:  0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05);
--shadow-4:  0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.07);
--shadow-5:  0 24px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10);

/* Accent glow shadows */
--shadow-accent:      0 0 24px rgba(232, 71, 28, 0.25), 0 4px 16px rgba(232,71,28,0.15);
--shadow-accent-lg:   0 0 48px rgba(232, 71, 28, 0.30), 0 8px 32px rgba(232,71,28,0.18);

/* Inner light (top edge highlight on glass) */
--inset-highlight:    inset 0 1px 0 rgba(255,255,255,0.55);
--inset-highlight-lg: inset 0 1px 0 rgba(255,255,255,0.75);
```

### 5.5 Reference-Inspired Layout Pattern

The reference image's right-sidebar + left-hero layout pattern maps to Pan Audio's **feature detail pages**:

```
┌─────────────────────────────────────────────────────────────┐
│ NAV: glass-nav sticky                                        │
├───────────────────────────────────┬─────────────────────────┤
│                                   │  PANEL 1: Light Glass   │
│  HERO CONTENT                     │  (Connected Devices)    │
│  ─ Product Image / Video          ├─────────────────────────┤
│  ─ H1 headline                    │  PANEL 2: Light Glass   │
│  ─ Floating labels (annotations)  │  (Room Control)         │
│  ─ Scroll CTA                     │                         │
├──────────────┬────────────────────┘                         │
│ DARK GLASS   │ LIGHT GLASS CARD                             │
│ (Stat/Callout)│ (Secondary Info)                             │
└──────────────┴──────────────────────────────────────────────┘
```

**Used for:** Individual Solution category pages, Product featured view, Project detail layout.

---

## 6. Animation & Motion System

### 6.1 Easing Curves

```css
/* Standard easing tokens */
--ease-out:         cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in-out:      cubic-bezier(0.45, 0.05, 0.55, 0.95);
--ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);    /* Overshoot spring */
--ease-smooth:      cubic-bezier(0.16, 1, 0.3, 1);         /* Expo out */
--ease-glass:       cubic-bezier(0.22, 1, 0.36, 1);        /* Glass panel entrance */
```

### 6.2 Duration Scale

```css
--duration-instant:  80ms;
--duration-fast:     150ms;
--duration-normal:   300ms;
--duration-slow:     500ms;
--duration-glass:    600ms;    /* Glass panel entrance duration */
--duration-page:     800ms;    /* Page-level transitions */
--duration-ambient:  2000ms;   /* Pulsing glows, ambient loops */
```

### 6.3 Standard Animation Presets

#### Glass Panel Entrance (Framer Motion)
*Directly derived from reference motion study*
```js
export const glassEntrance = {
  initial: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.60,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    filter: 'blur(6px)',
    transition: { duration: 0.25, ease: [0.45, 0.05, 0.55, 0.95] },
  },
};
```

#### Grid Card Stagger (Framer Motion)
```js
export const cardStaggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.10,
    },
  },
};

export const cardItem = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] },
  },
};
```

#### Counter Number Roll (GSAP)
```js
// For stats bar: "40+" count-up animation
gsap.from('.stat-number', {
  textContent: 0,
  duration: 1.8,
  ease: 'power2.out',
  snap: { textContent: 1 },
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.stats-bar',
    start: 'top 80%',
  },
});
```

#### Floating Label Entrance (GSAP)
```js
// Annotation labels animate in with path-draw + fade
gsap.timeline({ scrollTrigger: { trigger: '.product-hero', start: 'top 60%' }})
  .from('.floating-connector', { drawSVG: '0%', duration: 0.6, ease: 'power2.out', stagger: 0.2 })
  .from('.floating-label', {
    opacity: 0, scale: 0.85,
    duration: 0.4, ease: [0.34, 1.56, 0.64, 1], stagger: 0.15
  }, '-=0.3');
```

#### Timeline Line Draw (GSAP ScrollTrigger)
```js
// About page timeline
gsap.from('.timeline-line', {
  scaleY: 0,
  transformOrigin: 'top center',
  duration: 1.2,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 30%', scrub: 0.5 }
});

gsap.from('.timeline-milestone', {
  opacity: 0, x: -24,
  duration: 0.5, ease: [0.22, 1, 0.36, 1], stagger: 0.2,
  scrollTrigger: { trigger: '.timeline', start: 'top 70%' }
});
```

#### Hero Section Entrance Sequence
```js
// H1 word-by-word (split text)
const heroTl = gsap.timeline({ delay: 0.3 });
heroTl
  .from('.hero-eyebrow',   { opacity: 0, y: 14, duration: 0.4, ease: 'power2.out' })
  .from('.hero-h1 .word',  { opacity: 0, y: 32, duration: 0.55, ease: [0.22,1,0.36,1], stagger: 0.06 }, '-=0.1')
  .from('.hero-subtext',   { opacity: 0, y: 16, duration: 0.45, ease: 'power2.out' }, '-=0.2')
  .from('.hero-cta-group', { opacity: 0, y: 12, scale: 0.97, duration: 0.45, ease: [0.34,1.56,0.64,1] }, '-=0.1');
```

#### Accent Glow Pulse (CSS)
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 16px rgba(232, 71, 28, 0.20), var(--shadow-3); }
  50%       { box-shadow: 0 0 36px rgba(232, 71, 28, 0.40), var(--shadow-4); }
}

.btn-primary {
  animation: glow-pulse 2.5s ease-in-out infinite;
}
.btn-primary:hover {
  animation: none;
  box-shadow: var(--shadow-accent-lg);
}
```

#### Liquid Page Transition (Next.js + Framer)
```js
// Wrap each page in <motion.div>
const pageVariants = {
  initial: { opacity: 0, scale: 0.975, filter: 'blur(4px)' },
  animate: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0, scale: 1.015, filter: 'blur(3px)',
    transition: { duration: 0.28, ease: [0.45, 0.05, 0.55, 0.95] }
  }
};
```

### 6.4 Scroll Behaviour

```css
/* Smooth native scroll */
html { scroll-behavior: smooth; }

/* Parallax depth — background scrolls slower than foreground */
/* Implemented via GSAP ScrollTrigger scrub on video/bg layers */
/* Background: speed multiplier 0.40 */
/* Foreground content: speed multiplier 1.00 */
/* Glass cards: speed multiplier 0.85 (subtle float) */
```

### 6.5 Hover Micro-Interactions

```css
/* Card hover lift */
.glass-card {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              background var(--duration-normal) var(--ease-out);
  will-change: transform, box-shadow;
}

.glass-card:hover {
  transform: translateY(-6px) scale(1.005);
  box-shadow: var(--shadow-4), var(--inset-highlight-lg);
}

/* Partner logo hover (greyscale → colour) */
.partner-logo {
  filter: grayscale(1) opacity(0.55);
  transition: filter 0.35s var(--ease-out), transform 0.35s var(--ease-spring);
}
.partner-logo:hover {
  filter: grayscale(0) opacity(1);
  transform: scale(1.08);
}

/* Nav link hover */
.nav-link {
  position: relative;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 0; height: 1.5px;
  background: var(--color-accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.25s var(--ease-smooth);
}
.nav-link:hover { color: var(--color-text-primary); }
.nav-link:hover::after,
.nav-link.active::after { transform: scaleX(1); }
```

---

## 7. Page-by-Page Design Specs

### 7.1 Home Page

#### Hero Section
- **Viewport:** 100vh minimum, `min-height: 700px`
- **Background:** MP4/WebM looping video (muted, autoplay). CSS: `object-fit: cover; filter: blur(3px) brightness(0.72);`
- **Glass overlay panel:** Centred, `max-width: 680px`, `glass-hero-panel`, padded `48px 52px`
- **Eyebrow text:** `--text-label`, uppercase, `--color-accent`, letter-spacing `0.10em`
  - Text: `"SRI LANKA'S TECHNOLOGY INTEGRATION LEADER"`
- **H1:** `--text-display-xl`, Sora 700, `#F5F2F0` (light on dark background)
  - Text: `"Sound. Vision. Connection."`
  - Sub-line: `"Engineered for Excellence."` — same size, Sora 300 weight
- **Sub-copy:** `--text-body-lg`, `rgba(245,242,240,0.75)`, `max-width: 48ch`
- **CTA Row:** Gap `16px`
  - Primary: "Explore Solutions →" — `btn-primary` (`#E8471C`, pill, glow-pulse animation)
  - Secondary: "View Projects →" — `btn-ghost` (white border, white text, glass hover)
- **Scroll indicator:** Pan Audio orange chevron `↓`, `opacity: 0.55`, slow `translateY` bounce CSS animation

#### Stats Bar
- **Layout:** 4-column horizontal strip below hero, `padding: 40px var(--grid-margin)`
- **Container:** `glass-light` panel, full-width, no border-radius on sides if full bleed
- **Each stat:** `text-align: center`
  - Large number: `--text-display-lg`, Sora 700, `--color-text-primary`
  - Label: `--text-label`, uppercase, `--color-text-secondary`
- **Dividers:** `1px solid --color-border-soft` between stats

#### Solutions Teaser Grid
- **Title block:** Eyebrow (`"WHAT WE DO"`), H2 (`"Comprehensive Technology Solutions"`)
- **Grid:** `grid-template-columns: repeat(3, 1fr)` desktop, `repeat(2, 1fr)` tablet
- **Card:** `glass-light`, `border-radius: var(--radius-xl)`, `padding: 32px 28px`
  - Icon: SVG line-art, `32px`, `--color-accent`
  - Title: `--text-heading`, Sora 600
  - Body: `--text-body-sm`, `--color-text-secondary`, 2 lines
  - Link: `--text-label` with `→`, `--color-accent`
- **Hover:** Card lifts, icon glows with `--shadow-accent`

#### Testimonials Carousel
- **Background:** `#F7F7F5` section with subtle noise texture overlay (`opacity: 0.03`)
- **Card:** `glass-light`, `max-width: 620px`, centred
  - Opening quote `"`: `font-size: 80px`, `--color-accent`, `opacity: 0.25`, absolute-positioned top-left
  - Quote text: `--text-body-lg`, `--color-text-primary`, italic
  - Attribution: `--text-subheading`, `--color-text-secondary` | `--text-label` uppercase for org name
- **Navigation:** Two arrow buttons — `glass-light` circles, `40px` diameter, `--color-accent` arrow SVG

---

### 7.2 About Page

#### Founding Story Layout
- **Left column (60%):** Timeline component
- **Right column (40%):** Narrative text block, `glass-light` card, padded

**Timeline Component:**
```
  1984 ●────────────────── Founded; first 3M distributor in Sri Lanka
        │
  1985+ ●────────────────── Sole Imation distributor; HP Platinum Partner
        │
  2000s ●────────────────── IBM, Sony, EIKI, DSPPA partnerships
        │
  2016  ●────────────────── Turnkey project solutions expansion
        │
  Today ●────────────────── 40+ years legacy, pan-regional presence
```
- Vertical line: `2px solid var(--color-border-soft)`; on scroll → draws to `--color-accent`
- Milestone dot: `12px` circle, `border: 2px solid --color-accent`, bg white; on-enter → fills accent
- Year label: `--text-spec` (JetBrains Mono), `--color-accent`
- Milestone text: `--text-body`, `--color-text-primary`

#### Leader's Profile Module
```
┌──────────────────────────────────────────────────────┐
│  ┌─────────────────┐                                  │
│  │  Portrait Photo │   Mr. Sebastian Karunakaran      │  ← glass-light panel
│  │  (rounded 20px) │   Founder & Managing Director    │
│  │  aspect: 3/4    │                                  │
│  │                 │   [Bio paragraph, DM Sans 400]   │
│  └─────────────────┘                                  │
│  ↑ animated border glow in #E8471C on scroll-enter    │
└──────────────────────────────────────────────────────┘
```
- Portrait: `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-3)`
- Animated border: pseudo-element gradient border `#E8471C → transparent`, rotates in on scroll

#### Vision & Mission
- **Two equal glass panels** side by side
- Left panel (`glass-dark`): Vision — white text on warm near-black, accent `#E8471C` title
- Right panel (`glass-light`): Mission — dark text on frosted white, accent title
- Background behind both: subtle ambient gradient mesh `radial-gradient(at 30% 50%, rgba(232,71,28,0.06) 0%, transparent 60%)`

---

### 7.3 Solutions Page

#### Category Navigation (Sticky Pills)
```
[ All ] [ Audio Visual ] [ Video Conference ] [ Networking ] [ Security ] [ Data ] [ Power ]
```
- Container: `glass-nav` style, `position: sticky; top: 72px;` (below main nav)
- Active pill: `background: --color-accent; color: white; border-radius: --radius-pill`
- Inactive pill: `glass-light`, `--color-text-secondary`
- Transition: `background 0.25s ease, color 0.25s ease`

#### Solution Section Layout (per category)
*References the right-sidebar layout pattern from Smart Home Hub UI*

```
┌──────────────────────────────────────┬───────────────────────┐
│  Category Icon (64px line-art)        │  Product Card 1       │
│  H2: Category Name                    ├───────────────────────┤
│  Description paragraph                │  Product Card 2       │
│                                       ├───────────────────────┤
│  "View All Products →" CTA            │  Product Card 3       │
└──────────────────────────────────────┴───────────────────────┘
```

---

### 7.4 Products Page

#### Search Bar Design
- Full-width `glass-light` pill input, `height: 56px`, `border-radius: --radius-pill`
- Left icon: SVG search `🔍`, `--color-text-muted`
- Placeholder: `"Search products, brands, categories..."`, `--color-text-muted`
- On focus: border `1px solid --color-accent`, subtle `--shadow-accent` glow
- Real-time results counter: right-aligned `"148 products"`, `--text-label`

#### Product Card Design
*Reference: "Today's Power" and "Connected Devices" card patterns*
```
┌────────────────────────────────┐  ← glass-light, radius-xl
│  [Product Image — 16:10 ratio] │  ← object-fit: cover, radius-lg top
│         [Brand Badge]          │  ← top-right: glass-dark pill, brand name
├────────────────────────────────┤
│  Category Tag                  │  ← --text-label, --color-accent, uppercase
│  Product Name                  │  ← --text-heading, Sora 600
│  Short descriptor (2 lines)    │  ← --text-body-sm, --color-text-secondary
│                    View Details→│  ← --text-cta, --color-accent
└────────────────────────────────┘
```
- On hover: `translateY(-6px)`, `--shadow-4`, image zooms `scale(1.03)` (overflow hidden)

---

### 7.5 Projects Page

#### Project Detail Modal
*Reference: right-panel interaction pattern, scaled up*

```
┌──────────────────────────────────────────────────────────────────┐  ← glass-modal
│  ╳ close                                                  [SHARE] │
├──────────────────────────────────────────────────────────────────┤
│  [Hero Image Carousel — 16:9, radius-lg]                          │
├──────────────────────────────────────────────────────────────────┤
│  [Client Logo]   PROJECT NAME (H2, Sora)          [Category Badge]│
├────────────────────────────────┬─────────────────────────────────┤
│  Scope of Work                 │  Technologies Used (pills)       │
│  [DM Sans body text]           ├─────────────────────────────────┤
│                                │  ┌─────────────────────────────┐ │
│                                │  │ Spec Table (glass-dark mini) │ │
│                                │  │ Location: Colombo            │ │
│                                │  │ Year: 2023                   │ │
│                                │  │ Scale: Enterprise            │ │
│                                │  └─────────────────────────────┘ │
└────────────────────────────────┴─────────────────────────────────┘
```
- Modal entrance: `glassEntrance` motion variant, `scale: 0.92 → 1.0, blur: 12px → 0`
- Backdrop: `rgba(19,17,16,0.55)` with `backdrop-filter: blur(8px)`

---

### 7.6 Contact Page

#### Contact Card Layout
*Reference: side-by-side panel layout*

```
┌──────────────────────────┬──────────────────────────────────────┐
│  Company Info             │  Lead Form                            │
│  ─────────────────────── │  ─────────────────────────────────── │
│  📍 Address (DM Sans)     │  [Full Name input]                   │
│  📞 +94 71 161 65 64      │  [Phone + Country Code]              │
│  📧 info@panaudio.com     │  [Email]                             │
│  🕐 Mon–Fri 9am–5pm       │  [Country dropdown]                  │
│                           │  [Enquiry Type dropdown]             │
│  [Google Map Embed]       │  [Message textarea]                  │
│  (rounded 20px, square)   │  [Send Message → btn-primary]        │
└──────────────────────────┴──────────────────────────────────────┘
```

**Form Input Style:**
```css
.glass-input {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-sm);
  padding: 14px 18px;
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.glass-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(232, 71, 28, 0.12);
}
```

---

## 8. Component Design Specs

### 8.1 Navigation Bar

```
[Pan Audio Logo 48px] ──── Home | About | Solutions | Products | Projects | Services ──── [Get in Touch →]
```

| State | Background | Border | Shadow |
|---|---|---|---|
| At top of page (over hero) | `rgba(0,0,0,0)` transparent | none | none |
| Scrolled (≥80px) | `rgba(247,247,245,0.85)` | `1px solid rgba(235,235,235,0.60)` | `0 1px 24px rgba(0,0,0,0.05)` |
| Mobile open | Full-screen `rgba(247,247,245,0.96)` blur | — | — |

- Height: `72px` desktop, `60px` mobile
- Transition: `background 0.4s ease, border-color 0.4s ease`

### 8.2 Button System

```css
/* Primary CTA */
.btn-primary {
  background: var(--color-accent);
  color: #FFFFFF;
  font: 600 15px/1.2 var(--font-body);
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  display: inline-flex; align-items: center; gap: 8px;
  transition: transform var(--duration-fast) var(--ease-spring),
              background var(--duration-fast) ease,
              box-shadow var(--duration-normal) ease;
  animation: glow-pulse 2.5s ease-in-out infinite;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px) scale(1.02);
  animation: none;
  box-shadow: var(--shadow-accent-lg);
}
.btn-primary:active { transform: scale(0.98); }

/* Secondary (Glass) */
.btn-secondary {
  background: var(--glass-light-fill);
  backdrop-filter: blur(16px);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-soft);
  padding: 13px 28px;
  border-radius: var(--radius-pill);
  transition: background var(--duration-normal) ease,
              border-color var(--duration-normal) ease;
}
.btn-secondary:hover {
  background: var(--glass-light-fill-hover);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Ghost (Outlined) */
.btn-ghost {
  background: transparent;
  color: var(--color-accent);
  border: 1.5px solid var(--color-accent);
  padding: 12px 24px;
  border-radius: var(--radius-pill);
}
.btn-ghost:hover {
  background: rgba(232, 71, 28, 0.06);
  transform: translateY(-1px);
}
```

### 8.3 Category / Tag Badge

```css
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  font: 500 11px/1.40 var(--font-body);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge-accent    { background: rgba(232,71,28,0.10); color: var(--color-accent); }
.badge-neutral   { background: rgba(235,235,235,0.80); color: var(--color-text-secondary); }
.badge-dark      { background: rgba(19,17,16,0.80); color: rgba(245,242,240,0.85); }
.badge-success   { background: rgba(45,179,99,0.12); color: #1E8A4A; }
```

### 8.4 Section Eyebrow Pattern

```css
/* Reused across all section openers */
.section-eyebrow {
  font: 500 12px/1.40 var(--font-body);
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 10px;
}
/* Optional decorative line before eyebrow */
.section-eyebrow::before {
  content: '';
  width: 28px; height: 1.5px;
  background: var(--color-accent);
  flex-shrink: 0;
}
```

### 8.5 WhatsApp Floating Button

```css
.whatsapp-fab {
  position: fixed;
  bottom: 28px; right: 28px;
  width: 56px; height: 56px;
  border-radius: 50%;
  background: #25D366;
  box-shadow: 0 4px 24px rgba(37, 211, 102, 0.40), var(--shadow-3);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-spring),
              box-shadow var(--duration-normal) ease;
  animation: glow-pulse-green 3s ease-in-out infinite;
}
.whatsapp-fab:hover {
  transform: scale(1.12) translateY(-2px);
  box-shadow: 0 8px 40px rgba(37, 211, 102, 0.55), var(--shadow-4);
  animation: none;
}

@keyframes glow-pulse-green {
  0%, 100% { box-shadow: 0 4px 16px rgba(37,211,102,0.30), var(--shadow-2); }
  50%       { box-shadow: 0 4px 32px rgba(37,211,102,0.55), var(--shadow-3); }
}
```

---

## 9. Responsive Design System

### 9.1 Breakpoints

```css
/* Mobile-first breakpoints */
--bp-xs:   375px;    /* Small mobile */
--bp-sm:   480px;    /* Large mobile */
--bp-md:   768px;    /* Tablet portrait */
--bp-lg:   1024px;   /* Tablet landscape / small laptop */
--bp-xl:   1280px;   /* Desktop */
--bp-2xl:  1440px;   /* Large desktop */
--bp-3xl:  1920px;   /* Ultra-wide */
```

### 9.2 Glass Effect Degradation

| Environment | Behaviour |
|---|---|
| Chrome / Edge (modern) | Full `backdrop-filter: blur()` + `saturate()` |
| Safari (iOS/macOS) | `-webkit-backdrop-filter` prefix — full support |
| Firefox < 126 | `backdrop-filter` unsupported → fallback: `background: rgba(255,255,255,0.92)` |
| Low-end Android | `backdrop-filter` may cause frame drops → apply `@media (prefers-reduced-motion: reduce)` + disable blur |

```css
/* Firefox fallback */
@supports not (backdrop-filter: blur(1px)) {
  .glass-light  { background: rgba(255, 255, 255, 0.96); }
  .glass-dark   { background: rgba(19, 17, 16, 0.95); }
  .glass-nav    { background: rgba(247, 247, 245, 0.98); }
}
```

### 9.3 Mobile Navigation Pattern

- Hamburger (3 lines → X morph, CSS animation)
- Full-screen overlay: `glass-light` with `backdrop-filter: blur(40px)`, `border-radius: 0`
- Links: large, touch-friendly (`min-height: 52px`), staggered fade-up entrance
- Bottom CTA in mobile menu: full-width `btn-primary`

---

## 10. CSS Design Tokens

Complete token reference file (`tokens.css`):

```css
:root {
  /* ─── Colors ─────────────────────── */
  --color-bg-base:          #F7F7F5;
  --color-bg-pure:          #FFFFFF;
  --color-border-soft:      #EBEBEB;
  --color-accent:           #E8471C;
  --color-accent-hover:     #D43E18;
  --color-accent-glow:      rgba(232, 71, 28, 0.22);
  --color-dark-base:        #131110;
  --color-dark-surface:     #1E1A19;
  --color-text-primary:     #1C1A18;
  --color-text-secondary:   #6E6961;
  --color-text-muted:       #A8A09A;
  --color-text-on-dark:     #F5F2F0;
  --color-success:          #2DB363;

  /* ─── Glass Fills ────────────────── */
  --glass-light-fill:       rgba(255, 255, 255, 0.72);
  --glass-light-fill-hover: rgba(255, 255, 255, 0.85);
  --glass-dark-fill:        rgba(19, 17, 16, 0.82);
  --glass-neutral-fill:     rgba(247, 247, 245, 0.60);
  --glass-border-light:     rgba(255, 255, 255, 0.40);
  --glass-border-dark:      rgba(255, 255, 255, 0.08);

  /* ─── Typography ─────────────────── */
  --font-display: 'Sora', system-ui, sans-serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* ─── Radius ─────────────────────── */
  --radius-xs:   8px;
  --radius-sm:   12px;
  --radius-md:   16px;
  --radius-lg:   20px;
  --radius-xl:   24px;
  --radius-2xl:  28px;
  --radius-3xl:  32px;
  --radius-pill: 999px;

  /* ─── Shadows ────────────────────── */
  --shadow-1: 0 1px 4px rgba(0,0,0,0.04);
  --shadow-2: 0 2px 12px rgba(0,0,0,0.06);
  --shadow-3: 0 8px 32px rgba(0,0,0,0.08);
  --shadow-4: 0 16px 48px rgba(0,0,0,0.12);
  --shadow-5: 0 24px 80px rgba(0,0,0,0.18);
  --shadow-accent: 0 0 24px rgba(232,71,28,0.25);
  --shadow-accent-lg: 0 0 48px rgba(232,71,28,0.30);
  --inset-highlight: inset 0 1px 0 rgba(255,255,255,0.55);

  /* ─── Spacing ────────────────────── */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;

  /* ─── Transitions ────────────────── */
  --ease-out:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-glass:  cubic-bezier(0.22, 1, 0.36, 1);

  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   500ms;
  --duration-glass:  600ms;
}
```

---

## 11. Asset & Media Guidelines

### 11.1 Logo Usage
- **Provided asset:** `Pan_Audio_Logo.jpeg` (orange wordmark on white)
- **Website variants required:**
  - `logo-colour.svg` — orange on transparent (for white/light backgrounds)
  - `logo-white.svg` — all-white (for dark glass panels, footer, video overlays)
  - `logo-dark.svg` — dark charcoal (for print/PDF)
- **Minimum sizes:** Desktop nav: `height: 44px`. Mobile: `height: 36px`. Footer: `height: 40px`.
- **Clear space:** Minimum `1× logo height` clear space on all sides.

### 11.2 Video Background Spec

| Property | Spec |
|---|---|
| Format | MP4 (H.264) + WebM (VP9) — both served |
| Resolution | 1920×1080 minimum |
| Duration | 8–20 seconds, perfect loop |
| File size | < 8MB per video (target < 5MB) |
| Frame rate | 24fps (film-like, not 60fps) |
| Audio | None (muted attribute required) |
| CSS overlay | `filter: blur(3px) brightness(0.70)` |
| Fallback | Static JPG at `1920×1080`, WebP format |
| Content | Ambient b-roll — no text, no people's faces |

### 11.3 Product Image Spec

| Property | Spec |
|---|---|
| Format | WebP (primary), JPG fallback |
| Background | Pure white `#FFFFFF` or transparent PNG |
| Dimensions | Min `800×800px`, ideally `1200×1200px` |
| Aspect ratio | 1:1 for catalog grid, 16:10 for featured cards |
| File size | < 200KB per image (after optimisation) |
| Alt text | Required: `"[Brand] [Product Name] — [Category]"` |

### 11.4 Project Photo Spec

| Property | Spec |
|---|---|
| Format | WebP |
| Minimum width | `1400px` |
| Aspect ratio | `16:9` for hero/carousel, `4:3` for thumbnails |
| Content | Installed equipment in context, clean and professional |
| File size | < 400KB |

### 11.5 Icon System

- **Library:** Lucide Icons (stroke `1.5`, rounded caps/joins)
- **Custom icons:** SVG line-art at `32px` viewBox, exported from Figma at 1x/2x
- **Colours:** `currentColor` (inherits from parent) for easy theming
- **Hover state:** Scale `1.10`, colour transition to `--color-accent`

---

## Appendix A — Visual Hierarchy Summary

```
Priority 1 (Focal) ──── #E8471C Accent Orange
                         → CTA buttons, active states, annotation labels,
                           section eyebrows, counter numbers

Priority 2 (Primary) ── #1C1A18 Warm Charcoal
                         → H1, H2, H3 headings, card titles, nav links

Priority 3 (Support) ── #6E6961 Warm Mid-Grey
                         → Body copy, captions, form labels, metadata

Priority 4 (Muted) ──── #A8A09A Light Warm Grey
                         → Placeholder text, disabled states, dividers

Glass Surfaces ─────── White/Warm glass panels carry all content
                        Warm near-black glass for emphasis/dark callouts
```

---

## Appendix B — Reference Image → Pan Audio Design Mapping

| Reference UI Element | Pan Audio Application |
|---|---|
| Smart Home Hub product image (centre) | Hero product/service visual (per page) |
| "Lights / Power / Connection" floating labels | Product spec floating annotations |
| Device Battery dark card (bottom-left) | Stats bar dark glass callouts |
| Today's Power light card (bottom-right) | Secondary info panels |
| Connected Devices white panel (right) | Solution feature sidebar panels |
| Living Room control with radial timer | Project timeline / service progress module |
| Toggle switches (green active) | Filter toggles, feature on/off states |
| Blurred bokeh living room background | All hero section video backgrounds |
| Large outer rounded frame (24–32px) | Page max-width soft frame on 1440px+ screens |
| Orange CTA "Get the Product" pill | All `.btn-primary` elements site-wide |
| Navigation bar (glass, top) | Sticky glass navbar (scrolled state) |
| Connector lines to product | Floating annotation SVG lines on product heroes |

---

*Design System — Pan Audio Private Ltd*
*Derived from Smart Home Hub UI Reference (Liquid Glass Aesthetic)*
*Version 1.0 · March 2026*
*To be used in conjunction with `prd.md` v1.0*
