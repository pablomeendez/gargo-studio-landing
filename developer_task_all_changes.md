# Developer Task: Complete Barbershop Page Overhaul

## 1. Delete the "Filosofía / INVEST IN YOURSELF" Section

The user explicitly said this section is "made up" and doesn't like it. Remove the entire `<section class="section philosophy" id="filosofia">` from `index.html`.

Also remove from the navigation:
- Mobile menu link: `<a href="#filosofia" class="mobile-menu-link" data-nav-close>Filosofía</a>`
- Delete `.philosophy-grid`, `.philosophy-text`, `.philosophy-image`, `.philosophy-pillars`, `.pillar`, `.pillar-number` CSS rules entirely from `styles.css`.

## 2. Replace the Hero Image

The current `hero.jpg` (140KB) has poor quality and has the logo/text baked in. Use `portfolio2.jpg` (507KB, highest quality) as the hero background instead. It's a real haircut photo that looks professional.

Changes:
- In `index.html`: Change the hero section background image reference from `/images/hero.jpg` to `/images/portfolio2.jpg`
- In `index.html`: Remove the `<img src="/images/hero.jpg"...>` element that was showing the hero image separately (already done in previous fix, but verify)
- In `styles.css`: `.hero-bg` background-image should now be `/images/portfolio2.jpg`
- Keep the subtle gradient overlay on the hero so the "Descubre" scroll indicator is still readable
- The hero should still be full-height with just the background image + scroll indicator

## 3. Add "El Barbero" Section (The Barber Profile)

Add a new section between the hero and services. This is the most important addition — people buy from people.

HTML structure (insert after `</section>` closing the hero, before the services section):
```html
<!-- EL BARBERO -->
<section class="section barber" id="barbero">
  <div class="section-watermark" aria-hidden="true">BARBERO</div>
  <div class="barber-grid">
    <div class="barber-image" data-animate="slide-left">
      <img src="/images/portfolio3.jpg" alt="El barbero de GARGO HAIR STUDIO" loading="lazy">
    </div>
    <div class="barber-text" data-animate="slide-right">
      <h2 class="section-title">El Barbero</h2>
      <p class="barber-bio">Especialista en visajismo y corte de autor. Años de experiencia diseñando estilos que se adaptan a la forma de tu rostro. Cada cliente es un nuevo proyecto, cada corte una obra personalizada.</p>
      <div class="barber-details">
        <div class="barber-detail">
          <span class="detail-number">+5</span>
          <span class="detail-label">Años de experiencia</span>
        </div>
        <div class="barber-detail">
          <span class="detail-number">56</span>
          <span class="detail-label">Reseñas 5 estrellas</span>
        </div>
        <div class="barber-detail">
          <span class="detail-number">100%</span>
          <span class="detail-label">Clientes satisfechos</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

CSS:
- `.barber-grid` — 2-column grid (image left, text right), similar to the old philosophy grid
- `.barber-image img` — aspect-ratio 3/4, object-fit cover
- `.barber-bio` — font-size 1.125rem, line-height 1.6, color var(--text-secondary)
- `.barber-details` — 3-column grid with numbers in Oswald font (large, bold) and labels in small caps
- `.barber-detail` — flex column, gap 4px
- `.detail-number` — font-family: var(--font-display), font-size: 2rem, font-weight: 700
- `.detail-label` — font-family: var(--font-mono), font-size: 0.75rem, text-transform: uppercase, letter-spacing: 0.1em, color: var(--text-muted)

Mobile: `.barber-grid` becomes 1fr, image on top (order: -1)

## 4. Add Opening Hours

Add opening hours to the contact section. Insert after the address in the contact info:

```html
<div class="contact-hours">
  <h3 class="hours-title">Horario</h3>
  <div class="hours-row">
    <span class="hours-day">Lunes — Viernes</span>
    <span class="hours-time">09:00 — 20:00</span>
  </div>
  <div class="hours-row">
    <span class="hours-day">Sábado</span>
    <span class="hours-time">09:00 — 14:00</span>
  </div>
  <div class="hours-row hours-closed">
    <span class="hours-day">Domingo</span>
    <span class="hours-time">Cerrado</span>
  </div>
</div>
```

CSS:
- `.contact-hours` — margin-top: 32px
- `.hours-title` — font-family: var(--font-mono), font-size: 0.75rem, text-transform: uppercase, letter-spacing: 0.1em, color: var(--text-muted), margin-bottom: 12px
- `.hours-row` — display: flex, justify-content: space-between, padding: 8px 0, border-bottom: 1px solid var(--border)
- `.hours-day` — font-weight: 600
- `.hours-time` — color: var(--text-secondary)
- `.hours-closed` — color: var(--text-muted), opacity: 0.6

## 5. Add WhatsApp Floating Button

Add a fixed floating WhatsApp button at the bottom-right of the page. The number should be a placeholder that the user can replace later.

HTML (add at the end of `<body>`, before the lightbox):
```html
<!-- WhatsApp Floating Button -->
<a href="https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20en%20GARGO%20HAIR%20STUDIO" 
   class="whatsapp-float" 
   target="_blank" 
   rel="noopener noreferrer"
   aria-label="Reservar cita por WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

CSS:
```css
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: #25D366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s var(--ease-out-expo), box-shadow 0.2s;
}

.whatsapp-float:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}

@media (max-width: 640px) {
  .whatsapp-float {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
  }
  .whatsapp-float svg {
    width: 24px;
    height: 24px;
  }
}
```

## 6. Navigation Update

Since the "Filosofía" section is deleted, remove it from the mobile menu. The menu should be:
- Servicios
- Galería
- Reseñas
- Contacto

Also update the nav to include a smooth scroll to the new #barbero section? Or just keep it simple. The nav currently just has the logo + hamburger menu. Keep it as-is but remove the Filosofía link from mobile menu.

## 7. Section Order

Final page order:
1. Hero (full image, scroll indicator)
2. El Barbero (profile + stats)
3. Servicios (menu + prices)
4. Galería (portfolio)
5. Reseñas (3 cards + rating)
6. Contacto (address + hours + map + WhatsApp)

## 8. Booksy Button Repetition

Add the "Reservar cita en Booksy" button in more places:
- After the hero section (small section with just the CTA)
- After the gallery section
- Keep it at the bottom of the contact section

Actually, keep it simple. Add one prominent CTA section between "El Barbero" and "Servicios":

```html
<section class="section cta-bar" id="reservar">
  <div class="cta-bar-content" data-animate="fade-up">
    <p class="cta-bar-text">Reserva tu cita ahora</p>
    <a href="https://booksy.com/es-es/153564_gargo-hair-studio_barberia_60813_a-coruna" target="_blank" rel="noopener noreferrer" class="btn-accent">Reservar en Booksy</a>
  </div>
</section>
```

CSS:
- `.cta-bar` — background: var(--bg-surface), padding: 64px 32px, text-align: center
- `.cta-bar-text` — font-family: var(--font-display), font-size: 1.5rem, margin-bottom: 16px
- `.cta-bar .btn-accent` — display: inline-block, padding: 16px 40px

## Output

After all changes, commit and push:
```bash
git add . && git commit -m "feat: delete filosofía section, new hero image, barber profile, opening hours, WhatsApp button, repeated CTA" && git push origin master
```

Repo: `pablomeendez/gargo-studio-landing`
