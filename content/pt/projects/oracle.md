---
slug: oracle
order: 2
title: oracle
type: design de produto, pesquisa de ux
role: pesquisa de ux, ux/ui, design de produto, design system
status: protótipo
timeline: 2025 a 2026
team: projeto em grupo. a pesquisa, a ideia e a documentação foram compartilhadas. o design e o protótipo foram meus.
built_with: figma, claude code
outcome: Pesquisa de campo até um protótipo testado com um mestre de RPG e uma sessão de jogo curta.
cover_ratio: 1 / 1
summary: Oracle é um app de celular que deixa o mestre de um RPG de mesa mudar a sala com um toque, construído a partir de pesquisa de campo.
eyebrow: pesquisa de ux e design de produto · 2025 a 2026
cover: assets/oracle/oracle-cover.webm
nav_image: assets/oracle/oracle-nav.webp
cover_alt: o logotipo do Oracle e um celular mostrando o console ao vivo de uma cena chamada Ice Cave, com o slogan "Um toque, a sala toda."
---

## overview.md

::: statement
text: Mestres de jogo podiam ter amigos na sala, ou atmosfera na tela. Não os dois.
:::

Jogadores preferem jogar presencialmente, mas as ferramentas que adicionam atmosfera são feitas para telas, e telas tiram as pessoas da sala.

Oracle é um app de celular que deixa o mestre controlar a própria sala. Um toque ajusta as luzes, o ar-condicionado, as persianas, a TV e o som, usando dispositivos inteligentes que as pessoas já têm.

## takeaways/

Cada decisão responde a um dos três achados em research.md.

::: decision 01-use-what-is-already-in-the-room
title: a sala já é um palco
subtitle: O preço era a barreira, então o Oracle usa o que as pessoas já têm.
body:
  Os jogadores achavam os produtos de mesa boas ideias, mas caros demais, então eu não criei nada para comprar. O Oracle se pareia com as luzes, o ar-condicionado, as persianas e a TV que já existem na casa, agrupados por ambiente.

  O limite de intensidade de luz e temperatura é definido uma vez, durante essa mesma configuração, para que ninguém precise pensar nisso no meio da sessão.
media:
  - full | assets/oracle/pairing-devices.webm | Gravação de movimento: o Oracle escaneando a casa e encontrando dispositivos um por um, escolhendo quais adicionar e em qual ambiente ficam, depois o código de configuração e os caminhos de integração | // nada para comprar, só pareia o que já está lá | tall
:::

::: decision 02-device-by-device
title: uma cena é um conjunto de dispositivos, não uma configuração só
subtitle: Cada dispositivo tem seu próprio editor e mostra seu próprio estado.
body:
  Uma cena tem cinco ou seis dispositivos, e eles não recebem a mesma entrada. Uma luz precisa de uma cor e um efeito, um ar-condicionado de uma temperatura, uma TV de uma mídia.

  Cada dispositivo tem seu próprio editor, e seu card mostra o que vai fazer sem precisar abri-lo. Sons e imagens vêm de uma biblioteca integrada ou dos próprios arquivos do mestre, em pastas e favoritos.
media:
  - full | assets/oracle/ice-cave-build.webm | Gravação de tela: a cena Ice Cave sendo construída do zero em um celular, com os cards de luz, ar-condicionado, TV e som se preenchendo um por um | // cada card carrega seu estado, então a cena se lê sem abrir nada | tall
:::

::: decision 03-run-the-table
title: o mestre conduz a mesa no meio de uma frase
subtitle: Conduzir uma sessão não é o mesmo trabalho que construir uma.
body:
  O console ao vivo coloca os pads de efeito e o mixer de som em primeiro plano, porque é isso que um mestre busca no meio de uma frase.

  Aplicar uma cena mostra o progresso dispositivo por dispositivo. Se o quinto trava, o mestre vê qual é e pode tentar de novo.
media:
  - full | assets/oracle/live-console.webm | Gravação de tela: o console ao vivo aplicando uma cena, cinco dispositivos marcando verde, o quarto falhando e se recuperando na nova tentativa, depois o pad de vento e o mixer de som | // o caminho de falha também foi desenhado, então um dispositivo com falha nunca encerra a cena | tall
:::

::: decision 04-describe-a-scene
title: automatize a configuração, mantenha o julgamento
subtitle: A ia rascunha a cena a partir de uma frase. O mestre revisa dispositivo por dispositivo.
body:
  Digitar uma frase deveria ser mais rápido do que construir seis dispositivos à mão.

  O resultado chega como um conjunto revisável de mudanças por dispositivo, e o app nunca muda a sala por conta própria. O mestre pode pré-visualizar, aplicar ou desfazer antes que as luzes mudem numa mesa cheia de gente.
media:
  - full | assets/oracle/describe-it.webm | Gravação de tela: uma frase digitada no Oracle, o diff rascunhado por dispositivo, uma pré-visualização na sala, depois aplicar e desfazer | // automatize a configuração, mantenha o julgamento | tall
:::

## research.md

Começamos com uma pergunta: por que uma mesa presencial parece menos imersiva do que poderia ser, e o que poderia resolver isso sem quebrar o que a torna social?

Fizemos 27 entrevistas em lojas de jogos, na Niterói Expo Geek 2025 e na CINE RPG, uma escola para mestres, com jogadores e profissionais de 18 a 26 e de 30 a 45 anos, nove deles no grupo mais velho. Comparamos o que ouvimos com o Censo RPG Brasil 2023. Todo mundo já estava em um evento de jogos ou em uma escola de jogos, então são jogadores engajados, não casuais.

::: outcomes
items:
  - 980+ | respostas no Censo RPG Brasil 2023
  - 12M | casas brasileiras com dispositivos inteligentes, segundo o IBGE. Contexto para o tamanho do mercado, mais amplo que o nosso público
:::

As entrevistas nos deram três achados.

::: media
items:
  - full | assets/oracle/c2-gap.webm | Mapa animado de ferramentas de imersão contra presença física, com o Oracle caindo no canto vazio
:::

**01. Todo mundo quer a mesa presencial.** Os dois grupos de idade preferem o presencial e tratam o online como alternativa. Jogadores mais jovens querem luz, som e imagens, os mais velhos ficam satisfeitos com a narração. Qualquer ferramenta tinha que ser opcional, nunca o centro da mesa.

**02. A atmosfera existe, mas não na sala.** O online adiciona som e imagem, mas convida à distração. O presencial é social, mas a imersão depende só da voz do mestre. Foundry e Roll20 colocam uma tela no meio da mesa, e o hardware que evita isso é caro e, em geral, importado. Nada acessível faz as duas coisas.

**03. A decepção chega tarde.** Um jogador novo chega esperando a intensidade que viu online e encontra uma mesa que depende de uma única voz. Sessões longas e monótonas desgastam a motivação de continuar jogando, e o Oracle visa esse ponto.

O briefing virou: adicionar atmosfera à mesa presencial, de forma barata, sem uma tela no meio.

## design-system.md

Oracle roda sobre um sistema pequeno. O arquivo de design tem quatro coleções de variáveis: Primitives, Semantic com um modo claro e um escuro, Scale para espaçamento e raio, e Mood, uma paleta por cena. A tipografia vem de três famílias: Fraunces para nomes e capítulos, Inter para controles e corpo de texto, Geist Mono para números ao vivo.

Os componentes carregam seus próprios estados, então o dispositivo com falha é desenhado com tanto cuidado quanto o que está funcionando.

::: media
items:
  - full | assets/oracle/oracle-ds-foundations.webp | Os tokens de design do Oracle: cores semânticas para superfície, texto, ação e status, seis paletas de mood, a escala tipográfica em Fraunces, Inter e Geist Mono, e as escalas de espaçamento, raio e toque | | natural
  - full | assets/oracle/oracle-ds-components.webp | Quatro componentes mostrados em cada estado: SceneBanner parado e ao vivo, RoomMap desligado, aplicando e ao vivo, TabBar com três abas ativas, e a LiveIsland | | natural
  - full | assets/oracle/oracle-ds-annotated.webp | O console ao vivo e a tela de falha parcial lado a lado, com dez notas numeradas sobre hierarquia, papéis de tipografia, a única ação em verde-limão e como o estado de erro foi escrito | | natural
:::

## testing.md

Testamos duas vezes. Um mestre usou o protótipo em um teste de usabilidade e navegação. Depois fizemos uma sessão de jogo curta em que a equipe mudava a sala manualmente, seguindo os presets que o mestre tinha criado, para simular o que o app faria.

::: quote
text: Depois que você cria uma cena, você sabe criar todas as outras. Depois que eu criei a primeira, eu conseguia criar mais sem problema nenhum.
name: Lucas Marcel Toledo
role: mestre de RPG e estudante de design
:::

Os limites: um mestre, uma sessão curta, e mudamos os dispositivos manualmente em vez de pelo app. Isso nos conta como uma pessoa usou, e é pequeno demais para contar como um estudo de usabilidade.

## project-info.md

Eu fiz o design e o protótipo: 60 telas em 8 fluxos no Figma, o design system por trás deles, e o protótipo que testamos. Construído com Figma e Claude Code.

A pesquisa de campo, a ideia e a documentação foram compartilhadas pela equipe, e os achados em research.md são tanto deles quanto meus.
