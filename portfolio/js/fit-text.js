// Auto-shrinks single-line "data chip" text (stat numbers, case-study result
// values) so it never wraps inside its column. These sit in strict, equal-
// width grids with a shared border/baseline (.showcase-stats, .case-results):
// one item wrapping to two lines while its neighbours stay on one throws the
// whole row out of alignment, which is worse than a slightly smaller number.
//
// CSS still owns the *ceiling* (the clamp()/cqi size in sections.css and
// casestudy.css) and keeps things non-overflowing with JS off. This only
// ever shrinks below that ceiling, to whatever the actual text needs, so it
// keeps working for strings nobody has measured yet -- new projects, longer
// PT translations, whatever. See CLAUDE.md "Check that the PT string still
// fits".
const SELECTOR = '.showcase-stats .stat-value, .case-result-value';

const ctx = document.createElement('canvas').getContext('2d');
const REF = 100; // reference px for the canvas measurement; ratio is size-independent

function textWidthRatio(el, cs) {
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${REF}px ${cs.fontFamily}`;
  if ('letterSpacing' in ctx) ctx.letterSpacing = cs.letterSpacing;
  const text = cs.textTransform === 'uppercase' ? el.textContent.toUpperCase() : el.textContent;
  return ctx.measureText(text.trim()).width / REF;
}

function fitOne(el) {
  const available = el.clientWidth;
  if (!available) return; // hidden (e.g. case overlay not open yet)
  const cs = getComputedStyle(el);
  const ratio = textWidthRatio(el, cs);
  if (!ratio) return;
  const ceiling = parseFloat(cs.fontSize);
  el.style.fontSize = `${Math.min(ceiling, available / ratio)}px`;
  el.classList.add('fit-text-ready');
}

export function fitAll() {
  document.querySelectorAll(SELECTOR).forEach(fitOne);
}

let queued = false;
function scheduleFit() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    fitAll();
  });
}

window.addEventListener('resize', scheduleFit, { passive: true });
// Re-fit once the real faces swap in (font-display: swap starts on a
// fallback font, which measures a different width than Archivo Black).
document.fonts?.ready.then(fitAll);
