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

  const eyes = mascots
    .map(mascot => ({
      eye: mascot.querySelector('.eye'),
      pupil: mascot.querySelector('.pupil')
    }))
    .filter(pair => pair.eye && pair.pupil);

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
      eyes.forEach(({ eye, pupil }) => {
        const rect = eye.getBoundingClientRect();
        if (!rect.width) return;
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
        pupil.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
      });
    });
  });
}
