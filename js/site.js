// everything the pages share: the ascii field, the masonry galleries, the
// index hover preview, the cursor pill, and the wiring that re-runs all of
// it after the router swaps a page in.

import { initRouter } from './router.js';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ── ascii field ──────────────────────────────────────────────────────── */

// a field of top-down raindrops: each ripple is a ring that expands from a
// point and weakens as it grows. scatter() is called the moment a page
// morph starts, and pushes every glyph outward and back so the field reads
// as reacting to the navigation rather than ignoring it.
function initAscii() {
  const canvas = document.querySelector('.ascii-background');
  if (!canvas || !canvas.getContext) return { scatter() {} };

  const ctx = canvas.getContext('2d');
  const chars = ['.', ':', '+', 'o', 'O', '#'];
  const cell = 20;
  const ringWidth = 28;
  const maxRipples = 14;
  const scatterMs = 400;
  const scatterDist = 26;

  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let ripples = [];
  let lastSpawn = 0;
  let nextSpawnDelay = 350;
  let scatterT0 = 0;

  function applyContextSettings() {
    ctx.font = 'bold 15px "Mono", "Courier New", monospace';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgb(0, 0, 0)';
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = Math.round(window.innerHeight * 1.2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    applyContextSettings();
    cols = Math.ceil(width / cell);
    rows = Math.ceil(height / cell);
  }

  function spawnRipple(now) {
    ripples.push({
      x: Math.random() * width,
      y: Math.random() * height,
      t0: now,
      life: 2600 + Math.random() * 1600,
      maxRadius: 80 + Math.random() * 150,
    });
    if (ripples.length > maxRipples) ripples.shift();
  }

  function drawFrame(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (now - lastSpawn > nextSpawnDelay) {
      spawnRipple(now);
      lastSpawn = now;
      nextSpawnDelay = 180 + Math.random() * 320;
    }

    ripples = ripples.filter((r) => now - r.t0 < r.life);

    // a sine envelope, so the glyphs travel out and come all the way back
    // rather than ending the transition displaced
    let push = 0;
    if (scatterT0) {
      const s = (now - scatterT0) / scatterMs;
      if (s >= 1) scatterT0 = 0;
      else push = Math.sin(s * Math.PI) * scatterDist;
    }

    const cx = width / 2;
    const cy = height / 2;

    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const px = gx * cell + cell / 2;
        const py = gy * cell + cell / 2;
        let best = 0;

        for (let i = 0; i < ripples.length; i++) {
          const r = ripples[i];
          const progress = (now - r.t0) / r.life;
          const radius = progress * r.maxRadius;
          const fade = 1 - progress;
          const dist = Math.hypot(px - r.x, py - r.y);
          const delta = Math.abs(dist - radius);
          if (delta < ringWidth) {
            const intensity = (1 - delta / ringWidth) * fade;
            if (intensity > best) best = intensity;
          }
        }

        if (best < 0.15) continue;
        const index = Math.min(chars.length - 1, Math.floor(((best - 0.15) / 0.85) * chars.length));

        let dx = 0;
        let dy = 0;
        if (push) {
          const ox = px - cx;
          const oy = py - cy;
          const len = Math.hypot(ox, oy) || 1;
          dx = (ox / len) * push;
          dy = (oy / len) * push;
        }

        ctx.globalAlpha = 0.15 + best * 0.4;
        ctx.fillText(chars[index], gx * cell + dx, gy * cell + dy);
      }
    }
    ctx.globalAlpha = 1;
  }

  resize();
  window.addEventListener('resize', resize);

  if (reduceMotion()) {
    const now = performance.now();
    spawnRipple(now - 1800);
    spawnRipple(now - 900);
    spawnRipple(now - 200);
    drawFrame(now);
    return { scatter() {} };
  }

  // setTimeout rather than a pure rAF chain: rAF gets fully suspended in
  // backgrounded tabs in some browsers, which would freeze the ripples
  // entirely instead of just slowing them down.
  (function loop() {
    drawFrame(performance.now());
    window.setTimeout(loop, 50);
  })();

  return {
    // the field re-forms around the page we are landing on, so the ripples
    // in flight are dropped and a fresh set is seeded
    scatter() {
      if (reduceMotion()) return;
      const now = performance.now();
      scatterT0 = now;
      ripples = [];
      for (let i = 0; i < 4; i++) spawnRipple(now - i * 140);
    },
  };
}

/* ── masonry galleries ────────────────────────────────────────────────── */

// each item goes into the leftmost column that's within one row-gap of the
// shortest available column, so images prefer sitting left and only drop to
// a shorter column further right when the left one is meaningfully taller.
// an item spans --span columns at rest and twice that when expanded, and a
// multi-column item aligns to the tallest column it covers.
function layoutMasonryGrids() {
  document.querySelectorAll('.layout-grid_list').forEach((container) => {
    const style = getComputedStyle(container);
    const columns = parseInt(style.getPropertyValue('--columns'), 10) || 1;
    const columnGap = parseFloat(style.columnGap) || 0;
    const rowGap = parseFloat(style.rowGap) || 0;
    const baseSpan = parseInt(style.getPropertyValue('--span'), 10) || 1;
    // columns on the left that stay empty, so a gallery can start further in
    const skip = Math.min(parseInt(style.getPropertyValue('--skip'), 10) || 0, columns - 1);
    const columnWidth = (container.clientWidth - (columns - 1) * columnGap) / columns;
    const colHeights = new Array(columns).fill(0);
    const items = [...container.children].filter((el) => el.classList.contains('layout-grid_item'));

    items.forEach((item) => {
      const wanted = item.classList.contains('is--active') ? baseSpan * 2 : baseSpan;
      const span = Math.min(wanted, columns);

      let minTop = Infinity;
      for (let i = skip; i <= columns - span; i++) {
        minTop = Math.min(minTop, Math.max(...colHeights.slice(i, i + span)));
      }

      let bestCol = skip;
      let bestTop = minTop;
      for (let j = skip; j <= columns - span; j++) {
        const top = Math.max(...colHeights.slice(j, j + span));
        if (top <= minTop + rowGap) {
          bestCol = j;
          bestTop = top;
          break;
        }
      }

      item.style.left = `${bestCol * (columnWidth + columnGap)}px`;
      item.style.top = `${bestTop}px`;

      const newHeight = bestTop + item.offsetHeight + rowGap;
      for (let k = bestCol; k < bestCol + span; k++) colHeights[k] = newHeight;
    });

    const maxHeight = Math.max(0, ...colHeights);
    container.style.height = `${Math.max(maxHeight - rowGap, 0)}px`;
  });
}

// opening an item moves every other item in the grid, so it cannot simply
// be measured in place. width is mid-transition at the moment of the click,
// so reading offsetHeight then would measure the OLD size: the item is
// snapped to its final size with no transition, the masonry is remeasured
// against that true footprint, and only then is it animated from where it
// actually started.
function toggleGridItem(item) {
  const startWidth = item.getBoundingClientRect().width;
  const startTop = item.style.top;
  const startLeft = item.style.left;
  const isActive = item.classList.toggle('is--active');

  item.style.transition = 'none';
  void item.offsetHeight;
  layoutMasonryGrids();
  const finalTop = item.style.top;
  const finalLeft = item.style.left;

  item.style.width = `${startWidth}px`;
  item.style.top = startTop;
  item.style.left = startLeft;
  void item.offsetHeight;

  requestAnimationFrame(() => {
    item.style.transition = '';
    item.style.width = '';
    item.style.top = finalTop;
    item.style.left = finalLeft;
  });

  return isActive;
}

function initGallery(scope) {
  scope.querySelectorAll('.layout-grid_item .frame').forEach((frame) => {
    frame.addEventListener('click', () => {
      const isActive = toggleGridItem(frame.closest('.layout-grid_item'));

      const video = frame.querySelector('video');
      if (!video) return;
      if (isActive) video.play().catch(() => {});
      else {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
}

/* ── reveal and video on scroll ───────────────────────────────────────── */

// the reveal class is added by script rather than by the build, so a page
// with no javascript shows everything instead of nothing.
function initReveal(scope) {
  const targets = [...scope.querySelectorAll('.cs-section, .gallery, .about-block')];

  if (!('IntersectionObserver' in window) || reduceMotion()) return;

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is--revealed');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 }
  );

  targets.forEach((el) => observer.observe(el));
}

// gallery videos have no controls, so they play while they are on screen
// and pause when they are not, instead of sitting on a frozen first frame
// a video hero plays whenever it is on screen, unlike a video cover in the
// index, which waits to be hovered. on the case study the clip is the
// subject of the page, so making the reader hover it to see it is backwards.
function initVideos(scope) {
  const videos = [...scope.querySelectorAll('.frame--video video, video.cs-cover_img')];
  if (!videos.length) return;

  if (!('IntersectionObserver' in window)) {
    videos.forEach((v) => v.play().catch(() => {}));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach((v) => observer.observe(v));
}

/* ── section rail ─────────────────────────────────────────────────────── */

// the left rail on wide screens. the link for the section currently under
// the top third of the window is marked, so the rail doubles as a progress
// readout. the rail is display: none below its breakpoint, so the observer
// is harmless there.
function initRail(scope) {
  const links = [...scope.querySelectorAll('.cs-rail a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const sections = [...byId.keys()].map((id) => scope.querySelector(`#${CSS.escape(id)}`)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(entry.target.id).setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  sections.forEach((el) => observer.observe(el));

  // a rail link glides to its section instead of jumping. done by hand so the
  // easing and length are ours, and so the router never sees a hash change.
  links.forEach((a) => {
    a.addEventListener('click', (event) => {
      const target = scope.querySelector(`#${CSS.escape(a.getAttribute('href').slice(1))}`);
      if (!target) return;
      event.preventDefault();

      const to = Math.max(0, target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.08);
      if (reduceMotion()) {
        window.scrollTo(0, to);
        return;
      }

      const from = window.scrollY;
      const distance = to - from;
      const duration = Math.min(1100, 450 + Math.abs(distance) * 0.25);
      const start = performance.now();
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, from + distance * ease(t));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
}

/* ── work covers ──────────────────────────────────────────────────────── */

// the covers are the work index. each one is also the element the router
// morphs into the case study hero, which is why it is a real img in the page
// rather than something drawn on hover.
//
function initCovers(scope) {
  const items = [...scope.querySelectorAll('.covers_item')];
  if (!items.length) return;

  // a cover that is a video loops on its own while it is on screen and
  // pauses when it scrolls away, so clips that nobody can see are not decoding
  if (reduceMotion()) return;
  const videos = items
    .map((item) => item.querySelector('video.covers_media'))
    .filter(Boolean);
  if (!videos.length) return;

  if (!('IntersectionObserver' in window)) {
    videos.forEach((v) => v.play().catch(() => {}));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {});
        else target.pause();
      });
    },
    { threshold: 0.25 }
  );
  videos.forEach((v) => observer.observe(v));
}

/* ── cursor pill ──────────────────────────────────────────────────────── */

const PILL_TARGETS = '.covers_item, a.cs-nav_link';

// replaces the cursor over anything that opens a case study with the command
// the click runs. hidden on touch and under reduced motion by the stylesheet,
// and never started here either, so there is no rAF loop running for nothing.
function initCursorPill() {
  const pill = document.querySelector('.cursor-pill');
  if (!pill || !finePointer() || reduceMotion()) return;

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let visible = false;
  let raf = 0;

  function frame() {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    pill.style.transform = `translate3d(${Math.round(x + 14)}px, ${Math.round(y + 16)}px, 0)`;
    raf = visible ? requestAnimationFrame(frame) : 0;
  }

  document.addEventListener(
    'mousemove',
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true }
  );

  document.addEventListener('mouseover', (event) => {
    const row = event.target.closest(PILL_TARGETS);
    if (!row) return;

    pill.textContent = `[ open ~/work/${row.dataset.slug} ]`;
    pill.classList.add('is--visible');

    // start the pill at the cursor rather than letting it fly in from
    // wherever it was last parked
    if (!visible) {
      x = targetX;
      y = targetY;
    }
    visible = true;
    if (!raf) raf = requestAnimationFrame(frame);
  });

  document.addEventListener('mouseout', (event) => {
    if (!event.target.closest(PILL_TARGETS)) return;
    if (event.relatedTarget && event.relatedTarget.closest(PILL_TARGETS)) return;
    visible = false;
    pill.classList.remove('is--visible');
  });
}

/* ── per page wiring ──────────────────────────────────────────────────── */

function initPage() {
  const app = document.querySelector('#app');
  if (!app) return;

  initReveal(app);
  initRail(app);
  initVideos(app);
  initCovers(app);
  initGallery(app);
  layoutMasonryGrids();
}

const ascii = initAscii();

initPage();
initCursorPill();

window.addEventListener('load', layoutMasonryGrids);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutMasonryGrids);

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(layoutMasonryGrids, 100);
});

initRouter({
  onSwap: initPage,
  layout: layoutMasonryGrids,
  onTransition: () => ascii.scatter(),
});
