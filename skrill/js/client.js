// ════════════════════════════════════════════════════════════════════════════
// MODO DEMO (sandbox offline) — BLOCO REMOVÍVEL.
// Quando localStorage['skrill_demo'] === '1', o `sb` global vira um mock
// persistido em localStorage (namespace skrill_demo_*). Nada toca o Supabase
// real. Entrada pelo launcher secreto /skrill/demo/. Ver CLAUDE.md.
// ════════════════════════════════════════════════════════════════════════════
function isDemoMode() { return localStorage.getItem('skrill_demo') === '1'; }

const DemoDB = (function () {
  const DB_KEY = 'skrill_demo_db';
  const TABLES = ['profiles','weeks','goals','season_participants','bounty_submissions',
    'peer_ratings','peer_rating_submissions','week_ready','attempt_votes',
    'attempt_vote_submissions','delivery_reports','point_history','meetings'];

  function blankStore() { const s = { __storage: {} }; for (const t of TABLES) s[t] = []; return s; }
  function load() { try { const s = JSON.parse(localStorage.getItem(DB_KEY)); if (s) return s; } catch (_) {} return null; }
  function save(s) {
    try { localStorage.setItem(DB_KEY, JSON.stringify(s)); }
    catch (e) { console.warn('[demo] localStorage cheio — estado nao persistido', e); }
  }
  let store = load();

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  function ymdLocal(d) {
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function fileToDataURL(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  function seed() {
    const s = blankStore();
    const today = new Date();
    const weekAgo = new Date(Date.now() - 7 * 86400000);
    s.profiles.push({
      id: 'demo-you', name: 'Demo', password: 'demo', avatar_data: null,
      total_points: 0, weekly_points: 0, streak_current: 0, streak_longest: 0,
      is_admin: true, is_bot: false, bot_last_tick: null, sort_order: 0,
      created_at: new Date().toISOString(),
    });
    s.weeks.push({
      id: 'demo-week-1', week_number: 1, year: today.getFullYear(),
      start_date: ymdLocal(weekAgo), end_date: ymdLocal(today),
      is_current: true, skrill_time_revealed: false,
      bounty_title: null, bounty_description: null, bounty_chance: 0.2, bounty_awarded: false,
      created_at: new Date().toISOString(),
    });
    s.season_participants.push({ id: uuid(), week_id: 'demo-week-1', profile_id: 'demo-you' });
    store = s; save(store);
  }
  function ensure() { if (!store) seed(); }

  class Query {
    constructor(table) {
      this.table = table;
      this.filters = [];
      this.orders = [];
      this._limit = null;
      this._select = null;
      this._count = null;
      this._head = false;
      this._action = 'select';
      this._payload = null;
      this._onConflict = null;
      this._ignoreDup = false;
      this._single = null;
    }
    eq(col, val)  { this.filters.push({ col, op: 'eq',  val }); return this; }
    neq(col, val) { this.filters.push({ col, op: 'neq', val }); return this; }
    gte(col, val) { this.filters.push({ col, op: 'gte', val }); return this; }
    lt(col, val)  { this.filters.push({ col, op: 'lt',  val }); return this; }
    not(col, op, val) { this.filters.push({ col, op: 'not_' + op, val }); return this; }
    or(expr) { this.filters.push({ op: 'or', expr }); return this; }
    order(col, opts = {}) { this.orders.push({ col, asc: opts.ascending !== false, nullsFirst: !!opts.nullsFirst }); return this; }
    limit(n) { this._limit = n; return this; }
    select(cols = '*', opts = {}) { this._select = cols; if (opts.count) this._count = opts.count; if (opts.head) this._head = true; return this; }
    insert(payload) { this._action = 'insert'; this._payload = payload; return this; }
    update(payload) { this._action = 'update'; this._payload = payload; return this; }
    upsert(payload, opts = {}) { this._action = 'upsert'; this._payload = payload; this._onConflict = opts.onConflict; this._ignoreDup = !!opts.ignoreDuplicates; return this; }
    delete() { this._action = 'delete'; return this; }
    single() { this._single = 'single'; return this._run(); }
    maybeSingle() { this._single = 'maybe'; return this._run(); }
    then(resolve, reject) { return this._run().then(resolve, reject); }

    _match(row) {
      for (const f of this.filters) {
        if (f.op === 'or') { if (!this._matchOr(row, f.expr)) return false; continue; }
        const v = row[f.col];
        if (f.op === 'eq'  && v !== f.val) return false;
        if (f.op === 'neq' && v === f.val) return false;
        if (f.op === 'gte' && !(v >= f.val)) return false;
        if (f.op === 'lt'  && !(v <  f.val)) return false;
        if (f.op === 'not_is' && f.val === null && (v === null || v === undefined)) return false;
      }
      return true;
    }
    _matchOr(row, expr) {
      for (const p of expr.split(',')) {
        const m = p.match(/^([^.]+)\.([^.]+)\.(.*)$/);
        if (!m) continue;
        const [, col, op, raw] = m;
        const v = row[col];
        if (op === 'is' && raw === 'null' && (v === null || v === undefined)) return true;
        if (op === 'eq' && String(v) === raw) return true;
        if (op === 'lt' && v != null && v < raw) return true;
      }
      return false;
    }
    _sort(rows) {
      if (!this.orders.length) return rows;
      return [...rows].sort((a, b) => {
        for (const o of this.orders) {
          let av = a[o.col], bv = b[o.col];
          const an = av === null || av === undefined, bn = bv === null || bv === undefined;
          if (an && bn) continue;
          if (an) return o.nullsFirst ? -1 : 1;
          if (bn) return o.nullsFirst ? 1 : -1;
          if (av < bv) return o.asc ? -1 : 1;
          if (av > bv) return o.asc ? 1 : -1;
        }
        return 0;
      });
    }
    _splitTop(s) {
      const out = []; let depth = 0, cur = '';
      for (const ch of s) {
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        if (ch === ',' && depth === 0) { out.push(cur); cur = ''; }
        else cur += ch;
      }
      if (cur.trim()) out.push(cur);
      return out;
    }
    _parseEmbeds(sel) {
      const embeds = [];
      for (const t of this._splitTop(sel)) {
        const m = t.trim().match(/^(\w+):(\w+)\((.*)\)$/);
        if (m) embeds.push({ alias: m[1], table: m[2], fields: m[3].trim() });
      }
      return embeds;
    }
    _project(row, fields) {
      if (fields === '*' || fields === '') return { ...row };
      const o = {}; for (const c of fields.split(',').map(x => x.trim())) o[c] = row[c]; return o;
    }
    _resolveSelect(rows) {
      const sel = this._select;
      if (!sel || sel === '*') return rows.map(r => ({ ...r }));
      const embeds = this._parseEmbeds(sel);
      if (!embeds.length) return rows.map(r => ({ ...r }));
      return rows.map(r => {
        const out = { ...r };
        for (const e of embeds) {
          const fk = e.alias + '_id';
          const joined = (store[e.table] || []).find(x => x.id === r[fk]);
          out[e.alias] = joined ? this._project(joined, e.fields) : null;
        }
        return out;
      });
    }
    _reduce(data) {
      if (this._single === 'single') {
        if (data.length === 1) return { data: data[0], error: null };
        return { data: null, error: { message: 'Row not found (demo single)' } };
      }
      if (this._single === 'maybe') return { data: data[0] ?? null, error: null };
      return { data, error: null, count: this._count ? data.length : undefined };
    }
    async _run() {
      ensure();
      try {
        if (this._action === 'select') {
          let rows = (store[this.table] || []).filter(r => this._match(r));
          rows = this._sort(rows);
          if (this._head) return { data: null, count: rows.length, error: null };
          if (this._limit != null) rows = rows.slice(0, this._limit);
          return this._reduce(this._resolveSelect(rows));
        }
        if (this._action === 'insert') {
          const rows = (Array.isArray(this._payload) ? this._payload : [this._payload]).map(r => {
            const row = { ...r };
            if (row.id === undefined) row.id = uuid();
            if (row.created_at === undefined) row.created_at = new Date().toISOString();
            store[this.table].push(row);
            return row;
          });
          save(store);
          return (this._select || this._single) ? this._reduce(this._resolveSelect(rows)) : { data: null, error: null };
        }
        if (this._action === 'update') {
          const matched = store[this.table].filter(r => this._match(r));
          for (const r of matched) Object.assign(r, this._payload);
          save(store);
          return (this._select || this._single) ? this._reduce(this._resolveSelect(matched)) : { data: null, error: null };
        }
        if (this._action === 'upsert') {
          const rows = Array.isArray(this._payload) ? this._payload : [this._payload];
          const cols = (this._onConflict || 'id').split(',').map(c => c.trim());
          const affected = [];
          for (const r of rows) {
            const existing = store[this.table].find(x => cols.every(c => x[c] === r[c]));
            if (existing) { if (!this._ignoreDup) Object.assign(existing, r); affected.push(existing); }
            else {
              const row = { ...r };
              if (row.id === undefined) row.id = uuid();
              if (row.created_at === undefined) row.created_at = new Date().toISOString();
              store[this.table].push(row); affected.push(row);
            }
          }
          save(store);
          return (this._select || this._single) ? this._reduce(this._resolveSelect(affected)) : { data: null, error: null };
        }
        if (this._action === 'delete') {
          const keep = [], removed = [];
          for (const r of store[this.table]) (this._match(r) ? removed : keep).push(r);
          store[this.table] = keep; save(store);
          return (this._select || this._single) ? this._reduce(this._resolveSelect(removed)) : { data: null, error: null };
        }
        return { data: null, error: null };
      } catch (e) {
        return { data: null, error: { message: e.message } };
      }
    }
  }

  function makeChannel() {
    const ch = { on() { return ch; }, subscribe() { return ch; }, unsubscribe() { return Promise.resolve({}); } };
    return ch;
  }
  function client() {
    return {
      from(table) { ensure(); return new Query(table); },
      storage: { from() { return {
        async upload(path, file) { ensure(); store.__storage[path] = await fileToDataURL(file); save(store); return { data: { path }, error: null }; },
        getPublicUrl(path) { ensure(); return { data: { publicUrl: store.__storage[path] || path } }; },
      }; } },
      channel() { return makeChannel(); },
      removeChannel() { return Promise.resolve(); },
      getChannels() { return []; },
    };
  }

  return {
    client,
    active: isDemoMode,
    seed,
    reset() { localStorage.removeItem(DB_KEY); store = null; seed(); },
    enter() {
      localStorage.setItem('skrill_demo', '1');
      if (!load()) seed(); else store = load();
      sessionStorage.setItem('skrill_demo_unlocked', '1');
      const you = store.profiles.find(p => p.id === 'demo-you') || store.profiles[0];
      localStorage.setItem('skrill_demo_profile', JSON.stringify(you));
    },
    exit() {
      localStorage.setItem('skrill_demo', '0');
      sessionStorage.removeItem('skrill_demo_unlocked');
      localStorage.removeItem('skrill_demo_profile');
    },
    store: () => store,
  };
})();
// ════════════════════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://yrdfccjestplfqlnrnyg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZGZjY2plc3RwbGZxbG5ybnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODgzNzgsImV4cCI6MjA5NTQ2NDM3OH0.L0KljVjvIS6R-4zO51ORlGDM9sclAFeDFRP7TvAGagU';
const sb = isDemoMode() ? DemoDB.client() : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Aplica o tema o quanto antes para minimizar flash
if (localStorage.getItem('skrill_theme') === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}
// Aplica a cor de destaque (accent) cedo
(function () {
  const a = localStorage.getItem('skrill_accent');
  if (a && a !== 'gold') document.documentElement.dataset.accent = a;
})();

// ── Session ───────────────────────────────────────────────────────────────────
const APP_PASSWORD = 'familiasteam';
// Chaves de sessão dependem do modo: a sessão/perfil real (skrill_*) nunca é
// sobrescrita pela demo (skrill_demo_*).
function sessionKey() { return isDemoMode() ? 'skrill_demo_unlocked' : 'skrill_unlocked'; }
function profileKey() { return isDemoMode() ? 'skrill_demo_profile' : 'skrill_profile'; }

function isAppUnlocked() { return sessionStorage.getItem(sessionKey()) === '1'; }
function unlockApp()     { sessionStorage.setItem(sessionKey(), '1'); }

function getStoredProfile() {
  try { return JSON.parse(localStorage.getItem(profileKey())); } catch { return null; }
}
function setStoredProfile(p) { localStorage.setItem(profileKey(), JSON.stringify(p)); }
function clearStoredProfile() { localStorage.removeItem(profileKey()); }

function requireAuth() {
  if (!isAppUnlocked()) { window.location.href = isDemoMode() ? '/skrill/demo/' : '/skrill/login/'; return null; }
  const p = getStoredProfile();
  if (!p) { window.location.href = isDemoMode() ? '/skrill/demo/' : '/skrill/select-profile/'; return null; }
  tickBoiBot().catch(() => {});
  return p;
}

function signOut() {
  if (isDemoMode()) { DemoDB.exit(); window.location.href = '/skrill/demo/'; return; }
  clearStoredProfile();
  window.location.href = '/skrill/select-profile/';
}

async function verifyProfilePassword(profileId, password) {
  const { data } = await sb
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .eq('password', password)
    .single();
  return data ?? null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
}

function timeAgo(d) {
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return `${m}m atrás`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h atrás`;
  return `${Math.floor(h / 24)}d atrás`;
}

function avatarHTML(profile, extraClass = '') {
  const name = profile?.name ?? '?';
  const initial = name[0].toUpperCase();
  const cls = `avatar ${extraClass}`;
  if (profile?.avatar_data) {
    return `<div class="${cls}"><img src="${profile.avatar_data}" alt="${initial}" style="image-rendering:pixelated;width:100%;height:100%"/></div>`;
  }
  return `<div class="${cls}">${initial}</div>`;
}

function statusBadge(status, points) {
  const MAP = {
    active:    ['badge-active',    'Ativo'],
    completed: ['badge-completed', 'Feito ✓'],
    failed:    ['badge-failed',    'Perdeu'],
    attempted: ['badge-attempted', 'Tentou'],
  };
  const [cls, label] = MAP[status] ?? ['badge-active', status];
  const pts = points > 0 ? `<span class="xp-earned" style="margin-left:4px">+${points}pts</span>` : '';
  return `<span class="badge ${cls}">${label}</span>${pts}`;
}

function difficultyChip(difficulty) {
  if (difficulty === 'complex') {
    return `<span class="badge" style="background:#E8D5F5;color:var(--purple);border-color:var(--purple)">Complexa</span>`;
  }
  if (difficulty === 'extra') {
    return `<span class="badge" style="background:var(--surface);color:var(--text-muted);border-color:var(--border-dark)">Extra</span>`;
  }
  return `<span class="badge" style="background:#D6EAF8;color:var(--blue);border-color:var(--blue)">Simples</span>`;
}

// Pontos base por dificuldade: simple=2, complex=5, extra=0 (só pontua via bônus).
function basePoints(d) { return d === 'complex' ? 5 : d === 'extra' ? 0 : 2; }

function bonusPoolFor(n) {
  return Math.max(1, Math.floor((n ?? 0) / 2));
}

// ── Bounties ─────────────────────────────────────────────────────────────────────
// Sorteio só acontece na criação de uma nova temporada. Chance base 20%, +5% por
// temporada sem sorteio, volta a 20% quando uma Bounty é sorteada.
function pickBounty() {
  return BOUNTIES[Math.floor(Math.random() * BOUNTIES.length)];
}
function computeBountyForNewSeason(prevWeek) {
  let chance = 20;
  if (prevWeek) chance = prevWeek.bounty_title ? 20 : ((prevWeek.bounty_chance ?? 20) + 5);
  const b = (Math.random() * 100 < chance) ? pickBounty() : null;
  return {
    bounty_title:       b?.title ?? null,
    bounty_description: b?.description ?? null,
    bounty_chance:      chance,
  };
}
// Pontos da Bounty por nº de jogadores que entregaram.
function bountyPointsFor(n) {
  if (n <= 0) return 0;
  if (n === 1) return 7;
  if (n === 2) return 4;
  if (n === 3) return 3;
  return 2;
}
// Card especial da Bounty (Dashboard / Season Goals). `submitters` = profiles que
// entregaram. `opts.footer` = HTML opcional (botão de entrega ou CTA).
function bountyCardHTML(week, submitters = [], opts = {}) {
  if (!week?.bounty_title) return '';
  const avatars = submitters.length
    ? `<div class="bounty-avatars">${submitters.map(p => avatarHTML(p)).join('')}</div>`
    : `<div style="font-size:22px;color:var(--sec-text);text-transform:uppercase">Ninguém entregou ainda</div>`;
  return `
    <div class="bounty-card">
      <div class="bounty-head">
        <img src="/skrill/img/bounty.svg" alt="bounty" style="width:26px;height:26px">
        <span class="bounty-label">Bounty</span>
      </div>
      <div class="bounty-title">${week.bounty_title}</div>
      ${week.bounty_description ? `<div class="bounty-desc">${week.bounty_description}</div>` : ''}
      <div class="bounty-delivered-by">
        <div style="font-size:22px;color:var(--sec-text);text-transform:uppercase;margin-bottom:6px">Entregue por:</div>
        ${avatars}
      </div>
      ${opts.footer ? `<div class="bounty-footer">${opts.footer}</div>` : ''}
    </div>`;
}

function renderSeasonLocked(week, profile, pageLabel, pageTitle) {
  const wSub = week ? ` · Temporada ${week.week_number}` : '';
  const safeWeekId = week?.id ?? '';
  const safeProfileId = profile?.id ?? '';
  const revealed = week?.skrill_time_revealed ?? false;

  let labelHTML = pageLabel;
  if (pageLabel.includes('[G]')) {
    labelHTML = `<span style="display:flex;align-items:center;gap:8px"><img src="/skrill/img/goals.svg" alt="goals" style="width:24px;height:24px"> Metas da Temporada</span>`;
  } else if (pageLabel.includes('[T]')) {
    labelHTML = `<span style="display:flex;align-items:center;gap:8px"><img src="/skrill/img/leaderboard.svg" alt="leaderboard" style="width:24px;height:24px"> Leaderboard</span>`;
  } else if (pageLabel.includes('[S]')) {
    labelHTML = `<span style="display:flex;align-items:center;gap:8px"><img src="/skrill/img/Skrill_time.svg" alt="skrill-time" style="width:24px;height:24px"> Skrill Time</span>`;
  }

  return `<div style="width:100%">
    <div class="page-header">
      <div>
        <div class="page-header-label">${labelHTML}</div>
        <h1 class="page-header-title">${pageTitle}<span class="page-header-sub">${wSub}</span></h1>
      </div>
    </div>
    <div class="card card-amber" style="text-align:center;padding:48px 20px">
      <div style="font-size:36px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:10px;justify-content:center"><img src="/skrill/img/attention.svg" alt="attention" style="width:36px;height:36px"> Voce nao entrou nesta Temporada</div>
      ${revealed
        ? `<div style="font-size:24px;color:var(--amber-text);text-transform:uppercase">
            Esta Temporada ja foi revelada.<br>
            Aguarde a proxima Temporada para participar.
          </div>`
        : `<div style="font-size:24px;color:var(--amber-text);margin-bottom:24px;text-transform:uppercase">
            Junte-se a Temporada para declarar metas, participar do Skrill Time<br>
            e da avaliacao por pares.
          </div>
          <button class="btn btn-primary" style="font-size:24px;padding:12px 28px"
            onclick="(async()=>{const{error}=await sb.from('season_participants').insert({week_id:'${safeWeekId}',profile_id:'${safeProfileId}'});if(error&&!error.message.includes('duplicate'))alert(error.message);else window.location.reload();})()">
            Junte-se a Temporada
          </button>`
      }
    </div>
  </div>`;
}

function toast(msg, color = '#22c55e') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `position:fixed;bottom:20px;right:20px;background:${color};color:#fff;padding:10px 18px;font-family:'Micro 5',monospace;font-size:22px;border:2px solid #000;box-shadow:3px 3px 0 #000;z-index:9999;text-transform:uppercase`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ── Checkbox SVGs ─────────────────────────────────────────────────────────────
const SVG_CHECK = `<svg style="display:inline-block;vertical-align:middle;flex-shrink:0" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="19" height="19" stroke="black" stroke-width="2"/><line x1="5" y1="5" x2="17" y2="17" stroke="black" stroke-width="2.5"/><line x1="17" y1="5" x2="5" y2="17" stroke="black" stroke-width="2.5"/></svg>`;
const SVG_EMPTY = `<svg style="display:inline-block;vertical-align:middle;flex-shrink:0" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="1.5" width="19" height="19" stroke="black" stroke-width="2"/></svg>`;
const SVG_S     = `<img src="/skrill/img/Skrill_time.svg" alt="skrill-time" style="width:24px;height:24px;display:inline-block;vertical-align:middle">`;

// ── Icon helper ───────────────────────────────────────────────────────────────
function iconHTML(type) {
  const svgIcons = {
    'G': '/skrill/img/goals.svg',
    'T': '/skrill/img/leaderboard.svg',
    'P': '/skrill/img/Profile.svg',
    'A': '/skrill/img/admin.svg',
    '+': '/skrill/img/dashboard.svg',
    'S': '/skrill/img/Skrill_time.svg',
    'R': '/skrill/img/archive.svg'
  };
  if (svgIcons[type]) {
    return `<img src="${svgIcons[type]}" class="icon-svg" alt="${type}" style="width:24px;height:24px;display:block">`;
  }
  return `[${type}]`;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function renderSidebar(profile, activePage) {
  const NAV = [
    { href: '/skrill/dashboard/',   label: 'Dashboard',    icon: '+', key: 'dashboard' },
    { href: '/skrill/skrill-time/', label: 'Skrill Time',  icon: 'S', key: 'skrill-time' },
    { href: '/skrill/weekly/',      label: 'Season Goals', icon: 'G', key: 'weekly' },
    { href: '/skrill/leaderboard/', label: 'Leaderboard',  icon: 'T', key: 'leaderboard' },
    { href: '/skrill/archive/',     label: 'Acervo',       icon: 'R', key: 'archive' },
  ];
  if (profile) NAV.push({ href: `/skrill/profile/?id=${profile.id}`, label: 'Profile', icon: 'P', key: 'profile' });

  const navItems = NAV.map(({ href, label, icon, key }) => {
    const active = activePage === key;
    return `<a href="${href}" class="nav-link ${active ? 'active' : ''}">
      <span class="nav-icon">${iconHTML(icon)}</span>
      <span>${label}</span>
      ${active ? '<span class="nav-arrow">▶</span>' : ''}
    </a>`;
  }).join('');

  let footer = '';
  if (profile) {
    footer = `<div class="sidebar-footer">
      <a class="profile-card" href="/skrill/profile/?id=${profile.id}" title="Ver perfil">
        <div class="profile-card-row">
          ${avatarHTML(profile)}
          <div style="flex:1;min-width:0">
            <div class="profile-name">${profile.name}</div>
            <div class="profile-role">${profile.streak_current ?? 0} streak</div>
          </div>
          <div class="level-badge-sm">${profile.total_points ?? 0}pts</div>
        </div>
      </a>
      <button class="signout-btn" onclick="signOut()">← Trocar perfil</button>
    </div>`;
  }

  return `<aside class="sidebar">
    <a href="/skrill/dashboard/" class="sidebar-logo">
      <div class="skrill-sprite skrill-sprite-md"></div>
      <div class="sidebar-logo-textwrap">
        <span class="sidebar-logo-text">SKRILL</span>
      </div>
    </a>
    <nav class="sidebar-nav">${navItems}</nav>
    ${footer}
  </aside>`;
}

function renderMobileNav(activeKey) {
  const items = [
    { href: '/skrill/dashboard/',   label: 'Home',   icon: '+', key: 'dashboard' },
    { href: '/skrill/weekly/',      label: 'Goals',  icon: 'G', key: 'weekly' },
    { href: '/skrill/leaderboard/', label: 'Ranks',  icon: 'T', key: 'leaderboard' },
    { href: '/skrill/skrill-time/', label: 'S.Time', icon: 'S', key: 'skrill-time' },
    { href: '/skrill/archive/',     label: 'Acervo', icon: 'R', key: 'archive' },
    { href: '/skrill/profile/',     label: 'Perfil', icon: 'P', key: 'profile' },
  ];
  return `<nav class="mobile-nav">
    ${items.map(({ href, label, icon, key }) =>
      `<a href="${href}" class="${activeKey === key ? 'active' : ''}">
        <span class="nav-icon">${iconHTML(icon)}</span><span>${label}</span>
      </a>`
    ).join('')}
  </nav>`;
}

// ── Admin helpers (shared across pages) ──────────────────────────────────────
function isAdmin() {
  return sessionStorage.getItem('skrill_admin') === '1' || getStoredProfile()?.is_admin === true;
}

async function startSeason() {
  if (!confirm('Iniciar a Temporada? Isso vai criar a Temporada 1 e o app abrirá para todos.')) return;

  const today    = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const fmt = d => d.toISOString().split('T')[0];

  const { error } = await sb.from('weeks').insert({
    week_number:          1,
    year:                 today.getFullYear(),
    start_date:           fmt(today),
    end_date:             fmt(nextWeek),
    is_current:           true,
    skrill_time_revealed: false,
    ...computeBountyForNewSeason(null),
  });

  if (error) {
    alert('Erro ao criar temporada: ' + error.message);
    return;
  }

  window.location.reload();
}

// ── Avançar temporada (encerrar revelada e iniciar a próxima) ────────────────────
// Permissão: admin sempre; ou qualquer membro se nenhum admin estiver participando.
function adminParticipating(participantIds, profiles) {
  return (profiles || []).some(p => participantIds.has(p.id) && p.is_admin);
}
function canAdvanceSeason(week, participantIds, profiles) {
  if (!week?.skrill_time_revealed) return false;
  return isAdmin() || !adminParticipating(participantIds, profiles);
}

function openAdvanceSeasonModal(week) {
  if (!week) return;
  const nextNum  = week.week_number + 1 > 52 ? 1 : week.week_number + 1;
  const nextYear = week.week_number + 1 > 52 ? week.year + 1 : week.year;

  const fmt    = d => d.toISOString().split('T')[0];
  const today  = new Date();
  const defEnd = new Date(today);
  defEnd.setDate(today.getDate() + 7);

  let overlay = document.getElementById('advance-season-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'advance-season-modal';
    overlay.className = 'win-overlay hidden';
    overlay.addEventListener('click', e => { if (e.target === overlay) closeAdvanceSeasonModal(); });
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="win-window" onclick="event.stopPropagation()" style="width:min(480px,92vw)">
      <div class="win-titlebar">
        <span class="win-titlebar-icon"><img src="/skrill/img/Skrill_time.svg" alt="skrill-time" style="width:20px;height:20px;display:block"></span>
        <span class="win-titlebar-title">Encerrar Temporada ${week.week_number}</span>
        <button class="win-btn" onclick="closeAdvanceSeasonModal()">X</button>
      </div>
      <div class="win-body" style="flex-direction:column;align-items:stretch;gap:16px;padding:20px 20px 16px">
        <div style="text-align:center;font-family:'Jersey 25',monospace;font-size:28px">
          Temporada ${nextNum} · ${nextYear}
        </div>
        <div style="font-size:22px;color:#404040;text-align:center;border-bottom:1px solid #808080;padding-bottom:14px">
          Os pontos da temporada de todos serao zerados.
        </div>
        <div>
          <label style="display:block;font-size:20px;font-weight:700;margin-bottom:6px;font-family:'Micro 5',monospace;text-transform:uppercase;letter-spacing:.04em">
            Data final da Temporada ${nextNum}
          </label>
          <input id="advance-end-date" type="date" value="${fmt(defEnd)}"
            style="width:100%;box-sizing:border-box;font-size:22px;padding:8px 10px;border:2px inset #808080;background:#fff;font-family:'Micro 5',monospace"/>
        </div>
      </div>
      <div class="win-statusbar" style="justify-content:flex-end;gap:8px;padding:8px 10px">
        <button class="btn btn-ghost btn-sm" style="font-size:20px" onclick="closeAdvanceSeasonModal()">Cancelar</button>
        <button id="advance-confirm-btn" class="btn btn-primary btn-sm" style="font-size:20px" onclick="advanceSeason('${week.id}',${nextNum},${nextYear})">Confirmar</button>
      </div>
    </div>`;

  overlay.classList.remove('hidden');
}

function closeAdvanceSeasonModal() {
  const overlay = document.getElementById('advance-season-modal');
  if (overlay) overlay.classList.add('hidden');
}

async function advanceSeason(weekId, nextNum, nextYear) {
  const endDate = document.getElementById('advance-end-date')?.value || null;
  const today   = new Date().toISOString().split('T')[0];

  const btn = document.getElementById('advance-confirm-btn');
  if (btn) { btn.disabled = true; btn.textContent = '...'; }

  const { data: prevWeek } = await sb.from('weeks')
    .select('bounty_title,bounty_chance').eq('id', weekId).maybeSingle();

  await sb.from('weeks').update({ is_current: false }).eq('id', weekId);
  await sb.from('goals').delete().eq('week_id', weekId).eq('status', 'active');
  await sb.from('weeks').insert({
    week_number:          nextNum,
    year:                 nextYear,
    start_date:           today,
    end_date:             endDate,
    is_current:           true,
    skrill_time_revealed: false,
    ...computeBountyForNewSeason(prevWeek),
  });
  await sb.from('profiles').update({ weekly_points: 0 }).not('id', 'is', null);

  closeAdvanceSeasonModal();
  window.location.reload();
}

function renderNoWeekBanner() {
  const adminSection = isAdmin() ? `
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border)">
      <div style="font-size:22px;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase">Admin</div>
      <button class="btn btn-primary" style="font-size:24px;padding:12px 28px" onclick="startSeason()">
        Iniciar Temporada
      </button>
    </div>` : '';
  return `
    <div class="card" style="text-align:center;padding:48px 20px;margin-top:20px">
      <div style="font-size:36px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:10px;justify-content:center">${SVG_S} Temporada não iniciada</div>
      <div style="font-size:24px;color:var(--text-muted)">
        A Temporada 1 ainda não foi criada.<br>
        Fique de olho — o Skrill Time inaugural está chegando.
      </div>
      ${adminSection}
    </div>`;
}

// ── Tab helper ────────────────────────────────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tabId));
}

// ── Windows-style image lightbox ──────────────────────────────────────────────
function openImageLightbox(url) {
  let overlay = document.getElementById('win-lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'win-lightbox';
    overlay.className = 'win-overlay hidden';
    overlay.innerHTML = `
      <div class="win-window" onclick="event.stopPropagation()">
        <div class="win-titlebar">
          <span class="win-titlebar-icon"><img src="/skrill/img/image.svg" alt="img" style="width:20px;height:20px;display:block"></span>
          <span class="win-titlebar-title">Visualizar Entrega</span>
          <button class="win-btn" onclick="closeImageLightbox()">X</button>
        </div>
        <div class="win-body">
          <img id="win-lightbox-img" src="" alt="entrega">
        </div>
        <div class="win-statusbar">
          <span id="win-lightbox-status">Pronto</span>
        </div>
      </div>`;
    overlay.addEventListener('click', closeImageLightbox);
    document.body.appendChild(overlay);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeImageLightbox(); });
  }
  const img = document.getElementById('win-lightbox-img');
  img.src = url;
  img.onload = () => {
    document.getElementById('win-lightbox-status').textContent =
      `${img.naturalWidth} x ${img.naturalHeight}px`;
  };
  overlay.classList.remove('hidden');
}

function closeImageLightbox() {
  const overlay = document.getElementById('win-lightbox');
  if (overlay) overlay.classList.add('hidden');
}

function initSkrillWalker() {
  initConfigButton();
  if (isWalkerHidden()) return;
  if (document.getElementById('skrill-walker')) return;

  const walker = document.createElement('div');
  walker.id = 'skrill-walker';
  walker.className = 'skrill-walker';

  const sprite = document.createElement('img');
  sprite.src = '/skrill/img/skrill-fullbody-Sheet.png';
  walker.appendChild(sprite);
  document.body.appendChild(walker);

  let x = window.innerWidth / 2;
  let direction = 1;
  let directionChangeTimer = 0;
  let jumpY = 0;
  let jumpT = 0;
  const speed = 8;
  const sidebarWidth = 280;
  const charWidth = 128;
  const charHeight = 111;

  let thrown = false;
  let vx = 0, vy = 0, rotation = 0;
  const gravity = 0.6;

  walker.addEventListener('click', () => {
    if (thrown) return;
    thrown = true;
    jumpT = 0;
    vx = (direction > 0 ? 1 : -1) * (20 + Math.random() * 8);
    vy = -(28 + Math.random() * 10);
    rotation = 0;
    walker.style.transformOrigin = 'center center';
  });

  // Blink: shift the img left through frames (-150px per frame)
  const blink = () => {
    if (thrown) return;
    if (Math.random() < 0.2) {
      let frame = 1;
      const frames = [0, -128, -256, -384, -512, -384, -256, -128, 0];
      const blinkInterval = setInterval(() => {
        sprite.style.left = frames[frame] + 'px';
        frame++;
        if (frame >= frames.length) {
          clearInterval(blinkInterval);
          sprite.style.left = '0px';
        }
      }, 80);
    }
  };
  const blinkId = setInterval(blink, 12000);
  setTimeout(blink, 3000);

  // Main loop
  const loopId = setInterval(() => {
    if (thrown) {
      // Physics
      vy += gravity;
      x += vx;
      jumpY = Math.max(0, jumpY - vy);
      rotation += vx * 3;

      // Bounce off floor
      if (jumpY <= 0) {
        jumpY = 0;
        vy *= -0.55;
        vx *= 0.8;
        if (Math.abs(vy) < 1.5) {
          // Settle back to normal
          thrown = false;
          vy = 0; vx = 0; rotation = 0;
          walker.style.transform = '';
          jumpT = 0;
        }
      }

      // Bounce off walls
      if (x < sidebarWidth) { x = sidebarWidth; vx = Math.abs(vx) * 0.7; }
      if (x + charWidth > window.innerWidth) { x = window.innerWidth - charWidth; vx = -Math.abs(vx) * 0.7; }

      walker.style.transform = `rotate(${rotation}deg)`;
      walker.style.left = x + 'px';
      walker.style.bottom = jumpY + 'px';
      return;
    }

    // Normal walk + jump
    jumpT += 0.22;
    jumpY = Math.abs(Math.sin(jumpT)) * 32;
    const onGround = jumpY < 1;

    if (onGround && directionChangeTimer <= 0 && Math.random() < 0.01) {
      direction *= -1;
      directionChangeTimer = 60;
    }
    directionChangeTimer--;

    x += direction * speed;

    if (x < sidebarWidth) { x = sidebarWidth; direction = 1; directionChangeTimer = 60; }
    if (x + charWidth > window.innerWidth) { x = window.innerWidth - charWidth; direction = -1; directionChangeTimer = 60; }

    walker.style.transform = direction > 0 ? 'scaleX(-1)' : 'scaleX(1)';
    walker.style.left = x + 'px';
    walker.style.bottom = jumpY + 'px';
  }, 50);

  walker._intervals = [loopId, blinkId];
}

// ── Config: esconder/mostrar o Skrill que passeia ───────────────────────────────
function isWalkerHidden() {
  return localStorage.getItem('skrill_hide_walker') === '1';
}

function removeSkrillWalker() {
  const el = document.getElementById('skrill-walker');
  if (!el) return;
  (el._intervals || []).forEach(id => clearInterval(id));
  el.remove();
}

function setWalkerHidden(hidden) {
  localStorage.setItem('skrill_hide_walker', hidden ? '1' : '0');
  if (hidden) removeSkrillWalker();
  else initSkrillWalker();
}

function toggleConfigPanel(open) {
  const overlay = document.getElementById('config-overlay');
  const panel   = document.getElementById('config-panel');
  if (!overlay || !panel) return;
  const show = open ?? overlay.classList.contains('hidden');
  overlay.classList.toggle('hidden', !show);
  panel.classList.toggle('open', show);
}

function toggleWalkerSetting() {
  const next = !isWalkerHidden();
  setWalkerHidden(next);
  const row = document.getElementById('config-walker-row');
  if (row) row.innerHTML = configWalkerRowInner();
}

function configWalkerRowInner() {
  const hidden = isWalkerHidden();
  return `<span class="config-row-label">Esconder o Skrill que passeia</span>
    <span class="config-check">${hidden ? SVG_CHECK : SVG_EMPTY}</span>`;
}

// ── Accent themes (cor de destaque) ─────────────────────────────────────────────
const ACCENTS = [
  { id: 'gold',     name: 'Amber Lupus',        color: '#FFB300' },
  { id: 'bamboo',   name: 'Bamboo Fever',       color: '#8BC34A' },
  { id: 'eggplant', name: 'Eggplant Eel',       color: '#A569BD' },
  { id: 'fuchsia',  name: 'Gentle Fuchsia',     color: '#F06292' },
  { id: 'tomato',   name: 'Tomato Planet',      color: '#FF6347' },
];

function getAccent() {
  return localStorage.getItem('skrill_accent') || 'gold';
}

function setAccent(id) {
  localStorage.setItem('skrill_accent', id);
  if (id === 'gold') delete document.documentElement.dataset.accent;
  else document.documentElement.dataset.accent = id;
  const sel = document.getElementById('accent-select');
  if (sel) { sel.innerHTML = accentDropdownInner(); sel.classList.remove('open'); }
}

function toggleAccentMenu(e) {
  if (e) e.stopPropagation();
  const sel = document.getElementById('accent-select');
  if (sel) sel.classList.toggle('open');
}

function accentDropdownInner() {
  const cur = ACCENTS.find(a => a.id === getAccent()) || ACCENTS[0];
  const options = ACCENTS.map(a => `
    <button class="accent-opt ${a.id === cur.id ? 'active' : ''}" onclick="setAccent('${a.id}')">
      <span class="accent-swatch" style="background:${a.color}"></span>
      <span class="accent-name">${a.name}</span>
      <span class="accent-check">${a.id === cur.id ? SVG_CHECK : ''}</span>
    </button>`).join('');
  return `
    <button class="accent-trigger" onclick="toggleAccentMenu(event)">
      <span class="accent-swatch" style="background:${cur.color}"></span>
      <span class="accent-name">${cur.name}</span>
      <span class="accent-caret">▼</span>
    </button>
    <div class="accent-menu">${options}</div>`;
}

function isDarkMode() {
  return document.documentElement.dataset.theme === 'dark';
}

function setDarkMode(on) {
  if (on) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  localStorage.setItem('skrill_theme', on ? 'dark' : 'light');
}

function toggleThemeSetting() {
  setDarkMode(!isDarkMode());
  const row = document.getElementById('config-theme-row');
  if (row) row.innerHTML = configThemeRowInner();
}

function configThemeRowInner() {
  return `<span class="config-row-label">Modo escuro</span>
    <span class="config-check">${isDarkMode() ? SVG_CHECK : SVG_EMPTY}</span>`;
}

function initConfigButton() {
  if (document.getElementById('skrill-config-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'skrill-config-btn';
  btn.className = 'config-btn';
  btn.innerHTML = '<img src="/skrill/img/config.svg" alt="config" style="width:20px;height:20px;display:block">';
  btn.title = 'Configurações';
  btn.onclick = () => toggleConfigPanel(true);
  document.body.appendChild(btn);

  const overlay = document.createElement('div');
  overlay.id = 'config-overlay';
  overlay.className = 'config-overlay hidden';
  overlay.addEventListener('click', e => { if (e.target === overlay) toggleConfigPanel(false); });
  overlay.innerHTML = `
    <div id="config-panel" class="config-panel">
      <div class="config-panel-head">
        <span class="config-panel-title">Configuracoes</span>
        <button class="win-btn" onclick="toggleConfigPanel(false)">X</button>
      </div>
      <div class="config-panel-body">
        <div class="config-section-label">Tema</div>
        <div id="accent-select" class="accent-select">
          ${accentDropdownInner()}
        </div>
        <button id="config-theme-row" class="config-row" onclick="toggleThemeSetting()">
          ${configThemeRowInner()}
        </button>
        <button id="config-walker-row" class="config-row" onclick="toggleWalkerSetting()">
          ${configWalkerRowInner()}
        </button>
        ${isAdmin() ? `
        <div class="config-section-label" style="margin-top:12px">Admin</div>
        <a href="/skrill/admin/" class="config-row" style="text-decoration:none;color:inherit">
          <img src="/skrill/img/admin.svg" alt="admin" style="width:18px;height:18px">
          <span>Painel Admin</span>
        </a>` : ''}
      </div>
    </div>`;
  document.body.appendChild(overlay);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleConfigPanel(false); });
  document.addEventListener('click', e => {
    const sel = document.getElementById('accent-select');
    if (sel && sel.classList.contains('open') && !sel.contains(e.target)) sel.classList.remove('open');
  });
}

// Finaliza uma temporada: concede pontos das metas completas dos participantes
// e atualiza os streaks de TODOS os perfis (quem completou >=1 meta sobe, os
// demais zeram). Idempotente: se a temporada já foi finalizada, não faz nada.
async function finalizeSeasonById(weekId) {
  const { data: already } = await sb.from('goals')
    .select('id').eq('week_id', weekId).eq('points_awarded', true).limit(1);
  if (already?.length) return { ok: false, reason: 'already' };

  const [{ data: goals }, { data: parts }, { data: ratings }, { data: profiles }, { data: attVotes }] =
    await Promise.all([
      sb.from('goals').select('*').eq('week_id', weekId),
      sb.from('season_participants').select('profile_id').eq('week_id', weekId),
      sb.from('peer_ratings').select('goal_id,amount').eq('week_id', weekId),
      sb.from('profiles').select('id,total_points,weekly_points,streak_current,streak_longest'),
      sb.from('attempt_votes').select('goal_id,vote').eq('week_id', weekId),
    ]);

  const weekGoals      = goals ?? [];
  const participantIds = new Set((parts ?? []).map(p => p.profile_id));
  const allProfiles    = profiles ?? [];

  const bonusMap = new Map();
  for (const r of (ratings ?? [])) {
    bonusMap.set(r.goal_id, (bonusMap.get(r.goal_id) ?? 0) + r.amount);
  }

  const toAward = weekGoals.filter(g =>
    g.status === 'completed' && !g.points_awarded && participantIds.has(g.profile_id)
  );
  for (const g of toAward) {
    const base  = basePoints(g.difficulty);
    const bonus = bonusMap.get(g.id) ?? 0;
    const total = base + bonus;
    await sb.from('goals').update({ points_awarded: true, points_earned: total }).eq('id', g.id);
    if (base > 0) {
      await sb.from('point_history').insert({
        profile_id: g.profile_id, amount: base,
        reason: g.difficulty === 'complex' ? 'complete_complex' : 'complete_simple',
        goal_id: g.id, week_id: weekId,
      });
    }
    if (bonus > 0) {
      await sb.from('point_history').insert({
        profile_id: g.profile_id, amount: bonus, reason: 'peer_bonus',
        goal_id: g.id, week_id: weekId,
      });
    }
    const prof = allProfiles.find(p => p.id === g.profile_id);
    if (prof) {
      prof.total_points  = (prof.total_points  ?? 0) + total;
      prof.weekly_points = (prof.weekly_points ?? 0) + total;
      await sb.from('profiles').update({
        total_points:  prof.total_points,
        weekly_points: prof.weekly_points,
      }).eq('id', g.profile_id);
    }
  }

  // Consolação: tentativas com mais ▲ do que ▼ entre os participantes recebem +1pt.
  // Concedido aqui (no encerramento), pois os votos são desmarcáveis até a confirmação.
  const attemptTally = new Map();  // goal_id -> { up, down }
  for (const v of (attVotes ?? [])) {
    if (!attemptTally.has(v.goal_id)) attemptTally.set(v.goal_id, { up: 0, down: 0 });
    const t = attemptTally.get(v.goal_id);
    if (v.vote === 'up') t.up++; else if (v.vote === 'down') t.down++;
  }
  const attempted = weekGoals.filter(g =>
    g.status === 'attempted' && !g.attempt_pts_awarded && participantIds.has(g.profile_id)
  );
  for (const g of attempted) {
    const t = attemptTally.get(g.id) ?? { up: 0, down: 0 };
    if (t.up <= t.down) continue;
    await sb.from('goals').update({ attempt_pts_awarded: true }).eq('id', g.id);
    await sb.from('point_history').insert({
      profile_id: g.profile_id, amount: 1, reason: 'attempt_consolation',
      goal_id: g.id, week_id: weekId,
    });
    const prof = allProfiles.find(p => p.id === g.profile_id);
    if (prof) {
      prof.total_points  = (prof.total_points  ?? 0) + 1;
      prof.weekly_points = (prof.weekly_points ?? 0) + 1;
      await sb.from('profiles').update({
        total_points:  prof.total_points,
        weekly_points: prof.weekly_points,
      }).eq('id', g.profile_id);
    }
  }

  // Bounty: pontua os participantes que entregaram, conforme a contagem.
  // Idempotente via weeks.bounty_awarded (independente do guard de goals).
  const { data: week } = await sb.from('weeks')
    .select('bounty_title,bounty_awarded').eq('id', weekId).maybeSingle();
  if (week?.bounty_title && !week.bounty_awarded) {
    const { data: subs } = await sb.from('bounty_submissions')
      .select('profile_id').eq('week_id', weekId);
    const bountyProfiles = [...new Set((subs ?? [])
      .map(s => s.profile_id)
      .filter(id => participantIds.has(id)))];
    const bpts = bountyPointsFor(bountyProfiles.length);
    if (bpts > 0) {
      for (const pid of bountyProfiles) {
        await sb.from('point_history').insert({
          profile_id: pid, amount: bpts, reason: 'bounty',
          goal_id: null, week_id: weekId,
        });
        const prof = allProfiles.find(p => p.id === pid);
        if (prof) {
          prof.total_points  = (prof.total_points  ?? 0) + bpts;
          prof.weekly_points = (prof.weekly_points ?? 0) + bpts;
          await sb.from('profiles').update({
            total_points:  prof.total_points,
            weekly_points: prof.weekly_points,
          }).eq('id', pid);
        }
      }
    }
    await sb.from('weeks').update({ bounty_awarded: true }).eq('id', weekId);
  }

  // Streaks: qualquer perfil que completou ao menos uma meta nesta temporada
  // estende o streak; todos os demais zeram.
  const completedByProfile = new Set(
    weekGoals.filter(g => g.status === 'completed').map(g => g.profile_id)
  );
  for (const prof of allProfiles) {
    const newCurrent = completedByProfile.has(prof.id) ? (prof.streak_current ?? 0) + 1 : 0;
    const newLongest = Math.max(prof.streak_longest ?? 0, newCurrent);
    await sb.from('profiles').update({
      streak_current: newCurrent,
      streak_longest: newLongest,
    }).eq('id', prof.id);
  }

  return { ok: true, awarded: toAward.length };
}

// ── Boi bot ─────────────────────────────────────────────────────────────────
// O boi nao e um perfil logavel: e um competidor automatico. A cada dia (no
// maximo 1x, na primeira visita de alguem ao app) ele rola os dados para criar
// e cumprir metas tematicas de boi. Roda client-side porque o site e estatico.
const BOI_CHANCE_CREATE  = 0.35;  // chance/dia de declarar uma meta nova
const BOI_CHANCE_COMPLEX = 0.10;  // dentre as criadas, chance de ser complexa
const BOI_COMPLETE_STEP  = 0.20;  // +20% de chance de cumprir por dia aberta
const BOI_ACTIVITIES = [
  { title: 'aprender blender',      img: '/skrill/img/boi/boi_3Dmodelo.webp' },
  { title: 'cumprir proposito',     img: '/skrill/img/boi/boi_bife_carne_no_prato.webp' },
  { title: 'treino de intimidacao', img: '/skrill/img/boi/boi_bravo.webp' },
  { title: 'trabalho bracal',       img: '/skrill/img/boi/boi_carrossa.webp' },
  { title: 'aprender uma manobra',  img: '/skrill/img/boi/boi_de_skate.png' },
  { title: 'intercambio cultural',  img: '/skrill/img/boi/boi_chines_tradicional.jpeg' },
  { title: 'aula de desenho',       img: '/skrill/img/boi/boi_desenho_simples.webp' },
  { title: 'virar premium',         img: '/skrill/img/boi/boi_dourado.webp' },
  { title: 'bombar nas redes',      img: '/skrill/img/boi/boi_emoji.webp' },
  { title: 'fazer bulking',         img: '/skrill/img/boi/boi_gordo.webp' },
  { title: 'cuidar da autoestima',  img: '/skrill/img/boi/boi_lindo.webp' },
  { title: 'trabalhar o core',      img: '/skrill/img/boi/boi_pilates.png' },
  { title: 'atualizar o linkedin',  img: '/skrill/img/boi/boi_sem_fundo.webp' },
  { title: 'comecar a investir',    img: '/skrill/img/boi/boi_stocks_went_higher.webp' },
  { title: 'encarar o urso',        img: '/skrill/img/boi/boi_vs_urso_estatua.webp' },
  { title: 'comecar terapia',       img: '/skrill/img/boi/boizinho_triste_pensativo.webp' },
];

function boiImageFor(title) {
  return (BOI_ACTIVITIES.find(a => a.title === title) ?? BOI_ACTIVITIES[0]).img;
}

function ymd(date) { return date.toISOString().split('T')[0]; }
function daysBetween(fromYmd, toYmd) {
  const ms = new Date(toYmd + 'T00:00:00Z') - new Date(fromYmd + 'T00:00:00Z');
  return Math.max(0, Math.floor(ms / 86400000));
}

async function tickBoiBot() {
  if (isDemoMode()) return;  // o boi nao roda na demo offline
  try {
    const { data: boi } = await sb.from('profiles').select('*').eq('is_bot', true).maybeSingle();
    if (!boi) return;

    // Trava atomica de 1x/dia: so o primeiro request concorrente casa a condicao.
    const today = ymd(new Date());
    const { data: claimed } = await sb.from('profiles')
      .update({ bot_last_tick: today })
      .eq('id', boi.id)
      .or(`bot_last_tick.is.null,bot_last_tick.lt.${today}`)
      .select('id');
    if (!claimed?.length) return;

    // So age enquanto a temporada esta aberta (antes da revelacao / Skrill Day).
    const { data: week } = await sb.from('weeks').select('*').eq('is_current', true).maybeSingle();
    if (!week || week.skrill_time_revealed) return;
    if (week.end_date && today > week.end_date) return;

    const { data: boiGoals } = await sb.from('goals')
      .select('*').eq('profile_id', boi.id).eq('week_id', week.id);
    let goals = boiGoals ?? [];

    // Cria meta nova (pode acumular).
    if (Math.random() < BOI_CHANCE_CREATE) {
      const act        = BOI_ACTIVITIES[Math.floor(Math.random() * BOI_ACTIVITIES.length)];
      const difficulty = Math.random() < BOI_CHANCE_COMPLEX ? 'complex' : 'simple';
      const basePts    = basePoints(difficulty);
      const { data: created } = await sb.from('goals').insert({
        profile_id:    boi.id,
        week_id:       week.id,
        title:         act.title,
        status:        'active',
        difficulty,
        points_earned: basePts,
      }).select('*').single();
      if (created) goals = [...goals, created];
    }

    // Cumpre cada meta aberta: chance escala com os dias que ela esta aberta.
    for (const g of goals) {
      if (g.status !== 'active') continue;
      const createdYmd = ymd(new Date(g.created_at));
      const d = daysBetween(createdYmd, today);
      if (d < 1) continue; // nao cumpre no mesmo dia em que criou
      if (Math.random() < Math.min(1, BOI_COMPLETE_STEP * d)) {
        await sb.from('goals').update({
          status:       'completed',
          completed_at: new Date().toISOString(),
          image_urls:   [boiImageFor(g.title)],
        }).eq('id', g.id);
      }
    }

    // Registra o boi como participante (idempotente) para suas metas pontuarem
    // e aparecerem na revelacao. Marca-o como sempre "pronto" e "avaliou" para
    // nunca travar os gates do Skrill Time dos humanos.
    if (goals.length) {
      await sb.from('season_participants')
        .upsert({ week_id: week.id, profile_id: boi.id }, { onConflict: 'week_id,profile_id', ignoreDuplicates: true });
      await sb.from('week_ready')
        .upsert({ week_id: week.id, profile_id: boi.id }, { onConflict: 'week_id,profile_id', ignoreDuplicates: true });
      await sb.from('peer_rating_submissions')
        .upsert({ week_id: week.id, rater_id: boi.id }, { onConflict: 'week_id,rater_id', ignoreDuplicates: true });
      // O boi nao vota tentativas, mas precisa "confirmar" para a fase fechar.
      await sb.from('attempt_vote_submissions')
        .upsert({ week_id: week.id, voter_id: boi.id }, { onConflict: 'week_id,voter_id', ignoreDuplicates: true });
    }
  } catch (_) { /* nunca quebra a pagina */ }
}

async function convertToWebP(file, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        if (!blob) return reject(new Error('WebP conversion failed'));
        resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
      }, 'image/webp', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
    img.src = url;
  });
}

document.addEventListener('click', e => {
  const img = e.target.closest('img.delivery-img, img.reveal-img');
  if (!img || img.classList.contains('blurred')) return;
  openImageLightbox(img.src);
});

// ── Confetti ─────────────────────────────────────────────────────────────────
// Animacao vanilla em canvas (sem libs). Dispara uma rajada de particulas com
// gravidade por ~2.5s e remove o canvas ao terminar. Usado no reveal do Skrill Time.
function fireConfetti() {
  const existing = document.getElementById('confetti-canvas');
  if (existing) existing.remove();
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.className = 'confetti-canvas';
  const dpr = window.devicePixelRatio || 1;
  const W = window.innerWidth, H = window.innerHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const accentVar = getComputedStyle(document.documentElement);
  const colors = [
    accentVar.getPropertyValue('--amber').trim() || '#FFB300',
    accentVar.getPropertyValue('--sec-text').trim() || '#00075D',
    '#22c55e', '#3498DB', '#9B59B6', '#FF6347',
  ].filter(Boolean);

  const N = 130;
  const parts = [];
  for (let i = 0; i < N; i++) {
    parts.push({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: H * 0.35 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: 5 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
    });
  }

  const start = performance.now();
  const DURATION = 2600;
  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.vy += 0.35;        // gravidade
      p.vx *= 0.99;
      p.x += p.vx; p.y += p.vy; p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    if (elapsed < DURATION) {
      requestAnimationFrame(frame);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(frame);
}

// ── Badge do modo demo ───────────────────────────────────────────────────────
// Faixa fixa "MODO DEMO" com botao de sair, injetada em qualquer pagina quando
// a demo esta ativa. Evita confundir o sandbox com o jogo real.
function injectDemoBadge() {
  if (document.getElementById('demo-badge')) return;
  const b = document.createElement('div');
  b.id = 'demo-badge';
  b.style.cssText = 'position:fixed;top:8px;right:8px;z-index:10000;display:flex;align-items:center;gap:8px;'
    + 'background:var(--amber,#FFB300);color:#000;font-family:\'Micro 5\',monospace;font-size:20px;'
    + 'padding:4px 10px;border:2px solid #000;box-shadow:2px 2px 0 rgba(0,0,0,0.3);text-transform:uppercase';
  b.innerHTML = '<span>Modo Demo</span>'
    + '<button style="font-family:inherit;font-size:18px;cursor:pointer;border:1px solid #000;background:#fff;padding:1px 8px" '
    + 'onclick="DemoDB.exit();window.location.href=\'/skrill/demo/\'">Sair</button>';
  document.body.appendChild(b);
}
if (isDemoMode()) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectDemoBadge);
  else injectDemoBadge();
}
