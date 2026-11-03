export type Theme = "dark" | "light"

// Must match the key read by the inline script in Layout.astro.
const STORAGE_KEY = "site-theme"

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark"
}

// Address bar colour on phones; same values as --bg in Layout.astro.
const BAR_COLOR: Record<Theme, string> = { dark: "#000000", light: "#ffffff" }

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", BAR_COLOR[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark")
}
