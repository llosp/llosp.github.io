// Awwwards-y cursor detail: a soft spotlight glow that follows the pointer,
// plus a fading ✦ sticker trail (reusing the marquee glyph). Pointer devices
// only; fully skipped under prefers-reduced-motion so nothing distracts.
const TRAIL_GLYPHS = ['✦', '✦', '✧'];
const SPAWN_DIST = 90; // px of travel between stickers
const MAX_STICKERS = 18;

export function initCursor() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;
  if (reduced || !canHover) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.append(glow, trail);

  let mx = 0;
  let my = 0;
  let gx = 0;
  let gy = 0;
  let lastX = 0;
  let lastY = 0;
  let seeded = false;
  let live = 0;

  function spawnSticker(x, y) {
    if (live >= MAX_STICKERS) return;
    const s = document.createElement('span');
    s.className = 'cursor-sticker';
    s.textContent = TRAIL_GLYPHS[(Math.random() * TRAIL_GLYPHS.length) | 0];
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    const rot = (Math.random() * 60 - 30).toFixed(1);
    const drift = (Math.random() * 24 - 12).toFixed(1);
    trail.append(s);
    live++;
    const remove = () => { s.remove(); live--; };
    if (window.gsap && !document.documentElement.classList.contains('no-motion')) {
      gsap.fromTo(s,
        { opacity: 1, scale: 1, rotation: 0, xPercent: -50, yPercent: -50 },
        { opacity: 0, scale: 0.4, rotation: +rot, x: drift, y: -20,
          duration: 0.7, ease: 'power2.out', onComplete: remove });
    } else {
      s.style.transform = 'translate(-50%, -50%)';
      s.style.animation = 'cursor-sticker-fade 0.7s ease-out forwards';
      setTimeout(remove, 720);
    }
  }

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (!seeded) { gx = mx; gy = my; lastX = mx; lastY = my; seeded = true; }
    if (Math.hypot(mx - lastX, my - lastY) >= SPAWN_DIST) {
      lastX = mx;
      lastY = my;
      spawnSticker(mx, my);
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => glow.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => glow.classList.remove('is-hidden'));

  function frame() {
    // eased follow for the glow so it lags a touch behind the cursor
    gx += (mx - gx) * 0.15;
    gy += (my - gy) * 0.15;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
