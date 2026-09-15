import { projects } from './data/projects.js';
import { skillGroups } from './data/strings.js';
import { projectCardHTML, showcaseCardHTML, skillGroupHTML } from './templates.js';

// index.html ships with the EN markup for both grids baked in (see the
// "baked:" comment markers there). These renderers rebuild the same markup
// at runtime, which only needs to happen when the language changes.
// projects[0] is the showcase; the list carries the rest, numbered from 02.
export function renderProjects() {
  document.getElementById('project-showcase').innerHTML = showcaseCardHTML(projects[0]);
  const list = document.getElementById('project-list');
  list.innerHTML = projects.slice(1).map((project, i) => projectCardHTML(project, i + 1)).join('\n');
}

export function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = skillGroups.map(skillGroupHTML).join('\n');
}
