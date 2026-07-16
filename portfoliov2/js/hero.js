// Hero reel: poster-first video background.
// The <video> has preload="none" and no autoplay attribute, so without JS
// (or with reduced motion) not a single video byte is downloaded and the
// poster image carries the hero.
export function initHero() {
  const hero = document.getElementById('hero');
  const video = hero?.querySelector('.hero-video');
  if (!video) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;

  video.addEventListener('canplay', () => hero.classList.add('is-playing'), { once: true });
  // The reel files may not exist yet (see the TODO in index.html).
  // A failed load keeps the poster, silently.
  video.addEventListener('error', () => {}, true);
  video.play().catch(() => {});

  reduced.addEventListener('change', e => {
    if (!e.matches) return;
    video.pause();
    hero.classList.remove('is-playing');
  });
}
