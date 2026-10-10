// HAKKOTAI product page: scroll reveals, the scroll-lit statement, the glow
// scene scrub and the product bar's scroll-spy. Everything degrades to a fully
// readable static page without JS (see the .js guards in home.css).
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  // Never let product shots be ghost-dragged out of the page.
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  // ---------- reveal on scroll ----------
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => revealIO.observe(el));

  // ---------- statement: split into words that light up as they pass ----------
  const statement = document.querySelector('[data-words]');
  const words = [];
  if (statement) {
    const wrap = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = 'w';
              span.textContent = part;
              words.push(span);
              frag.appendChild(span);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrap(child);
        }
      });
    };
    wrap(statement);
    if (reduceMotion) words.forEach((w) => w.classList.add('is-lit'));
  }

  // ---------- glow scene ----------
  const glow = document.querySelector('.h-glow');

  // ---------- product bar ----------
  const bar = document.getElementById('pbar');

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const vh = window.innerHeight;

    if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 8);

    if (words.length && !reduceMotion) {
      const line = vh * 0.72;
      for (const w of words) {
        w.classList.toggle('is-lit', w.getBoundingClientRect().top < line);
      }
    }

    if (glow) {
      const r = glow.getBoundingClientRect();
      const travel = r.height - vh;
      const p = clamp(-r.top / travel);
      // Hold the lit state for the first stretch, cross to dark through the
      // middle, then hold dark so the glow can be looked at.
      const t = clamp((p - 0.22) / 0.42);
      const k = t * t * (3 - 2 * t);
      glow.style.setProperty('--k', k.toFixed(4));
    }
  };

  const requestTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  };
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  onScroll();

  // ---------- scroll-spy for the product bar links ----------
  const links = Array.from(document.querySelectorAll('.pbar-links [data-spy]'));
  if (links.length) {
    const setActive = (id) =>
      links.forEach((a) => a.classList.toggle('is-active', a.dataset.spy === id));
    const spyIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach((a) => {
      const section = document.getElementById(a.dataset.spy);
      if (section) spyIO.observe(section);
    });
  }
})();
