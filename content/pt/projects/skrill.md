---
slug: skrill
order: 1
span: 2
cover_ratio: 5 / 3
title: skrill
type: design de produto, web app, full stack
role: design de produto, ui, desenvolvimento full stack
status: em andamento
timeline: junho de 2026 até agora
team: sozinho
built_with: html, css, javascript, supabase, figma, claude code
outcome: 13 temporadas em quatro meses, com o grupo para quem foi criado.
summary: Um jogo semanal que faz um pequeno grupo de amigos criativos fazer coisas que ninguém está pedindo que eles façam.
eyebrow: projeto pessoal · design de produto e desenvolvimento
headline: Um jogo semanal que faz um grupo de amigos realmente fazer o trabalho criativo que ninguém está pedindo.
live: /skrill/demo
live_label: jogar
live_text: lope.design/skrill
cover: assets/skrill/skrill-cover.webm
nav_image: assets/skrill/skrill-nav.webp
cover_alt: Peça de movimento em loop: a janela da tela de título do Skrill se fecha, o app mostra uma meta declarada e uma revelação do Skrill Time, e então dissolve de volta ao início
cover_caption: // a cara é toda de um app de desktop de uns 1996, que é a piada e também o motivo de as pessoas abrirem
---

## overview.md

::: statement
text: Ninguém pede para você praticar, então você não pratica.
:::

Skrill é um jogo semanal para quem quer fazer coisas pelas quais não é pago. Em cada temporada você declara o que vai fazer e o quão difícil é. Você entrega uma prova. Tudo fica borrado até uma ligação curta em que o grupo revela junto e distribui pontos entre si.

Eu desenhei as regras, a economia de pontos, a interface e o mascote, e construí toda a stack sozinho. Está rodando desde junho de 2026 com as cinco pessoas para quem foi criado.

## why.md

Eu faço jogos com um amigo artista, e o trabalho que nos mantém afiados não tem prazo: desenhar por diversão, uma faixa nova, uma ferramenta que ninguém pediu. Ele perde sempre para o trabalho que tem um cliente.

Já nos encontrávamos toda semana para mostrar o que tínhamos feito, mas uma meta que só existe na sua cabeça é fácil de abandonar, principalmente sem uma data marcada. Eu precisava de algo com um ciclo curto, outras pessoas envolvidas e um motivo para aparecer em um dia específico.

Quadros no Notion e listas no ClickUp parecem trabalho, o oposto do que eu queria. Então o briefing virou um sistema com prazo, uma pitada de rivalidade e um motivo para aparecer, construído para parecer um jogo.

## how-it-works/

Quatro decisões carregam a maior parte do design.

::: decision 01-declare-in-public-deliver-in-secret
title: todo mundo vê que você entregou, ninguém vê o quê
subtitle: A revelação é o motivo de a reunião existir.
body:
  Você declara uma meta com o quê e até quando, que é o empurrão mais barato que existe. Quando você entrega, a prova aparece no feed de todo mundo, mas borrada até a ligação semanal. Você vê que seus amigos estão trabalhando. Você não vê o que eles fizeram.

  Isso dá ao grupo pressão sem spoilers, e dá à ligação semanal algo para abrir. A ligação, chamada de Skrill Time, dura no máximo 15 minutos: todo mundo marca como pronto, o borrão cai, vocês reagem e os pontos são distribuídos.
media:
  - compare | assets/skrill/feed-blurred.webp ; assets/skrill/feed-revealed.webp | O feed de entregas com todas as imagens borradas ; o mesmo feed depois da revelação | antes da revelação ; depois da revelação
:::

::: decision 02-difficulty-is-the-price
title: você define a dificuldade antes de saber como a semana vai ser
subtitle: Metas simples pagam 2 pontos, complexas pagam 5.
body:
  Escolher a dificuldade faz parte de declarar a meta, na mesma tela. Isso é de propósito. Se você pudesse escolher depois, todo mundo chamaria tudo de difícil. Definir isso antes faz você precificar a própria ambição, e faz uma meta complexa que falhou custar alguma coisa.

  Um nível extra não paga pontos de base nenhum e só pontua através do grupo, para coisas que você faz só porque quer. Em algumas temporadas aparece uma bounty, um prompt para algo a fazer, como uma peça de ficção científica, um sticker para o grupo ou uma pintura clássica no seu próprio estilo. A chance de aparecer uma sobe a cada temporada em que ela não aparece, então ela continua sendo uma surpresa. Se um amigo pega a bounty, você quer pegar também, porque não quer que ele fique com todos os pontos.
media:
  - full | assets/skrill/choose-difficulty-simple-2-complex-5.webm | Gravação de tela: declarando uma meta, escolhendo simples ou complexa, e os pontos mostrados em cada uma
  - full | assets/skrill/new-goal-extra-simple-or-complex.webp | O modal de nova meta, com a dificuldade definida como extra, simples ou complexa, mais um título e uma descrição opcional | // o seletor de dificuldade, de perto | square
:::

::: decision 03-points-from-your-friends
title: parte da sua pontuação é dada a você pelo grupo
subtitle: Cada pessoa recebe um pequeno pool de pontos bônus para distribuir.
body:
  Os pontos base são fixos, então a parte interessante é o bônus. Cada pessoa recebe um pool igual à metade das metas entregues naquela temporada, arredondado para baixo, e precisa gastar tudo nas entregas, de forma anônima. Você pode pontuar a si mesmo, mas está gastando do mesmo pool.

  O pool segue as entregas, não o número de pessoas, então uma temporada cheia tem mais bônus para distribuir do que uma mais fraca. Isso impede que o placar seja só uma contagem de tarefas. Ele recompensa o trabalho que o grupo realmente achou bom, e mantém a revelação viva, porque ninguém sabe quem ganhou o quê até o final.
media:
  - full | assets/skrill/bounty-card-make-art-about-fishing.webp | A lista de metas de uma temporada mostrando um card de bounty, "fazer arte sobre pesca", com um botão de entregar bounty | // um prompt de bounty esperando para ser reivindicado | natural
  - full | assets/skrill/spend-the-whole-bonus-pool-to-submit.webm | Gravação de tela: um pool de bônus sendo dividido entre quatro entregas, com o contador do pool caindo até zero
:::

::: decision 04-deliberately-unserious
title: parece bobo de propósito
subtitle: As fontes em pixel e o mascote estão cumprindo uma função.
body:
  As fontes em pixel, as janelas de Windows 95 e o mascote são o que impede isso de parecer trabalho. O mascote caminha na parte de baixo de cada página e pode ser jogado por aí com um clique.

  Você não pode subir uma foto de perfil. Você precisa desenhar uma, numa pequena tela de pixels em preto e branco. A ferramenta é limitada e um pouco tosca, então todo avatar do grupo parece feito à mão.
media:
  - full | assets/skrill/five-accent-colors-then-draw-your-avatar.webm | Gravação de movimento: o app passando pelas cinco cores de destaque, depois a janela de editar perfil passando por avatares em pixel art na tela de desenho
:::

## what-changed.md

Mais três regras foram adicionadas nos primeiros dez dias de junho de 2026.

::: decision 05-trying-counts-for-something
title: uma meta que você tentou e não bateu ainda pode pontuar
subtitle: Um ponto, e só se o grupo disser que sim.
body:
  Uma meta pode terminar como tentada, não só como entregue ou falhada. Durante o Skrill Time o grupo vota a favor ou contra cada tentativa, e uma tentativa com mais votos a favor do que contra ganha 1 ponto. É pouco perto dos 2 ou 5 que uma entrega paga, mas separa a semana em que você tentou e não bateu da semana em que você não fez nada.
:::

::: decision 06-a-delivery-can-be-cancelled
title: uma entrega só conta se ninguém a chamar de falsa
subtitle: É preciso todo o resto do grupo, não só uma pessoa.
body:
  Qualquer jogador pode denunciar a entrega de outra pessoa enquanto os bônus estão sendo distribuídos. Se todos os outros participantes denunciarem, a entrega é cancelada e a meta é marcada como falhada. Uma única denúncia não muda nada, então uma pessoa não consegue tirar pontos de outra.
:::

::: decision 07-bounties-pay-less-when-shared
title: uma bounty vale mais quanto menos gente a pegar
subtitle: 7 pontos sozinho, 4 com duas pessoas, 3 com três, 2 depois disso.
body:
  Uma bounty paga de acordo com quantos jogadores a entregam. Ir sozinho é recompensado, e uma bounty que todo mundo pega vale pouco para cada um, em vez de muito. É a regra por trás de não querer que um amigo fique com todos os pontos.
:::

## outcome.md

::: outcomes
items:
  - 13 | temporadas reveladas desde junho de 2026, com as mesmas cinco pessoas
  - 119 | metas declaradas ao longo delas
  - 85% | entregues, 101 de 119
:::

O sistema tem se sustentado para as pessoas para quem foi criado. A ligação semanal era só uma conversa sem nada para contar. Agora é uma revelação do que cada pessoa fez, com pontos em cima. Eu faço mais coisas do que fazia antes de ele existir.

::: quote
text: Eu sinto aquele medo de segunda-feira, tipo, deus, eu não bati minha meta, então eu simplesmente vou fazer.
name: um amigo do grupo
:::

## project-info.md
