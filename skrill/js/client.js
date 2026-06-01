const SUPABASE_URL = 'https://yrdfccjestplfqlnrnyg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZGZjY2plc3RwbGZxbG5ybnlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODgzNzgsImV4cCI6MjA5NTQ2NDM3OH0.L0KljVjvIS6R-4zO51ORlGDM9sclAFeDFRP7TvAGagU';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Aplica o tema o quanto antes para minimizar flash
if (localStorage.getItem('skrill_theme') === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}

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
        ? `<div style="font-size:24px;color:var(--text-muted);text-transform:uppercase">
            Esta Temporada ja foi revelada.<br>
            Aguarde a proxima Temporada para participar.
          </div>`
        : `<div style="font-size:24px;color:var(--text-muted);margin-bottom:24px;text-transform:uppercase">
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
            <div class="profile-role">${profile.streak_current ?? 0}w streak</div>
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

  await sb.from('weeks').update({ is_current: false }).eq('id', weekId);
  await sb.from('weeks').insert({
    week_number:          nextNum,
    year:                 nextYear,
    start_date:           today,
    end_date:             endDate,
    is_current:           true,
    skrill_time_revealed: false,
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
  btn.textContent = '[c]';
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
        <button id="config-theme-row" class="config-row" onclick="toggleThemeSetting()">
          ${configThemeRowInner()}
        </button>
        <button id="config-walker-row" class="config-row" onclick="toggleWalkerSetting()">
          ${configWalkerRowInner()}
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleConfigPanel(false); });
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
