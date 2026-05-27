// items.js — evolving item chains: data-driven visual progression

import { State } from './state.js';

export const ITEM_CHAINS = [
  {
    id: 'bamboo',
    elementId: 'bambu',
    icon: '🎋',
    stages: [
      { image: 'bamboo_0.webp', nome: 'Vaso Suspeito', descricao: 'Um vaso. Muito suspeito.',       preco: 25,      cps: 1,    sound: 'woodTap', elStyle: { height: '19.6%' } },
      { image: 'bamboo_1.webp', nome: 'Bambu',         descricao: 'Cresceu. Aparentemente.',        preco: 300,     cps: 5,    sound: 'leaf',    elStyle: { height: '38.5%' } },
      { image: 'bamboo_2.webp', nome: 'Mais Bambu',    descricao: 'Bambu demais para um cachorro.', preco: 5_000,   cps: 30,   sound: 'leaf',    elStyle: { height: '41.1%', right: '36vh' } },
      { image: 'bamboo_3.webp', nome: 'MAIS BAMBU!!!', descricao: 'A sala virou uma floresta.',     preco: 80_000,  cps: 200,  sound: 'leaf',    elStyle: { right: '32vh' } },
    ],
  },
  {
    id: 'poster',
    elementId: 'poster',
    icon: '🖼',
    stages: [
      { image: 'poster_0.webp', nome: 'Papel na Parede',  descricao: 'Uma folha em branco. Emoldurada por otimismo.', preco: 600,   cps: 8,  sound: null },
      { image: 'poster_1.webp', nome: 'Poster de Banda',  descricao: 'Banda desconhecida. Som impossível.',           preco: 8_000, cps: 45, sound: null },
    ],
  },
  {
    id: 'armario',
    elementId: 'armario',
    icon: '🚪',
    stages: [
      { image: 'armario.webp', nome: 'Armário',                  descricao: 'Guarda o quê? Ninguém sabe.',  preco: 3_000,   cps: 25,  sound: null },
      { image: 'armario.webp', nome: 'Pelúcia no Armário',       descricao: 'A pelúcia sabe os segredos.',  preco: 25_000,  cps: 100, sound: null, extras: ['plushie'] },
      { image: 'armario.webp', nome: 'Caixa de Som no Armário',  descricao: 'Que ritmo. Que armário.',      preco: 200_000, cps: 400, sound: null, extras: ['plushie', 'boombox'] },
    ],
  },
  {
    id: 'cama',
    elementId: 'cama',
    icon: '🛏',
    stages: [
      { image: 'cama_0.webp', nome: 'Tapete Velho',  descricao: 'Um tapete de 2003. Cheira a arrependimento.',           preco: 10_000,    cps: 80,   sound: null, elStyle: { height: '5%', left: '0' } },
      { image: 'cama_1.webp', nome: 'Cama Simples',  descricao: 'Concreto com colchão em cima. Funciona, tecnicamente.', preco: 80_000,    cps: 300,  sound: null, elStyle: { height: '20%', left: '0' } },
      { image: 'cama_2.webp', nome: 'Cama',          descricao: 'Uma cama. Normal. Sem surpresas.',                      preco: 600_000,   cps: 1200, sound: null, elStyle: { height: '24%', left: '0' } },
      { image: 'cama_3.webp', nome: 'Cama de Luxo',  descricao: 'Cama de carro. Ele dorme fazendo vrum vrum.',           preco: 5_000_000, cps: 5000, sound: null, elStyle: { height: '28%', left: '0', bottom: '-10px' } },
    ],
  },
  {
    id: 'corFundo',
    elementId: 'sliderFundo',
    icon: '🎨',
    stages: [
      { image: null, nome: 'Cor do Fundo', descricao: 'Personaliza o universo.', preco: 300_000, cps: 0, sound: null },
    ],
  },
];

// Returns current stage index. -1 = not yet owned.
export function getItemStage(chain) {
  const v = State.items[chain.id];
  return v === undefined ? -1 : v;
}

// Next stage object to purchase, or null if already maxed out.
export function getNextStage(chain) {
  const next = getItemStage(chain) + 1;
  return next < chain.stages.length ? chain.stages[next] : null;
}

export function buyNextItemStage(chain) {
  const next = getNextStage(chain);
  if (!next || State.moedas < next.preco) return false;
  State.moedas -= next.preco;
  State.items[chain.id] = getItemStage(chain) + 1;
  State.stats.itemsBought++;
  return true;
}

// Sync all item DOM elements to their current stage.
export function applyAllItems() {
  for (const chain of ITEM_CHAINS) {
    const stage = getItemStage(chain);
    const el = document.getElementById(chain.elementId);

    // Collect all extra element IDs referenced across all stages of this chain
    const allExtraIds = [...new Set(chain.stages.flatMap(s => s.extras || []))];
    const activeExtras = new Set(stage >= 0 ? (chain.stages[stage].extras || []) : []);
    for (const extraId of allExtraIds) {
      const extraEl = document.getElementById(extraId);
      if (extraEl) extraEl.classList.toggle('visivel', activeExtras.has(extraId));
    }

    if (!el) continue;
    if (stage < 0) {
      el.classList.remove('visivel');
    } else {
      el.classList.add('visivel');
      const data = chain.stages[stage];
      if (data.image && el.tagName === 'IMG') el.src = 'img/' + data.image;
      el.style.height = '';
      el.style.right  = '';
      el.style.left   = '';
      el.style.bottom = '';
      if (data.elStyle) Object.assign(el.style, data.elStyle);
    }
  }
}

// Unlock stage-0 items that are free (preco: 0). Idempotent — safe to call multiple times.
export function initFreeItems() {
  for (const chain of ITEM_CHAINS) {
    if (chain.stages[0].preco === 0 && getItemStage(chain) < 0) {
      State.items[chain.id] = 0;
    }
  }
}
