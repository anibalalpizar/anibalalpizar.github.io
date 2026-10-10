const HEADER_HEIGHT = 56

/** Smooth-scrolls to a section on the current page. Returns false if it isn't here. */
export function scrollToId(id: string): boolean {
  const el = document.getElementById(id)
  if (!el) return false

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
  const top =
    id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT

  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" })
  return true
}
