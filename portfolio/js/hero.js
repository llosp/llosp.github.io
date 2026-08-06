// Hero reel: poster-first video background.
// The <video> has preload="none" and no autoplay attribute, so without JS
// (or with reduced motion) not a single video byte is downloaded and the
// poster image carries the hero.
//
// PERF: every decoded frame of this video goes through the full-viewport
// blur in .hero-media, so a playing reel is a continuous decode + filter
// cost. Three gates keep that cost off the scroll path:
//   1. it never starts on save-data / low-core / small-screen clients;
//   2. it starts after load, so it never competes with first paint;
//   3. it pauses the moment the sheet covers the hero, or the tab hides.
// The hero is position: sticky, so it technically never leaves the
// viewport — "covered" is detected from the .sheet reaching the top edge,
// not from the hero itself.

function tooWeakForVideo() {
  const conn = navigator.connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  return matchMedia('(max-width: 600px)').matches;
}

export function initHero() {
  const hero = document.getElementById('hero');
  const video = hero?.querySelector('.hero-video');
  if (!video) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || tooWeakForVideo()) return;

  let covered = false;
  let wanted = false;

  function sync() {
    if (wanted && !covered && !document.hidden) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  video.addEventListener('canplay', () => hero.classList.add('is-playing'), { once: true });
  // The reel files may not exist yet (see the TODO in index.html).
  // A failed load keeps the poster, silently.
  video.addEventListener('error', () => {}, true);

  // Pause once the sheet has covered the hero: bottom margin of -95% shrinks
  // the observer root to a sliver at the top of the viewport, so .sheet only
  // intersects it after it has slid over almost the whole hero.
  const sheet = document.querySelector('.sheet');
  if (sheet) {
    new IntersectionObserver(([entry]) => {
      covered = entry.isIntersecting;
      sync();
    }, { rootMargin: '0px 0px -95% 0px' }).observe(sheet);
  }

  document.addEventListener('visibilitychange', sync);

  // Start after load so the reel download never competes with fonts,
  // the poster or first paint.
  const startWhenIdle = () => {
    wanted = true;
    sync();
  };
  if (document.readyState === 'complete') startWhenIdle();
  else addEventListener('load', startWhenIdle, { once: true });

  reduced.addEventListener('change', e => {
    if (!e.matches) return;
    wanted = false;
    video.pause();
    hero.classList.remove('is-playing');
  });
}
