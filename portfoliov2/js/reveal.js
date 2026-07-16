// Section/card reveals: short translateY + fade, played once on entry.
// Deliberately IntersectionObserver + CSS transitions instead of
// animation-timeline: view(), because view() scrubs with scroll distance
// while the design calls for a fixed 300-450ms ease-out.
// The hidden starting state only exists under html.js-reveal, so with JS
// off every .reveal element stays fully visible.
let io = null;

export function initReveals() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-reveal');
  io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  refreshReveals();
}

// Also called after a language switch re-renders the grids, so the fresh
// .reveal elements get observed (in-viewport ones resolve immediately).
export function refreshReveals() {
  if (!io) return;
  document.querySelectorAll('.reveal:not(.is-in)').forEach((el, i) => {
    el.style.setProperty('--reveal-i', i % 4);
    io.observe(el);
  });
}
