---
slug: yura
order: 4
title: hakkotai
type: web design, branding
role: branding, web design, direção de motion
status: conceito
timeline: 2026
team: sozinho
built_with: html, css, javascript, figma, claude code
outcome: Uma página de produto único, com uma loja de front-end clicável por trás, para uma guitarra que eu construí à mão.
summary: Uma página de loja para um único produto, uma guitarra que eu pintei à mão, e as decisões de design por trás de cada seção dela.
eyebrow: projeto pessoal · web design e branding
headline: Uma página de produto para uma guitarra que eu pintei à mão, desenhada para mostrar como ela brilha no escuro.
live: /yura
live_label: visitar
live_text: lope.design/yura
cover: assets/yura/yura-cover.webm
cover_alt: Peça de movimento em loop: a estrela da YURA gira e bate ao lado do logotipo YURA sobre uma foto escura da guitarra, as letras trocam para HAKKOTAI, depois as luzes se apagam e o logo pisca de volta em verde fosforescente
---

## README.md

HAKKOTAI é uma guitarra que eu fiz à mão: tinta rosa, uma caveira rachada, vinil fosforescente. YURA é a marca fictícia e a página de produto que eu construí para vendê-la para alguém que não pode pegar nela.

Eu fiz a marca, o design da página e a direção de motion, trabalhando sozinho. O Claude Code escreveu a primeira versão do código. Eu dirigi cada cena, ajustei à mão os tempos de animação, o espaçamento e o texto, e fiz os cortes.

É um conceito no ar em lope.design/yura, sem vendas e sem teste com usuários, então não dá para mostrar conversão. A loja em volta da página (carrinho, busca, um painel de conta, checkout) é um mock de front-end: o carrinho mora no localStorage, não existe backend nem pagamento de verdade, mas é possível clicar por todo o fluxo.

## why.md

::: statement
text: O brilho é a única coisa que uma foto não consegue mostrar, então a página apaga as luzes.
:::

HAKKOTAI é uma guitarra que eu fiz. Começou como uma superstrat vermelha comum, para um curso de design em 2024. Eu a desmontei, lixei, pintei de rosa, envolvi em vinil fosforescente e montei de novo à mão.

Eu ficava me perguntando como venderia ela numa página de loja, e como fazer essa página valer a visita. Então construí uma marca fictícia em volta dela, a YURA, e uma página de produto no estilo dos grandes lançamentos de flagship, em que um único objeto ocupa a tela toda.

A marca é um figurino para a página. Segurando a guitarra, você entende na hora: o rosa, a caveira, o verde que continua brilhando depois que as luzes se apagam. Um navegador não dá nada disso, sem peso, sem interruptor de luz e sem jeito de girar ela nas mãos.

Eu desenhei para um estranho que nunca pegou na guitarra e tem poucos segundos para decidir se ela é real. A página precisa fazer esse estranho acreditar que a guitarra é real o suficiente para clicar em Comprar. Eu nunca entrevistei esse estranho; ele é a minha suposição. Cada cena responde a uma dúvida que eu imaginei que ele teria: o que é isso, por que isso importa, é um render, é artesanal de verdade.

## the-brand.md

YURA tem o nome da banda por trás da música que deu origem à guitarra, HAKKOTAI (1998), da Yura Yura Teikoku.

O sistema é pequeno de propósito. Preto puro, para que cada seção controle sua própria luz. Um rosa vibrante para o corpo e os botões, e um verde-limão que só significa uma coisa: brilho. Quatro fontes, cada uma com um só trabalho: Bebas Neue para as linhas de impacto, Inter para tudo que precisa ser lido, M PLUS 1p para o kanji e Martian Mono para os rótulos. A estrutura toma de empréstimo a página de produto flagship, que já diz "isto é um produto real, com um preço real".

## the-page/

::: decision 01-the-hero-is-a-photo-shoot
title: o hero é montado como um ensaio fotográfico, não diagramado como uma página
subtitle: Luz, fumaça e uma guitarra que você quase consegue pegar.
body:
  A guitarra se estende pelo quadro e sangra para fora da borda esquerda, e o logotipo fica embaixo à direita, de modo que o braço passa pelo vão entre as letras. A cena é um palco de proporção fixa, então a guitarra e o tipo escalam juntos.

  A cena é iluminada em vez de jogada sobre um preto chapado: uma luz rosa atrás do corpo, uma filmagem real de fumaça passando, e um borrão de tinta verde-limão atrás da guitarra que dá uma pista do brilho que vem a seguir. Só o kanji 発光体, "um corpo luminoso", recebe um brilho verde sutil.

  Mova o cursor e a guitarra se inclina na direção dele com uma física de mola, de forma que uma mudança rápida de direção mantém o impulso em vez de travar de repente. A inclinação só funciona com um cursor de precisão e sem movimento reduzido; no toque, a guitarra fica parada. O preço fica bem abaixo da chamada para ação, "A partir de $300 ou $33,99/mês.", porque uma página de produto que esconde o preço não parece uma loja real.
media:
  - full | assets/yura/hero-pointer-tilt.webm | Gravação de tela: o hero carregando, depois a guitarra se inclinando em 3D enquanto o cursor se move sobre ela, com fumaça passando ao fundo
:::

::: decision 02-a-sentence-you-cannot-skip
title: uma frase que você não consegue pular rolando, e então ela se quebra
subtitle: O manifesto se ilumina letra por letra, depois se espatifa na próxima cena.
body:
  Logo depois do hero vem a ideia por trás da guitarra: tire o sangue, o suor e as lágrimas, e o que resta é puro e luminoso. A seção tem três telas de altura e o painel preto que a sustenta fica fixo durante todas elas. O primeiro trecho de rolagem ilumina as letras na ordem de leitura, então ninguém consegue passar pelo texto sem ler. Isso tira o controle da rolagem do usuário por três telas, um custo real que eu escolhi pagar porque essa é a única frase que a página não pode deixar passar batido.

  O último trecho a quebra. O painel se estilhaça a partir de um ponto de impacto, e cada fragmento carrega seu próprio pedaço da frase ao cair.

  Uma versão anterior clareava o fundo em branco a partir do chão enquanto as últimas palavras se iluminavam. Eu cortei porque competia com a quebra. A seção agora fica preta o tempo todo, e são os fragmentos que levam você para a próxima cena.
media:
  - full | assets/yura/statement-lights-then-shatters.webm | Gravação de tela: o parágrafo do manifesto se iluminando letra por letra na rolagem, depois o painel se estilhaçando em fragmentos que caem sobre uma sala branca
:::

::: decision 03-the-page-turns-the-lights-off
title: a página apaga as luzes para você
subtitle: O único recurso que uma foto não consegue mostrar, encenado na rolagem.
body:
  O grande truque da guitarra é que a arte em creme brilha verde no escuro. Uma foto estática disso só prova que alguém tirou uma foto no escuro. Então a cena do brilho faz isso na sua frente: ela abre numa sala branca e iluminada, com "Alto, na luz.", e, enquanto você rola, as lâmpadas falham, a sala fica preta e o título muda para "Luminoso, no escuro." enquanto o vinil carrega no corpo da guitarra.

  As luzes se apagando são três momentos que se sobrepõem: a sala escurece das bordas para o centro, a última luz deixa a guitarra, depois o vinil começa a brilhar. Um único crossfade deixaria o meio da seção parado num cinza chapado. As lâmpadas piscam duas vezes, e a troca do título acontece na segunda piscada, no mesmo momento em que a energia cai.

  A maior parte da iteração foi sobre legibilidade. Um texto que muda de cor enquanto o fundo também muda de cor desaparece por alguns quadros no momento em que os dois se cruzam, então a sala fica totalmente preta exatamente na janela em que um título já saiu e o outro ainda não chegou. A guitarra escurece por brilho, não por opacidade, porque opacidade fazia parecer uma foto ficando translúcida em vez de uma lâmpada se apagando.
media:
  - full | assets/yura/glow-scene-lights-out.webm | Gravação de tela de uma rolagem lenta pela cena: a sala branca e iluminada sob "Alto, na luz.", as lâmpadas piscando duas vezes, a sala ficando preta e a arte da guitarra brilhando verde enquanto o título muda para "Luminoso, no escuro."
:::

::: decision 04-then-prove-it-is-real
title: depois prove que não é um render
subtitle: Um efeito roteirizado convida a uma pergunta, e a próxima seção responde.
body:
  Um brilho tão roteirizado convida à dúvida. Então a próxima coisa na página são três fotos reais da guitarra brilhando num quarto escuro, com uma linha embaixo: "Não é render. Fotografado num quarto escuro."

  As fotos aparecem do mesmo jeito que o vinil, escuras primeiro e depois carregadas, e um bloom continua vindo da cena do brilho, para parecer o mesmo quarto escuro que você acabou de deixar.
media:
  - full | assets/yura/proof-photos-in-the-dark.webm | Gravação de tela: as três fotos da guitarra aparecendo escuras e depois carregadas, sob a linha "Não é render. Fotografado num quarto escuro."
:::

::: decision 05-the-copy-does-the-work
title: o nome e as features são escritos como motivos
subtitle: A maioria dos visitantes não consegue ler o nome, e uma ficha técnica não dá motivo nenhum para se importar.
body:
  HAKKOTAI é uma palavra que a maioria dos visitantes não vai conhecer, e ninguém lembra de um nome que não consegue ler. Então o nome se torna conteúdo: três kanji, cada um com sua leitura e seu significado, emissão, luz, corpo, somando "um corpo luminoso". Passar o mouse sobre um caractere faz uma faixa verde-limão deslizar por ele, como uma carga fosforescente.

  A seção de design é uma grade de seis blocos, e cada um transforma um fato em um motivo para se importar. A tinta rosa se torna "Rosa, não vermelho. Mude a cor do sangue e a tragédia se torna uma festa." Um bloco não tem especificação nenhuma: "Uma guitarra é só uma guitarra."

  A tabela completa de especificações vem depois e é deliberadamente simples. Depois de uma página de espetáculo, uma lista calma de fatos parece honesta.
media:
  - full | assets/yura/name-and-bento.webm | Gravação de tela: os três kanji com uma faixa verde-limão deslizando por cada um ao passar o mouse, depois uma rolagem pelos seis blocos
:::

::: decision 06-handmade-as-a-hand-of-cards
title: a montagem é distribuída como uma mão de cartas
subtitle: Sete etapas, de uma guitarra vermelha a uma rosa, sem um parágrafo de explicação.
body:
  "Feito à mão" é o que diferencia essa guitarra de qualquer coisa de catálogo, e qualquer um pode alegar isso. Então a montagem recebe a rolagem mais longa da página. As sete etapas são distribuídas pela direita, uma por uma, em um arco em direção a quem vê, e cada uma empurra a carta de baixo de volta para a pilha, então a fileira se lê como uma pilha de trabalho, e não como uma faixa de miniaturas.

  A sala assume a cor de qual carta estiver no topo. Começa vermelha, com a guitarra de fábrica, esquenta durante a lixa, fica cinza fria no primer e termina num rosa vibrante, de modo que a cor da luz conta a história da pintura sem nenhuma legenda.

  Abaixo, uma nota de rodapé admite que alguns adesivos tinham cola fraca e outros rasgaram na faca, e que as cicatrizes ficaram. Uma foto de catálogo esconderia isso, e eu deixei ficar.
media:
  - full | assets/yura/build-deck-dealing.webm | Gravação de tela: as sete fotos da montagem sendo distribuídas uma a uma na rolagem, a luz da sala mudando de vermelho para cinza e depois rosa conforme cada uma chega
:::

::: decision 07-a-frame-around-the-product
title: uma barra discreta no topo, uma marca no final
subtitle: A guitarra fica com a primeira tela, e o final da página vende mais do que um objeto.
body:
  A única barra na página é uma faixa fina de vidro com um botão rosa de Comprar e sem links de seção, porque qualquer link ali em cima competiria com a guitarra. O custo é a descoberta, e eu não adicionei um link de atalho. Para compensar, ao chegar nas etapas de montagem, um pill sobe do fundo da tela com um botão Explorar que abre todas as seções, e um segundo botão de Comprar.

  No outro extremo, uma correia, um amplificador combo e um cabo trançado, todos no rosa YURA e marcados como "Em breve", transformam um produto em uma marca. O fechamento repete o kanji, o preço e o botão de Comprar, e três notas de rodapé contam de onde vem o nome, que começou como um projeto de curso de design, e que YURA é uma marca conceito.
media:
  - full | assets/yura/bar-and-closer.webm | Gravação de tela: a barra de vidro do produto no topo ficando vazia durante o hero, o pill flutuante subindo nas etapas de montagem e se abrindo no índice de seções com "Feito à mão" em destaque, depois uma rolagem até os acessórios "em breve" e a chamada final para comprar
:::

::: decision 08-every-scene-has-a-still
title: toda cena ainda funciona com o movimento desligado
subtitle: A animação entrega a história, e a história sobrevive sem ela.
body:
  Cada cena de rolagem tem um estado alternativo que conta a mesma história parada. Com o movimento reduzido ativado, o manifesto deixa de ficar fixo e fica simplesmente legível, e a montagem é uma grade simples das mesmas cartas. A cena do brilho ainda fica fixa e escurece na rolagem, mas nada voa para dentro do quadro. Sem JavaScript, a cena do brilho já começa direto no estado que ela descreve, o quarto escuro com o vinil aceso, em vez de reservar três telas de rolagem que ela não pode mais usar.

  Isso também é um teste para o design. Se a página só funciona quando tudo se move, é o movimento que está vendendo, não o produto. A preferência de movimento é lida uma vez, ao carregar a página, então mudá-la no meio da visita exige recarregar.
media:
  - full | assets/yura/reduced-motion-scroll.webm | Gravação de tela: uma rolagem pela página com o movimento reduzido ativado, o manifesto como texto simples e legível, a cena do brilho escurecendo sem nada voando para dentro do quadro, e as etapas de montagem como uma grade estática
:::
