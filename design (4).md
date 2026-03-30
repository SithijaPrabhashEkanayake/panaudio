# Project Cards Redesign — Implementation Plan & Design Document

---

## 1. Overview

This document outlines the full implementation plan and design specification for redesigning the **Project Cards** component across four portfolio categories:

- Government & Education
- Corporate
- Healthcare & Government
- Specialised & Private

The redesign introduces a modern card layout with an interactive **click-to-expand project detail panel**, replacing the current static card presentation.

---

## 2. Goals

| Goal | Description |
|------|-------------|
| Visual Refresh | Modernise card aesthetics with consistent typography, spacing, and colour |
| Interactivity | Cards expand on click to reveal full project details |
| Category Consistency | Unified design language across all four category sections |
| Responsiveness | Layouts adapt seamlessly across desktop, tablet, and mobile |
| Accessibility | Keyboard navigable, screen-reader friendly, ARIA-labelled |

---

## 3. Design Specification

### 3.1 Card (Default / Collapsed State)

```
┌─────────────────────────────────┐
│  [Project Thumbnail / Image]    │
│─────────────────────────────────│
│  Category Tag       [Year]      │
│  Project Title                  │
│  Short description (2 lines)    │
│                                 │
│  [Client Logo]    → View More   │
└─────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Card Width | `320px` (desktop), `100%` (mobile) |
| Border Radius | `12px` |
| Box Shadow | `0 4px 16px rgba(0,0,0,0.08)` |
| Hover Shadow | `0 8px 32px rgba(0,0,0,0.16)` |
| Transition | `transform 0.25s ease, box-shadow 0.25s ease` |
| Hover Transform | `translateY(-4px)` |
| Background | `#FFFFFF` |
| Image Height | `220px`, `object-fit: cover` |

**Typography:**

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Category Tag | Inter | 11px | 600 | Brand Accent |
| Title | Inter | 18px | 700 | `#1A1A2E` |
| Description | Inter | 14px | 400 | `#64748B` |
| Year | Inter | 12px | 500 | `#94A3B8` |

---

### 3.2 Card (Expanded / Detail Panel State)

When a card is clicked, a **detail panel slides in** from the right (desktop) or expands below (mobile).

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back                                              [Close ✕]│
├───────────────────┬──────────────────────────────────────────┤
│                   │  Project Title                           │
│  [Hero Image]     │  Category  |  Year  |  Client           │
│                   │──────────────────────────────────────────│
│                   │  Overview                                │
│                   │  [Full project description text]         │
│                   │                                          │
│                   │  Key Highlights                          │
│                   │  • Highlight 1                           │
│                   │  • Highlight 2                           │
│                   │  • Highlight 3                           │
│                   │                                          │
│                   │  [Gallery thumbnails row]                │
│                   │                                          │
│                   │        [Visit Project ↗]                 │
└───────────────────┴──────────────────────────────────────────┘
```

**Detail Panel Specifications:**

| Property | Value |
|----------|-------|
| Trigger | `onClick` on any part of the card |
| Animation | Slide-in from right, `0.35s cubic-bezier(0.4, 0, 0.2, 1)` |
| Overlay | Semi-transparent backdrop `rgba(0,0,0,0.4)` |
| Panel Width | `60vw` (desktop), `100vw` (mobile) |
| Close Triggers | ✕ button, backdrop click, `Escape` key |
| Hero Image Height | `320px` |

---

### 3.3 Category Section Layout

Each of the four categories follows the same section structure:

```
[Category Heading]
[Subtitle / description]

[Card Grid — 3 columns desktop, 2 tablet, 1 mobile]
[Card] [Card] [Card]
[Card] [Card] [Card]
         ⋮
[Load More] (if > 6 projects)
```

**Category Colour Accents:**

| Category | Accent Color | Tag Background |
|----------|-------------|----------------|
| Government & Education | `#1E40AF` (Blue) | `#EFF6FF` |
| Corporate | `#065F46` (Green) | `#ECFDF5` |
| Healthcare & Government | `#7C3AED` (Purple) | `#F5F3FF` |
| Specialised & Private | `#B45309` (Amber) | `#FFFBEB` |

---

## 4. Component Architecture

```
ProjectsSection/
├── ProjectsSection.jsx          # Root wrapper, handles category tabs/sections
├── CategorySection.jsx          # Renders heading + card grid for one category
├── ProjectCard.jsx              # Individual card (collapsed state)
├── ProjectDetailPanel.jsx       # Slide-in detail overlay
├── ProjectGallery.jsx           # Image thumbnails inside detail panel
└── styles/
    ├── card.css
    ├── detail-panel.css
    └── category-section.css
```

### Data Model

```json
{
  "id": "proj-001",
  "title": "National Education Portal",
  "category": "Government & Education",
  "client": "Ministry of Education",
  "year": 2024,
  "tags": ["Web Platform", "UX Design"],
  "thumbnail": "/images/projects/edu-portal.jpg",
  "heroImage": "/images/projects/edu-portal-hero.jpg",
  "shortDescription": "A unified digital platform serving 2M+ students.",
  "overview": "Full project overview text...",
  "highlights": [
    "Reduced administrative overhead by 40%",
    "Deployed across 500+ institutions",
    "Accessible WCAG 2.1 AA compliant"
  ],
  "gallery": ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg"],
  "projectUrl": "https://example.com/project"
}
```

---

## 5. Implementation Plan

### Phase 1 — Setup & Foundation (Week 1)

| Task | Owner | Est. |
|------|-------|------|
| Audit existing project card components | Dev | 0.5d |
| Finalise data schema for all projects | Content + Dev | 1d |
| Set up design tokens (colours, spacing, typography) | Dev/Design | 0.5d |
| Build base `ProjectCard` component (static) | Dev | 1d |
| Build `CategorySection` layout component | Dev | 1d |

**Deliverable:** Static card grid rendered for all four categories.

---

### Phase 2 — Interactivity (Week 2)

| Task | Owner | Est. |
|------|-------|------|
| Build `ProjectDetailPanel` slide-in component | Dev | 1.5d |
| Implement backdrop, close triggers (✕, Escape, overlay) | Dev | 0.5d |
| Wire up card `onClick` → open panel with project data | Dev | 0.5d |
| Add panel open/close animations | Dev | 0.5d |
| Implement `ProjectGallery` image strip inside panel | Dev | 0.5d |

**Deliverable:** Fully interactive cards with working detail panels.

---

### Phase 3 — Responsiveness & Polish (Week 3)

| Task | Owner | Est. |
|------|-------|------|
| Mobile layout: single column cards + full-screen panel | Dev | 1d |
| Tablet layout: 2-column grid + side panel | Dev | 0.5d |
| Hover / focus states, micro-animations | Dev | 0.5d |
| Accessibility: ARIA roles, keyboard navigation, focus trap in panel | Dev | 1d |
| Loading states / skeleton screens for cards | Dev | 0.5d |

**Deliverable:** Responsive, accessible, polished implementation.

---

### Phase 4 — Content & QA (Week 4)

| Task | Owner | Est. |
|------|-------|------|
| Populate all project data (all 4 categories) | Content | 2d |
| Cross-browser testing (Chrome, Firefox, Safari, Edge) | QA | 1d |
| Device testing (iOS, Android) | QA | 0.5d |
| Performance audit (image optimisation, Lighthouse) | Dev | 0.5d |
| Stakeholder review & feedback | All | 0.5d |
| Final fixes and sign-off | Dev | 0.5d |

**Deliverable:** Production-ready, content-complete project section.

---

## 6. Interaction Behaviour

### Card Click Flow

```
User clicks card
      │
      ▼
Set activeProject = project data
      │
      ▼
Render <ProjectDetailPanel> with project data
      │
      ▼
Animate panel in (slide from right)
Animate backdrop in (fade)
Trap focus inside panel
      │
      ▼
User reads details / views gallery
      │
      ├── Clicks ✕ or backdrop or presses Escape
      │         │
      │         ▼
      │   Animate panel out → clear activeProject
      │
      └── Clicks [Visit Project ↗]
                │
                ▼
          Opens project URL in new tab
```

---

## 7. Accessibility Requirements

- All cards must be focusable via `Tab` key
- `Enter` / `Space` on a focused card opens the detail panel
- Detail panel must **trap focus** while open
- Focus returns to the originating card when panel closes
- Backdrop and ✕ button have descriptive `aria-label` attributes
- Images have meaningful `alt` text
- Category tags use `role="badge"` or equivalent
- Panel transitions respect `prefers-reduced-motion`

---

## 8. Performance Guidelines

| Concern | Solution |
|---------|----------|
| Large hero images | Use `next/image` or `loading="lazy"` with `srcset` |
| Gallery images | Lazy-load, only render when panel is open |
| Animation jank | Use `will-change: transform` on panel, GPU-composited properties only |
| Bundle size | Tree-shake unused icons; keep card component < 15KB |
| LCP optimisation | Preload above-fold card thumbnails |

---

## 9. Acceptance Criteria

- [ ] All four category sections render their respective project cards
- [ ] Each card displays: thumbnail, category tag, year, title, short description
- [ ] Clicking any card opens the detail panel with full project information
- [ ] Detail panel includes: hero image, title, client, year, overview, highlights, gallery, CTA button
- [ ] Panel closes via ✕ button, backdrop click, and Escape key
- [ ] Layout is fully responsive across 320px–1920px viewport widths
- [ ] Keyboard navigation works end-to-end without a mouse
- [ ] Lighthouse Accessibility score ≥ 95
- [ ] Lighthouse Performance score ≥ 85 on mobile

---

## 10. Open Questions / Dependencies

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Final project count per category? | Content Team | Pending |
| 2 | Are project URLs external links or internal case study pages? | PM | Pending |
| 3 | Should the gallery support video embeds? | Design | Pending |
| 4 | Is there a CMS driving project data, or static JSON? | Dev Lead | Pending |
| 5 | Are client logos available as SVGs? | Brand/Content | Pending |

---

*Document version: 1.0 | Created: March 2026*
