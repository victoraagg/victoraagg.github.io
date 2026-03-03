const themeToggleEl = document.querySelector('.theme-toggle');
const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function updateThemeToggleLabel(theme) {
  if (!themeToggleEl) {
    return;
  }

  themeToggleEl.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggleEl.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeToggleLabel(theme);
}

function toggleTheme() {
  const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
}

if (themeToggleEl) {
  updateThemeToggleLabel(getCurrentTheme());
  themeToggleEl.addEventListener('click', toggleTheme);
}

function handleSystemThemeChange(event) {
  if (localStorage.getItem('theme')) {
    return;
  }

  applyTheme(event.matches ? 'dark' : 'light');
}

if (typeof prefersDarkQuery.addEventListener === 'function') {
  prefersDarkQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof prefersDarkQuery.addListener === 'function') {
  prefersDarkQuery.addListener(handleSystemThemeChange);
}
