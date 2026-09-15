// Single source of truth for project card and skill group markup.
// Used at runtime by render.js (language switches) AND by tools/bake-static.mjs
// (generates the static EN markup baked into index.html). Because both paths
// call the same functions, the baked HTML and the re-rendered HTML can never
// drift apart. If you change markup here, regenerate the baked blocks:
//   node tools/bake-static.mjs
import { t, tk } from './i18n.js';

const esc = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

export function projectCardHTML(project, i) {
  const num = String(i + 1).padStart(2, '0');
  const playTagKey = project.playable ? 'projects.playBrowser'
    : project.playUrl ? 'projects.playItch'
    : null;

  // The media is a real link so the card works with JavaScript disabled:
  // it goes straight to the playable build when one exists. With JS on,
  // casestudy.js intercepts the click and opens the case study instead.
  const mediaHref = project.playUrl || '#projects';
  const external = project.playUrl ? ' target="_blank" rel="noopener"' : '';

  const badge = project.badge ? `
      <img class="project-badge" src="${esc(project.badge.src)}" alt="${esc(t(project.badge.alt))}" loading="lazy" decoding="async">` : '';

  const playTag = playTagKey ? `
      <span class="play-tag mono">${esc(tk(playTagKey))}</span>` : '';

  const playAction = project.playUrl ? `
      <a class="btn btn-play" href="${esc(project.playUrl)}" target="_blank" rel="noopener">${esc(tk(playTagKey))}</a>` : '';

  return `<li class="project reveal" style="--project-accent: ${esc(project.accent)}" data-playable="${project.playable ? 'true' : 'false'}">
  <a class="project-media" href="${esc(mediaHref)}"${external} data-case-open="${esc(project.id)}" aria-label="${esc(tk('projects.open'))} · ${esc(t(project.name))}">
    <img src="${esc(project.cover)}" alt="${esc(t(project.coverAlt))}" loading="lazy" decoding="async" width="1200" height="800">
    <span class="project-num mono">${num}</span>${badge}${playTag}
  </a>
  <div class="project-info">
    <p class="project-type">${esc(t(project.type))}</p>
    <h3 class="project-name">${esc(t(project.name))}</h3>
    <p class="project-role">${esc(t(project.role))}</p>
    <p class="project-summary">${esc(t(project.summary))}</p>
    <ul class="project-tools">${project.tools.map(tool => `
      <li class="chip">${esc(tool)}</li>`).join('')}
    </ul>
    <div class="project-actions">${playAction}
      <button class="btn" type="button" data-case-open="${esc(project.id)}" data-requires-js>${esc(tk('projects.open'))}</button>
    </div>
  </div>
</li>`;
}

// The featured case: one project promoted out of the list, carrying its own
// recognition stats inside the card. The stats are read from the project's
// caseStudy.results, so the home page and the case-study topline can't drift.
export function showcaseCardHTML(project) {
  const playTagKey = project.playable ? 'projects.playBrowser'
    : project.playUrl ? 'projects.playItch'
    : null;
  const mediaHref = project.playUrl || '#projects';
  const external = project.playUrl ? ' target="_blank" rel="noopener"' : '';

  const playTag = playTagKey ? `
      <span class="play-tag mono">${esc(tk(playTagKey))}</span>` : '';

  const playAction = project.playUrl ? `
      <a class="btn btn-play" href="${esc(project.playUrl)}" target="_blank" rel="noopener">${esc(tk(playTagKey))}</a>` : '';

  const stats = (project.caseStudy?.results || []).map(result => `
      <li class="showcase-stat">
        <span class="stat-value">${esc(t(result.value))}</span>
        <span class="stat-label mono">${esc(t(result.label))}</span>
      </li>`).join('');

  // Result first: the ribbon and the jam numbers open the card, above the
  // screenshot. They used to close it, which buried the strongest claim on the
  // page under 540px of media and copy.
  return `<article class="showcase reveal" style="--project-accent: ${esc(project.accent)}">
  <p class="showcase-ribbon mono">${esc(tk('projects.featured'))}</p>
  <ul class="showcase-stats" aria-label="${esc(tk('stats.title'))}">${stats}
  </ul>
  <a class="showcase-media" href="${esc(mediaHref)}"${external} data-case-open="${esc(project.id)}" aria-label="${esc(tk('projects.open'))} · ${esc(t(project.name))}">
    <img src="${esc(project.cover)}" alt="${esc(t(project.coverAlt))}" loading="lazy" decoding="async" width="1200" height="800">
    <span class="project-num mono">01</span>${playTag}
  </a>
  <div class="showcase-info">
    <p class="project-type">${esc(t(project.type))}</p>
    <h3 class="project-name">${esc(t(project.name))}</h3>
    <p class="project-role">${esc(t(project.role))}</p>
    <p class="project-summary">${esc(t(project.summary))}</p>
    <ul class="project-tools">${project.tools.map(tool => `
      <li class="chip">${esc(tool)}</li>`).join('')}
    </ul>
  </div>
  <div class="project-actions showcase-actions">${playAction}
    <button class="btn" type="button" data-case-open="${esc(project.id)}" data-requires-js>${esc(tk('projects.open'))}</button>
  </div>
</article>`;
}

export function skillGroupHTML(group) {
  return `<article class="skill-group reveal">
  <h3 class="skill-group-title">${esc(t(group.title))}</h3>
  <ul>${group.items.map(item => `
    <li class="chip">${esc(t(item))}</li>`).join('')}
  </ul>
</article>`;
}
