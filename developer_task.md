# Developer Task: GARGO Landing Page Fixes

## Issue 1: Hero has duplicated GARGO text

The hero image (`hero.jpg`) already contains "GARGO + INVEST IN YOURSELF + logo" baked into it. The HTML currently renders:
- `.hero-bg` with the same image at 25% opacity + heavy radial vignette
- `.hero-poster` with "GAR / GO" text in Oswald font
- `.hero-image` on the right showing the same image again

This creates a triple duplication. The user says "it looks strange because of the duplicated gargo from the font and the image."

### Fix:
1. In `index.html` — Remove `.hero-poster` div entirely (contains `.hero-title` and `.hero-subtitle`). Remove `.hero-image` div entirely. Keep only `.hero-scroll` inside `.hero-content`.
2. In `index.html` — Keep `.hero-bg` div but simplify it to just `<div class="hero-bg"></div>` (no `.hero-vignette` child).
3. In `styles.css` — Make `.hero-bg` the full hero background:
   - `opacity: 1` (not 0.25)
   - `background-position: center` (not `center top`)
   - Add a subtle bottom-to-top gradient overlay so the `.hero-scroll` indicator at the bottom is readable: `linear-gradient(to top, rgba(26,26,24,0.8) 0%, transparent 30%)` — use a `::after` pseudo-element on `.hero-bg` or add a `.hero-gradient` child.
   - Remove `.hero-vignette` CSS rules entirely.
4. In `styles.css` — `.hero-content` should still be `position: relative; z-index: 1;` but now it only contains `.hero-scroll`. Center the scroll indicator vertically/horizontally or keep it at the bottom. The hero should be just the full image + scroll indicator. No text overlay.
5. In `styles.css` — Remove `.hero-title`, `.hero-title-line`, `.hero-subtitle`, `.hero-image`, `.hero-image img` rules entirely. Clean up any unused @keyframes.
6. In `styles.css` — Remove all `.hero-title` and `.hero-subtitle` mobile media query rules.
7. In `index.html` — The `.hero-content` div should only contain the `.hero-scroll` element.

## Issue 2: Orange accent color doesn't suit the brand

The brand is industrial/minimalist. The hero image is monochrome. The current `--accent: #c45c26` (burnt orange) is arbitrary and clashes.

### Fix:
1. In `styles.css` — Change `--accent` to `#a8a095` (muted warm gray)
2. Change `--accent-hover` to `#8a867d` (the secondary text color)
3. Change `--accent-glow` to `rgba(168, 160, 149, 0.15)`
4. Verify all uses of `var(--accent)` still look good with the new gray. The scroll bounce SVG, skip-link, CTA buttons, review stars, pillar numbers, and service-row hover effects should all look cohesive with a gray accent.
5. If any element becomes invisible against the background with the new gray, adjust accordingly (e.g., skip-link background should still be visible — use `--text-primary` or `--border-light` instead).

## Issue 3: "Más que un corte" is fabricated and doesn't suit

The heading "Más que un corte" does not come from GARGO. The actual brand slogan is "INVEST IN YOURSELF" which is already in the hero image.

### Fix:
1. In `index.html` — Change the `<h2 class="section-title">` in the `#filosofia` section from "Más que un corte" to "INVEST IN YOURSELF". Keep the `<br>` if it helps layout: `INVEST IN<br>YOURSELF`.

## Issue 4: JSON-LD coordinates are still wrong

The `latitude` and `longitude` in the JSON-LD (lines 43-44) still have the old wrong values: `43.3623, -8.4115`.

### Fix:
1. In `index.html` — Update the JSON-LD GeoCoordinates to:
   - `"latitude": 43.3569`
   - `"longitude": -8.4006`

## Output

After making all changes, commit with a clear message and push to the GitHub repo.

Repo: `pablomeendez/gargo-studio-landing`
Branch: `master`
