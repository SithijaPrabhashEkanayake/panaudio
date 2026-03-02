# Product Requirements Document (PRD)
## Pan Audio Private Ltd — Premium Corporate Website
### Version 1.0 | Prepared for: Pan Audio Group of Companies (Pvt) Ltd

---

> **Design Philosophy:** *Liquid Glass* — A premium, high-fidelity aesthetic built on glassmorphism, soft translucency, fluid micro-animations, and a restrained colour palette. Every surface breathes. Every transition flows.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [User Personas](#2-user-personas)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [User Flow & Sitemap](#5-user-flow--sitemap)
6. [Technical Architecture](#6-technical-architecture)
7. [Admin Panel Specifications](#7-admin-panel-specifications)
8. [Design Guidelines](#8-design-guidelines)

---

## 1. Project Overview

### 1.1 Company Background

**Pan Audio Private Ltd** (Pan Audio Group of Companies Pvt Ltd) is a Sri Lanka–based technology leader established in **1984** by Mr. Sebastian Karunakaran. Beginning as the first 3M distributor in Sri Lanka and later the sole Imation distributor, Pan Audio grew to become the Platinum HP distributor and forged partnerships with IBM, Sony, EIKI, DSPPA, JBL, Logitech, Huawei, HSM, and PKLNS. In 2016 the company expanded into turnkey project-based solutions across government, corporate, education, healthcare, and defence sectors.

**Headquarters:** Nadaraja Building, 3-1/1, Station Road, Colombo 03, Sri Lanka
**Working Hours:** Monday – Friday, 09:00 – 17:00
**AV Solutions:** +94 71 161 65 64
**CCTV & Networking:** +94 77 63 62 744
**Email:** info@panaudio.com

### 1.2 Project Goal

Deliver a **premium, mobile-first corporate website** that:
- Establishes Pan Audio as the region's foremost AV & technology solutions integrator.
- Drives qualified B2B and B2G leads via an elegant, friction-free contact experience.
- Showcases the full product catalogue, project portfolio, and partner ecosystem.
- Reflects 40+ years of heritage while projecting a forward-looking, technology-native brand identity.

### 1.3 Brand Identity Summary

| Element | Value |
|---|---|
| Logo | Pan Audio Private Ltd (orange wordmark — provided asset) |
| Primary Color | `#FFFFFF` White |
| Background | `#F7F7F5` Off-White |
| Borders / Subtle Elements | `#EBEBEB` Soft Grey |
| Accent / CTA | `#E8471C` Pan Audio Orange |
| Aesthetic | Liquid Glass · Glassmorphism · Minimalist Premium |

### 1.4 Vision & Mission (to be featured on site)

- **Vision:** To push boundaries, pioneering through the constantly evolving world of technology to create seamless experiences for our clients.
- **Mission:** Bringing total synergy and fluidity within the spheres of technology and service to the region.

### 1.5 Success Metrics

| KPI | Target |
|---|---|
| Page Load Time (LCP) | < 2.5 s |
| Lead Form Submissions | 30% uplift MoM post-launch |
| Mobile Usability Score | ≥ 95 (Lighthouse) |
| Core Web Vitals | All Green |
| Bounce Rate | < 40% |
| Avg. Session Duration | > 3 min |

---

## 2. User Personas

### Persona 1 — Corporate Procurement Manager
- **Name:** Rajith Fernando, 42
- **Role:** Head of IT & Procurement, Mid-Large Enterprise (Colombo)
- **Goals:** Source reliable AV/networking vendor for office fit-out; needs proof of past projects and technical spec sheets.
- **Pain Points:** Can't easily compare product specs; hard to find reputable local integrators.
- **Behaviour:** Visits on desktop during work hours; skims project portfolio and downloads brochures; wants a quick WhatsApp contact.

### Persona 2 — Government/Public Sector Tender Officer
- **Name:** Ms. Chamari Perera, 38
- **Role:** Procurement Officer, Ministry / University
- **Goals:** Verify company credibility, past government projects, technical certifications, and brand partnerships before inviting tenders.
- **Pain Points:** Needs clear company profile; partner logos and project references critical.
- **Behaviour:** Desktop-heavy; references Partners page and Project Highlights; may request PDF profile.

### Persona 3 — Hospitality / Hotel Operations Director
- **Name:** Mr. Sanjay Mehta, 47
- **Role:** Operations Director, 5-star hotel chain
- **Goals:** End-to-end solution for AV, surveillance, and network infrastructure for hotel renovation.
- **Pain Points:** Wants a single vendor; needs evidence of hospitality sector experience.
- **Behaviour:** Mobile and desktop; responds to visual project galleries; contacts via WhatsApp for speed.

### Persona 4 — Healthcare IT Head
- **Name:** Dr. Priya Navaratnam, 45
- **Role:** Head of IT, Private Hospital Group
- **Goals:** PACS, health informatics, and network solutions compliant with hospital standards.
- **Pain Points:** Vendors often lack domain-specific healthcare experience.
- **Behaviour:** Desktop; reads detailed solutions pages; wants to book a technical consultation.

### Persona 5 — SME / Retail Business Owner
- **Name:** Kasun Wickramasinghe, 34
- **Role:** Owner, mid-size retail business
- **Goals:** POS networking, surveillance cameras, and basic AV for store fit-out.
- **Pain Points:** Finds enterprise sites overwhelming; wants clear product listings and pricing guidance.
- **Behaviour:** Mobile-first; fast decision-maker; responds to CTAs and WhatsApp triggers.

---

## 3. Functional Requirements

### 3.1 Global Elements

#### 3.1.1 Navigation Bar
- **Sticky glass navbar** — `backdrop-filter: blur(20px)`, background `rgba(255,255,255,0.7)`, border-bottom `1px solid rgba(235,235,235,0.5)`.
- Pan Audio logo (provided JPEG asset) — left-aligned, 48px height.
- Navigation links: Home | About | Solutions | Products | Projects | Services | Contact
- Active link underline in `#E8471C`.
- Mobile: Hamburger → full-screen glass overlay menu with staggered fade-in links.
- CTA button in nav: **"Get in Touch"** → anchor to Contact section. Style: `#E8471C` background, white text, 24px border-radius.

#### 3.1.2 Footer (End Banner — All Pages)
- Background: `#1A1A1A` dark charcoal with subtle orange horizontal rule at top.
- Pan Audio logo (light version).
- Contact info displayed prominently:
  - AV Solutions: +94 71 161 65 64
  - CCTV & Networking: +94 77 63 62 744
  - Email: info@panaudio.com
  - Address: Nadaraja Building, 3-1/1, Station Road, Colombo 03, Sri Lanka.
  - Working Hours: Monday – Friday, 9:00 AM – 5:00 PM
- Quick links: About | Solutions | Products | Projects | Services | Privacy Policy
- Partner logo strip (greyscale, hover → colour).
- WhatsApp floating button (bottom-right, `#25D366` green, persistent across all pages).

---

### 3.2 Home Page

#### 3.2.1 Hero Section
- **Full-viewport video background** — looping ambient reel showcasing AV installations, conference rooms, smart offices, and broadcast studios (client to provide video assets; placeholder: ambient tech loop).
- **Glass overlay panel** (centre-aligned, `backdrop-filter: blur(24px)`, `background: rgba(255,255,255,0.12)`, border `1px solid rgba(255,255,255,0.25)`, `border-radius: 28px`, soft box-shadow):
  - **Pre-heading tag:** "Sri Lanka's Technology Integration Leader"
  - **H1:** "Sound. Vision. Connection. — Engineered for Excellence."
  - **Sub-copy:** "40 years of delivering premium Audio-Visual, Networking, and Security solutions across Sri Lanka and the Subcontinent."
  - **CTA Row:** [ Explore Solutions → ] [ View Projects → ]
- Entry animation: H1 word-by-word fade-up, CTA buttons scale-in with spring easing (delay 800ms).
- Scroll indicator: animated chevron in `#E8471C`, `opacity: 0.7`.

#### 3.2.2 Stats Bar (below hero)
- Glass card strip with 4 counters (animated count-up on scroll):
  - **40+** Years of Excellence
  - **500+** Projects Delivered
  - **20+** Global Brand Partners
  - **10** Focus Industry Verticals
- Cards: `backdrop-filter: blur(16px)`, white/5% background, rounded 20px, subtle shadow.

#### 3.2.3 Solutions Teaser
- Section title: "What We Do"
- 6 glass cards in a responsive grid (3×2 desktop, 2×3 tablet, 1×6 mobile):
  1. Audio Visual Solutions
  2. Network Infrastructure
  3. Security & Surveillance
  4. Data Management
  5. Health Informatics
  6. Smart Systems
- Each card: frosted glass, solution icon (custom line-art), short descriptor, hover lift `translateY(-6px)` + glow.
- CTA link: "Explore All Solutions →"

#### 3.2.4 Featured Products Carousel
- Section title: "Featured Products"
- Horizontal scroll carousel — auto-advancing (4s interval), infinite loop.
- Featured brands: DSPPA, EIKI, JBL, Logitech, Huawei, Hikvision.
- Each slide: glass product card with product image, name, brand badge, "View Details →" link.

#### 3.2.5 Partner / Brand Logo Strip
- Section title: "Our Trusted Partners"
- Smooth infinite-scroll horizontal ticker: IBM · EIKI · DSPPA · Huawei · Logitech · HSM · JBL · PKLNS
- Logos displayed in greyscale; hover → brand colour transition.

#### 3.2.6 Project Highlights Teaser
- Section title: "Project Highlights"
- 3 featured project cards (glass, with thumbnail image, client name, category badge).
- CTA: "View All Projects →"

#### 3.2.7 Testimonials Carousel (Sliding)
- Section title: "What Our Clients Say"
- Sliding glass cards — auto-advance or manual navigation.
- Card structure: quote text, client name, designation, organisation logo.
- Design: large open-quote glyph in `#E8471C`, soft glass panel.

#### 3.2.8 Client Logo Strip
- Section title: "Our Clients"
- Sliding ticker: logos of key clients (CMC, SLBC, CPC, NIE, KDU, WNS, Abans Group, IDH Hospital, etc.)

---

### 3.3 About Page

#### 3.3.1 About Hero
- Section-specific looping video background (corporate/team/office footage).
- Glass overlay: "About Pan Audio" headline + founding tagline.

#### 3.3.2 Founding Story
- Split-layout: left — animated timeline infographic (1984 → 2016 → Today); right — rich narrative text.
- Timeline milestones:
  - **1984** — Founded by Mr. Sebastian Karunakaran; first 3M distributor in Sri Lanka.
  - **1985+** — Sole distributor for Imation; Platinum HP distributor.
  - **2000s** — Partnerships with IBM, Sony, EIKI, DSPPA; leading AV/IT distributor.
  - **2016** — Expansion into turnkey project solutions (AV, Networking, Communications).
  - **Today** — 40+ years legacy; Pan-regional presence.
- Animation: timeline line draws in on scroll; milestone cards pop in with stagger.

#### 3.3.3 Leader's Profile Module
- Glass card: high-resolution portrait image (right), bio text (left).
- **Mr. Sebastian Karunakaran** — Founder & Managing Director
- Animated border glow on card entry using `#E8471C`.

#### 3.3.4 Vision & Mission
- Two large glass panels side by side.
- **Vision:** "To push boundaries, pioneering through the constantly evolving world of technology to create seamless experiences for our clients."
- **Mission:** "Bringing total synergy and fluidity within the spheres of technology and service to the region."
- Animated background: liquid gradient morph using canvas/WebGL.

#### 3.3.5 Core Values
- Horizontal scroll card strip: Reliability · Service Excellence · Innovation · Trust · Partnership

---

### 3.4 Solutions Page

#### 3.4.1 Solutions Hero
- Full-width video hero (technology/infrastructure b-roll).
- Glass overlay: "Comprehensive Technology Solutions — Tailored for Every Sector."

#### 3.4.2 Category Navigation (Sticky Pills)
- Horizontal pill-tab bar (sticky below nav on scroll): All | Audio Visual | Networking | Security | Data | Healthcare | Smart Systems
- Active pill: `#E8471C` fill, white text. Inactive: glass pill, grey text.
- Smooth scroll-to-section on click.

#### 3.4.3 Solution Category Sections
Each category renders as a full-width section with:
- Section title + icon + short description paragraph.
- Nested product grid (glass cards, 3-column desktop).
- "View Products →" CTA linking to filtered Product Gallery.

**Categories and nested products:**

| Category | Products |
|---|---|
| **Audio Visual Solutions** | DSPPA PA Systems & Pipe Music, Digitally Steerable Speakers, Professional Speakers, Amplifiers, Pro Audio Mixers, Audio Processors, Audio Conferencing Systems, Auditorium Sound Systems, Line Array Speakers, Megaphone Solutions, EIKI Projectors (Entry/Boardroom/Laser/Short Throw), Interactive Smart Boards (65"–98"), Monitors (19"–34"), Smart TVs for Digital Signage, LED Walls, Projector Screens (Tripod/Manual/Motorised) |
| **Video Conferencing** | DSPPA Web Cameras, Logitech Video Conference (GROUP), Polycom, Yealink, Yealink All-in-One Panels |
| **Home Theatre** | JBL Subwoofers, Bookshelf Speakers, Floor-Standing Speakers, Electronics / Stereo Hi-Fi |
| **Networking** | Local Area Networks, Huawei Wi-Fi Access Points, Huawei Network Switches (PoE/Non-PoE/Managed/Core), Firewalls, Servers, Fiber Structured Cabling, Network Racks (Wall/Floor), Cable Trays & Trunking |
| **Security & Surveillance** | Hikvision Analog CCTV, Network Camera Systems, Wireless Camera Systems, Fire Alarm Systems (Entry/Industrial), Access Control (Fingerprint/Face+Biometric/Keycard), Video Door Phones, Automatic Gate Barriers |
| **Data Management** | Micro SD, CD/DVD, Pendrive, Hard Disk, Portable Hard Disk, Asustor NAS |
| **Power Solutions** | Line Interactive UPS, Online UPS, Power Backup, Solar Solutions |
| **Environmental Monitoring** | Cool Room Monitoring, Freezer Truck Monitoring with GPS, Centralised Industrial Monitoring |
| **Health Informatics** | PACS, Health Informatics Systems, Medical Networking, Databases |
| **Computers & Accessories** | Desktops, Laptops, Full range of AV/network accessories & cables |
| **AV & Network Accessories** | XLR/Speaker/RCA/HDMI/SDI/CAT6/Fiber cables, VGA/HDMI Switches & Splitters, Extenders, Fiber-to-UTP Converters, PoE Surge Protectors |

---

### 3.5 Products Page

#### 3.5.1 Products Hero
- Video background: product showroom aesthetic.
- Glass overlay: "Premium Products — World-Renowned Brands, Local Expertise."

#### 3.5.2 Search & Filter Bar
- **Real-time search input** — search by product name, brand, or category. Results filter dynamically (no page reload).
- **Filter pills:** All | DSPPA | EIKI | JBL | Logitech | Huawei | Hikvision | Yealink | Asustor | Vega | Redleef
- **Category dropdown:** Audio | Video | Conferencing | Networking | Security | Storage | Power | Accessories
- Sticky below page hero on scroll.

#### 3.5.3 Product Card Grid
- Responsive masonry/grid (4 col desktop, 2 col tablet, 1 col mobile).
- **Product Card (Glass):**
  - Product image (object-fit: cover, 16:10 ratio, rounded 20px top)
  - Brand logo badge (top-right overlay pill)
  - Product name (H3)
  - Category tag
  - Short descriptor (2 lines max)
  - CTA: "View Details →" — opens product modal
  - Hover: card lifts `translateY(-8px)`, soft orange glow shadow.

#### 3.5.4 Product Detail Modal
- Glass-themed full-screen or large centred modal.
- Content: product image carousel, full name, brand, category, detailed description, key specs list, related products strip.
- Close button: glass circle with × glyph.
- Entry/exit: scale + blur transition.

#### 3.5.5 Featured Brands Grid
- Section below product grid: "Our Product Brands"
- Brand logo grid with hover animation (greyscale → colour + name tooltip).
- Brands: IBM · EIKI · DSPPA · Huawei · Logitech · HSM · JBL · PKLNS · Hikvision · Yealink · Asustor · Vega · Redleef

---

### 3.6 Projects Page

#### 3.6.1 Projects Hero
- Video background: real installation footage or architectural b-roll.
- Glass overlay: "Our Work — Delivering Excellence Across Sri Lanka and Beyond."

#### 3.6.2 Project Category Filter
- Filter pill tabs: All | Government & Education | Corporate | Healthcare | Specialised & Private
- Animate grid re-layout on filter change (FLIP animation).

#### 3.6.3 Project Card Grid
- Glass project cards with:
  - Project thumbnail image
  - Project name
  - Category badge (colour-coded)
  - Client name
  - Brief scope (1 line)
  - "View Details →" trigger

**Known Projects to Feature:**

*Government & Education:*
- National Institute of Education (NIE) — AV & Networking Systems
- Kotelawala Defence University (KDU) — Advanced AV & Networking
- Panadura Divisional Secretariat — AV Systems
- University of Peradeniya — Smart Learning & Campus Connectivity
- University of Kelaniya — Smart Learning Environment
- University of Kilinochchi — Smart Campus
- University of Colombo — AV & Connectivity
- University of Ruhunu — Campus Networking
- University of Moratuwa — Digital & Multimedia Infrastructure
- SLIIT — Smart Campus Connectivity
- University of Vavuniya — Multimedia Upgrade
- University of Gampaha Wickramarachchi — Digital Infrastructure
- Methodist College — AV & PA Installation
- Visakha Vidyalaya — AV & PA Installation
- Ministry of Higher Education — High-Performance Systems
- Sri Lanka Broadcasting Corporation (SLBC)

*Corporate:*
- WNS — Integrated AV, IT & Safety
- Orion City — AV & Safety Solutions
- Abans Group — Operational & Communication Solutions
- Majestic City — AV & Network Solutions
- Bullers Lane Residencies — Safety & AV
- Five Holdings

*Healthcare & Government:*
- IDH Hospital — High-Performance Systems
- Colombo Municipal Council (CMC) — Secure & Scalable Technologies
- Ceylon Petroleum Corporation (CPC) Sapugaskanda
- Sirimavo Bandaranayake Specialized Children's Hospital

#### 3.6.4 Project Detail Modal
- **Glass-themed popup/modal:**
  - Hero image / image carousel at top
  - Project title + category badge
  - Client logo
  - Scope of work (narrative)
  - Technologies / brands used (pill tags)
  - Project specs table (location, scale, solutions delivered)
  - Results / outcome statement
  - Close: glass button, blur-out animation

#### 3.6.5 Client Success Stories / Testimonials
- Integrated within Projects page below the grid.
- Section title: "Client Success Stories"
- Rotating glass testimonial cards, auto-advance carousel.
- Include client name, designation, organisation, and quote.

---

### 3.7 Services Page

#### 3.7.1 Services Hero
- Video background: engineer installing equipment, fiber splicing, network rack work.
- Glass overlay: "Technical Services — End-to-End Support by Certified Experts."

#### 3.7.2 Service Category Cards
Full-width section with glass cards for each service:

| Service | Description |
|---|---|
| **Fiber Splicing** | Professional optical fiber joining for minimal loss, high reliability in telecom, data centers, and long-distance networks. |
| **UTP Fluke Testing** | Certified cable testing with Fluke equipment to verify connectivity, quality, and performance. |
| **Fiber Fluke Testing** | Professional fiber optic cable testing ensuring reliable, high-speed network performance. |
| **AV & Projector Maintenance** | Cleaning, calibration, and repair of projectors and multimedia equipment for extended lifespan. |
| **UPS Repair & Servicing** | Inspection, troubleshooting, and repair of UPS systems for continuous backup power. |
| **Industrial Machine Calibration** | Precision calibration services ensuring accuracy and compliance for industrial equipment. |
| **AutoCAD ELV & AV Drawings** | Professional 2D/3D technical drawings for AV, ELV, electrical, and civil projects. |
| **On-Site Technical Assistance** | Licensed, brand-endorsed teams providing remote and on-site support for all installed systems. |
| **System Design & Installation** | Turnkey project delivery: design, supply, installation, testing, commissioning, and maintenance. |

#### 3.7.3 Service Process Timeline
- Animated horizontal timeline: **Consultation → Design → Supply → Installation → Testing & Commissioning → Ongoing Maintenance**
- Each phase: icon + title + 1-line descriptor.
- Progress line draws in on scroll.

#### 3.7.4 Service CTA
- Glass panel: "Need Technical Support?"
- Two CTA buttons: [ Request Service → ] [ WhatsApp Us → ]

---

### 3.8 Contact Page

#### 3.8.1 Contact Hero
- Minimal glass overlay on gradient background.
- "Get in Touch — We're Here to Help."

#### 3.8.2 Contact Layout (Two Column)
**Left Column — Company Info:**
- Address: Nadaraja Building, 3-1/1, Station Road, Colombo 03, Sri Lanka.
- AV Solutions: +94 71 161 65 64
- CCTV & Networking: +94 77 63 62 744
- Email: info@panaudio.com
- Hours: Monday – Friday, 9:00 AM – 5:00 PM
- Embedded Google Map (square, `border-radius: 20px`, right side)
- WhatsApp direct link button

**Right Column — Lead Capture Form:**
- Glass form card.
- Fields:
  - Full Name (required)
  - Contact Number (country code + number, required)
  - Email Address (required)
  - Country (dropdown, required)
  - Enquiry Type (dropdown: AV Solutions / Networking / CCTV / Projects / Services / Other)
  - Message (textarea, required)
- Submit CTA: "Send Message →" (`#E8471C`, full-width, 24px radius)
- Success state: animated glass confirmation card — "Thank you! We have received your query. We will get in touch with you as soon as we can."
- Form validation: inline, real-time.

#### 3.8.3 WhatsApp Bot Integration
- Floating WhatsApp button (persistent, bottom-right).
- On click: opens WhatsApp with pre-filled message: "Hello Pan Audio, I'd like to enquire about [your service]."
- WhatsApp number to be configured by admin.

#### 3.8.4 Direct Email Facility
- "Email Us Directly" button: `mailto:info@panaudio.com`

---

## 4. Non-Functional Requirements

### 4.1 Performance
- **Largest Contentful Paint (LCP):** < 2.5 s (target < 1.8 s)
- **First Input Delay (FID):** < 100 ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total Page Weight (initial load):** < 1.5 MB (with lazy loading)
- Video backgrounds: served as optimised WebM/MP4, lazy-loaded, paused off-screen.
- Images: Next.js `<Image />` with automatic WebP conversion, responsive srcset.
- Fonts: system-ui / Inter via `next/font`; subset to Latin + Sinhala (if needed).
- Glass effects: GPU-accelerated `backdrop-filter` with `will-change: transform` on animated elements.

### 4.2 Animation Standards
- **Library:** Framer Motion (React) + GSAP ScrollTrigger for scroll-driven sequences.
- All animations must respect `prefers-reduced-motion` media query — fallback to instant transitions.
- Target 60fps on all animations; no jank on mid-range Android devices.
- Easing standard: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out-quad) for entrances; `spring` for interactive micro-animations.
- Glass panels: entrance via `opacity: 0 → 1` + `blur(8px) → blur(0)` + `translateY(20px) → 0`.

### 4.3 SEO
- Server-Side Rendering (SSR) via Next.js for all key pages.
- Schema.org structured data: `Organization`, `LocalBusiness`, `Product`, `Service`.
- Open Graph + Twitter Card meta tags on all pages.
- Sitemap.xml and robots.txt auto-generated.
- Canonical URLs enforced.
- All images with descriptive `alt` text.
- Page titles and meta descriptions per page.

### 4.4 Accessibility
- WCAG 2.1 AA compliance.
- Keyboard navigability for all interactive elements.
- ARIA labels on icons and interactive components.
- Sufficient colour contrast (glass effects tested against WCAG contrast requirements).
- Focus-visible styles in `#E8471C`.

### 4.5 Security
- HTTPS enforced (SSL/TLS via host or Cloudflare).
- Contact form: server-side validation + rate limiting + honeypot field.
- Admin panel: JWT authentication with refresh tokens.
- Environment variables for all secrets (never client-side exposed).
- CORS policy configured on API routes.

### 4.6 Responsiveness
- Mobile-first design.
- Breakpoints: 375px (mobile) · 768px (tablet) · 1024px (laptop) · 1440px (desktop) · 1920px (large desktop).
- Glass effects gracefully degrade on unsupported browsers (Safari `backdrop-filter` prefix; Firefox fallback to semi-opaque white).

---

## 5. User Flow & Sitemap

### 5.1 Sitemap

```
panaudio.com/
├── / (Home)
│   ├── Hero
│   ├── Stats
│   ├── Solutions Teaser
│   ├── Featured Products
│   ├── Partner Strip
│   ├── Project Highlights Teaser
│   ├── Testimonials
│   └── Client Logo Strip
├── /about
│   ├── Founding Story & Timeline
│   ├── Leader's Profile
│   └── Vision & Mission
├── /solutions
│   ├── Audio Visual Solutions
│   ├── Video Conferencing
│   ├── Home Theatre
│   ├── Networking
│   ├── Security & Surveillance
│   ├── Data Management
│   ├── Power Solutions
│   ├── Environmental Monitoring
│   ├── Health Informatics
│   ├── Computers
│   └── AV & Network Accessories
├── /products
│   ├── [Searchable, filterable product catalog]
│   └── /products/[slug] (Product Detail — via modal or page)
├── /projects
│   ├── [Filterable project portfolio]
│   └── Project Detail Modals
├── /services
│   └── [Service cards + process timeline]
├── /contact
└── /admin (protected)
    ├── /admin/dashboard
    ├── /admin/products
    ├── /admin/products/new
    ├── /admin/products/[id]/edit
    ├── /admin/projects
    ├── /admin/projects/new
    ├── /admin/projects/[id]/edit
    ├── /admin/testimonials
    └── /admin/media
```

### 5.2 Primary User Flows

**Flow A — B2B Lead (Corporate Buyer):**
Home → Solutions → Category Page → Product Detail → Contact Form / WhatsApp

**Flow B — Project Reference Check (Procurement / Tender):**
Home → Projects → Filter by Category → Project Detail Modal → Contact

**Flow C — Product Discovery (Retail/SME):**
Home → Products → Search/Filter → Product Card → Product Modal → Contact / WhatsApp

**Flow D — Service Request:**
Home → Services → Service Detail → "Request Service" CTA → Contact Form

**Flow E — Company Credibility Check:**
Home → About → Founding Story → Partners → Projects

---

## 6. Technical Architecture

### 6.1 Recommended Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR/SSG, SEO-optimised, image optimisation |
| **UI Language** | TypeScript | Type safety, maintainability |
| **Styling** | Tailwind CSS v3 | Utility-first, rapid glass effect utilities |
| **Animations** | Framer Motion + GSAP | Liquid glass transitions, scroll-driven sequences |
| **3D / WebGL** | Three.js (optional) | Ambient liquid background effects on hero |
| **CMS / Database** | Sanity.io or Strapi (headless) | Admin panel, product/project CRUD |
| **Database** | PostgreSQL (via Supabase) or MongoDB Atlas | Flexible schema for products & projects |
| **Auth (Admin)** | NextAuth.js | JWT sessions, secure admin login |
| **File Storage** | Cloudinary or AWS S3 | Product images, project photos, video assets |
| **Forms** | React Hook Form + Zod | Validation, type-safe schemas |
| **Email** | Resend or SendGrid | Lead notification emails |
| **Hosting** | Vercel | Zero-config Next.js, CDN edge network |
| **CDN** | Cloudflare | DDoS protection, asset caching, SSL |
| **Analytics** | Google Analytics 4 + Vercel Analytics | Traffic and conversion tracking |
| **Maps** | Google Maps Embed API | Contact page location |

### 6.2 Architecture Diagram (Conceptual)

```
[Browser / Client]
        │
        ▼
[Vercel Edge CDN]
        │
        ▼
[Next.js App (App Router)]
  ├── Page Components (RSC + Client)
  ├── API Routes (/api/*)
  │     ├── /api/contact        → Email via Resend
  │     ├── /api/products       → CRUD (auth-protected)
  │     └── /api/projects       → CRUD (auth-protected)
  └── Admin Section (/admin/*)
        │
        ▼
[Headless CMS / Database]        [Cloudinary / S3]
  (Sanity.io or Supabase)           (Media Assets)
```

### 6.3 Key Technical Decisions

**Glass Effect Implementation:**
```css
/* Glass Panel Base Class */
.glass-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(235, 235, 235, 0.25);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 
              inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
```

**Animation Entry Pattern (Framer Motion):**
```jsx
const glassEntrance = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}
```

---

## 7. Admin Panel Specifications

### 7.1 Overview
A secure, internal-only dashboard at `/admin` for Pan Audio staff to manage website content without developer involvement.

### 7.2 Authentication
- Login screen: glass card on gradient background.
- Credentials: email + password (bcrypt hashed).
- JWT session (1-day expiry, refresh token 30 days).
- Brute-force protection: rate limiting (5 attempts → 15-min lockout).
- Role: `super_admin` (full access). Future: `content_editor` (products/projects only).

### 7.3 Dashboard Home
- KPI widgets (glass cards): Total Products | Total Projects | Recent Enquiries (from contact form) | Media Storage Used.
- Recent activity log.

### 7.4 Product Management (CRUD)

**Product List View:**
- Data table: Name | Brand | Category | Status (Published/Draft) | Last Updated | Actions
- Bulk actions: Publish | Unpublish | Delete
- Search + category filter

**Create / Edit Product Form:**
- Product Name (text, required)
- Brand (dropdown: DSPPA / EIKI / JBL / Logitech / Huawei / Hikvision / Yealink / Asustor / Vega / Redleef / Other)
- Category (dropdown — full list)
- Short Description (textarea, 150 chars max)
- Full Description (rich text editor — TipTap)
- Specifications (key-value pair builder)
- Images (multi-upload via Cloudinary; drag-to-reorder; primary image selector)
- Status toggle: Published / Draft
- Featured toggle (appears on homepage carousel)
- Save Draft | Publish buttons

**Delete:** Confirmation modal, soft delete (archives, not permanent).

### 7.5 Project Management (CRUD)

**Project List View:**
- Table: Project Name | Client | Category | Status | Actions

**Create / Edit Project Form:**
- Project Name (required)
- Client Name (required)
- Client Logo Upload
- Category (Government & Education / Corporate / Healthcare / Specialised & Private)
- Scope Description (rich text)
- Technologies Used (tag input)
- Images (multi-upload, drag-to-reorder)
- Testimonial (optional: quote + author + designation)
- Status: Published / Draft
- Featured: toggle (appears on homepage teaser)

### 7.6 Testimonials Management
- List view with quote text, client name, status.
- Create / Edit / Delete / Toggle visibility.

### 7.7 Media Library
- Grid view of all uploaded images/videos.
- Upload new media, rename, delete.
- Copy URL to clipboard.
- Filter by type (image/video) and date.

### 7.8 Enquiry Inbox
- View contact form submissions.
- Fields displayed: Name, Email, Phone, Country, Enquiry Type, Message, Date.
- Mark as Read / Unread, Archive.
- Export to CSV.

### 7.9 Admin UI Design
- Consistent glass aesthetic (lighter glass, neutral greys, `#E8471C` accents for CTAs).
- Sidebar navigation (collapsible on mobile).
- Toast notifications for save/error states.

---

## 8. Design Guidelines

### 8.1 Colour Palette

| Role | Hex | Usage |
|---|---|---|
| Primary White | `#FFFFFF` | Glass panel fills, text on dark |
| Off-White Background | `#F7F7F5` | Page background colour |
| Soft Grey | `#EBEBEB` | Borders, dividers, subtle elements |
| Accent Orange | `#E8471C` | CTAs, active states, highlights, icons |
| Deep Charcoal | `#1A1A1A` | Footer, dark section backgrounds |
| Text Primary | `#1C1C1E` | Body copy on light backgrounds |
| Text Secondary | `#6E6E73` | Captions, meta-text |
| Glass White | `rgba(255,255,255,0.08)` | Dark-background glass panels |
| Glass Light | `rgba(255,255,255,0.65)` | Light-background glass panels |

### 8.2 Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / H1 | Inter or Sora | 700 (Bold) | 64px / 72px |
| H2 Section Title | Inter | 600 (SemiBold) | 40px / 48px |
| H3 Card Title | Inter | 600 | 22px / 24px |
| Body | Inter | 400 | 16px / 18px |
| Caption / Tag | Inter | 500 | 12px / 13px |
| CTA Button | Inter | 600 | 15px |
- Line height: 1.5 for body, 1.2 for display.
- Letter spacing: -0.02em for H1/H2 (tight, premium feel).
- No font should feel heavy or bold beyond 700 weight.

### 8.3 Glassmorphism Rules

**Do:**
- Apply `backdrop-filter: blur()` values between **12px–28px** depending on depth layer.
- Use `border: 1px solid rgba(255,255,255,0.2–0.4)` for glass edge highlight.
- Add `inset 0 1px 0 rgba(255,255,255,0.5)` inner top border for light-catch effect.
- Use soft `box-shadow: 0 8px 32px rgba(0,0,0,0.06–0.12)` for depth.
- Nest glass layers (e.g., a glass modal over a glass background section) — differentiate with opacity values.

**Don't:**
- Apply glass effects to body text backgrounds (legibility issue).
- Use glass with heavily patterned or high-frequency backgrounds — it will look noisy.
- Apply `backdrop-filter` to elements that don't need depth (performance cost).
- Use more than 3 layered glass depths on one screen.

### 8.4 Border Radius Scale

| Component | Radius |
|---|---|
| Glass cards (large) | 28px |
| Product / project cards | 24px |
| Input fields | 14px |
| CTA buttons | 24px (pill) |
| Image containers | 20px |
| Tag / badge pills | 999px (fully rounded) |
| Modals | 32px |

### 8.5 Shadow Scale

| Level | CSS Value |
|---|---|
| Subtle (card resting) | `0 2px 12px rgba(0,0,0,0.05)` |
| Default (glass panels) | `0 8px 32px rgba(0,0,0,0.08)` |
| Elevated (hover, modal) | `0 20px 60px rgba(0,0,0,0.14)` |
| Glow (accent) | `0 0 24px rgba(232,71,28,0.25)` |

### 8.6 Animation Principles

1. **Purposeful:** Every animation communicates hierarchy or state, not decoration alone.
2. **Fluid:** Entrances ease-out; exits ease-in. Never linear.
3. **Staggered:** Grid card groups animate in with 60–80ms stagger per item.
4. **Scroll-driven:** Use Intersection Observer / GSAP ScrollTrigger for section reveals.
5. **Hover micro-interactions:** Cards lift `translateY(-6px)` + shadow elevates + subtle border glow.
6. **Liquid Glass Transition:** Page transitions use a frosted blur-scale effect (scale 0.97 → 1.0, opacity 0 → 1, blur 4px → 0).
7. **Reduced Motion:** All animations disabled / instant when `prefers-reduced-motion: reduce`.

### 8.7 Icon System
- Use **Lucide Icons** (consistent line style) or custom SVG line-art icons.
- Stroke weight: 1.5px for light glass surfaces, 2px for standalone icons.
- Colour: `#6E6E73` default, `#E8471C` on accent/active.

### 8.8 Button Styles

| Type | Style |
|---|---|
| **Primary CTA** | `bg: #E8471C`, white text, `border-radius: 24px`, `padding: 14px 32px`, hover: `brightness(1.1)` + scale(1.02) |
| **Secondary** | Glass, `border: 1px solid #E8471C`, `#E8471C` text, hover: fill orange |
| **Ghost** | No border, `#1C1C1E` text with `→` arrow, hover: text orange |
| **Icon Button** | Glass circle, icon centred, hover: glow |

### 8.9 Section Hero Video Mapping

| Page / Section | Suggested Video Theme |
|---|---|
| Home Hero | Montage: AV installs, conference rooms, smart offices, broadcast |
| About | Corporate team, office, product handling |
| Solutions | Mixed: networking racks, screens, cameras being installed |
| Products | Clean studio-style product b-roll, brand environments |
| Projects | Time-lapse of installation, finished project walkthroughs |
| Services | Technician hands-on: fiber splicing, cable testing, projector servicing |
| Contact | Aerial Colombo 03 / office exterior / team at work |

---

## Appendix A — Content Assets Required from Client

| Asset | Format | Priority |
|---|---|---|
| Pan Audio Logo (SVG preferred) | SVG / PNG (white + colour variants) | Critical |
| Leader Portrait Photo | JPEG, min 800×800px | High |
| Hero Video(s) per section | MP4 + WebM, ≤ 30s each, max 15MB | High |
| Project Photos (all projects) | JPEG/PNG, min 1200px wide | High |
| Product Images (all products) | PNG transparent or JPEG, min 800×800px | High |
| Client Logos | SVG / PNG transparent | Medium |
| Partner Logos | SVG / PNG transparent | Medium |
| Testimonials (quotes + names) | Text | Medium |

---

## Appendix B — Integrations Checklist

- [ ] Google Maps Embed (contact page)
- [ ] WhatsApp Business API link (floating button)
- [ ] Email delivery (Resend / SendGrid) for form submissions
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Cloudinary (media CDN)
- [ ] Uptime monitoring (e.g., Better Uptime)

---

*Document prepared for Pan Audio Private Ltd — Confidential*
*Version 1.0 | March 2026*
