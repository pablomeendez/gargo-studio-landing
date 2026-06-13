# REDESIGN PROMPT — GARGO HAIR STUDIO
## Anti-AI, Brutalist Editorial Aesthetic

You are redesigning the GARGO HAIR STUDIO landing page at `/opt/data/gargo-studio-landing/`.
The current page is generic, white-background, AI-looking. The user wants it to look like a real designer built it.

## Aesthetic Direction: BRUTALIST EDITORIAL

Think: A high-end fashion magazine meets a raw, urban poster. Not a SaaS landing page.
Think Aesop meets a Spanish skate brand. A concrete wall with a massive typographic poster.

### Color Palette
```css
--bg-primary: #1a1a18;       /* very dark warm charcoal */
--bg-surface: #242420;       /* slightly lighter for cards */
--text-primary: #f4f1ea;     /* warm off-white */
--text-secondary: #8a867d;   /* muted warm gray */
--accent: #c45c26;           /* burnt terracotta / rust orange */
--accent-hover: #a0451a;     /* deeper burnt orange */
--border: #2e2e29;           /* barely visible warm border */
```

### Typography Stack
- **Display / Logo / Headlines**: `Oswald` (Google Fonts) — bold, condensed, masculine. UPPERCASE, tight letter-spacing (-0.02em to -0.05em).
- **Body / UI**: `Crimson Text` (Google Fonts) — serif, editorial, magazine feel.
- **Accent / Labels / Prices**: `JetBrains Mono` (Google Fonts) — monospace for prices, small labels, service tags.

### Layout Principles
- NO hero centered on a big photo. The hero is a massive typographic POSTER. "GARGO" is 15vw minimum, filling the viewport.
- Asymmetric grid. CSS Grid with `grid-template-columns: 1fr 2fr` or `2fr 1fr`. Never center everything.
- Overlapping elements. Section headers overlap into the next section.
- Images bleed to the viewport edge.
- NO rounded corners. Sharp 0px border-radius.
- Navigation is minimal: top-left logo + top-right hamburger. One-page scroll.
- Footer: massive "GARGO" watermark at 30vw, semi-transparent.

### Background & Atmosphere
- Subtle grain/noise texture overlay on entire page (CSS/SVG filter, pointer-events: none, opacity 0.04).
- Subtle gradient vignette on hero.
- No solid black. Use the warm charcoal palette.

### Animations
- Page load: Staggered `fadeInUp` with 0.15s delay increments. `translateY(40px) → 0`, `opacity: 0 → 1`, `cubic-bezier(0.16, 1, 0.3, 1)`.
- Scroll-triggered: Elements slide in from left/right alternately.
- Hover: Images scale 1.02 + subtle orange overlay. Text links: underline animates left-to-right.
- NO generic floating. NO soft bounce. Be sharp, editorial.

### Content Sections (keep all existing content, redesign presentation)
1. **Hero**: Massive "GARGO" in Oswald, 15vw, uppercase. Below: "INVEST IN YOURSELF" in Crimson Text italic. The hero photo is a small, sharp-edged rectangle off to the right, overlaid on the dark background. Or background photo with heavy dark overlay (70% opacity).
2. **Filosofía**: Editorial layout. Left: large serif text. Right: vertical photo. Section title is a huge watermark behind content.
3. **Servicios**: NOT a card grid. A table/list. Each service = row: name left, price right, border-bottom. Price in monospace. Hover highlights row with accent.
4. **Galería**: NOT a uniform grid. Asymmetric: one image huge, others small. Or horizontal scroll. Sharp edges, no borders.
5. **Reseñas**: NOT a carousel. Single large testimonial, editorial style. Large quote marks. 5.0 stars subtle. 56 reseñas in monospace.
6. **Contacto**: Large typographic section. Address, phone, massive "VISÍTANOS" text. Map embedded with dark style.
7. **Footer**: Massive "GARGO" watermark 30vw, semi-transparent. Small links below.

### Technical Requirements
- Single HTML file with embedded CSS and JS. No external deps except Google Fonts.
- Images in `images/` relative path. Keep all existing image files.
- Fully responsive. Mobile stacks vertically.
- NO Tailwind. NO Bootstrap. Write custom CSS.
- Overwrite `/opt/data/gargo-studio-landing/index.html`, `/opt/data/gargo-studio-landing/styles.css`, `/opt/data/gargo-studio-landing/script.js`.
- Preserve SEO meta tags and JSON-LD from current page.
- After building, start server: `python3 -m http.server 9876 --directory /opt/data/gargo-studio-landing`
- Take a screenshot: use a browser tool or `chromium-browser --headless --screenshot=/tmp/redesign.png http://localhost:9876`

### What NOT to do
- Do NOT use the old layout.
- Do NOT use rounded corners.
- Do NOT use centered hero with big photo.
- Do NOT use generic features cards with icons.
- Do NOT use standard top navigation bar.
- Do NOT use Space Grotesk, Inter, Roboto.
- Do NOT use white background.
- Do NOT use generic animations.
- Do NOT use standard 3-column grid.
- Do NOT make it look like SaaS.

### GARGO Info
- Barbershop in Cuatro Caminos, A Coruña, Spain
- Address: Rúa Nicomedes Pastor Díaz 1, 15006 A Coruña
- 5.0 rating on Booksy (56 reseñas)
- Slogan: "INVEST IN YOURSELF"
- Industrial-minimalist interior (concrete, wood, vintage chairs)
- Services: Corte €16, Corte y Barba €24, Arreglo de Barba €10, Corte Niños €15, Corte Pelo Largo €20
