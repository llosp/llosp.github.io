// the 404 page. a "404" the width of the screen, built out of the same
// glyphs as the ripple field, takes the place of that field. it writes itself
// in from left to right, glitches now and then, and moves away from the
// pointer. after a short intro it starts to come apart, glyph by glyph, and
// when the last of it falls the page sends you home. esc stops that and
// pulls it back together; enter, a click or the home link go straight away.
//
// mountNotFound() returns an unmount function, which site.js calls when the
// router swaps a real page in.

const CHARS = ['.', ':', '+', 'o', 'O', '#'];
const NOISE = '#%&*+=/\\?!<>01';
const INTRO_MS = 1500;
const COUNTDOWN_MS = 12000;
const EXIT_MS = 560;

const rand = (a, b) => a + Math.random() * (b - a);
const noise = () => NOISE[(Math.random() * NOISE.length) | 0];

/* ── closest page ─────────────────────────────────────────────────────── */

function editDistance(a, b) {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const up = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = up;
    }
  }
  return prev[b.length];
}

// the page that exists closest to the one asked for, compared as a whole
// path and by its last segment, so /skril, /work/skril/, /projects/skrill
// and /skrill-app all land on /work/skrill/
function closestPage(asked, pages) {
  const norm = (p) => p.toLowerCase().replace(/\/+$/, '');
  const target = norm(asked);
  const tail = target.split('/').pop() || '';
  let best = null;
  pages.forEach((page) => {
    const p = norm(page);
    const name = p.split('/').pop();
    const contains = tail.length >= 3 && (tail.includes(name) || name.includes(tail));
    const score = contains ? 0 : Math.min(editDistance(target, p), editDistance(tail, name));
    const limit = Math.max(2, Math.floor(name.length * 0.4));
    if (score <= limit && (!best || score < best.score)) best = { page, score };
  });
  return best && best.page;
}

/* ── copy ─────────────────────────────────────────────────────────────── */

// the page ships in english. under /pt/ the strings embedded by the build
// are swapped in, and every link gets the /pt prefix.
function localize(app) {
  const path = window.location.pathname;
  const isPt = path === '/pt' || path.startsWith('/pt/');
  const prefix = isPt ? '/pt' : '';
  const bare = isPt ? path.slice(3) || '/' : path;

  let strings = {};
  try {
    strings = JSON.parse(app.querySelector('#nf-strings').textContent)[isPt ? 'pt' : 'en'] || {};
  } catch (_) {}
  app.querySelectorAll('[data-nf]').forEach((el) => {
    if (strings[el.dataset.nf]) el.textContent = strings[el.dataset.nf];
  });
  if (strings.title) document.title = strings.title;
  document.documentElement.lang = isPt ? 'pt-BR' : 'en';

  let shown = decodeURIComponent(path);
  if (shown.length > 42) shown = `${shown.slice(0, 39)}...`;
  const pathEl = app.querySelector('.nf-path');
  if (pathEl) pathEl.textContent = `~${shown}`;

  app.querySelectorAll('[data-nf-home]').forEach((a) => a.setAttribute('href', `${prefix}/`));

  const pages = (app.querySelector('.nf-term')?.dataset.pages || '').split(' ').filter(Boolean);
  const guess = closestPage(bare, pages);
  const row = app.querySelector('.nf-guess');
  if (guess && row) {
    const link = row.querySelector('.nf-guess_link');
    link.href = prefix + guess;
    link.textContent = `.${guess.replace(/\/$/, '')}`;
    row.hidden = false;
  }

  return strings;
}

/* ── the figure ───────────────────────────────────────────────────────── */

export function mountNotFound(app) {
  const strings = localize(app);
  const canvas = app.querySelector('.nf-canvas');
  const stage = app.querySelector('.nf-stage');
  const homeLink = app.querySelector('.nf-keys [data-nf-home]');
  const stayBtn = app.querySelector('[data-nf-stay]');
  const statusEl = app.querySelector('[data-nf-status]');
  if (!canvas || !canvas.getContext) return () => {};

  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0;
  let H = 0;
  let cell = 14;
  let figCx = 0;
  let figCy = 0;
  let particles = [];
  let order = [];

  let t = 0;
  let last = 0;
  let raf = 0;
  let alive = true;
  let counting = !reduce;
  let detached = 0;
  let leaving = false;
  let released = false;
  let exitT = 0;
  let shownSecond = -1;
  let glitches = [];
  let nextGlitch = INTRO_MS + 600;
  let pointer = null;

  function setStatus(text) {
    if (statusEl && statusEl.textContent !== text) statusEl.textContent = text;
  }

  // the digits are drawn into an offscreen canvas at three samples per cell
  // and averaged, so their edges come out as partial values and pick the
  // lighter glyphs instead of a hard stair step
  function layout() {
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const narrow = W < 600;
    cell = Math.max(narrow ? 8 : 9, Math.min(16, Math.round(W / 92)));
    ctx.font = `700 ${Math.round(cell * 1.05)}px "Mono", "Courier New", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';

    const cols = Math.ceil(W / cell);
    const rows = Math.ceil(H / cell);
    const sub = 3;
    const off = document.createElement('canvas');
    off.width = cols * sub;
    off.height = rows * sub;
    const o = off.getContext('2d');
    const scale = sub / cell;

    figCx = W / 2;
    figCy = H * (narrow ? 0.4 : 0.44);
    const boxW = W * (narrow ? 0.92 : 0.86) * scale;
    const boxH = H * (narrow ? 0.34 : 0.56) * scale;
    const inkW = (m) => (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) || m.width;

    o.font = '700 100px "Grotesk", Arial, sans-serif';
    const m = o.measureText('404');
    const capH = (m.actualBoundingBoxAscent || 72) + (m.actualBoundingBoxDescent || 0);
    const size = Math.min((boxW / inkW(m)) * 100, (boxH / capH) * 100);
    o.font = `700 ${size}px "Grotesk", Arial, sans-serif`;
    o.textBaseline = 'alphabetic';
    const fit = o.measureText('404');
    const asc = fit.actualBoundingBoxAscent || size * 0.72;
    const desc = fit.actualBoundingBoxDescent || 0;
    const x = figCx * scale - inkW(fit) / 2 + (fit.actualBoundingBoxLeft || 0);
    const y = figCy * scale + (asc - desc) / 2;
    o.fillText('404', x, y);

    const data = o.getImageData(0, 0, off.width, off.height).data;
    const past = t > INTRO_MS;
    particles = [];
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        let sum = 0;
        for (let sy = 0; sy < sub; sy++) {
          const row = (gy * sub + sy) * off.width;
          for (let sx = 0; sx < sub; sx++) sum += data[(row + gx * sub + sx) * 4 + 3];
        }
        const d = sum / (sub * sub * 255);
        if (d < 0.12) continue;
        const hx = gx * cell + cell / 2;
        const hy = gy * cell + cell / 2;
        particles.push({
          gx,
          gy,
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          d,
          // written in from left to right on a slight diagonal, like a pen
          born: past ? 0 : 120 + ((hx + hy * 0.35) / (W + H * 0.35)) * 950 + rand(0, 200),
          state: 0, // 0 home, 1 falling, 2 gone, 3 exploding
        });
      }
    }

    // the order the figure comes apart in, fixed once so the decay reads as
    // the same structure failing rather than a random flicker
    order = particles.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [order[i], order[j]] = [order[j], order[i]];
    }
    detached = 0;
  }

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      ctx.globalAlpha = 0.22 + p.d * 0.78;
      ctx.fillText(CHARS[Math.min(CHARS.length - 1, (p.d * CHARS.length) | 0)], p.hx, p.hy);
    });
    ctx.globalAlpha = 1;
  }

  /* ── what you can do ────────────────────────────────────────────────── */

  function go() {
    released = true;
    if (homeLink) homeLink.click();
  }

  // the figure blows apart outward and the router takes over mid-burst
  function leave() {
    if (leaving) return;
    leaving = true;
    counting = false;
    if (reduce) return go();
    exitT = t;
    particles.forEach((p) => {
      if (p.state === 2) return;
      const dx = p.x - figCx;
      const dy = p.y - figCy;
      const len = Math.hypot(dx, dy) || 1;
      const speed = rand(500, 1500);
      p.vx = (dx / len) * speed + rand(-120, 120);
      p.vy = (dy / len) * speed - rand(0, 260);
      p.state = 3;
    });
    window.setTimeout(go, EXIT_MS);
  }

  // everything that fell, even off screen, flies back to where it was
  function stay() {
    if (leaving || !counting) return;
    counting = false;
    particles.forEach((p) => {
      if (p.state === 2) {
        p.y = H + rand(20, 160);
        p.vy = 0;
      }
      if (p.state === 1 || p.state === 2) p.state = 0;
    });
    detached = 0;
    setStatus(strings.nfStayed || '');
    if (stayBtn) stayBtn.hidden = true;
  }

  function onHomeClick(event) {
    if (released || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    leave();
  }

  function onKey(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === 'Escape') stay();
    // enter on a focused link or button already does that control's job
    if (event.key === 'Enter' && !event.target.closest('a, button')) leave();
  }

  function onStageClick(event) {
    if (event.target.closest('a, button')) return;
    leave();
  }

  function onPointer(event) {
    pointer = { x: event.clientX, y: event.clientY };
  }
  function clearPointer() {
    pointer = null;
  }
  // a finger lifted leaves no pointer behind, unlike a mouse that stays put
  function onPointerUp(event) {
    if (event.pointerType === 'touch') pointer = null;
  }

  /* ── motion ─────────────────────────────────────────────────────────── */

  function update(dt) {
    const elapsed = Math.max(0, t - INTRO_MS);
    const f = counting ? Math.min(1, elapsed / COUNTDOWN_MS) : 0;
    // nothing lets go in the first stretch, so the 404 is read whole first
    const decay = Math.max(0, (f - 0.12) / 0.88);

    if (counting && t > INTRO_MS) {
      const left = Math.max(0, Math.ceil((COUNTDOWN_MS - elapsed) / 1000));
      if (left !== shownSecond) {
        shownSecond = left;
        setStatus((strings.nfCounting || '').replace('{n}', left));
      }
      const target = Math.floor(particles.length * Math.pow(decay, 1.7));
      while (detached < target && detached < order.length) {
        const p = particles[order[detached++]];
        if (p.state !== 0) continue;
        p.state = 1;
        p.vx = rand(-70, 70);
        p.vy = rand(-180, 10);
      }
      if (f >= 1) leave();
    }

    if (!leaving && t > INTRO_MS && t > nextGlitch) {
      const span = (rand(1, 5) | 0) * cell;
      const top = figCy + rand(-0.3, 0.3) * H;
      glitches.push({ y0: top, y1: top + span, dx: rand(14, 60) * (Math.random() < 0.5 ? -1 : 1), until: t + rand(80, 190) });
      if (Math.random() < 0.35) {
        const top2 = top + rand(-120, 120);
        glitches.push({ y0: top2, y1: top2 + cell * 2, dx: rand(8, 30) * (Math.random() < 0.5 ? -1 : 1), until: t + rand(60, 140) });
      }
      nextGlitch = t + rand(900, 3200) * (1 - 0.7 * decay);
    }
    glitches = glitches.filter((g) => g.until > t);

    const K = 70;
    const D = 10;
    const R = W < 600 ? 80 : 130;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.state === 2) continue;

      let ax = 0;
      let ay = 0;
      if (p.state === 0) {
        ax = (p.hx - p.x) * K - p.vx * D;
        ay = (p.hy - p.y) * K - p.vy * D;
      } else if (p.state === 1) {
        ay = 1500;
      } else if (p.state === 3) {
        ay = 500;
      }

      if (pointer && p.state !== 3) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < R && dist > 0.01) {
          const push = Math.pow(1 - dist / R, 2) * 14000;
          ax += (dx / dist) * push;
          ay += (dy / dist) * push;
        }
      }

      p.vx += ax * dt;
      p.vy += ay * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.state === 1 && p.y > H + cell) p.state = 2;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const elapsed = Math.max(0, t - INTRO_MS);
    const decay = counting ? Math.max(0, (Math.min(1, elapsed / COUNTDOWN_MS) - 0.12) / 0.88) : 0;
    const shake = decay * decay * cell * 0.4;
    const wave = t / 650;
    const exitFade = leaving ? Math.max(0, 1 - (t - exitT) / EXIT_MS) : 1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.state === 2 || t < p.born) continue;

      const age = t - p.born;
      let ch;
      let a;
      let x = p.x;
      let y = p.y;

      if (p.state === 3) {
        ch = noise();
        a = (0.3 + p.d * 0.7) * exitFade;
      } else if (age < 260) {
        // the pen tip: a scrambled glyph that lands on its real one
        ch = noise();
        a = 1;
      } else {
        const w = 0.5 + 0.5 * Math.sin(wave + p.gx * 0.3 - p.gy * 0.22);
        const level = Math.min(1, p.d * (0.55 + 0.45 * w));
        ch = CHARS[Math.min(CHARS.length - 1, (level * CHARS.length) | 0)];
        a = 0.22 + level * 0.78;
        if (p.state === 1) {
          ch = p.vy > 500 ? '.' : ':';
          a *= Math.max(0, 1 - (p.y - p.hy) / (H * 0.8));
        } else if (shake) {
          x += rand(-shake, shake);
          y += rand(-shake, shake);
        }
      }

      for (let g = 0; g < glitches.length; g++) {
        const gl = glitches[g];
        if (y >= gl.y0 && y < gl.y1) {
          ctx.globalAlpha = a * 0.25;
          ctx.fillText(ch, x - gl.dx * 0.5, y);
          x += gl.dx;
          ch = noise();
          break;
        }
      }

      ctx.globalAlpha = a;
      ctx.fillText(ch, x, y);
    }
    ctx.globalAlpha = 1;
  }

  // rAF stops in a hidden tab, and dt is capped, so the countdown pauses
  // while nobody is looking instead of sending them home behind their back
  function frame(now) {
    if (!alive) return;
    const dt = Math.min(0.033, (now - (last || now)) / 1000);
    last = now;
    t += dt * 1000;
    update(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }

  let resizeTimer = 0;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      layout();
      if (reduce) drawStatic();
    }, 150);
  }

  /* ── start ──────────────────────────────────────────────────────────── */

  // the markup ships the english static line, so the right one goes in
  // before the first frame
  if (reduce) {
    setStatus(strings.nfStatic || '');
    if (stayBtn) stayBtn.hidden = true;
  } else {
    setStatus((strings.nfCounting || '').replace('{n}', Math.round(COUNTDOWN_MS / 1000)));
  }

  homeLink && homeLink.addEventListener('click', onHomeClick);
  stayBtn && stayBtn.addEventListener('click', stay);
  stage && stage.addEventListener('click', onStageClick);
  document.addEventListener('keydown', onKey);
  window.addEventListener('resize', onResize);
  if (!reduce) {
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    document.documentElement.addEventListener('pointerleave', clearPointer);
  }

  // the figure is measured in the display face, so it waits briefly for it
  const fontReady = document.fonts && document.fonts.load
    ? Promise.race([document.fonts.load('700 100px "Grotesk"'), new Promise((r) => setTimeout(r, 600))])
    : Promise.resolve();
  fontReady.catch(() => {}).then(() => {
    if (!alive) return;
    layout();
    if (reduce) drawStatic();
    else raf = requestAnimationFrame(frame);
  });

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    window.clearTimeout(resizeTimer);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('pointerup', onPointerUp);
    document.documentElement.removeEventListener('pointerleave', clearPointer);
  };
}
