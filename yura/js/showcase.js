// Horizontal card deck: clicking a dot scrolls to its card, and the active dot
// tracks whichever card is centered in the scroller.
(function () {
  // Prevent every image from being dragged (ghost-drag) out of the page.
  document.querySelectorAll('img').forEach((img) => {
    img.setAttribute('draggable', 'false');
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  // Slide the "Features" header in (same motion as the hero title) the first
  // time it scrolls into view.
  const head = document.querySelector('.showcase-head');
  if (head) {
    head.classList.add('reveal');
    const headIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            head.classList.add('is-in');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    headIO.observe(head);
  }

  // Reveal the closing section the first time it scrolls into view (same
  // reveal/is-in pattern as the header and deck). Purely additive: the start
  // state lives behind .reveal, so no-JS still shows the copy.
  const closer = document.querySelector('.closer');
  if (closer) {
    closer.classList.add('reveal');
    const closerIO = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            closer.classList.add('is-in');
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    closerIO.observe(closer);
  }

  // Subtle pointer-driven 3D tilt on the hero guitar. Desktop pointers only,
  // and never when the user prefers reduced motion. The guitar leans a few
  // degrees toward the cursor and eases back to rest on leave. Updates are
  // rAF-throttled and only touch a transform (compositor-only).
  const heroGuitar = document.querySelector('.hero-guitar');
  const hero = document.querySelector('.hero');
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroGuitar && hero && finePointer && !reduceMotion) {
    const MAX_Y = 6; // deg, left/right lean
    const MAX_X = 4; // deg, forward/back tilt
    let raf = 0;
    let pending = null;

    const apply = () => {
      raf = 0;
      if (!pending) return;
      heroGuitar.style.setProperty('--gy', pending.gy.toFixed(2) + 'deg');
      heroGuitar.style.setProperty('--gx', pending.gx.toFixed(2) + 'deg');
    };

    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      pending = { gy: nx * MAX_Y * 2, gx: -ny * MAX_X * 2 };
      if (!raf) raf = requestAnimationFrame(apply);
    });

    hero.addEventListener('pointerleave', () => {
      pending = { gx: 0, gy: 0 };
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }

  const deck = document.querySelector('.deck');
  if (!deck) return;

  // Stagger the cards into view the first time the deck is reached (mirrors the
  // header's slide-in). Start state lives behind .reveal so it degrades to
  // fully-visible without JS.
  deck.classList.add('reveal');
  const deckIO = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          deck.classList.add('is-in');
          obs.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  deckIO.observe(deck);

  const cards = Array.from(deck.querySelectorAll('.card'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  if (!cards.length || !dots.length) return;

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  const setActive = (i) => dots.forEach((d, j) => d.classList.toggle('is-active', j === i));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(cards.indexOf(entry.target));
      });
    },
    { root: deck, threshold: 0.6 }
  );

  cards.forEach((card) => io.observe(card));
})();
