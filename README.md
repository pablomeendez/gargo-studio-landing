# GARGO HAIR STUDIO Landing Page

Static Vite single-page landing page for GARGO HAIR STUDIO.

## Development

```bash
npm install
npm run build
npm run preview
```

## Source-of-truth rules

Do not invent business facts. Use these sources before changing public copy:

- Booksy is the source of truth for phone/contact, booking URL, services, prices, opening hours, reviews, and booking-related claims.
- Instagram, logo, and supplied photos are visual sources for brand identity, imagery, and the visually confirmed slogan.
- If a fact is not verified from source material in this repo or from Booksy, remove it from the page or document it as a TODO instead of publishing it.
- Do not add a WhatsApp button unless a real public verified number exists. No public phone/WhatsApp number is currently available.

## Verified public data currently used

- Business name: GARGO HAIR STUDIO
- Category: Barbería / HairSalon
- Booksy URL: https://booksy.com/es-es/153564_gargo-hair-studio_barberia_60813_a-coruna
- Instagram: https://www.instagram.com/gargohairstudio/
- Address: Rúa Nicomedes Pastor Díaz 1, 15006, A Coruña
- Coordinates: 43.35679913, -8.40065852
- Location wording: A Coruña, zona Cuatro Caminos / A Gaiteira
- Brand slogan visually confirmed: INVEST IN YOURSELF
- Aggregate Booksy rating: 5.0 / 56 reseñas
- Phone/WhatsApp: unavailable publicly; Booksy requires login/contact.

## Verified services from Booksy

- Corte — 16,00 € — 40min
- Corte Y Barba — 24,00 € — 50min
- Arreglo De Barba — 10,00 € — 20min
- CORTE PARA NIÑOS (Hasta 10 Años) — 15,00 € — 30min
- Corte Pelo Largo — 20,00 € — 50min
- Rapado — 8,00 € — 15min
- Color Fantasía/Blanco — 50,00 €+ — 1h — CONSULTA PREVIA
- Mechas — 30,00 €+ — 30min — CONSULTA PREVIA

## Verified hours from Booksy

- Lunes-Viernes: 10:00–13:30, 16:00–20:40
- Sábado: 10:00–14:10
- Domingo: Cerrado

## Verified Booksy reviews used

- Adrián M… — 5/5 — 2026-06-09 — “Buen servicio”
- Ruben P… — 5/5 — 2026-06-02 — “un crack como persona y en el trato al cliente.Muy recomendable🤝”
- Eduardo — May. 26, 2026 — service Corte — employee Jorge — “¡Genial! Fue mi primera vez y quedé muy satisfecho del corte y de la conversación con Jorge”

## Asset notes

The landing page uses only existing repository image assets under `public/images/`. No new external photos were downloaded for this redesign.

## Production safety notes

- `script.js` is loaded as a Vite module entry so production builds emit a hashed JS asset.
- Animation CSS is progressive-enhancement: content is visible by default and only hidden after JS adds the `js-enabled` class.
- The SPA does not publish phone numbers, WhatsApp links, unsupported stats, unsupported years of experience, or invented review text.
