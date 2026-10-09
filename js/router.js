// same-origin router with a shared-element cover morph.
//
// why not the view transitions api: it snapshots the page as a static image
// for the duration of the transition, which freezes the ascii canvas. doing
// the morph by hand keeps the canvas live so the dots can scatter, and it
// behaves identically in chrome, safari and firefox rather than needing a
// separate fallback for the one that lacks support.

const MORPH_MS = 800;
const FADE_MS = 200;
const CROSSFADE_MS = 150;
const EASE = 'cubic-bezier(0.25, 1, 0.5, 1)';

const pageCache = new Map();

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const rect = (el) => el.getBoundingClientRect();
const hasBox = (r) => r && r.width > 1 && r.height > 1;

function isInternal(link) {
  if (!link || link.target || link.hasAttribute('download')) return false;
  if (link.origin !== window.location.origin) return false;
  const path = link.pathname;
  return path === '/' || path.startsWith('/work/');
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

// the element the morph starts from on the current page
function sourceCover(slug) {
  const hero = document.querySelector('.cs-cover_img');
  if (hero && hasBox(rect(hero))) return hero;
  const preview = document.querySelector(`.index_preview-img[data-slug="${slug}"].is--active`);
  if (preview && hasBox(rect(preview))) return preview;
  return null;
}

// the slot the morph lands in on the page we just swapped in
function targetSlot(route, slug) {
  if (route === 'work') return document.querySelector('.cs-cover_frame');
  return document.querySelector(`.index_preview-img[data-slug="${slug}"]`);
}

function cloneCover(source, from) {
  const clone = document.createElement('img');
  clone.className = 'morph-img';
  clone.src = source.currentSrc || source.src || '';
  clone.alt = '';
  clone.style.objectFit = getComputedStyle(source).objectFit;
  clone.style.top = `${from.top}px`;
  clone.style.left = `${from.left}px`;
  clone.style.width = `${from.width}px`;
  clone.style.height = `${from.height}px`;
  document.body.appendChild(clone);
  return clone;
}

const frameOf = (el) => (el.classList.contains('cs-cover_img') ? el.closest('.cs-cover_frame') : el);

export function initRouter({ onSwap, onTransition }) {
  if (!window.matchMedia) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  let busy = false;

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

  async function swap(url, { slug, scrollTo = 0, push = true }) {
    if (busy) return;
    busy = true;

    if (window.location.pathname === '/') homeScroll = window.scrollY;

    const app = document.querySelector('#app');
    const instant = reduceMotion();

    let page;
    const source = instant ? null : sourceCover(slug);
    const from = source ? rect(source) : null;
    const clone = source && hasBox(from) ? cloneCover(source, from) : null;
    if (clone) frameOf(source).style.visibility = 'hidden';

    // the rest of the page drops toward white while the cover holds still
    app.classList.add('is--leaving');

    try {
      [page] = await Promise.all([
        fetchPage(url),
        new Promise((r) => setTimeout(r, instant ? 0 : clone ? FADE_MS : CROSSFADE_MS)),
      ]);
    } catch (err) {
      // a failed fetch must not leave the user on a blank faded page
      console.error(err);
      if (clone) clone.remove();
      app.classList.remove('is--leaving');
      busy = false;
      window.location.href = url;
      return;
    }

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
    if (article) article.classList.add('is--entering');

    onSwap(slug);

    const slot = clone ? targetSlot(page.route, slug) : null;
    const to = slot ? rect(slot) : null;

    app.classList.remove('is--leaving');

    if (clone && hasBox(to)) {
      slot.classList.add('is--morph-target');
      if (slot.classList.contains('index_preview-img')) slot.style.visibility = 'hidden';

      onTransition();

      const animation = clone.animate(
        [
          { top: `${from.top}px`, left: `${from.left}px`, width: `${from.width}px`, height: `${from.height}px` },
          { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` },
        ],
        { duration: MORPH_MS, easing: EASE, fill: 'forwards' }
      );

      // a hidden tab stops advancing the animation, so `finished` would
      // never resolve and the page would be left mid-morph with the router
      // locked. the timer is the backstop that always lands the cover.
      await Promise.race([
        animation.finished.catch(() => {}),
        new Promise((r) => setTimeout(r, MORPH_MS + 200)),
      ]);
      animation.cancel();

      slot.classList.remove('is--morph-target');
      slot.style.visibility = '';
      clone.remove();
    } else if (clone) {
      clone.remove();
    }

    if (article) {
      article.classList.remove('is--entering');
      if (!instant) article.classList.add('is--staggered');
    }

    busy = false;
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a');
    if (!isInternal(link)) return;

    // same page: let the browser do its own thing, so `/#work` from the
    // homepage jumps to the anchor instead of re-rendering the page
    if (link.pathname === window.location.pathname) return;

    event.preventDefault();

    const slug = link.dataset.slug || currentSlug();
    const scrollTo = link.pathname === '/' ? homeScroll : 0;

    swap(link.pathname + link.search, { slug, scrollTo });
  });

  window.addEventListener('popstate', (event) => {
    if (window.location.pathname === rendered) return;
    const url = window.location.pathname + window.location.search;
    const restored = event.state || {};
    swap(url, { slug: restored.slug || currentSlug(), scrollTo: restored.scroll || 0, push: false });
  });
}
