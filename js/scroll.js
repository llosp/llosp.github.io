// the glide used by the section rail and the ./work button: eased by hand so
// the length and curve are ours, and so the router never sees a hash change.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// ease-out: moves the moment you click and settles softly, no slow ease-in
const ease = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function smoothScrollTo(to) {
  if (reduceMotion()) {
    window.scrollTo(0, to);
    return;
  }

  const from = window.scrollY;
  const distance = to - from;
  const duration = Math.min(650, 300 + Math.abs(distance) * 0.12);
  const start = performance.now();

  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, from + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// where the work index starts, a little below the top so the ~/work tag shows
export function workTop() {
  const tag = document.querySelector('#work');
  if (!tag) return 0;
  return Math.max(0, tag.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.08);
}
