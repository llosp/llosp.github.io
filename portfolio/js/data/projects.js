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
        { label: { en: "Play on itch.io", pt: "Jogar na itch.io" }, url: "https://prismagamelab.itch.io/esqueleto-chico-ossos-do-oficio", kind: "play" },
        { label: { en: "Watch trailer", pt: "Ver trailer" }, url: "https://www.youtube.com/watch?v=Z_3GRWZEDSQ", kind: "video" }
      ]
    }
  },
  {
    id: "maguitos",
    accent: "#FF4F87",
    name: "Maguitos",
    type: { en: "Turn-based party RPG (PC)", pt: "RPG de party por turnos (PC)" },
    role: { en: "Game & Systems Designer / Gameplay Programmer", pt: "Game/Systems Designer e Gameplay Programmer" },
    tools: ["Godot", "GDScript"],
    cover: "./assets/img/projects/maguitos.svg",
    coverAlt: {
      en: "Maguitos — placeholder key art",
      pt: "Maguitos — arte placeholder"
    },
    summary: {
      en: "A turn-based party RPG built by two people — a friend made the art and interface, I designed and coded everything else. The whole party shares a single MP pool, and each turn you plan every character's move before watching them all resolve at once.",
      pt: "Um RPG de party por turnos feito por duas pessoas — um amigo cuidou da arte e da interface, e eu projetei e programei todo o resto. A party inteira divide um único reservatório de MP, e a cada turno você planeja o movimento de cada personagem antes de ver todos resolverem de uma vez."
    },
    caseStudy: {
      overview: {
        en: "Maguitos is a turn-based party RPG prototype. You command a party of three — Isara, Celetro and Erika — through battles fought on a 3D map with single-target, AoE and party-wide skills. It was a two-person project: a friend handled art and interface while I owned the design and the entire GDScript codebase. Development is currently paused.",
        pt: "Maguitos é um protótipo de RPG de party por turnos. Você comanda uma party de três — Isara, Celetro e Erika — em batalhas num mapa 3D com skills de alvo único, em área e para a party toda. Foi um projeto de duas pessoas: um amigo cuidou da arte e da interface enquanto eu conduzia o design e todo o código em GDScript. O desenvolvimento está pausado no momento."
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
      }
    }
  },
  {
    id: "rustbound",
    accent: "#FFC400",
    name: "Rustbound",
    type: { en: "2D action-platformer (PC)", pt: "Action-platformer 2D (PC)" },
    role: { en: "Game Designer & Gameplay Programmer", pt: "Game Designer e Gameplay Programmer" },
    tools: ["Godot", "GDScript", "Google Sheets", "Photoshop"],
    cover: "./assets/img/projects/rustbound.svg",
    coverAlt: { en: "Rustbound key art", pt: "Arte principal de Rustbound" },
    summary: {
      en: "A rusty robot that trades parts for power. I designed and coded the combat: damage model, hitstop, part-swap progression — all data-driven from a single stats sheet.",
      pt: "Um robô enferrujado que troca peças por poder. Projetei e programei o combate: modelo de dano, hitstop, progressão de troca de peças — tudo data-driven a partir de uma única planilha de stats."
    },
    caseStudy: {
      overview: {
        en: "Rustbound is a tight action-platformer prototype: a scavenger robot bolts scavenged parts onto itself, and every part changes both a stat and a verb (double jump arm, shield-bash torso).",
        pt: "Rustbound é um protótipo de action-platformer: um robô catador parafusa peças recolhidas em si mesmo, e cada peça muda um atributo e um verbo (braço de pulo duplo, torso de investida com escudo)."
      },
      role: {
        en: "Solo on combat design and code. I wrote the damage pipeline in GDScript, designed enemy archetypes, and kept every number in an external sheet the artists could also read.",
        pt: "Sozinho no design e no código do combate. Escrevi o pipeline de dano em GDScript, projetei os arquétipos de inimigos e mantive todos os números numa planilha externa que os artistas também conseguiam ler."
      },
      challenge: {
        en: "Parts had to feel like meaningful trade-offs, not stat sticks. Rule: every part buffs one number AND nerfs another, and swaps happen mid-level at repair benches — build questions become level-design questions.",
        pt: "As peças precisavam parecer trocas significativas, não bastões de status. Regra: toda peça melhora um número E piora outro, e as trocas acontecem no meio da fase em bancadas de reparo — decisões de build viram decisões de level design."
      },
      coreLoop: {
        steps: [
          { en: "Explore", pt: "Explorar" },
          { en: "Fight", pt: "Lutar" },
          { en: "Scavenge parts", pt: "Catar peças" },
          { en: "Rebuild", pt: "Remontar" }
        ]
      },
      systems: [
        {
          title: { en: "Part trade-off matrix", pt: "Matriz de trade-offs de peças" },
          body: {
            en: "12 parts across 4 slots, each with a buff/nerf pair, validated in a sheet so no combination stacked past +60% of baseline power.",
            pt: "12 peças em 4 slots, cada uma com um par buff/nerf, validadas em planilha para nenhuma combinação passar de +60% do poder base."
          }
        },
        {
          title: { en: "Weight & mobility", pt: "Peso e mobilidade" },
          body: {
            en: "Total part weight scales jump height and dash cooldown — the hidden stat that makes 'strongest build' a real question.",
            pt: "O peso total das peças escala a altura do pulo e o cooldown do dash — o atributo oculto que torna 'a build mais forte' uma pergunta de verdade."
          }
        }
      ],
      combat: {
        formula: "DMG = (ATK − DEF × 0.6) × CRIT? 1.5 : 1 × (1 − RUST/100)",
        body: {
          en: "Flat-ish mitigation keeps early enemies relevant; RUST is a decay meter that punishes skipping repair benches — the combat system enforcing the exploration loop.",
          pt: "Mitigação quase plana mantém inimigos iniciais relevantes; RUST é um medidor de desgaste que pune pular as bancadas de reparo — o sistema de combate reforçando o loop de exploração."
        }
      },
      balancing: {
        body: {
          en: "Enemy TTK targets per zone (1.5s grunts → 25s minibosses) drove every stat. The sheet computed TTK from the damage formula live, so tuning was 'move the target, read the diff'.",
          pt: "Metas de TTK de inimigos por zona (1,5s para capangas → 25s para minichefes) guiaram todos os stats. A planilha calculava o TTK pela fórmula de dano em tempo real, então ajustar era 'mover a meta, ler o diff'."
        },
        table: {
          caption: { en: "Enemy attribute table (excerpt)", pt: "Tabela de atributos de inimigos (trecho)" },
          headers: [
            { en: "Enemy", pt: "Inimigo" },
            { en: "HP", pt: "HP" },
            { en: "ATK", pt: "ATK" },
            { en: "DEF", pt: "DEF" },
            { en: "TTK target", pt: "Meta de TTK" }
          ],
          rows: [
            ["Scrap Rat", "18", "6", "2", "1.5s"],
            ["Weld Drone", "34", "9", "4", "4s"],
            ["Junk Golem", "120", "14", "10", "12s"],
            ["Foreman MK-II", "300", "18", "12", "25s"]
          ]
        }
      },
      implementation: {
        en: "Built in Godot 4. Parts are Resources loaded from data, so a new part is one sheet row plus a sprite — designers (me, with another hat on) never touch combat code to add content.",
        pt: "Feito em Godot 4. As peças são Resources carregados de dados, então uma peça nova é uma linha na planilha mais um sprite — designers (eu, de outro chapéu) nunca tocam no código de combate para adicionar conteúdo."
      },
      learnings: {
        en: "Designing the data pipeline first made every later system cheaper. Hitstop and screenshake bought more perceived power than any +damage tweak.",
        pt: "Projetar o pipeline de dados primeiro barateou todos os sistemas seguintes. Hitstop e screenshake compraram mais sensação de poder do que qualquer ajuste de +dano."
      }
    }
  },
  {
    id: "clicachorro",
    accent: "#F5F1E8",
    name: "ClicaChorro",
    type: { en: "Idle/clicker game (web)", pt: "Idle/clicker (web)" },
    role: { en: "Solo Developer & Systems Designer", pt: "Desenvolvedor Solo & Systems Designer" },
    tools: ["JavaScript", "HTML/CSS", "Google Sheets"],
    cover: "./assets/img/projects/clicachorro.svg",
    coverAlt: {
      en: "ClicaChorro key art — a dog paw, a click cursor and floating +1s",
      pt: "Arte principal de ClicaChorro — uma patinha, um cursor de clique e +1 flutuando"
    },
    summary: {
      en: "A cozy idle-clicker where you raise a stray puppy into the Best Dog in the World. A solo web project whose entire economy is derived from a single number — how long the run should take — through one closed-form balancing spreadsheet.",
      pt: "Um idle-clicker aconchegante onde você cria um vira-lata até virar o Melhor Cachorro do Mundo. Um projeto solo pra web cuja economia inteira é derivada de um único número — quanto tempo a run deve durar — a partir de uma única planilha de balanceamento de forma fechada."
    },
    caseStudy: {
      heroImage: {
        src: "./assets/img/projects/clicachorro.svg",
        alt: { en: "ClicaChorro — idle clicker key art", pt: "ClicaChorro — key art do idle clicker" }
      },
      overview: {
        en: "ClicaChorro is a cozy idle-clicker for the browser. You adopt a scrappy stray and click to shower it with affection; that affection buys helpers and upgrades that idle-earn for you, and each purchase nudges your dog up a life-stage — from Stray all the way to the Best Dog in the World. A solo project, built to test one idea: that a clicker's whole economy can be derived from how long you want the run to last.",
        pt: "ClicaChorro é um idle-clicker aconchegante pro navegador. Você adota um vira-lata e clica pra encher ele de carinho; esse carinho compra ajudantes e upgrades que rendem sozinhos, e cada compra empurra seu cachorro pra próxima fase de vida — do Vira-lata até o Melhor Cachorro do Mundo. Um projeto solo, feito pra testar uma ideia: que a economia inteira de um clicker pode ser derivada de quanto tempo você quer que a run dure."
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
          { en: "Advance a life-stage", pt: "Subir de fase de vida" }
        ],
        note: {
          en: "Clicking earns affection; affection buys helpers and upgrades that idle-earn for you; enough of it advances your dog to the next life-stage. Every stage costs more affection than the last, so the loop keeps pulling forward — toward the twelfth and final stage that ends the game.",
          pt: "Clicar rende carinho; carinho compra ajudantes e upgrades que rendem sozinhos; carinho suficiente sobe seu cachorro pra próxima fase de vida. Cada fase custa mais carinho que a anterior, então o loop segue puxando pra frente — até a décima segunda e última fase que encerra o jogo."
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
          title: { en: "Life-stage progression", pt: "Progressão por fase de vida" },
          body: {
            en: "Twelve named stages give the number-go-up a narrative spine — you're not just buying multipliers, you're raising a dog from Stray to legend.",
            pt: "Doze fases nomeadas dão à escalada de números uma espinha narrativa — você não está só comprando multiplicadores, está criando um cachorro de Vira-lata a lenda."
          }
        }
      ],
      progression: {
        en: "Twelve life-stages from a Stray to the Best Dog in the World. Because the cost/output ratio r = a/b is greater than 1, each stage costs a little more time than the last — about 2.1 minutes at the start, climbing to 6.1 minutes for the finale — so the run swells toward a climax instead of flatlining. Costs run 618 → 108,780 affection; idle output 5 → 298/s.",
        pt: "Doze fases de vida, do Vira-lata ao Melhor Cachorro do Mundo. Como a razão custo/produção r = a/b é maior que 1, cada fase custa um pouco mais de tempo que a anterior — cerca de 2,1 minutos no início, subindo a 6,1 minutos no final — então a run cresce rumo a um clímax em vez de estagnar. Custos vão de 618 → 108.780 de carinho; produção passiva de 5 → 298/s."
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
            caption: { en: "Curve by life-stage (excerpt)", pt: "Curva por fase de vida (trecho)" },
            headers: [
              { en: "Stage", pt: "Fase" },
              { en: "Cost (affection)", pt: "Custo (carinho)" },
              { en: "Output /s", pt: "Produção /s" },
              { en: "Stage time (min)", pt: "Tempo da fase (min)" },
              { en: "Cumulative (min)", pt: "Acumulado (min)" }
            ],
            rows: [
              [{ en: "1 · Stray", pt: "1 · Vira-lata" }, "618", "5.0", "2.06", "2.06"],
              [{ en: "4 · Show Dog", pt: "4 · Cachorro Premiado" }, "2,533", "15.2", "2.77", "9.61"],
              [{ en: "8 · Internet Star", pt: "8 · Astro da Internet" }, "16,598", "67.4", "4.11", "23.87"],
              [{ en: "12 · Best Dog in the World", pt: "12 · Melhor Cachorro do Mundo" }, "108,780", "297.9", "6.09", "45.00"]
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
        { label: { en: "Balancing spreadsheet (.xlsx)", pt: "Planilha de balanceamento (.xlsx)" }, url: "./assets/clicachorro-balanceamento.xlsx", kind: "sheet" }
      ]
    }
  },
  {
    id: "tide-tactics",
    accent: "#FF4F87",
    name: "Tide Tactics",
    type: { en: "Educational strategy game (web)", pt: "Jogo educacional de estratégia (web)" },
    role: { en: "Game Designer & 3D Artist", pt: "Game Designer e Artista 3D" },
    tools: ["Godot", "Blender", "Illustrator", "Google Sheets"],
    cover: "./assets/img/projects/tide-tactics.svg",
    coverAlt: { en: "Tide Tactics key art", pt: "Arte principal de Tide Tactics" },
    summary: {
      en: "A turn-based strategy game about coastal ecosystems, built for an educational program. I designed the resource systems and modeled the 3D board pieces — teaching through mechanics, not through text pop-ups.",
      pt: "Um jogo de estratégia por turnos sobre ecossistemas costeiros, feito para um programa educacional. Projetei os sistemas de recursos e modelei as peças 3D do tabuleiro — ensinando pelas mecânicas, não por pop-ups de texto."
    },
    caseStudy: {
      overview: {
        en: "Built within an educational product context (Instituto ECOA), Tide Tactics turns ecosystem trade-offs into a tactics board: every intervention helps one species and pressures another.",
        pt: "Feito num contexto de produto educacional (Instituto ECOA), Tide Tactics transforma trade-offs de ecossistema num tabuleiro de tática: cada intervenção ajuda uma espécie e pressiona outra."
      },
      role: {
        en: "Designed the resource/food-web systems, balanced scenario difficulty in Sheets, and produced the low-poly board pieces in Blender with a hand-painted texture pass.",
        pt: "Projetei os sistemas de recursos/teia alimentar, balanceei a dificuldade dos cenários no Sheets e produzi as peças low-poly do tabuleiro no Blender com um passe de textura pintado à mão."
      },
      challenge: {
        en: "The science had to stay honest while the game stayed fun — so the food web is a real simulation with tuned coefficients, and 'winning' means reaching equilibrium, not maximizing one number.",
        pt: "A ciência precisava continuar honesta com o jogo continuando divertido — então a teia alimentar é uma simulação real com coeficientes ajustados, e 'vencer' significa alcançar equilíbrio, não maximizar um número."
      },
      systems: [
        {
          title: { en: "Food web simulation", pt: "Simulação de teia alimentar" },
          body: {
            en: "Five species with predation coefficients in a matrix — the balancing sheet literally was the game's design document.",
            pt: "Cinco espécies com coeficientes de predação numa matriz — a planilha de balanceamento era literalmente o design doc do jogo."
          }
        }
      ],
      learnings: {
        en: "Systems can teach better than text: playtesters explained trophic cascades back to us using game terms. Art and design in the same head shortens every iteration loop.",
        pt: "Sistemas ensinam melhor que texto: playtesters explicavam cascatas tróficas de volta usando termos do jogo. Arte e design na mesma cabeça encurtam todo loop de iteração."
      }
    }
  }
];
