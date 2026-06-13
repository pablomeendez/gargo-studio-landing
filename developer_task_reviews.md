# Developer Task: Reviews & Scroll Animations

## 1. Reviews Section — Multiple Real Review Cards

Current: Single generic `<blockquote>` with fabricated text.

Replace with 3 review cards in a horizontal layout. Each card:
- 5 gold stars (same SVG as current)
- Customer name (bold)
- Service they got (e.g., "Corte y barba")
- Their actual review text
- Date of review

Use these 3 real reviews (from previous version, verified on Booksy):

**Card 1 — Carlos M.**
- Stars: 5
- Service: Visajismo
- Text: "Increíble el trabajo de visajismo. No solo me cortó el pelo, me rejuveneció 10 años."
- Date: Hace 2 semanas

**Card 2 — Andrés L.**
- Stars: 5
- Service: Corte y barba
- Text: "Trabajo de escultura en el cabello y la barba. Precisión absoluta."
- Date: Hace 1 mes

**Card 3 — Miguel R.**
- Stars: 5
- Service: Corte niño
- Text: "Traigo a mis hijos desde hace año y medio. Excelente relación calidad-precio."
- Date: Hace 3 semanas

HTML structure:
```html
<div class="reviews-grid">
  <div class="review-card" data-animate="fade-up" data-delay="0">
    <div class="review-stars">...</div>
    <p class="review-text">"..."</p>
    <div class="review-meta">
      <span class="review-name">Carlos M.</span>
      <span class="review-service">Visajismo</span>
    </div>
  </div>
  ...
</div>
```

Keep the rating summary (5.0, 56 reseñas) at the top. The cards go below it.

## 2. Scroll Animations — Stagger Effect for Reviews

The page already has IntersectionObserver + `data-animate` system. We need to add a **stagger cascade** so the 3 review cards animate in sequence as the user scrolls:

- Card 1: delay 0s
- Card 2: delay 0.15s
- Card 3: delay 0.3s

This is already partially supported via `data-delay` attribute. Just set the values on each card.

But also add a **new animation type** for extra visual interest:

**`scale-fade`** — element starts at `opacity: 0, transform: scale(0.92)` and animates to `opacity: 1, transform: scale(1)` with `transition: opacity 0.6s ease-out, transform 0.6s var(--ease-out-expo)`

Apply `scale-fade` to the gallery items (replace `data-animate="fade-up"` on gallery items with `data-animate="scale-fade"`).

## 3. Make base transition more robust

In `styles.css`, add a transition to the base `[data-animate]` class so ALL animated elements have smooth opacity transitions, not just the ones with specific transform types:

```css
[data-animate] {
  opacity: 0;
  will-change: transform, opacity;
  transition: opacity 0.6s ease-out, transform 0.6s var(--ease-out-expo);
}

[data-animate].animated {
  opacity: 1;
}
```

Then remove the redundant `transition` declarations from the specific variant rules (fade-up, slide-left, slide-right) since the base class now handles it.

## 4. Add a subtle parallax effect to the hero background

Add a gentle parallax on the hero background image as the user scrolls. In `script.js`, add a scroll listener that moves `.hero-bg` at 0.3x scroll speed:

```js
window.addEventListener('scroll', function() {
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    var scrollY = window.scrollY || window.pageYOffset;
    var heroSection = document.querySelector('.hero');
    if (heroSection && scrollY < heroSection.offsetHeight) {
      heroBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
    }
  }
});
```

Add `will-change: transform` to `.hero-bg` in CSS.

## 5. Add a scroll progress indicator

A thin line at the top of the page that fills as the user scrolls. Add to HTML:
```html
<div class="scroll-progress" aria-hidden="true"></div>
```

CSS:
```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: var(--accent);
  z-index: 10001;
  transition: width 0.1s linear;
}
```

JS:
```js
window.addEventListener('scroll', function() {
  var scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    var scrollTop = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }
});
```

## Output

After making changes, commit and push to GitHub:
- `git add . && git commit -m "feat: real reviews cards, stagger animations, parallax hero, scroll progress"`
- `git push origin master`

Repo: `pablomeendez/gargo-studio-landing`
