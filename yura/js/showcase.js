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

  const deck = document.querySelector('.deck');
  if (!deck) return;

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
