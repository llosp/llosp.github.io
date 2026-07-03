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
    id: "party-howl",
    accent: "#F5F1E8",
    name: "Party Howl!",
    type: { en: "Couch co-op party game (prototype)", pt: "Party game co-op local (protótipo)" },
    role: { en: "Project Coordinator & Game Designer", pt: "Coordenador de Projeto e Game Designer" },
    tools: ["Unity", "Figma", "Google Sheets"],
    cover: "./assets/img/projects/party-howl.svg",
    coverAlt: { en: "Party Howl key art", pt: "Arte principal de Party Howl" },
    summary: {
      en: "Four players, one very loud dog band. I coordinated a 7-person team and designed the minigame framework — new minigames ship as data, not as code rewrites.",
      pt: "Quatro jogadores, uma banda de cachorros muito barulhenta. Coordenei um time de 7 pessoas e projetei o framework de minigames — minigames novos entram como dados, não como reescritas de código."
    },
    caseStudy: {
      overview: {
        en: "A Prisma Game Lab jam project that grew legs: a chaotic couch co-op game where a dog band tries to keep a concert going. My focus was making the team fast — one shared minigame spec, one scoring system, weekly builds.",
        pt: "Um projeto de jam do Prisma Game Lab que ganhou pernas: um co-op local caótico onde uma banda de cachorros tenta manter o show de pé. Meu foco era deixar o time rápido — uma spec única de minigame, um sistema único de pontuação, builds semanais."
      },
      role: {
        en: "Coordinated design, art and code across 7 people; designed the scoring/rubber-banding system; wrote the minigame design template every new minigame had to fill before entering production.",
        pt: "Coordenei design, arte e código entre 7 pessoas; projetei o sistema de pontuação/rubber-banding; escrevi o template de design que todo minigame novo precisava preencher antes de entrar em produção."
      },
      challenge: {
        en: "Party games die when one player runs away with the score. The rubber-band system awards catch-up multipliers that are loud and diegetic (the crowd cheers for the underdog) so comebacks feel earned, not gifted.",
        pt: "Party games morrem quando um jogador dispara no placar. O sistema de rubber-band dá multiplicadores de recuperação barulhentos e diegéticos (a plateia torce pelo azarão) para viradas parecerem merecidas, não presenteadas."
      },
      systems: [
        {
          title: { en: "Minigame framework", pt: "Framework de minigames" },
          body: {
            en: "Every minigame declares duration, input verbs and score weights in a config — the shell handles intros, countdowns and results uniformly.",
            pt: "Todo minigame declara duração, verbos de input e pesos de pontuação numa config — o shell cuida de intros, contagens e resultados de forma uniforme."
          }
        },
        {
          title: { en: "Crowd meter", pt: "Medidor de plateia" },
          body: {
            en: "A shared meter that all players feed; if it empties, everyone loses points — the cooperative pressure inside a competitive format.",
            pt: "Um medidor compartilhado que todos alimentam; se esvaziar, todos perdem pontos — a pressão cooperativa dentro de um formato competitivo."
          }
        }
      ],
      learnings: {
        en: "Coordination is a design problem: the minigame template cut scope debates in half. Loud feedback systems beat fair-but-invisible math in party games.",
        pt: "Coordenação é um problema de design: o template de minigames cortou as discussões de escopo pela metade. Sistemas de feedback barulhentos vencem matemática justa-porém-invisível em party games."
      }
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
