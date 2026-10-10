// the glide used by the section rail and the ./work button: eased by hand so
// the length and curve are ours, and so the router never sees a hash change.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function smoothScrollTo(to) {
  if (reduceMotion()) {
    window.scrollTo(0, to);
    return;
  }

  const from = window.scrollY;
  const distance = to - from;
  const duration = Math.min(1100, 450 + Math.abs(distance) * 0.25);
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
