/* ============================================================
   GARGO HAIR STUDIO — Interactions
   Production JS entry for Vite module bundling.
   Animation fallback: content is visible unless .js-enabled is added.
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  const nav = document.querySelector('.nav');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-nav-close]');
  let animatedElements = document.querySelectorAll('[data-animate]');
  const progress = document.querySelector('.scroll-progress');
  let menuOpen = false;

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuOpen = open;
    mobileMenu.classList.toggle('active', open);
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function updateScrollUi() {
    const scrollTop = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('is-scrolled', scrollTop > 24);
    if (progress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = percent + '%';
    }
  }

  function initMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.addEventListener('click', function () { setMenu(!menuOpen); });
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuOpen) {
        setMenu(false);
        menuToggle.focus();
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initAnimations() {
    document.querySelectorAll('.service-row').forEach(function (row, index) {
      row.setAttribute('data-animate', 'service-row');
      row.style.setProperty('--reveal-delay', (index * 70) + 'ms');
    });
    animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;
    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach(function (el) { el.classList.add('animated'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });
    animatedElements.forEach(function (el) { observer.observe(el); });
  }

  function init() {
    initMenu();
    initSmoothScroll();
    initAnimations();
    updateScrollUi();
    window.addEventListener('scroll', updateScrollUi, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
