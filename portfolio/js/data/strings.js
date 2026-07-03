// UI strings, EN/PT. Rendered onto elements carrying data-i18n="<key>".
export const strings = {
  "nav.skip":        { en: "Skip to projects", pt: "Pular para projetos" },
  "nav.projects":    { en: "Projects", pt: "Projetos" },
  "nav.about":       { en: "About", pt: "Sobre" },
  "nav.skills":      { en: "Toolbox", pt: "Ferramentas" },
  "nav.contact":     { en: "Contact", pt: "Contato" },

  "hero.role1":      { en: "Game Designer", pt: "Game Designer" },
  "hero.role2":      { en: "Systems Designer", pt: "Systems Designer" },
  "hero.role3":      { en: "Game Developer", pt: "Game Developer" },
  "hero.intro": {
    en: "I design game systems and then I build them — progression curves, damage formulas, balancing spreadsheets and playable prototypes in Unity & Godot.",
    pt: "Eu projeto sistemas de jogo e depois construo eles — curvas de progressão, fórmulas de dano, planilhas de balanceamento e protótipos jogáveis em Unity e Godot."
  },
  "hero.cta":        { en: "See the work ↓", pt: "Ver projetos ↓" },
  "hero.hint":       { en: "psst — the dog is watching your cursor", pt: "psiu — o cachorro está de olho no seu cursor" },

  "projects.title":  { en: "Featured Projects", pt: "Projetos em Destaque" },
  "projects.sub": {
    en: "Each one opens into a full systems breakdown — loops, formulas, tables.",
    pt: "Cada um abre num raio-x completo de sistemas — loops, fórmulas, tabelas."
  },
  "projects.open":   { en: "Open case study", pt: "Abrir estudo de caso" },

  "about.title":     { en: "About", pt: "Sobre" },
  "about.lead": {
    en: "I'm a game designer with a systems brain — happiest somewhere between a design doc, a spreadsheet and an engine.",
    pt: "Sou um game designer com cabeça de systems — mais feliz em algum ponto entre o design doc, a planilha e a engine."
  },
  "about.p1": {
    en: "Design student at PUC-Rio. At Prisma Game Lab I've worked both as a game designer and coordinating project teams — shipping prototypes, running playtests and keeping design and implementation talking to each other.",
    pt: "Estudante de Design na PUC-Rio. No Prisma Game Lab atuei como game designer e coordenando equipes de projeto — entregando protótipos, rodando playtests e mantendo design e implementação conversando."
  },
  "about.p2": {
    en: "I'm a generalist by choice: I prototype in Unity and Godot, write gameplay code, make 2D art and 3D models, design UI — and I keep every system honest with attribute tables, progression curves and balancing sheets.",
    pt: "Sou generalista por escolha: prototipo em Unity e Godot, escrevo código de gameplay, faço arte 2D e modelos 3D, desenho UI — e mantenho cada sistema honesto com tabelas de atributos, curvas de progressão e planilhas de balanceamento."
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
    en: "Looking for a designer who can also open the engine? Say hi.",
    pt: "Procurando um designer que também abre a engine? Chama."
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
