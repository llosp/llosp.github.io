// Project content, EN/PT. PLACEHOLDER DATA — swap freely.
// Every human-readable string is { en, pt }. Optional caseStudy fields
// (coreLoop, combat, balancing.table, …) are simply skipped when absent.
export const projects = [
  {
    id: "esqueleto-chico",
    accent: "#FF4F87",
    name: "Esqueleto Chico",
    type: { en: "Top-down action roguelike (PC)", pt: "Ação top-down roguelike (PC)" },
    role: { en: "Lead Game & Systems Designer", pt: "Game/Systems Designer Líder" },
    tools: ["Unity", "Google Sheets", "Photoshop", "Figma"],
    cover: "./assets/img/projects/esqueleto-chico-gameplay-2.webp",
    coverAlt: {
      en: "Boss fight against O Zelador — laser sweeps across the crypt",
      pt: "Luta contra O Zelador — lasers varrendo a cripta"
    },
    summary: {
      en: "A skeleton office-drone defends his boss's crypt from scheming minions. Built at Prisma Game Lab, I led the design and drove combat, progression and boss fights from one big balancing sheet — plus sound, UI and art.",
      pt: "Um esqueleto do mundo corporativo defende a cripta do chefe de lacaios conspiradores. Feito no Prisma Game Lab, liderei o design e conduzi combate, progressão e chefes a partir de uma grande planilha de balanceamento — além de som, UI e arte."
    },
    caseStudy: {
      heroVideo: {
        youtube: "Z_3GRWZEDSQ",
        title: { en: "Esqueleto Chico — trailer", pt: "Esqueleto Chico — trailer" }
      },
      heroImage: {
        src: "./assets/img/projects/esqueleto-chico-poster.webp",
        alt: { en: "Esqueleto Chico: Ossos do Ofício — key art poster", pt: "Esqueleto Chico: Ossos do Ofício — pôster/key art" }
      },
      overview: {
        en: "“Esqueleto Chico: Ossos do Ofício” is a top-down action game set in an oddly corporate crypt. You play Chico, a prodigy skeleton left in charge while the boss is away on a 'business trip' — which sparks envy among the other minions, who steal the boss's favorite mug to sabotage him. A Prisma Game Lab production.",
        pt: "“Esqueleto Chico: Ossos do Ofício” é um jogo de ação top-down numa cripta um tanto corporativa. Você joga como Chico, um esqueleto prodígio deixado no comando enquanto o chefe está numa 'viagem a trabalho' — o que desperta inveja nos outros lacaios, que roubam a caneca favorita do chefe para sabotá-lo. Uma produção do Prisma Game Lab."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "GDD & game loop", pt: "GDD & ciclo de jogo" },
            { en: "Level design & map", pt: "Level design & mapa" },
            { en: "Narrative", pt: "Narrativa" },
            { en: "Mechanics prototyping", pt: "Prototipação de mecânicas" },
            { en: "Systems & balancing", pt: "Sistemas & balanceamento" },
            { en: "Playtests", pt: "Playtests" }
          ]
        },
        {
          group: { en: "Sound", pt: "Som" },
          items: [
            { en: "All SFX", pt: "Todos os SFX" },
            { en: "Music curation", pt: "Curadoria de músicas" },
            { en: "Audio implementation", pt: "Implementação de áudio" }
          ]
        },
        {
          group: { en: "UI/UX", pt: "UI/UX" },
          items: [
            { en: "Menu wireframes & flows", pt: "Wireframes & fluxos de menu" },
            { en: "HUD & menu art", pt: "Arte de HUD & menus" },
            { en: "Type curation", pt: "Curadoria de tipografia" }
          ]
        },
        {
          group: { en: "Art", pt: "Arte" },
          items: [
            { en: "Concept art", pt: "Arte conceitual" },
            { en: "Scenario & menu assets", pt: "Assets de cenário & menu" },
            { en: "UI & cutscene animation", pt: "Animação de UI & cinemáticas" }
          ]
        }
      ],
      challenge: {
        en: "The player's power swings wildly across a run — a glass-cannon ATK build and a tanky HP build reach the same boss with very different stats. The design problem: make every boss feel fair and threatening for all of them, without hand-tuning each case.",
        pt: "O poder do player varia muito ao longo da run — uma build de ATK glass-cannon e uma build tanque de HP chegam ao mesmo chefe com stats bem diferentes. O problema de design: fazer cada chefe parecer justo e ameaçador para todas elas, sem ajustar cada caso na mão."
      },
      coreLoop: {
        steps: [
          { en: "Clear the room", pt: "Limpar a sala" },
          { en: "Pick 1 upgrade", pt: "Escolher 1 upgrade" },
          { en: "Beat the floor boss", pt: "Vencer o chefe do andar" },
          { en: "Descend", pt: "Descer" }
        ],
        note: {
          en: "You clear a run of rooms — each one grants an upgrade (ATK, fire rate or HP) — then face the floor boss, and only after beating it do you descend to the next floor. Every room cleared reshapes the build the balancing model has to keep honest.",
          pt: "Você limpa uma sequência de salas — cada uma dá um upgrade (ATK, cadência ou HP) — depois encara o chefe do andar, e só depois de vencê-lo você desce para o próximo andar. Cada sala limpa remodela a build que o modelo de balanceamento precisa manter honesta."
        }
      },
      systems: [
        {
          title: { en: "Room-based scaling", pt: "Escalonamento por sala" },
          body: {
            en: "Enemy and reward stats scale per room cleared (0–7), so difficulty tracks how deep you are, not just which floor.",
            pt: "Stats de inimigos e recompensas escalam por sala limpa (0–7), então a dificuldade acompanha o quão fundo você está, não só o andar."
          }
        },
        {
          title: { en: "Upgrade draft", pt: "Draft de upgrades" },
          body: {
            en: "Each room offers one stat upgrade — ATK, fire rate or HP. The three axes create distinct builds (glass cannon, dual-attack, tank) from the same pool.",
            pt: "Cada sala oferece um upgrade — ATK, cadência ou HP. Os três eixos criam builds distintas (glass cannon, duplo-ataque, tanque) a partir do mesmo pool."
          }
        },
        {
          title: { en: "Boss attack kit", pt: "Kit de ataques do chefe" },
          body: {
            en: "Bosses like O Zelador (the Janitor) rotate a laser sweep, a broom melee, thrown buckets and soap — each with its own damage band tuned to threaten without one-shotting.",
            pt: "Chefes como O Zelador giram entre varredura de laser, vassourada corpo-a-corpo, baldes arremessados e sabonete — cada um com sua faixa de dano ajustada para ameaçar sem matar de um golpe."
          }
        }
      ],
      progression: {
        en: "Three floors, each a room gauntlet into a boss. Boss HP-base scales roughly 4,250 → 6,380 → 11,060 and fight length 30 → 45 → 78 seconds, so later bosses are endurance checks against a fully-upgraded Chico.",
        pt: "Três andares, cada um um corredor de salas até um chefe. O HP-base dos chefes escala ~4.250 → 6.380 → 11.060 e o tempo de luta 30 → 45 → 78 segundos, então chefes finais viram testes de resistência contra um Chico totalmente evoluído."
      },
      combat: {
        formula: {
          en: "DMG_boss(attack) = ideal_HP ÷ hits_target",
          pt: "DMG_boss(ataque) = HP_ideal ÷ hits_alvo"
        },
        body: {
          en: "Instead of hand-picking boss damage, I derived each attack from the player's *expected* HP divided by how many hits of that attack should kill — so the laser might threaten a 5-hit kill and the broom a 3-hit kill, staying fair for every build. Numbers stay honest because they trace back to the player, not to a designer's gut.",
          pt: "Em vez de escolher o dano do chefe na mão, derivei cada ataque do HP *esperado* do player dividido por quantos golpes daquele ataque deveriam matar — então o laser ameaça matar em 5 hits e a vassourada em 3, ficando justo para qualquer build. Os números continuam honestos porque remetem ao player, não ao 'feeling' do designer."
        }
      },
      balancing: {
        formula: {
          en: "HP_boss = base_HP × log₂.₃(rooms_cleared)",
          pt: "HP_boss = HP_base × log₂,₃(salas_limpas)"
        },
        body: {
          en: "The whole game lived in one balancing spreadsheet — player base stats, per-room scaling, enemy and boss tables, and DPS curves for the extreme builds. My favourite piece is the boss HP: it doesn't scale with the floor, it scales with how many rooms you actually cleared, on a logarithm (base 2.3). Clear more rooms and you arrive stronger, so the boss grows to match — but logarithmically, so a full clear makes it tougher without ever becoming an impossible wall.",
          pt: "O jogo inteiro vivia numa única planilha de balanceamento — stats base do player, escalonamento por sala, tabelas de inimigos e chefes, e curvas de DPS das builds extremas. A minha parte favorita é o HP do chefe: ele não escala com o andar, escala com quantas salas você realmente limpou, num logaritmo (base 2,3). Limpar mais salas te deixa mais forte, então o chefe cresce junto — mas logaritmicamente, ficando mais difícil sem nunca virar uma parede impossível."
        },
        tables: [
          {
            caption: { en: "Boss HP — logarithmic scaling by rooms cleared", pt: "HP do chefe — escala logarítmica por salas limpas" },
            headers: [
              { en: "Rooms cleared", pt: "Salas limpas" },
              { en: "Boss HP", pt: "HP do chefe" },
              { en: "× mult", pt: "× mult" }
            ],
            rows: [
              [{ en: "0–3", pt: "0–3" }, "4,252", "×1.00"],
              ["4", "7,078", "×1.66"],
              ["5", "8,217", "×1.93"],
              ["6", "9,148", "×2.15"],
              ["7", "9,935", "×2.34"]
            ]
          },
          {
            caption: { en: "Enemy stats (base)", pt: "Stats de inimigos (base)" },
            headers: [
              { en: "Enemy", pt: "Inimigo" },
              { en: "HP", pt: "HP" },
              { en: "Atk dmg", pt: "Dano atq" },
              { en: "Contact", pt: "Contato" }
            ],
            rows: [
              [{ en: "Warrior", pt: "Guerreiro" }, "175", "33.3", "—"],
              [{ en: "Mage", pt: "Mago" }, "100", "20", "10"],
              [{ en: "Intern", pt: "Estagiário" }, "100", "—", "10"]
            ]
          },
          {
            caption: { en: "Boss attack damage (room 0 → 7)", pt: "Dano dos ataques do chefe (sala 0 → 7)" },
            headers: [
              { en: "Attack", pt: "Ataque" },
              { en: "Room 0", pt: "Sala 0" },
              { en: "Room 7", pt: "Sala 7" }
            ],
            rows: [
              [{ en: "Laser", pt: "Laser" }, "26.5", "29.7"],
              [{ en: "Broom (melee)", pt: "Vassourada (melee)" }, "44.2", "61.8"],
              [{ en: "Bucket", pt: "Balde" }, "26.5", "37.1"],
              [{ en: "Soap", pt: "Sabonete" }, "22.1", "30.9"]
            ]
          }
        ]
      },
      implementation: {
        en: "The sheet was the source of truth; values flowed into Unity and got hammered in weekly playtests. Because damage came from the player's expected survivability, rebalancing a whole floor was often a one-cell change.",
        pt: "A planilha era a fonte da verdade; os valores iam para a Unity e apanhavam nos playtests semanais. Como o dano vinha da sobrevivência esperada do player, rebalancear um andar inteiro era muitas vezes mudar uma célula."
      },
      gallery: [
        {
          src: "./assets/img/projects/esqueleto-chico-gameplay-1.webp",
          alt: { en: "Chico scything through minions in a tiled crypt room", pt: "Chico ceifando lacaios numa sala de cripta" }
        },
        {
          src: "./assets/img/projects/esqueleto-chico-gameplay-3.webp",
          alt: { en: "An upgrade shrine offering 'Vinícius: Health +45'", pt: "Um altar de upgrade oferecendo 'Vinícius: Vida +45'" }
        }
      ],
      learnings: {
        en: "Deriving enemy and boss damage from the player's expected survivability — not from vibes — kept difficulty honest across builds that looked nothing alike. Owning design, sound, UI and art at once taught me to make each discipline serve the same core loop.",
        pt: "Derivar o dano de inimigos e chefes da sobrevivência esperada do player — e não do 'feeling' — manteve a dificuldade honesta entre builds completamente diferentes. Cuidar de design, som, UI e arte ao mesmo tempo me ensinou a fazer cada disciplina servir ao mesmo core loop."
      },
      links: [
        { label: { en: "Play on itch.io", pt: "Jogar na itch.io" }, url: "https://prismagamelab.itch.io/esqueleto-chico-ossos-do-oficio", kind: "play" }
      ]
    }
  },
  {
    id: "maguitos",
    accent: "#FF4F87",
    name: "PROJETO MAGUITOS",
    type: { en: "Turn-based party RPG (PC)", pt: "RPG de party por turnos (PC)" },
    role: { en: "Game & Systems Designer / Gameplay Programmer", pt: "Game/Systems Designer e Gameplay Programmer" },
    tools: ["Godot", "GDScript"],
    cover: "./assets/img/projects/maguitos-gameplay-1.webp",
    coverAlt: {
      en: "The party facing four Stray Humpty enemies before a mossy shrine",
      pt: "A party enfrentando quatro Stray Humpty diante de um santuário musgoso"
    },
    summary: {
      en: "A turn-based party RPG built by two people — a friend made the art and interface, I designed and coded everything else. The whole party shares a single MP pool, and each turn you plan every character's move before watching them all resolve at once. Still in active development.",
      pt: "Um RPG de party por turnos feito por duas pessoas — um amigo cuidou da arte e da interface, e eu projetei e programei todo o resto. A party inteira divide um único reservatório de MP, e a cada turno você planeja o movimento de cada personagem antes de ver todos resolverem de uma vez. Ainda em desenvolvimento ativo."
    },
    caseStudy: {
      overview: {
        en: "PROJETO MAGUITOS is a turn-based party RPG currently in active development. You command a party of three — Isara, Celetro and Erika — through battles fought on a 3D map with single-target, AoE and party-wide skills. It's a two-person project: a friend handles art and interface while I own the design and the entire GDScript codebase.",
        pt: "PROJETO MAGUITOS é um RPG de party por turnos atualmente em desenvolvimento ativo. Você comanda uma party de três — Isara, Celetro e Erika — em batalhas num mapa 3D com skills de alvo único, em área e para a party toda. É um projeto de duas pessoas: um amigo cuida da arte e da interface enquanto eu conduzo o design e todo o código em GDScript."
      },
      role: {
        en: "Solo on design and code. I built the battle system in GDScript — a state machine that plans then resolves each turn, a skill executor, and data-driven characters, enemies and skills — plus the shared-MP economy and the tag-affinity model. Art and UI were made by a collaborator.",
        pt: "Sozinho no design e no código. Construí o sistema de batalha em GDScript — uma máquina de estados que planeja e depois resolve cada turno, um executor de skills, e personagens, inimigos e skills orientados a dados — além da economia de MP compartilhado e do modelo de afinidade por tags. Arte e UI ficaram com um colaborador."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "Combat systems", pt: "Sistemas de combate" },
            { en: "Skill & class design", pt: "Design de skills & classes" },
            { en: "Balancing (stats & costs)", pt: "Balanceamento (stats & custos)" },
            { en: "Tag-affinity model", pt: "Modelo de afinidade por tags" },
            { en: "Turn structure", pt: "Estrutura de turno" }
          ]
        },
        {
          group: { en: "Programming", pt: "Programação" },
          items: [
            { en: "Battle state machine", pt: "Máquina de estados da batalha" },
            { en: "Skill executor & effects", pt: "Executor de skills & efeitos" },
            { en: "Data-driven resources", pt: "Recursos orientados a dados" },
            { en: "Shared-MP economy", pt: "Economia de MP compartilhado" },
            { en: "Battle UI logic", pt: "Lógica da UI de batalha" }
          ]
        }
      ],
      challenge: {
        en: "Most party RPGs give each character their own resource bar. Maguitos pools all of it: every character draws from one shared MP bar, and you commit all their actions before any of them resolve. The design problem was making that scarcity legible — so players feel the trade-off of spending Erika's revive now against Celetro's big hit later, all in the same turn.",
        pt: "A maioria dos RPGs de party dá a cada personagem sua própria barra de recurso. Maguitos junta tudo: cada personagem consome de uma única barra de MP compartilhada, e você confirma todas as ações antes de qualquer uma resolver. O problema de design era tornar essa escassez legível — fazer o player sentir o trade-off de gastar o revive da Erika agora contra o golpe pesado do Celetro depois, tudo no mesmo turno."
      },
      coreLoop: {
        steps: [
          { en: "Plan each character's skill", pt: "Planejar a skill de cada personagem" },
          { en: "Confirm the turn", pt: "Confirmar o turno" },
          { en: "Watch every action resolve", pt: "Ver cada ação resolver" },
          { en: "Enemies retaliate", pt: "Inimigos revidam" }
        ],
        note: {
          en: "During planning, a live MP preview subtracts each queued skill from the shared pool, so you can see whether the whole plan is affordable before committing. Only when every living character has an action can you confirm.",
          pt: "Durante o planejamento, um preview de MP ao vivo subtrai cada skill enfileirada do reservatório compartilhado, então você vê se o plano inteiro cabe antes de confirmar. Só quando cada personagem vivo tem uma ação é que você pode confirmar."
        }
      },
      systems: [
        {
          title: { en: "Shared party MP pool", pt: "Pool de MP compartilhado" },
          body: {
            en: "The party's max MP is the sum of every member's pool, and all skills spend from that single bar. Isara's high MP and regen effectively fund the whole team, turning 'who casts' into a party-wide budgeting question.",
            pt: "O MP máximo da party é a soma do pool de cada membro, e todas as skills gastam dessa única barra. O MP alto e o regen da Isara basicamente financiam o time inteiro, transformando 'quem conjura' numa questão de orçamento da party."
          }
        },
        {
          title: { en: "Plan-and-resolve turns", pt: "Turnos planejar-e-resolver" },
          body: {
            en: "Each turn you assign a skill to every living character, then confirm; all actions execute in order before the enemies take theirs. Planning and consequence are separated, so a turn is a small committed plan rather than a reaction.",
            pt: "A cada turno você atribui uma skill a cada personagem vivo e confirma; todas as ações executam em ordem antes de os inimigos agirem. Planejamento e consequência ficam separados, então um turno é um pequeno plano assumido, não uma reação."
          }
        },
        {
          title: { en: "Tag affinity", pt: "Afinidade por tags" },
          body: {
            en: "Enemies carry tags (size, flying, tough, frail…) and skills carry tag modifiers that shift power, hit chance or crit against them — so Zabaan punishes 'tough' targets and Gravarggo is tuned around 'flying'. Matchups, not raw numbers, decide the best skill.",
            pt: "Inimigos carregam tags (size, flying, tough, frail…) e skills carregam modificadores de tag que alteram poder, chance de acerto ou crítico contra elas — então Zabaan pune alvos 'tough' e Gravarggo é ajustada em torno de 'flying'. Os confrontos, não os números crus, decidem a melhor skill."
          }
        },
        {
          title: { en: "Stat-driven role identity", pt: "Identidade de papel por stats" },
          body: {
            en: "The same eight stats produce distinct roles from data alone: Celetro's WIT 35 makes him the damage core, Erika's EMPATHY 25 and DEF 25 make her the healer-tank, and Isara's MP 50 / regen 25 make her the party's battery.",
            pt: "Os mesmos oito atributos produzem papéis distintos só a partir dos dados: a WIT 35 do Celetro faz dele o núcleo de dano, a EMPATHY 25 e a DEF 25 da Erika fazem dela a healer-tank, e o MP 50 / regen 25 da Isara fazem dela a bateria da party."
          }
        }
      ],
      combat: {
        formula: {
          en: "DMG = (WIT − DEF ÷ 2) × power",
          pt: "DANO = (WIT − DEF ÷ 2) × poder"
        },
        body: {
          en: "Damage scales off the user's WIT against half the target's DEF, then multiplies by a random power band unique to each skill (Baltro rolls 0.70–0.85, Gravarggo 0.45–0.65). Hit chance is the skill's accuracy minus the target's EVADE; crit chance is simply the user's FOCUS. Heals use the same shape off EMPATHY instead of WIT, and tag modifiers bend power, hit or crit per enemy tag.",
          pt: "O dano escala pela WIT do usuário contra metade da DEF do alvo, depois multiplica por uma faixa de poder aleatória, única de cada skill (Baltro sorteia 0,70–0,85; Gravarggo 0,45–0,65). A chance de acerto é a precisão da skill menos a EVADE do alvo; a chance de crítico é simplesmente a FOCUS do usuário. Curas usam a mesma forma a partir da EMPATHY em vez da WIT, e os modificadores de tag dobram poder, acerto ou crítico conforme a tag do inimigo."
        }
      },
      balancing: {
        body: {
          en: "There was no separate spreadsheet — the balancing data lives directly in Godot Resource files (.tres). Characters, enemies and skills are all data, so tuning a stat or a skill cost is editing a resource in the inspector, never touching code. These are the prototype's shipped values.",
          pt: "Não havia planilha separada — os dados de balanceamento vivem direto em arquivos de Resource do Godot (.tres). Personagens, inimigos e skills são todos dados, então ajustar um atributo ou o custo de uma skill é editar um resource no inspetor, sem nunca tocar no código. Estes são os valores do protótipo."
        },
        tables: [
          {
            caption: { en: "Party base stats", pt: "Stats base da party" },
            headers: [
              { en: "Character", pt: "Personagem" },
              { en: "HP", pt: "HP" },
              { en: "MP", pt: "MP" },
              { en: "WIT", pt: "WIT" },
              { en: "EMPATHY", pt: "EMPATHY" },
              { en: "DEF", pt: "DEF" }
            ],
            rows: [
              ["Isara", "40", "50", "15", "15", "10"],
              ["Celetro", "50", "30", "35", "10", "20"],
              ["Erika", "35", "35", "15", "25", "25"]
            ]
          },
          {
            caption: { en: "Skill economy (flat MP from the shared pool)", pt: "Economia de skills (MP fixo do reservatório compartilhado)" },
            headers: [
              { en: "Skill", pt: "Skill" },
              { en: "Cost (MP)", pt: "Custo (MP)" },
              { en: "Power", pt: "Poder" },
              { en: "Target", pt: "Alvo" }
            ],
            rows: [
              ["Baltro", "10", "0.70–0.85", { en: "Single enemy", pt: "Inimigo único" }],
              ["Zabaan", "25", "0.65–0.80", { en: "AoE", pt: "Em área" }],
              ["Gravarggo", "40", "0.45–0.65", { en: "All enemies", pt: "Todos os inimigos" }],
              ["Ravolli", "25", "0.40–0.50", { en: "Heal all party", pt: "Cura toda a party" }],
              ["Zelligo", "30", "0.30", { en: "Revive ally", pt: "Revive aliado" }]
            ]
          }
        ]
      },
      implementation: {
        en: "Built in Godot 4.6. The battle runs on an explicit state machine — plan, resolve, enemy turn — and every skill is a Resource subclass (damage, heal, buff, revive, over-time) sharing one execute() interface. Adding a new skill or enemy is a new .tres file plus a script, so content never requires touching the core loop.",
        pt: "Feito em Godot 4.6. A batalha roda numa máquina de estados explícita — planejar, resolver, turno inimigo — e cada skill é uma subclasse de Resource (dano, cura, buff, revive, over-time) compartilhando uma única interface execute(). Adicionar uma skill ou inimigo novo é um arquivo .tres mais um script, então conteúdo nunca exige mexer no loop central."
      },
      learnings: {
        en: "Turning MP into a shared resource changed the whole feel of a turn — individual choices became a party budget, and that's the idea I'd build the rest of the game around. Committing to a data-driven resource pipeline early is what let two people move fast: my collaborator could drop in art while I added skills as pure data.",
        pt: "Transformar o MP num recurso compartilhado mudou toda a sensação de um turno — escolhas individuais viraram um orçamento de party, e é essa ideia que eu usaria como base para o resto do jogo. Apostar cedo num pipeline orientado a dados foi o que deixou duas pessoas andarem rápido: meu colaborador colocava arte enquanto eu adicionava skills como dados puros."
      },
      gallery: [
        {
          src: "./assets/img/projects/maguitos-gameplay-1.webp",
          alt: { en: "The party facing four Stray Humpty enemies before a mossy shrine", pt: "A party enfrentando quatro Stray Humpty diante de um santuário musgoso" }
        },
        {
          src: "./assets/img/projects/maguitos-gameplay-2.webp",
          alt: { en: "Battle log showing a flurry of damage dealt to a Stray Humpty", pt: "Log de batalha mostrando uma sequência de dano causado a um Stray Humpty" }
        },
        {
          src: "./assets/img/projects/maguitos-gameplay-3.webp",
          alt: { en: "Isara casting a skill on the last remaining Stray Humpty", pt: "Isara conjurando uma skill no último Stray Humpty restante" }
        }
      ]
    }
  },
  {
    id: "clicachorro",
    accent: "#F5F1E8",
    name: "ClicaChorro",
    type: { en: "Idle/clicker game (web)", pt: "Idle/clicker (web)" },
    role: { en: "Solo Developer & Systems Designer", pt: "Desenvolvedor Solo & Systems Designer" },
    tools: ["JavaScript", "HTML/CSS", "Google Sheets"],
    cover: "./assets/img/projects/clicachorro-gameplay-complete.webp",
    coverAlt: {
      en: "A fully decorated room — band poster, boombox, car and a sleepy plush toy beside the dog",
      pt: "Um quarto totalmente decorado — pôster de banda, boombox, carro e uma pelúcia sonolenta ao lado do cachorro"
    },
    summary: {
      en: "A cozy idle-clicker where the goal is to fully furnish the room where your dog lives — click to earn affection, spend it on furniture and upgrades, one piece at a time. A solo web project whose entire economy is derived from a single number — how long the run should take — through one closed-form balancing spreadsheet.",
      pt: "Um idle-clicker aconchegante onde o objetivo é completar o quarto onde seu cachorro mora — clique para ganhar carinho e gaste em móveis e upgrades, peça por peça. Um projeto solo pra web cuja economia inteira é derivada de um único número — quanto tempo a run deve durar — a partir de uma única planilha de balanceamento de forma fechada."
    },
    caseStudy: {
      heroImage: {
        src: "./assets/img/projects/clicachorro-gameplay-complete.webp",
        alt: { en: "A fully decorated room — band poster, boombox, car and a sleepy plush toy beside the dog", pt: "Um quarto totalmente decorado — pôster de banda, boombox, carro e uma pelúcia sonolenta ao lado do cachorro" }
      },
      overview: {
        en: "ClicaChorro is a cozy idle-clicker for the browser. You click to shower a dog with affection; that affection buys helpers and upgrades that idle-earn for you, and each purchase unlocks another piece of furniture for the room the dog lives in — from an empty room all the way to a fully decorated one. A solo project, built to test one idea: that a clicker's whole economy can be derived from how long you want the run to last.",
        pt: "ClicaChorro é um idle-clicker aconchegante pro navegador. Você clica pra encher um cachorro de carinho; esse carinho compra ajudantes e upgrades que rendem sozinhos, e cada compra libera mais uma peça de mobília para o quarto onde o cachorro mora — de um quarto vazio até um totalmente decorado. Um projeto solo, feito pra testar uma ideia: que a economia inteira de um clicker pode ser derivada de quanto tempo você quer que a run dure."
      },
      role: {
        en: "Solo — I designed the game, wrote the JavaScript, drew the art and made the sound. The part I'm proudest of is the balancing model: a closed-form spreadsheet where the target time-to-beat drives every cost and output value in the economy.",
        pt: "Solo — projetei o jogo, escrevi o JavaScript, fiz a arte e o som. A parte de que mais me orgulho é o modelo de balanceamento: uma planilha de forma fechada onde o tempo-alvo para zerar comanda cada valor de custo e produção da economia."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "Economy & systems", pt: "Economia & sistemas" },
            { en: "Progression design", pt: "Design de progressão" },
            { en: "Balancing spreadsheet", pt: "Planilha de balanceamento" },
            { en: "Playtests", pt: "Playtests" }
          ]
        },
        {
          group: { en: "Code", pt: "Código" },
          items: [
            { en: "Vanilla JavaScript", pt: "JavaScript puro" },
            { en: "Data-driven economy", pt: "Economia data-driven" },
            { en: "Save system", pt: "Sistema de save" }
          ]
        },
        {
          group: { en: "Art", pt: "Arte" },
          items: [
            { en: "Dog & scene art", pt: "Arte do cachorro & cena" },
            { en: "UI & icons", pt: "UI & ícones" }
          ]
        },
        {
          group: { en: "Sound", pt: "Som" },
          items: [
            { en: "Click & UI SFX", pt: "SFX de clique & UI" },
            { en: "Music curation", pt: "Curadoria de músicas" }
          ]
        }
      ],
      challenge: {
        en: "The failure mode of a clicker is length: ship it too generous and it's over in five minutes; too greedy and it drags for hours. I didn't want to hand-tune forty costs chasing a feel. The design goal: make session length an explicit input and have the entire economy obey it.",
        pt: "O modo de falha de um clicker é a duração: generoso demais e acaba em cinco minutos; ganancioso demais e arrasta por horas. Eu não queria ajustar quarenta custos na mão atrás de um feeling. O objetivo de design: transformar a duração da sessão num input explícito e fazer a economia inteira obedecer a ele."
      },
      coreLoop: {
        steps: [
          { en: "Click the dog", pt: "Clicar no cachorro" },
          { en: "Earn affection", pt: "Ganhar carinho" },
          { en: "Buy a helper / upgrade", pt: "Comprar ajudante / upgrade" },
          { en: "Unlock a piece of furniture", pt: "Desbloquear um móvel" }
        ],
        note: {
          en: "Clicking earns affection; affection buys helpers and upgrades that idle-earn for you; enough of it unlocks the next piece of furniture for the room. Every piece costs more affection than the last, so the loop keeps pulling forward — toward the twelfth and final piece that completes the room and ends the game.",
          pt: "Clicar rende carinho; carinho compra ajudantes e upgrades que rendem sozinhos; carinho suficiente libera a próxima peça de mobília do quarto. Cada peça custa mais carinho que a anterior, então o loop segue puxando pra frente — até a décima segunda e última peça que completa o quarto e encerra o jogo."
        }
      },
      systems: [
        {
          title: { en: "Time-driven economy", pt: "Economia guiada pelo tempo" },
          body: {
            en: "The whole cost/output curve is solved from one number — how long the run should take. Change the target and every stage rebalances automatically.",
            pt: "A curva inteira de custo/produção é resolvida a partir de um número — quanto tempo a run deve durar. Muda o alvo e todo estágio se rebalanceia automaticamente."
          }
        },
        {
          title: { en: "Geometric curve", pt: "Curva geométrica" },
          body: {
            en: "Costs grow by a factor a and idle output by a factor b each stage. Because a > b, the run gently stretches toward the end instead of flatlining — but on a fixed, provable total.",
            pt: "Custos crescem por um fator a e a produção por um fator b a cada estágio. Como a > b, a run se estica suavemente rumo ao fim em vez de estagnar — mas sobre um total fixo e demonstrável."
          }
        },
        {
          title: { en: "Room-completion progression", pt: "Progressão por complementação do quarto" },
          body: {
            en: "Twelve unlockable furniture pieces give the number-go-up a narrative spine — you're not just buying multipliers, you're filling an empty room until it's completely furnished.",
            pt: "Doze peças de mobília desbloqueáveis dão à escalada de números uma espinha narrativa — você não está só comprando multiplicadores, está enchendo um quarto vazio até ele ficar completamente decorado."
          }
        }
      ],
      progression: {
        en: "Twelve furniture unlocks take the room from empty to fully decorated. Because the cost/output ratio r = a/b is greater than 1, each piece costs a little more time than the last — about 2.1 minutes at the start, climbing to 6.1 minutes for the finale — so the run swells toward a climax instead of flatlining. Costs run 618 → 108,780 affection; idle output 5 → 298/s.",
        pt: "Doze móveis desbloqueáveis levam o quarto de vazio a totalmente decorado. Como a razão custo/produção r = a/b é maior que 1, cada peça custa um pouco mais de tempo que a anterior — cerca de 2,1 minutos no início, subindo a 6,1 minutos no final — então a run cresce rumo a um clímax em vez de estagnar. Custos vão de 618 → 108.780 de carinho; produção passiva de 5 → 298/s."
      },
      balancing: {
        formula: {
          en: "C0 = target_time × P0 × (r − 1) ÷ (rᴺ − 1),   r = a ÷ b",
          pt: "C0 = tempo_alvo × P0 × (r − 1) ÷ (rᴺ − 1),   r = a ÷ b"
        },
        body: {
          en: "The signature: instead of picking costs by feel, I set a target time-to-beat and inverted the geometric sum that describes a clicker economy. The time spent on each stage is t_i = (C0 ÷ P0) × rⁱ, and summing those is a geometric series — so I solved it backwards for the base cost C0. That makes the target time command the whole curve. One spreadsheet, one input cell: retuning a 45-minute game into a 90-minute one is a single edit, and the per-stage times always sum back exactly to the target.",
          pt: "A assinatura: em vez de escolher custos no feeling, defini um tempo-alvo para zerar e inverti a soma geométrica que descreve a economia de um clicker. O tempo gasto em cada estágio é t_i = (C0 ÷ P0) × rⁱ, e somar isso é uma série geométrica — então resolvi ao contrário para o custo base C0. Isso faz o tempo-alvo comandar a curva inteira. Uma planilha, uma célula de input: retunar um jogo de 45 minutos para 90 é uma única edição, e os tempos por estágio sempre somam exatamente o alvo."
        },
        tables: [
          {
            caption: { en: "Time-driven inputs → derived base cost", pt: "Inputs guiados pelo tempo → custo base derivado" },
            headers: [
              { en: "Input", pt: "Input" },
              { en: "Value", pt: "Valor" }
            ],
            rows: [
              [{ en: "Target time to beat", pt: "Tempo-alvo para zerar" }, { en: "45 min", pt: "45 min" }],
              [{ en: "Stages (N)", pt: "Estágios (N)" }, "12"],
              [{ en: "Cost growth (a)", pt: "Crescimento de custo (a)" }, "1.60"],
              [{ en: "Output growth (b)", pt: "Crescimento de produção (b)" }, "1.45"],
              [{ en: "Base output (P0)", pt: "Produção base (P0)" }, { en: "5 /s", pt: "5 /s" }],
              [{ en: "→ Derived base cost (C0)", pt: "→ Custo base derivado (C0)" }, "618"]
            ]
          },
          {
            caption: { en: "Curve by furniture piece (excerpt)", pt: "Curva por móvel desbloqueado (trecho)" },
            headers: [
              { en: "Piece", pt: "Peça" },
              { en: "Cost (affection)", pt: "Custo (carinho)" },
              { en: "Output /s", pt: "Produção /s" },
              { en: "Piece time (min)", pt: "Tempo da peça (min)" },
              { en: "Cumulative (min)", pt: "Acumulado (min)" }
            ],
            rows: [
              [{ en: "1 · First piece", pt: "1 · Primeira peça" }, "618", "5.0", "2.06", "2.06"],
              [{ en: "4 · Cozy corner", pt: "4 · Cantinho aconchegante" }, "2,533", "15.2", "2.77", "9.61"],
              [{ en: "8 · Nearly there", pt: "8 · Quase completo" }, "16,598", "67.4", "4.11", "23.87"],
              [{ en: "12 · Fully furnished", pt: "12 · Totalmente mobiliado" }, "108,780", "297.9", "6.09", "45.00"]
            ]
          }
        ]
      },
      implementation: {
        en: "The sheet is the source of truth; the web build reads the solved curve as data, so the JavaScript never hardcodes a cost. Because the economy is derived, playtest notes like 'the mid-game sags' became a tweak to one growth ratio rather than a manual pass over every stage.",
        pt: "A planilha é a fonte da verdade; o build web lê a curva resolvida como dados, então o JavaScript nunca cravou um custo na mão. Como a economia é derivada, notas de playtest como 'o meio-jogo cai' viravam um ajuste em uma razão de crescimento, não uma passada manual por cada estágio."
      },
      learnings: {
        en: "Deriving the economy from the target session length — not from vibes — turned balancing from guesswork into a solved equation. Building solo across design, code, art and sound taught me to let one system (the sheet) keep the others honest.",
        pt: "Derivar a economia da duração-alvo da sessão — e não do 'feeling' — transformou o balanceamento de chute em equação resolvida. Fazer tudo sozinho entre design, código, arte e som me ensinou a deixar um sistema (a planilha) manter os outros honestos."
      },
      links: [
        { label: { en: "Play ClicaChorro", pt: "Jogar ClicaChorro" }, url: "https://lope.design", kind: "play" }
      ],
      gallery: [
        {
          src: "./assets/img/projects/clicachorro-gameplay-complete.webp",
          alt: { en: "A fully decorated room — band poster, boombox, car and a sleepy plush toy beside the dog", pt: "Um quarto totalmente decorado — pôster de banda, boombox, carro e uma pelúcia sonolenta ao lado do cachorro" }
        },
        {
          src: "./assets/img/projects/clicachorro-gameplay-start.webp",
          alt: { en: "A freshly started run — just the dog against an empty room", pt: "Uma run recém-iniciada — só o cachorro num quarto vazio" }
        },
        {
          src: "./assets/img/projects/clicachorro-gameplay-furniture.webp",
          alt: { en: "Mid-run room with a few furniture unlocks — a blank poster frame, a cabinet and a plant", pt: "Quarto no meio da run com alguns móveis desbloqueados — um quadro em branco, um armário e uma planta" }
        },
        {
          src: "./assets/img/projects/clicachorro-gameplay-shop.webp",
          alt: { en: "The upgrade shop open, showing click-power purchases", pt: "A loja de upgrades aberta, mostrando compras de poder de clique" }
        }
      ]
    }
  }
];
