// the choreography for opening and closing a case study.
//
// it is a sequence of beats rather than one morph, and only one thing moves
// at a time. the clicked cover is the thing the eye follows, so it is cloned
// to a fixed layer and carried through the sequence while the page is
// swapped out from under it.
//
//   open:  fade out, hold, swap, move, hold, header in, expand, content in
//   close: the curtain, the same one the homepage opens with
//
// this file knows nothing about routing. the router hands it a clone, a
// promise for the next page, and a `swap` that does the dom work.

export const CASE_TRANSITION = {
  fadeOut: 250, // beat 1
  hold1: 200, // pause
  move: 320, // beat 2
  hold2: 220, // pause
  header: 300, // beat 3
  headerOffset: 160, // px the header slides up from
  expand: 280, // beat 4
  content: 300, // beat 5
  easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

// pages that have no cover to carry just crossfade
export const FALLBACK_FADE = 150;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// a hidden tab stops advancing animations, so `finished` would never resolve
// and the router would stay locked. the timer is the backstop.
async function settle(animation, ms) {
  await Promise.race([animation.finished.catch(() => {}), wait(ms + 150)]);
}

// animates the clone's box and then commits the result to inline style, so
// the next beat starts from where this one ended
async function tween(el, to, ms, easing) {
  const start = {};
  const end = {};
  for (const key of Object.keys(to)) {
    start[key] = el.style[key];
    end[key] = `${to[key]}px`;
  }
  const animation = el.animate([start, end], { duration: ms, easing, fill: 'forwards' });
  await settle(animation, ms);
  Object.assign(el.style, end);
  animation.cancel();
}

function fade(el, from, to, ms, easing = 'linear', transform = null) {
  const frame = (opacity, t) => (t ? { opacity, transform: t } : { opacity });
  return el.animate([frame(from, transform && transform[0]), frame(to, transform && transform[1])], {
    duration: ms,
    easing,
    fill: 'forwards',
  });
}

/* ── open ─────────────────────────────────────────────────────────────── */

// swap(page) renders the case study with its header, hero and body hidden and
// returns { head, frame, img, rest, reveal, finish }.
export async function playForward({ app, clone, load, swap, onMove, cfg = CASE_TRANSITION }) {
  const held = [];
  let nodes = null;

  try {
    // beat 1: everything but the cover drops away
    const out = fade(app, 1, 0, cfg.fadeOut);
    held.push(out);
    const [page] = await Promise.all([load, settle(out, cfg.fadeOut)]);

    // the swap is hidden: the page is blank except for the pinned clone
    nodes = swap(page);
    out.cancel();

    // hold: just the image on an empty page
    await wait(cfg.hold1);

    const hero = nodes.frame.getBoundingClientRect();
    const headTop = nodes.head.getBoundingClientRect().top;
    const decoded = nodes.img && nodes.img.decode ? nodes.img.decode().catch(() => {}) : Promise.resolve();

    // beat 2: the clone slides to the hero's x and to where the header starts
    onMove && onMove();
    await tween(clone, { left: hero.left, top: headTop }, cfg.move, cfg.easeOut);

    await wait(cfg.hold2);

    // beat 3: the header rises and, as it settles, pushes the clone down
    const headAnim = fade(nodes.head, 0, 1, cfg.header, cfg.easeOut, [
      `translateY(${cfg.headerOffset}px)`,
      'translateY(0)',
    ]);
    held.push(headAnim);
    await Promise.all([settle(headAnim, cfg.header), tween(clone, { top: hero.top }, cfg.header, cfg.easeOut)]);

    // beat 4: the crop opens into the wide banner
    await tween(
      clone,
      { left: hero.left, top: hero.top, width: hero.width, height: hero.height },
      cfg.expand,
      cfg.easeInOut
    );

    // the real hero goes in and the clone comes out in the same frame, so
    // wait for the real image to be decoded first
    await Promise.race([decoded, wait(400)]);
    nodes.reveal();
    clone.remove();

    // beat 5: the rest of the page, opacity only
    const content = nodes.rest.map((el) => fade(el, 0, 1, cfg.content));
    held.push(...content);
    await Promise.all(content.map((a) => settle(a, cfg.content)));
  } finally {
    // classes first, then the animations that were holding the end state
    if (nodes) nodes.finish();
    clone.remove();
    held.forEach((a) => a.cancel());
  }
}

/* ── close ────────────────────────────────────────────────────────────── */

// going home from a case study is the curtain the homepage opens with: four
// black columns rise over the page, the page is swapped behind them, and
// they lift off to reveal it. the columns are staggered right to left.
export const CURTAIN = { ms: 700, stagger: 80, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' };

// leaving a case study is a quick cut rather than the full opening sweep
export const CURTAIN_FAST = { ...CURTAIN, ms: 350, stagger: 40 };

const columns = (curtain) => [...curtain.querySelectorAll('.transition_column-background')];

function sweep(curtain, from, to, cfg = CURTAIN) {
  const all = columns(curtain);
  return all.map((bar, i) =>
    bar.animate([{ transform: from }, { transform: to }], {
      duration: cfg.ms,
      delay: (all.length - 1 - i) * cfg.stagger,
      easing: cfg.ease,
      fill: 'forwards',
    })
  );
}

const curtainTime = (cfg = CURTAIN) => cfg.ms + 3 * cfg.stagger;

// lifts a covered curtain away, used on first load of the homepage
export async function openCurtain(curtain) {
  const lift = sweep(curtain, 'translateY(0)', 'translateY(-100%)');
  await Promise.all(lift.map((a) => settle(a, curtainTime())));
  curtain.classList.remove('is--cover');
  lift.forEach((a) => a.cancel());
}

export async function playCurtain({ curtain, load, swap }) {
  curtain.classList.remove('is--cover');
  const rise = sweep(curtain, 'translateY(101%)', 'translateY(0)', CURTAIN_FAST);
  let lift = [];
  try {
    const [page] = await Promise.all([load, ...rise.map((a) => settle(a, curtainTime(CURTAIN_FAST)))]);
    swap(page);
    // hold the swapped page behind the bars for a beat so it can paint
    await wait(60);
    lift = sweep(curtain, 'translateY(0)', 'translateY(-100%)', CURTAIN_FAST);
    await Promise.all(lift.map((a) => settle(a, curtainTime(CURTAIN_FAST))));
  } finally {
    rise.forEach((a) => a.cancel());
    lift.forEach((a) => a.cancel());
  }
}

/* ── everything else ──────────────────────────────────────────────────── */

export async function playFade({ app, load, swap }) {
  const out = fade(app, 1, 0, FALLBACK_FADE);
  let inAnim = null;
  try {
    const [page] = await Promise.all([load, settle(out, FALLBACK_FADE)]);
    app.style.opacity = '0';
    swap(page);
    out.cancel();
    inAnim = fade(app, 0, 1, FALLBACK_FADE);
    await settle(inAnim, FALLBACK_FADE);
  } finally {
    app.style.opacity = '';
    out.cancel();
    if (inAnim) inAnim.cancel();
  }
}
