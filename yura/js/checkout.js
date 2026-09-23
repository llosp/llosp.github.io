// Renders the order summary from the shared cart state and fakes an order
// confirmation on submit. No network requests, no real payment — see
// YuraStore in js/store.js for the underlying cart/localStorage logic.
(function () {
  const { PRODUCT, getCart, setCart, formatPrice } = window.YuraStore;

  const grid = document.getElementById('checkout-grid');
  const empty = document.getElementById('checkout-empty');
  const confirmation = document.getElementById('checkout-confirmation');
  const form = document.getElementById('checkout-form');
  const linesEl = document.querySelector('[data-checkout-lines]');
  const subtotalEl = document.querySelector('[data-checkout-subtotal]');
  const totalEl = document.querySelector('[data-checkout-total]');

  function renderSummary() {
    const { qty } = getCart();

    if (qty === 0) {
      grid.hidden = true;
      empty.hidden = false;
      return;
    }

    const subtotal = PRODUCT.price * qty;
    linesEl.innerHTML = `
      <div class="checkout-line">
        <img src="${PRODUCT.image}" alt="" width="64" height="22">
        <div>
          <p class="checkout-line-title">${PRODUCT.title}</p>
          <p class="checkout-line-qty">Qty ${qty}</p>
        </div>
        <span>${formatPrice(subtotal)}</span>
      </div>
    `;
    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const email = form.querySelector('[name="email"]').value;
    const orderNumber = 'YR' + Math.floor(100000 + Math.random() * 900000);

    document.querySelector('[data-order-email]').textContent = email;
    document.querySelector('[data-order-number]').textContent = orderNumber;

    grid.hidden = true;
    confirmation.hidden = false;
    setCart(0);
  });

  renderSummary();
})();
