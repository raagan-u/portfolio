import { ref } from 'vue';

const STORAGE_KEY = 'theme';

function readInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored === 'dark';
  } catch (e) {}
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

const isDark = ref(readInitial());

function applyToDocument(dark) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', dark);
}

applyToDocument(isDark.value);

function toggle() {
  isDark.value = !isDark.value;
  applyToDocument(isDark.value);
  try {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
  } catch (e) {}
}

export function useTheme() {
  return { isDark, toggle };
}
