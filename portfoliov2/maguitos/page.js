// Entry script for the standalone Projeto Maguitos case-study page.
// A lighter subset of ../js/main.js: this page has no project grid and no
// case-study overlay, so renderProjects/renderSkills/initCaseStudy/initHero
// do not apply here.
import { initI18n } from '../js/i18n.js';
import { initMascots } from '../js/mascot.js';
import { initReveals } from '../js/reveal.js';
import { initCursor } from '../js/cursor.js';
import { initMediaSlots } from '../js/mediaslot.js';

initI18n();
initMascots();
initReveals();
initCursor();
initMediaSlots();
