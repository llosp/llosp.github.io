// Project content, EN/PT. PLACEHOLDER DATA — swap freely.
// Every human-readable string is { en, pt }. Optional caseStudy fields
// (coreLoop, combat, balancing.table, …) are simply skipped when absent.
export const projects = [
  {
    id: "verdant-loop",
    accent: "#FF4F87",
    name: "Verdant Loop",
    type: { en: "Roguelite deckbuilder (PC)", pt: "Deckbuilder roguelite (PC)" },
    role: { en: "Systems Designer & Balancing Lead", pt: "Systems Designer e Líder de Balanceamento" },
    tools: ["Unity", "C#", "Google Sheets", "Figma"],
    cover: "./assets/img/projects/verdant-loop.svg",
    coverAlt: { en: "Verdant Loop key art", pt: "Arte principal de Verdant Loop" },
    summary: {
      en: "A deckbuilder where your garden is your deck. I owned the card economy, the run progression and the balancing pipeline — 40+ cards tuned through a live Sheets model.",
      pt: "Um deckbuilder onde o seu jardim é o seu deck. Fui responsável pela economia de cartas, pela progressão da run e pelo pipeline de balanceamento — mais de 40 cartas ajustadas num modelo vivo no Sheets."
    },
    caseStudy: {
      overview: {
        en: "Verdant Loop is a run-based deckbuilder prototype built at Prisma Game Lab: plant cards grow over turns, and pruning your deck is as important as growing it. The pitch was 'a deck that literally grows'.",
        pt: "Verdant Loop é um protótipo de deckbuilder por runs feito no Prisma Game Lab: cartas-planta crescem ao longo dos turnos, e podar o deck é tão importante quanto fazê-lo crescer. O pitch era 'um deck que literalmente cresce'."
      },
      role: {
        en: "I designed the card economy and combat math, built the balancing spreadsheet that fed values straight into Unity via ScriptableObjects, and ran weekly tuning passes after playtests.",
        pt: "Projetei a economia de cartas e a matemática de combate, construí a planilha de balanceamento que alimentava valores direto na Unity via ScriptableObjects e rodei passes semanais de ajuste após os playtests."
      },
      challenge: {
        en: "Growth cards get stronger every turn they stay in your deck — so how do you stop late-game snowballing without making early picks feel useless? The answer became a decay/pruning economy with tempo costs.",
        pt: "Cartas de crescimento ficam mais fortes a cada turno no deck — como impedir a bola de neve no late game sem tornar as escolhas iniciais inúteis? A resposta virou uma economia de poda/decaimento com custos de tempo."
      },
      coreLoop: {
        steps: [
          { en: "Draft seeds", pt: "Comprar sementes" },
          { en: "Fight", pt: "Lutar" },
          { en: "Grow / prune", pt: "Crescer / podar" },
          { en: "Upgrade plot", pt: "Melhorar canteiro" }
        ],
        note: {
          en: "The loop closes back on drafting: pruned cards become compost, the currency for the next draft — waste feeds growth.",
          pt: "O loop fecha de volta no draft: cartas podadas viram composto, a moeda do próximo draft — o descarte alimenta o crescimento."
        }
      },
      systems: [
        {
          title: { en: "Growth economy", pt: "Economia de crescimento" },
          body: {
            en: "Every plant card has a growth stage (0–3) that ticks up per combat. Power scales on a tuned curve, but hand size pressure makes hoarding risky.",
            pt: "Cada carta-planta tem um estágio de crescimento (0–3) que sobe a cada combate. O poder escala numa curva ajustada, mas a pressão do tamanho da mão torna acumular arriscado."
          }
        },
        {
          title: { en: "Compost & pruning", pt: "Composto e poda" },
          body: {
            en: "Removing a card refunds compost proportional to its growth stage — the anti-snowball valve that also smooths bad drafts.",
            pt: "Remover uma carta devolve composto proporcional ao estágio de crescimento — a válvula anti-bola-de-neve que também suaviza drafts ruins."
          }
        },
        {
          title: { en: "Seasonal modifiers", pt: "Modificadores sazonais" },
          body: {
            en: "Every 3 fights the season shifts, multiplying growth rates per plant type. Seasons are the run's difficulty dial and the build-variety engine.",
            pt: "A cada 3 lutas a estação muda, multiplicando as taxas de crescimento por tipo de planta. As estações são o dial de dificuldade da run e o motor de variedade de builds."
          }
        }
      ],
      progression: {
        en: "Run progression uses a 12-node map with three difficulty bands. Node rewards were tuned so an average run hits deck power ~85% of the final boss check — losing should feel one decision away from winning.",
        pt: "A progressão da run usa um mapa de 12 nós com três faixas de dificuldade. As recompensas foram ajustadas para uma run média chegar a ~85% do poder exigido pelo chefe final — perder deve parecer estar a uma decisão da vitória."
      },
      combat: {
        formula: "DMG = BASE × (1 + 0.35 × STAGE) × SEASON_MOD − TARGET_DEF",
        body: {
          en: "Damage grows linearly per growth stage (not exponentially — we tried 1.5^stage first and it broke turn 9+). Season modifiers stay inside 0.8–1.3 so no plant type is ever dead weight.",
          pt: "O dano cresce linearmente por estágio (não exponencialmente — testamos 1.5^estágio primeiro e quebrava do turno 9 em diante). Os modificadores sazonais ficam entre 0.8–1.3 para nenhum tipo de planta virar peso morto."
        }
      },
      balancing: {
        body: {
          en: "All 40+ cards live in one Sheets model: cost, base power, growth curve, win-rate deltas from playtest logs. Conditional formatting flags outliers; a CSV export feeds Unity ScriptableObjects, so a tuning pass never touches code.",
          pt: "As 40+ cartas vivem num único modelo no Sheets: custo, poder base, curva de crescimento, deltas de win rate dos logs de playtest. Formatação condicional marca outliers; um export CSV alimenta ScriptableObjects na Unity, então um passe de ajuste nunca toca código."
        },
        table: {
          caption: { en: "Card attribute table (excerpt)", pt: "Tabela de atributos de cartas (trecho)" },
          headers: [
            { en: "Card", pt: "Carta" },
            { en: "Cost", pt: "Custo" },
            { en: "Base", pt: "Base" },
            { en: "Stage 3", pt: "Estágio 3" },
            { en: "Win% Δ", pt: "Δ Win%" }
          ],
          rows: [
            ["Sprout Jab", "1", "4", "8", "+1.2"],
            ["Bramble Wall", "2", "0/6 blk", "0/12 blk", "-0.4"],
            ["Sunburst", "3", "9", "18", "+3.1 ⚠"],
            ["Root Network", "2", "2×2", "2×5", "+0.8"]
          ]
        }
      },
      implementation: {
        en: "I prototyped the growth system myself in Unity (C#) before the team committed to it — a two-week greybox with debug sliders for every curve constant, which later became the tuning UI.",
        pt: "Eu mesmo prototipei o sistema de crescimento na Unity (C#) antes de o time abraçar a ideia — um greybox de duas semanas com sliders de debug para cada constante de curva, que depois virou a UI de tuning."
      },
      learnings: {
        en: "Linear scaling with pressure valves beats exponential scaling with caps. And a spreadsheet the whole team can read is a design tool, not an accounting chore.",
        pt: "Escala linear com válvulas de pressão vence escala exponencial com tetos. E uma planilha que o time inteiro consegue ler é ferramenta de design, não burocracia."
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
