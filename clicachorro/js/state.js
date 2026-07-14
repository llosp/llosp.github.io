// state.js — single source of truth for all game data

export const State = {
  moedas: 0,
  totalCliques: 0,
  totalMoedas: 0,
  cps: 0,
  clickPower: 1,

  combo: {
    count: 0,
    multiplier: 1,
    timer: null,
    decayMs: 1500,
  },

  upgrades: {},     // { upgradeId: quantidade }
  achievements: {}, // { achievementId: true }
  items: {},        // { chainId: stageIndex } — -1 (absent) means not yet owned

  stats: {
    honks: 0,
    blinks: 0,
    criticalClicks: 0,
    itemsBought: 0,
    achievementsUnlocked: 0,
  },

  settings: {
    soundEnabled: true,
    volume: 0.5,
    backgroundHue: 346,
  },

  timestamps: {
    lastSave: null,
    lastSession: null,
  },

  saveVersion: 2,
};

export function resetState() {
  State.moedas = 0;
  State.totalCliques = 0;
  State.totalMoedas = 0;
  State.cps = 0;
  State.clickPower = 1;
  State.combo = { count: 0, multiplier: 1, timer: null, decayMs: 1500 };
  State.upgrades = {};
  State.achievements = {};
  State.items = {};
  State.stats = { honks: 0, blinks: 0, criticalClicks: 0, itemsBought: 0, achievementsUnlocked: 0 };
  State.settings = { soundEnabled: true, volume: 0.5, backgroundHue: 346 };
  State.timestamps = { lastSave: null, lastSession: null };
}
