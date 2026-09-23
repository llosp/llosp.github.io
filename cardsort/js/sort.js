// Sorting page: card-sort board -> demographic form -> submit to Supabase.
// Demographics is asked last so respondents start sorting immediately instead of
// facing a form first — see the `phase` field on `state` below.
(function () {
  // Cycled by list index (see css/style.css --earth-1..12) so each created list
  // gets a distinct color, and cards placed in it are tinted to match — makes it
  // easy to tell lists (and their cards) apart at a glance.
  const LIST_COLORS = [
    'var(--earth-1)', 'var(--earth-2)', 'var(--earth-3)', 'var(--earth-4)',
    'var(--earth-5)', 'var(--earth-6)', 'var(--earth-7)', 'var(--earth-8)',
    'var(--earth-9)', 'var(--earth-10)', 'var(--earth-11)', 'var(--earth-12)',
  ];

  // Fisher-Yates. Cards are shown in a random order each time someone opens the
  // page — a fixed A-Z order would bias people toward sorting alphabetically
  // instead of by actual meaning, which is the whole point of an open card sort.
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Progress (demographics + pool + lists) is saved to localStorage on every change
  // and restored on load, so refreshing or closing the tab doesn't lose a respondent's
  // work. Keyed by CARD_SET so a future card-set swap doesn't restore stale card ids.
  // Cleared on successful submit and on the "Recomeçar" button.
  const STORAGE_KEY = `cardsort:${CARD_SET}`;

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.pool) || !Array.isArray(data.lists)) return null;
      return data;
    } catch {
      return null;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        phase: state.phase,
        demographics: state.demographics,
        pool: state.pool,
        lists: state.lists,
        nextListId,
      }));
    } catch {
      // Storage unavailable (private mode, quota, etc.) — progress just won't persist.
    }
  }

  function clearProgress() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  const saved = loadProgress();

  // phase: 'sorting' (cards into lists) -> 'demographics' (asked only once the list
  // is done) -> submit. Demographics comes last so respondents dive straight into
  // sorting instead of facing a form first.
  const state = saved
    ? { phase: saved.phase || 'sorting', demographics: saved.demographics || null, pool: saved.pool, lists: saved.lists }
    : { phase: 'sorting', demographics: null, pool: shuffle(CARDS.map(c => c.id)), lists: [] };
  let nextListId = (saved && saved.nextListId) || 1;

  const CARDS_BY_ID = new Map(CARDS.map(c => [c.id, c]));

  const appEl = document.getElementById('app');

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Folder/filenames under assets/Fotos do itens/ have spaces and accents —
  // encodeURI turns those into a valid <img src> without touching '/' or ':'.
  function cardImageSrc(path) {
    return encodeURI(path);
  }

  function render() {
    if (state.phase === 'demographics') renderDemographicsForm();
    else renderBoard();
  }

  function selectedAttr(current, value) {
    return current === value ? ' selected' : '';
  }

  function renderDemographicsForm() {
    const d = state.demographics || {};
    appEl.innerHTML = `
      <section class="gate">
        <h1>Quase lá</h1>
        <p class="lead">Antes de enviar, conte um pouco sobre você. Isso nos ajuda a entender os resultados agregados — seus dados não são associados publicamente ao seu nome.</p>
        <form id="demo-form" class="demo-form" novalidate>
          <label class="field">
            <span>Nome <em>(opcional)</em></span>
            <input type="text" name="name" autocomplete="off" value="${escapeHTML(d.name || '')}" />
          </label>
          <label class="field">
            <span>Faixa etária</span>
            <select name="ageRange" required>
              <option value="" disabled${selectedAttr(d.ageRange, undefined)}>Selecione</option>
              <option value="18-24"${selectedAttr(d.ageRange, '18-24')}>18–24</option>
              <option value="25-34"${selectedAttr(d.ageRange, '25-34')}>25–34</option>
              <option value="35-44"${selectedAttr(d.ageRange, '35-44')}>35–44</option>
              <option value="45-54"${selectedAttr(d.ageRange, '45-54')}>45–54</option>
              <option value="55+"${selectedAttr(d.ageRange, '55+')}>55+</option>
            </select>
          </label>
          <label class="field">
            <span>Gênero</span>
            <select name="gender" required>
              <option value="" disabled${selectedAttr(d.gender, undefined)}>Selecione</option>
              <option value="Masculino"${selectedAttr(d.gender, 'Masculino')}>Masculino</option>
              <option value="Feminino"${selectedAttr(d.gender, 'Feminino')}>Feminino</option>
              <option value="Outro"${selectedAttr(d.gender, 'Outro')}>Outro</option>
              <option value="Prefiro não dizer"${selectedAttr(d.gender, 'Prefiro não dizer')}>Prefiro não dizer</option>
            </select>
          </label>
          <label class="field">
            <span>Área / ocupação</span>
            <input type="text" name="area" placeholder="ex: design, estudante, tecnologia..." required value="${escapeHTML(d.area || '')}" />
          </label>
          <div class="demo-form-actions">
            <button type="button" id="back-to-board-btn" class="btn btn-secondary">← Voltar para as cartas</button>
            <button type="submit" class="btn btn-primary" id="demo-submit-btn">Enviar</button>
          </div>
          <span id="demo-submit-hint" class="hint"></span>
        </form>
      </section>
    `;
    document.getElementById('demo-form').addEventListener('submit', onDemoSubmit);
    document.getElementById('back-to-board-btn').addEventListener('click', () => {
      state.phase = 'sorting';
      render();
    });
  }

  async function onDemoSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const ageRange = data.get('ageRange');
    const gender = data.get('gender');
    const area = (data.get('area') || '').trim();
    if (!ageRange || !gender || !area) return;
    state.demographics = { name: (data.get('name') || '').trim(), ageRange, gender, area };
    saveProgress();

    const btn = document.getElementById('demo-submit-btn');
    const hint = document.getElementById('demo-submit-hint');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const payload = {
      card_set: CARD_SET,
      respondent_name: state.demographics.name || null,
      age_range: state.demographics.ageRange,
      gender: state.demographics.gender,
      area: state.demographics.area,
      lists: state.lists.map((l, i) => ({ name: l.name.trim(), priority: i + 1, cards: l.cards })),
    };

    const { error } = await sb.from('card_sort_submissions').insert(payload);

    if (error) {
      console.error(error);
      hint.textContent = 'Erro ao enviar. Tente novamente.';
      btn.disabled = false;
      btn.textContent = 'Enviar';
      return;
    }

    clearProgress();
    renderThankYou();
  }

  function renderBoard() {
    saveProgress();
    // innerHTML rebuild below replaces .pool and .lists-section, which resets their
    // scroll to 0 — capture and reapply so dropping a card doesn't jump the view.
    const prevPoolEl = appEl.querySelector('.pool');
    const prevListsEl = appEl.querySelector('.lists-section');
    const poolScrollTop = prevPoolEl ? prevPoolEl.scrollTop : 0;
    const listsScrollTop = prevListsEl ? prevListsEl.scrollTop : 0;

    appEl.innerHTML = `
      <section class="board">
        <header class="board-header">
          <div class="board-header-top">
            <h1>Ordene as cartas</h1>
            <button type="button" id="restart-btn" class="btn btn-secondary">Recomeçar</button>
          </div>
          <p class="lead">Arraste as cartas para dentro das listas. Crie quantas listas quiser e arraste o ícone ⠿ do cabeçalho para reordenar as listas por prioridade — a ordem importa. Seu progresso é salvo automaticamente neste dispositivo.</p>
        </header>

        <div class="board-columns">
          <div class="pool-column">
            <h2>Cartas <span class="counter" id="pool-counter"></span></h2>
            <div class="pool" data-dropzone>${renderPoolCards()}</div>
          </div>

          <div class="lists-column">
            <h2>Categorias</h2>
            <div class="lists-section" data-reorder-track>${renderLists()}</div>

            <form id="new-list-form" class="new-list-form">
              <input type="text" name="listName" placeholder="Nome da nova lista" required maxlength="60" />
              <button type="submit" class="btn btn-secondary">+ Nova lista</button>
            </form>

            <div class="submit-row">
              <button type="button" id="continue-btn" class="btn btn-primary" disabled>Continuar</button>
              <span id="continue-hint" class="hint"></span>
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('new-list-form').addEventListener('submit', onNewList);
    document.getElementById('continue-btn').addEventListener('click', onContinueClick);
    document.getElementById('restart-btn').addEventListener('click', onRestart);
    updateSubmitState();

    appEl.querySelector('.pool').scrollTop = poolScrollTop;
    appEl.querySelector('.lists-section').scrollTop = listsScrollTop;
  }

  function onContinueClick() {
    state.phase = 'demographics';
    saveProgress();
    render();
  }

  function onRestart() {
    const ok = window.confirm('Isso apaga seu progresso salvo neste dispositivo e começa do zero. Continuar?');
    if (!ok) return;
    clearProgress();
    state.phase = 'sorting';
    state.demographics = null;
    state.pool = shuffle(CARDS.map(c => c.id));
    state.lists = [];
    nextListId = 1;
    render();
  }

  function cardHTML(id) {
    const card = CARDS_BY_ID.get(id);
    const label = card ? card.label : id;
    const thumb = card && card.image
      ? `<img class="card-thumb" src="${cardImageSrc(card.image)}" alt="" loading="lazy" />`
      : `<span class="card-thumb card-thumb-empty"></span>`;
    return `<div class="card" data-card-id="${id}">${thumb}<span class="card-label">${escapeHTML(label)}</span></div>`;
  }

  function renderPoolCards() {
    return state.pool.map(cardHTML).join('') || '<p class="empty-hint">Todas as cartas foram distribuídas.</p>';
  }

  function renderLists() {
    if (!state.lists.length) return '<p class="empty-hint">Nenhuma lista criada ainda.</p>';
    return state.lists.map((list, i) => {
      const color = LIST_COLORS[i % LIST_COLORS.length];
      return `
      <div class="list-panel" style="--list-color:${color}">
        <div class="list-header" data-list-id="${list.id}">
          <button type="button" class="list-drag-handle" aria-label="Reordenar lista" title="Arraste para reordenar">⠿</button>
          <span class="list-rank">${i + 1}º</span>
          <span class="list-name">${escapeHTML(list.name)}</span>
          <button type="button" class="list-rename" data-list-id="${list.id}" aria-label="Renomear lista">✎</button>
          <button type="button" class="list-delete" data-list-id="${list.id}" aria-label="Excluir lista">✕</button>
        </div>
        <div class="list-body" data-dropzone data-list-id="${list.id}">
          ${list.cards.map(cardHTML).join('') || '<p class="empty-hint">Solte cartas aqui.</p>'}
        </div>
      </div>
    `;
    }).join('');
  }

  function onNewList(e) {
    e.preventDefault();
    const name = (new FormData(e.target).get('listName') || '').trim();
    if (!name) return;
    state.lists.push({ id: 'list-' + (nextListId++), name, cards: [] });
    renderBoard();
  }

  function onCardMove(cardId, toListId) {
    state.pool = state.pool.filter(id => id !== cardId);
    state.lists.forEach(list => { list.cards = list.cards.filter(id => id !== cardId); });
    if (toListId === null) {
      state.pool.push(cardId);
    } else {
      const list = state.lists.find(l => l.id === toListId);
      (list ? list.cards : state.pool).push(cardId);
    }
    renderBoard();
  }

  function onListReorder(listId, newIndex) {
    const from = state.lists.findIndex(l => l.id === listId);
    if (from === -1) return;
    const [list] = state.lists.splice(from, 1);
    state.lists.splice(newIndex, 0, list);
    renderBoard();
  }

  function onRenameList(listId) {
    const list = state.lists.find(l => l.id === listId);
    if (!list) return;
    const next = window.prompt('Novo nome da lista:', list.name);
    if (next && next.trim()) {
      list.name = next.trim();
      renderBoard();
    }
  }

  function onDeleteList(listId) {
    const idx = state.lists.findIndex(l => l.id === listId);
    if (idx === -1) return;
    const [list] = state.lists.splice(idx, 1);
    state.pool.push(...list.cards);
    renderBoard();
  }

  function updateSubmitState() {
    const btn = document.getElementById('continue-btn');
    const hint = document.getElementById('continue-hint');
    const counter = document.getElementById('pool-counter');
    if (counter) counter.textContent = state.pool.length ? `— faltam ${state.pool.length}` : '— completo';
    const ready = state.pool.length === 0 && state.lists.length > 0;
    if (btn) btn.disabled = !ready;
    if (hint) {
      hint.textContent = ready
        ? ''
        : state.lists.length === 0
          ? 'Crie pelo menos uma lista.'
          : `Distribua todas as cartas (faltam ${state.pool.length}).`;
    }
  }

  function renderThankYou() {
    appEl.innerHTML = `
      <section class="gate">
        <h1>Obrigado!</h1>
        <p class="lead">Sua ordenação foi enviada. Você pode ver os resultados agregados em <a href="/cardsort/results/">/cardsort/results/</a>.</p>
      </section>
    `;
  }

  appEl.addEventListener('click', e => {
    const renameBtn = e.target.closest('.list-rename');
    const deleteBtn = e.target.closest('.list-delete');
    if (renameBtn) onRenameList(renameBtn.dataset.listId);
    if (deleteBtn) onDeleteList(deleteBtn.dataset.listId);
  });

  initSortable(appEl, { onCardMove, onListReorder });
  render();
})();
