Assets for the Projeto Maguitos card / case study (see js/casestudy.js and
the maguitos entry in js/data/projects.js).

  maguitos-hero.gif   -- NOT USED. It was the home-page card cover, and at
                         6.5 MB it was the single worst thing on the page:
                         the browser decodes an animated GIF frame by frame
                         on the main thread for as long as it is on screen,
                         which is what made scrolling stutter.

The card now uses the static ./assets/img/projects/maguitos-gameplay-1.webp
(103 KB). To bring the motion back, re-encode this GIF as a small looping
video and swap the cover for a <video> -- do not put the GIF back:

  ffmpeg -i maguitos-hero.gif -vf "fps=24,scale=1200:-2" \
    -c:v libvpx-vp9 -b:v 0 -crf 36 -an maguitos-hero.webm
  ffmpeg -i maguitos-hero.gif -vf "fps=24,scale=1200:-2,format=yuv420p" \
    -c:v libx264 -crf 28 -movflags +faststart -an maguitos-hero.mp4

Everything else about this case study (gallery screenshots, etc.) lives
in js/data/projects.js as before -- this folder is just for assets that
don't fit under assets/img/projects/.
