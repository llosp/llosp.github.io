// Inline SVG line charts for the case studies. No dependency, no canvas, no
// animation and no rAF — a chart is built once when a case study opens and is
// then a static tree, which keeps it inside the performance budget in CLAUDE.md.
//
// Colours may be CSS custom properties (e.g. "var(--yellow)") so charts follow
// the case-study theme.
import { t } from './i18n.js';

const NS = 'http://www.w3.org/2000/svg';

const VB_W = 660;
const VB_H = 360;
const M = { top: 22, right: 26, bottom: 48, left: 66 };

function svgEl(tag, attrs = {}, text) {
  const node = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  if (text != null) node.textContent = text;
  return node;
}

/** Short axis labels: 108780 → "108.8k", 0.55 → "0.55". */
function fmt(value) {
  const abs = Math.abs(value);
  if (abs >= 1000) {
    const scaled = value / 1000;
    return (abs >= 10000 ? Math.round(scaled) : scaled.toFixed(1)) + 'k';
  }
  if (abs >= 100 || Number.isInteger(value)) return String(Math.round(value));
  return abs >= 1 ? value.toFixed(1) : value.toFixed(2);
}

function niceTicks(min, max, count = 5, integer = false) {
  const raw = (max - min) / (count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  let step = [1, 2, 2.5, 5, 10].find(s => s * mag >= raw) * mag;
  if (integer) step = Math.max(1, Math.round(step));
  const start = Math.floor(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step * 0.001; v += step) {
    if (v >= min - step * 0.001) ticks.push(Number(v.toFixed(10)));
  }
  return ticks;
}

function logTicks(min, max) {
  const ticks = [];
  for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++) {
    const v = Math.pow(10, e);
    if (v >= min * 0.999 && v <= max * 1.001) ticks.push(v);
  }
  return ticks.length >= 2 ? ticks : [min, max];
}

/** Maps a data value onto pixels for one axis. */
function makeScale({ min, max, log, from, to }) {
  if (log) {
    const lo = Math.log10(min);
    const hi = Math.log10(max);
    return v => from + ((Math.log10(v) - lo) / (hi - lo)) * (to - from);
  }
  return v => from + ((v - min) / (max - min)) * (to - from);
}

function extent(values, pad = 0.08, log = false) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) { min *= 0.9; max *= 1.1; }
  if (log) return { min: min * 0.7, max: max * 1.4 };
  const span = max - min;
  return { min: min - span * pad, max: max + span * pad };
}

/**
 * Build a static line chart.
 *
 * spec: {
 *   title, desc,                       // accessibility, { en, pt }
 *   xLabel, yLabel, yRightLabel,       // { en, pt }
 *   logY, logYRight,                   // booleans
 *   xTickFormat,                       // optional (value) => string
 *   series: [{ label, color, points: [[x, y], …], axis: 'left'|'right',
 *              dashed, markers }],
 *   annotations: [{ x, y, text, axis, dy }]
 * }
 */
export function lineChart(spec) {
  const svg = svgEl('svg', {
    viewBox: `0 0 ${VB_W} ${VB_H}`,
    class: 'case-chart-svg',
    role: 'img',
    preserveAspectRatio: 'xMidYMid meet'
  });
  if (spec.title) svg.append(svgEl('title', {}, t(spec.title)));
  if (spec.desc) svg.append(svgEl('desc', {}, t(spec.desc)));

  const hasRight = spec.series.some(s => s.axis === 'right');
  const right = VB_W - (hasRight ? M.left : M.right);
  const plot = { x0: M.left, x1: right, y0: VB_H - M.bottom, y1: M.top };

  const xValues = spec.series.flatMap(s => s.points.map(p => p[0]));
  const leftValues = spec.series.filter(s => s.axis !== 'right').flatMap(s => s.points.map(p => p[1]));
  const rightValues = spec.series.filter(s => s.axis === 'right').flatMap(s => s.points.map(p => p[1]));

  const xDomain = extent(xValues, 0);
  const yDomain = extent(leftValues, 0.1, spec.logY);
  const x = makeScale({ ...xDomain, from: plot.x0, to: plot.x1 });
  const y = makeScale({ ...yDomain, log: spec.logY, from: plot.y0, to: plot.y1 });

  let yR = null;
  let yRDomain = null;
  if (hasRight) {
    yRDomain = extent(rightValues, 0.1, spec.logYRight);
    yR = makeScale({ ...yRDomain, log: spec.logYRight, from: plot.y0, to: plot.y1 });
  }

  // ── Grid + left axis ────────────────────────────────────────────────────
  const grid = svgEl('g', { class: 'chart-grid' });
  const yTicks = spec.logY ? logTicks(yDomain.min, yDomain.max) : niceTicks(yDomain.min, yDomain.max);
  yTicks.forEach(tick => {
    const py = y(tick);
    grid.append(svgEl('line', { x1: plot.x0, x2: plot.x1, y1: py, y2: py }));
    svg.append(svgEl('text', {
      x: plot.x0 - 10, y: py + 4, class: 'chart-tick', 'text-anchor': 'end'
    }, fmt(tick)));
  });
  svg.append(grid);

  // Stage/room counts are whole things; a tick at "2.5 furniture pieces" is a lie.
  const xTicks = niceTicks(xDomain.min, xDomain.max, 6, xValues.every(Number.isInteger));
  xTicks.forEach(tick => {
    svg.append(svgEl('text', {
      x: x(tick), y: plot.y0 + 22, class: 'chart-tick', 'text-anchor': 'middle'
    }, spec.xTickFormat ? spec.xTickFormat(tick) : fmt(tick)));
  });

  if (hasRight) {
    const ticks = spec.logYRight ? logTicks(yRDomain.min, yRDomain.max) : niceTicks(yRDomain.min, yRDomain.max);
    ticks.forEach(tick => {
      svg.append(svgEl('text', {
        x: plot.x1 + 10, y: yR(tick) + 4, class: 'chart-tick', 'text-anchor': 'start'
      }, fmt(tick)));
    });
  }

  svg.append(svgEl('line', { x1: plot.x0, x2: plot.x1, y1: plot.y0, y2: plot.y0, class: 'chart-axis' }));
  svg.append(svgEl('line', { x1: plot.x0, x2: plot.x0, y1: plot.y0, y2: plot.y1, class: 'chart-axis' }));

  // ── Axis labels ─────────────────────────────────────────────────────────
  if (spec.xLabel) {
    svg.append(svgEl('text', {
      x: (plot.x0 + plot.x1) / 2, y: VB_H - 8, class: 'chart-axis-label', 'text-anchor': 'middle'
    }, t(spec.xLabel)));
  }
  if (spec.yLabel) {
    svg.append(svgEl('text', {
      x: 14, y: (plot.y0 + plot.y1) / 2, class: 'chart-axis-label', 'text-anchor': 'middle',
      transform: `rotate(-90 14 ${(plot.y0 + plot.y1) / 2})`
    }, t(spec.yLabel)));
  }
  if (spec.yRightLabel) {
    const mid = (plot.y0 + plot.y1) / 2;
    svg.append(svgEl('text', {
      x: VB_W - 12, y: mid, class: 'chart-axis-label', 'text-anchor': 'middle',
      transform: `rotate(90 ${VB_W - 12} ${mid})`
    }, t(spec.yRightLabel)));
  }

  // ── Series ──────────────────────────────────────────────────────────────
  spec.series.forEach(series => {
    const scaleY = series.axis === 'right' ? yR : y;
    const d = series.points
      .map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)} ${scaleY(p[1]).toFixed(1)}`)
      .join(' ');
    const path = svgEl('path', { d, class: 'chart-line', stroke: series.color, fill: 'none' });
    if (series.dashed) path.setAttribute('stroke-dasharray', '7 6');
    svg.append(path);

    if (series.markers !== false) {
      series.points.forEach(p => {
        svg.append(svgEl('circle', {
          cx: x(p[0]).toFixed(1), cy: scaleY(p[1]).toFixed(1), r: 4,
          class: 'chart-dot', fill: series.color
        }));
      });
    }
  });

  // ── Annotations ─────────────────────────────────────────────────────────
  (spec.annotations || []).forEach(a => {
    const scaleY = a.axis === 'right' ? yR : y;
    svg.append(svgEl('text', {
      x: x(a.x), y: scaleY(a.y) + (a.dy ?? -14),
      class: 'chart-annotation', 'text-anchor': a.anchor || 'middle'
    }, t(a.text)));
  });

  return svg;
}

/** Legend chips matching the series colours. */
export function chartLegend(series) {
  const wrap = document.createElement('ul');
  wrap.className = 'chart-legend mono';
  series.filter(s => s.label).forEach(s => {
    const li = document.createElement('li');
    const swatch = document.createElement('span');
    swatch.className = 'chart-swatch';
    // backgroundColor, not the shorthand: the dashed variant paints a
    // background-image that a shorthand would reset.
    swatch.style.backgroundColor = s.color;
    if (s.dashed) swatch.classList.add('chart-swatch--dashed');
    li.append(swatch, document.createTextNode(t(s.label)));
    wrap.append(li);
  });
  return wrap;
}
