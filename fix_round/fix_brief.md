# FIX ROUND — QA Blocking Issues

## Source Files
- `/opt/data/gargo-studio-landing/index.html` (source HTML)
- `/opt/data/gargo-studio-landing/tailwind.config.js` (Tailwind config)
- `/opt/data/gargo-studio-landing/src/styles.css` (CSS - this is the main file loaded by index.html)
- `/opt/data/gargo-studio-landing/src/main.js` (JS)
- `/opt/data/gargo-studio-landing/src/style.css` (OLD CSS - conflicting file, should be removed or merged)
- `/opt/data/gargo-studio-landing/dist/` (build output directory)
- `/opt/data/gargo-studio-landing/PRD.md` (PRD reference)

## Build Command
```bash
cd /opt/data/gargo-studio-landing && npm run build
```

## 6 BLOCKING ISSUES — Fix All

### B1. WRONG FONT — Bebas Neue → Space Grotesk
**Problem:** `styles.css` imports Bebas Neue and sets it for `.font-display` and `h1,h2,h3`. `tailwind.config.js` also defines `font-display` as Bebas Neue. The PRD mandates Space Grotesk.

**Fix:**
1. In `styles.css`: Replace the `@import` Google Fonts URL with one that loads ONLY Space Grotesk (weights 500,700) and Inter (weights 400,500). Remove ALL `Bebas Neue` references.
2. In `styles.css`: Change `.font-display` and `h1,h2,h3` to use `font-family: 'Space Grotesk', sans-serif;` with `font-weight: 700` for h1/h2, `font-weight: 500` for h3.
3. In `tailwind.config.js`: Change `font-display` to `['"Space Grotesk"', 'sans-serif']`.
4. In `tailwind.config.js`: Remove `Bebas Neue` from `fontFamily`.

### B2. BROKEN TAILWIND COLORS — Remove `gargo-*` aliases, unify on `brand-*`
**Problem:** The PRD uses pure black `#000000`. The config uses `#0A0A0A` for brand-black. Also the `gargo-*` prefix was used inconsistently in a previous build.

**Fix:**
1. In `tailwind.config.js`: Change `brand-black` to `'#000000'` (pure black, matching PRD).
2. In `tailwind.config.js`: Change `brand-accent` to `'#000000'` (black, NOT gold). Remove the gold color entirely.
3. In `tailwind.config.js`: Change `brand-text-primary` to `'#000000'` (pure black).
4. Ensure ALL `brand-*` colors are consistent with PRD §2.
5. Check `index.html` for any `gargo-*` class names and replace with `brand-*` equivalents.

### B3. WRONG CTA COLOR — Gold → Black
**Problem:** The accent color `#C4A882` (gold) is used for focus states, stars, and USP icons. The PRD requires black `#000000` for primary CTAs and accent elements.

**Fix:**
1. In `styles.css`: Remove any `--color-accent` or references to `#C4A882`.
2. In `styles.css`: Set `.btn-primary` to `background: #000000; color: #FFFFFF;` with hover state `background: #1A1A1A`.
3. In `styles.css`: Remove any `outline: 2px solid #C4A882` — change to `outline: 2px solid #000000`.
4. In `index.html`: Change `focus:bg-brand-accent` on the skip-link to `focus:bg-brand-black` and `focus:text-brand-white`.
5. In `index.html`: The star icons and USP icons should use `text-brand-black` (or keep a subtle gray if you prefer, but NOT gold).

### B4. SPANISH HEADING BUGS — Bebas Neue has no lowercase
**Problem:** Bebas Neue is an all-caps font. Headings like "Más que un corte" will render incorrectly. This is fixed by switching to Space Grotesk (B1).

**Fix:** Ensure B1 is done correctly. No additional work needed if B1 is fixed.

### B5. OG IMAGES — Relative → Absolute URLs
**Problem:** `og:image` and `twitter:image` use `/images/hero.jpg` (relative). Social scrapers require absolute URLs.

**Fix:**
1. In `index.html`: Change `og:image` content to `https://www.gargohairstudio.com/images/hero.jpg`.
2. In `index.html`: Change `twitter:image` content to `https://www.gargohairstudio.com/images/hero.jpg`.
3. In `index.html`: Change `image` in the JSON-LD schema to `https://www.gargohairstudio.com/images/hero.jpg`.

### B6. CONFLICTING CSS FILES — Unify into one
**Problem:** `src/styles.css` and `src/style.css` both exist with different content. `index.html` loads `/src/styles.css` but `main.js` imports `./style.css`. The Vite build picks one or the other inconsistently.

**Fix:**
1. Merge any UNIQUE styles from `style.css` into `styles.css` (like `.skip-link`, `.portfolio-item`, `.service-row`, `.mobile-menu`, `.mobile-nav-link`, `.fade-in`, `.delay-*`, `.divider-accent` if they exist and are needed).
2. Delete `src/style.css` after merging.
3. In `src/main.js`: Change `import './styles.css'` to `import './styles.css'` (or if it's already that, verify).
4. Ensure `index.html` only loads ONE CSS file (via the Vite build process, the HTML link tag might be replaced by the build — but keep the source clean).

### B7. ADDITIONAL FIX — `@import` order in CSS
**Problem:** `styles.css` has `@import` AFTER `@tailwind` directives. This violates CSS spec.

**Fix:** Move the Google Fonts `@import` to the TOP of `styles.css`, BEFORE any `@tailwind` directives.

### B8. ADDITIONAL FIX — Remove dead JS code
**Problem:** `main.js` queries `.fade-in` elements but no elements have that class.

**Fix:** Remove the `.fade-in` querySelectorAll code from `main.js` if it exists. Keep the `.reveal` observer.

### B9. ADDITIONAL FIX — Mobile menu z-index
**Problem:** Mobile menu overlay has z-40, header has z-50. The close button inside the overlay is hidden behind the header.

**Fix:** In `index.html`: Change the mobile menu div from `z-40` to `z-[60]` (or any value > 50). Also add `z-[60]` to the close button inside the mobile menu.

## AFTER FIXING — REBUILD

```bash
cd /opt/data/gargo-studio-landing && npm run build
```

Verify the build succeeds with no errors.

## OUTPUT
Save all fixed files back to the original paths. Overwrite in place.
