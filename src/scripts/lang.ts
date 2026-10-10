import type { Lang } from "../i18n/ui"

// Must match the keys read by the inline script in Layout.astro.
const LANG_KEY = "lang"
const SCROLL_KEY = "restore-scroll"

/** Saves the choice and opens the same page in the other language, keeping the scroll. */
export function switchLanguage(lang: Lang, href: string) {
  try {
    localStorage.setItem(LANG_KEY, lang)
    sessionStorage.setItem(SCROLL_KEY, String(Math.round(window.scrollY)))
  } catch {}
  location.href = href
}

/** Called on load: returns to where the reader was before switching language. */
export function restoreScroll() {
  try {
    const y = sessionStorage.getItem(SCROLL_KEY)
    if (y == null) return
    sessionStorage.removeItem(SCROLL_KEY)
    window.scrollTo(0, Number(y))
  } catch {}
}
