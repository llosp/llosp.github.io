// Living eye, ported from the root Clicachorro game (js/game.js):
// pupil follows the cursor (clamped), click blinks, plus idle auto-blinks.
const BLINK_MS = 500;

function blink(mascot) {
  if (mascot.classList.contains('closed')) return;
  mascot.classList.add('closed');
  setTimeout(() => mascot.classList.remove('closed'), BLINK_MS);
}

function scheduleIdleBlink(mascot) {
  const delay = 6000 + Math.random() * 3000;
  setTimeout(() => {
    blink(mascot);
    scheduleIdleBlink(mascot);
  }, delay);
}

export function initMascots() {
  const mascots = [...document.querySelectorAll('.mascot')];
  if (!mascots.length) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  mascots.forEach(mascot => {
    mascot.addEventListener('click', () => blink(mascot));
    if (!reduced) scheduleIdleBlink(mascot);
  });

  // Pupil tracking: pointer devices only, single rAF-throttled listener.
  if (reduced || !canHover) return;

  // Mascots with data-eye-track="false" (the demoted hero corner dog)
  // keep blinking but do not follow the cursor.
  const eyes = mascots
    .filter(mascot => mascot.dataset.eyeTrack !== 'false')
    .map(mascot => ({
      eye: mascot.querySelector('.eye'),
      pupil: mascot.querySelector('.pupil'),
      rect: null,
      visible: false
    }))
    .filter(pair => pair.eye && pair.pupil);

  // PERF: getBoundingClientRect() forces a layout flush, and doing it per eye
  // per mousemove frame — on a page full of scroll-driven animations — is
  // exactly the kind of read that stalls the frame. The rects only change on
  // scroll or resize, so cache them and mark dirty from passive listeners.
  // Off-screen mascots (the Skills peek dog) are skipped entirely.
  let dirty = true;
  const markDirty = () => { dirty = true; };
  addEventListener('scroll', markDirty, { passive: true });
  addEventListener('resize', markDirty, { passive: true });

  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const pair = eyes.find(p => p.eye === entry.target);
      if (pair) pair.visible = entry.isIntersecting;
    }
    dirty = true;
  });
  eyes.forEach(pair => io.observe(pair.eye));

  let mx = 0;
  let my = 0;
  let ticking = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      for (const pair of eyes) {
        if (!pair.visible) continue;
        if (dirty || !pair.rect) pair.rect = pair.eye.getBoundingClientRect();
        const rect = pair.rect;
        if (!rect.width) continue;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let dx = mx - cx;
        let dy = my - cy;
        const dist = Math.hypot(dx, dy);
        // Proportional clamp (the root game uses a fixed 20px; ours scales)
        const max = rect.width * 0.18;
        if (dist > max) {
          dx = (dx / dist) * max;
          dy = (dy / dist) * max;
        }
        pair.pupil.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
      }
      dirty = false;
    });
  });
}
