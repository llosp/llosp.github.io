import { projects } from './data/projects.js';
import { t, tk } from './i18n.js';

const overlay = () => document.getElementById('case-overlay');
const HASH_PREFIX = '#case/';

let currentId = null;
let invoker = null;
let pushedHash = false;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function section(labelKey, ...children) {
  const wrap = el('section', 'case-section');
  wrap.append(el('h3', 'case-section-label', tk(labelKey)), ...children);
  return wrap;
}

function renderTable(tb) {
  const wrap = el('div', 'case-table-wrap');
  const table = el('table', 'case-table');
  const thead = el('thead');
  const headRow = el('tr');
  tb.headers.forEach(h => headRow.append(el('th', null, t(h))));
  thead.append(headRow);
  const tbody = el('tbody');
  tb.rows.forEach(row => {
    const tr = el('tr');
    row.forEach(cell => {
      // cells are plain strings/numbers, or { en, pt } for translatable labels
      const value = cell && typeof cell === 'object' ? t(cell) : cell;
      tr.append(el('td', null, value));
    });
    tbody.append(tr);
  });
  if (tb.caption) table.append(el('caption', null, t(tb.caption)));
  table.append(thead, tbody);
  wrap.append(table);
  return wrap;
}

function buildBody(project) {
  const cs = project.caseStudy;
  const body = document.getElementById('case-body');
  body.replaceChildren();
  if (!cs) return;

  if (cs.heroVideo) {
    const fig = el('figure', 'case-hero-video');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${cs.heroVideo.youtube}`;
    iframe.title = t(cs.heroVideo.title);
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; clipboard-write; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    fig.append(iframe);
    body.append(fig);
  } else if (cs.heroImage) {
    const fig = el('figure', 'case-hero-img');
    const img = el('img');
    img.src = cs.heroImage.src;
    img.alt = t(cs.heroImage.alt);
    img.loading = 'lazy';
    img.decoding = 'async';
    fig.append(img);
    body.append(fig);
  }

  if (cs.overview) body.append(section('case.overview', el('p', null, t(cs.overview))));
  if (cs.role) {
    const p = el('p', 'case-meta-role', t(cs.role));
    body.append(section('case.role', p));
  }

  if (cs.responsibilities?.length) {
    const grid = el('div', 'case-responsibilities');
    cs.responsibilities.forEach(col => {
      const c = el('div', 'case-resp-col');
      c.append(el('h4', null, t(col.group)));
      const ul = el('ul');
      col.items.forEach(item => ul.append(el('li', 'chip', t(item))));
      c.append(ul);
      grid.append(c);
    });
    body.append(section('case.responsibilities', grid));
  }

  if (cs.challenge) body.append(section('case.challenge', el('p', null, t(cs.challenge))));

  if (cs.coreLoop) {
    const loop = el('div', 'case-loop');
    cs.coreLoop.steps.forEach((step, i) => {
      loop.append(el('span', 'case-loop-step', t(step)));
      if (i < cs.coreLoop.steps.length - 1) {
        loop.append(el('span', 'case-loop-arrow', '→'));
      }
    });
    loop.append(el('span', 'case-loop-arrow case-loop-back', '⟲'));
    const children = [loop];
    if (cs.coreLoop.note) children.push(el('p', null, t(cs.coreLoop.note)));
    body.append(section('case.coreLoop', ...children));
  }

  if (cs.systems?.length) {
    const grid = el('div', 'case-systems');
    cs.systems.forEach(system => {
      const card = el('article', 'case-system');
      card.append(el('h4', null, t(system.title)), el('p', null, t(system.body)));
      grid.append(card);
    });
    body.append(section('case.systems', grid));
  }

  if (cs.progression) body.append(section('case.progression', el('p', null, t(cs.progression))));

  if (cs.combat) {
    const children = [];
    if (cs.combat.formula) children.push(el('p', 'case-formula', t(cs.combat.formula)));
    if (cs.combat.body) children.push(el('p', null, t(cs.combat.body)));
    body.append(section('case.combat', ...children));
  }

  if (cs.balancing) {
    const children = [];
    if (cs.balancing.formula) children.push(el('p', 'case-formula', t(cs.balancing.formula)));
    const tables = cs.balancing.tables || (cs.balancing.table ? [cs.balancing.table] : []);
    tables.forEach(tb => children.push(renderTable(tb)));
    if (cs.balancing.body) children.push(el('p', null, t(cs.balancing.body)));
    body.append(section('case.balancing', ...children));
  }

  if (cs.implementation) body.append(section('case.implementation', el('p', null, t(cs.implementation))));

  if (cs.gallery?.length) {
    const grid = el('div', 'case-gallery');
    cs.gallery.forEach(g => {
      const img = el('img');
      img.src = g.src;
      img.alt = t(g.alt);
      img.loading = 'lazy';
      img.decoding = 'async';
      grid.append(img);
    });
    body.append(section('case.gallery', grid));
  }

  if (cs.learnings) body.append(section('case.learnings', el('p', null, t(cs.learnings))));

  if (cs.links?.length) {
    const row = el('div', 'case-links');
    cs.links.forEach(link => {
      const a = el('a', 'btn case-link', t(link.label));
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener';
      row.append(a);
    });
    body.append(row);
  }
}

function render(project) {
  document.getElementById('case-title').textContent = project.name;
  document.getElementById('case-type').textContent = `${t(project.type)} · ${t(project.role)}`;
  document.getElementById('case-close').setAttribute('aria-label', tk('case.close'));
  buildBody(project);
}

function animateIn() {
  const panel = overlay().querySelector('.case-panel');
  if (window.gsap && !document.documentElement.classList.contains('no-motion')) {
    gsap.fromTo(overlay().querySelector('.case-backdrop'),
      { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(panel,
      { yPercent: 6, opacity: 0, rotate: -1 },
      { yPercent: 0, opacity: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.4)' });
  }
}

export function openCase(id, { fromHash = false } = {}) {
  const project = projects.find(p => p.id === id);
  if (!project || currentId === id) return;

  currentId = id;
  invoker = fromHash ? null : document.activeElement;
  render(project);

  overlay().hidden = false;
  document.documentElement.classList.add('no-scroll');
  if (!fromHash) {
    history.pushState({ case: id }, '', HASH_PREFIX + id);
    pushedHash = true;
    animateIn();
  }
  document.getElementById('case-body').scrollTop = 0;
  document.getElementById('case-close').focus();
}

export function closeCase({ fromPopstate = false } = {}) {
  if (currentId === null) return;
  currentId = null;

  overlay().hidden = true;
  document.documentElement.classList.remove('no-scroll');

  if (!fromPopstate) {
    if (pushedHash) history.back();
    else history.pushState(null, '', location.pathname + location.search);
  }
  pushedHash = false;

  invoker?.focus();
  invoker = null;
}

function trapFocus(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeCase();
    return;
  }
  if (e.key !== 'Tab') return;
  const focusables = overlay().querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function idFromHash() {
  return location.hash.startsWith(HASH_PREFIX)
    ? location.hash.slice(HASH_PREFIX.length)
    : null;
}

export function initCaseStudy() {
  // Delegated open (cards + buttons are rendered dynamically)
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-case-open]');
    if (trigger) openCase(trigger.dataset.caseOpen);
    else if (e.target.closest('[data-case-close]')) closeCase();
  });

  overlay().addEventListener('keydown', trapFocus);

  // Back/forward sync
  window.addEventListener('popstate', () => {
    const id = idFromHash();
    if (id) openCase(id, { fromHash: true });
    else closeCase({ fromPopstate: true });
  });

  // Re-render open case on language switch
  document.addEventListener('langchange', () => {
    const project = projects.find(p => p.id === currentId);
    if (project) render(project);
  });

  // Cold deep link: #case/<id>
  const initial = idFromHash();
  if (initial) openCase(initial, { fromHash: true });
}
