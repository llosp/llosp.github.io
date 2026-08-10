// ClicaChorro's balancing spreadsheet, running live on the page.
//
// The sheet solves a clicker economy backwards from one input: how long the run
// should take. This reproduces that solve so a reader can drag the target and
// watch every cost, output and stage time re-derive — the claim "one input cell
// retunes the whole economy" becomes something they verify in three seconds,
// without opening an attachment.
//
//   cost_i   = C0 · aⁱ
//   output_i = P0 · bⁱ
//   t_i      = cost_i / output_i = (C0/P0) · rⁱ,  r = a/b
//   Σ t_i    = (C0/P0) · (rᴺ − 1)/(r − 1)   ← geometric series
//   ⇒ C0     = T · P0 · (r − 1) / (rᴺ − 1)  ← inverted, so T commands the curve
import { lineChart, chartLegend } from './chart.js';
import { t, tk, getLang } from './i18n.js';

const MODEL = { stages: 12, costGrowth: 1.6, outputGrowth: 1.45, baseOutput: 5 };

export function solveEconomy(targetMinutes, model = MODEL) {
  const { stages: n, costGrowth: a, outputGrowth: b, baseOutput: p0 } = model;
  const seconds = targetMinutes * 60;
  const r = a / b;
  const sum = (Math.pow(r, n) - 1) / (r - 1);
  const c0 = (seconds * p0) / sum;

  const rows = [];
  let cumulative = 0;
  for (let i = 0; i < n; i++) {
    const cost = c0 * Math.pow(a, i);
    const output = p0 * Math.pow(b, i);
    const time = cost / output;
    cumulative += time;
    rows.push({ stage: i + 1, cost, output, minutes: time / 60, cumulative: cumulative / 60 });
  }
  return { c0, r, rows, totalMinutes: cumulative / 60 };
}

function buildChart(solved) {
  const series = [
    {
      label: { en: 'Cost (affection)', pt: 'Custo (carinho)' },
      color: 'var(--yellow)',
      points: solved.rows.map(row => [row.stage, row.cost])
    },
    {
      label: { en: 'Idle output /s', pt: 'Produção passiva /s' },
      color: 'var(--pink)',
      dashed: true,
      points: solved.rows.map(row => [row.stage, row.output])
    }
  ];
  return { series, svg: lineChart({
    title: { en: 'Cost against idle output, by furniture piece', pt: 'Custo contra produção passiva, por móvel' },
    desc: {
      en: 'Both curves are geometric on a logarithmic axis. Cost climbs faster than output, so each stage costs slightly more time than the last.',
      pt: 'As duas curvas são geométricas num eixo logarítmico. O custo sobe mais rápido que a produção, então cada estágio custa um pouco mais de tempo que o anterior.'
    },
    xLabel: { en: 'Furniture piece', pt: 'Móvel' },
    yLabel: { en: 'Affection (log)', pt: 'Carinho (log)' },
    logY: true,
    series
  }) };
}

// The readouts are derived at runtime, so they can't be pre-written as { en, pt }
// pairs like the rest of the copy. They're formatted for the active locale instead
// — "108,780" would read as one hundred and eight point seven eight in pt-BR.
const locale = () => (getLang() === 'pt' ? 'pt-BR' : 'en-US');

function num(value, decimals = 0) {
  return value.toLocaleString(locale(), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function economyTuner(initialMinutes = 45) {
  const wrap = document.createElement('div');
  wrap.className = 'case-econ-tuner';

  const head = document.createElement('div');
  head.className = 'tuner-head';
  const heading = document.createElement('h4');
  heading.textContent = tk('tuner.title');
  head.append(heading);

  const control = document.createElement('label');
  control.className = 'tuner-control';
  const controlLabel = document.createElement('span');
  controlLabel.className = 'mono';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '10';
  slider.max = '180';
  slider.step = '5';
  slider.value = String(initialMinutes);
  slider.className = 'tuner-range';
  control.append(controlLabel, slider);

  const readouts = document.createElement('dl');
  readouts.className = 'tuner-readouts mono';

  const chartWrap = document.createElement('div');
  chartWrap.className = 'case-chart';

  const note = document.createElement('p');
  note.className = 'tuner-note';
  note.textContent = tk('tuner.note');

  wrap.append(head, control, readouts, chartWrap, note);

  // Each pair is wrapped so the grid can't split a label from its value.
  function readout(term, value) {
    const pair = document.createElement('div');
    pair.className = 'tuner-readout';
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = value;
    pair.append(dt, dd);
    return pair;
  }

  function update() {
    const minutes = Number(slider.value);
    const solved = solveEconomy(minutes);
    const last = solved.rows[solved.rows.length - 1];

    controlLabel.textContent = `${tk('tuner.label')}: ${minutes} min`;
    slider.setAttribute('aria-label', tk('tuner.label'));
    slider.setAttribute('aria-valuetext', `${minutes} min`);

    readouts.replaceChildren(
      readout(tk('tuner.derived'), num(Math.round(solved.c0))),
      readout(t({ en: 'Final piece costs', pt: 'Peça final custa' }), num(Math.round(last.cost))),
      readout(t({ en: 'Final idle output', pt: 'Produção final' }), `${num(last.output, 1)}/s`),
      // Proves the solve: the per-stage times always sum back to the input.
      readout(tk('tuner.check'), `${num(solved.totalMinutes, 1)} min`)
    );

    const { series, svg } = buildChart(solved);
    chartWrap.replaceChildren(svg, chartLegend(series));
  }

  let frame = 0;
  slider.addEventListener('input', () => {
    // Coalesce drag events into one repaint. Not a loop: each input schedules
    // at most one frame, and nothing reschedules itself.
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; update(); });
  });

  update();
  return wrap;
}
