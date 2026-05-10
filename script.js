(function () {
  'use strict';

  /* ── THEME TOGGLE ─────────────────────────── */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ── CURSOR SPOTLIGHT ─────────────────────── */
  const spotlight = document.getElementById('cursorSpotlight');
  let mouseX = 0, mouseY = 0;
  let spotX = 0, spotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateSpotlight() {
    spotX += (mouseX - spotX) * 0.08;
    spotY += (mouseY - spotY) * 0.08;
    spotlight.style.left = spotX + 'px';
    spotlight.style.top = spotY + 'px';
    requestAnimationFrame(animateSpotlight);
  }
  animateSpotlight();

  /* ── SCROLL REVEAL ────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ── SKILL BAR ANIMATION ──────────────────── */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
      }
    });
  }, {
    threshold: 0.3,
  });

  skillFills.forEach((bar) => skillObserver.observe(bar));

  /* ── NAV SCROLL STATE ─────────────────────── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  /* ── MOBILE MENU ──────────────────────────── */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── SMOOTH SCROLL FOR NAV LINKS ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── HERO PARALLAX ────────────────────────── */
  const heroContent = document.querySelector('.hero-content');
  const heroOrbs = document.querySelectorAll('.hero-orb');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      const ratio = scrolled / window.innerHeight;
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = 1 - ratio * 0.6;
      heroOrbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${scrolled * (0.05 + i * 0.03)}px)`;
      });
    }
  }, { passive: true });

  /* ── ACTIVE NAV LINK HIGHLIGHT ────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          if (link.getAttribute('href') === `#${id}`) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px',
  });

  sections.forEach((section) => sectionObserver.observe(section));

})();
