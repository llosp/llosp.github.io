# SKRILL — Guia rápido para Claude

Produtividade social em grupo. Reunião semanal ("Skrill Time") é o evento central. Ver `Skrill.md` para documentação completa.

## Stack
- Vanilla HTML + CSS + JS — **sem framework, sem build step**
- Supabase (PostgreSQL + Storage) via CDN (`supabase.min.js`)
- GitHub Pages (estático)
- Fontes: `Micro 5` (corpo, mín. 24px) · `Jersey 25` (headings)

## Mapa de páginas
| Arquivo | Função |
|---|---|
| `js/client.js` | Tudo compartilhado: Supabase client, auth, helpers de UI |
| `css/style.css` | Estilos globais únicos |
| `dashboard/` | Home: stats, feed de entregas, participação na temporada |
| `weekly/` | Metas da Temporada: declarar (com dificuldade), completar com upload |
| `skrill-time/` | Countdown → ready → rating → reveal (4 fases) |
| `leaderboard/` | Ranking com pódio + tabs 30 dias / All-Time |
| `profile/` | Perfil + timeline por temporada |
| `archive/` | Acervo: calendário de temporadas passadas com modal de detalhes |
| `admin/` | Painel admin (requer `is_admin`) |
| `login/` · `select-profile/` · `create-profile/` | Auth flow |

## Terminologia importante
- **Temporada** = o que o código/DB chama de `week` / `weeks`. Nunca usar "semana" na UI.
- **Skrill Day** = o dia da `end_date` da temporada, quando ocorre a revelação.
- **Dificuldade** = `simple` (2pts), `complex` (5pts) ou `extra` (0pts, só pontua via bônus de pares) — definida ao criar a meta. Use `basePoints(d)` em client.js, nunca o ternário `? 5 : 2`.
- **Beyond** = removido da UI. Coluna `is_beyond_scope` existe no DB por compatibilidade.

## Auth
- `isAppUnlocked()` — verifica senha de app (`familiasteam`) no sessionStorage
- `getStoredProfile()` — perfil em `localStorage['skrill_profile']`
- `isAdmin()` — `profile.is_admin === true` OU `sessionStorage['skrill_admin'] === '1'`
- `requireAuth()` — redireciona se não autenticado, retorna stored profile

## Banco de dados (tabelas-chave)
| Tabela | Colunas relevantes |
|---|---|
| `profiles` | `id, name, avatar_data, password, total_points, weekly_points, streak_current, streak_longest, is_admin, sort_order` |
| `weeks` | `id, week_number, year, start_date, end_date, is_current, skrill_time_revealed` |
| `goals` | `id, profile_id, week_id, title, status, difficulty, points_earned, points_awarded, image_urls, is_beyond_scope` |
| `week_ready` | `week_id, profile_id` UNIQUE |
| `season_participants` | `week_id, profile_id` UNIQUE |
| `point_history` | `profile_id, week_id, goal_id, amount, reason` |
| `peer_ratings` | `week_id, rater_id, goal_id, amount` UNIQUE(week_id, rater_id, goal_id) |
| `peer_rating_submissions` | `week_id, rater_id` UNIQUE — marca quem finalizou a avaliação |
| `attempt_votes` | `week_id, goal_id, voter_id, vote('up'/'down')` UNIQUE(goal_id, voter_id) — voto de consolação (toggle/desmarcável até confirmar) |
| `attempt_vote_submissions` | `week_id, voter_id` UNIQUE — marca quem confirmou os votos de tentativa |
| `delivery_reports` | `week_id, goal_id, reporter_id` UNIQUE(goal_id, reporter_id) — denúncias de entrega |

RLS desativado em todas as tabelas.

**Fluxo Skrill Time:** `pronto → votar bônus (peer_ratings) → confirmar (peer_rating_submissions) → votar tentativas (attempt_votes, se houver) → confirmar (attempt_vote_submissions) → reveal + finalize + confetti`. Pontos (base+bônus+consolação) são concedidos em `finalizeSeasonById` (client.js), não nos votos.
Storage bucket `deliveries` (público) — path: `{goal_id}/{timestamp}-{filename}`

## Helpers em client.js
- `avatarHTML(profile, extraClass?)` — avatar com pixel art ou inicial
- `statusBadge(status, points)` — badge colorido de status
- `difficultyChip(difficulty)` — chip `Simples` (azul) · `Complexa` (roxo) · `Extra` (neutro)
- `basePoints(difficulty)` — `simple`→2, `complex`→5, `extra`→0
- `bonusPoolFor(n)` — `Math.max(1, Math.floor(n/2))` — pool de bônus por avaliador
- `fireConfetti()` — rajada de confetti em canvas (sem libs); usada no reveal do Skrill Time
- `iconHTML(type)` — SVG img tag para ícones de nav (`G`, `T`, `P`, `A`, `+`, `S`, `R`)
- `renderSidebar(profile, activePage)` — sidebar com ícones SVG
- `renderMobileNav(activeKey)` — nav inferior mobile
- `renderSeasonLocked(week, profile, pageLabel, pageTitle)` — card de tela travada para não-participantes
- `renderNoWeekBanner()` — banner quando não há temporada ativa
- `initSkrillWalker()` — mascote animado caminhando na base da tela (dashboard, weekly, leaderboard, skrill-time, profile, archive)
- `initConfigButton()` — botão de configurações flutuante (tema escuro + seletor de accent)
- `getAccent()` / `setAccent(id)` — lê/define accent theme (persiste em `localStorage['skrill_accent']`)
- `ACCENTS` — array com 5 temas: `Amber Lupus` (padrão) · `Bamboo Fever` · `Eggplant Eel` · `Gentle Fuchsia` · `Tomato Planet`
- `toast(msg, color?)` — notificação flutuante temporária
- `timeAgo(d)` — tempo relativo em pt-BR
- `switchTab(tabId)` — troca tab ativa (`.tab-btn` + `.tab-panel`)
- `openImageLightbox(url)` / `closeImageLightbox()` — lightbox estilo Windows 95 (ícone `image.svg`)
- Constantes: `SVG_CHECK`, `SVG_EMPTY`, `SVG_S` — SVGs inline para checkboxes e ícone de Skrill Time

## Ícones (SVG em /skrill/img/)
| Arquivo | Uso |
|---|---|
| `dashboard.svg` | Nav: Dashboard |
| `goals.svg` | Nav: Season Goals |
| `leaderboard.svg` | Nav: Leaderboard |
| `Profile.svg` | Nav: Profile |
| `admin.svg` | Nav: Admin |
| `Skrill_time.svg` | Nav: Skrill Time · login titlebar |
| `archive.svg` | Nav: Acervo |
| `points.svg` | Stat card de Total Pts |
| `attention.svg` | Avisos e telas travadas |
| `image.svg` | Titlebar do lightbox de imagem (Win 95) |
| `streak.svg` | Ícone de streak na classificação do leaderboard |
| `config.svg` | Botão flutuante de configurações |

## Padrões de código
- Cada página tem `init()` assíncrono que seta `app.innerHTML` ao carregar
- Usar `.maybeSingle()` em vez de `.single()` quando 0 rows é resultado válido
- Wrap `Promise.all` em `try/catch` nas páginas principais — exibir erro em `#app` se falhar
- Realtime via `sb.channel(...)` — desinscrever antes de recriar
- Modais: `.modal-overlay` / `.modal`
- Lightbox/Windows: `.win-overlay` + `.win-window` + `.win-titlebar` + `.win-btn`
- `initSkrillWalker()` chamado após `init()` em todas as páginas app (não em login/admin/select-profile/create-profile)

## Sistema de temas (accent)
`css/style.css` usa CSS custom properties (`--amber*`) re-mapeadas por tema via `html[data-accent="id"]`.
Cada tema tem uma **cor primária** (`--amber`) e uma **cor secundária** (`--sec-*`):
| Tema | ID | Primária | Secundária |
|---|---|---|---|
| Amber Lupus (padrão) | `gold` | `#FFB300` (âmbar) | `#00075D` (azul-marinho profundo) |
| Bamboo Fever | `bamboo` | `#8BC34A` (verde) | bege (`#B8915A`) |
| Eggplant Eel | `eggplant` | `#A569BD` (roxo) | verde (`#27AE60`) |
| Gentle Fuchsia | `fuchsia` | `#F06292` (rosa) | lilás (`#9B59B6`) |
| Tomato Planet | `tomato` | `#FF6347` (vermelho) | verde (`#27AE60`) |

A secundária aparece em: pódio 2º lugar, destaque "me" no leaderboard, eyebrow labels (`.page-header-label`), faixa superior dos stat cards, barra de XP, pontos do feed, divisores do Acervo, temporada atual no calendário.
Tokens semânticos (`--purple`, `--green`, `--blue`) **não mudam** por tema — carregam significado de status.

## Regras de UI
- Ícones de navegação: SVG imgs via `iconHTML()` — não usar texto ASCII
- Checkboxes: `SVG_CHECK` / `SVG_EMPTY` — não usar `[v]` / `[ ]`
- Fonte mínima: 24px (body usa Micro 5 em 28px)
- Sem emojis no código
- Profile page: layout responsivo — mobile usa grids de stat cards, desktop usa linha horizontal clássica
- Não usar cores hexadecimais fixas onde existir token CSS — preferir `var(--sec-border)`, `var(--amber)`, etc.
