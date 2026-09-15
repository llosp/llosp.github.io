// Small data-driven diagrams for the case studies, for the two mechanics that
// have no screenshot. Same discipline as js/chart.js: built once when a case
// study opens, then a static tree. No rAF, no resize listeners.
import { t } from './i18n.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// A rack of countdown faces with one marked as the real count. Covers the
// outlaws who cheat by showing you the wrong number rather than a wrong clock.
function counterDiagram(spec) {
  const wrap = el('div', 'dgm dgm-counter');
  const rack = el('ol', 'dgm-rack');
  spec.faces.forEach(face => {
    const li = el('li', 'dgm-face' + (face.real ? ' is-real' : ''));
    li.append(el('span', 'dgm-face-text', t(face.text)));
    if (face.solve) li.append(el('span', 'dgm-face-solve mono', t(face.solve)));
    if (face.tag) li.append(el('span', 'dgm-face-tag mono', t(face.tag)));
    rack.append(li);
  });
  wrap.append(rack);
  if (spec.note) wrap.append(el('p', 'dgm-note', t(spec.note)));
  return wrap;
}

// The draw window as a banded timeline: the thing the combat formula describes.
// A band's `span` is its share of the bar; `mark` labels its right-hand edge.
function windowDiagram(spec) {
  const wrap = el('div', 'dgm dgm-window');
  const bar = el('div', 'dgm-bar');
  const scale = el('ol', 'dgm-scale mono');
  spec.bands.forEach(band => {
    const seg = el('div', `dgm-band dgm-band-${band.tone}`);
    seg.style.flexGrow = String(band.span);
    seg.append(el('span', 'dgm-band-label mono', t(band.label)));
    bar.append(seg);

    const tick = el('li', 'dgm-tick', band.mark ?? '');
    tick.style.flexGrow = String(band.span);
    scale.append(tick);
  });
  wrap.append(bar, scale);
  if (spec.note) wrap.append(el('p', 'dgm-note', t(spec.note)));
  return wrap;
}

const KINDS = { counter: counterDiagram, window: windowDiagram };

export function diagram(spec) {
  return KINDS[spec.type](spec);
}

// Big before/after number callouts, built from values that are already in the
// balancing copy so the claim and the figure can't disagree.
export function statBlock(spec) {
  const list = el('ul', 'dgm-stats');
  spec.pairs.forEach(pair => {
    const li = el('li', 'dgm-stat');
    const row = el('p', 'dgm-stat-row');
    row.append(
      el('span', 'dgm-stat-from', t(pair.from)),
      el('span', 'dgm-stat-arrow', '→'),
      el('span', 'dgm-stat-to', t(pair.to))
    );
    li.append(row, el('span', 'dgm-stat-label mono', t(pair.label)));
    list.append(li);
  });
  return list;
}
