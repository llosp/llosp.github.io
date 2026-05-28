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
| `js/client.js` | Tudo compartilhado: Supabase client, auth, helpers de UI (sidebar, avatar, badges, toast...) |
| `css/style.css` | Estilos globais únicos |
| `dashboard/` | Home: stats, feed de entregas, participação na temporada |
| `weekly/` | Metas da Temporada: declarar, completar com upload de imagem |
| `skrill-time/` | Evento de revelação: countdown → quadradinhos ready → reveal |
| `leaderboard/` | Ranking all-time com pódio |
| `profile/` | Perfil + timeline por temporada |
| `admin/` | Painel admin (requer `is_admin`) |
| `login/` · `select-profile/` · `create-profile/` | Auth flow |

## Terminologia importante
- **Temporada** = o que o código/DB chama de `week` / `weeks` (tabela). Nunca usar "semana" na UI.
- **Skrill Day** = o dia da `end_date` da temporada, quando ocorre a revelação.
- **Beyond** = meta além do escopo, vale 8pts (vs. 5pts para completed).

## Auth
- `isAppUnlocked()` — verifica senha de app (`familiasteam`) no sessionStorage
- `getStoredProfile()` — perfil em `localStorage['skrill_profile']`
- `isAdmin()` — `profile.is_admin === true` OU `sessionStorage['skrill_admin'] === '1'`
- `requireAuth()` — redireciona se não autenticado, retorna stored profile

## Banco de dados (tabelas-chave)
| Tabela | Colunas relevantes |
|---|---|
| `profiles` | `id, name, avatar_data, password, total_points, weekly_points, streak_current, streak_longest, is_admin` |
| `weeks` | `id, week_number, year, start_date, end_date, is_current, skrill_time_revealed` |
| `goals` | `id, profile_id, week_id, title, status, points_earned, points_awarded, image_urls, is_beyond_scope` |
| `week_ready` | `week_id, profile_id` UNIQUE — quem marcou pronto no Skrill Time |
| `season_participants` | `week_id, profile_id` UNIQUE — quem entrou na temporada |
| `point_history` | `profile_id, week_id, goal_id, amount, reason` |

RLS desativado em todas as tabelas.  
Storage bucket `deliveries` (público) — imagens de entrega, path: `{goal_id}/{timestamp}-{filename}`

## Padrões de código
- Cada página tem `init()` assíncrono + `renderPage()` síncrono que regenera o DOM
- Realtime via `sb.channel(...)` com `.on('postgres_changes', ...)` — sempre desinscrever antes de recriar
- Modais normais: `.modal-overlay` / `.modal` (CSS já existe)
- Lightbox / janelas especiais: `.win-overlay` + `.win-window` + `.win-titlebar` + `.win-btn` (estilo Windows 95)
- Helpers disponíveis em `client.js`: `avatarHTML()`, `statusBadge()`, `timeAgo()`, `renderSidebar()`, `renderMobileNav()`, `renderNoWeekBanner()`, `toast()`

## Regras de UI
- Sem emojis — usar ASCII: `[+]` `[G]` `[S]` `[v]` `[B]` etc.
- Fonte mínima: 24px (body usa Micro 5 em 28px)
- Sem comentários desnecessários no código
