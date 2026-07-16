import { strings } from './data/strings.js';

const STORAGE_KEY = 'lope-portfolio-lang';

let lang = localStorage.getItem(STORAGE_KEY) === 'pt' ? 'pt' : 'en';

export function getLang() {
  return lang;
}

/** Translate a { en, pt } object. */
export function t(obj) {
  if (obj == null) return '';
  return typeof obj === 'string' ? obj : (obj[lang] ?? obj.en ?? '');
}

/** Translate a UI string by dot-key. */
export function tk(key) {
  return t(strings[key]);
}

export function applyStrings(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const value = strings[el.dataset.i18n];
    if (value) el.textContent = value[lang] ?? value.en;
  });
}

function syncDocument() {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'en' ? 'EN → PT' : 'PT → EN';
}

export function setLang(next) {
  if (next === lang) return;
  lang = next;
  localStorage.setItem(STORAGE_KEY, lang);
  syncDocument();
  applyStrings();
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function initI18n() {
  syncDocument();
  applyStrings();
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    setLang(lang === 'en' ? 'pt' : 'en');
  });
}
