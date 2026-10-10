export type Theme = "dark" | "light"

// Must match the key read by the inline script in Layout.astro.
const STORAGE_KEY = "site-theme"

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark"
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark")
}
