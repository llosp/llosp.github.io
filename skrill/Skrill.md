# SKRILL

**SKRILL** é um sistema de produtividade social para grupos pequenos (2–6 pessoas), desenhado como uma mistura de habit tracker, dashboard gamer e sistema de guild/clã. O objetivo é acompanhar objetivos por temporada com visual que incentiva competição amigável e motivação contínua — com foco na reunião de Discord como evento central.

---

## Contexto e dinâmica do grupo

- O grupo é majoritariamente técnico (devs, designers, etc.).
- Toda temporada culmina num **Skrill Time** (reunião no Discord) onde cada membro:
  - Revela o que entregou na temporada com imagens de prova.
  - Avalia os outros de forma anônima (distribuição de bônus por pares).
  - Recebe os pontos base + bônus da temporada.
  - Define implicitamente o ritmo da próxima temporada.
- O sistema incentiva **produtividade**, **consistência**, **competição amigável** e **senso de evolução**.

---

## Stack técnica

| Camada     | Tecnologia |
|------------|------------|
| Frontend   | HTML + CSS + JavaScript puro (sem framework) |
| Hospedagem | GitHub Pages (`llosp.github.io/skrill`) |
| Backend    | [Supabase](https://supabase.com) — PostgreSQL + Storage |
| Auth       | Senha de app compartilhada + seleção de perfil por senha individual |
| Fontes     | `Micro 5` (corpo, mín. 24px) · `Jersey 25` (headings) |

Não há build step, bundler ou SSR — tudo é estático, servido diretamente do GitHub Pages.

---

## Estrutura de arquivos

```
skrill/
├── index.html                  # Redireciona para login ou dashboard
├── Skrill.md                   # Este arquivo
├── CLAUDE.md                   # Guia rápido para Claude
├── favicon.ico
│
├── login/index.html            # Senha do app ("familiasteam") — titlebar Windows 95
├── select-profile/index.html   # Escolha de perfil + senha individual
├── create-profile/index.html   # Criação de perfil com pixel art canvas
│
├── dashboard/index.html        # Visão geral: pts, metas, entregas, participação
├── weekly/index.html           # Metas da Temporada: declarar com dificuldade, completar
├── leaderboard/index.html      # Ranking com pódio + tabs 30 dias / All-Time
├── profile/index.html          # Perfil: stats, timeline por temporada
├── skrill-time/index.html      # Countdown → ready → rating → reveal
├── admin/index.html            # Painel de administração (requer is_admin)
│
├── css/style.css               # Estilos globais — tema retro pixel / Micro 5
├── js/client.js                # Lógica compartilhada: Supabase, auth, UI helpers
│
└── img/
    ├── skrill-Sheet.png             # Sprite sheet do mascote (sidebar)
    ├── skrill-fullbody-Sheet.png    # Sprite sheet fullbody (walker animado)
    ├── dashboard.svg / goals.svg / leaderboard.svg
    ├── Profile.svg / admin.svg / Skrill_time.svg
    ├── points.svg / season.svg / attention.svg
    └── ...
```

---

## Auth

O app usa autenticação em duas camadas, sem Supabase Auth:

1. **Senha do app** — `familiasteam` — desbloqueada uma vez por sessão (sessionStorage).
2. **Seleção de perfil** — lista de perfis do banco; cada um tem senha própria verificada via query direta.

O perfil selecionado fica salvo em `localStorage['skrill_profile']` como JSON.

**Admin** — verificado pela função `isAdmin()` em `client.js`:
- `profiles.is_admin === true`, OU
- `sessionStorage['skrill_admin'] === '1'` (fallback legado)

---

## Funcionalidades

### Temporadas

- Cada **temporada** corresponde a uma linha na tabela `weeks`.
- Para entrar em uma temporada, o membro clica em **Participar** no dashboard. Participantes ficam registrados em `season_participants`.
- Páginas `/weekly/` e `/skrill-time/` mostram tela travada para não-participantes, com CTA para entrar.
- **Após a revelação (`skrill_time_revealed = true`)**, novos membros não podem mais entrar naquela temporada.
- A temporada avança pelo admin após o Skrill Time: "Encerrar e iniciar Temporada N+1" (modal para definir `end_date`).
- Se não há temporada ativa, todas as páginas mostram o banner "Temporada não iniciada".

---

### Objetivos (`/weekly/`)

- Ao declarar uma meta, o membro escolhe a **dificuldade**:
  - `Simples` → 2 pts base
  - `Complexa` → 5 pts base
- Pontos base ficam em `goals.points_earned` desde a criação — não mudam na entrega.
- Status possíveis: `active` · `completed` · `failed`.
- Ao completar uma meta, o **modal de entrega** exige upload de pelo menos uma imagem como prova.
  - Imagens vão para o bucket `deliveries` do Supabase Storage.
  - URLs salvas em `goals.image_urls TEXT[]`.
- **Pontos não são creditados imediatamente** — ficam pendentes até a finalização do Skrill Time.
- Metas de outros membros com imagens aparecem com **blur** até a revelação.
- Abas: Todas / Minhas / Outros.

---

### Skrill Time (`/skrill-time/`)

Página central da temporada — quatro fases determinadas por `getPhase()`:

**1. `countdown`** — antes do `end_date`:
- Exibe countdown regressivo `DD : HH : MM : SS` em Jersey 25 gigante.
- Texto dinâmico: "faltam X dias pro Skrill Day" / "falta 1 hora" etc.

**2. `ready`** — no dia do `end_date` (ou após), antes da revelação:
- Grid de quadradinhos (um por participante): preto = não pronto, verde = pronto.
- Cada membro clica **"Marcar Pronto"** na reunião.
- Quando **todos os participantes marcam pronto**: `skrill_time_revealed` vira `true`.

**3. `rating`** — após revelação, enquanto há avaliações pendentes:
- Pool de bônus por avaliador = `floor(N_participantes / 2)`, mínimo 1.
- Cada avaliador distribui seu pool entre as metas entregues (auto-avaliação permitida).
- UI: contador `Pool: X/Total` + controles `[-] N [+]` por meta.
- "Enviar avaliação" só habilita quando o pool está **totalmente distribuído**.
- Ao submeter: insere em `peer_rating_submissions`. Outros veem quem já enviou.
- Quando **todos os participantes submetem**: `finalizeSeason()` é chamado automaticamente.
- Se não há entregas com imagem: pula rating e finaliza imediatamente.

**4. `closed`** — todos avaliaram:
- Reveal final: para cada meta, mostra `[+2 base] [+N bônus] = Total`.
- Bônus = soma dos `peer_ratings.amount` de todos os avaliadores para aquela meta.
- Identidade do avaliador nunca é exibida.
- Admin vê botão "Encerrar e iniciar Temporada N+1".

**Finalização** (`finalizeSeason()`):
- Soma base (`difficulty`) + bônus (`peer_ratings`) por meta.
- Escreve `point_history` (razões: `complete_simple`/`complete_complex` + `peer_bonus`).
- Atualiza `goals.points_earned` com o total e seta `points_awarded = true`.
- Incrementa `profiles.total_points` e `weekly_points`.

A página usa **Supabase Realtime** para atualizar quadradinhos, `peer_ratings` e `peer_rating_submissions` em tempo real.

---

### Dashboard (`/dashboard/`)

- Boas-vindas com nome, temporada atual e streak inline.
- 3 stat cards: Total Pts · Pts Temporada · Metas Feitas.
- **Card de participação**: entra/sai da temporada (`season_participants`). Bloqueado após revelação.
- **Progresso da Temporada**: lista das metas do membro com status e ícones SVG.
- **Feed de entregas**: posts com avatar, nome, título e imagens (borradas antes da revelação).
- **Mini Leaderboard**: top 5 por `weekly_points`.
- Card da próxima reunião / botão para Skrill Time.

---

### Leaderboard (`/leaderboard/`)

- **Duas tabs**: `30 dias` (padrão) e `All-Time`.
  - 30 dias: soma de `point_history.amount` dos últimos 30 dias por perfil.
  - All-time: ordenado por `profiles.total_points`.
- **Pódio** visual para os 3 primeiros (sempre exibido, mesmo com 0 pts).
- **Lista** completa do 4º em diante — todos os perfis aparecem, incluindo com 0 pts.
- "Seu rank" no header mostra posição em ambas as tabs.

---

### Perfil (`/profile/`)

- Layout responsivo:
  - **Mobile**: avatar + nome em linha → botões abaixo do nome → grids de stats (3-col + 2-col).
  - **Desktop**: layout horizontal clássico — avatar | nome + stats em linha | botões à direita.
- Estatísticas: Total Pts · Pts Temporada · Metas Feitas · Streak atual · Melhor Streak.
- **Timeline por temporada**: metas agrupadas por temporada, com chip de dificuldade, status e imagens.
  - Imagens com blur se a temporada ainda não foi revelada.
- **Editar Perfil** (apenas no próprio perfil): renomear + redesenhar pixel art.

---

### Criar Perfil (`/create-profile/`)

- Canvas pixel art 100×100 com brush ajustável (diâmetro 2–15px, slider vertical).
- Cores: preto / branco.
- Avatar salvo como PNG base64 em `profiles.avatar_data`.

---

### Login (`/login/`)

- Titlebar estilo Windows 95: ícone `Skrill_time.svg` + "Login" em Micro 5 + botões `[_] [□] [X]`.
- Campo de senha do app + botão Entrar.

---

### Admin (`/admin/`)

Painel protegido por `is_admin === true`. Tabs:

| Tab | O que faz |
|---|---|
| **Perfis** | Editar nome, pts, streaks inline · Atribuir/remover admin · Excluir |
| **Temporadas** | Criar temporada · Definir atual · Revelar/ocultar · Excluir |
| **Metas** | Filtrar por temporada · Mudar status/dificuldade · Editar pts · Excluir |
| **Pontos** | Histórico de `point_history` · Excluir entradas |
| **Ready** | Listar `week_ready` · Remover entradas |
| **Danger** | Zerar pts temporada · Limpar ready · Desfazer Skrill Time · Factory Reset |

**"Desfazer Skrill Time"** — apaga `point_history`, `peer_ratings` e `peer_rating_submissions` da temporada, reverte `points_awarded`, `skrill_time_revealed`, recalcula totais dos perfis.
**"Factory Reset"** — apaga tudo operacional mantendo perfis e avatares.

---

## Pontuação

| Ação | Pts base |
|------|----------|
| Meta `Simples` completada | +2 pts |
| Meta `Complexa` completada | +5 pts |
| Bônus de avaliação por pares | +N pts (variável) |

**Pool de bônus por avaliador** = `floor(N_participantes / 2)`, mínimo 1.  
Pontos são **diferidos** — creditados apenas na finalização do Skrill Time, após todos avaliarem. A flag `goals.points_awarded` evita duplicação.

---

## Banco de dados (Supabase)

### Tabelas

| Tabela | Descrição |
|---|---|
| `profiles` | `id, name, avatar_data, password, total_points, weekly_points, streak_current, streak_longest, is_admin, sort_order` |
| `weeks` | `id, week_number, year, start_date, end_date, is_current, skrill_time_revealed` |
| `goals` | `id, profile_id, week_id, title, description, status, difficulty, points_earned, points_awarded, completed_at, image_urls, is_beyond_scope` |
| `point_history` | `id, profile_id, week_id, goal_id, amount, reason, created_at` |
| `week_ready` | `id, week_id, profile_id, created_at` — UNIQUE(week_id, profile_id) |
| `season_participants` | `id, week_id, profile_id, joined_at` — UNIQUE(week_id, profile_id) |
| `peer_ratings` | `id, week_id, rater_id, goal_id, amount, created_at` — UNIQUE(week_id, rater_id, goal_id) |
| `peer_rating_submissions` | `id, week_id, rater_id, submitted_at` — UNIQUE(week_id, rater_id) |
| `meetings` | `id, scheduled_at, discord_link` |

RLS desativado em todas as tabelas.

### Storage

Bucket `deliveries` (público) — imagens de entrega das metas.
Path: `{goal_id}/{timestamp}-{filename}`

### SQL de setup (migração atual)

```sql
-- Coluna de dificuldade nas metas
ALTER TABLE goals ADD COLUMN IF NOT EXISTS difficulty TEXT
  CHECK (difficulty IN ('simple','complex')) DEFAULT 'simple';

-- Ordem manual dos perfis na tela de seleção (admin reordena)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sort_order INT;
-- Backfill: define a ordem inicial pela ordem alfabética atual
WITH ranked AS (
  SELECT id, (ROW_NUMBER() OVER (ORDER BY name) - 1) AS rn FROM profiles
)
UPDATE profiles p SET sort_order = ranked.rn
FROM ranked WHERE p.id = ranked.id AND p.sort_order IS NULL;

-- Avaliação por pares
CREATE TABLE IF NOT EXISTS peer_ratings (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id    UUID        NOT NULL REFERENCES weeks(id)    ON DELETE CASCADE,
  rater_id   UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  goal_id    UUID        NOT NULL REFERENCES goals(id)    ON DELETE CASCADE,
  amount     INT         NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(week_id, rater_id, goal_id)
);
ALTER TABLE peer_ratings DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS peer_rating_submissions (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id      UUID        NOT NULL REFERENCES weeks(id)    ON DELETE CASCADE,
  rater_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(week_id, rater_id)
);
ALTER TABLE peer_rating_submissions DISABLE ROW LEVEL SECURITY;
```

---

## Design

- Tema **Retro Pixel / Mono** — paleta clara com acentos âmbar e roxo.
- Tipografia: `Micro 5` (corpo, mínimo 24px) + `Jersey 25` (headings/títulos).
- **Ícones de navegação**: SVG files em `/skrill/img/` — `dashboard.svg`, `goals.svg`, `leaderboard.svg`, `Profile.svg`, `admin.svg`, `Skrill_time.svg`.
- **Checkboxes**: `SVG_CHECK` (X em quadrado) e `SVG_EMPTY` (quadrado vazio) — constantes em `client.js`.
- **Mascote Skrill Walker**: sprite fullbody animado (`skrill-fullbody-Sheet.png`, 750×130px, 5 frames) que caminha na base de todas as páginas app. Pisca aleatoriamente, vira ao mudar de direção, é arremessado com física ao clicar.
- Layout: sidebar no desktop (≥ 768px), nav inferior no mobile.
- Janelas e lightbox usam estilo Windows 95 (`.win-overlay`, `.win-window`, `.win-titlebar`, `.win-btn`).
- Tela de login tem titlebar Windows 95 com `Skrill_time.svg` + "Login" em Micro 5 + botões `[_] [□] [X]`.

---

## Fluxo de uma temporada

```
Admin cria Temporada N
    ↓
Membros entram no dashboard → clicam "Participar" (season_participants)
    ↓
Membros declaram metas com dificuldade (simple 2pts / complex 5pts)
    ↓
Ao completar: modal de upload de imagem obrigatório
    ↓ (imagens borradas até a revelação)
Skrill Day — reunião no Discord
    ↓
Todos abrem /skrill-time/ e clicam "Marcar Pronto"
    ↓
Quando todos prontos → skrill_time_revealed = true, fase de rating inicia
    ↓
Cada membro distribui seu pool de bônus entre as metas entregues
    ↓
Quando todos submetem avaliação → finalizeSeason() automático
    → point_history gravado, profiles atualizados, goals.points_awarded = true
    ↓
Admin clica "Encerrar e iniciar Temporada N+1" (modal para definir end_date)
    ↓ (weekly_points zerados, nova temporada ativa)
Próximo ciclo
```

---

## Como rodar localmente

```bash
python3 -m http.server 8765
```

Acesse `http://localhost:8765/skrill/` no browser.

O `.claude/launch.json` já configura este comando para o preview.

---

## Deploy

Push para a branch `main` do repositório `llosp.github.io` — GitHub Pages publica automaticamente.

```bash
git add skrill/
git commit -m "feat: descrição da mudança"
git push origin main
```

Site: `https://llosp.github.io/skrill/` · Domínio customizado: `lope.design/skrill/`
