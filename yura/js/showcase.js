// Horizontal card deck: clicking a dot scrolls to its card, and the active dot
// tracks whichever card is centered in the scroller.
(function () {
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
