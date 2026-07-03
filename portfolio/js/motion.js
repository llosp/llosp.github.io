// All GSAP/ScrollTrigger motion. CSS is authored in the final state and we
// animate FROM hidden, so a blocked CDN or reduced motion never hides content.
let marqueeTween = null;

function reducedMotion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-name-front', { yPercent: 60, opacity: 0, duration: 0.7 })
    .from('.hero-name-back', { yPercent: -40, opacity: 0, duration: 0.6 }, '-=0.45')
    .from('.hero-dog', { scale: 0, rotate: -30, duration: 0.65, ease: 'back.out(1.7)' }, '-=0.3')
    .from('.role-block', { y: 40, opacity: 0, rotate: 6, stagger: 0.08, duration: 0.45, ease: 'back.out(2)' }, '-=0.2')
    .from('.hero-intro', { y: 20, opacity: 0, duration: 0.4 }, '-=0.1')
    .from('.hero-cta', { scale: 0.6, opacity: 0, duration: 0.4, ease: 'back.out(2.5)' }, '-=0.15')
    .from('.hero-hint', { opacity: 0, duration: 0.6 }, '-=0.1');
}

function sectionReveals() {
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    once: true,
    onEnter: batch =>
      batch.length &&
      gsap.from(batch, {
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      })
  });
}

function marquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  marqueeTween = gsap.to(track, { xPercent: -50, repeat: -1, duration: 22, ease: 'none' });
  ScrollTrigger.create({
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: self => (self.isActive ? marqueeTween.play() : marqueeTween.pause())
  });
}

function dogParallax() {
  // y only: the entrance timeline owns scale/rotate on the same element
  gsap.to('.hero-dog', {
    y: 90,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
  });

  gsap.from('.peek', {
    yPercent: 120,
    ease: 'back.out(1.4)',
    duration: 0.7,
    scrollTrigger: { trigger: '#skills', start: 'top 75%', once: true }
  });
}

export function initMotion() {
  if (!window.gsap || !window.ScrollTrigger || reducedMotion()) {
    document.documentElement.classList.add('no-motion');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  heroEntrance();
  sectionReveals();
  marquee();
  dogParallax();

  // Layout shifts after webfonts land or the language switches
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  document.addEventListener('langchange', () => ScrollTrigger.refresh());

  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
    if (!e.matches) return;
    document.documentElement.classList.add('no-motion');
    marqueeTween?.pause();
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.globalTimeline.clear();
    gsap.set('.reveal, .hero-name, .hero-dog, .role-block, .hero-intro, .hero-cta, .peek', {
      clearProps: 'all'
    });
  });
}
