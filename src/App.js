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

  /* ---------------- 5. parallax depth (unused but kept for data-parallax elements) ---------------- */
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

  /* ---------------- 6. lightbox ---------------- */
  const frames = [...document.querySelectorAll('.frame')];
  const lb = document.getElementById('lightbox');
  if (lb && frames.length) {
    const stage = lb.querySelector('.lightbox__stage');
    const capT = lb.querySelector('.lightbox__cap .t');
    const capC = lb.querySelector('.lightbox__cap .c');
    let idx = 0;

    function imgFor(frame) {
      const slot = frame.querySelector('image-slot');
      const inner = slot && slot.shadowRoot && slot.shadowRoot.querySelector('img');
      const url = inner && inner.src && !inner.src.startsWith('data:image/svg') ? inner.src : null;
      return url;
    }
    function render() {
      const f = frames[idx];
      const url = imgFor(f);
      stage.innerHTML = '';
      if (url) {
        const im = document.createElement('img'); im.src = url; im.alt = f.dataset.place || '';
        stage.appendChild(im);
      } else {
        const ph = document.createElement('div'); ph.className = 'lightbox__ph';
        ph.innerHTML = `<span class="mono">IMG · ${f.dataset.slot || ''}</span><span class="mono" style="color:var(--faint)">photo coming soon</span>`;
        stage.appendChild(ph);
      }
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
      const btn = f.querySelector('.expand');
      if (btn) btn.addEventListener('click', e => { e.stopPropagation(); open(i); });
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
  }
})();
