# QA Re-check Brief

## Context
This is a FIX ROUND for the GARGO HAIR STUDIO landing page. The first build FAILED QA with 6 blocking issues. A Developer Agent has applied fixes. You must verify ALL fixes are correct and no new issues were introduced.

## Files to Review
- `/opt/data/gargo-studio-landing/dist/index.html` (built output)
- `/opt/data/gargo-studio-landing/dist/assets/index-*.css` (built CSS)
- `/opt/data/gargo-studio-landing/dist/assets/index-*.js` (built JS)
- Source files (if needed): `index.html`, `src/styles.css`, `tailwind.config.js`, `src/main.js`

## Original Blocking Issues (MUST verify all fixed)
1. **B1 — Wrong font**: Bebas Neue → Space Grotesk. Verify: built CSS imports Space Grotesk (NOT Bebas Neue). No Bebas Neue references anywhere.
2. **B2 — Broken Tailwind colors**: brand-black should be #000000, brand-accent should be #000000, brand-text-primary should be #000000. No gold (#C4A882) anywhere.
3. **B3 — Wrong CTA color**: btn-primary should be background #000000, color #FFFFFF, hover #1A1A1A.
4. **B4 — Spanish heading bugs**: Resolved by B1 (Space Grotesk supports lowercase). Verify headings render correctly.
5. **B5 — OG images relative**: og:image and twitter:image must be absolute URL `https://www.gargohairstudio.com/images/hero.jpg`.
6. **B6 — Conflicting CSS files**: Only `styles.css` should exist, `style.css` should be deleted.
7. **B7 — @import order**: Google Fonts @import must be at top of CSS, before @tailwind.
8. **B8 — Dead JS**: No .fade-in querySelectorAll code.
9. **B9 — Mobile menu z-index**: Mobile menu must have z-index > header (z-[60] vs z-50).
10. **Skip link**: focus:bg-brand-black focus:text-brand-white.

## Acceptance Criteria (from PRD §6)
Re-check:
1. Page loads <2s on 3G / Lighthouse Perf ≥90
2. 100% responsive 320–2560px
3. Hero image full-width, object-fit:cover
4. All 7 portfolio images in 3/2/1 grid
5. All CTAs link correctly, target=_blank rel=noopener
6. Nav smooth-scrolls, mobile menu works
7. Zero console errors
8. Valid HTML5
9. Valid CSS3
10. WCAG AA contrast
11. JSON-LD validates
12. Meta title ≤60 chars
13. Meta description ≤160 chars
14. Skip-to-content link
15. All images have Spanish alt text
16. No external cookies on first load
17. Favicon present

## Output
Write your report to `/opt/data/gargo-studio-landing/fix_round/qa_recheck_report.md`.

## Verdict
- PASS if all 6 original blocking issues are fixed AND no new blocking issues introduced.
- FAIL if any original blocking issue remains OR a new blocking issue is found.
