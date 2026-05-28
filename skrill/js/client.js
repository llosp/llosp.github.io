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
    beyond:    ['badge-beyond',    'Beyond!'],
    failed:    ['badge-failed',    'Perdeu'],
  };
  const [cls, label] = MAP[status] ?? ['badge-active', status];
  const pts = points > 0 ? `<span class="xp-earned" style="margin-left:4px">+${points}pts</span>` : '';
  return `<span class="badge ${cls}">${label}</span>${pts}`;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function renderSidebar(profile, activePage) {
  const NAV = [
    { href: '/skrill/dashboard/',   label: 'Dashboard',    icon: '[+]', key: 'dashboard' },
    { href: '/skrill/leaderboard/', label: 'Leaderboard',  icon: '[T]', key: 'leaderboard' },
    { href: '/skrill/weekly/',      label: 'Weekly Goals', icon: '[G]', key: 'weekly' },
  ];
  if (profile) NAV.push({ href: `/skrill/profile/?id=${profile.id}`, label: 'Profile', icon: '[P]', key: 'profile' });

  const navItems = NAV.map(({ href, label, icon, key }) => {
    const active = activePage === key;
    return `<a href="${href}" class="nav-link ${active ? 'active' : ''}">
      <span class="nav-icon">${icon}</span>
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
    { href: '/skrill/dashboard/',   label: 'Home',    icon: '[+]', key: 'dashboard' },
    { href: '/skrill/leaderboard/', label: 'Ranks',   icon: '[T]', key: 'leaderboard' },
    { href: '/skrill/weekly/',      label: 'Goals',   icon: '[G]', key: 'weekly' },
    { href: '/skrill/profile/',     label: 'Profile', icon: '[P]', key: 'profile' },
  ];
  return `<nav class="mobile-nav">
    ${items.map(({ href, label, icon, key }) =>
      `<a href="${href}" class="${activeKey === key ? 'active' : ''}">
        <span class="nav-icon">${icon}</span><span>${label}</span>
      </a>`
    ).join('')}
  </nav>`;
}

// ── Tab helper ────────────────────────────────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tabId));
}
