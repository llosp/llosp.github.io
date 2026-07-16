// MediaSlot behavior: lazy-loads a clip/image's source and, for videos,
// plays it only while it's scrolled into view (pausing out of view).
// Slots not yet marked data-ready="true" are pure CSS placeholders and
// never touched here. Reduced motion never plays a video (the poster
// attribute is all that ever shows) but still lazy-loads static images,
// which are motion-safe.
export function initMediaSlots(root = document) {
  const media = [...root.querySelectorAll(
    '.media-slot[data-ready="true"] .media-slot-video, .media-slot[data-ready="true"] .media-slot-image'
  )];
  if (!media.length) return;

  const loadSrc = el => { if (!el.src && el.dataset.src) el.src = el.dataset.src; };

  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedQuery.matches) {
    media.forEach(el => { if (el.tagName === 'IMG') loadSrc(el); });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        loadSrc(el);
        if (el.tagName === 'VIDEO') el.play().catch(() => {});
      } else if (el.tagName === 'VIDEO') {
        el.pause();
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.25 });

  media.forEach(el => observer.observe(el));

  reducedQuery.addEventListener('change', e => {
    if (!e.matches) return;
    observer.disconnect();
    media.forEach(el => { if (el.tagName === 'VIDEO') el.pause(); });
  });
}
