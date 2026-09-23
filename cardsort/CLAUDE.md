# CARDSORT — Guia rápido para Claude

Ferramenta de pesquisa de card sorting aberto, pública, em PT-BR. Respondente preenche
demografia, ordena cartas em listas que ele mesmo cria, e prioriza essas listas por
arrastar. Resultados agregados ficam públicos em `/results/`.

## Stack
- Vanilla HTML + CSS + JS — **sem framework, sem build step** (mesmo padrão do `skrill/`)
- Supabase (PostgreSQL) via CDN (`supabase.min.js`), sem modo demo
- GitHub Pages (estático) — subsite autocontido, sem paths cruzando para `portfolio/` ou `skrill/`
- Fonte: `Space Grotesk` (única, self-hosted em `assets/fonts/`)

## Mapa de páginas
| Caminho | Função |
|---|---|
| `/cardsort/` | Formulário de demografia + board de ordenação de cartas |
| `/cardsort/results/` | Insights públicos, agregados de todas as respostas |

## Banco de dados
Tabela única `card_sort_submissions` (RLS ativo — ver SQL abaixo, política só permite
`insert`/`select` anônimos; `update`/`delete` bloqueados por padrão):

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | uuid pk | `gen_random_uuid()` |
| `created_at` | timestamptz | default `now()` |
| `card_set` | text | versão do conjunto de cartas, hoje `'sushi-menu-v1'` — trocar sempre que a lista de itens mudar, nunca reescrever dados antigos |
| `respondent_name` | text \| null | opcional |
| `age_range` | text | uma de `18-24 \| 25-34 \| 35-44 \| 45-54 \| 55+` |
| `gender` | text | uma de `Masculino \| Feminino \| Outro \| Prefiro não dizer` |
| `area` | text | texto livre, normalizado (trim + lowercase) só na agregação, não no banco |
| `lists` | jsonb | `[{ name: string, priority: number (1 = mais prioritário), cards: string[] }]` |

SQL de criação está no histórico do plano de implementação — rode manualmente no editor
SQL do Supabase se a tabela precisar ser recriada.

## Cartas (`js/cards.js`)
`CARDS` é um array hardcoded com os 54 itens do cardápio (`CARD_SET = 'sushi-menu-v1'`),
cada um `{ id, label, image }`: `id` é um número de dois dígitos (`'01'`..`'54'`, estável
e curto — usado como eixo do heatmap em `results/`), `label` é o nome em PT-BR mostrado
no card, `image` é o caminho para a foto em `assets/Fotos do itens/` (ou `null` — item 45,
"Combinado 30 peças", não tem foto ainda). `sort.js` roda `image` por `encodeURI()` antes
de usar em `<img src>`, porque a pasta e alguns arquivos têm espaços/acentos no nome. Ao
trocar o conjunto de cartas, sempre mude `CARD_SET` junto, para que respostas antigas e
novas nunca se misturem nos agregados de `results.js`.

`sort.js` embaralha a ordem do pool uma vez por carregamento de página (`shuffle()`,
Fisher-Yates, aplicado a `state.pool` na inicialização) — cada respondente vê as
cartas em uma ordem diferente. Isso evita viés de ordenação alfabética/posicional,
prática padrão em card sorting aberto. Não reembaralha em re-renders subsequentes
(só na carga inicial), senão as cartas "pulariam" de posição a cada interação.

## Regras do sort
- Cada carta pertence a **exatamente uma lista** por vez — mover uma carta já colocada
  para outra lista a remove de onde estava.
- Envio só libera quando o pool está vazio (todas as 26 cartas distribuídas) **e** existe
  pelo menos uma lista.
- A ordem das listas na tela **é** a prioridade — não existe campo de prioridade separado
  no estado do cliente, ela é derivada do índice no array `state.lists` em `sort.js`.

## Drag-and-drop (`js/dragdrop.js`)
Implementação própria via Pointer Events (sem HTML5 native DnD, que não funciona em
touch). `initSortable(root, { onCardMove, onListReorder })` é ligado uma única vez em
`root` (delegação de evento) — novos cards/listas renderizados depois não precisam
re-bind. Ver comentários no arquivo para o fluxo completo (promoção por threshold de
6px, ghost element, hit-test via `elementFromPoint`, distinção card vs. lista pelo
handle agarrado no `pointerdown`).

## Insights (`js/aggregate.js` + `js/charts.js` + `js/results.js`)
`results.js` busca a tabela inteira (`select('*')`) uma vez — aceitável na escala desta
ferramenta (estudo pequeno, não produto de alto tráfego). `aggregate.js` tem funções
puras (`countBy`, `normalizedListNameFrequency`, `averagePriorityByListName`,
`cardCooccurrence`, `listCountHistogram`); `charts.js` renderiza cada dataset como SVG
inline estático (sem lib de gráfico, sem canvas, sem animação — mesmo espírito de
`portfolio/js/chart.js`, mas cópia própria pois subsites não compartilham JS entre si).

## Paleta de cores
`css/style.css` define `--earth-1`..`--earth-12`, uma paleta terrosa de 12 tons
(terracota, ocre, oliva, musgo, ferrugem, argila, areia, sienna, ardósia, âmbar,
sálvia, laranja queimado). Cada lista criada recebe uma cor por índice (`i % 12`,
cíclico) — `sort.js` define `LIST_COLORS` (nomes de var CSS) e injeta
`style="--list-color:..."` no `.list-panel`; o resto do CSS (cabeçalho, badge de
rank, borda das cartas dentro da lista, estado `drag-over`) lê `var(--list-color)`
por herança, então só o `.list-panel` precisa do inline style. Cartas no pool
continuam neutras (preto/branco) — a cor só aparece quando uma carta entra numa
lista, para sinalizar pertencimento.

`results/js/charts.js` reusa a mesma paleta (array `EARTH_COLORS`, valores
`var(--earth-N)`, mesma ordem) para colorir cada barra em `barChart`/`histogram`
por índice, e usa `--earth-5` (ferrugem) com opacidade variável no heatmap de
co-ocorrência. Os dois arquivos precisam ficar em sincronia manualmente — não há
build step para gerar um a partir do outro.

## Padrões de código
- Scripts globais simples (`<script src="...">`), sem ES modules — mesmo padrão do `skrill/`
- Cada página tem uma IIFE que popula `#app`
- Nomes de lista digitados pelo usuário são sempre escapados (`escapeHTML` em `sort.js`)
  antes de ir para `innerHTML` — texto livre público, tratar como não confiável
- Sem emojis no código ou na UI
