// economy.js — click processing, combo, critical clicks, CPS tick

import { State } from './state.js';

const CRIT_CHANCE      = 0.05; // 5%
const CRIT_MULTIPLIER  = 7;
const COMBO_MAX_MULT   = 5;
const COMBO_DECAY_MS   = 1500;

export function processClick(x, y) {
  // Combo
  State.combo.count++;
  State.combo.multiplier = Math.min(COMBO_MAX_MULT, 1 + Math.floor(State.combo.count / 5));

  clearTimeout(State.combo.timer);
  State.combo.timer = setTimeout(() => {
    State.combo.count = 0;
    State.combo.multiplier = 1;
  }, COMBO_DECAY_MS);

  // Critical
  const isCrit = Math.random() < CRIT_CHANCE;
  if (isCrit) State.stats.criticalClicks++;

  const gain = State.clickPower
    * State.combo.multiplier
    * (isCrit ? CRIT_MULTIPLIER : 1);

  addMoedas(gain);
  State.totalCliques++;

  return { gain, isCrit, combo: State.combo.multiplier };
}

export function addMoedas(amount) {
  State.moedas      += amount;
  State.totalMoedas += amount;
}

// Called every second by the game loop
export function tickCPS(deltaSeconds) {
  if (State.cps <= 0) return 0;
  const earned = State.cps * deltaSeconds;
  addMoedas(earned);
  return earned;
}

