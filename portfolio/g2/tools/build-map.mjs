// Builds mapa-mental.svg: a single A3-portrait poster of the G2 synthesis,
// laid out as a top-to-bottom mind map in the portfolio's visual language
// (Archivo Black display, Space Mono labels, navy/black/yellow/pink palette,
// thick borders + hard offset shadows, tilted sticker cards).
//
// The three fonts are embedded as base64 data URIs so the SVG renders and
// prints identically anywhere, with no external files. Run:
//   node tools/build-map.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(here, '..', '..', 'assets', 'fonts');
const b64 = (f) => readFileSync(join(fontsDir, f)).toString('base64');
const face = (family, file, weight = 400) =>
  `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};` +
  `src:url(data:font/woff2;base64,${b64(file)}) format('woff2');}`;

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  yellow: '#FFC400', navy: '#0F1B3C', black: '#111111',
  pink: '#FF4F87', paper: '#F5F1E8',
};
const DISP = "Archivo Black, sans-serif";
const TEXT = "Space Grotesk, sans-serif";
const MONO = "Space Mono, monospace";

// ── Canvas: A3 portrait (297 x 420 mm -> ratio 1:1.4142) ────────────────────
const W = 1191, H = 1684;
const M = 60;               // outer margin
const COLX = M + 40;        // left edge of content bands (right of the spine)
const CONTENT_R = W - M;    // right edge of content
const SPINE_X = M + 6;      // vertical trunk x

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Rough advance-width estimates (em factor per glyph) for box sizing.
const widthOf = (text, size, font) => {
  const f = font === DISP ? 0.66 : font === MONO ? 0.605 : 0.53;
  return text.length * size * f;
};

const out = [];
const push = (s) => out.push(s);

// ── Primitives ───────────────────────────────────────────────────────────--
function text(x, y, str, { size = 16, font = TEXT, fill = C.paper, weight = 400, anchor = 'start', spacing = 0, upper = false } = {}) {
  const ls = spacing ? ` letter-spacing="${spacing}"` : '';
  const w = weight !== 400 ? ` font-weight="${weight}"` : '';
  const s = upper ? String(str).toUpperCase() : str;
  return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}"${w} text-anchor="${anchor}"${ls}>${esc(s)}</text>`;
}

// Neo-brutalist card: solid offset shadow behind a bordered panel, optional tilt.
function card({ x, y, w, h, fill, border = C.black, bw = 4, shadow = C.pink, dx = 9, dy = 9, tilt = 0, rx = 0 }) {
  const cx = x + w / 2, cy = y + h / 2;
  const t = tilt ? ` transform="rotate(${tilt} ${cx} ${cy})"` : '';
  return `<g${t}>` +
    `<rect x="${x + dx}" y="${y + dy}" width="${w}" height="${h}" fill="${shadow}" rx="${rx}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${border}" stroke-width="${bw}" rx="${rx}"/>` +
    `</g>`;
}

// Pill node used in the process / path / reach chains.
function pill({ x, y, str, fill = C.navy, ink = C.paper, border = C.paper, size = 18, padX = 18, h = 46, bw = 3, shadow = 'rgba(0,0,0,0.35)', dx = 5, dy = 5 }) {
  const w = Math.max(widthOf(str, size, DISP) + padX * 2, 74);
  const cx = x + w / 2;
  return {
    w,
    svg: `<g>` +
      `<rect x="${x + dx}" y="${y + dy}" width="${w}" height="${h}" fill="${shadow}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${border}" stroke-width="${bw}"/>` +
      text(cx, y + h / 2 + size * 0.34, str, { size, font: DISP, fill: ink, anchor: 'middle', upper: true }) +
      `</g>`,
  };
}

// Small solid triangle arrow. dir: 'r' right, 'd' down.
function arrow(cx, cy, dir = 'r', color = C.yellow, s = 10) {
  const p = dir === 'r'
    ? `${cx - s * 0.5},${cy - s} ${cx + s * 0.7},${cy} ${cx - s * 0.5},${cy + s}`
    : `${cx - s},${cy - s * 0.5} ${cx},${cy + s * 0.7} ${cx + s},${cy - s * 0.5}`;
  return `<polygon points="${p}" fill="${color}"/>`;
}

// A horizontal chain of pills separated by arrows, wrapping across a max width.
function chain({ x, y, items, rowGap = 22, arrowGap = 20, pillOpts = {}, arrowColor = C.yellow, maxR = CONTENT_R, loopFrom = -1, loopTo = -1 }) {
  const h = pillOpts.h ?? 46;
  let cx = x, cy = y;
  const parts = [];
  const centers = [];
  items.forEach((it, i) => {
    const opt = { ...pillOpts, x: cx, y: cy, str: it.str, ...(it.opts || {}) };
    const p = pill(opt);
    // wrap if it would overflow
    if (cx + p.w > maxR && cx > x) {
      cx = x; cy += h + rowGap;
      opt.x = cx; opt.y = cy;
      const p2 = pill(opt);
      parts.push(p2.svg);
      centers.push({ x: cx + p2.w / 2, xl: cx, xr: cx + p2.w, yTop: cy, yBot: cy + h });
      cx += p2.w + arrowGap;
    } else {
      parts.push(p.svg);
      centers.push({ x: cx + p.w / 2, xl: cx, xr: cx + p.w, yTop: cy, yBot: cy + h });
      cx += p.w;
      if (i < items.length - 1) cx += arrowGap;
    }
  });
  // Arrows between consecutive pills that landed on the same row, centred in
  // the gap between the left pill's right edge and the right pill's left edge.
  const arrows = [];
  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i], b = centers[i + 1];
    if (Math.abs(a.yTop - b.yTop) < 2) {
      const midY = (a.yTop + a.yBot) / 2;
      arrows.push(arrow((a.xr + b.xl) / 2, midY, 'r', arrowColor, 11));
    }
  }
  return { svg: parts.join('') + arrows.join(''), bottom: cy + h, centers };
}

// Block stamp (about-stamps style): filled box, thin black border, hard shadow.
function stamp({ x, y, str, fill = C.yellow, ink = C.black, tilt = 0, size = 16 }) {
  const padX = 14, h = 34;
  const w = widthOf(str, size, MONO) + padX * 2;
  const cx = x + w / 2, cy = y + h / 2;
  const t = tilt ? ` transform="rotate(${tilt} ${cx} ${cy})"` : '';
  return {
    w,
    svg: `<g${t}>` +
      `<rect x="${x + 4}" y="${y + 4}" width="${w}" height="${h}" fill="${C.black}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${C.black}" stroke-width="2.5"/>` +
      text(cx, y + h / 2 + size * 0.35, str, { size, font: MONO, fill: ink, anchor: 'middle', weight: 700 }) +
      `</g>`,
  };
}

// Category card with a title and a stack of item lines.
function catCard({ x, y, w, h, title, titleColor, items, tilt = 0, fill = C.paper, shadow = C.pink }) {
  const cx = x + w / 2, cy = y + h / 2;
  const t = tilt ? ` transform="rotate(${tilt} ${cx} ${cy})"` : '';
  const pad = 20;
  const lines = [];
  const tSize = Math.min(22, (w - pad * 2) / (title.length * 0.72));
  lines.push(text(x + pad, y + pad + tSize * 0.8, title, { size: tSize, font: DISP, fill: titleColor, upper: true }));
  let iy = y + pad + tSize * 0.8 + 30;
  const iSize = 15.5;
  for (const it of items) {
    lines.push(`<polygon points="${x + pad},${iy - iSize * 0.42} ${x + pad + iSize * 0.5},${iy - iSize * 0.05} ${x + pad},${iy + iSize * 0.32}" fill="${titleColor}"/>`);
    lines.push(text(x + pad + iSize + 6, iy, it, { size: iSize, font: TEXT, fill: C.black }));
    iy += iSize + 9;
  }
  return `<g${t}>` +
    `<rect x="${x + 9}" y="${y + 9}" width="${w}" height="${h}" fill="${shadow}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${C.black}" stroke-width="4"/>` +
    lines.join('') + `</g>`;
}

// Spine node marker: a small numbered disc on the trunk.
function node(cx, cy, num, ring = C.yellow) {
  return `<g>` +
    `<circle cx="${cx + 3}" cy="${cy + 3}" r="21" fill="rgba(0,0,0,0.4)"/>` +
    `<circle cx="${cx}" cy="${cy}" r="21" fill="${C.black}" stroke="${ring}" stroke-width="3"/>` +
    text(cx, cy + 6, num, { size: 17, font: MONO, fill: ring, anchor: 'middle', weight: 700 }) +
    `</g>`;
}

function stageTitle(x, y, num, title, { color = C.yellow, tColor = C.paper, sub = null, subColor = 'rgba(245,241,232,0.8)', size = 40 } = {}) {
  const parts = [];
  parts.push(node(SPINE_X, y - size * 0.32, num, color));
  parts.push(`<line x1="${SPINE_X + 21}" y1="${y - size * 0.32}" x2="${x - 8}" y2="${y - size * 0.32}" stroke="${color}" stroke-width="2.5"/>`);
  parts.push(text(x, y, title, { size, font: DISP, fill: tColor, upper: true, spacing: -1 }));
  if (sub) parts.push(text(x, y + 30, sub, { size: 17, font: TEXT, fill: subColor }));
  return parts.join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// Background
push(`<rect width="${W}" height="${H}" fill="${C.navy}"/>`);
// Full-bleed subtle grain, mirroring body::after in base.css.
push(`<rect width="${W}" height="${H}" fill="url(#grain)" opacity="0.045"/>`);

// Trunk spine (drawn behind nodes), a dashed vertical line down the map.
push(`<line x1="${SPINE_X}" y1="470" x2="${SPINE_X}" y2="1470" stroke="${C.yellow}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" opacity="0.7"/>`);

// ── IDENTITY HUB ────────────────────────────────────────────────────────────
push(text(M, 96, 'SÍNTESE VISUAL · DESIGN G2', { size: 18, font: MONO, fill: C.yellow, spacing: 6 }));

// Layered wordmark PEDRO / LOPES (stroke-behind + fill-in-front).
const wmSize = 120;
const wmX = M + 4;
push(`<g transform="rotate(-2 ${wmX} 210)">` +
  text(wmX + 6, 210, 'PEDRO', { size: wmSize, font: DISP, fill: 'none' }).replace('<text', `<text stroke="${C.pink}" stroke-width="2"`) +
  text(wmX + 6, 210 + wmSize * 0.92, 'LOPES', { size: wmSize, font: DISP, fill: 'none' }).replace('<text', `<text stroke="${C.pink}" stroke-width="2"`) +
  `</g>`);
push(text(wmX, 206, 'PEDRO', { size: wmSize, font: DISP, fill: C.yellow }).replace('<text', `<text style="text-shadow:6px 6px 0 ${C.black}"`));
push(text(wmX, 206 + wmSize * 0.92, 'LOPES', { size: wmSize, font: DISP, fill: C.yellow }));

// GAME DEVELOPER paper stamp
(() => {
  const s = 22, str = 'GAME DEVELOPER', padX = 22, h = 52;
  const w = widthOf(str, s, MONO) + padX * 2, x = wmX, y = 350;
  const cx = x + w / 2, cy = y + h / 2;
  push(`<g transform="rotate(-1.5 ${cx} ${cy})">` +
    `<rect x="${x + 5}" y="${y + 5}" width="${w}" height="${h}" fill="${C.black}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.paper}" stroke="${C.black}" stroke-width="3"/>` +
    text(cx, cy + s * 0.35, str, { size: s, font: MONO, fill: C.black, anchor: 'middle', weight: 700, spacing: 3 }) +
    `</g>`);
})();

// Keyword line
push(text(wmX + 2, 452, 'DESIGN  •  CODE  •  ART  •  SYSTEMS  •  PRODUCTION', { size: 18, font: MONO, fill: C.yellow, spacing: 2 }));

// Thesis panel on the right of the wordmark block
(() => {
  const x = 640, y = 118, w = CONTENT_R - x, h = 250;
  push(card({ x, y, w, h, fill: 'rgba(255,196,0,0.06)', border: C.yellow, bw: 2, shadow: 'rgba(255,79,135,0.18)', dx: 8, dy: 8 }));
  push(`<line x1="${x + 22}" y1="${y + 30}" x2="${x + 22}" y2="${y + h - 30}" stroke="${C.yellow}" stroke-width="5"/>`);
  push(text(x + 42, y + 52, 'A ideia central', { size: 15, font: MONO, fill: C.pink, spacing: 3, upper: true }));
  wrap('Não quero apenas fazer jogos.', x + 42, y + 92, w - 64, { size: 22, font: TEXT, fill: 'rgba(245,241,232,0.85)' });
  wrap('QUERO AUMENTAR CADA VEZ MAIS O QUE SOU CAPAZ DE CRIAR.', x + 42, y + 134, w - 64, { size: 30, font: DISP, fill: C.yellow, lh: 34, upper: true });
})();

// ── 01 · O QUE JÁ FAÇO ──────────────────────────────────────────────────────
push(stageTitle(COLX, 545, '01', 'O que já faço', { color: C.pink, sub: 'Não quero ficar preso a uma única parte do desenvolvimento.' }));
(() => {
  const y = 585, h = 188, gap = 16;
  const n = 5, w = (CONTENT_R - COLX - gap * (n - 1)) / n;
  const data = [
    ['Game Design', C.navy, ['Gameplay', 'Sistemas', 'Progressão', 'Balanceamento', 'Documentação']],
    ['Programming', C.pink, ['Godot', 'Unity', 'Lógica', 'Prototipação']],
    ['Art', C.navy, ['2D', '3D', 'UI', 'Direção visual']],
    ['Production', C.pink, ['Planejamento', 'Iteração', 'Escopo', 'Equipe']],
    ['Experimentation', C.navy, ['Game Jams', 'Projetos autorais', 'Protótipos', 'Testes']],
  ];
  data.forEach((d, i) => {
    const tilt = i % 2 ? 1.4 : -1.4;
    push(catCard({ x: COLX + i * (w + gap), y, w, h, title: d[0], titleColor: d[1], items: d[2], tilt, shadow: i % 2 ? C.pink : C.yellow }));
  });
})();

// ── 02 · COMO EU TRABALHO ───────────────────────────────────────────────────
push(stageTitle(COLX, 830, '02', 'Como eu trabalho', { color: C.yellow }));
(() => {
  const y = 862;
  const steps = ['Ideia', 'Entender', 'Prototipar', 'Testar', 'Errar', 'Iterar', 'Lançar'];
  const items = steps.map((s, i) => ({
    str: s,
    opts: (i === 4 || i === 5)
      ? { fill: 'rgba(255,79,135,0.12)', border: C.pink, ink: C.pink }
      : (i === 6 ? { fill: C.yellow, border: C.black, ink: C.black, shadow: C.pink } : {}),
  }));
  const ch = chain({ x: COLX, y, items, pillOpts: { size: 17, h: 48 }, arrowColor: C.yellow });
  push(ch.svg);
  // loop annotation under testar/errar/iterar
  push(loopGlyph(COLX + 6, ch.bottom + 25));
  push(text(COLX + 26, ch.bottom + 30, 'o ciclo real: testar · errar · iterar', { size: 15, font: MONO, fill: C.pink, spacing: 1 }));
  // two notes
  wrap('“Gosto de entender o problema antes de sair fazendo, mas também gosto de colocar as ideias para funcionar o quanto antes.”', COLX, ch.bottom + 66, 500, { size: 15.5, font: TEXT, fill: 'rgba(245,241,232,0.9)', lh: 21 });
  wrap('“Se não funciona, eu prefiro descobrir testando e mudar.”', COLX + 560, ch.bottom + 66, CONTENT_R - COLX - 560, { size: 15.5, font: TEXT, fill: 'rgba(245,241,232,0.9)', lh: 21 });
})();

// ── 03 · O QUE QUERO EXPANDIR ───────────────────────────────────────────────
push(stageTitle(COLX, 1035, '03', 'O que quero expandir', { color: C.yellow, sub: 'Já consigo fazer muita coisa. Agora quero fazer coisas maiores.' }));
(() => {
  const y = 1075, h = 172, gap = 18;
  const n = 4, w = (CONTENT_R - COLX - gap * (n - 1)) / n;
  const data = [
    ['Técnica', ['Código mais robusto', 'Sistemas complexos', 'Ferramentas', 'Pipeline']],
    ['Criatividade', ['Direção de arte', 'Narrativa', 'Experiência', 'Direção criativa']],
    ['Produção', ['Escopo', 'Planejamento', 'Equipe', 'Pipeline de produção']],
    ['Mercado', ['Marketing', 'Publicação', 'Comunidade', 'Business']],
  ];
  data.forEach((d, i) => {
    const tilt = i % 2 ? 1.2 : -1.2;
    // navy cards on this stage (inverse), yellow titles
    const x = COLX + i * (w + gap), cx = x + w / 2, cy = y + h / 2;
    const t = ` transform="rotate(${tilt} ${cx} ${cy})"`;
    const pad = 20, lines = [];
    lines.push(text(x + pad, y + 40, d[0], { size: 24, font: DISP, fill: C.yellow, upper: true }));
    lines.push(`<line x1="${x + pad}" y1="${y + 52}" x2="${x + w - pad}" y2="${y + 52}" stroke="rgba(245,241,232,0.25)" stroke-width="2"/>`);
    let iy = y + 78;
    for (const it of d[1]) {
      lines.push(`<polygon points="${x + pad},${iy - 6} ${x + pad + 7},${iy - 1.5} ${x + pad},${iy + 3}" fill="${C.yellow}"/>`);
      lines.push(text(x + pad + 14, iy, it, { size: 15, font: TEXT, fill: C.paper }));
      iy += 24;
    }
    push(`<g${t}><rect x="${x + 9}" y="${y + 9}" width="${w}" height="${h}" fill="${C.pink}"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.navy}" stroke="${C.black}" stroke-width="4"/>` +
      lines.join('') + `</g>`);
  });
  // statement
  wrap('O desafio agora não é só conseguir fazer.', COLX, 1300, 900, { size: 24, font: DISP, fill: C.paper, upper: true, lh: 28 });
  push(text(COLX, 1332, 'É CONSEGUIR FAZER MAIOR.', { size: 26, font: DISP, fill: C.yellow, upper: true }));
})();

// ── 04 · MEU CAMINHO ────────────────────────────────────────────────────────
push(stageTitle(COLX, 1385, '04', 'Meu caminho', { color: C.yellow }));
(() => {
  const y = 1415;
  const steps = ['Aprender', 'Criar', 'Publicar', 'Aprender c/ o público', 'Criar de novo', 'Formar equipe', 'Aumentar a escala', 'Estúdio'];
  const items = steps.map((s, i) => ({ str: s, opts: i === steps.length - 1 ? { fill: C.yellow, border: C.black, ink: C.black, shadow: C.pink, size: 18 } : {} }));
  const ch = chain({ x: COLX, y, items, pillOpts: { size: 16, h: 44 }, arrowColor: C.yellow });
  push(ch.svg);
  // example stamps
  push(text(COLX, ch.bottom + 34, 'NA PRÁTICA, PARA MIM:', { size: 14, font: MONO, fill: C.yellow, spacing: 3 }));
  const stamps = [['PUC-Rio', C.yellow, -2], ['Game Jams', C.pink, 1.5], ['Projetos próprios', C.paper, -1], ['Prisma', C.yellow, 2], ['Protótipos', C.pink, -1.5], ['Jogos publicados', C.paper, 1], ['Comunidade', C.yellow, -2], ['Equipe', C.pink, 1.5]];
  let sx = COLX, sy = ch.bottom + 50;
  for (const [str, fill, tilt] of stamps) {
    const st = stamp({ x: sx, y: sy, str, fill, ink: C.black, tilt });
    if (sx + st.w > CONTENT_R) { sx = COLX; sy += 48; }
    const st2 = stamp({ x: sx, y: sy, str, fill, ink: C.black, tilt });
    push(st2.svg);
    sx += st2.w + 16;
  }
})();

// ── 05 · OBJETIVO (endpoint) ────────────────────────────────────────────────
(() => {
  const y = 1548;
  // strongest visual: big yellow studio panel spanning the width
  const x = M, w = W - M * 2, h = 108;
  push(node(SPINE_X, y + 6, '05', C.yellow));
  push(`<line x1="${SPINE_X}" y1="1470" x2="${SPINE_X}" y2="${y + 6}" stroke="${C.yellow}" stroke-width="3" stroke-dasharray="2 10" opacity="0.7"/>`);
  push(`<g transform="rotate(-1 ${x + w / 2} ${y + h / 2})">` +
    `<rect x="${x + 12}" y="${y + 12}" width="${w}" height="${h}" fill="${C.pink}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.yellow}" stroke="${C.black}" stroke-width="5"/>` +
    text(x + 30, y + 34, 'O OBJETIVO DE LONGO PRAZO', { size: 15, font: MONO, fill: C.black, spacing: 3, weight: 700 }) +
    text(x + 28, y + 84, 'MEU PRÓPRIO ESTÚDIO DE JOGOS', { size: 46, font: DISP, fill: C.black, spacing: -1, upper: true }) +
    `</g>`);
  // reach chain, right-aligned cluster under the panel
  const ry = y + h + 34;
  const reach = chain({ x: COLX, y: ry, items: [{ str: 'Meus jogos' }, { str: 'Jogadores' }, { str: 'Mundo', opts: { fill: C.yellow, border: C.black, ink: C.black, shadow: C.pink } }], pillOpts: { size: 17, h: 46 }, arrowColor: C.yellow, maxR: 720 });
  push(reach.svg);
  // final line
  push(text(760, ry + 8, 'Quero colocar', { size: 26, font: DISP, fill: C.paper, upper: true }));
  push(text(760, ry + 40, 'meus jogos', { size: 26, font: DISP, fill: C.yellow, upper: true }));
  push(text(760, ry + 72, 'no mundo.', { size: 26, font: DISP, fill: C.yellow, upper: true }));
})();

// footer credit
push(text(M, H - 24, 'PEDRO LOPES · GAME DEVELOPER · SÍNTESE VISUAL G2', { size: 13, font: MONO, fill: 'rgba(245,241,232,0.5)', spacing: 2 }));
push(text(CONTENT_R, H - 24, 'lope.design', { size: 13, font: MONO, fill: 'rgba(245,241,232,0.5)', anchor: 'end', spacing: 2 }));

// ── helpers that append multi-line text ─────────────────────────────────────
function wrap(str, x, y, maxW, { size = 16, font = TEXT, fill = C.paper, lh = null, upper = false } = {}) {
  const words = String(str).split(' ');
  const lineH = lh || size * 1.3;
  let line = '', cy = y;
  const flush = () => { if (line) push(text(x, cy, line, { size, font, fill, upper })); };
  for (const wd of words) {
    const test = line ? line + ' ' + wd : wd;
    if (widthOf(test, size, font) > maxW && line) { flush(); cy += lineH; line = wd; }
    else line = test;
  }
  flush();
}
function loopGlyph(cx, cy) {
  return `<path d="M ${cx + 8} ${cy} a 8 8 0 1 1 -6 -3" fill="none" stroke="${C.pink}" stroke-width="2.5"/>` +
    `<polygon points="${cx + 2},${cy - 6} ${cx + 8},${cy - 3} ${cx + 3},${cy + 2}" fill="${C.pink}"/>`;
}

// NOTE: wrap()/loopGlyph() are hoisted (function declarations) so their use
// above is fine even though they read below.

// ── Assemble ────────────────────────────────────────────────────────────────
const fonts =
  face('Archivo Black', 'archivo-black-latin.woff2', 400) +
  face('Space Grotesk', 'space-grotesk-latin.woff2', 400) +
  face('Space Mono', 'space-mono-400-latin.woff2', 400) +
  face('Space Mono', 'space-mono-700-latin.woff2', 700);

const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="297mm" height="420mm" viewBox="0 0 ${W} ${H}" font-family="${TEXT}">
<defs>
<style>${fonts}
text{ -webkit-font-smoothing:antialiased; }
</style>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0"/></filter>
</defs>
${out.join('\n')}
</svg>`;

writeFileSync(join(here, '..', 'mapa-mental.svg'), svg);
console.log('wrote mapa-mental.svg (' + svg.length + ' bytes)');
