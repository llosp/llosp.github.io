const SUPABASE_URL = 'https://yrdfccjestplfqlnrnyg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZGZjY2plc3RwbGZxbG5ybnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODgzNzgsImV4cCI6MjA5NTQ2NDM3OH0.L0KljVjvIS6R-4zO51ORlGDM9sclAFeDFRP7TvAGagU';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Level system ──────────────────────────────────────────────────────────────
function xpForLevel(l) { return 100 + (l - 1) * 50; }

function getLevelInfo(totalXP) {
  let level = 1, acc = 0;
  while (level <= 99) {
    const n = xpForLevel(level);
    if (totalXP < acc + n) break;
    acc += n; level++;
  }
  const into = totalXP - acc;
  const need = xpForLevel(level);
  const TITLES = [
    [1,4,'Recruit'],[5,9,'Apprentice'],[10,14,'Builder'],[15,19,'Grinder'],
    [20,24,'Veteran'],[25,29,'Elite'],[30,39,'Master'],[40,49,'Legend'],[50,999,'Mythic'],
  ];
  const title = TITLES.find(([a,b]) => level >= a && level <= b)?.[2] ?? 'Mythic';
  return { level, title, currentXP: into, nextLevelXP: need, progress: Math.min(into / need, 1) };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function timeAgo(d) {
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function avatarHTML(profile, extraClass = '') {
  const initials = getInitials(profile?.display_name ?? profile?.username);
  const cls = `avatar ${extraClass}`;
  if (profile?.avatar_url) {
    return `<div class="${cls}"><img src="${profile.avatar_url}" alt="${initials}"/></div>`;
  }
  return `<div class="${cls}">${initials}</div>`;
}

function statusBadge(status, points) {
  const MAP = {
    active:    ['badge-active',    'Active'],
    completed: ['badge-completed', 'Done ✓'],
    beyond:    ['badge-beyond',    'Beyond!'],
    failed:    ['badge-failed',    'Missed'],
  };
  const [cls, label] = MAP[status] ?? ['badge-active', status];
  const pts = points > 0 ? `<span class="xp-earned" style="margin-left:4px">+${points}xp</span>` : '';
  return `<span class="badge ${cls}">${label}</span>${pts}`;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
async function requireAuth() {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) { window.location.href = '/skrill/login/'; return null; }
  return user;
}

async function signOut() {
  await sb.auth.signOut();
  window.location.href = '/skrill/login/';
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function renderSidebar(profile, activePage) {
  const NAV = [
    { href: '/skrill/dashboard/',   label: 'Dashboard',   icon: '⊞', key: 'dashboard' },
    { href: '/skrill/leaderboard/', label: 'Leaderboard', icon: '🏆', key: 'leaderboard' },
    { href: '/skrill/weekly/',      label: 'Weekly Goals', icon: '🎯', key: 'weekly' },
  ];
  if (profile) NAV.push({ href: `/skrill/profile/?id=${profile.id}`, label: 'Profile', icon: '👤', key: 'profile' });

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
    const li = getLevelInfo(profile.total_xp ?? 0);
    footer = `<div class="sidebar-footer">
      <div class="profile-card">
        <div class="profile-card-row">
          ${avatarHTML(profile)}
          <div style="flex:1;min-width:0">
            <div class="profile-name">${profile.display_name ?? profile.username}</div>
            <div class="profile-role">${li.title}</div>
          </div>
          <div class="level-badge-sm">Lv.${li.level}</div>
        </div>
        <div class="xp-labels"><span>XP</span><span>${li.currentXP} / ${li.nextLevelXP}</span></div>
        <div class="xp-bar-bg"><div class="xp-bar-fill" style="width:${li.progress * 100}%"></div></div>
      </div>
      <button class="signout-btn" onclick="signOut()">← Sign out</button>
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
    { href: '/skrill/dashboard/',   label: 'Home',    icon: '⊞', key: 'dashboard' },
    { href: '/skrill/leaderboard/', label: 'Ranks',   icon: '🏆', key: 'leaderboard' },
    { href: '/skrill/weekly/',      label: 'Goals',   icon: '🎯', key: 'weekly' },
    { href: '/skrill/profile/',     label: 'Profile', icon: '👤', key: 'profile' },
  ];
  return `<nav class="mobile-nav">
    ${items.map(({ href, label, icon, key }) =>
      `<a href="${href}" class="${activeKey === key ? 'active' : ''}">
        <span class="nav-icon">${icon}</span><span>${label}</span>
      </a>`
    ).join('')}
  </nav>`;
}

// ── Particles: no-op in retro theme ──────────────────────────────────────────
function initParticles() {}

// ── Tab helper ────────────────────────────────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tabId));
}
