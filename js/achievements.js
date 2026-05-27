// achievements.js — achievement definitions and unlock logic

import { State } from './state.js';

export const ACHIEVEMENTS = [
  {
    id: 'primeiro_clique',
    nome: 'Primeiro Clique',
    descricao: 'Você clicou no cachorro. Parabéns.',
    condicao: (s) => s.totalCliques >= 1,
    icon: '🐶',
  },
  {
    id: 'cem_cliques',
    nome: 'Clicador Dedicado',
    descricao: '100 cliques. O cachorro aprecia.',
    condicao: (s) => s.totalCliques >= 100,
    icon: '💯',
  },
  {
    id: 'mil_cliques',
    nome: 'Insanidade Digital',
    descricao: '1.000 cliques. Procure ajuda.',
    condicao: (s) => s.totalCliques >= 1000,
    icon: '😤',
  },
  {
    id: 'dez_mil_cliques',
    nome: 'Transcendência',
    descricao: '10.000 cliques. Você virou o cachorro.',
    condicao: (s) => s.totalCliques >= 10000,
    icon: '🌌',
  },
  {
    id: 'primeiro_honk',
    nome: 'HONK',
    descricao: 'Você buzinou o cachorro. Ele gostou.',
    condicao: (s) => s.stats.honks >= 1,
    icon: '🎵',
  },
  {
    id: 'honk_honk',
    nome: 'HONK HONK',
    descricao: '50 honks. Ele definitivamente não gosta mais.',
    condicao: (s) => s.stats.honks >= 50,
    icon: '🎺',
  },
  {
    id: 'piscada',
    nome: 'Olho Mágico',
    descricao: 'Fez o cachorro piscar.',
    condicao: (s) => s.stats.blinks >= 1,
    icon: '👁',
  },
  {
    id: 'rico',
    nome: 'Rico em Moedas',
    descricao: 'Acumulou 1.000 moedas de uma vez.',
    condicao: (s) => s.moedas >= 1000,
    icon: '💰',
  },
  {
    id: 'milionario',
    nome: 'Milionário Canino',
    descricao: '1.000.000 moedas totais. Impressionante.',
    condicao: (s) => s.totalMoedas >= 1000000,
    icon: '🤑',
  },
  {
    id: 'critico',
    nome: 'Clique Crítico!',
    descricao: 'Acertou um clique crítico.',
    condicao: (s) => s.stats.criticalClicks >= 1,
    icon: '💥',
  },
  {
    id: 'combo5',
    nome: 'Combo x5',
    descricao: 'Alcançou combo de 5.',
    condicao: (s) => s.combo.count >= 5,
    icon: '🔥',
  },
  {
    id: 'primeiro_upgrade',
    nome: 'Capitalista',
    descricao: 'Comprou o primeiro upgrade de produção.',
    condicao: (s) => s.stats.itemsBought >= 1,
    icon: '🛒',
  },
  {
    id: 'cps1',
    nome: 'Economia Passiva',
    descricao: 'Atingiu 1 moeda por segundo.',
    condicao: (s) => s.cps >= 1,
    icon: '📈',
  },
  {
    id: 'cps100',
    nome: 'Máquina de Fazer Moeda',
    descricao: '100 moedas por segundo.',
    condicao: (s) => s.cps >= 100,
    icon: '🏭',
  },
  {
    id: 'bamboo_max',
    nome: 'Floresta Pessoal',
    descricao: 'A sala virou uma floresta de verdade.',
    condicao: (s) => s.items.bamboo === 3,
    icon: '🌿',
  },
  {
    id: 'poster_max',
    nome: 'Crítico de Arte',
    descricao: 'O poster foi apreciado. Pelo cachorro.',
    condicao: (s) => s.items.poster === 1,
    icon: '🎸',
  },
  {
    id: 'armario_max',
    nome: 'Armário do DJ',
    descricao: 'Pelúcia, som e segredos. Armário completo.',
    condicao: (s) => s.items.armario === 2,
    icon: '🎛️',
  },
  {
    id: 'cama_max',
    nome: 'Dorminhoco de Luxo',
    descricao: 'Cama de carro. Ele chegou.',
    condicao: (s) => s.items.cama === 3,
    icon: '🚗',
  },
  {
    id: 'cor_fundo_max',
    nome: 'Arquiteto de Interiores',
    descricao: 'Personalizou o universo.',
    condicao: (s) => s.items.corFundo >= 0,
    icon: '🎨',
  },
  {
    id: 'todos',
    nome: 'Completista',
    descricao: 'Desbloqueou tudo. O cachorro está impressionado.',
    condicao: (s) => s.stats.achievementsUnlocked >= ACHIEVEMENTS.length - 1,
    icon: '🏆',
  },
];

// Returns list of newly unlocked achievement ids
export function checkAchievements() {
  const unlocked = [];
  for (const ach of ACHIEVEMENTS) {
    if (!State.achievements[ach.id] && ach.condicao(State)) {
      State.achievements[ach.id] = true;
      State.stats.achievementsUnlocked++;
      unlocked.push(ach);
    }
  }
  return unlocked;
}
