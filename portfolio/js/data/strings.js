// UI strings, EN/PT. Rendered onto elements carrying data-i18n="<key>".
export const strings = {
  "nav.skip":        { en: "Skip to projects", pt: "Pular para projetos" },
  "nav.projects":    { en: "Projects", pt: "Projetos" },
  "nav.about":       { en: "About", pt: "Sobre" },
  "nav.skills":      { en: "Toolbox", pt: "Ferramentas" },
  "nav.contact":     { en: "Contact", pt: "Contato" },

  "hero.intro": {
    en: "I design game systems and then I build them. The last one placed 21st out of 10,587 games in GMTK Jam 2026 — designed, coded and scored in four days.",
    pt: "Eu projeto sistemas de jogo e depois construo eles. O último ficou em 21º entre 10.587 jogos na GMTK Jam 2026 — desenhado, programado e sonorizado em quatro dias."
  },
  "hero.cta":        { en: "See the work ↓", pt: "Ver projetos ↓" },

  "stats.title":     { en: "Recognition", pt: "Reconhecimento" },
  "stats.rank.value":    { en: "21st / 10,587", pt: "21º / 10.587" },
  "stats.rank.label":    { en: "GMTK Jam 2026 — top 0.2%", pt: "GMTK Jam 2026 — top 0,2%" },
  "stats.ratings.value": { en: "218 ratings", pt: "218 avaliações" },
  "stats.ratings.label": { en: "10× the jam average of 21", pt: "10× a média da jam, de 21" },
  "stats.days.value":    { en: "4 days", pt: "4 dias" },
  "stats.days.label":    { en: "Concept to shipped build", pt: "Do conceito à build publicada" },

  "projects.title":  { en: "Featured Projects", pt: "Projetos em Destaque" },
  "projects.sub": {
    en: "Each one opens into a full systems breakdown: loops, formulas, tables.",
    pt: "Cada um abre num raio-x completo de sistemas: loops, fórmulas, tabelas."
  },
  "projects.open":   { en: "Open case study", pt: "Abrir estudo de caso" },
  "projects.playBrowser": { en: "Play in browser", pt: "Jogar no navegador" },
  "projects.playItch":    { en: "Play on itch.io", pt: "Jogar na itch.io" },

  "about.title":     { en: "About", pt: "Sobre" },
  "about.lead": {
    en: "I'm a game designer who ships the systems he designs — the spreadsheet and the engine are the same job to me.",
    pt: "Sou um game designer que entrega os sistemas que projeta — a planilha e a engine são o mesmo trabalho pra mim."
  },
  "about.p1": {
    en: "At Prisma Game Lab I've worked as a game designer and coordinated project teams, shipping prototypes, running playtests and keeping design and implementation talking to each other. I'm finishing a Design degree at PUC-Rio.",
    pt: "No Prisma Game Lab atuei como game designer e coordenei equipes de projeto, entregando protótipos, rodando playtests e mantendo design e implementação conversando. Estou concluindo Design na PUC-Rio."
  },
  "about.p2": {
    en: "I'm a generalist by choice: I prototype in Unity and Godot, write gameplay code, make 2D art and 3D models, design UI, and I keep every system honest with attribute tables, progression curves and balancing sheets.",
    pt: "Sou generalista por escolha: prototipo em Unity e Godot, escrevo código de gameplay, faço arte 2D e modelos 3D, desenho UI, e mantenho cada sistema honesto com tabelas de atributos, curvas de progressão e planilhas de balanceamento."
  },
  "about.stamp1":    { en: "PUC-Rio · Design", pt: "PUC-Rio · Design" },
  "about.stamp2":    { en: "Prisma Game Lab", pt: "Prisma Game Lab" },
  "about.stamp3":    { en: "Design ⇄ Code", pt: "Design ⇄ Código" },

  "skills.title":    { en: "Toolbox", pt: "Ferramentas" },
  "skills.sub": {
    en: "What I actually use, grouped the way I work.",
    pt: "O que eu realmente uso, agrupado do jeito que eu trabalho."
  },

  "contact.title":   { en: "Let's make games", pt: "Bora fazer jogos" },
  "contact.lead": {
    en: "I design the system, build it, and tune it until it's fun. If that's a gap on your team, let's talk.",
    pt: "Eu projeto o sistema, construo e ajusto até ficar divertido. Se isso é uma lacuna no seu time, vamos conversar."
  },

  "case.close":      { en: "Close case study", pt: "Fechar estudo de caso" },
  "case.overview":   { en: "Overview", pt: "Visão Geral" },
  "case.role":       { en: "My Role", pt: "Meu Papel" },
  "case.challenge":  { en: "Design Challenge", pt: "Desafio de Design" },
  "case.coreLoop":   { en: "Core Loop", pt: "Core Loop" },
  "case.systems":    { en: "Main Systems", pt: "Sistemas Principais" },
  "case.progression":{ en: "Progression", pt: "Progressão" },
  "case.combat":     { en: "Damage & Combat", pt: "Dano e Combate" },
  "case.balancing":  { en: "Balancing", pt: "Balanceamento" },
  "case.implementation": { en: "Implementation & Prototyping", pt: "Implementação e Prototipagem" },
  "case.learnings":  { en: "Learnings", pt: "Aprendizados" },
  "case.responsibilities": { en: "What I Owned", pt: "Do Que Cuidei" },
  "case.gallery":    { en: "Gallery", pt: "Galeria" }
};

// Skills grid, grouped the way Lope works. Tool names are not translated.
export const skillGroups = [
  {
    title: { en: "Game Design", pt: "Game Design" },
    items: [
      { en: "System design", pt: "System design" },
      { en: "Gameplay design", pt: "Gameplay design" },
      { en: "Documentation", pt: "Documentação" },
      { en: "Prototyping", pt: "Prototipagem" },
      { en: "Gameplay iteration", pt: "Iteração de gameplay" },
      { en: "Progression", pt: "Progressão" },
      { en: "Balancing", pt: "Balanceamento" },
      { en: "Mechanics & loops", pt: "Mecânicas e loops" }
    ]
  },
  {
    title: { en: "Sheets & Balance", pt: "Planilhas e Balance" },
    items: [
      { en: "Google Sheets", pt: "Google Sheets" },
      { en: "Attribute tables", pt: "Tabelas de atributos" },
      { en: "Progression curves", pt: "Curvas de progressão" },
      { en: "Gameplay data organization", pt: "Organização de dados de gameplay" },
      { en: "Value tracking & tuning", pt: "Acompanhamento e ajuste de valores" }
    ]
  },
  {
    title: { en: "Game Development", pt: "Game Development" },
    items: [
      { en: "Unity", pt: "Unity" },
      { en: "Godot", pt: "Godot" },
      { en: "Programming logic", pt: "Lógica de programação" },
      { en: "Mechanics implementation", pt: "Implementação de mecânicas" },
      { en: "Systems integration", pt: "Integração de sistemas" }
    ]
  },
  {
    title: { en: "Art & Visual Production", pt: "Arte e Produção Visual" },
    items: [
      { en: "3D modeling", pt: "Modelagem 3D" },
      { en: "2D art", pt: "Arte 2D" },
      { en: "Concept / UI assets", pt: "Concept / assets de UI" },
      { en: "Photoshop", pt: "Photoshop" },
      { en: "Illustrator", pt: "Illustrator" },
      { en: "Blender", pt: "Blender" },
      { en: "Figma", pt: "Figma" }
    ]
  }
];
