'use strict';

(function initLoader() {
  const screen = document.getElementById('loading-screen');
  const bar = document.getElementById('loaderBar');
  const text = document.getElementById('loaderText');

  const steps = [
    { pct: 20, msg: 'Memuat assets...' },
    { pct: 45, msg: 'Menyiapkan tampilan...' },
    { pct: 70, msg: 'Menghubungkan sistem...' },
    { pct: 90, msg: 'Hampir selesai...' },
    { pct: 100, msg: 'Selamat datang! 🚀' },
  ];

  let stepIndex = 0;

  function nextStep() {
    if (stepIndex >= steps.length) return;
    const { pct, msg } = steps[stepIndex++];
    bar.style.width = pct + '%';
    text.textContent = msg;

    if (stepIndex < steps.length) {
      setTimeout(nextStep, 380 + Math.random() * 200);
    } else {
      setTimeout(hideLoader, 600);
    }
  }

  function hideLoader() {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
    triggerEntranceAnimations();
  }

  document.body.style.overflow = 'hidden';
  setTimeout(nextStep, 300);
})();

function triggerEntranceAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo('.hero-badge',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
  );
  gsap.fromTo('.hero-title',
    { opacity: 0, y: 60, skewY: 3 },
    { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power4.out', delay: 0.3 }
  );
  gsap.fromTo('.subtitle-badge',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.12, delay: 0.7 }
  );
  gsap.fromTo(['.hero-desc', '.hero-cta'],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15, delay: 1 }
  );
  gsap.fromTo('.stat-item',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 1.3 }
  );

  setTimeout(() => {
    const titleSpans = document.querySelectorAll('.glow-text, .glow-text-purple');
    titleSpans.forEach(el => {
      el.style.animation = 'neonFlicker 6s infinite alternate';
    });
  }, 2000);
}

(function initParticles() {
  if (typeof particlesJS === 'undefined') return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 900 } },
      color: { value: ['#00f0ff', '#7a00ff', '#a855f7', '#00a8ff'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.45,
        random: true,
        anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false }
      },
      size: {
        value: 2.2,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 140,
        color: '#00f0ff',
        opacity: 0.08,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        attract: { enable: false }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.25 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
})();

(function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 700,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    offset: 80,
    disable: false
  });
})();

(function initScrollIndicator() {
  const indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    indicator.style.width = Math.min(scrollPct, 100) + '%';
  }, { passive: true });
})();

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
    navAnchors.forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

(function initParallax() {
  const parallaxBg = document.getElementById('parallaxBg');
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');
  const heroSection = document.querySelector('.hero');
  if (!parallaxBg) return;

  function onScroll() {
    const scrollY = window.scrollY;
    const heroH = heroSection ? heroSection.offsetHeight : window.innerHeight;
    if (scrollY <= heroH + 100) {
      parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (orb1) orb1.style.transform = `translateY(${scrollY * 0.08}px)`;
      if (orb2) orb2.style.transform = `translateY(${-scrollY * 0.06}px)`;
      if (orb3) orb3.style.transform = `translateY(${scrollY * 0.04}px)`;
    }
  }

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    function onMouseMove(e) {
      if (window.scrollY > window.innerHeight) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const limit = 10;
      const moveX = Math.min(Math.max(dx * 6, -limit), limit);
      const moveY = Math.min(Math.max(dy * 4, -limit), limit);
      parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px) translateY(${window.scrollY * 0.2}px)`;
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function initRipple() {
  document.querySelectorAll('.btn, .link-card, .feature-card, .footer-social a').forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 1.5;
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
})();

(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

(function initTicker() {
  const ticker = document.getElementById('tickerContent');
  if (!ticker) return;
  const clone = ticker.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  ticker.parentNode.appendChild(clone);
})();

(function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

(function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo('.feature-card',
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 85%',
      }
    }
  );

  document.querySelectorAll('.reward-points').forEach(el => {
    const target = parseFloat(el.textContent.replace(/\./g, '').replace(',', '.'));
    if (isNaN(target)) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val).toLocaleString('id-ID');
          }
        });
      }
    });
  });

  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          once: true,
        }
      }
    );
  });
})();

(function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActive() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollMid >= top && scrollMid < bottom) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.style.color = href === id ? 'var(--cyan)' : '';
        });
      }
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

(function initCardTilt() {
  const cards = document.querySelectorAll('.link-card, .feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) * 5;
      this.style.transform = `translateY(-8px) scale(1.01) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.1s ease';
    });
  });
})();

(function initWAPulse() {
  const waBtn = document.getElementById('waBtn');
  if (!waBtn) return;
  waBtn.addEventListener('mouseenter', () => {
    waBtn.style.animation = 'none';
  });
})();

(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();

(function initCardObserver() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.link-card').forEach(card => {
    observer.observe(card);
  });
})();

(function initResizeHandler() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof AOS !== 'undefined') AOS.refresh();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 250);
  });
})();