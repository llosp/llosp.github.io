import { initI18n, getLang } from './i18n.js';
import { renderProjects, renderSkills } from './render.js';
import { initCaseStudy } from './casestudy.js';
import { initMascots } from './mascot.js';
import { initHero } from './hero.js';
import { initReveals, refreshReveals } from './reveal.js';
import { initCursor } from './cursor.js';

function renderAll() {
  renderProjects();
  renderSkills();
}

initI18n();
// The baked markup in index.html is English; only re-render when the
// stored language differs, or when the user toggles it.
if (getLang() !== 'en') renderAll();
document.addEventListener('langchange', () => {
  renderAll();
  refreshReveals();
});
initCaseStudy();
initMascots();
initHero();
initReveals();
initCursor();
