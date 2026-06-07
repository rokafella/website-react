/* =========================================================================
   ROHIT KAPOOR — interaction layer
   ========================================================================= */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------- 1. animated data-grid field (hero bg) ---------------- */
  const canvas = document.getElementById('grid-field');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, nodes = [], raf = null, t = 0;
    const mouse = { x: -999, y: -999 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    function build() {
      nodes = [];
      const gap = Math.max(58, Math.min(w, h) / 14);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            ox: i * gap, oy: j * gap,
            x: i * gap, y: j * gap,
            ph: Math.random() * Math.PI * 2,
            sp: 0.4 + Math.random() * 0.6
          });
        }
      }
    }
    function draw() {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        const sway = reduce ? 0 : Math.sin(t * n.sp + n.ph) * 4;
        n.x = n.ox + sway; n.y = n.oy + Math.cos(t * n.sp + n.ph) * 4;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const near = d2 < 24000;
        const base = near ? 0.55 * (1 - d2 / 24000) : 0;
        const tw = 0.06 + (reduce ? 0 : (Math.sin(t * 2 + n.ph) * 0.5 + 0.5) * 0.09);
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 1.6 : 1, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.847 0.128 196 / ${Math.min(0.7, tw + base)})`;
        ctx.fill();
      }
      if (mouse.x > -500) {
        for (const n of nodes) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 20000) {
            const a = 0.18 * (1 - d2 / 20000);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `oklch(0.847 0.128 196 / ${a})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    function start() { if (!raf) draw(); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }, { passive: true });
    window.addEventListener('pointerleave', () => { mouse.x = -999; mouse.y = -999; });
    const hero = document.querySelector('.hero');
    function vis() {
      if (!hero) return start();
      const r = hero.getBoundingClientRect();
      (r.bottom > 0 && r.top < window.innerHeight) ? start() : stop();
    }
    vis();
    window.addEventListener('scroll', vis, { passive: true });
  }

  /* ---------------- 2. custom cursor ---------------- */
  if (fine) {
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const hot = 'a, button, .frame, .chip, image-slot, .lightbox__nav';
    document.addEventListener('pointerover', e => {
      if (e.target.closest(hot)) ring.classList.add('hot');
    });
    document.addEventListener('pointerout', e => {
      if (e.target.closest(hot) && !e.relatedTarget?.closest?.(hot)) ring.classList.remove('hot');
    });
    document.addEventListener('pointerdown', () => ring.classList.add('hot'));
    document.addEventListener('pointerup', () => ring.classList.remove('hot'));
  }

  /* ---------------- 3. reveal on scroll ---------------- */
  const reveals = [...document.querySelectorAll('.reveal')];
  if (reduce) {
    reveals.forEach(r => r.classList.add('in'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (e.target.dataset.delay || 0) + 'ms';
        e.target.classList.add('in');
        setTimeout(() => e.target.classList.add('shown'), 1500);
        observer.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px 200px 0px' });
    reveals.forEach(r => observer.observe(r));
  }

  /* ---------------- 4. stat counter ---------------- */
  const statBand = document.querySelector('.stat-band');
  if (statBand) {
    const counters = [...statBand.querySelectorAll('.count-val')];
    let running = false;
    const countObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        counters.forEach(el => { el.textContent = '0'; });
        running = false;
        return;
      }
      if (running) return;
      running = true;
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = target <= 5 ? 800 : target <= 20 ? 650 : 550;
        const start = performance.now();
        let last = -1;
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          if (current !== last) {
            el.textContent = current;
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
            last = current;
          }
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
    countObserver.observe(statBand);
  }

  /* ---------------- 5. sys online blur on scroll ---------------- */
  const sysTl = document.querySelector('.telemetry .corner.tl');
  if (sysTl) {
    const updateSys = () => sysTl.classList.toggle('sys-away', window.scrollY > 20);
    window.addEventListener('scroll', updateSys, { passive: true });
    updateSys();
  }

  /* ---------------- 6. parallax depth (unused but kept for data-parallax elements) ---------------- */
  if (!reduce) {
    const layers = document.querySelectorAll('[data-parallax]');
    let ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const vy = window.scrollY;
        layers.forEach(l => {
          const sp = parseFloat(l.dataset.parallax);
          l.style.transform = `translate3d(0, ${vy * sp}px, 0)`;
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- 5. live clock (telemetry) ---------------- */
  const clk = document.getElementById('clk');
  if (clk) {
    const fmt = () => {
      const d = new Date();
      const t = d.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Europe/London' });
      clk.textContent = t + ' GMT';
    };
    fmt(); setInterval(fmt, 1000);
  }

  /* ---------------- 6. photo protection (gallery only, not lightbox) ---------------- */
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('contextmenu', e => e.preventDefault());
    gallery.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------------- 7. lightbox ---------------- */
  const frames = [...document.querySelectorAll('.frame[data-src]')];
  const lb = document.getElementById('lightbox');
  if (lb && frames.length) {
    const stage = lb.querySelector('.lightbox__stage');
    const capT = lb.querySelector('.lightbox__cap .t');
    const capC = lb.querySelector('.lightbox__cap .c');
    let idx = 0;

    function render() {
      const f = frames[idx];
      stage.innerHTML = '';
      const im = document.createElement('img');
      im.src = f.dataset.src; im.alt = f.dataset.place || '';
      im.addEventListener('contextmenu', e => e.preventDefault());
      im.addEventListener('dragstart', e => e.preventDefault());
      stage.appendChild(im);
      capT.textContent = f.dataset.place || '';
      capC.textContent = f.dataset.coord || '';
    }
    function open(i) {
      idx = i; render(); lb.classList.add('open');
      document.body.style.overflow = 'hidden'; lb.focus();
      clearTimeout(lb._t);
      lb._t = setTimeout(() => { lb.style.cssText = 'transition:none;opacity:1;visibility:visible'; }, 420);
    }
    function close() {
      clearTimeout(lb._t);
      lb.classList.remove('open');
      lb.style.cssText = 'transition:none;opacity:0;visibility:hidden';
      document.body.style.overflow = '';
    }
    function go(n) { idx = (n + frames.length) % frames.length; render(); }

    frames.forEach((f, i) => {
      f.addEventListener('click', () => open(i));
    });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.prev').addEventListener('click', () => go(idx - 1));
    lb.querySelector('.next').addEventListener('click', () => go(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    });
    // swipe gestures
    let tsX = 0;
    lb.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tsX;
      if (Math.abs(dx) > 50) dx < 0 ? go(idx + 1) : go(idx - 1);
    }, { passive: true });
  }

  /* ---------------- 8. typewriter kicker ---------------- */
  const kicker = document.querySelector('.hero__kicker .mono:last-child');
  if (kicker && !reduce) {
    const text = kicker.textContent;
    kicker.textContent = '|';
    let i = 0;
    const type = () => {
      i++;
      if (i < text.length) {
        kicker.textContent = text.slice(0, i) + '|';
        setTimeout(type, 48);
      } else {
        kicker.textContent = text;
      }
    };
    setTimeout(type, 700);
  }

  /* ---------------- 9. matrix glitch on section numbers (repeating) ---------------- */
  if (!reduce) {
    const glitchChars = 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ!@#$%^&*';
    function matrixGlitch(el, final) {
      const charState = [...final].map((target, i) => ({
        target,
        settleAt: 300 + i * 180 + Math.random() * 100,
        settled: false,
      }));
      const start = performance.now();
      el.style.color = 'var(--ink)';
      let rafId;
      function tick(now) {
        const elapsed = now - start;
        let done = true;
        el.textContent = charState.map(c => {
          if (!c.settled && elapsed >= c.settleAt) c.settled = true;
          if (c.settled) return c.target;
          done = false;
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }).join('');
        if (!done) { rafId = requestAnimationFrame(tick); }
        else { el.textContent = final; el.style.color = ''; }
      }
      rafId = requestAnimationFrame(tick);
      return () => { cancelAnimationFrame(rafId); el.style.color = ''; el.textContent = final; };
    }

    function attachGlitch(el, orig, initialDelay = 0) {
      let cancel = null;
      let repeatIv = null;
      function start() {
        if (repeatIv) return;
        cancel = matrixGlitch(el, orig);
        repeatIv = setInterval(() => {
          if (cancel) cancel();
          cancel = matrixGlitch(el, orig);
        }, 5000);
      }
      function stop() {
        if (cancel) cancel();
        clearInterval(repeatIv);
        repeatIv = null; cancel = null;
        el.textContent = orig; el.style.color = '';
      }
      return { start, stop };
    }

    // Hero 01 — always in viewport, trigger after load
    const heroIdx = document.querySelector('.hero__kicker .hero-num');
    if (heroIdx) {
      const orig = heroIdx.textContent;
      const g = attachGlitch(heroIdx, orig);
      setTimeout(g.start, 1200);
    }

    // Section headings 02–04 — trigger via IO
    document.querySelectorAll('.sec-head').forEach(head => {
      const idx = head.querySelector('.idx');
      if (!idx) return;
      const orig = idx.textContent;
      const g = attachGlitch(idx, orig);
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) g.start();
        else g.stop();
      }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
      obs.observe(head);
    });
  }

  /* ---------------- 10. gallery parallax ---------------- */
  const frameImgs = [...document.querySelectorAll('.frame__img')];
  if (frameImgs.length && !reduce) {
    let frameCache = [];
    function cacheFrames() {
      frameCache = frameImgs.map(img => {
        const frame = img.closest('.frame');
        const rect = frame.getBoundingClientRect();
        return { img, top: rect.top + window.scrollY, height: rect.height };
      });
    }
    cacheFrames();
    window.addEventListener('resize', cacheFrames, { passive: true });

    let pTicking = false;
    const updateParallax = () => {
      if (pTicking) return;
      pTicking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const vh = window.innerHeight;
        frameCache.forEach(({ img, top, height }) => {
          const center = top + height / 2 - sy;
          const offset = ((vh / 2 - center) / vh) * 160;
          img.style.transform = `translate3d(0,${Math.max(-140, Math.min(140, offset))}px,0)`;
        });
        pTicking = false;
      });
    };
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  /* ---------------- 11. magnetic elements ---------------- */
  if (fine) {
    function makeMagnetic(el, strength = 0.35) {
      el.classList.remove('shown');
      // Force inline transition every pointermove — overrides .reveal's 0.9s and shown's none
      el.addEventListener('pointermove', e => {
        el.classList.remove('shown');
        el.style.transition = 'transform 0.15s cubic-bezier(0.22,1,0.36,1)';
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        el.style.transform = '';
      });
    }

    document.querySelectorAll('.contact__links a').forEach(el => makeMagnetic(el, 0.35));
    const mailEl = document.querySelector('.contact__mail');
    if (mailEl) makeMagnetic(mailEl, 0.18);

    // Work section — numbers only, not labels
    document.querySelectorAll('.stat .num').forEach(el => makeMagnetic(el, 0.3));
  }

  /* ---------------- 14. image shimmer ---------------- */
  document.querySelectorAll('.frame[data-src]').forEach(frame => {
    frame.classList.add('img-loading');
    const img = new Image();
    img.onload = () => frame.classList.remove('img-loading');
    img.src = frame.dataset.src;
  });

})();
