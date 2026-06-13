/* ============================================================
   GARGO HAIR STUDIO — Brutalist Editorial
   Interactions & Animations
   ============================================================ */

(function () {
  'use strict';

  // ---- DOM References ----
  const nav = document.querySelector('.nav');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('[data-nav-close]');
  const animatedElements = document.querySelectorAll('[data-animate]');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  // ---- State ----
  let menuOpen = false;

  // ---- Mobile Menu ----
  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('active')) {
        closeLightbox();
        return;
      }
      if (menuOpen) {
        closeMenu();
        menuToggle.focus();
      }
    }
  });

  // ---- Lightbox ----
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Click on gallery items
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      var img = item.querySelector('img');
      if (img) {
        openLightbox(img.src);
      }
    });
  });

  // Close lightbox on background click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox on close button
  var closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // ---- Scroll-Triggered Animations ----
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      animatedElements.forEach(function (el) {
        el.classList.add('animated');
      });
      return;
    }

    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseFloat(el.getAttribute('data-delay')) || 0;

          if (delay > 0) {
            setTimeout(function () {
              el.classList.add('animated');
            }, delay * 1000);
          } else {
            el.classList.add('animated');
          }

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Page Load: Staggered Hero Elements ----
  function initHeroLoad() {
    var heroEls = document.querySelectorAll('[data-animate]');
    // Elements already handled by IntersectionObserver for below-fold
    // For hero (above fold), ensure they animate on load
    if ('IntersectionObserver' in window) {
      // Hero elements should be visible immediately; the observer will catch them
      // But add a small delay for the staggered effect
      setTimeout(function () {
        var heroSection = document.querySelector('.hero');
        if (heroSection) {
          var heroAnimated = heroSection.querySelectorAll('[data-animate]');
          heroAnimated.forEach(function (el) {
            var delay = parseFloat(el.getAttribute('data-delay')) || 0;
            setTimeout(function () {
              el.classList.add('animated');
            }, delay * 1000 + 100);
          });
        }
      }, 100);
    } else {
      // No observer: show everything
      animatedElements.forEach(function (el) {
        el.classList.add('animated');
      });
    }
  }

  // ---- Smooth Scroll for anchor links (non-mobile-menu links) ----
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      // Skip mobile menu links (handled separately)
      if (anchor.hasAttribute('data-nav-close')) return;

      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 20;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ---- Parallax Hero Background ----
  function initParallax() {
    window.addEventListener('scroll', function () {
      var heroBg = document.querySelector('.hero-bg');
      if (heroBg) {
        var scrollY = window.scrollY || window.pageYOffset;
        var heroSection = document.querySelector('.hero');
        if (heroSection && scrollY < heroSection.offsetHeight) {
          heroBg.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
        }
      }
    });
  }

  // ---- Scroll Progress ----
  function initScrollProgress() {
    window.addEventListener('scroll', function () {
      var scrollProgress = document.querySelector('.scroll-progress');
      if (scrollProgress) {
        var scrollTop = window.scrollY || window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
      }
    });
  }

  // ---- Init ----
  function init() {
    initScrollAnimations();
    initHeroLoad();
    initSmoothScroll();
    initParallax();
    initScrollProgress();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
