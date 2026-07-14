// ui.js — rendering, shop, notifications, modals, counters

import { State } from './state.js';
import {
  MULTIPLIER_UPGRADES,
  buyMultiplierUpgrade,
  recalcCPS,
} from './upgrades.js';
import {
  ITEM_CHAINS, getItemStage, getNextStage, buyNextItemStage,
  applyAllItems, initFreeItems,
} from './items.js';
import { ACHIEVEMENTS } from './achievements.js';
import { saveGame, resetSave } from './save.js';
import { checkAchievements } from './achievements.js';

// ─── Element refs ─────────────────────────────────────────────────────────────
const elContador      = document.getElementById('contador');
const elCPS           = document.getElementById('cps-display');
const elLojaSaldo     = document.getElementById('lojaSaldo');
const elNotif         = document.getElementById('notificacao');
const elSliderMatiz   = document.getElementById('sliderMatiz');
const elCombo         = document.getElementById('combo-display');
const elModal         = document.getElementById('modal');
const elModalBody     = document.getElementById('modal-body');
const elShopItens     = document.getElementById('shop-itens');
const elShopMulti     = document.getElementById('shop-multi');
const elShopConquistas = document.getElementById('shop-conquistas');
const tabBtns         = document.querySelectorAll('.tab-btn');

let notifTimer = null;

// ─── Formatting ───────────────────────────────────────────────────────────────
function fmt(n) {
  n = Math.floor(n);
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toLocaleString('pt-BR');
}

// ─── Counters ─────────────────────────────────────────────────────────────────
export function updateCounters() {
  elContador.textContent  = `🐾 ${fmt(State.moedas)}`;
  elCPS.textContent       = State.cps > 0 ? `${fmt(State.cps)}/s` : '';
  elLojaSaldo.textContent = `${fmt(State.moedas)} moedas`;

  if (State.combo.multiplier > 1) {
    elCombo.textContent   = `x${State.combo.multiplier} COMBO!`;
    elCombo.style.opacity = '1';
  } else {
    elCombo.style.opacity = '0';
  }
}

// ─── Shop rendering ───────────────────────────────────────────────────────────
export function renderShop() {
  renderItems();
  renderMultiplier();
  renderAchievements();
}

// ── Itens tab ─────────────────────────────────────────────────────────────────
function renderItems() {
  elShopItens.innerHTML = '';
  for (const chain of ITEM_CHAINS) {
    const stageIdx = getItemStage(chain);
    const isLocked = stageIdx < 0;
    const isMaxed  = !isLocked && !getNextStage(chain);
    const nextStage = getNextStage(chain);
    const canBuy    = !!nextStage && State.moedas >= nextStage.preco;

    // For unowned items, display stage 0 info as a preview
    const displayStage = isLocked ? chain.stages[0] : chain.stages[stageIdx];
    const displayName  = displayStage.nome;
    const displayDesc  = displayStage.descricao;

    // Thumbnail: chain icon when unowned, stage image when owned, chain icon as fallback
    let thumbHtml;
    if (!isLocked && displayStage.image) {
      thumbHtml = `<img class="item-thumb" src="img/${displayStage.image}" draggable="false">`;
    } else {
      thumbHtml = `<span class="item-icon">${chain.icon}</span>`;
    }

    // Stage progress label (only when owned)
    let stageLabel = '';
    if (!isLocked) {
      stageLabel = isMaxed
        ? `<span class="item-stage-label maxed">✓ Máximo</span>`
        : `<span class="item-stage-label">Lvl ${stageIdx + 1} / ${chain.stages.length}</span>`;
    }

    // CPS display
    const currentCps = (!isLocked && displayStage.cps) ? displayStage.cps : 0;
    const nextCps    = nextStage?.cps ?? 0;
    let cpsHtml = '';
    if (isMaxed && currentCps > 0) {
      cpsHtml = `<span class="item-cps">${currentCps}/s</span>`;
    } else if (!isLocked && nextCps > 0) {
      cpsHtml = `<span class="item-cps">↑ ${nextCps}/s</span>`;
    } else if (isLocked && nextCps > 0) {
      cpsHtml = `<span class="item-cps">${nextCps}/s</span>`;
    }

    // Next-stage preview (only when owned and not maxed)
    const nextPreview = (!isLocked && nextStage)
      ? `<span class="item-next">↑ ${nextStage.nome}</span>`
      : '';

    const btnText = isMaxed
      ? 'Máximo!'
      : `${fmt(nextStage.preco)} moedas`;

    const el = document.createElement('div');
    el.className = 'loja-item item-chain' + (!canBuy ? ' disabled' : '');
    el.innerHTML = `
      ${stageLabel ? `<div class="item-chain-header">${stageLabel}</div>` : ''}
      <div class="item-topo">
        ${thumbHtml}
        <div class="item-info">
          <span class="item-nome">${displayName}</span>
          <span class="item-desc">${displayDesc}</span>
          ${cpsHtml}
          ${nextPreview}
        </div>
      </div>
      <button class="item-btn${isMaxed ? ' comprado' : ''}"
        data-id="${chain.id}" data-tipo="item"
        ${isMaxed || !canBuy ? 'disabled' : ''}>
        ${btnText}
      </button>`;
    elShopItens.appendChild(el);
  }
}

// ── Melhorias tab (multiplier bonuses) ───────────────────────────────────────
function renderMultiplier() {
  elShopMulti.innerHTML = '';

  const cats = [
    { key: 'clique',   label: 'Clique'   },
    { key: 'producao', label: 'Produção' },
  ];

  for (const cat of cats) {
    const upgrades = MULTIPLIER_UPGRADES.filter(u => u.categoria === cat.key);
    if (!upgrades.length) continue;

    const sep = document.createElement('div');
    sep.className = `loja-separador cat-${cat.key}`;
    sep.textContent = cat.label;
    elShopMulti.appendChild(sep);

    for (const upg of upgrades) {
      const owned  = !!State.upgrades[upg.id];
      const canBuy = !owned && State.moedas >= upg.preco;

      const el = document.createElement('div');
      el.className = 'loja-item' + (owned || !canBuy ? ' disabled' : '');
      el.innerHTML = `
        <div class="item-topo">
          <span class="item-icon">${upg.icon}</span>
          <div class="item-info">
            <span class="item-nome">${upg.nome}</span>
            <span class="item-desc">${upg.descricao}</span>
            ${upg.funcao ? `<span class="item-funcao">${upg.funcao}</span>` : ''}
          </div>
        </div>
        <button class="item-btn${owned ? ' comprado' : ''}" data-id="${upg.id}" data-tipo="multi"
          ${owned || !canBuy ? 'disabled' : ''}>
          ${owned ? 'Comprado' : fmt(upg.preco) + ' moedas'}
        </button>`;
      elShopMulti.appendChild(el);
    }
  }
}

// ── Conquistas tab ────────────────────────────────────────────────────────────
function renderAchievements() {
  elShopConquistas.innerHTML = '';

  const total    = ACHIEVEMENTS.length;
  const unlocked = Object.keys(State.achievements).length;

  const header = document.createElement('div');
  header.className = 'conquistas-header';
  header.textContent = `${unlocked} / ${total} conquistas`;
  elShopConquistas.appendChild(header);

  for (const ach of ACHIEVEMENTS) {
    const isUnlocked = !!State.achievements[ach.id];
    const el = document.createElement('div');
    el.className = 'ach-item' + (isUnlocked ? ' unlocked' : ' locked');
    el.innerHTML = `
      <span class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</span>
      <div class="ach-info">
        <span class="ach-nome">${ach.nome}</span>
        <span class="ach-desc">${ach.descricao}</span>
      </div>`;
    elShopConquistas.appendChild(el);
  }
}

// ─── Shop purchase handler ────────────────────────────────────────────────────
export function handleShopClick(e) {
  const btn = e.target.closest('.item-btn');
  if (!btn || btn.disabled) return;
  const id   = btn.dataset.id;
  const tipo = btn.dataset.tipo;

  let success = false;
  let nome    = '';

  if (tipo === 'multi') {
    const upg = MULTIPLIER_UPGRADES.find(u => u.id === id);
    success = buyMultiplierUpgrade(upg);
    if (success) { recalcCPS(); nome = upg.nome; }
  } else if (tipo === 'item') {
    const chain = ITEM_CHAINS.find(c => c.id === id);
    success = buyNextItemStage(chain);
    if (success) {
      applyAllItems();
      recalcCPS();
      nome = chain.stages[getItemStage(chain)].nome;
    }
  }

  if (success) {
    showNotification(`${nome} comprado!`);
    renderShop();
    updateCounters();
    checkAchievements().forEach(showAchievement);
    saveGame();
  }
}

// ─── Background color ─────────────────────────────────────────────────────────
export function initSlider() {
  elSliderMatiz.value = State.settings.backgroundHue;
  applyHue(State.settings.backgroundHue);

  elSliderMatiz.addEventListener('click', e => e.stopPropagation());
  elSliderMatiz.addEventListener('input', e => {
    State.settings.backgroundHue = parseInt(e.target.value);
    applyHue(State.settings.backgroundHue);
  });
}

function applyHue(h) {
  document.body.style.backgroundColor = `hsl(${h}, 95%, 64%)`;
}

// ─── Notifications ────────────────────────────────────────────────────────────
export function showNotification(text) {
  elNotif.textContent = text;
  elNotif.classList.add('visivel');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => elNotif.classList.remove('visivel'), 2200);
}

// ─── Achievement popup queue ──────────────────────────────────────────────────
const achQueue = [];
const ACH_SLOT = 82;
const ACH_BASE = 20;

function reflowAchQueue() {
  achQueue.forEach((el, i) => {
    el.style.bottom = (ACH_BASE + i * ACH_SLOT) + 'px';
  });
}

export function showAchievement(ach) {
  const el = document.createElement('div');
  el.className = 'achievement-popup';
  el.innerHTML = `<span class="ach-icon">${ach.icon}</span>
    <div><strong>${ach.nome}</strong><br><small>${ach.descricao}</small></div>`;

  el.style.bottom = (ACH_BASE + achQueue.length * ACH_SLOT) + 'px';
  document.body.appendChild(el);
  achQueue.push(el);

  requestAnimationFrame(() => el.classList.add('visivel'));

  setTimeout(() => {
    el.classList.remove('visivel');
    setTimeout(() => {
      el.remove();
      const i = achQueue.indexOf(el);
      if (i !== -1) achQueue.splice(i, 1);
      reflowAchQueue();
    }, 400);
  }, 3500);
}

// ─── Offline modal ────────────────────────────────────────────────────────────
export function showOfflineModal(gained) {
  elModalBody.innerHTML = `
    <h2>Bem-vindo de volta! 🐶</h2>
    <p>Enquanto você esteve fora, o cachorro trabalhou duro:</p>
    <p class="offline-ganho">+${fmt(gained)} moedas</p>
    <button id="modal-close" class="item-btn">Obrigado, cachorro!</button>`;
  elModal.classList.add('visivel');
  document.getElementById('modal-close').addEventListener('click', () => {
    elModal.classList.remove('visivel');
  });
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export function initTabs() {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('ativo'));
      document.getElementById('tab-' + btn.dataset.tab).classList.add('ativo');
    });
  });

  const toggle   = document.getElementById('conquistas-toggle');
  const lista    = document.getElementById('shop-conquistas');
  const chevron  = toggle?.querySelector('.conquistas-chevron');
  let open = false;
  toggle?.addEventListener('click', () => {
    open = !open;
    lista.classList.toggle('aberto', open);
    if (chevron) chevron.textContent = open ? '▼' : '▲';
  });
}

// ─── Reset button ─────────────────────────────────────────────────────────────
export function initResetButton() {
  const btn = document.getElementById('btn-reset');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (confirm('Resetar todo o progresso? Isso é irreversível.')) {
      resetSave();
      applyAllItems();
      initSlider();
      renderShop();
      updateCounters();
      showNotification('Save resetado. Recomeço honesto.');
    }
  });
}
