'use strict';

(function() {
  const loadingScreen = document.getElementById('loading-screen');
  const loaderBar = document.getElementById('loaderBar');
  const loaderText = document.getElementById('loaderText');

  if (loadingScreen) {
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
      if (loaderBar) loaderBar.style.width = pct + '%';
      if (loaderText) loaderText.textContent = msg;
      if (stepIndex < steps.length) {
        setTimeout(nextStep, 380 + Math.random() * 200);
      } else {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = '';
          triggerEntranceAnimations();
        }, 600);
      }
    }

    document.body.style.overflow = 'hidden';
    setTimeout(nextStep, 300);
  }

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

  function initParticles() {
    if (typeof particlesJS !== 'undefined') {
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
    } else {
      console.warn('Particles.js not loaded, skipping.');
    }
  }
  initParticles();

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: true,
      offset: 80,
      disable: false
    });
  }

  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    let ticking = false;
    function updateScrollIndicator() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollIndicator.style.width = Math.min(scrollPct, 100) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollIndicator);
        ticking = true;
      }
    }, { passive: true });
  }

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = document.querySelectorAll('.nav-link');

  if (navbar) {
    let scrollTicking = false;
    function updateNavbar() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      scrollTicking = false;
    }
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateNavbar);
        scrollTicking = true;
      }
    }, { passive: true });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navAnchors.forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const parallaxBg = document.getElementById('parallaxBg');
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');
  const heroSection = document.querySelector('.hero');

  if (parallaxBg && heroSection) {
    let mouseX = 0, mouseY = 0;
    let scrollYoffset = 0;
    let rafId = null;

    function updateParallaxTransform() {
      if (!parallaxBg) return;
      const moveX = mouseX * 6;
      const moveY = mouseY * 4;
      const limit = 10;
      const limitedX = Math.min(Math.max(moveX, -limit), limit);
      const limitedY = Math.min(Math.max(moveY, -limit), limit);
      parallaxBg.style.transform = `translate(${limitedX}px, ${limitedY}px) translateY(${scrollYoffset * 0.2}px)`;
      if (orb1) orb1.style.transform = `translateY(${scrollYoffset * 0.08}px)`;
      if (orb2) orb2.style.transform = `translateY(${-scrollYoffset * 0.06}px)`;
      if (orb3) orb3.style.transform = `translateY(${scrollYoffset * 0.04}px)`;
      rafId = null;
    }

    function onScrollParallax() {
      scrollYoffset = window.scrollY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallaxTransform);
      }
    }

    function onMouseMove(e) {
      if (window.scrollY > window.innerHeight) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      mouseX = dx;
      mouseY = dy;
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallaxTransform);
      }
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      document.addEventListener('mousemove', onMouseMove, { passive: true });
    }
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    onScrollParallax();
  }

  function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.5;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
    `;

    const originalPosition = window.getComputedStyle(element).position;
    if (originalPosition === 'static') {
      element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  document.querySelectorAll('.btn, .link-card, .feature-card, .footer-social a').forEach(el => {
    el.addEventListener('click', function(e) {
      createRipple(e, this);
    });
  });

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    let ticking = false;
    function updateBackToTop() {
      backToTop.classList.toggle('show', window.scrollY > 400);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateBackToTop);
        ticking = true;
      }
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const tickerContent = document.getElementById('tickerContent');
  if (tickerContent && tickerContent.parentNode) {
    const clone = tickerContent.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    tickerContent.parentNode.appendChild(clone);
  }

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  function initGSAPScrollAnimations() {
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
      const rawText = el.textContent.trim();
      let target = parseFloat(rawText.replace(/\./g, '').replace(',', '.'));
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
  }
  initGSAPScrollAnimations();

  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksArr = document.querySelectorAll('.nav-link');
    function updateActive() {
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let currentId = '';
      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollMid >= top && scrollMid < bottom) {
          currentId = section.getAttribute('id');
        }
      });
      navLinksArr.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    updateActive();
  }
  initActiveNavLink();

  function initCardTilt() {
    const cards = document.querySelectorAll('.link-card, .feature-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -5;
        const rotateY = ((x - cx) / cx) * 5;
        this.style.transform = `translateY(-8px) scale(1.01) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
      });
    });
  }
  initCardTilt();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  if ('IntersectionObserver' in window) {
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
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof AOS !== 'undefined') AOS.refresh();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 250);
  });
})();