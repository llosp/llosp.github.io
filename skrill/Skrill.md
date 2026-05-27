# Skrill

**Skrill** é um sistema de produtividade social para grupos pequenos (2–5 pessoas), desenhado como uma mistura de habit tracker, dashboard gamer e sistema de guild/clã. O objetivo é acompanhar objetivos semanais, estudos, projetos, hábitos e evolução pessoal — com visual que incentiva competição amigável e motivação contínua.

---

## Contexto e dinâmica do grupo

- O grupo é majoritariamente técnico (devs, designers, etc.).
- Toda semana ocorre uma **reunião no Discord** onde cada membro:
  - Mostra o que conseguiu fazer na semana anterior.
  - Define novos objetivos para a próxima semana.
- O sistema deve incentivar **produtividade**, **consistência**, **competição amigável**, **motivação visual** e **senso de evolução**.

---

## Stack técnica

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Frontend   | HTML + CSS + JavaScript puro (sem framework) |
| Hospedagem | GitHub Pages (`llosp.github.io/skrill`) |
| Backend    | [Supabase](https://supabase.com) — auth + banco de dados PostgreSQL |
| Auth       | Supabase Email Auth                     |

Não há build step, bundler ou SSR — tudo é estático e servido diretamente do GitHub Pages.

---

## Estrutura de arquivos

```
skrill/
├── index.html              # Entry point — redireciona para login ou dashboard
├── login/index.html        # Tela de autenticação
├── dashboard/index.html    # Visão geral: XP, metas da semana, leaderboard mini, próxima reunião
├── weekly/index.html       # Objetivos semanais: declarar, completar, ver do grupo
├── leaderboard/index.html  # Rankings semanal e all-time
├── profile/index.html      # Perfil: XP, streak, conquistas, histórico de metas
├── 404/index.html          # Página de erro
├── css/style.css           # Estilos globais (tema retro OS)
├── js/client.js            # Lógica compartilhada: Supabase, auth, level system, UI helpers
└── img/skrill-Sheet.png    # Sprite sheet do mascote Skrill
```

---

## Funcionalidades

### Sistema de XP e Níveis

Todo membro acumula XP ao longo do tempo. O progresso é permanente (all-time XP) e também rastreado semanalmente para o ranking.

**Ganho de XP:**

| Ação                     | XP ganho |
|--------------------------|----------|
| Declarar uma meta        | +1 XP    |
| Completar uma meta       | +5 XP    |
| Completar "Beyond Scope" | +8 XP    |

**Títulos por nível:**

| Nível  | Título      |
|--------|-------------|
| 1–4    | Recruit     |
| 5–9    | Apprentice  |
| 10–14  | Builder     |
| 15–19  | Grinder     |
| 20–24  | Veteran     |
| 25–29  | Elite       |
| 30–39  | Master      |
| 40–49  | Legend      |
| 50+    | Mythic      |

A XP necessária para cada nível escala progressivamente: `100 + (level - 1) × 50`.

---

### Objetivos Semanais

- Cada membro **declara** suas metas para a semana corrente.
- Status possíveis: `active`, `completed`, `beyond`, `failed`.
- **Beyond Scope**: para metas que foram além do planejado — recompensa bônus de XP.
- A página `/weekly/` mostra metas de todos os membros, com abas: All / Mine / Others.

---

### Dashboard

Visão geral pessoal ao fazer login:

- XP total e XP semanal
- Progresso das metas da semana (done/total)
- Streak atual e melhor streak (em semanas)
- Feed de atividade de XP
- Mini-leaderboard com top 5 do grupo
- Card da próxima reunião (com link direto para o Discord)

---

### Leaderboard

- **Weekly**: ranking por XP ganho na semana corrente — reset semanal, incentiva consistência.
- **All-Time**: ranking permanente por XP total acumulado — reflete evolução geral.
- Pódio visual (🥇 🥈 🥉) para os 3 primeiros no ranking semanal.

---

### Perfil

- Avatar, display name e bio
- Nível e barra de progresso de XP
- Estatísticas: XP total, metas completadas, streak
- Aba de conquistas (Achievements) com raridade: common / rare / epic / legendary
- Histórico completo de metas
- Log de XP ganho

---

### Streaks

- Conta semanas consecutivas em que o membro participou ativamente.
- Exibido no dashboard e no perfil.
- Incentiva a **consistência** semana a semana.

---

### Reuniões e Discord

- O sistema registra a próxima reunião semanal na tabela `meetings`.
- O dashboard exibe data, hora e link direto para o Discord.
- Mantém o loop semanal integrado ao app.

---

## Banco de dados (Supabase)

Tabelas principais:

| Tabela            | Descrição                                      |
|-------------------|------------------------------------------------|
| `profiles`        | Dados do membro: username, XP, streak, avatar  |
| `weeks`           | Semanas registradas, com `is_current` flag      |
| `goals`           | Metas por semana e por membro                  |
| `point_history`   | Log de XP ganho com motivo e referência         |
| `achievements`    | Definição das conquistas (nome, ícone, raridade)|
| `user_achievements` | Conquistas desbloqueadas por membro          |
| `meetings`        | Agenda das reuniões semanais no Discord         |

---

## Design

- Tema **Retro OS** com paleta escura, neons roxos/âmbar e tipografia monospace.
- Mascote animado **Skrill** (sprite sheet com animação de piscar).
- Layout responsivo: sidebar no desktop, nav inferior no mobile.
- Visual de guild/clã: pódio, level pills, badges de raridade.

---

## Como rodar localmente

O projeto não tem dependências de build. Basta servir a pasta via qualquer servidor HTTP estático:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Acesse `http://localhost:8080/skrill/` no browser.

> As variáveis do Supabase (`SUPABASE_URL` e `SUPABASE_ANON_KEY`) estão embutidas em `js/client.js` — a `anon key` é pública por design do Supabase e segura para exposição no frontend.

---

## Deploy

Push para a branch `main` do repositório `llosp.github.io` — GitHub Pages publica automaticamente.

```bash
git add skrill/
git commit -m "feat: descrição da mudança"
git push origin main
```

O site fica disponível em `https://llosp.github.io/skrill/`.
