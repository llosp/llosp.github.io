// Inline SVG chart builders. No dependency, no canvas, no animation — each
// chart is built once from an aggregate dataset and stays a static tree.
// svg elements have no width/height attrs; css/results.css scales them via
// width:100%; height:auto so the viewBox aspect ratio is preserved responsively.
const SVG_NS = 'http://www.w3.org/2000/svg';

// Same 12-hue earthy palette as css/style.css's --earth-1..12 (referenced by var()
// so a single source of truth in that stylesheet drives both pages) — cycled per
// bar/row so categories are distinguishable by color, not just by label position.
const EARTH_COLORS = [
  'var(--earth-1)', 'var(--earth-2)', 'var(--earth-3)', 'var(--earth-4)',
  'var(--earth-5)', 'var(--earth-6)', 'var(--earth-7)', 'var(--earth-8)',
  'var(--earth-9)', 'var(--earth-10)', 'var(--earth-11)', 'var(--earth-12)',
];

function svgEl(tag, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text != null) node.textContent = text;
  return node;
}

function chartWrap(svg, { title, caption }) {
  const wrap = document.createElement('div');
  wrap.className = 'chart';
  const h = document.createElement('h3');
  h.textContent = title;
  wrap.appendChild(h);
  wrap.appendChild(svg);
  if (caption) {
    const p = document.createElement('p');
    p.className = 'chart-caption';
    p.textContent = caption;
    wrap.appendChild(p);
  }
  return wrap;
}

function barChart({ title, desc, data, caption, valueFormat }) {
  const W = 640, rowH = 32, padTop = 10, padBottom = 10, labelW = 170, maxBarW = W - labelW - 60;
  const H = padTop + padBottom + Math.max(data.length, 1) * rowH;
  const max = Math.max(1, ...data.map(d => d.value));
  const fmt = valueFormat || (v => String(Math.round(v * 10) / 10));

  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' });
  svg.appendChild(svgEl('title', {}, title));
  if (desc) svg.appendChild(svgEl('desc', {}, desc));

  if (!data.length) {
    svg.appendChild(svgEl('text', { x: W / 2, y: H / 2, 'text-anchor': 'middle', class: 'chart-empty' }, 'Sem dados ainda'));
    return chartWrap(svg, { title, caption });
  }

  data.forEach((d, i) => {
    const y = padTop + i * rowH;
    const barW = max > 0 ? (d.value / max) * maxBarW : 0;
    const color = EARTH_COLORS[i % EARTH_COLORS.length];
    svg.appendChild(svgEl('text', { x: labelW - 10, y: y + rowH / 2 + 4, 'text-anchor': 'end', class: 'chart-label' }, d.label));
    svg.appendChild(svgEl('rect', { x: labelW, y: y + 6, width: Math.max(barW, 1), height: rowH - 12, class: 'chart-bar', rx: 3, style: `fill:${color}` }));
    svg.appendChild(svgEl('text', { x: labelW + barW + 8, y: y + rowH / 2 + 4, class: 'chart-value' }, fmt(d.value)));
  });

  return chartWrap(svg, { title, caption });
}

function histogram({ title, desc, data, caption }) {
  const W = 640, H = 260, padL = 40, padB = 30, padT = 16, padR = 16;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' });
  svg.appendChild(svgEl('title', {}, title));
  if (desc) svg.appendChild(svgEl('desc', {}, desc));

  if (!data.length) {
    svg.appendChild(svgEl('text', { x: W / 2, y: H / 2, 'text-anchor': 'middle', class: 'chart-empty' }, 'Sem dados ainda'));
    return chartWrap(svg, { title, caption });
  }

  const max = Math.max(1, ...data.map(d => d.count));
  const barW = innerW / data.length;
  svg.appendChild(svgEl('line', { x1: padL, y1: H - padB, x2: W - padR, y2: H - padB, class: 'chart-axis-line' }));

  data.forEach((d, i) => {
    const h = (d.count / max) * innerH;
    const x = padL + i * barW;
    const y = H - padB - h;
    const color = EARTH_COLORS[i % EARTH_COLORS.length];
    svg.appendChild(svgEl('rect', { x: x + 4, y, width: Math.max(barW - 8, 1), height: h, class: 'chart-bar', rx: 3, style: `fill:${color}` }));
    svg.appendChild(svgEl('text', { x: x + barW / 2, y: H - padB + 16, 'text-anchor': 'middle', class: 'chart-value' }, d.n));
    svg.appendChild(svgEl('text', { x: x + barW / 2, y: y - 6, 'text-anchor': 'middle', class: 'chart-value' }, d.count));
  });

  return chartWrap(svg, { title, caption });
}

function heatmap({ title, desc, cardIds, labels, matrix, caption }) {
  const labelFor = id => (labels && labels[id]) || id;
  const n = cardIds.length;
  const cell = 20, padL = 26, padT = 26;
  const W = padL + n * cell, H = padT + n * cell;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' });
  svg.appendChild(svgEl('title', {}, title));
  if (desc) svg.appendChild(svgEl('desc', {}, desc));

  const max = Math.max(1, ...matrix.map(row => Math.max(...row, 0)));

  cardIds.forEach((id, i) => {
    svg.appendChild(svgEl('text', { x: padL + i * cell + cell / 2, y: padT - 8, 'text-anchor': 'middle', class: 'chart-axis' }, id));
    svg.appendChild(svgEl('text', { x: padL - 8, y: padT + i * cell + cell / 2 + 4, 'text-anchor': 'end', class: 'chart-axis' }, id));
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const v = matrix[i][j];
      const opacity = v === 0 ? 0 : 0.12 + 0.88 * (v / max);
      const rect = svgEl('rect', {
        x: padL + j * cell, y: padT + i * cell, width: cell - 1, height: cell - 1,
        class: 'chart-bar', 'fill-opacity': opacity.toFixed(2), style: 'fill:var(--earth-5)',
      });
      if (v > 0) rect.appendChild(svgEl('title', {}, `${labelFor(cardIds[i])} + ${labelFor(cardIds[j])}: ${v}`));
      svg.appendChild(rect);
    }
  }

  return chartWrap(svg, { title, caption });
}
