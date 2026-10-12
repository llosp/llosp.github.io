// HAKKOTAI product page: scroll reveals, the scroll-lit statement, the glow
// scene scrub and the product bar's scroll-spy. Everything degrades to a fully
// readable static page without JS (see the .js guards in home.css).
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smoothstep = (v) => {
    const t = clamp(v);
    return t * t * (3 - 2 * t);
  };

  // Never let product shots be ghost-dragged out of the page.
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  // ---------- hero guitar tilt (critically damped spring) ----------
  // A real spring, not a CSS transition: the transition approach restarts
  // from scratch on every pointermove, so a quick reversal snaps through a
  // "brick wall" instead of carrying velocity. Driving --gx/--gy from a spring
  // loop means the tilt is always animating from its current on-screen value
  // and can be redirected mid-flight without a seam.
  (function heroTilt() {
    const hero = document.querySelector('.h-hero');
    const guitar = document.querySelector('.h-hero-guitar');
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hero || !guitar || !finePointer || reduceMotion) return;

    const MAX_Y = 6; // deg, left/right lean
    const MAX_X = 4; // deg, forward/back tilt
    const ANGULAR_FREQ = 15; // rad/s; higher = snappier settle, no overshoot
    const EPSILON = 0.01;

    let targetX = 0, targetY = 0;
    let posX = 0, posY = 0;
    let velX = 0, velY = 0;
    let raf = 0;

    // Exact closed-form critically damped spring step (Juckett).
    const step = (pos, vel, target, dt) => {
      const c = pos - target;
      const co = vel + ANGULAR_FREQ * c;
      const e = Math.exp(-ANGULAR_FREQ * dt);
      return [target + (c + co * dt) * e, e * co - ANGULAR_FREQ * e * (c + co * dt)];
    };

    // No dt clamp: the closed form is exact for any step size, so a long
    // gap (tab backgrounded, slow frame) still lands in the right place
    // instead of crawling back in slow motion on the next tick.
    let last = 0;
    const tick = (now) => {
      const dt = (now - last) / 1000 || 1 / 60;
      last = now;
      [posX, velX] = step(posX, velX, targetX, dt);
      [posY, velY] = step(posY, velY, targetY, dt);
      guitar.style.setProperty('--gx', posX.toFixed(3) + 'deg');
      guitar.style.setProperty('--gy', posY.toFixed(3) + 'deg');

      const settled =
        Math.abs(posX - targetX) < EPSILON && Math.abs(velX) < EPSILON &&
        Math.abs(posY - targetY) < EPSILON && Math.abs(velY) < EPSILON;
      if (settled) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetY = nx * MAX_Y * 2;
      targetX = -ny * MAX_X * 2;
      wake();
    });
    hero.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      wake();
    });
  })();

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

  // ---------- statement: pinned plate, lit letter by letter, then shattered ----------
  const statementSection = document.querySelector('.h-statement');
  const sticky = document.querySelector('.h-statement-sticky');
  const plate = document.querySelector('[data-plate]');
  const shatter = document.querySelector('[data-shatter]');
  const statement = document.querySelector('[data-words]');
  const chars = [];
  // Captured before the split: every fragment reuses the plain markup rather
  // than carrying its own copy of the per-letter spans.
  const plateHTML = statement ? statement.innerHTML : '';
  if (statement) {
    const wrap = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          Array.from(child.textContent).forEach((ch) => {
            if (/\s/.test(ch)) {
              frag.appendChild(document.createTextNode(ch));
            } else {
              const span = document.createElement('span');
              span.className = 'w';
              span.textContent = ch;
              chars.push(span);
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

    if (reduceMotion) {
      chars.forEach((c) => c.classList.add('is-lit'));
      if (statementSection) statementSection.classList.add('is-static');
    }
  }

  // Letters light in reading order; only the letters that changed get touched
  // so a scroll frame isn't restyling the whole paragraph.
  let litCount = 0;
  const setLit = (n) => {
    const target = clamp(Math.round(n), 0, chars.length);
    while (litCount < target) chars[litCount++].classList.add('is-lit');
    while (litCount > target) chars[--litCount].classList.remove('is-lit');
  };

  // ---------- shatter: the plate cut into shards around an impact point ----------
  // Radii are stored per (ring, angle) rather than per shard so neighbours
  // share their exact vertices and the unbroken plate has no visible seams.
  let shards = [];
  const buildShards = () => {
    if (!plate || !shatter) return;
    const box = plate.getBoundingClientRect();
    if (!box.width || !box.height) return;

    let seed = 20260412;
    const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

    const TAU = Math.PI * 2;
    const narrow = box.width < 760;
    const sectors = 9;
    const bands = narrow ? [.22, .44, .68, 1.7] : [.16, .34, .54, .78, 1.7];
    // Narrow screens get shorter throws: the same travel there pulls the
    // fragments so far apart that the sentence reads as copies of itself.
    const throwScale = narrow ? .36 : .55;
    const cx = box.width * .5;
    const cy = box.height * .46;
    const reach = Math.hypot(Math.max(cx, box.width - cx), Math.max(cy, box.height - cy));

    const angles = [];
    for (let i = 0; i < sectors; i++) {
      angles.push((i / sectors) * TAU + (rand() - .5) * (TAU / sectors) * .6);
    }
    // The outer band stays past the corners so the shards cover the whole plate.
    const radii = bands.map((b, k) =>
      angles.map(() => reach * b * (k === bands.length - 1 ? 1 : .8 + rand() * .4))
    );

    const vertex = (ring, i) => {
      const a = angles[i % sectors];
      const r = radii[ring][i % sectors];
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    const pct = (p) =>
      ((p[0] / box.width) * 100).toFixed(2) + '% ' + ((p[1] / box.height) * 100).toFixed(2) + '%';

    shatter.textContent = '';
    shards = [];
    for (let ring = 0; ring < bands.length; ring++) {
      for (let i = 0; i < sectors; i++) {
        const pts = ring === 0
          ? [[cx, cy], vertex(0, i), vertex(0, i + 1)]
          : [vertex(ring - 1, i), vertex(ring - 1, i + 1), vertex(ring, i + 1), vertex(ring, i)];

        const gx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
        const gy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
        const gr = Math.hypot(gx - cx, gy - cy) || 1;

        const el = document.createElement('div');
        el.className = 'h-shatter-piece';
        el.style.clipPath = 'polygon(' + pts.map(pct).join(',') + ')';
        // Spin each shard about itself, not about the middle of the screen.
        el.style.transformOrigin = ((gx / box.width) * 100).toFixed(2) + '% ' +
          ((gy / box.height) * 100).toFixed(2) + '%';
        el.innerHTML = '<p class="h-statement-text is-all-lit">' + plateHTML + '</p>';
        shatter.appendChild(el);

        // Each shard drifts out along its own radius - far ones further, so the
        // cracks widen evenly - then falls, tipping away from the camera about
        // its own middle. Sideways travel stays modest on purpose: shards that
        // slide far just smear the sentence over copies of itself.
        const span = Math.min(gr, reach) / reach;
        const dist = reach * (.04 + span * throwScale) * (.85 + rand() * .3);
        const axis = rand() * Math.PI * 2;
        shards.push({
          el,
          dx: ((gx - cx) / gr) * dist,
          dy: ((gy - cy) / gr) * dist + reach * (.55 + rand() * .9),
          dz: -(60 + rand() * 180),
          ax: Math.cos(axis).toFixed(3),
          ay: Math.sin(axis).toFixed(3),
          tip: (18 + rand() * 52) * (rand() < .5 ? -1 : 1),
          delay: Math.min(.2, span * .14 + rand() * .04)
        });
      }
    }
  };

  const drawShards = (b) => {
    for (const p of shards) {
      const t = clamp((b - p.delay) / (1 - p.delay));
      // Accelerating, not ease-out: the fractures stay hairline for a moment
      // and the sentence survives long enough to be read breaking.
      const e = t * t;
      p.el.style.transform =
        'translate3d(' + (p.dx * e).toFixed(1) + 'px,' + (p.dy * e).toFixed(1) +
        'px,' + (p.dz * e).toFixed(1) + 'px) rotate3d(' + p.ax + ',' + p.ay + ',0,' +
        (p.tip * e).toFixed(2) + 'deg)';
      // They leave the frame rather than dissolve: a black shard fading over
      // the white underneath would only turn the screen grey.
      p.el.style.opacity = (1 - clamp((t - .74) / .26)).toFixed(3);
    }
  };

  // ---------- glow scene ----------
  const glow = document.querySelector('.h-glow');

  // ---------- product bar ----------
  const bar = document.getElementById('pbar');

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const vh = window.innerHeight;

    if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 8);

    // The plate is pinned for the whole section: the first stretch of scroll
    // only lights letters, the last stretch spends itself breaking the plate.
    if (chars.length && statementSection && sticky && !reduceMotion) {
      const r = statementSection.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh));
      const lit = clamp(p / 0.58);
      const broken = clamp((p - 0.72) / 0.28);

      // The break spends itself before the end of its scroll, so the screen is
      // clear - and the glow scene ready - by the time the plate unpins.
      const b = clamp(broken / 0.8);
      setLit(lit * (chars.length + 6) - 3);
      sticky.style.setProperty('--wash', (lit * lit * (1 - b)).toFixed(3));
      // The cracks open onto the dark and the guitar's own light first, and
      // only then flood white, so the break reads as a break and not a cut.
      sticky.style.setProperty('--reveal', smoothstep((b - 0.12) / 0.62).toFixed(3));
      sticky.style.setProperty('--burst', (b > 0 ? Math.sin(Math.PI * clamp(b / 0.85)) : 0).toFixed(3));

      if (broken > 0) {
        if (!shards.length) buildShards();
        plate.classList.add('is-broken');
        drawShards(b);
      } else if (plate.classList.contains('is-broken')) {
        plate.classList.remove('is-broken');
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
  window.addEventListener('resize', () => {
    // The cut is measured in percentages of a box that just changed size.
    if (shards.length) buildShards();
    requestTick();
  });
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
