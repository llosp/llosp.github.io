const SUPABASE_URL = 'https://yrdfccjestplfqlnrnyg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZGZjY2plc3RwbGZxbG5ybnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODgzNzgsImV4cCI6MjA5NTQ2NDM3OH0.L0KljVjvIS6R-4zO51ORlGDM9sclAFeDFRP7TvAGagU';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Session ───────────────────────────────────────────────────────────────────
const APP_PASSWORD = 'familiasteam';
const SESSION_KEY  = 'skrill_unlocked';
const PROFILE_KEY  = 'skrill_profile';

function isAppUnlocked() { return sessionStorage.getItem(SESSION_KEY) === '1'; }
function unlockApp()     { sessionStorage.setItem(SESSION_KEY, '1'); }

function getStoredProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { return null; }
}
function setStoredProfile(p) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }
function clearStoredProfile() { localStorage.removeItem(PROFILE_KEY); }

function requireAuth() {
  if (!isAppUnlocked()) { window.location.href = '/skrill/login/'; return null; }
  const p = getStoredProfile();
  if (!p) { window.location.href = '/skrill/select-profile/'; return null; }
  return p;
}

function signOut() {
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
  };
  const [cls, label] = MAP[status] ?? ['badge-active', status];
  const pts = points > 0 ? `<span class="xp-earned" style="margin-left:4px">+${points}pts</span>` : '';
  return `<span class="badge ${cls}">${label}</span>${pts}`;
}

function difficultyChip(difficulty) {
  if (difficulty === 'complex') {
    return `<span class="badge" style="background:#E8D5F5;color:var(--purple);border-color:var(--purple);font-size:20px;padding:1px 6px">Complexa</span>`;
  }
  return `<span class="badge" style="background:#D6EAF8;color:var(--blue);border-color:var(--blue);font-size:20px;padding:1px 6px">Simples</span>`;
}

function bonusPoolFor(n) {
  return Math.max(1, Math.floor((n ?? 0) / 2));
}

function renderSeasonLocked(week, profile, pageLabel, pageTitle) {
  const wSub = week ? ` · Temporada ${week.week_number}` : '';
  const safeWeekId = week?.id ?? '';
  const safeProfileId = profile?.id ?? '';

  let labelHTML = pageLabel;
  if (pageLabel.includes('[G]')) {
    labelHTML = `<span style="display:flex;align-items:center;gap:8px"><img src="/skrill/img/goals.svg" alt="goals" style="width:24px;height:24px"> Metas da Temporada</span>`;
  } else if (pageLabel.includes('[T]')) {
    labelHTML = `<span style="display:flex;align-items:center;gap:8px"><img src="/skrill/img/leaderboard.svg" alt="leaderboard" style="width:24px;height:24px"> Leaderboard</span>`;
  }

  return `<div style="width:100%">
    <div class="page-header">
      <div>
        <div class="page-header-label">${labelHTML}</div>
        <h1 class="page-header-title">${pageTitle}<span class="page-header-sub">${wSub}</span></h1>
      </div>
    </div>
    <div class="card" style="text-align:center;padding:48px 20px;background:var(--amber-light);border-color:var(--amber)">
      <div style="font-size:36px;font-weight:700;margin-bottom:10px">[!] Voce nao entrou nesta Temporada</div>
      <div style="font-size:24px;color:var(--text-muted);margin-bottom:24px;text-transform:uppercase">
        Junte-se a Temporada para declarar metas, participar do Skrill Time<br>
        e da avaliacao por pares.
      </div>
      <button class="btn btn-primary" style="font-size:24px;padding:12px 28px"
        onclick="(async()=>{const{error}=await sb.from('season_participants').insert({week_id:'${safeWeekId}',profile_id:'${safeProfileId}'});if(error&&!error.message.includes('duplicate'))alert(error.message);else window.location.reload();})()">
        Junte-se a Temporada
      </button>
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

// ── Icon helper ───────────────────────────────────────────────────────────────
function iconHTML(type) {
  const svgIcons = {
    'G': '/skrill/img/goals.svg',
    'T': '/skrill/img/leaderboard.svg',
    'P': '/skrill/img/Profile.svg',
    'A': '/skrill/img/admin.svg'
  };
  if (svgIcons[type]) {
    return `<img src="${svgIcons[type]}" class="icon-svg" alt="${type}" style="width:24px;height:24px;display:block">`;
  }
  return `[${type}]`;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function renderSidebar(profile, activePage) {
  const NAV = [
    { href: '/skrill/dashboard/',   label: 'Dashboard',    icon: '[+]', key: 'dashboard' },
    { href: '/skrill/weekly/',      label: 'Season Goals', icon: 'G', key: 'weekly' },
    { href: '/skrill/leaderboard/', label: 'Leaderboard',  icon: 'T', key: 'leaderboard' },
    { href: '/skrill/skrill-time/', label: 'Skrill Time',  icon: '[S]', key: 'skrill-time' },
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
      <div class="profile-card">
        <div class="profile-card-row">
          ${avatarHTML(profile)}
          <div style="flex:1;min-width:0">
            <div class="profile-name">${profile.name}</div>
            <div class="profile-role">${profile.streak_current ?? 0}w streak</div>
          </div>
          <div class="level-badge-sm">${profile.total_points ?? 0}pts</div>
        </div>
      </div>
      <button class="signout-btn" onclick="signOut()">← Trocar perfil</button>
    </div>`;
  }

  return `<aside class="sidebar">
    <a href="/skrill/dashboard/" class="sidebar-logo">
      <div class="skrill-sprite skrill-sprite-sm"></div>
      <span class="sidebar-logo-text">SKRILL</span>
    </a>
    <nav class="sidebar-nav">${navItems}</nav>
    ${footer}
  </aside>`;
}

function renderMobileNav(activeKey) {
  const items = [
    { href: '/skrill/dashboard/',   label: 'Home',   icon: '[+]', key: 'dashboard' },
    { href: '/skrill/weekly/',      label: 'Goals',  icon: 'G', key: 'weekly' },
    { href: '/skrill/leaderboard/', label: 'Ranks',  icon: 'T', key: 'leaderboard' },
    { href: '/skrill/skrill-time/', label: 'S.Time', icon: '[S]', key: 'skrill-time' },
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
  });

  if (error) {
    alert('Erro ao criar temporada: ' + error.message);
    return;
  }

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
      <div style="font-size:36px;font-weight:700;margin-bottom:10px">[S] Temporada não iniciada</div>
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
          <span class="win-titlebar-icon">[IMG]</span>
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

document.addEventListener('click', e => {
  const img = e.target.closest('img.delivery-img:not(.blurred), img.reveal-img');
  if (img) openImageLightbox(img.src);
});
