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
| `admin/` | Painel admin (requer `is_admin`) |
| `login/` · `select-profile/` · `create-profile/` | Auth flow |

## Terminologia importante
- **Temporada** = o que o código/DB chama de `week` / `weeks`. Nunca usar "semana" na UI.
- **Skrill Day** = o dia da `end_date` da temporada, quando ocorre a revelação.
- **Dificuldade** = `simple` (2pts) ou `complex` (5pts) — definida ao criar a meta.
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

RLS desativado em todas as tabelas.
Storage bucket `deliveries` (público) — path: `{goal_id}/{timestamp}-{filename}`

## Helpers em client.js
- `avatarHTML(profile, extraClass?)` — avatar com pixel art ou inicial
- `statusBadge(status, points)` — badge colorido de status
- `difficultyChip(difficulty)` — chip `Simples` (azul) ou `Complexa` (roxo)
- `bonusPoolFor(n)` — `Math.max(1, Math.floor(n/2))` — pool de bônus por avaliador
- `iconHTML(type)` — SVG img tag para ícones de nav (`G`, `T`, `P`, `A`, `+`, `S`)
- `renderSidebar(profile, activePage)` — sidebar com ícones SVG
- `renderMobileNav(activeKey)` — nav inferior mobile
- `renderSeasonLocked(week, profile, pageLabel, pageTitle)` — card de tela travada para não-participantes
- `renderNoWeekBanner()` — banner quando não há temporada ativa
- `initSkrillWalker()` — mascote animado caminhando na base da tela (dashboard, weekly, leaderboard, skrill-time, profile)
- `toast(msg, color?)` — notificação flutuante temporária
- `timeAgo(d)` — tempo relativo em pt-BR
- `switchTab(tabId)` — troca tab ativa (`.tab-btn` + `.tab-panel`)
- `openImageLightbox(url)` / `closeImageLightbox()` — lightbox estilo Windows 95
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
| `points.svg` | Stat card de Total Pts |
| `season.svg` | Stat card de Pts Temporada |
| `attention.svg` | Avisos e telas travadas |

## Padrões de código
- Cada página tem `init()` assíncrono que seta `app.innerHTML` ao carregar
- Usar `.maybeSingle()` em vez de `.single()` quando 0 rows é resultado válido
- Wrap `Promise.all` em `try/catch` nas páginas principais — exibir erro em `#app` se falhar
- Realtime via `sb.channel(...)` — desinscrever antes de recriar
- Modais: `.modal-overlay` / `.modal`
- Lightbox/Windows: `.win-overlay` + `.win-window` + `.win-titlebar` + `.win-btn`
- `initSkrillWalker()` chamado após `init()` em todas as páginas app (não em login/admin/select-profile/create-profile)

## Regras de UI
- Ícones de navegação: SVG imgs via `iconHTML()` — não usar texto ASCII
- Checkboxes: `SVG_CHECK` / `SVG_EMPTY` — não usar `[v]` / `[ ]`
- Fonte mínima: 24px (body usa Micro 5 em 28px)
- Sem emojis no código
- Profile page: layout responsivo — mobile usa grids de stat cards, desktop usa linha horizontal clássica
