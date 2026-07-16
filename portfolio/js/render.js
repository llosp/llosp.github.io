import { projects } from './data/projects.js';
import { skillGroups } from './data/strings.js';
import { projectCardHTML, skillGroupHTML } from './templates.js';

// index.html ships with the EN markup for both grids baked in (see the
// "baked:" comment markers there). These renderers rebuild the same markup
// at runtime, which only needs to happen when the language changes.
export function renderProjects() {
  const list = document.getElementById('project-list');
  list.innerHTML = projects.map((project, i) => projectCardHTML(project, i)).join('\n');
}

export function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = skillGroups.map(skillGroupHTML).join('\n');
}
