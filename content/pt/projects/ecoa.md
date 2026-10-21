---
slug: ecoa
order: 6
title: ecoa × petrobras
type: design de produto, pesquisa de ux
role: pesquisa de ux, design de produto e de jornada, design de interface, design e apresentação do pitch, alguma implementação de front-end
status: em andamento
timeline: 2026
team: dois trios multidisciplinares separados, um por produto: um engenheiro, uma pessoa de product-ops, e eu como design lead
built_with: figma, pesquisa com usuários, recuperação baseada em llm, html, css, javascript
outcome: Duas ferramentas internas guiadas por ia, construídas uma depois da outra para a Petrobras, ambas aceitas e pré-aprovadas para a construção completa.
summary: Design lead em duas ferramentas internas guiadas por ia construídas no Instituto Ecoa para a Petrobras, cada uma com sua própria equipe, sua própria pesquisa e seu próprio case para apresentar.
cover: assets/ecoa/ecoa-cover.webm
nav_image: assets/ecoa/ecoa-nav.webp
cover_alt: Peça de movimento em loop: em fundo branco, a marca da Ecoa aparece e seu logotipo deslisa ao lado, o logo e a marca da Petrobras tomam o lugar, depois as duas marcas se reduzem só aos símbolos e uma cruz verde-azulada e verde é desenhada entre eles
---

## README.md

Eu sou design lead em duas ferramentas internas guiadas por ia construídas no Instituto Ecoa para a Petrobras, uma depois da outra: um assistente de compliance, depois uma plataforma de conhecimento. Cada uma teve sua própria equipe, sua própria pesquisa e seu próprio pitch.

Eu trabalhei nas duas, da pesquisa até a entrega: entrevistas com usuários, o design de produto e de jornada, a interface, e o pitch que conseguiu a aprovação de cada uma. Também contribuí com alguma implementação de front-end.

Um NDA cobre os detalhes internos dos dois produtos, incluindo as telas. As duas seções abaixo mostram o fluxo e o raciocínio no lugar da interface.

## compliance-assistant/

::: meta
timeline: 26 mar a 2 jul 2026
pitch_outcome: aceito, pré-aprovado para construção
:::

::: media
items:
- diagram | assets/ecoa/compliance-assistant-flow.svg | Diagrama: a pergunta repetida de um parceiro passa por uma recuperação limitada a uma base de conhecimento revisada por especialistas, até uma resposta com o trecho-fonte exato anexado, que então é verificada contra o próprio manual
:::

::: toolbox
items:
- o pedido | parceiros, repetindo a mesma pergunta sobre um manual contábil público da anp
- a solução | toda resposta cita o trecho-fonte, para que um parceiro possa verificar contra o manual
- a salvaguarda | respostas só vêm de uma base de conhecimento revisada por especialistas
- a prova | toda resposta rastreável até o próprio manual
:::

## knowledge-platform/

::: meta
timeline: 6 jul a 20 out 2026
pitch_outcome: aceito, pré-aprovado para construção
:::

::: media
items:
- diagram | assets/ecoa/knowledge-platform-flow.svg | Diagrama: um sistema legado é desativado, seus dados são alinhados aos princípios FAIR antes de qualquer interface ser construída sobre eles, e então uma única pergunta consegue buscar em todos os sistemas, de todos os anos que já tocaram o registro
:::

::: toolbox
items:
- o pedido | conhecimento perdido a cada vez que um sistema legado é desativado
- a solução | alinhar os dados aos princípios FAIR antes de construir qualquer interface sobre eles
- o resultado | uma única pergunta agora busca em todos os sistemas, de todos os anos, que já tocaram o registro
- o padrão | alinhado ao fair: findable, accessible, interoperable, reusable
:::

## outcome.md

A Petrobras não tinha obrigação nenhuma de levar qualquer um dos produtos além do pitch. Cada um foi apresentado com seu próprio case, construído e testado como qualquer outra coisa entregue aqui: primeiro o assistente de compliance, a plataforma de conhecimento alguns meses depois.

Os dois foram aceitos e pré-aprovados para a construção completa.

[todo: números de adoção, cronograma de lançamento, ou uma frase de um stakeholder liberada, quando disponível]

## learnings.md

Eu mantive esses dois como projetos separados em vez de um único contrato dividido em dois, o que deixou mais clara a diferença entre eles. Eles compartilhavam uma empresa; os problemas que resolviam não tinham nada em comum.

Trabalhar na plataforma de conhecimento me levou a decisões sobre como os dados são combinados entre sistemas que nunca tinham concordado sobre o que contava como o mesmo registro. Isso é mais profundo na stack do que o design de interface costuma alcançar, e boa parte do trabalho de design acabou ali.

Em um ambiente regulado, a maior parte do esforço de design foi em fazer com que toda resposta pudesse ser verificada contra a sua fonte.

::: credits
items:
  - lope (eu) | pesquisa de ux, design de produto e de jornada, design de interface, design e apresentação do pitch, além de alguma implementação de front-end
  - engenheiro | implementação de backend e de recuperação
  - product-ops lead | organizou reuniões, cuidou de relatórios e formulários e do resto da carga administrativa, manteve os prazos organizados e planejados
:::
