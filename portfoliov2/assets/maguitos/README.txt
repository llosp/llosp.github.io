Assets for the Projeto Maguitos case study, opened from the "Open case
study" card on the homepage (the shared overlay, #case/maguitos --
see js/casestudy.js and the maguitos entry in js/data/projects.js).

  maguitos-hero.gif   -- LIVE, used as caseStudy.heroImage (the overlay
                         just renders it as an <img>, so the GIF animates
                         on its own; no special handling needed).

Heads up: it's 6.5 MB, heavy for something that loads as soon as the
overlay opens. Worth compressing, or swapping for a static poster frame
if load time matters.

Everything else about this case study (gallery screenshots, etc.) lives
in js/data/projects.js as before -- this folder is just for assets that
don't fit under assets/img/projects/.
