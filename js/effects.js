// effects.js — visual feedback: stars, floating text, screen shake

function starContainer() {
  return document.querySelector('.estrelas');
}

export function explodirEstrelas(x, y, qtd = 40) {
  const cores = ['yellow', 'blue', 'black', 'white', '#FA4E79'];
  for (let i = 0; i < qtd; i++) {
    const el = document.createElement('div');
    el.classList.add('estrela');
    el.style.left = x + 'px';
    el.style.top  = y + 'px';

    const angulo    = Math.random() * Math.PI * 2;
    const distancia = Math.random() * 500 + 200;
    el.style.setProperty('--x', Math.cos(angulo) * distancia + 'px');
    el.style.setProperty('--y', Math.sin(angulo) * distancia + 'px');

    const size = Math.random() * 10 + 8;
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    el.style.background = cores[Math.floor(Math.random() * cores.length)];

    starContainer().appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}

export function floatingText(x, y, text, { color = '#fff', size = '1.1rem', critical = false } = {}) {
  const el = document.createElement('div');
  el.className = 'floating-text' + (critical ? ' critical' : '');
  el.textContent = text;
  el.style.left   = x + 'px';
  el.style.top    = y + 'px';
  el.style.color  = color;
  el.style.fontSize = size;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

export function screenShake(intensity = 6, duration = 300) {
  const body = document.body;
  body.style.transition = 'none';
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    if (elapsed >= duration) { body.style.transform = ''; return; }
    const t = (1 - elapsed / duration) * intensity;
    const dx = (Math.random() * 2 - 1) * t;
    const dy = (Math.random() * 2 - 1) * t;
    body.style.transform = `translate(${dx}px, ${dy}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
