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
  const MAP = { active: ['badge-active','Active'], completed: ['badge-completed','Done ✓'], beyond: ['badge-beyond','Beyond!'], failed: ['badge-failed','Missed'] };
  const [cls, label] = MAP[status] ?? ['badge-active', status];
  const pts = points > 0 ? `<span class="xp-earned" style="margin-left:6px">+${points}xp</span>` : '';
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
function renderOrbs() {
  return `<div class="orbs"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div></div>`;
}

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
      ${active ? '<span class="nav-arrow">›</span>' : ''}
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
      <div class="sidebar-logo-icon">⚡</div>
      <span class="sidebar-logo-text gradient-text">SKRILL</span>
    </a>
    <nav class="sidebar-nav">${navItems}</nav>
    ${footer}
  </aside>`;
}

function renderMobileNav(activeKey) {
  const items = [
    { href: '/skrill/dashboard/',   label: 'Home',   icon: '⊞', key: 'dashboard' },
    { href: '/skrill/leaderboard/', label: 'Ranks',  icon: '🏆', key: 'leaderboard' },
    { href: '/skrill/weekly/',      label: 'Goals',  icon: '🎯', key: 'weekly' },
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

// ── Particles ─────────────────────────────────────────────────────────────────
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.className = 'particles';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const COLORS = ['rgba(139,92,246,', 'rgba(6,182,212,', 'rgba(99,102,241,'];
  let particles = [];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

  function spawn() {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.45 + 0.08,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  for (let i = 0; i < 80; i++) spawn();
  draw();
  window.addEventListener('resize', resize);
}

// ── Tab helper ────────────────────────────────────────────────────────────────
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tabId));
}
