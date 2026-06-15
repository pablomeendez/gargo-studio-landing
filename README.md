# GARGO Studio Landing Page

Static Vite landing page for GARGO Studio.

## Development

```bash
npm install
npm run build
npm run preview
```

## Source-of-truth rules

Do not invent business facts. Use these sources before changing public copy:

- Booksy is the source of truth for booking URL, WhatsApp/phone/contact, services, prices, opening hours, reviews, and booking-related claims.
- Instagram, logo, and supplied photos are visual sources for brand identity, imagery, and the slogan visible in brand assets.
- If a fact is not verified from source material in this repo or from Booksy, remove it from the page or document it as a TODO instead of publishing it.

Current Booksy URL used by the site:
https://booksy.com/es-es/153564_gargo-hair-studio_barberia_60813_a-coruna

## Production safety notes

- `script.js` is loaded as a Vite module entry so production builds emit a hashed JS asset.
- Animation CSS is progressive-enhancement: content is visible by default and only hidden after JS adds the `js-enabled` class.
