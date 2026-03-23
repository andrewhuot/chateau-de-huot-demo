// main.js — Navigation, GSAP, scroll reveals

document.addEventListener('DOMContentLoaded', () => {

  // ── Stat number pop-in on scroll ──────────────────────────────────────────
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));
  // Nav scroll shrink
  const nav = document.querySelector('.site-nav-wrapper');
  const SCROLL_THRESHOLD = 50;

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }, { passive: true });

  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
    });
  });

  // Intersection Observer for .reveal elements
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  // GSAP animations (if GSAP is loaded)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on hero images
    document.querySelectorAll('.parallax-img img').forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.parallax-img'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Stagger reveals for grid items
    document.querySelectorAll('.gsap-stagger').forEach(container => {
      gsap.fromTo(container.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          }
        }
      );
    });

    // Hero text animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.from(heroContent.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
      });
    }
  }

  // Active nav link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
