// Project content, EN/PT. PLACEHOLDER DATA: swap freely.
// Every human-readable string is { en, pt }. Optional caseStudy fields
// (coreLoop, combat, balancing.table, …) are simply skipped when absent.
export const projects = [
  {
    id: "count-me-dead",
    accent: "#F0563F",
    name: "Count Me Dead",
    playable: true,
    playUrl: "https://lopen.itch.io/count-me-dead",
    type: { en: "Boss-rush western duel (web)", pt: "Duelo western boss-rush (web)" },
    role: { en: "Game Design, Programming & Audio", pt: "Game Design, Programação & Áudio" },
    tools: ["Godot", "GDScript"],
    cover: "./assets/img/projects/count-me-dead-gameplay-1.webp",
    coverAlt: {
      en: "A duel against Hoarse Ryder: the timer still reads 9 when the player fires, and TOO EARLY! flashes across the screen",
      pt: "Um duelo contra Hoarse Ryder: o timer ainda marca 9 quando o jogador atira, e TOO EARLY! pisca na tela"
    },
    summary: {
      en: "You're an accountant hired by letter to collect on a town full of outlaws, one bullet per debt. The whole game is one button: wait for the count to hit zero, then draw. Nobody shoots faster than you, so every outlaw cheats the count instead, each one in the way their character would. Made in 72 hours for GMTK Jam 2026; placed 21st of 10,587.",
      pt: "Você é um contador contratado por carta para cobrar uma cidade cheia de foras da lei, uma bala por dívida. O jogo inteiro é um botão: espere a contagem chegar a zero e saque. Ninguém saca mais rápido que você, então cada fora da lei falsifica a contagem, cada um do jeito que o personagem dele falsificaria. Feito em 72 horas para a GMTK Jam 2026; ficou em 21º de 10.587."
    },
    caseStudy: {
      heroImage: {
        src: "./assets/img/projects/count-me-dead-gameplay-1.webp",
        alt: {
          en: "A duel against Hoarse Ryder: the timer still reads 9 when the player fires, and TOO EARLY! flashes across the screen",
          pt: "Um duelo contra Hoarse Ryder: o timer ainda marca 9 quando o jogador atira, e TOO EARLY! pisca na tela"
        }
      },
      // Also rendered as the home page showcase strip (js/templates.js), so
      // these three are the site's single source for the jam numbers.
      results: [
        { value: { en: "Top 0.2%", pt: "Top 0,2%" },
          label: { en: "21st of 10,587 games in GMTK Jam 2026", pt: "21º de 10.587 jogos na GMTK Jam 2026" } },
        { value: { en: "218 ratings", pt: "218 avaliações" },
          label: { en: "10× the jam average of 21", pt: "10× a média da jam (21)" } },
        { value: { en: "72 hours", pt: "72 horas" },
          label: { en: "Concept to shipped build", pt: "Do conceito à build publicada" } }
      ],
      meta: {
        timeline: { en: "72 hours · GMTK Jam 2026", pt: "72 horas · GMTK Jam 2026" },
        team: { en: "3, design, code and audio mine", pt: "3 pessoas; design, código e áudio meus" },
        studio: "Wolfish Studios",
        engine: "Godot 4 · GDScript",
        platform: { en: "Web", pt: "Web" }
      },
      overview: {
        en: "A letter hires you to collect on a town full of outlaws: \"Balance the ledger.\" Five names, one duel, one button. The ledger you are balancing is a countdown, and the last debtor turns out to have written the letter. Made in 72 hours for GMTK Jam 2026, where it finished 21st with 218 ratings.",
        pt: "Uma carta te contrata para cobrar uma cidade cheia de foras da lei: \"Equilibre o livro-caixa.\" Cinco nomes, um duelo, um botão. O livro que você equilibra é uma contagem regressiva, e o último devedor acaba sendo quem escreveu a carta. Feito em 72 horas para a GMTK Jam 2026, onde ficou em 21º com 218 avaliações."
      },
      role: {
        en: "A three-person team at Wolfish Studios. I did the game design, all of the programming and the audio; Frovio and Zumate made the art. The rule I designed against: a boss's mechanic has to be a joke about who they are.",
        pt: "Um time de três pessoas na Wolfish Studios. Fiz o game design, toda a programação e o áudio; Frovio e Zumate fizeram a arte. A regra contra a qual projetei: a mecânica de um chefe tem que ser uma piada sobre quem ele é."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "Core loop & boss design", pt: "Core loop & design dos chefes" },
            { en: "Difficulty tuning", pt: "Tuning de dificuldade" },
            { en: "Adaptive pressure model", pt: "Modelo de pressão adaptativa" },
            { en: "Jam scoping", pt: "Escopo da jam" }
          ]
        },
        {
          group: { en: "Code", pt: "Código" },
          items: [
            { en: "GDScript (Godot 4)", pt: "GDScript (Godot 4)" },
            { en: "Duel state machine", pt: "Máquina de estados do duelo" },
            { en: "Data-driven boss hooks", pt: "Hooks de chefe data-driven" },
            { en: "UI, VFX & shaders", pt: "UI, VFX & shaders" }
          ]
        },
        {
          group: { en: "Audio", pt: "Áudio" },
          items: [
            { en: "Original soundtrack", pt: "Trilha original" },
            { en: "Gunfire & skill SFX", pt: "SFX de tiro & habilidades" },
            { en: "Character voice banks", pt: "Bancos de voz dos personagens" }
          ]
        }
      ],
      challenge: {
        en: "One input, one verb: shoot. 72 hours, five boss fights that all have to feel different. Adding verbs would not have shipped in time, so I attacked what the player knows instead of what the player does. A duel on a countdown is a reading problem. Every boss stopped being a difficulty tier and became a specific kind of liar.",
        pt: "Um input, um verbo: atirar. 72 horas, cinco lutas de chefe que precisam parecer diferentes. Adicionar verbos não ficaria pronto a tempo, então ataquei o que o jogador sabe em vez do que o jogador faz. Um duelo em cima de uma contagem é um problema de leitura. Cada chefe deixou de ser um nível de dificuldade e virou um tipo específico de mentiroso."
      },
      coreLoop: {
        steps: [
          { en: "Read the count", pt: "Ler a contagem" },
          { en: "Hold your nerve", pt: "Segurar o nervo" },
          { en: "Draw on zero", pt: "Sacar no zero" },
          { en: "Hit, or lose a heart", pt: "Acertar, ou perder um coração" },
          { en: "The outlaw cooks the books", pt: "O fora da lei frauda o livro-caixa" }
        ],
        note: {
          en: "Three hearts each, five for the final boss. A clean draw takes one of theirs; firing too early or too slow takes one of yours. The base tempo is one tick per second with a 0.7s draw window, and every boss overrides both.",
          pt: "Três corações de cada lado, cinco no chefe final. Um saque limpo tira um deles; atirar cedo ou lento demais tira um seu. O tempo base é um tick por segundo com uma janela de saque de 0,7s, e todo chefe sobrescreve os dois."
        }
      },
      systems: [
        {
          title: { en: "One duel, five liars", pt: "Um duelo, cinco mentirosos" },
          body: {
            en: "A six-state machine runs every fight and never learns which outlaw is standing across from you. Each one is a subclass overriding thirteen hooks: round length, draw window, what happens each tick, what they say when you jump the gun. Bosses override, never fork.",
            pt: "Uma máquina de seis estados roda todas as lutas e nunca sabe qual fora da lei está do outro lado. Cada um é uma subclasse que sobrescreve treze hooks: duração do round, janela de saque, o que acontece a cada tick, o que ele fala quando você saca cedo. Chefes sobrescrevem, nunca bifurcam."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/count-me-dead-gameplay-4.webp",
            alt: { en: "The town map, where each location is a name on the ledger and unlocks the next outlaw", pt: "O mapa da cidade, onde cada local é um nome no livro-caixa e libera o próximo fora da lei" },
            caption: { en: "Five locations, five names on the ledger. Every one of them runs the same duel.", pt: "Cinco locais, cinco nomes no livro-caixa. Todos eles rodam o mesmo duelo." }
          }
        },
        {
          title: { en: "Hoarse Ryder talks over the count", pt: "Hoarse Ryder fala por cima da contagem" },
          body: {
            en: "He never touches the timer. His bit is needing three lines to walk back a threat, so the fight escalates by talking more. Two hearts in, scripted lines become a flood drawn from a shuffled bag of seven triads, two bubbles a second. The number is right there. You stop reading it.",
            pt: "Ele nunca toca no timer. A piada dele é precisar de três falas para desdizer uma ameaça, então a luta aumenta a pressão falando mais. Depois de dois corações, as falas roteirizadas viram uma enxurrada sorteada de um conjunto de sete tríades, dois balões por segundo. O número está bem ali. Você para de ler."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/count-me-dead-gameplay-3.webp",
            alt: { en: "Hoarse Ryder in the sheriff's office, bullying a frightened Conny Calzone and mangling an idiom: \"Strike while the soup is hot!\"", pt: "Hoarse Ryder no escritório do xerife, intimidando uma Conny Calzone assustada e destruindo o ditado: \"Strike while the soup is hot!\"" },
            caption: { en: "He mangles every idiom he attempts. In the duel, that verbal tic is the attack.", pt: "Ele erra todo ditado que tenta. No duelo, esse tique verbal é o ataque." }
          }
        },
        {
          title: { en: "Danny D. Vile makes you forget", pt: "Danny D. Vile te faz esquecer" },
          body: {
            en: "His running gag is that he remembers nothing, so his mechanic erases the count. He lights a fuse and blows seconds off the clock on a cooldown that tightens from 8s to 2s. By his last heart he detonates the timer entirely and you finish the round counting in your head.",
            pt: "A piada recorrente dele é não lembrar de nada, então a mecânica dele apaga a contagem. Ele acende um pavio e explode segundos do relógio num cooldown que aperta de 8s para 2s. No último coração ele detona o timer inteiro e você termina o round contando de cabeça."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/count-me-dead-gameplay-2.webp",
            alt: { en: "Mid-duel against Danny D. Vile, the timer at 18, \"Let's see you count without me.\" The player's health bar is labelled THE ACCOUNTANT", pt: "Duelo contra Danny D. Vile, o timer em 18, \"Let's see you count without me.\" A barra de vida do jogador está marcada como THE ACCOUNTANT" },
            caption: { en: "\"Let's see you count without me.\" Seconds later the 18 is gone.", pt: "\"Let's see you count without me.\" Segundos depois o 18 some." }
          }
        },
        {
          title: { en: "Tunga Tatu sells you time at interest", pt: "Tunga Tatu te vende tempo a juros" },
          body: {
            en: "The loan shark does not steal seconds, he trades them: a green buy adds 3 to 5 seconds, an orange sell slashes the count to zero. Both spawn as floating market numbers. Phase 2 mirrors the display horizontally. Phase 3 stops printing the figures, so you see him trading but not how much.",
            pt: "O agiota não rouba segundos, ele negocia: uma compra verde soma 3 a 5 segundos, uma venda laranja corta a contagem a zero. As duas saem como números flutuantes de mercado. A fase 2 espelha o display na horizontal. A fase 3 para de imprimir os valores, então você vê ele negociando mas não quanto."
          },
          visual: {
            kind: "stat",
            pairs: [
              { from: "0.70s", to: "0.38s", label: { en: "Draw window, first phase to last", pt: "Janela de saque, da primeira fase à última" } },
              { from: "0.00", to: "0.75", label: { en: "Chance he calls the debt in and zeroes the count", pt: "Chance de ele cobrar a dívida e zerar a contagem" } }
            ],
            caption: { en: "The fight tightens from both ends at once: less time to react, more often.", pt: "A luta aperta pelos dois lados ao mesmo tempo: menos tempo para reagir, com mais frequência." }
          }
        },
        {
          title: { en: "Conny Calzone turns the clock into homework", pt: "Conny Calzone transforma o relógio em dever de casa" },
          body: {
            en: "\"You know what's scarier than guns? MATH!\" She splits the counter with an operator and you draw when the sum hits zero. Phase 3 rotates the plus into a multiplication, which is pure bluff: she says she does not know what the symbol means. The left number is noise.",
            pt: "\"Sabe o que é mais assustador que armas? MATEMÁTICA!\" Ela parte o contador com um operador e você saca quando a soma chega a zero. A fase 3 gira o mais e vira multiplicação, o que é puro blefe: ela mesma diz que não sabe o que o símbolo significa. O número da esquerda é ruído."
          },
          visual: {
            kind: "diagram",
            type: "counter",
            faces: [
              { text: "972", tag: { en: "noise", pt: "ruído" } },
              { text: "×" },
              { text: "5", real: true, tag: { en: "the real count", pt: "a contagem real" } }
            ],
            note: { en: "Phase 1 is an honest sum: 12 + 6 means you draw six ticks later. Phase 3 keeps the format and empties it out.", pt: "A fase 1 é uma soma honesta: 12 + 6 quer dizer que você saca seis ticks depois. A fase 3 mantém o formato e o esvazia." },
            caption: { en: "The scariest-looking screen in the game is the one doing the least.", pt: "A tela mais assustadora do jogo é a que faz menos coisa." }
          }
        },
        {
          title: { en: "El To Angus owns the rules", pt: "El To Angus é dono das regras" },
          body: {
            en: "He wrote the letter that started the game, and he wrote your ledger. \"I run this town, so I make the rules. For instance, I have 5 lives.\" Five near-identical timers, shuffled, one real. Mid-round the real face slides and the number that ends the count moves from 0 to 7.",
            pt: "Ele escreveu a carta que começou o jogo, e escreveu o seu livro-caixa. \"Eu mando nesta cidade, então eu faço as regras. Por exemplo, eu tenho 5 vidas.\" Cinco timers quase idênticos, embaralhados, um real. No meio do round a face real desliza e o número que encerra a contagem vai de 0 para 7."
          },
          visual: {
            kind: "diagram",
            type: "counter",
            faces: [
              { text: "TINER" },
              { text: "TIDER" },
              { text: "TIMER", real: true, tag: { en: "real, for now", pt: "real, por enquanto" } },
              { text: "TYLER" },
              { text: "TIGER" }
            ],
            note: { en: "The real counter also runs a hand-written sequence with decoy zeros in it: 10, 9, 8, 0, 6, 5, 4, 3, 2, 1, 7.", pt: "O contador real também roda uma sequência escrita à mão com zeros-isca dentro: 10, 9, 8, 0, 6, 5, 4, 3, 2, 1, 7." },
            caption: { en: "He even baits one by name. \"I once had a friend named Tyler…\", and TYLER starts counting.", pt: "Ele até usa um como isca, pelo nome. \"Eu tinha um amigo chamado Tyler…\", e TYLER começa a contar." }
          }
        }
      ],
      process: [
        {
          title: { en: "Danny punished a read he had caused", pt: "Danny punia uma leitura que ele mesmo causou" },
          before: {
            value: { en: "0.00s grace", pt: "0,00s de tolerância" },
            body: { en: "A draw fired a hair before zero read TOO EARLY, even against the boss whose whole mechanic is removing seconds from your clock. Testers read it as the game cheating.", pt: "Um saque disparado um fio antes do zero lia CEDO DEMAIS, mesmo contra o chefe cuja mecânica inteira é tirar segundos do seu relógio. Os testers liam aquilo como trapaça do jogo." }
          },
          after: {
            value: { en: "0.30s grace", pt: "0,30s de tolerância" },
            body: { en: "Danny is the only outlaw with an early-grace window. He steals the seconds, so a hair-early read is his fault, not yours.", pt: "Danny é o único fora da lei com janela de tolerância. Ele rouba os segundos, então uma leitura um fio adiantada é culpa dele, não sua." }
          },
          note: { en: "One of the commits is named 'danny easier by 0.40'. That exception is the difference between a boss who feels unfair and a boss who feels like a cheat you can beat.", pt: "Um dos commits se chama 'danny easier by 0.40'. Essa exceção é a diferença entre um chefe que parece injusto e um chefe que parece uma trapaça vencível." }
        },
        {
          title: { en: "His first fuse could kill before it taught", pt: "O primeiro pavio dele matava antes de ensinar" },
          before: {
            value: { en: "Can zero the clock", pt: "Pode zerar o relógio" },
            body: { en: "Danny's opening cast could take the count straight to zero, so a first-time player lost a heart before understanding what had happened to the timer.", pt: "O primeiro cast do Danny podia levar a contagem direto a zero, então um jogador de primeira viagem perdia um coração antes de entender o que tinha acontecido com o timer." }
          },
          after: {
            value: { en: "Leaves 1s minimum", pt: "Deixa 1s no mínimo" },
            body: { en: "The first cast of the fight is capped non-lethal. You see the fuse, you see the number drop, and you still get to draw. Every cast after it is live.", pt: "O primeiro cast da luta nunca é letal. Você vê o pavio, vê o número cair, e ainda consegue sacar. Todo cast depois dele é para valer." }
          }
        },
        {
          title: { en: "The difficulty menu I never built", pt: "O menu de dificuldade que nunca construí" },
          before: {
            value: { en: "3 difficulty presets", pt: "3 presets de dificuldade" },
            body: { en: "The plan was easy, normal and hard settings on Conny's fight. Three sets of numbers to tune and no time to playtest any of them properly.", pt: "O plano era ter dificuldade fácil, normal e difícil na luta da Conny. Três conjuntos de números para ajustar e sem tempo de testar nenhum direito." }
          },
          after: {
            value: { en: "1 pressure float", pt: "1 float de pressão" },
            body: { en: "A hidden value in [0, 1] rises 0.25 per fast clean draw and falls 0.30 per heart lost, then drives her draw window, feint rate and shift unlock.", pt: "Um valor escondido em [0, 1] sobe 0,25 por saque rápido e limpo e cai 0,30 por coração perdido, e comanda a janela de saque, a taxa de fintas e a liberação do shift dela." }
          },
          note: { en: "The fight converges on the player's actual skill and the UI never admits it.", pt: "A luta converge para habilidade real do jogador e a UI nunca admite isso." }
        }
      ],
      progression: {
        en: "The town is ordered by what each debtor takes from you. Ryder takes your attention and never touches the number. Danny takes the seconds themselves. Tunga takes your ability to read them. Conny takes the arithmetic. Angus takes the rules, and then the numbers. Every fight also runs its phases off the boss's remaining hearts, so the gimmick escalates inside the fight too.",
        pt: "A cidade é ordenada pelo que cada devedor tira de você. Ryder tira sua atenção e nunca toca no número. Danny tira os segundos em si. Tunga tira sua capacidade de lê-los. Conny tira a aritmética. Angus tira as regras, e depois os números. Toda luta também roda suas fases a partir dos corações restantes do chefe, então o truque também cresce dentro da luta."
      },
      combat: {
        visual: {
          kind: "diagram",
          type: "window",
          bands: [
            { span: 1.1, tone: "early", label: { en: "TOO EARLY", pt: "CEDO DEMAIS" }, mark: "0.00s" },
            { span: 0.7, tone: "hit", label: { en: "HIT", pt: "ACERTO" }, mark: "0.70s" },
            { span: 1.1, tone: "late", label: { en: "TOO SLOW", pt: "LENTO DEMAIS" } }
          ],
          caption: { en: "The whole game happens inside the yellow band. Bosses override its width from 0.85s down to 0.38s.", pt: "O jogo inteiro acontece dentro da faixa amarela. Os chefes sobrescrevem a largura dela de 0,85s até 0,38s." }
        },
        body: {
          en: "The whole combat model is one window, so a boss's personality has to be expressed as a change to it: how wide it is, when it opens, or whether you can read the count leading into it. Nothing else about the duel is allowed to move.",
          pt: "O modelo de combate inteiro é uma janela, então a personalidade de um chefe precisa ser expressa como uma mudança nela: a largura, quando ela abre, ou se dá para ler a contagem que leva até ela. Nada mais no duelo pode se mexer."
        }
      },
      balancing: {
        formula: {
          en: "draw_window = lerp(0.55, 0.40, pressure)",
          pt: "janela_de_saque = lerp(0,55; 0,40; pressão)"
        },
        body: {
          en: "Boss tuning lives entirely in exported arrays, one entry per phase, so every fight was tuned in the inspector between playtests rather than in code. Conny's countdown isn't authored at all, it's solved from the two counters, so the round lasts exactly as long as the equation takes to reach zero. The adaptive layer sits on top: a pressure value in [0, 1] that rises 0.25 per fast, clean draw and falls 0.30 per heart lost, then drives the draw window, the feint rate and the shift unlock. One float in place of a difficulty menu.",
          pt: "O tuning dos chefes vive inteiramente em arrays exportados, uma entrada por fase, então cada luta foi ajustada no inspector entre playtests, não no código. A contagem da Conny nem é autoral, ela é resolvida a partir dos dois contadores, então o round dura exatamente o tempo que a equação leva para chegar a zero. A camada adaptativa fica por cima: um valor de pressão em [0, 1] que sobe 0,25 por saque rápido e limpo e cai 0,30 por coração perdido, e então comanda a janela de saque, a taxa de fintas e a liberação do shift. Um float no lugar de um menu de dificuldade."
        },
        tables: [
          {
            caption: { en: "Boss tuning by phase", pt: "Tuning dos chefes por fase" },
            headers: [
              { en: "Outlaw", pt: "Fora da lei" },
              { en: "Countdown (s)", pt: "Contagem (s)" },
              { en: "Draw window (s)", pt: "Janela de saque (s)" },
              { en: "Signature attack", pt: "Ataque característico" }
            ],
            rows: [
              ["Hoarse Ryder", "15 · 10 · 10", "0.70", { en: "Talks over the count until you lose it", pt: "Fala por cima da contagem até você perdê-la" }],
              ["Danny D. Vile", "18 · 24 · 18", "0.85 · 0.70 · 0.70", { en: "Blows seconds off the clock, then the clock", pt: "Explode segundos do relógio, depois o relógio" }],
              ["Tunga Tatu", "8 · 10 · 10", "0.70 · 0.50 · 0.38", { en: "Lends time at interest, then calls the debt in", pt: "Empresta tempo a juros, depois cobra a dívida" }],
              ["Conny Calzone", "6–12 · 4–7 · 5", "0.70 · 0.55 → 0.40 · 1.20", { en: "Splits the timer into an equation", pt: "Divide o timer numa equação" }],
              ["El To Angus", "8 · 10 · 8 · 15 · 5", "0.70", { en: "Five timers, one real, rules change mid-round", pt: "Cinco timers, um real, regras mudam no meio do round" }]
            ]
          },
          {
            caption: { en: "Adaptive pressure model (Conny Calzone)", pt: "Modelo de pressão adaptativa (Conny Calzone)" },
            headers: [
              { en: "Parameter", pt: "Parâmetro" },
              { en: "Value", pt: "Valor" },
              { en: "Effect", pt: "Efeito" }
            ],
            rows: [
              [{ en: "Comfortable latency", pt: "Latência confortável" }, "0.35 s", { en: "Draw faster than this and pressure rises", pt: "Saque mais rápido que isso e a pressão sobe" }],
              [{ en: "Pressure gain", pt: "Ganho de pressão" }, "+0.25", { en: "Per clean, fast draw", pt: "Por saque limpo e rápido" }],
              [{ en: "Pressure relief", pt: "Alívio de pressão" }, "−0.30", { en: "Per heart lost", pt: "Por coração perdido" }],
              [{ en: "Draw window", pt: "Janela de saque" }, "0.55 → 0.40 s", { en: "Narrows as pressure climbs", pt: "Estreita conforme a pressão sobe" }],
              [{ en: "Feint chance", pt: "Chance de finta" }, "0.35 → 1.00", { en: "Approaches certainty under pressure", pt: "Se aproxima da certeza sob pressão" }],
              [{ en: "Shift threshold", pt: "Limiar de shift" }, "0.34", { en: "Pressure needed to unlock the rate-shift attack", pt: "Pressão necessária para liberar o ataque de shift" }]
            ]
          }
        ]
      },
      charts: [
        {
          title: { en: "Draw window and feint chance against pressure", pt: "Janela de saque e chance de finta contra a pressão" },
          desc: {
            en: "As pressure rises from 0 to 1 the draw window narrows linearly from 0.55 to 0.40 seconds while the feint chance climbs from 0.35 to 1.00.",
            pt: "Conforme a pressão sobe de 0 a 1, a janela de saque estreita linearmente de 0,55 para 0,40 segundos enquanto a chance de finta sobe de 0,35 para 1,00."
          },
          caption: {
            en: "One float moves two dials in opposite directions: the window you have to react in shrinks while the odds of being lied to rise. Play well and the fight tightens; lose a heart and it opens back up, no difficulty menu required.",
            pt: "Um float move dois botões em direções opostas: a janela para reagir encolhe enquanto a chance de ser enganado sobe. Jogue bem e a luta aperta; perca um coração e ela abre de novo, sem menu de dificuldade."
          },
          xLabel: { en: "Pressure", pt: "Pressão" },
          yLabel: { en: "Draw window (s)", pt: "Janela de saque (s)" },
          yRightLabel: { en: "Feint chance", pt: "Chance de finta" },
          series: [
            {
              label: { en: "Draw window (s)", pt: "Janela de saque (s)" },
              color: "var(--yellow)",
              points: [[0, 0.55], [0.25, 0.5125], [0.5, 0.475], [0.75, 0.4375], [1, 0.4]]
            },
            {
              label: { en: "Feint chance", pt: "Chance de finta" },
              color: "var(--pink)",
              axis: "right",
              dashed: true,
              points: [[0, 0.35], [0.25, 0.5125], [0.5, 0.675], [0.75, 0.8375], [1, 1]]
            }
          ],
          annotations: [
            { x: 0.36, y: 0.499, text: { en: "0.34, shift unlocks", pt: "0,34, shift libera" }, dy: -14, anchor: "start" }
          ]
        }
      ],
      implementation: {
        en: "Godot 4 and GDScript, no external tooling. Both the fights and the writing are authored as data: Angus's whole event track, which timer is real, when the rack shuffles, which number ends the count, is inspector data rather than code, and the town's dialogue is script files with speaker, portrait and expression tags. In 72 hours that meant rewriting a boss's difficulty was a field edit between playtests, not a code change.",
        pt: "Godot 4 e GDScript, sem ferramental externo. Tanto as lutas quanto o texto são feitos como dado: a trilha de eventos inteira do Angus, qual timer é real, quando a estante embaralha, qual número encerra a contagem, é dado do inspector, não código, e o diálogo da cidade são arquivos de script com tags de falante, retrato e expressão. Em 72 horas isso significou que reescrever a dificuldade de um chefe era editar um campo entre playtests, não mexer no código."
      },
      learnings: {
        en: "Mechanics and characters were never designed separately. Once the premise was debt collection, \"what does this boss do to the timer\" and \"who is this boss\" became the same question. Players remember the ending, where the timer drops digits for the alphabet and one letter quietly becomes a real zero. It lands because it is the one time the player falsifies the count instead of the outlaw.",
        pt: "Mecânica e personagem nunca foram projetadas separadamente. Quando a premissa virou cobrança de dívida, \"o que esse chefe faz com o timer\" e \"quem é esse chefe\" viraram a mesma pergunta. Os jogadores lembram do final, em que o timer troca os dígitos pelo alfabeto e uma letra vira um zero de verdade. Funciona porque é a única vez em que quem falsifica a contagem é o jogador, não o fora da lei."
      },
      links: [
        { label: { en: "Play on itch.io", pt: "Jogar na itch.io" }, url: "https://lopen.itch.io/count-me-dead", kind: "play" }
      ]
    }
  },
  {
    id: "esqueleto-chico",
    accent: "#FF4F87",
    name: "Esqueleto Chico",
    playable: false,
    playUrl: "https://prismagamelab.itch.io/esqueleto-chico-ossos-do-oficio",
    type: { en: "Top-down action roguelike (PC)", pt: "Roguelike de ação top-down (PC)" },
    role: { en: "Lead Game & Systems Designer", pt: "Líder de Game Design e Sistemas" },
    tools: ["Unity", "Google Sheets", "Photoshop", "Figma"],
    cover: "./assets/img/projects/esqueleto-chico-gameplay-2.webp",
    coverAlt: {
      en: "Boss fight against O Zelador: laser sweeps across the crypt",
      pt: "Luta contra O Zelador: lasers varrendo a cripta"
    },
    badge: {
      src: "./assets/img/SB-games-Seal.png",
      alt: { en: "SB Games official selection seal", pt: "Selo de seleção oficial do SB Games" }
    },
    summary: {
      en: "A skeleton office-drone defends his boss's crypt from scheming minions. Built at Prisma Game Lab, I led the design and drove combat, progression and boss fights from one big balancing sheet, plus sound, UI and art.",
      pt: "Um esqueleto do mundo corporativo defende a cripta do chefe de lacaios conspiradores. Feito no Prisma Game Lab, liderei o design e conduzi combate, progressão e chefes a partir de uma grande planilha de balanceamento, além de som, UI e arte."
    },
    caseStudy: {
      heroVideo: {
        youtube: "Z_3GRWZEDSQ",
        title: { en: "Esqueleto Chico: Trailer", pt: "Esqueleto Chico: Trailer" }
      },
      heroImage: {
        src: "./assets/img/projects/esqueleto-chico-poster.webp",
        alt: { en: "Esqueleto Chico: Ossos do Ofício, key art poster", pt: "Esqueleto Chico: Ossos do Ofício, pôster de key art" }
      },
      results: [
        {
          value: { en: "Official selection", pt: "Seleção oficial" },
          label: { en: "SB Games, Brazil's academic game showcase", pt: "SB Games, mostra acadêmica de jogos do Brasil" }
        },
        {
          value: { en: "1 sheet", pt: "1 planilha" },
          label: { en: "Drove every enemy, boss and upgrade number", pt: "Definiu todos os números de inimigos, chefes e upgrades" }
        },
        {
          value: { en: "×1.00 → ×2.34", pt: "×1,00 → ×2,34" },
          label: { en: "Boss HP, scaled to how much you cleared", pt: "HP do chefe, escalado pelo tanto que você limpou" }
        }
      ],
      meta: {
        team: { en: "Prisma Game Lab team, design, sound, UI and art mine", pt: "Equipe do Prisma Game Lab, design, som, UI e arte meus" },
        studio: "Prisma Game Lab",
        engine: "Unity · C#",
        platform: { en: "PC", pt: "PC" }
      },
      overview: {
        en: "“Esqueleto Chico: Ossos do Ofício” is a top-down action game set in an oddly corporate crypt. You play Chico, a prodigy skeleton left in charge while the boss is away on a 'business trip', which sparks envy among the other minions, who steal the boss's favorite mug to sabotage him. A Prisma Game Lab production.",
        pt: "“Esqueleto Chico: Ossos do Ofício” é um jogo de ação top-down numa cripta um tanto corporativa. Você joga como Chico, um esqueleto prodígio deixado no comando enquanto o chefe está numa 'viagem a trabalho', o que desperta inveja nos outros lacaios, que roubam a caneca favorita do chefe para sabotá-lo. Uma produção do Prisma Game Lab."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "GDD & game loop", pt: "GDD & ciclo de jogo" },
            { en: "Level design & map", pt: "Level design & mapa" },
            { en: "Narrative", pt: "Narrativa" },
            { en: "Mechanics prototyping", pt: "Prototipagem de mecânicas" },
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
        en: "The player's power swings wildly across a run: a glass-cannon ATK build and a tanky HP build reach the same boss with very different stats. The design problem: make every boss feel fair and threatening for all of them, without hand-tuning each case.",
        pt: "O poder do jogador varia muito ao longo da run: uma build de ATK glass-cannon e uma build tanque de HP chegam ao mesmo chefe com stats bem diferentes. O problema de design: fazer cada chefe parecer justo e ameaçador para todas elas, sem ajustar cada caso na mão."
      },
      coreLoop: {
        steps: [
          { en: "Clear the room", pt: "Limpar a sala" },
          { en: "Pick 1 upgrade", pt: "Escolher 1 upgrade" },
          { en: "Beat the floor boss", pt: "Vencer o chefe do andar" },
          { en: "Descend", pt: "Descer" }
        ],
        note: {
          en: "You clear a run of rooms, each one granting an upgrade (ATK, fire rate or HP), then face the floor boss, and only after beating it do you descend to the next floor. Every room cleared reshapes the build the balancing model has to keep honest.",
          pt: "Você limpa uma sequência de salas, cada uma concedendo um upgrade (ATK, cadência ou HP), depois encara o chefe do andar, e só depois de vencê-lo você desce para o próximo andar. Cada sala limpa remodela a build que o modelo de balanceamento precisa manter honesta."
        }
      },
      systems: [
        {
          title: { en: "Rooms, not floors", pt: "Salas, não andares" },
          body: {
            en: "Enemy and reward stats scale per room cleared, zero through seven, so difficulty tracks how deep you went rather than which floor you are standing on. A player who skips rooms meets a weaker crypt and arrives weaker.",
            pt: "Stats de inimigos e recompensas sobem a cada sala limpa, de zero a sete, então a dificuldade acompanha o quanto você avançou, não em que andar você está. Quem pula salas encontra uma cripta mais fraca e chega mais fraco."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/esqueleto-chico-gameplay-1.webp",
            alt: { en: "Chico scything through minions in a tiled crypt room", pt: "Chico ceifando lacaios numa sala de cripta" },
            caption: { en: "One room, one clear, one step up the scaling curve.", pt: "Uma sala, uma limpeza, um degrau na curva de escalonamento." }
          }
        },
        {
          title: { en: "Three axes, one pool", pt: "Três eixos, um pool" },
          body: {
            en: "Each room offers one stat upgrade: ATK, fire rate or HP. Three axes out of the same pool are enough to produce builds that look nothing alike, a glass cannon and a tank, and that divergence is the whole balancing problem.",
            pt: "Cada sala oferece um upgrade: ATK, cadência ou HP. Três eixos vindos do mesmo pool bastam para produzir builds completamente diferentes, um glass cannon e um tanque, e essa divergência é todo o problema de balanceamento."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/esqueleto-chico-gameplay-3.webp",
            alt: { en: "An upgrade shrine offering 'Vinícius: Health +45'", pt: "Um altar de upgrade oferecendo 'Vinícius: Vida +45'" },
            caption: { en: "The draft is a single choice per room. Seven of them decide what the boss is fighting.", pt: "O draft é uma escolha por sala. Sete delas decidem o que o chefe vai enfrentar." }
          }
        },
        {
          title: { en: "A boss is a kit of damage bands", pt: "Um chefe é um kit de faixas de dano" },
          body: {
            en: "O Zelador rotates a laser sweep, a broom melee, thrown buckets and soap. Each attack carries its own damage band, tuned to threaten without one-shotting, so the fight reads as a pattern to learn rather than a stat check.",
            pt: "O Zelador gira entre varredura de laser, vassourada corpo-a-corpo, baldes arremessados e sabonete. Cada ataque carrega sua faixa de dano, ajustada para ameaçar sem matar de um golpe, então a luta é um padrão para aprender, não um teste de stats."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/esqueleto-chico-gameplay-2.webp",
            alt: { en: "Boss fight against O Zelador: laser sweeps across the crypt", pt: "Luta contra O Zelador: lasers varrendo a cripta" },
            caption: { en: "The laser sweep is tuned as a 5-hit kill. The broom is a 3-hit kill.", pt: "A varredura de laser é ajustada para matar em 5 hits. A vassourada, em 3." }
          }
        }
      ],
      process: [
        {
          title: { en: "Boss HP was pinned to the floor number", pt: "O HP do chefe estava preso ao número do andar" },
          before: {
            value: { en: "Flat per floor", pt: "Fixo por andar" },
            body: { en: "Each floor's boss had one HP value. Players who cleared every room arrived overpowered and walked through it; players who rushed hit a wall they could not damage.", pt: "O chefe de cada andar tinha um valor de HP. Quem limpava todas as salas chegava forte demais e passava por cima; quem corria batia numa parede que não conseguia arranhar." }
          },
          after: {
            value: { en: "×1.00 → ×2.34", pt: "×1,00 → ×2,34" },
            body: { en: "HP became base_HP × log₂.₃(rooms_cleared). Clear more and the boss grows to match, but logarithmically, so a full clear is tougher and never an impossible wall.", pt: "O HP virou HP_base × log₂,₃(salas_limpas). Limpar mais faz o chefe crescer junto, mas logaritmicamente, então limpar tudo é mais difícil e nunca uma parede impossível." }
          },
          note: { en: "The multiplier is the same number for both players. What changed is that it now reads their route instead of the floor sign.", pt: "O multiplicador é o mesmo número para os dois jogadores. O que mudou é que agora ele lê a rota deles, não a placa do andar." }
        },
        {
          title: { en: "Boss damage was picked by hand", pt: "O dano do chefe era escolhido na mão" },
          before: {
            value: { en: "Tuned per attack", pt: "Ajustado por ataque" },
            body: { en: "Every attack's damage was a number I chose and re-chose. It felt right against the build I happened to be testing with and wrong against the other two.", pt: "O dano de cada ataque era um número que eu escolhia e reescolhia. Parecia certo contra a build que eu estava testando e errado contra as outras duas." }
          },
          after: {
            value: { en: "ideal_HP ÷ hits_target", pt: "HP_ideal ÷ hits_alvo" },
            body: { en: "Damage is derived from the player's expected HP divided by how many hits of that attack should kill. Retuning a whole floor became a one-cell change in the sheet.", pt: "O dano é derivado do HP esperado do jogador dividido por quantos golpes daquele ataque deveriam matar. Reajustar um andar inteiro virou mudar uma célula na planilha." }
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
          en: "Instead of hand-picking boss damage, I derived each attack from the player's *expected* HP divided by how many hits of that attack should kill, so the laser might threaten a 5-hit kill and the broom a 3-hit kill, staying fair for every build.",
          pt: "Em vez de escolher o dano do chefe na mão, derivei cada ataque do HP *esperado* do jogador dividido por quantos golpes daquele ataque deveriam matar, então o laser ameaça matar em 5 hits e a vassourada em 3, ficando justo para qualquer build."
        }
      },
      balancing: {
        formula: {
          en: "HP_boss = base_HP × log₂.₃(rooms_cleared)",
          pt: "HP_boss = HP_base × log₂,₃(salas_limpas)"
        },
        body: {
          en: "The whole game lived in one balancing spreadsheet: player base stats, per-room scaling, enemy and boss tables, and DPS curves for the extreme builds. The interesting piece is the boss HP: it doesn't scale with the floor, it scales with how many rooms you actually cleared, on a logarithm (base 2.3). Clear more rooms and you arrive stronger, so the boss grows to match, but logarithmically, so a full clear makes it tougher without ever becoming an impossible wall.",
          pt: "O jogo inteiro vivia numa única planilha de balanceamento: stats base do jogador, escalonamento por sala, tabelas de inimigos e chefes, e curvas de DPS das builds extremas. A parte interessante é o HP do chefe: ele não escala com o andar, escala com quantas salas você realmente limpou, num logaritmo (base 2,3). Limpar mais salas te deixa mais forte, então o chefe cresce junto, mas logaritmicamente, ficando mais difícil sem nunca virar uma parede impossível."
        },
        tables: [
          {
            caption: { en: "Boss HP: logarithmic scaling by rooms cleared", pt: "HP do chefe: escala logarítmica por salas limpas" },
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
              [{ en: "Warrior", pt: "Guerreiro" }, "175", "33.3", "N/A"],
              [{ en: "Mage", pt: "Mago" }, "100", "20", "10"],
              [{ en: "Intern", pt: "Estagiário" }, "100", "N/A", "10"]
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
      charts: [
        {
          title: { en: "Boss HP against rooms cleared", pt: "HP do chefe contra salas limpas" },
          desc: {
            en: "Boss HP is flat until the fourth room is cleared, then rises on a base-2.3 logarithm, flattening again by the seventh.",
            pt: "O HP do chefe é plano até a quarta sala limpa, depois sobe num logaritmo de base 2,3, achatando de novo na sétima."
          },
          caption: {
            en: "The curve bends early and then flattens: clearing every room makes the boss 2.34× tougher, never 8× tougher. That flattening is the whole point of a logarithm here.",
            pt: "A curva dobra cedo e depois achata: limpar todas as salas deixa o chefe 2,34× mais duro, nunca 8× mais duro. Esse achatamento é justamente o ponto do logaritmo aqui."
          },
          xLabel: { en: "Rooms cleared", pt: "Salas limpas" },
          yLabel: { en: "Boss HP", pt: "HP do chefe" },
          series: [
            {
              label: { en: "Boss HP", pt: "HP do chefe" },
              color: "var(--pink)",
              points: [[0, 4252], [1, 4252], [2, 4252], [3, 4252], [4, 7078], [5, 8217], [6, 9148], [7, 9935]]
            }
          ],
          annotations: [
            { x: 1.5, y: 4252, text: { en: "×1.00", pt: "×1,00" } },
            { x: 6.6, y: 9935, text: { en: "×2.34", pt: "×2,34" } }
          ]
        }
      ],
      implementation: {
        en: "The sheet was the source of truth; values flowed into Unity and got hammered in weekly playtests. Because damage came from the player's expected survivability, rebalancing a whole floor was often a one-cell change.",
        pt: "A planilha era a fonte da verdade; os valores iam para a Unity e apanhavam nos playtests semanais. Como o dano vinha da sobrevivência esperada do jogador, rebalancear um andar inteiro era muitas vezes mudar uma célula."
      },
      learnings: {
        en: "Deriving enemy and boss damage from the player's expected survivability kept difficulty consistent across builds that looked nothing alike. Owning design, sound, UI and art at once taught me to make each discipline serve the same core loop.",
        pt: "Derivar o dano de inimigos e chefes da sobrevivência esperada do jogador manteve a dificuldade consistente entre builds completamente diferentes. Cuidar de design, som, UI e arte ao mesmo tempo me ensinou a fazer cada disciplina servir ao mesmo core loop."
      },
      links: [
        { label: { en: "Play on itch.io", pt: "Jogar na itch.io" }, url: "https://prismagamelab.itch.io/esqueleto-chico-ossos-do-oficio", kind: "play" }
      ]
    }
  },
  {
    id: "maguitos",
    accent: "#FF4F87",
    name: { en: "PROJECT MAGUITOS", pt: "PROJETO MAGUITOS" },
    type: { en: "Roguelite dungeon crawler (PC)", pt: "Roguelite de masmorra (PC)" },
    role: { en: "Game & Systems Designer / Gameplay Programmer", pt: "Game/Systems Designer e Gameplay Programmer" },
    tools: ["Godot", "GDScript"],
    // Static frame on purpose: the animated maguitos-hero.gif is 6.5 MB and
    // decoding it on the home page stalled scrolling. The GIF stays in
    // assets/maguitos/ until it is re-encoded as a small looping video.
    cover: "./assets/img/projects/maguitos-gameplay-1.webp",
    coverAlt: {
      en: "A turn-based fight in progress: the party of three toddlers facing four Stray Humpty enemies before a mossy shrine.",
      pt: "Uma luta por turnos em andamento: a party de três bebês enfrentando quatro Stray Humpty diante de um santuário musgoso."
    },
    summary: {
      en: "A roguelite dungeon crawler where you play a coward caretaker who can't cast a single spell, so you send the toddlers in your care to fight instead. Built by two people, it's driven by an enemy AI that scores every (skill, target) pair by weighted random, with intelligence and conviction as separate difficulty dials. Still in active development.",
      pt: "Um roguelite de masmorra em que você é um cuidador covarde que não consegue lançar nem o feitiço mais simples, então manda os bebês sob seus cuidados para a luta. Feito por duas pessoas, é movido por uma IA inimiga que pontua cada par (skill, alvo) por sorteio ponderado, com inteligência e convicção como diais de dificuldade separados. Ainda em desenvolvimento ativo."
    },
    caseStudy: {
      results: [
        {
          value: { en: "2 dials", pt: "2 controles" },
          label: { en: "Intelligence and conviction, tuned separately", pt: "Inteligência e convicção, ajustadas em separado" }
        },
        {
          value: { en: "0 team AI", pt: "0 IA de time" },
          label: { en: "Group coordination emerges from a shared intent board", pt: "Coordenação de grupo emerge de um quadro de intenções" }
        },
        {
          value: { en: "1 shared pool", pt: "1 pool compartilhado" },
          label: { en: "Every turn is a negotiation between three characters", pt: "Cada turno é uma negociação entre três personagens" }
        }
      ],
      meta: {
        timeline: { en: "In development, phases 1 and 2 shipped", pt: "Em desenvolvimento, fases 1 e 2 entregues" },
        team: { en: "2, design and all GDScript mine, art and UI by a collaborator", pt: "2, design e todo o GDScript meus, arte e UI de um colaborador" },
        engine: "Godot 4.7 · GDScript",
        platform: { en: "PC", pt: "PC" }
      },
      overview: {
        en: "Project Maguitos is a roguelite dungeon crawler currently in active development, built by a two-person team. You play a caretaker at a magical daycare who can't cast even the simplest spell. On your first day almost every child in your care vanishes into the Cursed Forest, and your only way out is to let the toddlers themselves fight for you. It's a run of back-to-back encounters: survive a fixed number of battles, rescue toddlers, swap your party, and reach the boss intact.",
        pt: "Projeto Maguitos é um roguelite de masmorra atualmente em desenvolvimento ativo, feito por uma dupla. Você é um cuidador de uma creche mágica que não consegue lançar nem o feitiço mais simples. No seu primeiro dia, quase todas as crianças sob seus cuidados desaparecem na Floresta Amaldiçoada, e sua única saída é deixar os próprios bebês lutarem por você. É uma sequência de combates um atrás do outro: sobreviva a um número fixo de batalhas, resgate bebês, troque sua party e chegue ao chefe inteiro."
      },
      role: {
        en: "Game & Systems Designer / Gameplay Programmer on a two-person team. I own the design and the entire GDScript codebase: the roguelite run structure, the toddler-swap progression, the shared-MP economy, and the enemy AI (action scoring, charges, the intent board, personalities and the intelligence/conviction split). A collaborator handles art and interface.",
        pt: "Game & Systems Designer / Gameplay Programmer numa dupla. Conduzo o design e todo o código em GDScript: a estrutura do run roguelite, a progressão por troca de bebês, a economia de MP compartilhado e a IA dos inimigos (pontuação de ações, cargas, o quadro de intenções, personalidades e a separação entre inteligência e convicção). Um colaborador cuida da arte e da interface."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "Enemy AI design & tuning", pt: "Design e ajuste da IA dos inimigos" },
            { en: "Combat systems", pt: "Sistemas de combate" },
            { en: "Skill & class design", pt: "Design de skills & classes" },
            { en: "Balancing (stats & costs)", pt: "Balanceamento (stats & custos)" },
            { en: "Tag-affinity model", pt: "Modelo de afinidade por tags" },
            { en: "Roguelite run structure", pt: "Estrutura do run roguelite" }
          ]
        },
        {
          group: { en: "Programming", pt: "Programação" },
          items: [
            { en: "Weighted-random action scorer", pt: "Pontuador de ações por sorteio ponderado" },
            { en: "Intent board & personality system", pt: "Quadro de intenções e sistema de personalidades" },
            { en: "Battle state machine", pt: "Máquina de estados de batalha" },
            { en: "Polymorphic skill scoring", pt: "Pontuação polimórfica de skills" },
            { en: "Shared-MP economy", pt: "Economia de MP compartilhado" }
          ]
        }
      ],
      challenge: {
        en: "Enemies do not run a fixed behavior tree. Each one builds its list of legal actions, scores every one, and picks by weighted random. The goal was difficulty that is not just bigger HP and damage, but enemies that see more of the board and misplay less, while staying legible enough that shielding a fragile toddler visibly pays off.",
        pt: "Os inimigos não rodam uma árvore de comportamento fixa. Cada um monta sua lista de ações legais, pontua cada uma e escolhe por sorteio ponderado. O objetivo era uma dificuldade que não fosse só mais HP e dano, mas inimigos que enxergam mais do tabuleiro e erram menos, legíveis o bastante para que proteger um bebê frágil valha a pena de forma visível."
      },
      coreLoop: {
        steps: [
          { en: "Fight a back-to-back encounter", pt: "Enfrentar um combate seguido de outro" },
          { en: "Rescue a toddler", pt: "Resgatar um bebê" },
          { en: "Swap your party from the rescued pool", pt: "Trocar sua party a partir do pool resgatado" },
          { en: "Reach the boss intact", pt: "Chegar ao chefe inteiro" }
        ],
        note: {
          en: "Toddlers do not level up by fighting: you get stronger by swapping, not grinding. The toddler that saved you in stage two becomes currency for a stronger one in stage four, so progression is a run of painful choices instead of a number that climbs on its own.",
          pt: "Os bebês não sobem de nível lutando: você fica mais forte trocando, não grindando. O bebê que te salvou na fase dois vira moeda de troca por um mais forte na fase quatro, então a progressão é uma sequência de escolhas dolorosas, não um número que sobe sozinho."
        }
      },
      progression: {
        en: "All three toddlers share a single MP pool: there are no individual reserves. Each skill costs a flat value or a percentage of the group's max MP, with a live preview showing the remaining MP as you build the turn. A shared pool turns every turn into a negotiation between the three characters: one toddler's expensive skill starves the others, so the party has to coordinate its spending as a team, not unit by unit.",
        pt: "Os três bebês dividem um único pool de MP: não há reservas individuais. Cada skill custa um valor fixo ou uma porcentagem do MP máximo do grupo, com um preview ao vivo mostrando o MP restante enquanto você monta o turno. Um pool compartilhado transforma cada turno numa negociação entre os três personagens: a skill cara de um bebê sufoca os outros, então a party precisa coordenar seus gastos como time, não unidade por unidade."
      },
      systems: [
        {
          title: { en: "Action = skill + target", pt: "Ação = skill + alvo" },
          body: {
            en: "The unit of decision is the pair (skill, target), not the skill alone. The enemy generates every legal action, filters the useless ones, and scores what remains. That way it reasons about consequence, \"this skill on this target is a kill\", instead of choosing skill and target as separate, dumber steps.",
            pt: "A unidade de decisão é o par (skill, alvo), não a skill sozinha. O inimigo gera todas as ações legais, filtra as inúteis e pontua o que sobra. Assim ele raciocina sobre consequência, \"essa skill nesse alvo é uma morte\", em vez de escolher skill e alvo em etapas separadas e mais burras."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/maguitos-gameplay-3.webp",
            alt: { en: "Isara casting a skill on the last remaining Stray Humpty", pt: "Isara conjurando uma skill no último Stray Humpty restante" },
            caption: { en: "The same skill scores differently on every enemy on the field. The pair is what gets ranked.", pt: "A mesma skill pontua diferente em cada inimigo do campo. O par é o que entra no ranking." }
          }
        },
        {
          title: { en: "Charges, not MP", pt: "Cargas, não MP" },
          body: {
            en: "Enemies have no MP. Their resource is charges per skill, each with a number of uses and a recharge time. It paces the strong moves, and the player learns to count the window: his heavy hit is back in two turns. There is no UI for it, because the read is the pattern.",
            pt: "Os inimigos não têm MP. O recurso deles é carga por skill, cada uma com um número de usos e um tempo de recarga. Isso dá ritmo aos golpes fortes, e o jogador aprende a contar a janela: o golpe pesado dele volta em dois turnos. Não há UI para isso, porque a leitura é o padrão."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/maguitos-gameplay-2.webp",
            alt: { en: "Battle log showing a flurry of damage dealt to a Stray Humpty", pt: "Log de batalha mostrando uma sequência de dano causado a um Stray Humpty" },
            caption: { en: "The log is the only place charges surface. You count turns, not a bar.", pt: "O log é o único lugar em que as cargas aparecem. Você conta turnos, não uma barra." }
          }
        },
        {
          title: { en: "Decide early, execute late", pt: "Decidir cedo, executar tarde" },
          body: {
            en: "Each enemy locks its action at the start of the round and executes only after the party resolves, with no re-routing except when a locked target dies. That commitment is what makes Defend worth using: the enemy already chose to hit your fragile toddler before you shielded it, so shielding saves it.",
            pt: "Cada inimigo trava sua ação no início da rodada e só executa depois que a party resolve, sem redirecionar, exceto quando o alvo travado morre. É esse compromisso que faz Defender valer a pena: o inimigo já escolheu acertar seu bebê frágil antes de você protegê-lo, então proteger o salva."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/maguitos-gameplay-1.webp",
            alt: { en: "The party facing four Stray Humpty enemies before a mossy shrine", pt: "A party enfrentando quatro Stray Humpty diante de um santuário musgoso" },
            caption: { en: "Four enemies have already decided by the time you get to act. Nothing here telegraphs it.", pt: "Quatro inimigos já decidiram quando chega a sua vez de agir. Nada aqui telegrafa isso." }
          }
        },
        {
          title: { en: "The intent board", pt: "O quadro de intenções" },
          body: {
            en: "Enemies decide in sequence, and each one records its target and expected damage on a board shared for the round. Later deciders read effective HP before they score, so the second enemy sees an already-dead target and redirects on its own. Group coordination with no team AI written.",
            pt: "Os inimigos decidem em sequência, e cada um registra seu alvo e o dano esperado num quadro compartilhado na rodada. Quem decide depois lê o HP efetivo antes de pontuar, então o segundo inimigo vê um alvo já morto e redireciona sozinho. Coordenação de grupo sem nenhuma IA de time escrita."
          },
          visual: {
            kind: "stat",
            pairs: [
              { from: "40 HP", to: "0 HP", label: { en: "Effective HP the second enemy reads after the first locks a lethal hit", pt: "HP efetivo que o segundo inimigo lê depois de o primeiro travar um golpe letal" } }
            ],
            caption: { en: "The 'likely kill' bonus vanishes, so the second enemy looks elsewhere. A low-intelligence enemy skips the check and hits the corpse anyway.", pt: "O bônus de 'kill provável' some, então o segundo inimigo procura outro alvo. Um inimigo de inteligência baixa pula a checagem e acerta o cadáver mesmo assim." }
          }
        }
      ],
      process: [
        {
          title: { en: "The fixed role tag was lying", pt: "A etiqueta de papel fixo estava mentindo" },
          before: {
            value: { en: "tank / dps / support", pt: "tank / dps / suporte" },
            body: { en: "Every unit carried a hand-written role, and the AI targeted off it. Celetro was tagged tank while holding the highest Witness in the party. Isara was dps by default when what defines her is MP Regen, 2.5 times the others.", pt: "Cada unidade carregava um papel escrito à mão, e a IA mirava por ele. Celetro estava etiquetado como tank enquanto tinha o maior Witness da party. Isara era dps por padrão quando o que a define é o MP Regen, 2,5 vezes o dos outros." }
          },
          after: {
            value: { en: "primary_stat + secondary_stat", pt: "primary_stat + secondary_stat" },
            body: { en: "The tag was ripped out and replaced by key stats read from the real numbers, plus a tier tiebreaker. Buffs finally land on the right target, and a dead rule stopped needing maintenance.", pt: "A etiqueta foi arrancada e substituída por key stats lidos dos números reais, mais um desempate por tier. Os buffs finalmente acertam o alvo certo, e uma regra morta parou de exigir manutenção." }
          }
        },
        {
          title: { en: "Difficulty was going to be bigger numbers", pt: "A dificuldade ia ser números maiores" },
          before: {
            value: { en: "More HP, more damage", pt: "Mais HP, mais dano" },
            body: { en: "The default plan was to scale enemy stats per difficulty. It makes fights longer without making them harder to read, and it teaches the player nothing new.", pt: "O plano padrão era escalar os stats dos inimigos por dificuldade. Isso deixa as lutas mais longas sem deixá-las mais difíceis de ler, e não ensina nada novo ao jogador." }
          },
          after: {
            value: { en: "Conviction 0 → 3", pt: "Convicção 0 → 3" },
            body: { en: "One exponent on the action draw. At conviction 0 every action has a 20% chance and the enemy plays erratically; at conviction 3 its best action is picked 67% of the time. Same stats, same weights.", pt: "Um expoente no sorteio de ações. Com convicção 0, toda ação tem 20% de chance e o inimigo joga de forma errática; com convicção 3, a melhor ação é escolhida 67% das vezes. Mesmos stats, mesmos pesos." }
          },
          note: { en: "Intelligence is what the enemy wants. Conviction is how much it obeys itself, and it is the dial the difficulty setting actually turns.", pt: "Inteligência é o que o inimigo quer. Convicção é o quanto ele obedece a si mesmo, e é o dial que a dificuldade realmente gira." }
        }
      ],
      combat: {
        formula: {
          en: "P(action) = weight^conviction / sum of weight^conviction",
          pt: "P(ação) = peso^convicção / soma de peso^convicção"
        },
        body: {
          en: "Two orthogonal channels drive the AI. Intelligence scales the situational weight: hit the vulnerable, avoid overkill, finish kills. Conviction is the exponent above, and it only decides how faithfully the enemy obeys its own preference. Personality biases the weights by skill tag, so a Hot-headed enemy wants damage and a Coward wants distance. High conviction on a bad personality makes an enemy stubborn, not smart.",
          pt: "Dois canais ortogonais conduzem a IA. Inteligência escala o peso situacional: acertar o vulnerável, evitar overkill, finalizar kills. Convicção é o expoente acima, e só decide o quanto o inimigo obedece à própria preferência. A personalidade enviesa os pesos por tag de skill, então um inimigo Esquentado quer dano e um Covarde quer distância. Convicção alta numa personalidade ruim deixa o inimigo teimoso, não esperto."
        }
      },
      balancing: {
        body: {
          en: "There was no separate spreadsheet: the balancing data lives directly in Godot Resource files (.tres). Characters, enemies and skills are all data, so tuning a stat or a skill cost is editing a resource in the inspector, never touching code. These are the prototype's shipped values.",
          pt: "Não havia planilha separada: os dados de balanceamento vivem direto em arquivos de Resource do Godot (.tres). Personagens, inimigos e skills são todos dados, então ajustar um atributo ou o custo de uma skill é editar um resource no inspetor, sem nunca tocar no código. Estes são os valores do protótipo."
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
      charts: [
        {
          title: { en: "Conviction sharpening the action draw", pt: "Convicção afiando o sorteio de ações" },
          desc: {
            en: "With five candidate actions weighted 10, 7, 5, 3 and 1, conviction 0 gives every action a 20% chance; conviction 1 gives the best action 38%; conviction 3 gives it 67%.",
            pt: "Com cinco ações candidatas de pesos 10, 7, 5, 3 e 1, convicção 0 dá 20% a cada ação; convicção 1 dá 38% à melhor; convicção 3 dá 67%."
          },
          caption: {
            en: "The same weights, three difficulties. Conviction never changes what the enemy wants, it changes how faithfully it obeys itself. That's why a high-conviction enemy with a bad personality plays worse, not better.",
            pt: "Os mesmos pesos, três dificuldades. A convicção nunca muda o que o inimigo quer, muda o quanto ele obedece a si mesmo. Por isso um inimigo de convicção alta com personalidade ruim joga pior, não melhor."
          },
          xLabel: { en: "Action, best to worst (weights 10 · 7 · 5 · 3 · 1)", pt: "Ação, da melhor à pior (pesos 10 · 7 · 5 · 3 · 1)" },
          yLabel: { en: "Chance of being picked", pt: "Chance de ser escolhida" },
          series: [
            {
              label: { en: "Conviction 0, erratic", pt: "Convicção 0, errático" },
              color: "var(--paper)",
              dashed: true,
              points: [[1, 0.2], [2, 0.2], [3, 0.2], [4, 0.2], [5, 0.2]]
            },
            {
              label: { en: "Conviction 1, plays its odds", pt: "Convicção 1, joga suas chances" },
              color: "var(--yellow)",
              points: [[1, 0.3846], [2, 0.2692], [3, 0.1923], [4, 0.1154], [5, 0.0385]]
            },
            {
              label: { en: "Conviction 3, near-deterministic", pt: "Convicção 3, quase determinístico" },
              color: "var(--pink)",
              points: [[1, 0.6684], [2, 0.2293], [3, 0.0835], [4, 0.018], [5, 0.0007]]
            }
          ]
        }
      ],
      implementation: {
        en: "Built in Godot 4.7. Each skill type carries its own estimator and score (ai_estimate and ai_score), with a damage default on the base class; heal, buff and DoT override it. A new skill or exception never touches the central scorer (the same pattern the game's resolve() uses elsewhere), which keeps the AI extensible without becoming one giant if-statement. Adding a combat mechanic means adding a subclass, not editing the AI's brain.",
        pt: "Feito em Godot 4.7. Cada tipo de skill carrega seu próprio estimador e pontuação (ai_estimate e ai_score), com um padrão de dano na classe base; cura, buff e DoT sobrescrevem isso. Uma skill nova ou uma exceção nunca toca o pontuador central (o mesmo padrão que o resolve() do jogo usa em outros lugares), o que mantém a IA extensível sem virar um if gigante. Adicionar uma mecânica de combate significa adicionar uma subclasse, não editar o cérebro da IA."
      },
      learnings: {
        en: "Phases 1 and 2 are implemented and verified in-editor. Splitting intelligence from conviction early is what made every later system click into place instead of fighting the others. Phase 3 is open: archetypes beyond the first roster, a tuning overlay to lock values during playtest, and bosses with triggers and phases layered over the same weight system.",
        pt: "As Fases 1 e 2 estão implementadas e verificadas no editor. Separar inteligência de convicção cedo foi o que fez cada sistema seguinte encaixar em vez de brigar com os outros. A Fase 3 está aberta: arquétipos além do elenco inicial, um overlay de ajuste para travar valores durante o playtest, e chefes com gatilhos e fases sobre o mesmo sistema de pesos."
      }
    }
  },
  {
    id: "clicachorro",
    accent: "#F5F1E8",
    name: "ClicaChorro",
    playable: true,
    playUrl: "https://lope.design/clicachorro",
    type: { en: "Idle/clicker game (web)", pt: "Idle/clicker (web)" },
    role: { en: "Solo Developer & Systems Designer", pt: "Desenvolvedor Solo & Systems Designer" },
    tools: ["JavaScript", "HTML/CSS", "Google Sheets"],
    cover: "./assets/img/projects/clicachorro-gameplay-complete.webp",
    coverAlt: {
      en: "A fully decorated room: band poster, boombox, car and a sleepy plush toy beside the dog",
      pt: "Um quarto totalmente decorado: pôster de banda, boombox, carro e uma pelúcia sonolenta ao lado do cachorro"
    },
    summary: {
      en: "A cozy idle-clicker where the goal is to fully furnish the room where your dog lives: click to earn affection, spend it on furniture and upgrades, one piece at a time. A solo web project whose entire economy is derived from a single number (how long the run should take) through one closed-form balancing spreadsheet.",
      pt: "Um idle-clicker aconchegante onde o objetivo é completar o quarto onde seu cachorro mora: clique para ganhar carinho e gaste em móveis e upgrades, peça por peça. Um projeto solo para web cuja economia inteira é derivada de um único número (quanto tempo a run deve durar) a partir de uma única planilha de balanceamento de forma fechada."
    },
    caseStudy: {
      heroImage: {
        src: "./assets/img/projects/clicachorro-gameplay-complete.webp",
        alt: { en: "A fully decorated room: band poster, boombox, car and a sleepy plush toy beside the dog", pt: "Um quarto totalmente decorado: pôster de banda, boombox, carro e uma pelúcia sonolenta ao lado do cachorro" }
      },
      results: [
        {
          value: { en: "45.0 min", pt: "45,0 min" },
          label: { en: "Target session length, hit exactly", pt: "Duração-alvo da sessão, atingida com exatidão" }
        },
        {
          value: { en: "1 input cell", pt: "1 célula de input" },
          label: { en: "Retunes all 12 stages", pt: "Retuna os 12 estágios" }
        },
        {
          value: { en: "618 → 108,780", pt: "618 → 108.780" },
          label: { en: "Cost curve, derived not authored", pt: "Curva de custo, derivada e não escrita à mão" }
        }
      ],
      meta: {
        team: { en: "Solo, design, code, art and audio", pt: "Solo, design, código, arte e áudio" },
        engine: { en: "JavaScript · Google Sheets", pt: "JavaScript · Google Sheets" },
        platform: { en: "Web", pt: "Web" }
      },
      overview: {
        en: "A cozy browser idle-clicker. You click to shower a dog with affection, that affection buys helpers that earn for you, and each purchase unlocks another piece of furniture. Built solo to test one idea: a clicker's economy can be derived from how long the run should last.",
        pt: "Um idle-clicker aconchegante pro navegador. Você clica para encher um cachorro de carinho, esse carinho compra ajudantes que rendem sozinhos, e cada compra libera mais uma peça de mobília. Feito solo para testar uma ideia: a economia de um clicker pode ser derivada de quanto tempo a run deve durar."
      },
      role: {
        en: "Solo: I designed the game, wrote the JavaScript, drew the art and made the sound. The core of it is the balancing model: a closed-form spreadsheet where the target time-to-beat drives every cost and output value in the economy.",
        pt: "Solo: projetei o jogo, escrevi o JavaScript, fiz a arte e o som. O núcleo dele é o modelo de balanceamento: uma planilha de forma fechada onde o tempo-alvo para zerar comanda cada valor de custo e produção da economia."
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
          en: "Clicking earns affection; affection buys helpers and upgrades that idle-earn for you; enough of it unlocks the next piece of furniture for the room. Every piece costs more affection than the last, so the loop keeps pulling forward, toward the twelfth and final piece that completes the room and ends the game.",
          pt: "Clicar rende carinho; carinho compra ajudantes e upgrades que rendem sozinhos; carinho suficiente libera a próxima peça de mobília do quarto. Cada peça custa mais carinho que a anterior, então o loop segue puxando para frente, até a décima segunda e última peça que completa o quarto e encerra o jogo."
        }
      },
      systems: [
        {
          title: { en: "The room is the progress bar", pt: "O quarto é a barra de progresso" },
          body: {
            en: "Twelve furniture unlocks give the number-go-up a spine. You are not buying multipliers, you are filling a room, and the run ends when the room is full. That also fixes the stage count at twelve, which the economy needs as a hard input.",
            pt: "Doze móveis desbloqueáveis dão uma espinha à escalada de números. Você não compra multiplicadores, você enche um quarto, e a run acaba quando o quarto enche. Isso também trava o número de estágios em doze, que é um input fixo de que a economia precisa."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/clicachorro-gameplay-start.webp",
            alt: { en: "A freshly started run: just the dog against an empty room", pt: "Uma run recém-iniciada: só o cachorro num quarto vazio" },
            caption: { en: "Minute zero. Everything the player will earn over the next 45 minutes is missing from this frame.", pt: "Minuto zero. Tudo que o jogador vai ganhar nos próximos 45 minutos está faltando neste quadro." }
          }
        },
        {
          title: { en: "One stage, one purchase", pt: "Um estágio, uma compra" },
          body: {
            en: "The shop is where a stage actually happens. Each tier of click power and idle helper is stage i in the model, so the thing the player reads as a shopping list is the same twelve-row table the spreadsheet solves.",
            pt: "A loja é onde um estágio de fato acontece. Cada tier de poder de clique e de ajudante passivo é o estágio i do modelo, então o que o jogador lê como lista de compras é a mesma tabela de doze linhas que a planilha resolve."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/clicachorro-gameplay-shop.webp",
            alt: { en: "The upgrade shop open, showing click-power purchases", pt: "A loja de upgrades aberta, mostrando compras de poder de clique" },
            caption: { en: "No price in this list was typed by hand. Every one is read from the solved curve.", pt: "Nenhum preço desta lista foi digitado na mão. Todos são lidos da curva resolvida." }
          }
        },
        {
          title: { en: "Costs outrun output on purpose", pt: "Custos correm mais que a produção de propósito" },
          body: {
            en: "Costs grow by a = 1.60 per stage, idle output by b = 1.45. Because a is larger, each piece takes slightly longer than the last, so the run swells toward the finale instead of flatlining. The total is still fixed, because the sum is a geometric series.",
            pt: "Os custos crescem por a = 1,60 a cada estágio, a produção passiva por b = 1,45. Como a é maior, cada peça leva um pouco mais que a anterior, então a run cresce rumo ao final em vez de estagnar. O total continua fixo, porque a soma é uma série geométrica."
          },
          visual: {
            kind: "stat",
            pairs: [
              { from: { en: "2.06", pt: "2,06" }, to: { en: "6.09", pt: "6,09" }, label: { en: "Minutes to earn the first piece, against the twelfth", pt: "Minutos para ganhar a primeira peça, contra a décima segunda" } },
              { from: "618", to: { en: "108,780", pt: "108.780" }, label: { en: "Affection cost across the same twelve stages", pt: "Custo em carinho ao longo dos mesmos doze estágios" } }
            ],
            caption: { en: "The stretch is the design. A flat r = 1 would make all twelve pieces cost the same 3.75 minutes and the ending would land as a shrug.", pt: "O esticamento é o design. Um r = 1 plano faria as doze peças custarem os mesmos 3,75 minutos e o final cairia num dar de ombros." }
          }
        },
        {
          title: { en: "The room fills as proof", pt: "O quarto enche como prova" },
          body: {
            en: "Every purchase puts an object in the scene, so the player never has to read a number to know where they are in the run. A half-furnished room is a legible mid-game state, which is also what made playtest feedback specific enough to act on.",
            pt: "Cada compra coloca um objeto na cena, então o jogador nunca precisa ler um número para saber onde está na run. Um quarto meio mobiliado é um estado de meio-jogo legível, o que também deixou o feedback de playtest específico o bastante para agir."
          },
          visual: {
            kind: "image",
            src: "./assets/img/projects/clicachorro-gameplay-furniture.webp",
            alt: { en: "Mid-run room with a few furniture unlocks: a blank poster frame, a cabinet and a plant", pt: "Quarto no meio da run com alguns móveis desbloqueados: um quadro em branco, um armário e uma planta" },
            caption: { en: "Roughly minute ten. Playtesters described progress by naming objects, not by quoting affection totals.", pt: "Por volta do minuto dez. Os playtesters descreviam o progresso nomeando objetos, não citando totais de carinho." }
          }
        }
      ],
      process: [
        {
          title: { en: "The costs were going to be picked by feel", pt: "Os custos iam ser escolhidos no feeling" },
          before: {
            value: { en: "40 numbers by hand", pt: "40 números na mão" },
            body: { en: "The default way to build a clicker is to type a cost, play it, and nudge it. Forty coupled numbers chasing a feel, where fixing the mid-game breaks the ending and there is no way to prove the run is the length you wanted.", pt: "O jeito padrão de fazer um clicker é digitar um custo, jogar e ajustar. Quarenta números acoplados atrás de um feeling, onde consertar o meio-jogo quebra o final e não há como provar que a run tem a duração que você queria." }
          },
          after: {
            value: { en: "1 input cell", pt: "1 célula de input" },
            body: { en: "Session length became the input and the geometric sum was inverted for the base cost C0. Target 45 minutes, get C0 = 618, and the twelve stage times sum back to 45.00 exactly. Retuning to 90 minutes is one edit.", pt: "A duração da sessão virou o input e a soma geométrica foi invertida para o custo base C0. Alvo de 45 minutos, sai C0 = 618, e os doze tempos por estágio somam exatamente 45,00. Retunar para 90 minutos é uma única edição." }
          },
          note: { en: "The tuner further down this page is that spreadsheet, running live. Drag the target and watch every cost re-solve.", pt: "O tuner mais abaixo nesta página é essa planilha, rodando ao vivo. Arraste o alvo e veja cada custo ser resolvido de novo." }
        },
        {
          title: { en: "Playtesters said the mid-game sagged", pt: "Os playtesters disseram que o meio-jogo caía" },
          before: {
            value: { en: "A pass over 12 stages", pt: "Uma passada por 12 estágios" },
            body: { en: "With hand-written costs, that note means reopening every stage between the fourth and the ninth and hoping the total still lands near the target.", pt: "Com custos escritos à mão, essa nota significa reabrir todo estágio entre o quarto e o nono e torcer pro total ainda cair perto do alvo." }
          },
          after: {
            value: { en: "r = a ÷ b", pt: "r = a ÷ b" },
            body: { en: "The shape of the curve lives in one ratio. Moving r flattens or steepens the whole run at once, and C0 re-solves so the total stays at the target. The sag became a one-cell edit.", pt: "O formato da curva vive numa razão só. Mexer em r achata ou inclina a run inteira de uma vez, e o C0 se resolve de novo pro total ficar no alvo. A queda virou uma edição de uma célula." }
          }
        }
      ],
      progression: {
        en: "Twelve furniture unlocks take the room from empty to fully decorated. Because the cost/output ratio r = a/b is greater than 1, each piece costs a little more time than the last (about 2.1 minutes at the start, climbing to 6.1 minutes for the finale), so the run swells toward a climax instead of flatlining. Costs run 618 → 108,780 affection; idle output 5 → 298/s.",
        pt: "Doze móveis desbloqueáveis levam o quarto de vazio a totalmente decorado. Como a razão custo/produção r = a/b é maior que 1, cada peça custa um pouco mais de tempo que a anterior (cerca de 2,1 minutos no início, subindo a 6,1 minutos no final), então a run cresce rumo a um clímax em vez de estagnar. Custos vão de 618 → 108.780 de carinho; produção passiva de 5 → 298/s."
      },
      balancing: {
        formula: {
          en: "C0 = target_time × P0 × (r − 1) ÷ (rᴺ − 1),   r = a ÷ b",
          pt: "C0 = tempo_alvo × P0 × (r − 1) ÷ (rᴺ − 1),   r = a ÷ b"
        },
        body: {
          en: "The approach: instead of picking costs by feel, I set a target time-to-beat and inverted the geometric sum that describes a clicker economy. The time spent on each stage is t_i = (C0 ÷ P0) × rⁱ, and summing those is a geometric series, so I solved it backwards for the base cost C0. That makes the target time command the whole curve. One spreadsheet, one input cell: retuning a 45-minute game into a 90-minute one is a single edit, and the per-stage times always sum back exactly to the target.",
          pt: "A abordagem: em vez de escolher custos no feeling, defini um tempo-alvo para zerar e inverti a soma geométrica que descreve a economia de um clicker. O tempo gasto em cada estágio é t_i = (C0 ÷ P0) × rⁱ, e somar isso é uma série geométrica, então resolvi ao contrário para o custo base C0. Isso faz o tempo-alvo comandar a curva inteira. Uma planilha, uma célula de input: retunar um jogo de 45 minutos para 90 é uma única edição, e os tempos por estágio sempre somam exatamente o alvo."
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
      tuner: { targetMinutes: 45 },
      artifacts: [
        {
          kind: { en: "Spreadsheet · xlsx", pt: "Planilha · xlsx" },
          label: { en: "The ClicaChorro balancing sheet", pt: "A planilha de balanceamento do ClicaChorro" },
          note: {
            en: "The live workbook, bilingual. Sheet 1 is the model: blue cells are the six inputs, every black cell is a formula, and the 12-stage curve recalculates as you type. Sheet 2 is the written derivation of C0. 10 KB.",
            pt: "A pasta de trabalho viva, bilíngue. A aba 1 é o modelo: células azuis são os seis inputs, toda célula preta é fórmula, e a curva de 12 estágios recalcula enquanto você digita. A aba 2 é a derivação escrita do C0. 10 KB."
          },
          file: "./assets/clicachorro-balancing.xlsx"
        }
      ],
      implementation: {
        en: "The sheet is the source of truth; the web build reads the solved curve as data, so the JavaScript never hardcodes a cost. Because the economy is derived, playtest notes like 'the mid-game sags' became a tweak to one growth ratio rather than a manual pass over every stage.",
        pt: "A planilha é a fonte da verdade; o build web lê a curva resolvida como dados, então o JavaScript nunca cravou um custo na mão. Como a economia é derivada, notas de playtest como 'o meio-jogo cai' viravam um ajuste em uma razão de crescimento, não uma passada manual por cada estágio."
      },
      learnings: {
        en: "Deriving the economy from the target session length turned balancing from guesswork into a solved equation. Building solo across design, code, art and sound taught me to let one system (the sheet) keep the others in line.",
        pt: "Derivar a economia da duração-alvo da sessão transformou o balanceamento de chute em equação resolvida. Fazer tudo sozinho entre design, código, arte e som me ensinou a deixar um sistema (a planilha) manter os outros alinhados."
      },
      links: [
        { label: { en: "Play ClicaChorro", pt: "Jogar ClicaChorro" }, url: "https://lope.design/clicachorro", kind: "play" }
      ]
    }
  }
];
