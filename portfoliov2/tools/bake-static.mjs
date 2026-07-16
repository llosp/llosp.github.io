// Dev-only tool, never loaded by the site.
// Regenerates the static EN project cards and skills grid baked into
// index.html, using the exact same template functions the runtime renderer
// uses (js/templates.js), so the two can never drift apart.
//
// Run from the portfoliov2 folder after changing js/data/projects.js,
// js/data/strings.js or js/templates.js:
//   node tools/bake-static.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// js/i18n.js reads localStorage at import time; stub it so the modules
// load in node. Language stays the default, English.
globalThis.localStorage = { getItem: () => null, setItem: () => {} };

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { projects } = await import('../js/data/projects.js');
const { skillGroups } = await import('../js/data/strings.js');
const { projectCardHTML, skillGroupHTML } = await import('../js/templates.js');

const projectsHTML = projects.map((project, i) => projectCardHTML(project, i)).join('\n');
const skillsHTML = skillGroups.map(skillGroupHTML).join('\n');

function bake(html, name, content) {
  // Keeps the start marker comment (and its regeneration note) intact,
  // replaces everything between it and the end marker.
  const pattern = new RegExp(
    `(<!-- baked:${name}:start[\\s\\S]*?-->)[\\s\\S]*?(<!-- baked:${name}:end -->)`
  );
  if (!pattern.test(html)) {
    throw new Error(`Markers for "baked:${name}" not found in index.html`);
  }
  return html.replace(pattern, `$1\n${content}\n          $2`);
}

const indexPath = join(root, 'index.html');
let html = readFileSync(indexPath, 'utf8');
html = bake(html, 'projects', projectsHTML);
html = bake(html, 'skills', skillsHTML);
writeFileSync(indexPath, html);

console.log(`Baked ${projects.length} project cards and ${skillGroups.length} skill groups into index.html`);
