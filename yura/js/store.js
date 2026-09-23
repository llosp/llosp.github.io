// Front-end-only mock of a single-product store: cart (localStorage), search,
// account, and region panels. No backend — every "order" and "account" is
// simulated in the browser so the whole flow can be clicked through end to end.
(function () {
  const CART_KEY = 'yura_cart_v1';
  const REGION_KEY = 'yura_region_v1';

  const PRODUCT = {
    id: 'hakkotai',
    title: 'HAKKOTAI',
    price: 300,
    image: 'assets/img/hakkotai.webp',
    tags: ['hakkotai', 'superstrat', 'guitar', 'glow', 'yura', '発光体', 'strat'],
  };

  window.YuraStore = { PRODUCT, getCart, setCart, addToCart, formatPrice };

  // ---------- cart state ----------

  function getCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY));
      const qty = raw && Number.isFinite(raw.qty) ? Math.max(0, raw.qty) : 0;
      return { qty };
    } catch {
      return { qty: 0 };
    }
  }

  function setCart(qty) {
    const clamped = Math.max(0, Math.min(9, Math.round(qty)));
    localStorage.setItem(CART_KEY, JSON.stringify({ qty: clamped }));
    renderCartBadge();
    renderCartDrawer();
  }

  function addToCart(amount = 1) {
    setCart(getCart().qty + amount);
  }

  function formatPrice(n) {
    return '$' + n.toLocaleString('en-US');
  }

  // ---------- cart badge (present in nav on every page) ----------

  function renderCartBadge() {
    const qty = getCart().qty;
    document.querySelectorAll('[data-cart-badge]').forEach((el) => {
      el.textContent = String(qty);
      el.hidden = qty === 0;
    });
  }

  // ---------- cart drawer ----------

  function renderCartDrawer() {
    const body = document.querySelector('[data-cart-body]');
    const foot = document.querySelector('[data-cart-foot]');
    const subtotalEl = document.querySelector('[data-cart-subtotal]');
    if (!body) return;

    const { qty } = getCart();

    if (qty === 0) {
      body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      if (foot) foot.hidden = true;
      return;
    }

    body.innerHTML = `
      <div class="cart-line">
        <img class="cart-line-img" src="${PRODUCT.image}" alt="" width="64" height="22">
        <div class="cart-line-info">
          <p class="cart-line-title">${PRODUCT.title}</p>
          <p class="cart-line-price">${formatPrice(PRODUCT.price)}</p>
          <div class="qty-stepper">
            <button type="button" data-qty-decrease aria-label="Decrease quantity">−</button>
            <span data-qty-value>${qty}</span>
            <button type="button" data-qty-increase aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-line-remove" type="button" data-cart-remove>Remove</button>
      </div>
    `;

    if (foot) {
      foot.hidden = false;
      if (subtotalEl) subtotalEl.textContent = formatPrice(PRODUCT.price * qty);
    }

    body.querySelector('[data-qty-decrease]')?.addEventListener('click', () => addToCart(-1));
    body.querySelector('[data-qty-increase]')?.addEventListener('click', () => addToCart(1));
    body.querySelector('[data-cart-remove]')?.addEventListener('click', () => setCart(0));
  }

  // ---------- generic drawer/modal open + close ----------

  let lastFocused = null;

  function openPanel(panel) {
    if (!panel) return;
    lastFocused = document.activeElement;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
    document.body.classList.add('no-scroll');
    panel.querySelector('.drawer-close')?.focus();
  }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    const anyOpen = document.querySelector('.drawer.is-open, .modal.is-open');
    if (!anyOpen) document.body.classList.remove('no-scroll');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  function closeAllPanels() {
    document.querySelectorAll('.drawer.is-open, .modal.is-open').forEach(closePanel);
  }

  function wirePanel({ openSelector, closeSelector, panelId, onOpen }) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    document.querySelectorAll(openSelector).forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openPanel(panel);
        if (onOpen) onOpen();
      });
    });
    panel.querySelectorAll(closeSelector).forEach((btn) => {
      btn.addEventListener('click', () => closePanel(panel));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPanels();
  });

  // ---------- cart drawer wiring ----------

  wirePanel({
    openSelector: '[data-cart-open]',
    closeSelector: '[data-cart-close]',
    panelId: 'cart-drawer',
    onOpen: renderCartDrawer,
  });

  // "Order now" buttons: add one unit, then let the link continue to checkout.
  document.querySelectorAll('[data-buy-now]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(1));
  });

  // ---------- search overlay ----------

  wirePanel({
    openSelector: '[data-search-open]',
    closeSelector: '[data-search-close]',
    panelId: 'search-overlay',
    onOpen: () => {
      const input = document.getElementById('search-input');
      renderSearchResults('');
      setTimeout(() => input?.focus(), 0);
    },
  });

  function renderSearchResults(query) {
    const out = document.querySelector('[data-search-results]');
    if (!out) return;
    const q = query.trim().toLowerCase();

    if (q === '') {
      out.innerHTML = `
        <a class="search-result" href="index.html#top">
          <img src="${PRODUCT.image}" alt="" width="72" height="25">
          <span>
            <strong>${PRODUCT.title}</strong>
            <em>${formatPrice(PRODUCT.price)}</em>
          </span>
        </a>
      `;
      return;
    }

    const match = PRODUCT.tags.some((t) => t.includes(q)) || PRODUCT.title.toLowerCase().includes(q);
    out.innerHTML = match
      ? `
        <a class="search-result" href="index.html#top">
          <img src="${PRODUCT.image}" alt="" width="72" height="25">
          <span>
            <strong>${PRODUCT.title}</strong>
            <em>${formatPrice(PRODUCT.price)}</em>
          </span>
        </a>
      `
      : `<p class="search-empty">No results found for "${escapeHtml(query)}".</p>`;
  }

  document.getElementById('search-input')?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- account modal ----------

  wirePanel({
    openSelector: '[data-account-open]',
    closeSelector: '[data-account-close]',
    panelId: 'account-modal',
  });

  document.querySelectorAll('[data-account-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const which = tab.getAttribute('data-account-tab');
      document.querySelectorAll('[data-account-tab]').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('[data-account-form]').forEach((f) => {
        f.hidden = f.getAttribute('data-account-form') !== which;
      });
    });
  });

  document.querySelectorAll('[data-account-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const email = form.querySelector('input[type="email"]')?.value || '';
      const msg = form.querySelector('[data-account-msg]');
      const isCreate = form.getAttribute('data-account-form') === 'create';
      if (msg) {
        msg.textContent = isCreate
          ? `Account created for ${email}. You're signed in.`
          : `Welcome back, ${email}.`;
      }
      form.reset();
    });
  });

  // ---------- region modal ----------

  wirePanel({
    openSelector: '[data-region-open]',
    closeSelector: '[data-region-close]',
    panelId: 'region-modal',
  });

  function currentRegion() {
    try {
      return JSON.parse(localStorage.getItem(REGION_KEY)) || { code: 'US', label: 'United States' };
    } catch {
      return { code: 'US', label: 'United States' };
    }
  }

  function applyRegionLabel() {
    const region = currentRegion();
    document.querySelectorAll('[data-region-open]').forEach((el) => {
      el.textContent = `Region: ${region.label}`;
    });
  }

  document.querySelectorAll('[data-region]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-region');
      const label = btn.getAttribute('data-region-label') || code;
      localStorage.setItem(REGION_KEY, JSON.stringify({ code, label }));
      applyRegionLabel();
      closePanel(document.getElementById('region-modal'));
    });
  });

  // ---------- init ----------

  renderCartBadge();
  applyRegionLabel();
})();
