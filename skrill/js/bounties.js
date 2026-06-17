// ── SKRILL — Lista de Bounties ──────────────────────────────────────────────────
// Bounties são desafios artísticos especiais sorteados por temporada.
// Para editar: adicione/remova/ajuste objetos { title, description } abaixo.
// Uma Bounty pode ser sorteada novamente em temporadas futuras.

const BOUNTIES = [
  {
    title: 'Crie uma arte da OC do jogador acima de você no ranking',
    description: 'Crie qualquer tipo de arte inspirada em uma OC (Personagem Original) do jogador acima de você no ranking dos últimos 30 dias. Se você estiver em primeiro lugar, escolha a OC do último colocado.',
  },
  {
    title: 'Redesenhe seu avatar do Skrill em alta resolução',
    description: 'Pegue o pixel art do seu avatar atual e recrie-o como uma ilustração caprichada, em qualquer estilo ou técnica que quiser.',
  },
  {
    title: 'Ilustre o mascote Skrill em uma cena',
    description: 'Desenhe o mascote do Skrill vivendo uma aventura: caminhando, lutando, descansando — você decide o contexto e o cenário.',
  },
  {
    title: 'Crie uma capa para esta temporada',
    description: 'Produza uma arte de capa que represente o clima, as metas ou o espírito desta temporada do grupo.',
  },
  {
    title: 'Faça um fan art de um personagem favorito de outro membro',
    description: 'Pergunte a alguém do grupo qual o personagem favorito dele e crie um fan art dedicado a esse personagem.',
  },
  {
    title: 'Desenhe algo usando apenas duas cores',
    description: 'Crie uma ilustração completa usando uma paleta limitada a exatamente duas cores (além do fundo).',
  },
  {
    title: 'Reinterprete uma obra de arte clássica',
    description: 'Escolha uma obra famosa e recrie-a no seu próprio estilo, com seu próprio toque pessoal.',
  },
  {
    title: 'Crie um logo para um projeto fictício',
    description: 'Invente um produto, banda ou estúdio fictício e desenhe um logo completo para ele.',
  },
  {
    title: 'Faça um autorretrato em estilo não realista',
    description: 'Desenhe a si mesmo em um estilo crazy.',
  },
  {
    title: 'Ilustre uma criatura inventada por você',
    description: 'Crie uma criatura totalmente original: descreva e desenhe sua anatomia, cores e habitat.',
  },
  {
    title: 'Crie uma arte inspirada em uma música',
    description: 'Escolha uma música e produza uma ilustração que traduza visualmente o que ela te faz sentir.',
  },
  {
    title: 'Desenhe uma cena noturna',
    description: 'Crie uma arte ambientada à noite, explorando iluminação, sombras e atmosfera.',
  },
  {
    title: 'Crie um emote ou sticker para o grupo',
    description: 'Desenhe um emote/sticker que o grupo poderia usar no Discord. Capriche na expressividade.',
  },
  {
    title: 'Ilustre uma memória de infância',
    description: 'Recrie em arte um momento marcante da sua infância, do jeito que você se lembra dele.',
  },
  {
    title: 'Desenhe um personagem em três expressões diferentes',
    description: 'Pegue um personagem (seu ou de outro) e mostre-o em três emoções distintas.',
  },
  {
    title: 'Crie uma arte com tema de fantasia medieval',
    description: 'Produza uma ilustração no universo de fantasia: cavaleiros, magos, dragões, castelos — o que preferir.',
  },
  {
    title: 'Faça uma arte com tema de ficção científica',
    description: 'Crie uma cena futurista ou espacial: naves, robôs, cidades neon, planetas distantes.',
  },
  {
    title: 'Redesenhe um vilão como herói (ou vice-versa)',
    description: 'Escolha um personagem conhecido e inverta seu papel, reimaginando seu visual de acordo.',
  },
  {
    title: 'Crie uma paisagem usando uma referência real',
    description: 'Use uma foto de um lugar real como referência e produza uma paisagem a partir dela.',
  },
  {
    title: 'Desenhe um objeto do cotidiano de forma épica',
    description: 'Pegue um objeto comum (uma caneca, um chinelo, um controle) e ilustre-o como se fosse um item lendário.',
  },
  {
    title: 'Crie um design de carta colecionável',
    description: 'Desenhe uma carta no estilo de card game (com moldura, arte e atributos) para um personagem à sua escolha.',
  },
  {
    title: 'Reimagine o avatar de outro membro do grupo',
    description: 'Escolha o avatar de pixel art de alguém do grupo e recrie-o no seu estilo, como uma homenagem.',
  },
  {
    title: 'Faça uma arte sobre pesca',
    description: 'Crie uma ilustração com tema de pesca: um pescador, o mar, um lago tranquilo, aquele peixão lendário fisgado — você decide a cena e o clima.',
  },
];
