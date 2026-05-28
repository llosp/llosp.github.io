# SKRILL

**SKRILL** é um sistema de produtividade social para grupos pequenos (2–6 pessoas), desenhado como uma mistura de habit tracker, dashboard gamer e sistema de guild/clã. O objetivo é acompanhar objetivos por temporada com visual que incentiva competição amigável e motivação contínua — com foco na reunião de Discord como evento central.

---

## Contexto e dinâmica do grupo

- O grupo é majoritariamente técnico (devs, designers, etc.).
- Toda temporada culmina num **Skrill Time** (reunião no Discord) onde cada membro:
  - Revela o que entregou na temporada com imagens de prova.
  - Recebe os pontos da temporada.
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
├── favicon.ico
│
├── login/index.html            # Senha do app ("familiasteam")
├── select-profile/index.html   # Escolha de perfil + senha individual
├── create-profile/index.html   # Criação de perfil com pixel art canvas
│
├── dashboard/index.html        # Visão geral: pts, metas, entregas, participação na temporada
├── weekly/index.html           # Metas da Temporada: declarar, completar, ver do grupo
├── leaderboard/index.html      # Ranking all-time com pódio
├── profile/index.html          # Perfil: stats, timeline por temporada com imagens
├── skrill-time/index.html      # Página de revelação (evento central) + countdown
├── admin/index.html            # Painel de administração (requer is_admin no perfil)
│
├── css/style.css               # Estilos globais — tema retro pixel / Micro 5
├── js/client.js                # Lógica compartilhada: Supabase, auth, UI helpers
│
└── img/skrill-Sheet.png        # Sprite sheet do mascote Skrill
```

---

## Auth

O app usa autenticação em duas camadas, sem Supabase Auth:

1. **Senha do app** — `familiasteam` — desbloqueada uma vez por sessão (sessionStorage).
2. **Seleção de perfil** — lista de perfis do banco; cada um tem senha própria verificada via query direta.

O perfil selecionado fica salvo em `localStorage['skrill_profile']` como JSON.

**Admin** — verificado pela função `isAdmin()` em `client.js`:
- `profiles.is_admin === true` (role persistente atribuída no painel Admin → aba Perfis), OU
- `sessionStorage['skrill_admin'] === '1'` (fallback legado)

---

## Funcionalidades

### Temporadas

- Cada **temporada** corresponde a uma linha na tabela `weeks` (`week_number`, `year`, `start_date`, `end_date`, `is_current`, `skrill_time_revealed`).
- O admin inicia a temporada pelo banner "Temporada não iniciada" ou pelo painel admin → Temporadas → Nova Temporada.
- A temporada só avança depois do **Skrill Time**: o admin clica em "Encerrar e iniciar Temporada N+1" após a revelação (com modal para definir a data de encerramento da próxima).
- Se não há temporada ativa, todas as páginas mostram o banner "Temporada não iniciada".

**Participação na temporada** — membros escolhem entrar ou sair de cada temporada pelo card no dashboard. Só participantes contam nos quadradinhos do Skrill Time e aparecem no painel de reveal.

---

### Objetivos (`/weekly/`)

- Cada membro declara suas metas para a temporada (`status: active`).
- Status possíveis: `active` · `completed` · `beyond` · `failed`.
- **Beyond Scope**: meta que foi além do planejado — 8pts vs. 5pts.
- Ao completar uma meta, um **modal de entrega** exige upload de pelo menos uma imagem como prova.
  - Imagens vão para o bucket `deliveries` do Supabase Storage.
  - URLs salvas em `goals.image_urls TEXT[]`.
- **Pontos não são creditados imediatamente** — ficam pendentes até o Skrill Time.
- Metas de outros membros com imagens aparecem com **blur forte** até a revelação.
- Abas: Todas / Minhas / Outros.

---

### Skrill Time (`/skrill-time/`)

Página central da temporada — o evento de revelação:

**Antes do dia da deadline (`end_date`):**
- Exibe countdown regressivo `DD : HH : MM : SS` em fonte Jersey 25 gigante (até 160px).
- Texto dinâmico acima: "faltam X dias pro Skrill Day" / "falta 1 hora pro Skrill Day" etc.

**No dia da deadline (ou após):**
1. Quadradinhos de pixel (um por participante da temporada): preto = não pronto, verde = pronto.
2. Cada um clica em **"Marcar Pronto"** quando estiver na reunião (pode desmarcar também).
3. Quando **todos os participantes marcam pronto**: `skrill_time_revealed` vira `true`, imagens desbloqueiam, pontos creditados automaticamente.
4. Pontos usam flag `points_awarded` para evitar duplicação em múltiplos clientes simultâneos.
5. Após a revelação, o **admin** vê o botão "Encerrar e iniciar Temporada N+1".
6. Clicar em imagens de entrega abre **lightbox estilo Windows 95** (`.win-overlay` + `.win-window`).
7. A página usa **Supabase Realtime** para atualizar quadradinhos, revelação e participações em tempo real.

---

### Dashboard (`/dashboard/`)

- Boas-vindas com nome do membro, temporada atual e streak inline.
- 3 stat cards: Total Pts · Pts Temporada · Metas Feitas.
- **Card de participação**: entra/sai da temporada atual (`season_participants`).
- **Feed de entregas**: posts com avatar, nome, título da meta e imagens (borradas antes da revelação).
- Card da próxima reunião com link para o Discord e botão para o Skrill Time.

---

### Leaderboard (`/leaderboard/`)

- Ranking all-time por `total_points`.
- Pódio visual para os 3 primeiros.
- Lista completa do 4º em diante.
- Destaque "Seu rank: #N" no header.

---

### Perfil (`/profile/`)

- Avatar pixel art (canvas 100×100, renderizado em escala), nome, stats.
- Estatísticas: Total Pts · Pts Temporada · Metas Feitas · Streak atual · Melhor Streak.
- **Timeline por temporada** (estilo Twitter): metas agrupadas por temporada, com imagens.
  - Imagens com blur se a temporada ainda não foi revelada.
- **Editar Perfil** (apenas no próprio perfil): renomear + redesenhar pixel art com brush ajustável.

---

### Criar Perfil (`/create-profile/`)

- Canvas pixel art 100×100 com brush ajustável (diâmetro 2–15px, slider vertical).
- Cores: preto / branco.
- Avatar salvo como PNG base64 em `profiles.avatar_data`.

---

### Admin (`/admin/`)

Painel protegido por `is_admin === true` no perfil. Tabs:

| Tab | O que faz |
|---|---|
| **Perfis** | Editar nome, pts, streaks inline · Atribuir/remover admin · Excluir perfil |
| **Temporadas** | Criar temporada · Definir atual · Revelar/ocultar · Excluir |
| **Metas** | Filtrar por temporada · Mudar status · Editar pts · Excluir |
| **Pontos** | Histórico de point_history · Excluir entradas |
| **Ready** | Listar week_ready · Remover entradas |
| **Danger** | Zerar pts temporada · Limpar ready · Ocultar reveal · Desfazer Skrill Time · Factory Reset · Apagar tudo |

**"Desfazer Skrill Time"** — apaga point_history da temporada, recalcula totais, reverte ready/reveal/points_awarded.  
**"Factory Reset"** — apaga tudo operacional (temporadas, metas, pontos, ready) mantendo perfis e avatares.

---

## Pontuação

| Ação | Pts |
|------|-----|
| Completar uma meta | +5 pts |
| Completar "Beyond Scope" | +8 pts |

Pontos são **diferidos**: só creditados no `point_history` e nos perfis durante o Skrill Time, após todos os participantes marcarem pronto. A flag `goals.points_awarded` evita duplicação.

---

## Banco de dados (Supabase)

### Tabelas

| Tabela | Descrição |
|---|---|
| `profiles` | `id, name, avatar_data, password, total_points, weekly_points, streak_current, streak_longest, is_admin` |
| `weeks` | `id, week_number, year, start_date, end_date, is_current, skrill_time_revealed` |
| `goals` | `id, profile_id, week_id, title, description, status, points_earned, points_awarded, completed_at, image_urls, is_beyond_scope` |
| `point_history` | `id, profile_id, week_id, goal_id, amount, reason, created_at` |
| `week_ready` | `id, week_id, profile_id, created_at` — UNIQUE(week_id, profile_id) |
| `season_participants` | `id, week_id, profile_id, joined_at` — UNIQUE(week_id, profile_id) |
| `meetings` | `id, scheduled_at, discord_link` |

RLS desativado em todas as tabelas (`DISABLE ROW LEVEL SECURITY`).

### Storage

Bucket `deliveries` (público) — imagens de entrega das metas.  
Path: `{goal_id}/{timestamp}-{filename}`

### SQL de setup completo

```sql
-- Colunas adicionais nas tabelas base
ALTER TABLE goals ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';
ALTER TABLE goals ADD COLUMN IF NOT EXISTS points_awarded BOOLEAN DEFAULT false;
ALTER TABLE weeks ADD COLUMN IF NOT EXISTS skrill_time_revealed BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Tabela de controle de reveal
CREATE TABLE IF NOT EXISTS week_ready (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id    UUID        NOT NULL REFERENCES weeks(id)    ON DELETE CASCADE,
  profile_id UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(week_id, profile_id)
);
ALTER TABLE week_ready DISABLE ROW LEVEL SECURITY;

-- Tabela de participação por temporada
CREATE TABLE IF NOT EXISTS season_participants (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id    UUID        NOT NULL REFERENCES weeks(id)    ON DELETE CASCADE,
  profile_id UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(week_id, profile_id)
);
ALTER TABLE season_participants DISABLE ROW LEVEL SECURITY;

-- Storage (após criar bucket 'deliveries' como público no dashboard)
CREATE POLICY "anon_upload" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'deliveries');
CREATE POLICY "anon_select" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'deliveries');
```

---

## Design

- Tema **Retro Pixel / Mono** — paleta clara com acentos âmbar e roxo.
- Tipografia: `Micro 5` (corpo, mínimo 24px) + `Jersey 25` (headings/títulos).
- Mascote **Skrill** — sprite pixel art com animação de piscar.
- Layout: sidebar no desktop, nav inferior no mobile.
- Avatar: pixel art 100×100 desenhado em canvas, exportado como PNG 100×100 base64.
- Sem emojis — substituídos por texto ASCII: `[+]` `[G]` `[T]` `[S]` `[P]` `[v]` `[ ]` etc.
- Janelas de lightbox e modais especiais usam estilo Windows 95 (`.win-overlay`, `.win-window`, `.win-titlebar`, `.win-btn`).

---

## Fluxo de uma temporada

```
Admin cria Temporada N (ou "Iniciar Temporada" para a primeira)
    ↓
Membros entram na temporada pelo dashboard (season_participants)
    ↓
Membros declaram metas durante a temporada
    ↓
Ao completar: modal de upload de imagem obrigatório
    ↓ (imagens borradas para todos até a revelação)
Skrill Day — reunião no Discord
    ↓
Todos abrem /skrill-time/ e clicam "Marcar Pronto"
    ↓
Quadradinhos acendem verde conforme cada participante marca
    ↓
Último participante → reveal automático: imagens desbloqueiam, pontos creditados
    ↓
Admin clica "Encerrar e iniciar Temporada N+1" (modal para definir end_date)
    ↓ (weekly_points zerados, nova temporada ativa)
Próximo ciclo
```

---

## Como rodar localmente

O projeto não tem dependências de build. Basta servir a pasta via qualquer servidor HTTP estático:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Acesse `http://localhost:8080/skrill/` no browser.

---

## Deploy

Push para a branch `main` do repositório `llosp.github.io` — GitHub Pages publica automaticamente.

```bash
git add skrill/
git commit -m "feat: descrição da mudança"
git push origin main
```

Site: `https://llosp.github.io/skrill/`
