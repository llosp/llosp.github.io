/* ============ PRELOADER ============ */
(function preloader(){
  const count = document.getElementById('count');
  const fill = document.getElementById('fill');
  const pre = document.getElementById('preloader');
  // stagger the word letters
  document.querySelectorAll('.preloader__word span').forEach((s,i)=>s.style.setProperty('--i',i));
  let n = 0;
  const tick = setInterval(()=>{
    n += Math.floor(Math.random()*8)+3;
    if(n>=100){ n=100; clearInterval(tick); finish(); }
    count.textContent = n;
    fill.style.width = n+'%';
  },90);
  function finish(){
    setTimeout(()=>{
      pre.classList.add('done');
      document.body.classList.add('loaded');
      playHero();
    },450);
  }
})();

/* ============ HERO INTRO ============ */
function playHero(){
  const words = document.querySelectorAll('.hero__title .word');
  words.forEach((w,i)=>{
    w.style.transition = `transform 1s cubic-bezier(.16,1,.3,1) ${0.1+i*0.12}s`;
    requestAnimationFrame(()=>{ w.style.transform = 'translateY(0)'; });
  });
}

/* ============ CUSTOM CURSOR ============ */
(function cursor(){
  const ring = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  if(!ring) return;
  let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`; });
  (function loop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('[data-cursor]').forEach(el=>{
    const t = el.getAttribute('data-cursor');
    el.addEventListener('mouseenter',()=>ring.classList.add(t==='view'?'is-view':'is-hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('is-view','is-hover'));
  });
})();

/* ============ MAGNETIC BUTTONS ============ */
document.querySelectorAll('.btn-magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.3}px,${y*0.4}px)`;
  });
  btn.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0)');
});

/* ============ SCROLL REVEAL ============ */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
},{threshold:.18});
document.querySelectorAll('.reveal,.reveal-words').forEach(el=>io.observe(el));

/* ============ COUNTERS ============ */
const counters = document.querySelectorAll('.stat__num');
const cio = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count; let v=0;
    const step = ()=>{ v += Math.ceil(target/40); if(v>=target){v=target;} el.textContent=v; if(v<target) requestAnimationFrame(step); };
    step(); cio.unobserve(el);
  });
},{threshold:.6});
counters.forEach(c=>cio.observe(c));

/* ============ PARALLAX ============ */
const parallaxEls = document.querySelectorAll('[data-parallax]');
addEventListener('scroll',()=>{
  const y = scrollY;
  parallaxEls.forEach(el=>{
    const speed = parseFloat(el.dataset.parallax);
    el.style.transform = `translateY(${y*speed}px)`;
  });
},{passive:true});

/* ============ NAV HIDE/SHOW ============ */
let lastY = 0;
const nav = document.getElementById('nav');
addEventListener('scroll',()=>{
  const y = scrollY;
  if(y>lastY && y>200) nav.classList.add('hide'); else nav.classList.remove('hide');
  lastY = y;
},{passive:true});

/* ============ MOBILE MENU ============ */
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  burger.classList.remove('open'); menu.classList.remove('open');
}));

/* ============ BACK TO TOP ============ */
document.getElementById('toTop').addEventListener('click',()=>{
  scrollTo({top:0,behavior:'smooth'});
});
