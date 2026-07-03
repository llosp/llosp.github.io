import { initI18n } from './i18n.js';
import { renderProjects, renderSkills } from './render.js';
import { initCaseStudy } from './casestudy.js';
import { initMascots } from './mascot.js';
import { initMotion } from './motion.js';
import { initCursor } from './cursor.js';

function renderAll() {
  renderProjects();
  renderSkills();
}

initI18n();
renderAll();
document.addEventListener('langchange', renderAll);
initCaseStudy();
initMascots();
initMotion();
initCursor();
