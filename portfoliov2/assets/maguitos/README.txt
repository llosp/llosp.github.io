Placeholder folder for the Projeto Maguitos case-study clips
(portfoliov2/maguitos/index.html). Expected files:

  maguitos-hero.gif                (hero pitch) -- LIVE, see note below
  maguitos-stage-select.mp4        (section 1, the hook)
  maguitos-swap.mp4                (section 2, core loop / toddler swap)
  maguitos-shared-mp.mp4           (section 3, shared MP)
  maguitos-ai-smart-pick.mp4       (section 4a, action = skill + target)
  maguitos-charges.mp4             (section 4b, enemy charges)
  maguitos-preemptive-defense.mp4  (section 4c, decide early / execute late)
  maguitos-conviction-low.mp4      (section 4d, two-up: low conviction)
  maguitos-conviction-high.mp4     (section 4d, two-up: high conviction)
  maguitos-intent-board.mp4        (section 4e, intent board)
  maguitos-personalities.mp4       (section 4f, personalities by archetype)
  maguitos-role-refactor.png       (section 5, role refactor, static image)
  maguitos-full-encounter.mp4      (section 7, optional closer)

Until these exist, each slot on the page shows a styled placeholder with
the filename and caption (see css/mediaslot.css). To go live once a clip
is dropped here:

  1. Add the file to this folder.
  2. In maguitos/index.html, find that slot's <figure class="media-slot">
     and flip its data-ready attribute from "false" to "true".

js/mediaslot.js then lazy-loads the file (from the <video>/<img>'s
data-src) and plays it only while the slot is scrolled into view. Reduced
motion always keeps the poster/first-frame, never the clip.

Note on maguitos-hero.gif: it's wired in and live (data-ready="true").
GIFs animate as soon as they're loaded and can't be paused/resumed via
JS like a <video> can, so mediaslot.js only lazy-loads its src on first
view; it keeps animating after that even if scrolled past. It's also
6.5 MB, heavy for a hero image loaded above the fold -- worth compressing
or converting to a muted looping .mp4 if load time matters here.
