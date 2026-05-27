// game.js — entry point, game loop, input wiring

import { State } from './state.js';
import { processClick } from './economy.js';
import { recalcCPS } from './upgrades.js';
import { ITEM_CHAINS, getItemStage, applyAllItems, initFreeItems } from './items.js';
import { saveGame, loadGame, calcOfflineProgress } from './save.js';
import { checkAchievements } from './achievements.js';
import { playSound, Sounds, playLeafSound, playWoodTapSound } from './audio.js';
import { explodirEstrelas, floatingText, screenShake } from './effects.js';
import {
  updateCounters, renderShop, initSlider,
  handleShopClick, showNotification, showAchievement,
  showOfflineModal, initTabs, initResetButton,
} from './ui.js';

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const bola       = document.querySelector('.bola');
const olho       = document.querySelector('.olho');
const olhoHitbox = document.querySelector('.olho-hitbox');
const honkHitbox = document.querySelector('.honk-hitbox');
const btnLoja    = document.getElementById('btnLoja');
const lojaMenu   = document.getElementById('lojaMenu');
const bambuEl    = document.getElementById('bambu');
const camaEl     = document.getElementById('cama');
const armarioEl  = document.getElementById('armario');
const boomboxEl  = document.getElementById('boombox');
const plushieEl  = document.getElementById('plushie');

// ─── Game loop ────────────────────────────────────────────────────────────────
let lastTick       = performance.now();
let lastSave       = performance.now();
let lastShopRender = performance.now();
const SAVE_INTERVAL        = 30_000;
const SHOP_RENDER_INTERVAL =  2_000;

function loop(now) {
  requestAnimationFrame(loop);

  const delta = (now - lastTick) / 1000;
  lastTick = now;

  if (State.cps > 0) {
    const earned = State.cps * delta;
    State.moedas      += earned;
    State.totalMoedas += earned;
  }

  updateCounters();

  if (now - lastShopRender > SHOP_RENDER_INTERVAL) {
    renderShop();
    lastShopRender = now;
  }

  if (now - lastSave > SAVE_INTERVAL) {
    saveGame();
    lastSave = now;
  }
}

// ─── Click handling ───────────────────────────────────────────────────────────
function onGameClick(e) {
  const { gain, isCrit } = processClick(e.clientX, e.clientY);

  explodirEstrelas(e.clientX, e.clientY, isCrit ? 80 : 40);

  const label = isCrit
    ? `CRÍTICO! +${Math.floor(gain)}`
    : `+${Math.floor(gain)}`;
  floatingText(e.clientX, e.clientY - 20, label, {
    critical: isCrit,
    color: isCrit ? '#FFD700' : '#fff',
    size:  isCrit ? '1.5rem'  : '1rem',
  });

  if (isCrit) screenShake(5, 250);

  checkAchievements().forEach(showAchievement);
}

// ─── Eye blink ────────────────────────────────────────────────────────────────
olhoHitbox.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);
  State.stats.blinks++;
  olho.classList.add('fechado');
  playSound(Sounds.blink, { pitchVariance: 0.1 });
  setTimeout(() => olho.classList.remove('fechado'), 500);
  checkAchievements().forEach(showAchievement);
});

// ─── Honk ─────────────────────────────────────────────────────────────────────
honkHitbox.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);
  State.stats.honks++;
  playSound(Sounds.honk, { pitchVariance: 0.15 });
  checkAchievements().forEach(showAchievement);
});

// ─── Bambu click (stage-driven sound) ────────────────────────────────────────
const bambooChain = ITEM_CHAINS.find(c => c.id === 'bamboo');

bambuEl.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);

  const stage     = getItemStage(bambooChain);
  const stageData = bambooChain.stages[Math.max(0, stage)];
  if (stageData.sound === 'leaf') playLeafSound();
  else playWoodTapSound();

  bambuEl.classList.remove('swaying');
  void bambuEl.offsetWidth;
  bambuEl.classList.add('swaying');
});

bambuEl.addEventListener('animationend', () => bambuEl.classList.remove('swaying'));

// ─── Cama click ───────────────────────────────────────────────────────────────
camaEl.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);
  playSound(Sounds.plush, { pitchVariance: 0.1 });
  camaEl.classList.remove('pulando');
  void camaEl.offsetWidth;
  camaEl.classList.add('pulando');
});
camaEl.addEventListener('animationend', () => camaEl.classList.remove('pulando'));

// ─── Armario click (frame animation) ─────────────────────────────────────────
const ARMARIO_FRAMES = ['img/armario_half.webp', 'img/armario_open.webp', 'img/armario_half.webp', 'img/armario.webp'];
let armarioAnimating = false;

armarioEl.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);
  if (armarioAnimating) return;
  playSound(Sounds.woosh, { pitchVariance: 0.05 });
  armarioAnimating = true;
  let frame = 0;
  const step = () => {
    armarioEl.src = ARMARIO_FRAMES[frame++];
    if (frame < ARMARIO_FRAMES.length) setTimeout(step, 120);
    else armarioAnimating = false;
  };
  step();
});

// ─── Boombox click ────────────────────────────────────────────────────────────
boomboxEl.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);
  playSound(Sounds.scratch, { pitchVariance: 0.1 });
  boomboxEl.classList.remove('jumping');
  void boomboxEl.offsetWidth;
  boomboxEl.classList.add('jumping');
});
boomboxEl.addEventListener('animationend', () => boomboxEl.classList.remove('jumping'));

// ─── Plushie click ────────────────────────────────────────────────────────────
plushieEl.addEventListener('click', e => {
  e.stopPropagation();
  onGameClick(e);
  playSound(Sounds.plush, { pitchVariance: 0.1 });
  plushieEl.classList.remove('jumping');
  void plushieEl.offsetWidth;
  plushieEl.classList.add('jumping');
});
plushieEl.addEventListener('animationend', () => plushieEl.classList.remove('jumping'));

// ─── Global click ─────────────────────────────────────────────────────────────
document.addEventListener('click', e => {
  if (lojaMenu.contains(e.target) || btnLoja.contains(e.target)) return;
  onGameClick(e);
  playWoodTapSound();
});

// ─── Shop toggle ──────────────────────────────────────────────────────────────
let lojaAberta = false;
btnLoja.addEventListener('click', e => {
  e.stopPropagation();
  lojaAberta = !lojaAberta;
  lojaMenu.classList.toggle('aberto', lojaAberta);
  if (lojaAberta) renderShop();
});

lojaMenu.addEventListener('click', handleShopClick);

// ─── Mouse tracking ───────────────────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  const rect = olho.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  let dx = e.clientX - cx;
  let dy = e.clientY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const max  = 20;
  if (dist > max) { dx = (dx / dist) * max; dy = (dy / dist) * max; }
  bola.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
});

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  const saved = loadGame();

  // Ensure free stage-0 items are always present (idempotent)
  initFreeItems();

  if (saved) {
    const gained = calcOfflineProgress();
    if (gained > 0) {
      State.moedas      += gained;
      State.totalMoedas += gained;
      showOfflineModal(gained);
    }
  }

  recalcCPS();
  applyAllItems();
  initSlider();
  initTabs();
  initResetButton();
  renderShop();
  updateCounters();

  lastTick = performance.now();
  lastSave = performance.now();
  requestAnimationFrame(loop);

  checkAchievements().forEach(showAchievement);
}

init();
