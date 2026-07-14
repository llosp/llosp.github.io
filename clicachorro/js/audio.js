// audio.js — centralized audio handling

import { State } from './state.js';

const cache = {};

function getAudio(src) {
  if (!cache[src]) {
    cache[src] = new Audio(src);
  }
  return cache[src];
}

export function playSound(src, { volume = 1, pitchVariance = 0 } = {}) {
  if (!State.settings.soundEnabled) return;
  const base = getAudio(src);
  const clone = base.cloneNode();
  clone.volume = Math.min(1, Math.max(0, State.settings.volume * volume));
  if (pitchVariance > 0) {
    clone.playbackRate = 1 + (Math.random() * 2 - 1) * pitchVariance;
  }
  clone.play().catch(() => {});
}

export const Sounds = {
  blink:   'som/eye-blink.mp3',
  honk:    'som/clown-honk.mp3',
  scratch: 'som/scratch.mp3',
  plush:   'som/plush.mp3',
  woosh:   'som/woosh.mp3',
};

// ── Web Audio synthesis ───────────────────────────────────────────────────────

let _ctx = null;
function ctx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}

// Soft rustling noise through a high bandpass — leaf shimmer
export function playLeafSound() {
  if (!State.settings.soundEnabled) return;
  const ac  = ctx();
  const dur = 0.18;
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
  const d   = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

  const src = ac.createBufferSource();
  src.buffer = buf;

  const bpf = ac.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = 5000 + Math.random() * 2000;
  bpf.Q.value = 0.8;

  const gain = ac.createGain();
  const vol  = State.settings.volume * 0.35;
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(vol, ac.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);

  src.connect(bpf);
  bpf.connect(gain);
  gain.connect(ac.destination);
  src.start();
  src.stop(ac.currentTime + dur + 0.01);
}

// Short noise burst through a low-pass — dull wood knock
export function playWoodTapSound() {
  if (!State.settings.soundEnabled) return;
  const ac  = ctx();
  const dur = 0.09;
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
  const d   = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

  const src = ac.createBufferSource();
  src.buffer = buf;

  const lpf = ac.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 700 + Math.random() * 300;

  const gain = ac.createGain();
  const vol  = State.settings.volume * 0.25;
  gain.gain.setValueAtTime(vol, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);

  src.connect(lpf);
  lpf.connect(gain);
  gain.connect(ac.destination);
  src.start();
  src.stop(ac.currentTime + dur + 0.01);
}
