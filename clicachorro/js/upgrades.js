// upgrades.js — multiplier upgrade definitions + purchase logic

import { State } from './state.js';
import { ITEM_CHAINS, getItemStage } from './items.js';

export const MULTIPLIER_UPGRADES = [
  {
    id: 'clique2x',
    nome: 'Patinha Dupla',
    descricao: 'Patada em dobro.',
    funcao: '×2 por clique',
    preco: 1_500,
    categoria: 'clique',
    efeito: (state) => { state.clickPower *= 2; },
    icon: '✌️',
  },
  {
    id: 'clique5x',
    nome: 'Pata Kung-Fu',
    descricao: 'Uma patada com a força de 5 cães.',
    funcao: '×5 por clique',
    preco: 35_000,
    categoria: 'clique',
    efeito: (state) => { state.clickPower *= 5; },
    icon: '🖐',
  },
  {
    id: 'clique10a',
    nome: 'Pata Suprema',
    descricao: 'Dez patas. Zero explicação.',
    funcao: '×10 por clique',
    preco: 350_000,
    categoria: 'clique',
    efeito: (state) => { state.clickPower *= 10; },
    icon: '🦾',
  },
  {
    id: 'clique10b',
    nome: 'Pata Celestial',
    descricao: 'Um clique que atravessa dimensões.',
    funcao: '×10 por clique',
    preco: 4_000_000,
    categoria: 'clique',
    efeito: (state) => { state.clickPower *= 10; },
    icon: '✨',
  },
  {
    id: 'cps2x',
    nome: 'Cachorro de Gravata',
    descricao: 'Ele está de home office.',
    funcao: 'Dobra toda a produção.',
    preco: 20_000,
    categoria: 'producao',
    efeito: () => {},
    cpsMultiplier: 2,
    icon: '👔',
  },
  {
    id: 'cps4x',
    nome: 'Cachorro de Terno',
    descricao: 'Foi promovido.',
    funcao: 'Quadruplica toda a produção.',
    preco: 900_000,
    categoria: 'producao',
    efeito: () => {},
    cpsMultiplier: 4,
    icon: '🤵',
  },
];

export function buyMultiplierUpgrade(upgrade) {
  if (State.upgrades[upgrade.id]) return false;
  if (State.moedas < upgrade.preco) return false;
  State.moedas -= upgrade.preco;
  State.upgrades[upgrade.id] = 1;
  upgrade.efeito(State);
  State.stats.itemsBought++;
  return true;
}

export function recalcCPS() {
  let base = 0;
  for (const chain of ITEM_CHAINS) {
    const stage = getItemStage(chain);
    if (stage >= 0) base += chain.stages[stage].cps || 0;
  }
  let multiplier = 1;
  for (const upg of MULTIPLIER_UPGRADES) {
    if (State.upgrades[upg.id] && upg.cpsMultiplier) {
      multiplier *= upg.cpsMultiplier;
    }
  }
  State.cps = base * multiplier;
}
