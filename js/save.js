// save.js — localStorage persistence

import { State, resetState } from './state.js';
import { recalcCPS } from './upgrades.js';
import { initFreeItems } from './items.js';

const SAVE_KEY = 'clicachorro_save';
const CURRENT_VERSION = 2;

export function saveGame() {
  State.timestamps.lastSave = Date.now();
  const data = {
    v: CURRENT_VERSION,
    moedas: State.moedas,
    totalCliques: State.totalCliques,
    totalMoedas: State.totalMoedas,
    clickPower: State.clickPower,
    upgrades: { ...State.upgrades },
    achievements: { ...State.achievements },
    items: { ...State.items },
    stats: { ...State.stats },
    settings: { ...State.settings },
    timestamps: { ...State.timestamps },
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Save failed:', e);
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    let data = JSON.parse(raw);
    if (!data) return null;

    // Migrate v1 → v2: decoratives became item chains
    if (data.v === 1) {
      const d = data.decoratives || {};
      data.items = {};
      if (d.bambu)    data.items.bamboo   = 1; // had old bambu → stage 1
      if (d.cama)     data.items.cama     = 0;
      if (d.armario)  data.items.armario  = 0;
      if (d.corFundo) data.items.corFundo = 0;
      data.v = 2;
    }

    if (data.v !== CURRENT_VERSION) return null;

    State.moedas       = data.moedas       ?? 0;
    State.totalCliques = data.totalCliques ?? 0;
    State.totalMoedas  = data.totalMoedas  ?? 0;
    State.clickPower   = data.clickPower   ?? 1;
    Object.assign(State.upgrades,     data.upgrades     ?? {});
    Object.assign(State.achievements, data.achievements ?? {});
    Object.assign(State.items,        data.items        ?? {});
    Object.assign(State.stats,        data.stats        ?? {});
    Object.assign(State.settings,     data.settings     ?? {});
    Object.assign(State.timestamps,   data.timestamps   ?? {});

    recalcCPS();
    return data;
  } catch (e) {
    console.warn('Load failed:', e);
    return null;
  }
}

export function resetSave() {
  localStorage.removeItem(SAVE_KEY);
  resetState();
  recalcCPS();
  initFreeItems();
}

export function calcOfflineProgress() {
  if (!State.timestamps.lastSave || State.cps <= 0) return 0;
  const elapsed = (Date.now() - State.timestamps.lastSave) / 1000;
  const capped  = Math.min(elapsed, 4 * 60 * 60);
  return Math.floor(State.cps * capped);
}
