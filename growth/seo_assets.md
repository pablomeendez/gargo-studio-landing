# SEO Assets — GARGO HAIR STUDIO

## Meta Audit

### Estado actual (confirmado correcto)

| Meta | Estado | Notas |
|------|--------|-------|
| `<title>` | ✅ | "GARGO HAIR STUDIO | Barbería en Cuatro Caminos, A Coruña" |
| `<meta name="description">` | ✅ | Incluye keywords, ubicación, rating y CTA |
| `<link rel="canonical">` | ✅ | Apunta a https://www.gargohairstudio.com/ |
| `<meta name="viewport">` | ✅ | Responsive configurado |
| `<meta charset="UTF-8">` | ✅ | Codificación correcta |
| Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`) | ✅ | Todos presentes. `og:locale` = `es_ES` |
| Twitter Card (`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`) | ✅ | `summary_large_image` |
| Schema.org JSON-LD (`@type: BarberShop`) | ✅ | Incluye nombre, dirección, geo, rating, precio, url |
| `lang="es"` en `<html>` | ✅ | Correcto |
| Skip-to-content link | ✅ | Accesibilidad |
| Alt text en imágenes | ✅ | Descriptivos y relevantes |

### Recomendaciones adicionales

- **hreflang**: No necesario para un sitio monolingüe. Si en futuro se añade versión EN/GL, añadir `<link rel="alternate" hreflang="gl" href="...">`.
- **Verificación Google Search Console**: Añadir meta tag de verificación en el `<head>`:

```html
<meta name="google-site-verification" content="XXXXXXXXXX" />
```

Se obtiene desde [search.google.com/search-console](https://search.google.com/search-console) tras añadir la propiedad.

---

## Sitemap XML

Archivo: `sitemap.xml` → colocar en la raíz del dominio (`/sitemap.xml`).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.gargohairstudio.com/</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.gargohairstudio.com/#filosofia</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.gargohairstudio.com/#servicios</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.gargohairstudio.com/#galeria</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.gargohairstudio.com/#resenas</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.gargohairstudio.com/#contacto</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### Notas sobre el sitemap

- Las secciones `#filosofia`, `#servicios`, `#galeria`, `#resenas`, `#contacto` se incluyen como fragmentos de una sola página (canonical apunta a `/`). Google entiende fragmentos como anclas navegables.
- Si en el futuro se añaden subpáginas (blog, política de privacidad), añadirlas al sitemap con su prioridad correspondiente.
- `lastmod` debe actualizarse cada vez que se despliegue un cambio.

---

## Robots.txt

Archivo: `robots.txt` → colocar en la raíz del dominio (`/robots.txt`).

```
User-agent: *
Allow: /

Sitemap: https://www.gargohairstudio.com/sitemap.xml
```

### Notas sobre robots.txt

- Al ser un sitio estático de una sola página, no hay directorios que bloquear.
- Se permite rastreo completo. Todas las URLs que existen son intencionadas y públicas.
- La línea `Sitemap:` es absoluta (con https://) para evitar ambigüedades.

---

## Google Search Console — Configuración

### Pasos para verificar la propiedad

1. Ir a [search.google.com/search-console](https://search.google.com/search-console)
2. Añadir propiedad → Tipo "URL prefix" → `https://www.gargohairstudio.com/`
3. Elegir método "HTML tag"
4. Copiar el meta tag proporcionado (ej.: `<meta name="google-site-verification" content="...">`)
5. Insertarlo en `<head>` del `index.html`
6. Hacer clic en "Verify"
7. Una vez verificado, añadir también la propiedad "Domain" (`gargohairstudio.com`) para cubrir todos los subdominios

### Recomendaciones GSC

- Enviar sitemap.xml desde el panel de GSC
- Configurar preferencia geográfica → España
- Revisar Coverage Report semanalmente
- Vincular Google Analytics 4 para ver tráfico orgánico

---

## Google Analytics 4 (opcional pero recomendado)

Añadir snippet de GA4 antes de `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Sustituir `G-XXXXXXXXXX` por el ID real de GA4.

---

## Resumen de archivos a crear en producción

| Archivo | Destino |
|---------|---------|
| `sitemap.xml` | `https://www.gargohairstudio.com/sitemap.xml` |
| `robots.txt` | `https://www.gargohairstudio.com/robots.txt` |
| Meta tag GSC | En `<head>` del `index.html` |
| GA4 snippet | En `<head>` del `index.html` (opcional) |
