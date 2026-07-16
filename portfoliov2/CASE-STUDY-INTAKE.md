# Intake de Case Study — do repositório do projeto até um case como o do Esqueleto Chico

Este documento é um **roteiro para a Claude** (o assistente) usar quando o Lope quiser
substituir um dos projetos placeholder por um case study real, com a mesma profundidade
do **Esqueleto Chico** (o case de referência em `js/data/projects.js`).

> **Regra número 1 — pergunte, não assuma.**
> Um portfólio precisa estar factualmente correto. Se uma informação **não estiver
> literalmente no repositório/nos materiais fornecidos**, a Claude **não inventa**: ela
> **pergunta ao Lope** (de preferência com a ferramenta `AskUserQuestion`, agrupando as
> perguntas). Números, fórmulas, nomes próprios, datas, papéis e links são os campos onde
> um palpite errado é mais perigoso — nunca preencher "no feeling".

---

## 0. Qual projeto substituir

Hoje existe 1 projeto com dados de exemplo em `js/data/projects.js`:
`party-howl`.

**Antes de tudo, pergunte ao Lope:**
1. Qual desses três (ou qual projeto novo) estamos preenchendo agora?
2. Onde estão os materiais? (pasta local, link de repositório GitHub/GitLab, link do
   itch.io, planilha do Google Sheets, pasta de arte, link do trailer no YouTube…)
3. O `id` novo deve mudar? (o `id` vira parte da URL `#case/<id>` — confirme o slug.)

Não comece a extrair nada sem essas respostas.

---

## 1. Como este documento deve ser usado (fluxo)

1. **Reúna as fontes** que o Lope indicar (seção 2).
2. **Extraia** o que der para extrair com segurança e **marque como "confirmado"**.
3. **Liste tudo que ficou incerto ou faltando** e **pergunte ao Lope** (seção 4 + seção 6).
4. Só depois de fechar as perguntas, **escreva o objeto** em `js/data/projects.js`
   (seção 5), seguindo o schema e as regras de bilinguismo do `CLAUDE.md`.
5. **Verifique no navegador** (abra `#case/<id>`, alterne EN⇄PT, cheque o layout).

**Nunca pule o passo 3.** Se estiver na dúvida entre assumir e perguntar, pergunte.

---

## 2. Fontes no repositório e o que extrair de cada uma

Mapa de "onde procurar → o que isso costuma virar no case". Trate como pistas, não como
verdades: sempre confirme a interpretação com o Lope antes de escrever.

| Fonte no repositório | Campos que ela costuma alimentar | Cuidado |
|---|---|---|
| **README / GDD / design docs** (`.md`, `.pdf`, `.docx`, Notion export) | `overview`, `challenge`, `coreLoop`, `systems`, `learnings`, `type` | Pode estar desatualizado. Confirme o que de fato foi implementado. |
| **Planilhas de balanceamento** (`.xlsx`, `.csv`, export do Google Sheets) | `balancing.tables`/`table`, `balancing.formula`, `combat.formula`, `progression` | **Não transcreva números de cabeça.** Copie célula a célula e confirme unidades. |
| **Código-fonte** (Unity `.cs`, Godot `.gd/.gdscript`, `.tscn`, `.prefab`) | `implementation`, `combat.formula` (fórmula real do código), `systems`, `tools` | A fórmula do código pode diferir da planilha — pergunte qual é a "oficial". |
| **Pasta de arte / assets** (`.webp/.png/.jpg`, `Art/`, `Sprites/`, `UI/`) | `cover`, `coverAlt`, `heroImage`, `gallery` | Não presuma direitos/autoria. Confirme quais imagens podem ir ao portfólio. |
| **Trailer / vídeo** (link YouTube, `.mp4`) | `heroVideo {youtube, title}` | Precisa do **ID do YouTube** (ex.: `Z_3GRWZEDSQ`). Se não houver trailer, **omita `heroVideo`** e use `heroImage`. |
| **itch.io / loja / build** | `links [{label,url,kind}]` (`kind: "play"`, `"video"`, etc.) | Confirme cada URL — não monte URL "por dedução". |
| **`git log` / histórico de commits** | `role`, `responsibilities`, `implementation`, período de trabalho | Mostra o que o Lope tocou, mas **não** define o papel oficial — confirme. |
| **Créditos / equipe** (README, itch, ficha técnica) | `role`, `responsibilities`, nomes próprios | Nomes de pessoas/estúdios: copie exatos, **não traduza** (ver `CLAUDE.md`). |

---

## 3. Mapeamento campo a campo (schema de `projects.js`)

Referência viva: leia o objeto `esqueleto-chico` em `js/data/projects.js` e o schema no
`CLAUDE.md` ("Case-study schema"). Todos os campos de `caseStudy.*` são **opcionais** — o
renderizador (`js/casestudy.js`) simplesmente pula o que não existir. **Se não houver base
sólida para um campo, prefira omiti-lo a inventá-lo.**

Cada string visível é um objeto `{ en, pt }`. **EN é o idioma principal** (recrutadores leem
primeiro): escreva o EN natural e idiomático e adapte o PT — nunca uma tradução literal.
Siga o glossário e as regras do `CLAUDE.md`.

### Campos de topo do projeto
- `id` — slug/URL. **Perguntar** o slug desejado.
- `accent` — cor de destaque hex (usada em sombras/números). **Perguntar** a cor, ou propor
  uma da paleta (`--yellow #FFC400`, `--pink #FF4F87`, `--paper #F5F1E8`) e confirmar.
- `name` — nome do jogo. Nome próprio, **não traduzir**. Confirmar grafia/acentos.
- `type` `{en,pt}` — gênero/plataforma (ex.: "2D action-platformer (PC)"). Confirmar.
- `role` `{en,pt}` — **papel oficial** do Lope no projeto. **Sempre confirmar** — não deduzir do `git log`.
- `tools[]` — lista de ferramentas (nomes próprios, não traduzir: Unity, Godot, Blender…). Confirmar.
- `cover` + `coverAlt {en,pt}` — imagem do card na home. Confirmar qual arquivo e o texto alt.
- `summary {en,pt}` — 2–4 frases para o card. Pode ser redigido, mas **confirme os fatos** (estúdio, papel, sistemas citados).

### Campos de `caseStudy`
- `heroVideo {youtube, title{en,pt}}` — **só se houver trailer**. Precisa do ID do YouTube.
- `heroImage {src, alt{en,pt}}` — pôster/key art no topo (fallback quando não há vídeo).
- `overview {en,pt}` — o que é o jogo, pitch/contexto. Confirmar premissa e estúdio.
- `role {en,pt}` — descrição do papel dentro do case (mais longa que o `role` de topo).
- `responsibilities [{group{en,pt}, items[{en,pt}]}]` — colunas de disciplinas (ex.: Game
  Design, Sound, UI/UX, Art). **Confirmar o que o Lope de fato fez** em cada uma.
- `challenge {en,pt}` — o problema de design central. Confirmar que era esse o desafio real.
- `coreLoop {steps[{en,pt}], note{en,pt}?}` — passos do loop + nota. Confirmar os passos.
- `systems [{title{en,pt}, body{en,pt}}]` — sistemas principais. Confirmar quais destacar.
- `progression {en,pt}` — como a dificuldade/curva evolui. **Números vêm da planilha**, confirmados.
- `combat {formula{en,pt}|string, body{en,pt}}` — fórmula de dano/combate + explicação.
  **Traduzir nomes de variáveis** na fórmula (regra do `CLAUDE.md`), manter a matemática idêntica.
- `balancing {formula?, tables[]|table, body{en,pt}}` — a "planilha como marca". Tabelas com
  `caption{en,pt}`, `headers[{en,pt}]`, `rows[]` (células são string/número **ou** `{en,pt}`).
  **Copiar números exatos da planilha**; manter ponto decimal (ex.: `26.5`) em ambos idiomas.
- `implementation {en,pt}` — como saiu do papel/planilha para a engine. Confirmar detalhes técnicos.
- `gallery [{src, alt{en,pt}}]` — capturas de gameplay. Confirmar arquivos e alt text.
- `learnings {en,pt}` — aprendizados. Pode ser redigido a partir de fatos confirmados.
- `links [{label{en,pt}, url, kind}]` — itch.io, trailer, etc. **Confirmar cada URL**.

---

## 4. Regras de ouro — o que a Claude SEMPRE precisa perguntar (nunca assumir)

Estes são os itens onde um chute errado estraga o portfólio. Se qualquer um não estiver
**explícito** nas fontes, **pergunte antes de escrever**:

1. **Papel e responsabilidades** — o que o Lope de fato fez (e o que **não** fez). O `git log`
   sugere, mas não decide. Não infle nem reduza o papel.
2. **Números e unidades** — todo valor de HP, dano, tempo, %, TTK, etc. vem **verbatim** da
   planilha/código indicados. Se a planilha e o código divergirem, pergunte qual vale.
3. **Fórmulas** — copie a fórmula real; não "reconstrua" de memória. Traduza só os nomes de
   variáveis (mantendo a matemática), conforme `CLAUDE.md`.
4. **Nomes próprios** — jogo, estúdio, pessoas, chefes, inimigos, mecânicas. Grafia e acentos
   exatos; **não traduzir** (ver glossário/`CLAUDE.md`). Confirme se houver dúvida.
5. **Ferramentas/engine/versão** — não presuma Unity vs. Godot, nem versões, pela extensão dos
   arquivos sem confirmar.
6. **Links/URLs** — nunca montar URL por dedução. Peça o link exato (itch, trailer, loja).
7. **Trailer** — existe? Qual o ID do YouTube? Se não existir, usar `heroImage` e **omitir** `heroVideo`.
8. **Imagens** — quais arquivos podem ir ao portfólio (direitos/autoria/qualidade) e qual é a
   `cover`, a `heroImage` e as da `gallery`. Confirmar `alt` de cada uma.
9. **Cor de destaque (`accent`)** e **slug (`id`)**.
10. **Datas/período e contexto** (jam? disciplina? cliente? estúdio?) — converter datas
    relativas em absolutas ao registrar.
11. **Escopo dos campos opcionais** — se não houver base para `combat`, `balancing`,
    `coreLoop`, etc., **perguntar se omite** em vez de preencher fraco.

Quando for perguntar, **agrupe** as dúvidas com `AskUserQuestion` (várias de uma vez), para o
Lope não responder de conta-gotas.

---

## 5. Onde e como escrever o resultado

- **Conteúdo:** adicione/edite o objeto do projeto em `js/data/projects.js`, seguindo
  exatamente a forma do `esqueleto-chico`. Mantenha todo texto visível como `{ en, pt }`.
- **Imagens:** coloque os arquivos em `assets/img/projects/` e referencie com caminho
  relativo `./assets/img/projects/<arquivo>` (padrão do repositório). Prefira `.webp`.
- **Traduções:** siga as "Translation rules" e o glossário do `CLAUDE.md` (EN primeiro,
  natural; traduzir fórmulas/labels de tabela; não traduzir nomes próprios; números idênticos).
- **Nada de novo componente:** o renderizador (`js/casestudy.js`) já cobre todos os campos do
  schema. Não crie CSS/JS novo a menos que o Lope peça um recurso inédito.

---

## 6. Banco de perguntas (ponto de partida para o `AskUserQuestion`)

Adapte à realidade do projeto; corte o que já estiver claro nas fontes.

**Identidade & materiais**
- Qual projeto/`id`/`accent`? Onde estão repo, planilha, arte e trailer?

**Papel**
- Qual foi seu papel oficial? Quais disciplinas você tocou (design, código, arte, som, UI,
  produção/coordenação)? O que ficou com outras pessoas?

**Design**
- Qual era o desafio de design central? Qual o core loop (passos)? Quais 2–4 sistemas você quer
  destacar?

**Números/sistemas**
- A planilha em `<arquivo>` é a fonte da verdade? Quais tabelas/curvas entram no case? Alguma
  fórmula de dano/progressão para mostrar? Planilha e código batem?

**Mídia**
- Tem trailer? (ID do YouTube.) Qual imagem é a capa? Quais entram na galeria? Posso usar todas
  (direitos/qualidade)? Textos `alt`?

**Links & contexto**
- Links oficiais (itch/loja/trailer)? Foi jam/disciplina/cliente/estúdio? Período?

---

## 7. Checklist antes de considerar o case pronto

- [ ] `id`, `accent`, `name`, `type`, `role`, `tools`, `cover`/`coverAlt`, `summary` confirmados.
- [ ] Todo campo `caseStudy` presente tem base confirmada (o resto foi **omitido**, não inventado).
- [ ] Todos os números/fórmulas conferidos contra a planilha/código indicados.
- [ ] Nomes próprios com grafia/acentos corretos e **não** traduzidos.
- [ ] EN natural + PT adaptado em **todas** as strings; números idênticos nos dois idiomas.
- [ ] Imagens em `assets/img/projects/`, caminhos relativos corretos, `alt` preenchidos.
- [ ] Trailer: `heroVideo` só se existir; senão `heroImage`. URLs conferidas.
- [ ] Verificado no navegador: `#case/<id>` abre, alterna EN⇄PT, layout ok.
- [ ] Nenhuma suposição pendente — tudo que era incerto virou pergunta respondida.
