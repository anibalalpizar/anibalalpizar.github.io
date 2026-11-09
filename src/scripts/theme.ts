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

/** Centre of the header's theme button, where the new theme spreads from. */
function buttonCenter() {
  const box = document.querySelector("[data-theme-toggle]")?.getBoundingClientRect()
  return box && box.width ? { x: box.left + box.width / 2, y: box.top + box.height / 2 } : { x: innerWidth - 40, y: 28 }
}

/**
 * Switches to `theme`: the new one spreads over the page in a circle from the
 * theme button. Without view transitions, or with reduced motion, it just switches.
 * The .theme-transition class tells the page-transition styles in Layout.astro
 * to stand aside while this runs.
 */
export function switchTheme(theme: Theme) {
  if (theme === getTheme()) return
  const root = document.documentElement
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTheme(theme)
    return
  }
  const { x, y } = buttonCenter()
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  root.classList.add("theme-transition")
  const transition = document.startViewTransition(() => setTheme(theme))
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      )
    })
    .catch(() => {})
  transition.finished.finally(() => root.classList.remove("theme-transition"))
}

export function toggleTheme() {
  switchTheme(getTheme() === "dark" ? "light" : "dark")
}
