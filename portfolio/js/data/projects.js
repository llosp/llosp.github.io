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
      en: "You're an accountant hired by letter to collect on a town full of outlaws, one bullet per debt. The whole game is one button: wait for the count to hit zero, then draw. Nobody shoots faster than you, so every outlaw cheats the count instead, each one in the way their character would. Made in 4 days for GMTK Jam 2026; placed 21st.",
      pt: "Você é um contador contratado por carta para cobrar uma cidade cheia de fora da lei, uma bala por dívida. O jogo inteiro é um botão: espere a contagem chegar a zero e saque. Ninguém saca mais rápido que você, então cada fora da lei falsifica a contagem, cada um do jeito que o personagem dele falsificaria. Feito em 4 dias para a GMTK Jam 2026; ficou em 21º."
    },
    caseStudy: {
      heroImage: {
        src: "./assets/img/projects/count-me-dead-gameplay-1.webp",
        alt: {
          en: "A duel against Hoarse Ryder: the timer still reads 9 when the player fires, and TOO EARLY! flashes across the screen",
          pt: "Um duelo contra Hoarse Ryder: o timer ainda marca 9 quando o jogador atira, e TOO EARLY! pisca na tela"
        }
      },
      results: [
        { value: { en: "21st / 10,587", pt: "21º / 10.587" },
          label: { en: "GMTK Jam 2026, top 0.2%", pt: "GMTK Jam 2026, top 0,2%" } },
        { value: { en: "218 ratings", pt: "218 avaliações" },
          label: { en: "10× the jam average of 21", pt: "10× a média da jam, de 21" } },
        { value: { en: "5 bosses", pt: "5 chefes" },
          label: { en: "One button, four days", pt: "Um botão, quatro dias" } }
      ],
      meta: {
        timeline: { en: "4 days · GMTK Jam 2026", pt: "4 dias · GMTK Jam 2026" },
        team: { en: "3, design, code and audio mine", pt: "3, design, código e áudio meus" },
        studio: "Wolfish Studios",
        engine: "Godot 4 · GDScript",
        platform: { en: "Web", pt: "Web" }
      },
      overview: {
        en: "The game opens on a letter: \"Dear Accountant, this city is drowning in criminals who leave nothing behind but unpaid debts. Do not mistake this for a call for heroism. Balance the ledger, and make sure every criminal pays what they owe.\" So you ride in and work through five names, one location at a time, and the ledger you're balancing is a countdown. The duel never changes, a counter ticks down, you draw on zero, but every outlaw cooks the books differently, and the last one turns out to have written the letter. Made in 4 days for GMTK Jam 2026, where it finished 21st with 218 ratings and over 150 comments.",
        pt: "O jogo abre numa carta: \"Caro Contador, esta cidade está afogada em criminosos que não deixam nada além de dívidas não pagas. Não confunda isto com um chamado ao heroísmo. Equilibre o livro-caixa e garanta que todo criminoso pague o que deve.\" Então você chega e percorre cinco nomes, um local por vez, e o livro que você está equilibrando é uma contagem regressiva. O duelo nunca muda, um contador roda, você saca no zero, mas cada fora da lei frauda os livros de um jeito, e o último acaba sendo quem escreveu a carta. Feito em 4 dias para a GMTK Jam 2026, onde ficou em 21º com 218 avaliações e mais de 150 comentários."
      },
      role: {
        en: "A three-person team at Wolfish Studios. I did the game design, all of the programming and the audio; Frovio and Zumate made the art. The rule I designed everything against: a boss's mechanic has to be a joke about who they are. The loan shark lends you time at interest. The villain whose running gag is forgetting things makes you forget the count. Follow that rule and the systems work and the writing works, from the same decision.",
        pt: "Um time de três pessoas na Wolfish Studios. Fiz o game design, toda a programação e o áudio; Frovio e Zumate fizeram a arte. A regra contra a qual projetei tudo: a mecânica de um chefe tem que ser uma piada sobre quem ele é. O agiota te empresta tempo a juros. O vilão cuja piada recorrente é esquecer as coisas faz você esquecer a contagem. Siga essa regra e o sistema funciona e a escrita funciona, a partir da mesma decisão."
      },
      responsibilities: [
        {
          group: { en: "Game Design", pt: "Game Design" },
          items: [
            { en: "Core loop & boss design", pt: "Core loop & design dos chefes" },
            { en: "Difficulty tuning", pt: "Tuning de dificuldade" },
            { en: "Adaptive pressure model", pt: "Modelo de pressão adaptativa" },
            { en: "Jam scoping", pt: "Escopo de jam" }
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
        en: "One input, one verb: shoot. Four days, and five boss fights that all have to feel different. The obvious fix is to add verbs, dodge, reload, aim, and the obvious fix would not have shipped on time. So instead of expanding what the player does, I attacked what the player knows. A duel on a countdown is a reading problem, not a reflex problem, and the premise already told me who was doing the attacking: I was writing a game about debt collection, so the enemies should falsify the count the way a debtor falsifies a ledger. Every boss stopped being a difficulty tier and became a specific kind of liar.",
        pt: "Um input, um verbo: atirar. Quatro dias, e cinco lutas de chefe que precisam parecer diferentes. A solução óbvia é adicionar verbos, esquivar, recarregar, mirar, e a solução óbvia não teria ficado pronta a tempo. Então, em vez de expandir o que o jogador faz, ataquei o que o jogador sabe. Um duelo em cima de uma contagem é um problema de leitura, não de reflexo, e a premissa já dizia quem estava atacando: eu estava escrevendo um jogo sobre cobrança de dívida, então os inimigos deveriam falsificar a contagem como um devedor falsifica um livro-caixa. Cada chefe deixou de ser um nível de dificuldade e virou um tipo específico de mentiroso."
      },
      coreLoop: {
        steps: [
          { en: "Read the count", pt: "Ler a contagem" },
          { en: "Hold your nerve", pt: "Segurar o nervo" },
          { en: "Draw on zero", pt: "Sacar no zero" },
          { en: "Hit, or lose a heart", pt: "Acertar, ou perder um coração" },
          { en: "The outlaw cooks the books", pt: "O fora da lei frauda os livros" }
        ],
        note: {
          en: "Three hearts each, five for the final boss. A clean draw takes one of theirs; firing too early or too slow takes one of yours. The base tempo is one tick per second with a 0.7s draw window, and every boss overrides both.",
          pt: "Três corações de cada lado, cinco no chefe final. Um saque limpo tira um deles; atirar cedo ou lento demais tira um seu. O tempo base é um tick por segundo com uma janela de saque de 0,7s, e todo chefe sobrescreve os dois."
        }
      },
      systems: [
        {
          title: { en: "One duel, shared by five fights", pt: "Um duelo, compartilhado por cinco lutas" },
          body: {
            en: "A single six-state machine runs every fight: round intro, countdown, draw, resolve, game over. It owns the hearts, the hit resolution and the feedback, and it never learns anything about which outlaw is standing across from you. Everything a boss does has to be expressible as a change to the countdown, which is exactly the constraint that kept the game coherent.",
            pt: "Uma única máquina de seis estados roda todas as lutas: intro do round, contagem, saque, resolução, fim de jogo. Ela cuida dos corações, da resolução do acerto e do feedback, e nunca sabe qual fora da lei está do outro lado. Tudo que um chefe faz precisa ser expressável como uma mudança na contagem, que é exatamente a restrição que manteve o jogo coerente."
          }
        },
        {
          title: { en: "A boss is a set of hooks", pt: "Um chefe é um conjunto de hooks" },
          body: {
            en: "Every outlaw is a subclass of one base class exposing thirteen hooks: how many seconds this round runs, how wide the draw window is, what happens on each tick, what happens when the round resolves, what they say when you jump the gun. Bosses override, never fork. Writing that interface on day one cost a few hours and is the only reason five genuinely different fights existed by day four.",
            pt: "Cada fora da lei é uma subclasse de uma classe base que expõe treze hooks: quantos segundos o round dura, qual a largura da janela de saque, o que acontece a cada tick, o que acontece quando o round resolve, o que ele fala quando você saca cedo. Chefes sobrescrevem, nunca bifurcam. Escrever essa interface no primeiro dia custou algumas horas e é a única razão de existirem cinco lutas realmente diferentes no quarto dia."
          }
        },
        {
          title: { en: "Hoarse Ryder, the man who can't stop talking", pt: "Hoarse Ryder, o homem que não para de falar" },
          body: {
            en: "A loudmouth who keeps mangling his own one-liners: \"I'm the camel that breaks straws!\" … \"Uh. I messed up the line.\" He never touches the timer. He just talks over it, and because the bit is that he always needs three lines to walk back a threat, the fight escalates by talking more. His first two hearts fire three scripted lines at fixed ticks; his last two flood the screen from a shuffled bag of seven three-line triads, two bubbles visible at a time, one per second, for the whole round. The number is right there. You stop reading it because he won't shut up.",
            pt: "Um bocudo que vive estragando as próprias tiradas: \"Eu sou o camelo que quebra os canudos!\" … \"Ahn. Errei a fala.\" Ele nunca toca no timer. Ele só fala por cima, e como a piada é que ele sempre precisa de três falas pra desdizer uma ameaça, a luta escala falando mais. Nos dois primeiros corações ele dispara três falas roteirizadas em ticks fixos; nos dois últimos ele inunda a tela a partir de um saco embaralhado de sete tríades, dois balões visíveis por vez, um por segundo, o round inteiro. O número está bem ali. Você para de lê-lo porque ele não cala a boca."
          }
        },
        {
          title: { en: "Danny D. Vile, the villain who forgets", pt: "Danny D. Vile, o vilão que esquece" },
          body: {
            en: "Danny's running gag is that he can't remember anything, he loses his own fiancée's name mid-monologue (\"…Esmeralda? CURSES! Foiled by my own memory!\"). So his mechanic makes you forget: he lights a fuse and blows seconds off the count on a cooldown that tightens from 8s to 2s. His first cast of the fight is deliberately non-lethal, capped to leave at least one second on the clock, so you learn what he does before it can kill you. By his last heart he detonates the timer entirely and you finish the round counting in your head.",
            pt: "A piada recorrente do Danny é que ele não lembra de nada, ele perde o nome da própria noiva no meio do monólogo (\"…Esmeralda? MALDIÇÃO! Derrotado pela minha própria memória!\"). Então a mecânica dele te faz esquecer: ele acende um pavio e explode segundos da contagem num cooldown que aperta de 8s pra 2s. O primeiro cast da luta é deliberadamente não-letal, limitado a deixar pelo menos um segundo no relógio, pra você aprender o que ele faz antes que isso te mate. No último coração ele detona o timer inteiro e você termina o round contando de cabeça."
          }
        },
        {
          title: { en: "Tunga Tatu, the loan shark", pt: "Tunga Tatu, o agiota" },
          body: {
            en: "\"Time is expensive. Luckily, I know a place that sells it… with interest.\" Tunga doesn't steal time, he trades it, and the UI says so: he adds 3–5 seconds as a green buy and slashes the count to zero as an orange sell, both spawned as floating market numbers. The stall chance decays round over round toward a floor, and once selling unlocks he starts stalling and then instantly calling the debt in, stretch, let you relax for half a second, snap. Phase 2 mirrors the whole display horizontally; phase 3 stops printing the numbers at all, so you can see him trading but not how much.",
            pt: "\"Tempo é caro. Por sorte, conheço um lugar que vende… com juros.\" Tunga não rouba tempo, ele negocia, e a UI diz isso: ele soma 3–5 segundos como uma compra verde e corta a contagem a zero como uma venda laranja, ambas cuspidas como números flutuantes de mercado. A chance de enrolar decai round a round até um piso, e quando a venda libera ele passa a enrolar e cobrar a dívida na hora, estica, te deixa relaxar meio segundo, corta. A fase 2 espelha o display inteiro na horizontal; a fase 3 para de imprimir os números, então você vê ele negociando mas não quanto."
          }
        },
        {
          title: { en: "Conny Calzone, the timer becomes homework", pt: "Conny Calzone, o timer vira dever de casa" },
          body: {
            en: "Conny is the little girl you rescue from Hoarse Ryder in fight one; she decides she's the sheriff now, and her whole threat is \"you know what's scarier than guns? MATH!\" So she splits the counter in two with an operator between them and you draw when the sum hits zero, left always starting at twice the right. Phase 2 runs the right side at double speed and adds feints (both faces briefly rewritten so the sum reads 1) and shifts (both rates re-solved mid-round so the numbers converge on ±3 while the true zero stays exactly where it was, it looks like cheating and isn't). Phase 3 rotates the plus 45° into a multiplication: 972 × 5. It's a bluff. She says so: \"I don't know what this symbol means… but it sure looks complicated.\" The left number is a meaningless blur and the real count is the 5 on the right, unchanged.",
            pt: "Conny é a garotinha que você resgata do Hoarse Ryder na primeira luta; ela decide que agora é a xerife, e a ameaça dela é \"sabe o que é mais assustador que armas? MATEMÁTICA!\" Então ela parte o contador em dois com um operador no meio e você saca quando a soma chega a zero, a esquerda sempre começando no dobro da direita. A fase 2 roda o lado direito no dobro da velocidade e adiciona fintas (as duas faces reescritas por um instante pra soma ler 1) e shifts (as duas taxas recalculadas no meio do round pros números convergirem em ±3 enquanto o zero verdadeiro fica exatamente onde estava, parece trapaça e não é). A fase 3 gira o mais 45° e vira multiplicação: 972 × 5. É blefe. Ela mesma diz: \"Não sei o que esse símbolo significa… mas parece bem complicado.\" O número da esquerda é um borrão sem sentido e a contagem real é o 5 da direita, intacta."
          }
        },
        {
          title: { en: "Difficulty that reads you back", pt: "Dificuldade que te lê de volta" },
          body: {
            en: "Conny also carries a hidden layer: a single pressure float. Draw cleanly in under 0.35s and it climbs; lose a heart and it drops. Pressure narrows her draw window, pushes her feint chance toward certainty, and unlocks the shift attack once it crosses a threshold. The fight silently converges on the player's actual skill, and nothing in the UI ever admits it.",
            pt: "Conny também carrega uma camada escondida: um único float de pressão. Saque limpo em menos de 0,35s e ele sobe; perca um coração e ele cai. A pressão estreita a janela de saque dela, empurra a chance de finta rumo à certeza, e libera o ataque de shift quando cruza um limiar. A luta converge silenciosamente pra habilidade real do jogador, e nada na UI admite isso."
          }
        },
        {
          title: { en: "El To Angus, the man who wrote the letter", pt: "El To Angus, o homem que escreveu a carta" },
          body: {
            en: "\"You really thought that letter came from a desperate sheriff? Every name you crossed off your ledger… I put them there. You spent all this time collecting debts, but never wondered who was keeping the books.\" He owns the town, so he owns the rules, and he says so, \"I run this town, so I make the rules. For instance, I have 5 lives.\" He racks up five near-identical timers, TINER TIDER TIMER TYLER TIGER, shuffles them, and only one is real. An authored event track keeps moving the goalposts mid-round: the real face slides TIMER → TIDER → TIGER, the number that ends the count moves from 0 to 7, and the real counter runs a hand-written sequence with decoy zeros baked in, 10, 9, 8, 0, 6, 5, 4, 3, 2, 1, 7. He even baits a decoy by name: \"I once had a friend named Tyler…\", and TYLER starts counting down to 2.",
            pt: "\"Você achou mesmo que aquela carta veio de um xerife desesperado? Cada nome que você riscou do seu livro… fui eu que coloquei lá. Você passou todo esse tempo cobrando dívidas, mas nunca se perguntou quem fazia a contabilidade.\" Ele é dono da cidade, então é dono das regras, e ele avisa, \"Eu mando nesta cidade, então eu faço as regras. Por exemplo, eu tenho 5 vidas.\" Ele enfileira cinco timers quase idênticos, TINER TIDER TIMER TYLER TIGER, embaralha, e só um é real. Uma trilha de eventos autoral fica mudando o alvo no meio do round: a face real desliza TIMER → TIDER → TIGER, o número que encerra a contagem vai de 0 pra 7, e o contador real roda uma sequência escrita à mão com zeros-isca embutidos, 10, 9, 8, 0, 6, 5, 4, 3, 2, 1, 7. Ele até isca um decoy pelo nome: \"Eu tinha um amigo chamado Tyler…\", e TYLER começa a contar até 2."
          }
        },
        {
          title: { en: "The ending: beating a cheater at cheating", pt: "O final: ganhar de um trapaceiro na trapaça" },
          body: {
            en: "One hit from death, Angus gives up on tricks and offers a clean duel, \"Enough with these stupid rules. We shoot at zero. No pauses. Best cowboy wins.\", at 0.384615s per tick, about two and a half times normal speed. Then, one hit from losing it fairly, he panics and takes the last thing he has left: \"Maybe I can't beat you. But if there are no numbers, you can't beat me either. We'll stay here forever.\" The timer stops showing digits and starts cycling the alphabet, decelerating from 0.0625s to 0.375s a letter while he tells you to give up. Shooting any letter costs you a heart. But one letter reads as a zero, and when the rack reaches O the game quietly swaps the glyph for an actual 0, draw there and Angus shoots himself. The whole game teaches you that the count can be falsified; the ending is the one time you're the one falsifying it.",
            pt: "A um acerto da morte, Angus desiste dos truques e oferece um duelo limpo, \"Chega dessas regras idiotas. A gente atira no zero. Sem pausas. Ganha o melhor cowboy.\", a 0,384615s por tick, cerca de duas vezes e meia a velocidade normal. Aí, a um acerto de perder de forma justa, ele entra em pânico e tira a última coisa que lhe resta: \"Talvez eu não consiga te vencer. Mas se não existem números, você também não me vence. A gente fica aqui pra sempre.\" O timer para de mostrar dígitos e começa a rodar o alfabeto, desacelerando de 0,0625s pra 0,375s por letra enquanto ele manda você desistir. Atirar em qualquer letra custa um coração. Mas uma letra se lê como zero, e quando a roda chega no O o jogo troca o glifo por um 0 de verdade, saque ali e o Angus atira em si mesmo. O jogo inteiro te ensina que a contagem pode ser falsificada; o final é a única vez em que quem falsifica é você."
          }
        }
      ],
      progression: {
        en: "The town is ordered by what each debtor takes from you. Hoarse Ryder takes your attention, he never touches the number. Danny D. Vile takes the seconds themselves. Tunga Tatu takes your ability to read them. Conny Calzone takes the arithmetic. El To Angus takes the rules, and then the numbers. Each fight also runs its phases off the boss's remaining hearts, so the gimmick escalates inside the fight as well as across the map: Danny's cooldown tightens from 8s to 2s before he blows the timer up, Tunga's draw window closes from 0.70s to 0.38s while his kill chance climbs from 0 to 0.75, and Ryder's crosstalk goes from three scripted lines to a continuous flood.",
        pt: "A cidade é ordenada pelo que cada devedor tira de você. Hoarse Ryder tira sua atenção, ele nunca toca no número. Danny D. Vile tira os segundos em si. Tunga Tatu tira sua capacidade de lê-los. Conny Calzone tira a aritmética. El To Angus tira as regras, e depois os números. Cada luta também roda suas fases a partir dos corações restantes do chefe, então o truque escala dentro da luta e ao longo do mapa: o cooldown do Danny aperta de 8s pra 2s antes de ele explodir o timer, a janela de saque do Tunga fecha de 0,70s pra 0,38s enquanto a chance de corte sobe de 0 pra 0,75, e a conversa do Ryder vai de três falas roteirizadas pra uma enxurrada contínua."
      },
      combat: {
        formula: {
          en: "draw within [0, draw_window] → HIT · draw before 0 → TOO EARLY · no draw → TOO SLOW",
          pt: "saque dentro de [0, janela_de_saque] → ACERTO · saque antes do 0 → CEDO DEMAIS · sem saque → LENTO DEMAIS"
        },
        body: {
          en: "The whole combat model is one window. The base draw window is 0.7s and bosses override it from 0.85s down to 0.38s. Danny D. Vile is the only one with a 0.30s early-grace window, which forgives a draw fired just before zero, he is the boss who steals seconds off your clock, so a hair-early read is his fault, not yours. That one exception is the difference between a boss who feels unfair and a boss who feels like a cheat you can beat.",
          pt: "O modelo de combate inteiro é uma janela. A janela de saque base é 0,7s e os chefes sobrescrevem de 0,85s até 0,38s. Danny D. Vile é o único com uma janela de perdão de 0,30s, que releva um saque disparado logo antes do zero, ele é o chefe que rouba segundos do seu relógio, então uma leitura um fio adiantada é culpa dele, não sua. Essa única exceção é a diferença entre um chefe que parece injusto e um chefe que parece uma trapaça vencível."
        }
      },
      balancing: {
        formula: {
          en: "draw_window = lerp(0.55, 0.40, pressure)",
          pt: "janela_de_saque = lerp(0,55; 0,40; pressão)"
        },
        body: {
          en: "Boss tuning lives entirely in exported arrays, one entry per phase, so every fight was tuned in the inspector between playtests rather than in code. Conny's countdown isn't authored at all, it's solved from the two counters, so the round lasts exactly as long as the equation takes to reach zero. The adaptive layer sits on top: a pressure value in [0, 1] that rises 0.25 per fast, clean draw and falls 0.30 per heart lost, then drives the draw window, the feint rate and the shift unlock. One float in place of a difficulty menu.",
          pt: "O tuning dos chefes vive inteiramente em arrays exportados, uma entrada por fase, então cada luta foi ajustada no inspector entre playtests, não no código. A contagem da Conny nem é autoral, ela é resolvida a partir dos dois contadores, então o round dura exatamente o tempo que a equação leva pra chegar a zero. A camada adaptativa fica por cima: um valor de pressão em [0, 1] que sobe 0,25 por saque rápido e limpo e cai 0,30 por coração perdido, e então comanda a janela de saque, a taxa de fintas e a liberação do shift. Um float no lugar de um menu de dificuldade."
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
              [{ en: "Shift threshold", pt: "Limiar de shift" }, "0.34", { en: "Pressure needed to unlock the rate-shift attack", pt: "Pressão necessária pra liberar o ataque de shift" }]
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
            pt: "Um float move dois botões em direções opostas: a janela pra reagir encolhe enquanto a chance de ser enganado sobe. Jogue bem e a luta aperta; perca um coração e ela abre de novo, sem menu de dificuldade."
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
        en: "Godot 4 and GDScript, no external tooling. One duel state machine, five boss subclasses, and both the fights and the writing authored as data: Angus's entire event track, which timer is real, when the rack shuffles, which number ends the count, what he says while doing it, is inspector data rather than code, and the town's dialogue is a set of script files with speaker, portrait and expression tags. Ryder's crosstalk is seven three-line resources drawn from a shuffle bag. In a four-day jam that meant rewriting a boss's personality or difficulty was a field edit between playtests instead of a code change. One of the commits is literally named 'danny easier by 0.40'.",
        pt: "Godot 4 e GDScript, sem ferramental externo. Uma máquina de estados do duelo, cinco subclasses de chefe, e tanto as lutas quanto a escrita escritas como dado: a trilha de eventos inteira do Angus, qual timer é real, quando a estante embaralha, qual número encerra a contagem, o que ele fala enquanto faz isso, é dado do inspector, não código, e o diálogo da cidade é um conjunto de arquivos de script com tags de falante, retrato e expressão. A conversa do Ryder são sete recursos de três falas sorteados de um saco embaralhado. Numa jam de quatro dias isso significou que reescrever a personalidade ou a dificuldade de um chefe era editar um campo entre playtests, não mexer no código. Um dos commits se chama literalmente 'danny easier by 0.40'."
      },
      learnings: {
        en: "The core decision here was to not design mechanics and characters separately. Once the premise was debt collection, \"what does this boss do to the timer\" and \"who is this boss\" became the same question, and the answers arrived together: the loan shark sells you seconds at interest, the forgetful villain erases them, the kid who thinks math is scary turns the clock into homework, and the man keeping the books rewrites the rules because he wrote them. Players remember the alphabet ending, but it only lands because it's the one time the player falsifies the count instead of the outlaw. On the technical side: a thirteen-hook base class written on day one is what made five different fights possible by day four, and one adaptive pressure float replaced the difficulty menu I didn't have time to build.",
        pt: "A decisão central aqui foi não projetar mecânica e personagem separadamente. Quando a premissa virou cobrança de dívida, \"o que esse chefe faz com o timer\" e \"quem é esse chefe\" viraram a mesma pergunta, e as respostas chegaram juntas: o agiota te vende segundos a juros, o vilão esquecido os apaga, a criança que acha matemática assustadora transforma o relógio em dever de casa, e o homem que faz a contabilidade reescreve as regras porque foi ele quem as escreveu. Os jogadores lembram do final do alfabeto, mas ele só funciona porque é a única vez em que quem falsifica a contagem é o jogador, não o fora da lei. No lado técnico: uma classe base de treze hooks escrita no primeiro dia é o que tornou possíveis cinco lutas diferentes no quarto dia, e um único float de pressão adaptativa substituiu o menu de dificuldade que eu não tive tempo de construir."
      },
      links: [
        { label: { en: "Play on itch.io", pt: "Jogar na itch.io" }, url: "https://lopen.itch.io/count-me-dead", kind: "play" }
      ],
      gallery: [
        {
          src: "./assets/img/projects/count-me-dead-gameplay-2.webp",
          alt: { en: "Mid-duel against Danny D. Vile, the timer at 18, \"Let's see you count without me.\" The player's health bar is labelled THE ACCOUNTANT", pt: "Duelo contra Danny D. Vile, o timer em 18, \"Let's see you count without me.\" A barra de vida do jogador é rotulada THE ACCOUNTANT" }
        },
        {
          src: "./assets/img/projects/count-me-dead-gameplay-3.webp",
          alt: { en: "Hoarse Ryder in the sheriff's office, bullying a frightened Conny Calzone and mangling an idiom: \"Strike while the soup is hot!\"", pt: "Hoarse Ryder no escritório do xerife, intimidando uma Conny Calzone assustada e estragando o ditado: \"Strike while the soup is hot!\"" }
        },
        {
          src: "./assets/img/projects/count-me-dead-gameplay-4.webp",
          alt: { en: "The town map, where each location is a name on the ledger and unlocks the next outlaw", pt: "O mapa da cidade, onde cada local é um nome no livro-caixa e libera o próximo fora da lei" }
        }
      ]
    }
  },
  {
    id: "esqueleto-chico",
    accent: "#FF4F87",
    name: "Esqueleto Chico",
    playable: false,
    playUrl: "https://prismagamelab.itch.io/esqueleto-chico-ossos-do-oficio",
    type: { en: "Top-down action roguelike (PC)", pt: "Ação top-down roguelike (PC)" },
    role: { en: "Lead Game & Systems Designer", pt: "Game/Systems Designer Líder" },
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
        alt: { en: "Esqueleto Chico: Ossos do Ofício, key art poster", pt: "Esqueleto Chico: Ossos do Ofício, pôster/key art" }
      },
      results: [
        {
          value: { en: "Official selection", pt: "Seleção oficial" },
          label: { en: "SB Games, Brazil's academic game showcase", pt: "SB Games, mostra acadêmica de jogos do Brasil" }
        },
        {
          value: { en: "1 sheet", pt: "1 planilha" },
          label: { en: "Drove every enemy, boss and upgrade number", pt: "Conduziu cada número de inimigo, chefe e upgrade" }
        },
        {
          value: { en: "×1.00 → ×2.34", pt: "×1,00 → ×2,34" },
          label: { en: "Boss HP, scaled to how much you cleared", pt: "HP do chefe, escalado pelo quanto você limpou" }
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
        en: "The player's power swings wildly across a run: a glass-cannon ATK build and a tanky HP build reach the same boss with very different stats. The design problem: make every boss feel fair and threatening for all of them, without hand-tuning each case.",
        pt: "O poder do player varia muito ao longo da run: uma build de ATK glass-cannon e uma build tanque de HP chegam ao mesmo chefe com stats bem diferentes. O problema de design: fazer cada chefe parecer justo e ameaçador para todas elas, sem ajustar cada caso na mão."
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
          title: { en: "Room-based scaling", pt: "Escalonamento por sala" },
          body: {
            en: "Enemy and reward stats scale per room cleared (0–7), so difficulty tracks how deep you are, not just which floor.",
            pt: "Stats de inimigos e recompensas escalam por sala limpa (0–7), então a dificuldade acompanha o quão fundo você está, não só o andar."
          }
        },
        {
          title: { en: "Upgrade draft", pt: "Draft de upgrades" },
          body: {
            en: "Each room offers one stat upgrade: ATK, fire rate or HP. The three axes create distinct builds (glass cannon, dual-attack, tank) from the same pool.",
            pt: "Cada sala oferece um upgrade: ATK, cadência ou HP. Os três eixos criam builds distintas (glass cannon, duplo-ataque, tanque) a partir do mesmo pool."
          }
        },
        {
          title: { en: "Boss attack kit", pt: "Kit de ataques do chefe" },
          body: {
            en: "Bosses like O Zelador (the Janitor) rotate a laser sweep, a broom melee, thrown buckets and soap, each with its own damage band tuned to threaten without one-shotting.",
            pt: "Chefes como O Zelador giram entre varredura de laser, vassourada corpo-a-corpo, baldes arremessados e sabonete, cada um com sua faixa de dano ajustada para ameaçar sem matar de um golpe."
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
          pt: "Em vez de escolher o dano do chefe na mão, derivei cada ataque do HP *esperado* do player dividido por quantos golpes daquele ataque deveriam matar, então o laser ameaça matar em 5 hits e a vassourada em 3, ficando justo para qualquer build."
        }
      },
      balancing: {
        formula: {
          en: "HP_boss = base_HP × log₂.₃(rooms_cleared)",
          pt: "HP_boss = HP_base × log₂,₃(salas_limpas)"
        },
        body: {
          en: "The whole game lived in one balancing spreadsheet: player base stats, per-room scaling, enemy and boss tables, and DPS curves for the extreme builds. The interesting piece is the boss HP: it doesn't scale with the floor, it scales with how many rooms you actually cleared, on a logarithm (base 2.3). Clear more rooms and you arrive stronger, so the boss grows to match, but logarithmically, so a full clear makes it tougher without ever becoming an impossible wall.",
          pt: "O jogo inteiro vivia numa única planilha de balanceamento: stats base do player, escalonamento por sala, tabelas de inimigos e chefes, e curvas de DPS das builds extremas. A parte interessante é o HP do chefe: ele não escala com o andar, escala com quantas salas você realmente limpou, num logaritmo (base 2,3). Limpar mais salas te deixa mais forte, então o chefe cresce junto, mas logaritmicamente, ficando mais difícil sem nunca virar uma parede impossível."
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
        en: "Deriving enemy and boss damage from the player's expected survivability kept difficulty consistent across builds that looked nothing alike. Owning design, sound, UI and art at once taught me to make each discipline serve the same core loop.",
        pt: "Derivar o dano de inimigos e chefes da sobrevivência esperada do player manteve a dificuldade consistente entre builds completamente diferentes. Cuidar de design, som, UI e arte ao mesmo tempo me ensinou a fazer cada disciplina servir ao mesmo core loop."
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
      pt: "Um roguelite de masmorra em que você é um cuidador covarde que não consegue lançar nem o feitiço mais simples, então manda os bebês sob seus cuidados para a luta. Feito por duas pessoas, é conduzido por uma IA inimiga que pontua cada par (skill, alvo) por sorteio ponderado, com inteligência e convicção como diais de dificuldade separados. Ainda em desenvolvimento ativo."
    },
    caseStudy: {
      results: [
        {
          value: { en: "2 dials", pt: "2 diais" },
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
        en: "Projeto Maguitos is a roguelite dungeon crawler currently in active development, built by a two-person team. You play a caretaker at a magical daycare who can't cast even the simplest spell. On your first day almost every child in your care vanishes into the Cursed Forest, and your only way out is to let the toddlers themselves fight for you. It's a run of back-to-back encounters: survive a fixed number of battles, rescue toddlers, swap your party, and reach the boss intact.",
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
        en: "Enemies do not run a fixed behavior tree. Each one builds its list of legal actions, scores every one, and picks by weighted random. The goal was difficulty that isn't just bigger HP and damage, but enemies that see more of the board and misplay less, while staying legible enough that a player who shields a fragile toddler can feel that choice pay off.",
        pt: "Os inimigos não rodam uma árvore de comportamento fixa. Cada um monta sua lista de ações legais, pontua cada uma e escolhe por sorteio ponderado. O objetivo era uma dificuldade que não fosse só mais HP e dano, mas inimigos que enxergam mais do tabuleiro e erram menos, mantendo tudo legível o bastante para que um player que protege um bebê frágil sinta essa escolha valer a pena."
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
            en: "The unit of decision is the pair (skill, target), not the skill alone. The enemy generates every legal action, filters out the useless ones (no charge, no living target, target immune by tag, zero effect), and scores what remains, so it can reason about consequence, 'this skill on this target is a kill,' instead of choosing skill and target as separate, dumber steps.",
            pt: "A unidade de decisão é o par (skill, alvo), não a skill sozinha. O inimigo gera todas as ações legais, filtra as inúteis (sem carga, sem alvo vivo, alvo imune pela tag, efeito zero) e pontua o que sobra, assim ele pode raciocinar sobre consequência, 'essa skill nesse alvo é uma morte', em vez de escolher skill e alvo em etapas separadas e mais burras."
          }
        },
        {
          title: { en: "Charges, not MP", pt: "Cargas, não MP" },
          body: {
            en: "Enemies have no MP pool: their resource is charges per skill, each with a number of uses and a recharge time (the basic attack has infinite charges). It paces the strong skills: the player learns to count the window, 'his heavy hit is back in two turns,' and the enemy can't spam its best move forever. It's a hidden resource with no UI, because the read is about the pattern, not a number on screen.",
            pt: "Os inimigos não têm pool de MP: o recurso deles é carga por skill, cada uma com um número de usos e um tempo de recarga (o ataque básico tem cargas infinitas). Isso dá ritmo às skills fortes: o player aprende a contar a janela, 'o golpe pesado dele volta em dois turnos', e o inimigo não pode spammar o melhor movimento pra sempre. É um recurso escondido, sem UI, porque a leitura é sobre o padrão, não um número na tela."
          }
        },
        {
          title: { en: "Decide early, execute late", pt: "Decidir cedo, executar tarde" },
          body: {
            en: "At the start of the round each enemy locks its action with no telegraph, executing only after the player resolves the party's turn, there's no re-routing based on what the party did, except re-targeting if the locked target died or left. The AI commits to the state at the start of the round, which is what makes Defend and Heal worth using: the enemy already chose to hit your fragile toddler before you shielded it, so shielding actually saves it.",
            pt: "No início da rodada, cada inimigo trava sua ação sem telegraph, executando só depois que o player resolve o turno da party, não há reação ao que a party fez, exceto retargeting se o alvo travado morreu ou saiu. A IA se compromete com o estado do início da rodada, e é isso que faz Defender e Curar valerem a pena: o inimigo já escolheu acertar seu bebê frágil antes de você protegê-lo, então proteger de fato o salva."
          }
        },
        {
          title: { en: "Intent board", pt: "Quadro de intenções" },
          body: {
            en: "A board shared per round: enemies decide in sequence, and on locking an action each one records its target and expected damage. Enemies that decide later read effective HP (current HP minus damage already allocated) before they score, so the second enemy sees an already-dead target, the 'likely kill' bonus disappears, and it redirects on its own, emergent group coordination with no team AI written, and one that still respects intelligence: a dumb enemy ignores the board and hits the corpse, a smart one doesn't.",
            pt: "Um quadro compartilhado por rodada: os inimigos decidem em sequência, e ao travar uma ação cada um registra seu alvo e o dano esperado. Os inimigos que decidem depois leem o HP efetivo (HP atual menos o dano já alocado) antes de pontuar, então o segundo inimigo vê um alvo já morto, o bônus de 'kill provável' desaparece, e ele redireciona sozinho, coordenação de grupo emergente sem nenhuma IA de time escrita, e que ainda respeita a inteligência: um inimigo burro ignora o quadro e acerta o cadáver, um esperto não."
          }
        },
        {
          title: { en: "Personalities by archetype", pt: "Personalidades por arquétipo" },
          body: {
            en: "Each enemy draws a personality from its archetype's pool (Hot-headed, Clever, Gentle, Coward), a weight bias by skill tag (aggressive, defensive, support…) that's legible: change the behavior and you change the name, icon and color. High conviction on a strong-personality enemy doesn't make it smarter, it makes it more stubborn, it commits harder to its own irrational bias. Personality is flavor, not intelligence.",
            pt: "Cada inimigo sorteia uma personalidade do pool do seu arquétipo (Cabeça-quente, Astuto, Gentil, Covarde), um viés de peso por tag de skill (agressiva, defensiva, de suporte…) que é legível: mudar o comportamento muda o nome, o ícone e a cor. Convicção alta num inimigo de personalidade forte não o deixa mais esperto, deixa mais teimoso, ele se compromete mais forte com seu próprio viés irracional. Personalidade é tempero, não inteligência."
          }
        },
        {
          title: { en: 'Why the fixed "role" tag was dropped', pt: 'Por que o "papel" fixo foi removido' },
          body: {
            en: "The old system tagged every unit with a fixed role: tank, dps, or support. It was ripped out and replaced by key stats read from the real numbers (primary_stat and secondary_stat) plus a tier tiebreaker, because the role lied: Celetro was tagged tank while holding the highest Witness in the party, and Isara was dps by default when what actually defines her is MP Regen, 2.5 times the others. Removing the tag and letting the AI read what a unit actually is fixed a dead rule for free, buffs finally land on the right target.",
            pt: "O sistema antigo etiquetava cada unidade com um papel fixo: tank, dps ou suporte. Foi arrancado e substituído por key stats lidos dos números reais (primary_stat e secondary_stat) mais um desempate por tier, porque o papel mentia: Celetro estava etiquetado como tank enquanto tinha o maior Witness da party, e Isara era dps por padrão quando o que realmente a define é o MP Regen, 2,5 vezes o dos outros. Tirar a etiqueta e deixar a IA ler o que a unidade realmente é consertou de graça uma regra morta, os buffs finalmente acertam o alvo certo."
          }
        }
      ],
      combat: {
        formula: {
          en: "P(action) = weight^conviction / sum of weight^conviction",
          pt: "P(ação) = peso^convicção / soma de peso^convicção"
        },
        body: {
          en: "Two orthogonal channels drive the AI. Intelligence scales the situational weight, defining what the enemy prefers: hit the vulnerable, avoid overkill, finish kills. Conviction is the exponent of the draw above, defining only how faithfully the enemy follows its own preference: conviction of zero is a uniform draw and plays erratic, high conviction almost always takes the top pick. Splitting these two channels is the core of the AI's design: a genius with conviction zero draws at random and plays like an idiot, a fool with high conviction executes the dumbest possible preference with total fidelity. Intelligence is what the enemy wants, conviction is how much it obeys itself, and conviction is the main difficulty dial.",
          pt: "Dois canais ortogonais conduzem a IA. Inteligência escala o peso situacional, definindo o que o inimigo prefere: acertar o vulnerável, evitar overkill, finalizar kills. Convicção é o expoente do sorteio acima, definindo só o quanto o inimigo segue a própria preferência com fidelidade: convicção zero é um sorteio uniforme e joga de forma errática, convicção alta quase sempre pega a melhor opção. Separar esses dois canais é o núcleo do design da IA: um gênio com convicção zero sorteia aleatoriamente e joga como um idiota, um bobo com convicção alta executa a pior preferência possível com fidelidade total. Inteligência é o que o inimigo quer, convicção é o quanto ele obedece a si mesmo, e convicção é o principal dial de dificuldade."
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
        en: "Phase 1 (the AI MVP) and Phase 2 (the intent board, personalities, and the two intelligence channels) are implemented and verified in-editor. Splitting intelligence from conviction early is what made every later system, personalities, the intent board, click into place instead of fighting each other. Phase 3 is open: archetypes beyond the first roster, a tuning overlay to lock values in playtest, and bosses with triggers and phases layered over the same weight system.",
        pt: "A Fase 1 (o MVP da IA) e a Fase 2 (o quadro de intenções, as personalidades e os dois canais de inteligência) estão implementadas e verificadas no editor. Separar inteligência de convicção cedo foi o que fez cada sistema seguinte, personalidades, quadro de intenções, encaixar em vez de brigar entre si. A Fase 3 está aberta: arquétipos além do elenco inicial, um overlay de ajuste para travar valores no playtest, e chefes com gatilhos e fases sobre o mesmo sistema de pesos."
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
      pt: "Um idle-clicker aconchegante onde o objetivo é completar o quarto onde seu cachorro mora: clique para ganhar carinho e gaste em móveis e upgrades, peça por peça. Um projeto solo pra web cuja economia inteira é derivada de um único número (quanto tempo a run deve durar) a partir de uma única planilha de balanceamento de forma fechada."
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
        en: "ClicaChorro is a cozy idle-clicker for the browser. You click to shower a dog with affection; that affection buys helpers and upgrades that idle-earn for you, and each purchase unlocks another piece of furniture for the room the dog lives in, from an empty room all the way to a fully decorated one. A solo project, built to test one idea: that a clicker's whole economy can be derived from how long you want the run to last.",
        pt: "ClicaChorro é um idle-clicker aconchegante pro navegador. Você clica pra encher um cachorro de carinho; esse carinho compra ajudantes e upgrades que rendem sozinhos, e cada compra libera mais uma peça de mobília para o quarto onde o cachorro mora, de um quarto vazio até um totalmente decorado. Um projeto solo, feito pra testar uma ideia: que a economia inteira de um clicker pode ser derivada de quanto tempo você quer que a run dure."
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
          pt: "Clicar rende carinho; carinho compra ajudantes e upgrades que rendem sozinhos; carinho suficiente libera a próxima peça de mobília do quarto. Cada peça custa mais carinho que a anterior, então o loop segue puxando pra frente, até a décima segunda e última peça que completa o quarto e encerra o jogo."
        }
      },
      systems: [
        {
          title: { en: "Time-driven economy", pt: "Economia guiada pelo tempo" },
          body: {
            en: "The whole cost/output curve is solved from one number: how long the run should take. Change the target and every stage rebalances automatically.",
            pt: "A curva inteira de custo/produção é resolvida a partir de um número: quanto tempo a run deve durar. Muda o alvo e todo estágio se rebalanceia automaticamente."
          }
        },
        {
          title: { en: "Geometric curve", pt: "Curva geométrica" },
          body: {
            en: "Costs grow by a factor a and idle output by a factor b each stage. Because a > b, the run gently stretches toward the end instead of flatlining, but on a fixed, provable total.",
            pt: "Custos crescem por um fator a e a produção por um fator b a cada estágio. Como a > b, a run se estica suavemente rumo ao fim em vez de estagnar, mas sobre um total fixo e demonstrável."
          }
        },
        {
          title: { en: "Room-completion progression", pt: "Progressão por complementação do quarto" },
          body: {
            en: "Twelve unlockable furniture pieces give the number-go-up a narrative spine: you're not just buying multipliers, you're filling an empty room until it's completely furnished.",
            pt: "Doze peças de mobília desbloqueáveis dão à escalada de números uma espinha narrativa: você não está só comprando multiplicadores, está enchendo um quarto vazio até ele ficar completamente decorado."
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
      ],
      gallery: [
        {
          src: "./assets/img/projects/clicachorro-gameplay-complete.webp",
          alt: { en: "A fully decorated room: band poster, boombox, car and a sleepy plush toy beside the dog", pt: "Um quarto totalmente decorado: pôster de banda, boombox, carro e uma pelúcia sonolenta ao lado do cachorro" }
        },
        {
          src: "./assets/img/projects/clicachorro-gameplay-start.webp",
          alt: { en: "A freshly started run: just the dog against an empty room", pt: "Uma run recém-iniciada: só o cachorro num quarto vazio" }
        },
        {
          src: "./assets/img/projects/clicachorro-gameplay-furniture.webp",
          alt: { en: "Mid-run room with a few furniture unlocks: a blank poster frame, a cabinet and a plant", pt: "Quarto no meio da run com alguns móveis desbloqueados: um quadro em branco, um armário e uma planta" }
        },
        {
          src: "./assets/img/projects/clicachorro-gameplay-shop.webp",
          alt: { en: "The upgrade shop open, showing click-power purchases", pt: "A loja de upgrades aberta, mostrando compras de poder de clique" }
        }
      ]
    }
  }
];
