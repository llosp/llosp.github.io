// Self-contained enhancements for the G2 page. Kept independent from the main
// portfolio's module graph so it can't affect that page. Two things only:
// the reused cursor spotlight glow and the scroll reveal, both mirroring the
// portfolio's behaviour (pointer-only, and fully skipped under reduced motion).
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll reveals: add the same html.js-reveal hook the portfolio uses so
  //    the hidden start-state in scroll.css applies, then pop each .reveal in
  //    once on entry. Content stays visible if this never runs.
  if (!reduced && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.setProperty('--reveal-i', i % 4);
      io.observe(el);
    });
  }

  // ── Cursor spotlight glow (styling lives in base.css .cursor-glow). Pointer
  //    devices only. A single rAF coalescer eases the glow toward the pointer.
  if (!reduced && matchMedia('(hover: hover)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow is-hidden';
    document.body.appendChild(glow);
    let mx = 0, my = 0, gx = 0, gy = 0, raf = 0, seen = false;
    const half = () => glow.offsetWidth / 2;
    function frame() {
      gx += (mx - gx) * 0.18;
      gy += (my - gy) * 0.18;
      glow.style.transform = `translate(${gx - half()}px, ${gy - half()}px)`;
      if (Math.abs(mx - gx) > 0.5 || Math.abs(my - gy) > 0.5) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    }
    window.addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!seen) { gx = mx; gy = my; seen = true; glow.classList.remove('is-hidden'); }
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
  }
})();
