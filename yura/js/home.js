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
  const glowSticky = document.querySelector('.h-glow-sticky');
  // Reduced motion: the statement never pins, so there is no shatter for the
  // fixed room to take over from and nothing for it to cover while a panel
  // slides away -- left on, it would just white out the static statement above.
  // The panel carries its own room again and the entrance is skipped. The scene
  // still goes dark on scroll; it simply does not fly anything in.
  if (glow && reduceMotion) glow.classList.add('is-plain');

  // ---------- product bar ----------
  const bar = document.getElementById('pbar');

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const vh = window.innerHeight;

    if (bar) bar.classList.toggle('is-scrolled', window.scrollY > 8);

    // Whether the break has fully landed, hoisted out of the block because the
    // glow scene reads it: that is the moment its room takes over from the
    // statement's. It stays 1 for the whole run-up afterwards, since `b` is
    // clamped, so the handover never falls into a frame where neither layer is
    // holding the room.
    let shatterTail = 0;

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
      // A hard switch, not a crossfade, and that is the point. The two layers
      // holding the room are the same gradient on the same pixels, so swapping
      // which one is up changes nothing on screen -- whereas dissolving between
      // them would briefly show both at partial alpha and composite to about
      // three quarters of one, reading as a quick dip. b reaches exactly 1 on
      // the frame the last shard fades out, so there is nothing left to cover.
      shatterTail = b >= 1 ? 1 : 0;
      setLit(lit * (chars.length + 6) - 3);
      // Set on the section rather than the panel: .h-statement-reveal had to
      // leave the panel to be fixed, and it still needs to inherit these.
      statementSection.style.setProperty('--wash', (lit * lit * (1 - b)).toFixed(3));
      // The cracks open onto the dark and the guitar's own light first, and
      // only then flood white, so the break reads as a break and not a cut.
      // Dropped the moment the glow scene's own room takes over, so this one is
      // not still painting a lit room under a scene that has gone black -- it
      // is fixed now, and would otherwise show in the strip of window the
      // 100vh panel does not reach.
      statementSection.style.setProperty(
        '--reveal',
        (shatterTail ? 0 : smoothstep((b - 0.12) / 0.62)).toFixed(3)
      );
      statementSection.style.setProperty('--burst', (b > 0 ? Math.sin(Math.PI * clamp(b / 0.85)) : 0).toFixed(3));

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
      // Measured off the pinned panel rather than innerHeight. The panel is
      // 100vh, and on mobile browsers 100vh is the viewport with the URL bar
      // *collapsed* while innerHeight reports it expanded. Using innerHeight
      // meant the scene finished a bar's height before the panel actually
      // unpinned, so the last beat was spent on a frozen, fully charged frame.
      const vhp = glowSticky ? glowSticky.getBoundingClientRect().height : vh;
      const travel = r.height - vhp;
      const p = clamp(-r.top / travel);

      // Four overlapping beats rather than one crossfade: hold the lit room,
      // kill it from the edges in, let the last light leave the guitar, then
      // let the vinyl charge. The overlaps are what stop the middle of the
      // section from being a flat grey screen with nothing on it.
      // The room commits to black inside the headline swap rather than over a
      // long slow fade. That is not a pacing preference, it is what keeps the
      // type legible: a text colour that ramps while the backdrop ramps will
      // always cross it somewhere and vanish for a few frames. Darkening fast,
      // during the window where one line is already leaving and the other has
      // not arrived, means each line only ever lives over one kind of room --
      // the outgoing one over a lit room, the incoming one over a dark one.
      const vigRaw = smoothstep((p - 0.14) / 0.24);
      const dim = smoothstep((p - 0.325) / 0.085);
      const charge = smoothstep((p - 0.42) / 0.26);

      // The scene builds itself out of the room rather than riding up already
      // composed. Four staggered ramps, not one: the eyebrow sets the beat, the
      // headline lands on it out of focus and resolves, the guitar swings in
      // behind that, and the caption comes last. All of it is spent inside the
      // first tenth of the section -- about a quarter screen of scroll -- so it
      // is finished before --vig starts taking the room away.
      const arrive = (at, over) => (reduceMotion ? 1 : smoothstep((p - at) / over));
      const eBrow = arrive(0, 0.040);
      const eTitle = arrive(0.018, 0.048);
      const eStage = arrive(0.034, 0.054);
      const eNote = arrive(0.062, 0.048);

      // The room goes up as the shards land and stays up until this panel is
      // pinned, which is when the two windows meet. Tested on r.top rather than
      // on whether the section intersects the viewport: on a mobile browser
      // showing its URL bar, innerHeight is larger than the 100svh panels, so
      // an intersection test reports this section on screen while the plate is
      // still visibly breaking -- and the room would slam over the shards.
      // Dropped once the section is wholly above the window so a full-viewport
      // layer is not left composited over everything below it. --dim is 1 well
      // before that point, so it is already invisible and there is no pop.
      const room = reduceMotion || r.bottom <= 0
        ? 0
        : Math.max(shatterTail, r.top <= 0 ? 1 : 0);

      // The headline swaps rather than crossfades. These are two different
      // sentences stacked in one grid cell, so a slow dissolve just renders
      // both at once as mush; a fast swap landed on the flicker reads as the
      // sign changing when the lights cut.
      const tLit = 1 - smoothstep((p - 0.325) / 0.055);
      const tOn = smoothstep((p - 0.345) / 0.055);

      // The lamps stutter before they give out. Two short dips, placed just
      // before the room commits to black; at any scroll speed each one is a
      // valid frame, so parking mid-flicker reads as a dim room, not a glitch.
      const dip = (c, w) => {
        const u = (p - c) / w;
        return Math.abs(u) > 1 ? 0 : Math.cos((u * Math.PI) / 2);
      };
      // The second dip is parked on the swap itself, so the sign changes on the
      // same beat the lamp stutters.
      const flicker = 1 - 0.5 * dip(0.285, 0.03) - 0.4 * dip(0.352, 0.022);

      // The stutter is published on its own so a black layer can carry it over
      // the whole room. The guitar takes the same beat through its brightness,
      // so subject and room lose the light together; dipping only the guitar
      // read as the photo going dark rather than as the lamps giving out.
      const flick = clamp((1 - flicker) * 0.82);
      const vig = clamp(1 - (1 - vigRaw) * flicker);
      const lit = clamp((1 - dim) * flicker);

      // How dark the room is *right now*, by either route. The caption lives
      // through the whole scene, so unlike the two headlines it cannot dodge
      // the crossover by being absent for it -- it has to flip to light type
      // the moment the room drops, whether that is the flicker or the real
      // blackout doing it.
      const inkFlip = clamp(Math.max(dim, flick * 1.1));

      glow.style.setProperty('--ink-flip', inkFlip.toFixed(4));
      glow.style.setProperty('--flick', flick.toFixed(4));
      glow.style.setProperty('--vig', vig.toFixed(4));
      glow.style.setProperty('--dim', dim.toFixed(4));
      glow.style.setProperty('--charge', charge.toFixed(4));
      glow.style.setProperty('--lit', lit.toFixed(4));
      glow.style.setProperty('--t-lit', tLit.toFixed(4));
      glow.style.setProperty('--t-on', tOn.toFixed(4));
      glow.style.setProperty('--room', room.toFixed(4));
      glow.style.setProperty('--e-brow', eBrow.toFixed(4));
      glow.style.setProperty('--e-title', eTitle.toFixed(4));
      glow.style.setProperty('--e-stage', eStage.toFixed(4));
      glow.style.setProperty('--e-note', eNote.toFixed(4));
      // Kept for the parts that should track the scene as a whole.
      glow.style.setProperty('--k', smoothstep((p - 0.22) / 0.42).toFixed(4));
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
