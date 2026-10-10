// same-origin router with a shared-element cover transition.
//
// why not the view transitions api: it snapshots the page as a static image
// for the duration of the transition, which freezes the ascii canvas. doing
// it by hand keeps the canvas live, and it behaves identically in chrome,
// safari and firefox rather than needing a separate fallback for the one
// that lacks support.
//
// the choreography itself lives in case-transition.js. this file decides
// which one to play, builds the clone, and does the dom work in between.

import { playForward, playCurtain, playFade, openCurtain } from './case-transition.js';
import { smoothScrollTo, workTop } from './scroll.js';

const pageCache = new Map();

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rect = (el) => el.getBoundingClientRect();
const hasBox = (r) => r && r.width > 1 && r.height > 1;

function isInternal(link) {
  if (!link || link.target || link.hasAttribute('download')) return false;
  if (link.origin !== window.location.origin) return false;
  const path = link.pathname;
  return path === '/' || path === '/about/' || path.startsWith('/work/');
}

async function fetchPage(url) {
  if (pageCache.has(url)) return pageCache.get(url);
  const res = await fetch(url, { credentials: 'same-origin' });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
  const app = doc.querySelector('#app');
  if (!app) throw new Error(`no #app in ${url}`);
  const page = {
    html: app.innerHTML,
    route: app.dataset.route || '',
    title: doc.title,
    bodyClass: doc.body.className,
  };
  pageCache.set(url, page);
  return page;
}

// the box around a cover. the transition measures this rather than the image
// itself, because the image carries a scale transform on hover and that
// would otherwise make the clone start a few percent too large.
const frameOf = (el) => el.closest('.cs-cover_frame, .covers_frame, .cs-nav_frame') || el;

// a cover scrolled out of the window would travel in from somewhere off
// screen, which reads as a glitch rather than as a transition. partly
// visible is fine: the clone just starts where it actually sits.
const onScreen = (r) => r.bottom > 0 && r.top < window.innerHeight;

// the cover an open starts from: the one inside the link that was clicked,
// or, for a history traversal, the card for the project on the index
function sourceCard(link, slug) {
  const cover =
    (link && link.querySelector('.covers_media, .cs-nav_media')) ||
    document.querySelector(`.covers_media[data-slug="${slug}"]`);
  if (!cover) return null;
  const box = rect(frameOf(cover));
  return hasBox(box) && onScreen(box) ? cover : null;
}

// cloned rather than rebuilt as an img, so that a cover which is a video
// travels as a video. a cloned img reuses the decoded original, so neither
// kind flashes on the first frame.
function cloneCover(source, from) {
  const clone = source.cloneNode(true);
  clone.className = 'morph-img';
  clone.removeAttribute('data-slug');
  clone.removeAttribute('loading');
  if (clone.tagName === 'VIDEO') {
    clone.muted = true;
    clone.play().catch(() => {});
  }
  clone.style.objectFit = getComputedStyle(source).objectFit;
  clone.style.top = `${from.top}px`;
  clone.style.left = `${from.left}px`;
  clone.style.width = `${from.width}px`;
  clone.style.height = `${from.height}px`;
  document.body.appendChild(clone);
  return clone;
}

function focusHeading(app) {
  const heading = app.querySelector('h1');
  if (!heading) return;
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

export function initRouter({ onSwap, onTransition, layout }) {
  if (!window.matchMedia) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  let busy = false;

  // a homepage opened cold starts behind the curtain and lifts it
  const opening = document.querySelector('.page-transition.is--cover');
  if (opening) openCurtain(opening);

  // a back or forward that arrived while a swap was still running. the
  // browser changes the url for a traversal before we hear about it, so
  // unlike a click it cannot simply be dropped: that would leave the address
  // bar describing a page that is not the one on screen. it waits here
  // instead and runs as soon as the current swap lands.
  let pending = null;

  // where the work index was left scrolled to. going home from a case study
  // should land back on the row the cover shrinks into, not the top of the
  // page, and the history entry for `/` cannot be trusted for this because
  // it was written when we navigated away from it.
  let homeScroll = 0;

  // the path currently rendered into #app. chrome fires popstate for
  // same-document fragment navigation too, so `/#work` would otherwise
  // re-render the homepage instead of just jumping to the anchor.
  let rendered = window.location.pathname;

  const state = (scroll = window.scrollY) => ({ scroll, slug: currentSlug() });
  const currentSlug = () => {
    const article = document.querySelector('.case-study');
    return article ? article.dataset.slug : null;
  };

  history.replaceState(state(0), '', window.location.href);

  async function swap(url, options) {
    const { slug, scrollTo = 0, push = true, link = null } = options;

    if (busy) {
      // a click mid-transition is just an impatient reader and is ignored
      if (!push) pending = { url, options };
      return;
    }
    busy = true;

    // measured against what is rendered rather than the url, because a
    // deferred traversal runs with the url already pointing at the target
    if (rendered === '/') homeScroll = window.scrollY;

    const app = document.querySelector('#app');
    const instant = reduceMotion();
    const toPath = new URL(url, window.location.origin).pathname;
    const toWork = toPath.startsWith('/work/');
    const fromWork = rendered.startsWith('/work/');

    const curtain = document.querySelector('.page-transition');

    const load = fetchPage(url);
    load.catch(() => {});

    // which beat sequence plays depends on where we are going from and to
    let mode = 'fade';
    let source = null;
    let sourceFrame = null;
    let clone = null;

    if (!instant && toWork) {
      source = sourceCard(link, slug);
      if (source) mode = 'forward';
    } else if (!instant && fromWork && toPath === '/' && curtain) {
      mode = 'curtain';
    }

    if (source) {
      sourceFrame = frameOf(source);
      clone = cloneCover(source, rect(sourceFrame));
      sourceFrame.style.visibility = 'hidden';
    }

    // pushes history, renders the page and runs the per-page wiring. the
    // scroll is applied again after the wiring because the index only has a
    // height once the masonry has laid it out.
    function render(page, entering = false) {
      if (push) {
        history.replaceState(state(), '', window.location.href);
        history.pushState({ scroll: scrollTo, slug }, '', url);
      }
      rendered = window.location.pathname;

      app.innerHTML = page.html;
      app.dataset.route = page.route;
      document.title = page.title;
      document.body.className = page.bodyClass;
      window.scrollTo(0, scrollTo);

      const article = app.querySelector('.case-study');
      if (article && entering) article.classList.add('is--entering');

      onSwap(slug);
      window.scrollTo(0, scrollTo);
      focusHeading(app);
      return article;
    }

    try {
      if (mode === 'forward') {
        await playForward({
          app,
          clone,
          load,
          onMove: onTransition,
          swap(page) {
            const article = render(page, true);
            if (!article) throw new Error(`no case study in ${url}`);
            const frame = article.querySelector('.cs-cover_frame');
            frame.classList.add('is--morph-target');
            return {
              head: article.querySelector('.cs-head'),
              frame,
              img: article.querySelector('.cs-cover_img'),
              rest: [...article.querySelectorAll('.cs-rest, .cs-rail, .cs-cover .caption-code')],
              reveal: () => frame.classList.remove('is--morph-target'),
              finish() {
                article.classList.remove('is--entering');
                frame.classList.remove('is--morph-target');
              },
            };
          },
        });
      } else if (mode === 'curtain') {
        await playCurtain({
          curtain,
          load,
          swap(page) {
            render(page);
            // ./work from a case study lands on the work index itself
            if (options.anchor === 'work') window.scrollTo(0, workTop());
          },
        });
      } else {
        await playFade({ app, load, swap: (page) => render(page) });
      }
    } catch (err) {
      // a failed fetch must not leave the user on a blank faded page
      console.error(err);
      if (clone) clone.remove();
      if (sourceFrame) sourceFrame.style.visibility = '';
      app.style.opacity = '';
      busy = false;
      window.location.href = url;
      return;
    }

    if (clone) clone.remove();
    document.querySelectorAll('.is--morph-target').forEach((el) => el.classList.remove('is--morph-target'));

    busy = false;

    // a back or forward that was held while this swap ran. the url is
    // already where it wants to be, so this only has to catch the dom up.
    if (pending) {
      const next = pending;
      pending = null;
      if (window.location.pathname !== rendered) swap(next.url, next.options);
    }
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a');
    if (!isInternal(link)) return;

    // same page: `/#work` from the homepage glides to the work index
    // instead of re-rendering the page
    if (link.pathname === window.location.pathname) {
      if (link.hash === '#work' && document.querySelector('#work')) {
        event.preventDefault();
        smoothScrollTo(workTop());
        history.replaceState(history.state, '', link.pathname + link.hash);
      }
      return;
    }

    event.preventDefault();

    const slug = link.dataset.slug || currentSlug();
    const scrollTo = link.pathname === '/' ? homeScroll : 0;

    const anchor = link.pathname === '/' && link.hash === '#work' ? 'work' : null;
    swap(link.pathname + link.search, { slug, scrollTo, link, anchor });
  });

  window.addEventListener('popstate', (event) => {
    if (window.location.pathname === rendered) return;
    const url = window.location.pathname + window.location.search;
    const restored = event.state || {};
    swap(url, { slug: restored.slug || currentSlug(), scrollTo: restored.scroll || 0, push: false });
  });
}
