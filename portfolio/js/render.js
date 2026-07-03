import { projects } from './data/projects.js';
import { skillGroups } from './data/strings.js';
import { t, tk } from './i18n.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export function renderProjects() {
  const list = document.getElementById('project-list');
  list.replaceChildren();

  projects.forEach((project, i) => {
    const item = el('li', 'project reveal');
    item.style.setProperty('--project-accent', project.accent);

    const media = el('button', 'project-media');
    media.type = 'button';
    media.dataset.caseOpen = project.id;
    media.setAttribute('aria-label', `${tk('projects.open')} — ${project.name}`);
    const img = el('img');
    img.src = project.cover;
    img.alt = t(project.coverAlt);
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 1200;
    img.height = 800;
    media.append(img, el('span', 'project-num mono', String(i + 1).padStart(2, '0')));

    const info = el('div', 'project-info');
    info.append(
      el('p', 'project-type', t(project.type)),
      el('h3', 'project-name', project.name),
      el('p', 'project-role', t(project.role)),
      el('p', 'project-summary', t(project.summary))
    );

    const tools = el('ul', 'project-tools');
    project.tools.forEach(tool => tools.append(el('li', 'chip', tool)));
    info.append(tools);

    const open = el('button', 'btn', tk('projects.open'));
    open.type = 'button';
    open.dataset.caseOpen = project.id;
    info.append(open);

    item.append(media, info);
    list.append(item);
  });
}

export function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.replaceChildren();

  skillGroups.forEach(group => {
    const card = el('article', 'skill-group reveal');
    card.append(el('h3', 'skill-group-title', t(group.title)));
    const list = el('ul');
    group.items.forEach(item => list.append(el('li', 'chip', t(item))));
    card.append(list);
    grid.append(card);
  });
}
