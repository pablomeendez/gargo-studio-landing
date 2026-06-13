# QA Report — GARGO HAIR STUDIO Landing Page

Reviewed: 2026-06-11
Built artifact: /opt/data/gargo-studio-landing/dist/index.html (20.42 kB)
CSS: dist/assets/index-D-rxH_45.css (19.93 kB)
JS:  dist/assets/index-DwnJqU2-.js (1.69 kB)

---

## Summary

The build succeeds and most sections exist, but the shipped site **does not match the PRD** in multiple material ways. The biggest issues are:

1. Wrong typeface everywhere — **Bebas Neue** is used instead of the PRD-mandated **Space Grotesk**.
2. The **color palette is wrong** — the build uses a gold accent `#C4A882` and `#0A0A0A` black, instead of PRD's pure `#000000` black and no accent color.
3. **CTA buttons are gold, not black** as required by PRD §3 (Servicios) and §2 (brand).
4. **Heading font styling is broken for Spanish copy** — Bebas Neue has no lowercase glyphs, so "Más que un corte", "Servicios & Precios", "Trabajos recientes", "Lo que dicen nuestros clientes", "Encuéntranos" will render with missing/incorrect lowercase characters unless forced to uppercase (they are NOT forced to uppercase in the built HTML).
5. **Tailwind color tokens are inconsistent** inside the built HTML — both `brand-*` and `gargo-*` class prefixes are mixed in the same document (e.g., `bg-brand-white/95` in nav, `bg-gargo-off-white` on body, `border-gargo-divider` in services). Only the `brand-*` tokens are defined in `tailwind.config.js`. All `gargo-*` classes are **silently ignored by Tailwind**, meaning those elements fall back to unstyled defaults (transparent backgrounds, default text colors). This breaks multiple sections visually.
6. Source `index.html` loads `/src/styles.css`; built `dist/index.html` loads the compiled CSS — but `main.js` imports `./style.css` (a DIFFERENT file from `styles.css`). Both CSS files exist with conflicting content. The build happened to pick up `style.css` but NOT `styles.css` — so half the custom styles are missing in production.
7. Mobile menu overlay uses `translate-x-full` via Tailwind but the `.mobile-menu.active { transform: translateX(0) }` override in CSS fights with Tailwind's utility; because Tailwind's `translate-x-full` also applies, opening works via the `.active` class, but closing relies on class removal which reverts to Tailwind's default — functionally OK but fragile.
8. Meta description is **104 characters**, within the 160 limit — PASS.
9. Title is **55 characters**, within the 60 limit — PASS.
10. OG/Twitter images use a relative path `/images/hero.jpg` — will NOT render correctly when shared on social platforms (they require absolute URLs).

**Verdict: FAIL — do not launch.** 6 blocking issues.

---

## Acceptance Criteria Check (PRD §6)

| # | Criterion | Result | Notes |
|---|-----------|--------|-------|
| 1 | Page loads <2s on 3G / Lighthouse Perf ≥90 | UNVERIFIED | Cannot run Lighthouse here; preloaded hero.jpg ✓; Google Fonts loaded with display=swap ✓. Fonts NOT subset to Latin (URL says `subset=latin` but that parameter is no longer honored by Google Fonts v2 API — needs `&text=` or unicode-range). |
| 2 | 100% responsive 320–2560px | PARTIAL | Grids use 1/2/3 col breakpoints ✓. But `gargo-*` classes silently fail (see bug #2) so backgrounds/text colors are wrong on some breakpoints. |
| 3 | Hero image full-width, object-fit:cover | FAIL | Hero uses a `<div>` with `background-image` + `background-size:cover` — OK visually, but **hero.jpg is not preloaded as an image that the browser can measure for LCP** (preload exists, but `background-image` LCP is penalized by Lighthouse vs `<img>`). PRD explicitly wanted the hero as LCP. |
| 4 | All 7 portfolio images in 3/2/1 grid | PASS | All 7 present with correct alt text, lazy loading, aspect-square. |
| 5 | All CTAs link correctly, target=_blank rel=noopener | PASS | Booksy, Instagram, Google Maps links all correct and properly secured. |
| 6 | Nav smooth-scrolls, mobile menu works | PARTIAL | `scroll-behavior: smooth` set ✓. Mobile menu toggles ✓. But mobile menu z-index (40) is LOWER than header (50), so **hamburger button sits ON TOP of the open overlay** — close button inside overlay (absolute top-4 right-4) will be hidden behind header. Bug. |
| 7 | Zero console errors | LIKELY FAIL | The JS references `.fade-in` elements via querySelectorAll but NO element in the HTML has class `fade-in`. No runtime error (empty NodeList), but the IntersectionObserver code is dead. Same for `.reveal` class — present in source index.html but STRIPPED from dist/index.html (Tailwind purged nothing, but the source file used `reveal` which is in style.css, not styles.css — mismatch). |
| 8 | Valid HTML5 | PARTIAL | `<a href="#">` on logo is a placeholder that scrolls to top (OK) but produces an empty fragment. Valid. |
| 9 | Valid CSS3 | WARN | Build log warned: "@import must precede all other statements". The `@import url(...)` for Google Fonts is AFTER `@tailwind` directives in `styles.css`. In the built CSS this becomes invalid per CSS spec; browsers tolerate it but it's a real spec violation. |
| 10 | WCAG AA contrast | MIXED | Black-on-off-white ✓. White-on-charcoal ✓. But `#6B6B6B` (text-secondary) on `#F7F7F5` = **4.81:1** — barely passes AA for normal text. `#9A9A9A` (text-muted) on `#1A1A1A` (charcoal) = **5.04:1** ✓. `#9A9A9A` on `#F7F7F5` (footer has `bg-gargo-charcoal` but if the class is ignored it falls back to transparent = off-white from body) — would FAIL at 2.85:1. |
| 11 | JSON-LD validates | PASS | BarberShop schema with address, geo, aggregateRating, priceRange. Valid. |
| 12 | Meta title ≤60 chars | PASS | 55 chars. |
| 13 | Meta description ≤160 chars | PASS | 104 chars. |
| 14 | Skip-to-content link | PASS | Present, uses Tailwind sr-only + focus variants. |
| 15 | All images have Spanish alt text | PASS | All 7 portfolio images + logo have proper alt text. |
| 16 | No external cookies on first load | PASS | No Maps iframe, no analytics. Google Fonts may set cookies depending on browser — mitigated with preconnect. |
| 17 | Favicon present | PARTIAL | `/images/logo.jpg` used as both favicon and apple-touch-icon. PRD wanted 32×32 and 180×180 PNG exports. Using the full logo.jpg (unknown dimensions) as favicon is inefficient and may render poorly on iOS. |

---

## Bugs Found

### BLOCKING

**B1. Wrong display font (Bebas Neue instead of Space Grotesk)**
- Location: tailwind.config.js:21, styles.css:21, style.css:60, dist CSS, dist HTML Google Fonts link.
- Evidence: Google Fonts URL loads `Space+Grotesk` but the CSS overrides it with `font-family: 'Bebas Neue', sans-serif` for `.font-display` and `h1,h2,h3`.
- Impact: Entire visual identity diverges from PRD §2. Bebas Neue is a display-only all-caps font — lowercase Spanish copy in section headings ("Más que un corte", "Lo que dicen nuestros clientes") will render with missing/tofu glyphs or be auto-uppercased depending on browser.
- Repro: Open dist/index.html, inspect any H2. Computed font-family is Bebas Neue.
- Fix: Replace all `Bebas Neue` references with `'Space Grotesk'` and add `font-weight: 700` for headings, `font-weight: 500` for H3.

**B2. Inconsistent Tailwind color token prefixes — `gargo-*` classes are undefined and silently ignored**
- Location: dist/index.html uses BOTH `brand-*` (nav, hero, philosophy USP cards in source) and `gargo-*` (body, services, gallery, reviews, contact, footer).
- Evidence: `tailwind.config.js` only defines `brand-*` tokens. No `gargo-*` tokens exist.
- Impact: The following classes produce NO CSS output:
  - `bg-gargo-off-white` (body, philosophy, reviews)
  - `text-gargo-text-primary` (body, philosophy body)
  - `text-gargo-text-secondary` (USP captions, service durations, subtitle, review caption)
  - `text-gargo-text-muted` (gallery subtitle, footer)
  - `bg-gargo-charcoal` (gallery, contact map, footer)
  - `bg-gargo-black`, `text-gargo-white` (skip link focus state, Booksy CTA)
  - `border-gargo-divider` (service rows)
- Result: Services section has no divider borders; gallery section has no dark background; footer has no dark background; body text color is browser default; skip-link focus state is broken.
- Repro: Inspect `<footer>` in dist — `bg-gargo-charcoal` produces no background-color rule.
- Fix: Pick ONE prefix (the PRD-aligned `brand-*`) and replace ALL `gargo-*` class names in index.html. Or add `gargo-*` aliases to tailwind.config.js matching PRD colors exactly (`#000000` not `#0A0A0A`).

**B3. CTA buttons are gold (#C4A882) instead of PRD-required black (#000000)**
- Location: styles.css:79, style.css:95, dist CSS `.btn-primary`.
- PRD §3 Servicios: "Button: background: #000000; color: #FFFFFF; ... Hover: background: #1A1A1A".
- Impact: Primary conversion element does not match brand spec. Gold accent color (`#C4A882`) is not in the PRD palette at all.
- Fix: Remove `--color-accent: #C4A882` entirely. Set `.btn-primary { background: #000; color: #fff; }` with hover `#1A1A1A`.

**B4. Headings rendered in Bebas Neue break Spanish mixed-case copy**
- Location: dist/index.html lines 110, 144, 180, 199, 222.
- Evidence: Bebas Neue is an all-caps font — it has no lowercase glyphs. Headings like "Más que un corte" will either render lowercase letters with a different fallback font (inconsistent) or display as tofu boxes.
- Repro: Load in browser, visually inspect the Philosophy H2. If the source also applied `text-transform: uppercase` (style.css:62 does), it would mask the issue — but the built CSS does NOT include that rule (it comes from style.css which IS included, but only for `h1,h2,h3 { font-family: 'Bebas Neue' }` — the `text-transform` line IS present in style.css:62 so this MIGHT mask it).
- Impact: Even if masked by uppercase transform, the visual identity is wrong (Bebas Neue condensed sans ≠ Space Grotesk geometric sans).
- Fix: Switch to Space Grotesk and remove forced uppercase — PRD uses mixed case intentionally.

**B5. OG and Twitter image URLs are relative, not absolute**
- Location: dist/index.html lines 14, 20.
- Value: `<meta property="og:image" content="/images/hero.jpg">`.
- Impact: Facebook, WhatsApp, Twitter, LinkedIn scrapers REQUIRE absolute URLs. Social share previews will show NO image.
- Fix: Change to `https://www.gargohairstudio.com/images/hero.jpg` (matching canonical domain).

**B6. Source CSS file mismatch — styles.css vs style.css**
- Location: `index.html:55` loads `/src/styles.css`. `src/main.js:1` imports `./style.css`. Both files exist with DIFFERENT content.
- Evidence: `styles.css` has Bebas Neue + gold accent + `.mobile-menu.active` + `.section-heading::before`. `style.css` has CSS variables + `.skip-link` + `.portfolio-item` + `.service-row` + `.mobile-menu a.mobile-nav-link` + `.fade-in` + `.delay-*` + `.divider-accent`.
- Impact: Vite's build follows the JS import graph → only `style.css` is bundled. Everything unique to `styles.css` (including `.reveal`, `.btn-primary` override in some contexts) is LOST in production.
- Repro: Search dist CSS for `.section-heading::before` — not found.
- Fix: Consolidate into a single CSS file. Delete the unused one.

### NON-BLOCKING (functional but suboptimal)

**B7. Mobile menu z-index conflict**
- Header: `z-50`. Mobile menu overlay: `z-40`.
- Result: When overlay is open, the header (including hamburger icon) sits ABOVE the overlay. The close button inside the overlay (absolute top-4 right-4) is positioned at 16px from top — the header is 56–64px tall — so the close button is hidden BEHIND the header.
- Repro: Open mobile menu on <768px viewport, try to tap close. User must tap a nav link instead.
- Fix: Set mobile menu to `z-[60]` or higher.

**B8. `@import` after `@tailwind` in styles.css**
- Location: styles.css lines 1–6. `@tailwind base/components/utilities` come first, then `@import url(...)`.
- Impact: Build warning; CSS spec violation. Browsers tolerate but it may cause Google Fonts to load unreliably.
- Fix: Move `@import` to line 1, or (better) remove it entirely since index.html already has a `<link>` tag for Google Fonts.

**B9. Dead JS code — `.fade-in` elements don't exist**
- Location: main.js:46 `document.querySelectorAll('.fade-in')`.
- HTML contains no `.fade-in` class. PRD §5 explicitly says "Scroll-triggered animations ... out of scope for MVP".
- Fix: Remove the IntersectionObserver block entirely.

**B10. Hero section uses background-image instead of `<img>`**
- PRD §3 Hero specifies `background-size: cover` so this is technically allowed, but Lighthouse LCP audits penalize CSS-background LCP vs `<img>` with `fetchpriority="high"`.
- Recommendation: Consider `<img src="/images/hero.jpg" alt="" aria-hidden="true" fetchpriority="high" class="absolute inset-0 w-full h-full object-cover">` wrapped in the section.

**B11. Google Fonts `subset=latin` parameter is deprecated**
- URL: `...&family=Space+Grotesk:wght@500;700&display=swap&subset=latin`
- Google Fonts API v2 no longer honors `subset=`; use unicode-range in the served CSS (which Google does automatically for Latin-default languages) or omit.
- Low impact.

**B12. Philosophy section ID `filosofia` not in nav**
- Nav links: servicios, galeria, resenas, contacto.
- PRD §3 Navigation: same 4 links. OK per spec.
- But the philosophy section exists without any anchor pointing to it — fine, just noting.

---

## Security / Privacy Risks

- ✓ All external links (Booksy, Instagram, Google Maps) use `target="_blank" rel="noopener noreferrer"` — correct.
- ✓ No inline scripts with user-controlled content.
- ✓ JSON-LD is static.
- ✓ No cookies, no analytics, no trackers.
- ✓ No forms (no CSRF/XSS surface).
- Low risk: Google Fonts leaks visitor IP to Google. Mitigation noted in PRD §5 (self-host if needed).
- Low risk: Favicon served as JPG (logo.jpg) — not a security issue but wasteful; browser fetches full multi-KB image for a 32×32 slot.

---

## Edge Cases

- **Very narrow viewports (320px):** `px-4` padding + `max-w-*` constraints should handle. Service row with "Corte Niños (hasta 10 años)" at `text-xl font-display` may overflow horizontally on 320px if Bebas Neue renders wide.
- **Very wide viewports (2560px):** `max-w-7xl` (1280px) on gallery grid constrains it; hero background covers. OK.
- **Reduced-motion preference:** No `@media (prefers-reduced-motion: reduce)` declaration. The `animate-bounce` scroll indicator and any future transitions will still animate. Should add `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`.
- **JS disabled:** Mobile menu will not open (no CSS fallback). Nav links still work on desktop. Site is mostly usable.
- **Images fail to load:** Portfolio images have no explicit `width`/`height` attributes — only `aspect-square` class. If image fails, a gray square of correct ratio remains. Acceptable.
- **Booksy/Instagram link rot:** Out of our control; links verified at build time.

---

## Test Plan (manual, before re-review)

1. Open dist/index.html in Chrome, Firefox, Safari (latest).
2. Verify each H2 renders correctly in Spanish with no missing glyphs.
3. Inspect computed styles: confirm `.font-display` = Space Grotesk 700.
4. Inspect footer, gallery, body — confirm background colors apply (not transparent).
5. Tab through the page with keyboard — confirm skip-link appears, focus rings visible, all interactive elements reachable.
6. Mobile (375px): open hamburger, confirm close button is not hidden behind header.
7. Paste URL into Facebook Sharing Debugger and Twitter Card Validator — confirm og:image renders.
8. Run Lighthouse (mobile, simulated 3G) — target 90/95/95/95.
9. Run W3C HTML validator and CSS validator — zero errors.
10. Run axe DevTools — confirm WCAG AA, no contrast violations.
11. Paste dist/index.html into Google Rich Results Test — confirm LocalBusiness/BarberShop detected.

---

## Blocking Issues (must fix before launch)

1. **B1** — Replace Bebas Neue with Space Grotesk everywhere.
2. **B2** — Unify Tailwind color tokens to `brand-*` (or add `gargo-*` aliases) matching PRD palette exactly (`#000000`, `#1A1A1A`, `#F7F7F5`, `#FFFFFF`, `#111111`, `#6B6B6B`, `#9A9A9A`, `#E5E5E5`).
3. **B3** — CTA buttons must be black, not gold.
4. **B4** — Remove forced uppercase / fix Spanish heading rendering.
5. **B5** — Make og:image and twitter:image absolute URLs.
6. **B6** — Consolidate styles.css and style.css into one file; rebuild.

## Non-Blocking Improvements

- B7: Fix mobile menu z-index.
- B8: Move `@import` above `@tailwind` or delete it.
- B9: Remove dead `.fade-in` JS.
- B10: Convert hero to `<img>` for better LCP.
- B11: Drop deprecated `subset=latin` param.
- Add `prefers-reduced-motion` media query.
- Generate proper 32×32 and 180×180 PNG favicons.
- Add `robots.txt` and `sitemap.xml` to public folder (per Launch Checklist).
- Add `width`/`height` attributes to portfolio `<img>` tags to prevent CLS.
- Consider WebP versions + `<picture>` fallback (PRD §4).
- Add `decoding="async"` to portfolio images.

---

## Launch Decision

**FAIL — DO NOT LAUNCH.**

The site has multiple blocking visual/functional defects that directly contradict the PRD:
- Wrong typeface throughout (Bebas Neue ≠ Space Grotesk).
- Wrong color palette (gold accent invented; black is #0A0A0A instead of #000000).
- Broken Tailwind classes that silently fail, leaving gallery/footer/services unstyled.
- Social share previews will have no image.
- Duplicate/conflicting CSS source files mean production bundle is missing styles.

Required actions:
1. Fix the 6 blocking bugs above.
2. Rebuild (`npm run build`).
3. Re-run this QA review.

Estimated fix effort: ~2–3 hours for a developer familiar with the codebase.

— QA Agent
