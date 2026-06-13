# Product Requirements Document

## Product Name
**GARGO HAIR STUDIO — Single-Page Landing Website**

---

## 1. Overview

### What we are building
A single-page, responsive landing website for **GARGO HAIR STUDIO**, a premium barbershop located in the Cuatro Caminos neighbourhood of A Coruña, Spain. The site functions as a digital storefront: it establishes brand credibility, showcases the studio’s work, communicates services and prices, and drives visitors to book an appointment via the existing Booksy profile.

### Why we are building it
- **Conversion:** Turn Instagram and word-of-mouth traffic into confirmed bookings.
- **Trust:** Highlight the 5.0-star Booksy rating and portfolio photography to reduce friction for new clients.
- **Local SEO:** Capture search intent for “barbería A Coruña”, “barbería Cuatro Caminos”, and “corte de pelo A Coruña”.
- **Brand:** Translate the industrial-minimalist interior aesthetic into a cohesive digital experience.

### What we are NOT building
- No online booking engine (redirect to Booksy).
- No contact form (phone/Instagram/address only).
- No multi-page architecture (single `index.html`).
- No blog, shop, or appointment management system.
- No Google Maps iframe (avoids third-party cookies, slow loads, and layout shift).

---

## 2. Brand Identity

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-black` | `#000000` | CTA backgrounds, primary text on light backgrounds, borders |
| `--color-charcoal` | `#1A1A1A` | Section backgrounds (portfolio, footer), deep text tones |
| `--color-off-white` | `#F7F7F5` | Primary page background, alternating section fill |
| `--color-white` | `#FFFFFF` | Card backgrounds, text on dark sections, nav background |
| `--color-text-primary` | `#111111` | Body text on light backgrounds |
| `--color-text-secondary` | `#6B6B6B` | Captions, durations, secondary labels |
| `--color-text-muted` | `#9A9A9A` | Footer text, subtle captions on dark backgrounds |
| `--color-divider` | `#E5E5E5` | Horizontal rules, table borders, card outlines |

### Typography
| Role | Font | Weights | Fallbacks |
|------|------|---------|-----------|
| **Display / Headings** | *Space Grotesk* | 500, 700 | `sans-serif` |
| **Body / UI** | *Inter* | 400, 500 | `sans-serif` |

- **H1** (hero, hidden semantic): `Space Grotesk` 700, 48px, letter-spacing `-0.02em`, line-height 1.1
- **H2** (section headings): `Space Grotesk` 700, 40px (desktop) / 28px (mobile), letter-spacing `-0.01em`, line-height 1.2
- **H3** (subsections, service names): `Space Grotesk` 500, 20px, line-height 1.3
- **Body**: `Inter` 400, 16px, line-height 1.6
- **Caption / Duration**: `Inter` 400, 14px, line-height 1.4
- **Nav links**: `Inter` 500, 14px, uppercase, letter-spacing `0.05em`
- **Price**: `Space Grotesk` 700, 24px, tabular-nums

### Mood & Visual Direction
- **Mood:** Masculine, sophisticated, urban, premium-but-approachable.
- **Visual Style:** Industrial-minimalist. Concrete textures, sharp geometry, high contrast, generous whitespace, no gradients, no drop shadows (except subtle text shadow on hero for accessibility).
- **Photography:** Full-bleed, desaturated, high-contrast. Portfolio images are displayed as square crops with 1:1 aspect ratio.
- **Iconography:** Thin-line geometric SVG icons (1.5px stroke, no fill), monochrome.
- **Shape Language:** Sharp corners (0–4px radius). CTA buttons: `border-radius: 2px`.

---

## 3. Sections — Exact Copy & Wireframe Descriptions

### Section: Navigation (Sticky)
**Wireframe:**
- Fixed to top, `z-index: 50`.
- Height: 64px (desktop), 56px (mobile).
- Background: `rgba(255,255,255,0.95)` with `backdrop-filter: blur(8px)`.
- **Left:** Logo mark (`logo.jpg` rendered at 40px height, maintaining aspect ratio). Click scrolls to top.
- **Center/Right:** Horizontal link list — `Servicios`, `Galería`, `Reseñas`, `Contacto`.
- **Far Right:** CTA button `Reservar cita` — black background, white text, `Inter` 500, 14px, uppercase, padding `12px 20px`.
- **Mobile:** Links collapse into a hamburger icon. Tapping opens a full-screen overlay (`#FFFFFF`, links centered vertically, `Space Grotesk` 500, 32px).

**Interactions:**
- Smooth-scroll (`scroll-behavior: smooth`) to corresponding section IDs on click.
- Active link highlighted with a 2px bottom border (`#000000`) when section is in viewport (optional, nice-to-have).

---

### Section: Hero
**Wireframe:**
- Full viewport height: `min-height: 100vh`, `max-height: 900px`.
- Background: `hero.jpg` (1152×768). `background-size: cover`, `background-position: center`, `background-repeat: no-repeat`.
- Dark overlay behind the baked-in text: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))` to ensure readability if the image is slightly washed out.
- **Content:** The text “GARGO — INVEST IN YOURSELF” is already baked into the image asset.
- **Accessibility layer:** An absolutely positioned, visually hidden (`clip` technique or `sr-only`) block containing:
  - `<h1>GARGO HAIR STUDIO</h1>`
  - `<p>INVEST IN YOURSELF</p>`
- **Bottom:** A subtle scroll-down indicator (thin downward arrow, `Inter` 12px, uppercase, “Descubre” or simple arrow icon) centered at `bottom: 24px`.

**Asset notes:**
- `hero.jpg` is 1152×768. It will be upscaled on wide screens. To mitigate quality loss, use `image-rendering: auto` and `background-size: cover`. For screens > 1200px, consider centering the image and letting the edges crop gracefully.
- `hero_640.jpg` is available for mobile media queries if needed, but the primary asset is `hero.jpg`.

---

### Section: Philosophy (About)
**Background:** `#F7F7F5`
**Padding:** 120px top / 120px bottom (desktop); 80px top / 80px bottom (mobile).
**Layout:** Single column, centered. Max-width 640px for text.

**Copy:**
- **H2:** `Más que un corte`
- **Body:**
  ```
  En GARGO HAIR STUDIO no creemos en cortes genéricos. Analizamos la forma 
  de tu rostro para crear un estilo que potencie tus rasgos. Trabajamos 
  con la técnica del visajismo para lograr una imagen única y 
  equilibrada entre tu cabello y tu barba. Cada servicio es de autor: 
  hecho a mano, pensado para ti.
  ```

**Below text — Three-column USP grid (desktop), single column (mobile):**
Each item has a 48×48px line-icon (SVG) above, a heading in `Space Grotesk` 500, and a caption in `Inter` 14px `#6B6B6B`.

1. Icon: Face outline / mirror icon
   - **Heading:** `Visajismo`
   - **Caption:** `Análisis de la forma facial antes de cada corte.`
2. Icon: Scissors / line-art icon
   - **Heading:** `Servicio de autor`
   - **Caption:** `Cada trabajo es único y personalizado.`
3. Icon: Balance / harmony icon
   - **Heading:** `Harmonía total`
   - **Caption:** `Cabello y barba en perfecta sintonía.`

**Grid:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; max-width: 800px; margin-top: 64px;` (desktop).

---

### Section: Servicios (Services & Pricing)
**Background:** `#FFFFFF`
**Padding:** 120px top / 120px bottom (desktop); 80px / 80px (mobile).
**Layout:** Centered heading, then a vertical list/table. Max-width 720px, centered.

**Copy:**
- **H2:** `Servicios & Precios`
- **Subtitle:** `Sin sorpresas. Reserva tu cita y olvídate de esperar.` — `Inter` 18px, `#6B6B6B`, centered, margin-bottom 48px.

**Service rows:** Each row is a horizontal flex container, `padding: 24px 0`, border-bottom `1px solid #E5E5E5`.
- Left side:
  - Service name: `Space Grotesk` 500, 20px, `#111111`
  - Duration: `Inter` 400, 14px, `#6B6B6B`, margin-top 4px
- Right side:
  - Price: `Space Grotesk` 700, 24px, `#000000`, `tabular-nums`

**Rows:**
1. `Corte` — `40 min` — `€16`
2. `Corte y Barba` — `50 min` — `€24`
3. `Arreglo de Barba` — `20 min` — `€10`
4. `Corte Niños (hasta 10 años)` — `30 min` — `€15`
5. `Corte Pelo Largo` — `50 min` — `€20`

**CTA:** Below the list, centered, margin-top 48px.
- Button: `Reservar cita en Booksy`
- Style: `background: #000000; color: #FFFFFF; padding: 16px 32px; border-radius: 2px; font: Inter 500 14px uppercase; letter-spacing: 0.05em;`
- Hover: `background: #1A1A1A; transform: translateY(-1px); transition: all 0.2s ease;`
- Link: `https://booksy.com/es-es/153564_gargo-hair-studio_barberia_60813_a-coruna`

---

### Section: Galería (Portfolio)
**Background:** `#1A1A1A`
**Padding:** 120px top / 120px bottom (desktop); 80px / 80px (mobile).
**Layout:** Heading centered, then image grid.

**Copy:**
- **H2:** `Trabajos recientes` — color `#FFFFFF`
- **Subtitle:** `Cada cliente, un nuevo proyecto.` — `Inter` 400, 18px, `#9A9A9A`

**Grid:**
- `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;` (desktop)
- Tablet (`< 1024px`): `repeat(2, 1fr)`
- Mobile (`< 640px`): `repeat(1, 1fr)`
- Max-width: 1200px, centered.

**Images:**
| Slot | Asset | Dimensions | Alt text (Spanish) |
|------|-------|------------|-------------------|
| 1 | `portfolio1.jpg` | 1080×1080 | `Corte de cabello masculino en GARGO HAIR STUDIO` |
| 2 | `portfolio2.jpg` | 2160×2160 | `Estilo de barba y cabello en A Coruña` |
| 3 | `portfolio3.jpg` | 1770×1770 | `Trabajo de visajismo en GARGO HAIR STUDIO` |
| 4 | `portfolio4.jpg` | 1080×1080 | `Corte premium en Cuatro Caminos` |
| 5 | `portfolio5.jpg` | 915×915 | `Arreglo de barba profesional` |
| 6 | `portfolio6.jpg` | 1217×1217 | `Resultado final de corte y barba` |
| 7 | `color-fantasia.jpg` | 983×983 | `Servicio de color fantasía en GARGO HAIR STUDIO` |

**Image styling:**
- `aspect-ratio: 1 / 1; object-fit: cover;`
- Hover: `transform: scale(1.03); opacity: 0.9; transition: transform 0.3s ease, opacity 0.3s ease;`
- `loading="lazy"` on all images.
- Lightbox: **Out of scope for MVP** (images are static; nice-to-have for v2).

---

### Section: Reseñas (Reviews)
**Background:** `#F7F7F5`
**Padding:** 100px top / 100px bottom.
**Layout:** Centered column, max-width 480px.

**Copy:**
- **H2:** `Lo que dicen nuestros clientes`
- **Rating:** `5.0` displayed in `Space Grotesk` 700, 72px, `#000000`
- **Stars:** 5 filled SVG stars (`#000000`), 24px each, below the rating number.
- **Caption:** `56 reseñas en Booksy` — `Inter` 400, 16px, `#6B6B6B`
- **CTA:** `Ver reseñas en Booksy` — text-only link, underlined, `Inter` 500, 14px, `#000000`.
- Link: `https://booksy.com/es-es/153564_gargo-hair-studio_barberia_60813_a-coruna`

**Note:** Actual review quotes are **not available** in the research brief. This section is therefore a static rating block rather than a rotating carousel. If the client provides quotes later, they can replace the caption.

---

### Section: Contacto (Contact & Location)
**Background:** `#FFFFFF`
**Padding:** 120px top / 120px bottom.
**Layout:** Two-column grid (desktop), single column (mobile). `grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1000px;`.

**Left column — Text:**
- **H2:** `Encuéntranos`
- **Studio name:** `GARGO HAIR STUDIO` — `Space Grotesk` 500, 18px, uppercase, letter-spacing `0.05em`
- **Address:**
  ```
  Rúa Nicomedes Pastor Díaz 1
  15006 A Coruña
  Cuatro Caminos
  ```
  `Inter` 400, 16px, `#111111`, line-height 1.6.
- **Directions CTA:** `Cómo llegar` — black text button with arrow icon, links to `https://www.google.com/maps/search/?api=1&query=Rúa+Nicomedes+Pastor+Díaz+1,+15006+A+Coruña`
- **Social:** Instagram icon (SVG) + `@gargo_hair_studio` — links to `https://instagram.com/gargo_hair_studio`
- **Hours:** Not included in the research brief. Omit from MVP unless client provides.

**Right column — Map placeholder:**
- Do **not** embed a Google Maps iframe (performance, cookie, layout-shift concerns).
- Instead, use a static stylized image or a simple dark `#1A1A1A` block with a white pin icon and the address text repeated, centered.
- If a static map image is generated later, swap it in here.

---

### Section: Footer
**Background:** `#1A1A1A`
**Padding:** 48px top / 48px bottom.
**Layout:** Centered single column.

**Copy:**
- `© 2026 GARGO HAIR STUDIO. Todos los derechos reservados.` — `Inter` 400, 14px, `#9A9A9A`
- `Diseño web para barberías.` — optional, smaller caption.

**Links (out of scope for MVP content, but reserved space):**
- `Aviso legal` · `Política de privacidad` — `Inter` 400, 12px, `#9A9A9A`, underline on hover.

---

## 4. Technical Requirements

### Framework & Architecture
- **Architecture:** Static single-page website. One file: `index.html`.
- **Build tool:** None required. Vanilla HTML5, CSS3, and a small vanilla JS module for mobile menu toggling.
- **Alternative:** If the developer prefers a build step for asset optimization, use **Vite** with vanilla JS. No React/Next.js is necessary for this scope.
- **CSS:** Custom properties (CSS variables) in `:root` for the color palette. No CSS-in-JS. A single `styles.css` or embedded `<style>` block is acceptable.

### Responsive Approach
- **Strategy:** Mobile-first.
- **Breakpoints:**
  - `sm`: 640px (phone landscape)
  - `md`: 768px (tablet)
  - `lg`: 1024px (desktop)
  - `xl`: 1280px (large desktop)
- **Fluid typography:** Section headings can use `clamp()` for fluid scaling between mobile and desktop.
  - Example: `font-size: clamp(28px, 4vw, 40px);`

### Performance
- **Image optimization:**
  - Deliver WebP versions where possible (fallback to JPG via `<picture>`).
  - `loading="lazy"` on all portfolio images and below-the-fold assets.
  - `hero.jpg` should be the LCP (Largest Contentful Paint) image; preload it with `<link rel="preload" as="image" href="hero.jpg" type="image/jpeg">`.
- **Fonts:**
  - Load `Space Grotesk` and `Inter` from Google Fonts with `display=swap`.
  - Subset to Latin character set only.
- **Lighthouse targets:**
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 95

### SEO & Meta
- **Title:** `GARGO HAIR STUDIO | Barbería en Cuatro Caminos, A Coruña`
- **Description:** `Barbería premium en A Coruña. Visajismo, corte de autor y arreglo de barba. Reserva tu cita online. ★ 5.0 en Booksy.`
- **Canonical:** `https://www.gargohairstudio.com/` (placeholder; client to provide final domain).
- **Open Graph:**
  - `og:title` matches page title.
  - `og:description` matches meta description.
  - `og:image` uses `hero.jpg` (1200×630 crop recommended; if not available, use `logo.jpg`).
  - `og:type`: `website`
- **Favicon:** Export a 32×32 and 180×180 (Apple touch) icon from `logo.jpg`.
- **JSON-LD (Structured Data):** `LocalBusiness` schema including:
  - `@type`: `HairSalon` / `BarberShop`
  - `name`: `GARGO HAIR STUDIO`
  - `address` (PostalAddress)
  - `geo` (GeoCoordinates)
  - `telephone`: (client to provide, or omit if unavailable)
  - `priceRange`: `€€`
  - `aggregateRating` (`ratingValue`: `5.0`, `reviewCount`: `56`)
  - `url`: Booksy profile URL

### Accessibility
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h2>` hierarchy).
- `aria-label` on nav and menu toggle.
- Focus states visible for keyboard navigation (`outline: 2px solid #000000; outline-offset: 2px`).
- Skip-to-content link (hidden until focused).
- `alt` text on all images in Spanish.
- Color contrast ratios ≥ WCAG AA (4.5:1 for normal text, 3:1 for large text).

### Hosting & Deployment
- Target: Static host (Netlify, Vercel, Cloudflare Pages, or traditional web host).
- HTTPS required.
- Custom domain (client to procure / configure DNS).

---

## 5. MVP Scope

### Included (Must-Have)
1. Single `index.html` with all 8 sections described above.
2. Responsive layout (mobile, tablet, desktop).
3. Sticky navigation with smooth-scroll anchor links and mobile hamburger menu.
4. All provided image assets (`logo.jpg`, `hero.jpg`, `portfolio1.jpg`–`portfolio6.jpg`, `color-fantasia.jpg`) integrated and displayed.
5. Complete Spanish copy for headings, body text, CTAs, and alt text.
6. Booksy CTA buttons and links (Services and Reviews sections).
7. Instagram social link (Contact section).
8. Google Maps directions link (Contact section).
9. SEO meta tags, Open Graph tags, and JSON-LD structured data.
10. Accessibility compliance (semantic HTML, ARIA, focus states, alt text, skip link).
11. CSS custom properties for the color palette.
12. Hover and scroll transition states (mobile menu, nav links, service rows, portfolio images, CTAs).

### Out of Scope (Nice-to-Have / v2)
1. Online booking form or appointment widget (redirect to Booksy is sufficient).
2. Contact form / email capture.
3. Google Maps live iframe (static placeholder or link only).
4. Multi-language support (Galician/English toggle).
5. Blog or news section.
6. E-commerce (product sales).
7. Lightbox / modal for portfolio images.
8. Scroll-triggered animations (fade-in, parallax). MVP uses simple hover and layout transitions only.
9. Dark mode toggle.
10. Live chat widget.
11. CMS integration.
12. Opening hours table (omit until client provides official hours).
13. Actual testimonial quotes carousel (omit until client provides quotes).
14. Favicon generation beyond a simple PNG export (if time allows, include; if not, mark as v2).

---

## 6. Acceptance Criteria

- [ ] **Page loads in < 2 seconds** on simulated 3G (Lighthouse Performance ≥ 90).
- [ ] **100% responsive:** Layouts are readable and functional from 320px to 2560px viewport widths.
- [ ] **Hero image displays full-width** without visible distortion; `object-fit: cover` behavior is correct.
- [ ] **All 7 portfolio images** render correctly in the 3/2/1 column grid without layout shift.
- [ ] **All CTAs link correctly:** Booksy URL and Instagram URL are functional and use `target="_blank" rel="noopener noreferrer"` where appropriate.
- [ ] **Navigation smooth-scrolls** to each section and the mobile menu opens/closes without errors.
- [ ] **Zero console errors** in Chrome, Firefox, and Safari (latest 2 versions).
- [ ] **Valid HTML5:** Passes W3C validator with no errors.
- [ ] **Valid CSS3:** Passes W3C CSS validator with no errors.
- [ ] **WCAG AA contrast:** All text meets 4.5:1 ratio against its background (verified via browser dev tools or axe).
- [ ] **JSON-LD validates** in Google’s Rich Results Test (no critical errors).
- [ ] **Meta title ≤ 60 characters** and meta description ≤ 160 characters.
- [ ] **Skip-to-content link** is visible on keyboard focus and functional.
- [ ] **All images have `alt` text** in Spanish.
- [ ] **No external cookies** are set by the page on first load (no maps iframe, no tracking scripts unless explicitly added later).
- [ ] **Favicon** is present and renders in browser tab.

---

## 7. 7-Day Build Roadmap

| Day | Focus | Deliverable |
|-----|-------|-------------|
| **Day 1** | Setup & scaffold | Initialize project folder, create `index.html` skeleton, add CSS reset + custom properties, preload hero image. |
| **Day 2** | Nav + Hero | Build sticky nav (desktop + mobile hamburger), hero section with `hero.jpg` and semantic overlay, scroll indicator. |
| **Day 3** | Philosophy + Services | Build About/Philosophy section with USP grid. Build Services list with pricing and Booksy CTA. |
| **Day 4** | Portfolio + Reviews | Build dark portfolio grid with all 7 images, lazy loading, hover states. Build static reviews block with 5.0 stars. |
| **Day 5** | Contact + Footer + Polish | Build Contact two-column layout, map placeholder, social links, footer. Add hover animations and transitions. |
| **Day 6** | SEO + Accessibility + Performance | Add all meta tags, Open Graph, JSON-LD, favicon, skip link, focus states, `alt` text. Run Lighthouse, optimize images (WebP conversion). |
| **Day 7** | QA + Launch prep | Cross-browser testing (Chrome, Firefox, Safari), mobile testing, W3C validation, final link checks, deploy to static host. |

---

## Launch Checklist

- [ ] Domain registered / DNS pointed to host.
- [ ] SSL certificate active (HTTPS).
- [ ] Booksy profile URL confirmed and live.
- [ ] Instagram handle confirmed: `@gargo_hair_studio`.
- [ ] All 7 portfolio images are cleared for public use (client consent).
- [ ] `robots.txt` allows indexing.
- [ ] `sitemap.xml` submitted to Google Search Console.
- [ ] Google Search Console property verified.
- [ ] Favicon renders correctly on iOS Safari and Android Chrome.
- [ ] Social share preview (Facebook, WhatsApp, Twitter) renders correctly when pasting the URL.
- [ ] Client has reviewed the copy and confirmed all prices are current.
- [ ] Opening hours **omitted** (pending client data) — or updated if provided.

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| `hero.jpg` (1152×768) is low resolution for wide screens | Medium | Medium | Use `background-size: cover` with a dark background fallback; if the image looks pixelated on large monitors, request a higher-res asset from the client or apply a subtle dark overlay to mask compression. |
| Logo is JPG (no transparency) | Medium | Low | The logo is black/white. If the nav background is white, the JPG will work. If a dark background section ever needs the logo, use a CSS `filter: invert(1)` or generate an SVG version. |
| No official opening hours provided | High | Low | Omit hours from MVP. Link to Booksy where hours are displayed. Add to v2 roadmap. |
| No client review quotes | Medium | Low | Use a static rating block. If the client wants quotes later, replace the caption text. |
| Google Fonts blocked / slow in Spain | Low | Medium | Use `display=swap` and subset to Latin. If necessary, self-host the font files (download from Google Fonts and serve locally). |

---

## Next Step for Developer

1. Create the project folder: `mkdir gargo-studio-landing && cd gargo-studio-landing`.
2. Create `index.html` and add the semantic skeleton with all 8 section IDs (`#servicios`, `#galeria`, `#resenas`, `#contacto`, etc.).
3. Copy the provided image assets from `/opt/data/gargo-studio-landing/images/` into the project’s `assets/images/` folder.
4. Convert portfolio images to WebP (e.g., `cwebp` or `sharp` CLI) and implement `<picture>` fallbacks.
5. Implement the CSS custom properties from the Brand Identity section and the mobile-first grid layouts.
6. Write the JSON-LD structured data block and paste it into the `<head>`.
7. Deploy to a static host and run the Launch Checklist.

---

*End of PRD*
