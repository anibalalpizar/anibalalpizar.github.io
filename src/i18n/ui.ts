export type Lang = "en" | "es"

/** A value that is either shared by both languages or given per language. */
export type Localized<T = string> = T | { en: T; es: T }

export const locales: Record<Lang, string> = { en: "en-US", es: "es-CR" }

export function L<T>(value: Localized<T>, lang: Lang): T {
  if (value && typeof value === "object" && "en" in value && "es" in value) {
    return (value as { en: T; es: T })[lang]
  }
  return value as T
}

/**
 * Link to a page in a language: `/projects` → `/projects/` or `/es/projects/`.
 * `path` starts with `/` and may end in a `#section`. The trailing slash matches
 * how GitHub Pages serves pages (as folders), so links don't go through a redirect.
 */
export function localePath(lang: Lang, path: string) {
  // The English 404 is the single file GitHub Pages serves for every missing URL.
  if (lang === "en" && path === "/404") return "/404.html"
  const [, pathname, suffix] = path.match(/^([^?#]*)(.*)$/)!
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`
  return `${lang === "es" ? "/es" : ""}${withSlash}${suffix}`
}

const en = {
  docTitle: "Aníbal — Software Engineer",
  description:
    "Aníbal Alpízar is a software engineer and web developer based in Costa Rica.",
  navExperience: "Experience",
  navProjects: "Projects",
  navStack: "Stack",
  navContact: "Contact",
  ariaMain: "Main",
  ariaMenu: "Open command menu",
  ariaTheme: "Toggle theme",
  ariaLang: "Language",
  ariaSearch: "Search",
  bio: "+3 years of experience with a strong background in developing Web Applications and working with Open Source technologies.",
  cv: "Download CV",
  touch: "Get in touch",
  currently: "Currently",
  currentlyAt: "at",
  basedIn: "Based in",
  localTime: "Local time",
  now: "Now",
  month: "month",
  months: "months",
  allProjects: "All projects",
  moreGithub: "More on GitHub ↗",
  downloads: "downloads",
  connect: "Let’s connect.",
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  downloadCv: "Download CV",
  backTop: "Back to top ↑",
  caseStudy: "Case study",
  backToExperience: "← Experience",
  date: "Date",
  role: "Role",
  client: "Client",
  organization: "Organization",
  stack: "Stack",
  fig: "Fig.",
  source: "Source",
  detail: "Detail",
  prev: "← Previous",
  next: "Next →",
  play: "Play video",
  watch: "Watch on YouTube ↗",
  backHome: "← Home",
  projectsCount: "projects",
  searchProjects: "Search projects…",
  result: "result",
  results: "results",
  all: "All",
  categories: { npm: "NPM Packages", web: "Web Apps", api: "APIs", tools: "Tools" },
  noMatch: "No projects match",
  clearSearch: "Clear search",
  paletteSearch: "Search or jump to…",
  noResults: "No results",
  groups: {
    sections: "Sections",
    cases: "Case studies",
    projects: "Projects",
    links: "Links",
    prefs: "Preferences",
  },
  toLight: "Switch to light theme",
  toDark: "Switch to dark theme",
  switchLang: "Cambiar a español",
  switchLangHint: "ES",
  notFoundCode: "Error 404",
  notFoundTitle: "Page not found.",
  notFoundText: "There’s nothing at this address. The page may have moved, or the link may be wrong.",
  notFoundPath: "Requested",
  notFoundHome: "Back to home",
}

// Typed against `en` so a missing or extra key fails the build.
const es: typeof en = {
  docTitle: "Aníbal — Ingeniero de software",
  description:
    "Aníbal Alpízar es ingeniero de software y desarrollador web en Costa Rica.",
  navExperience: "Experiencia",
  navProjects: "Proyectos",
  navStack: "Stack",
  navContact: "Contacto",
  ariaMain: "Principal",
  ariaMenu: "Abrir menú de comandos",
  ariaTheme: "Cambiar tema",
  ariaLang: "Idioma",
  ariaSearch: "Buscar",
  bio: "+3 años de experiencia, con una sólida base en el desarrollo de aplicaciones web y en el trabajo con tecnologías Open Source.",
  cv: "Descargar CV",
  touch: "Contáctame",
  currently: "Actualmente",
  currentlyAt: "en",
  basedIn: "Ubicación",
  localTime: "Hora local",
  now: "Hoy",
  month: "mes",
  months: "meses",
  allProjects: "Todos los proyectos",
  moreGithub: "Más en GitHub ↗",
  downloads: "descargas",
  connect: "Hablemos.",
  email: "Correo",
  github: "GitHub",
  linkedin: "LinkedIn",
  downloadCv: "Descargar CV",
  backTop: "Volver arriba ↑",
  caseStudy: "Caso de estudio",
  backToExperience: "← Experiencia",
  date: "Fecha",
  role: "Rol",
  client: "Cliente",
  organization: "Organización",
  stack: "Stack",
  fig: "Fig.",
  source: "Fuente",
  detail: "Detalle",
  prev: "← Anterior",
  next: "Siguiente →",
  play: "Reproducir video",
  watch: "Ver en YouTube ↗",
  backHome: "← Inicio",
  projectsCount: "proyectos",
  searchProjects: "Buscar proyectos…",
  result: "resultado",
  results: "resultados",
  all: "Todos",
  categories: { npm: "Paquetes NPM", web: "Apps web", api: "APIs", tools: "Herramientas" },
  noMatch: "Ningún proyecto coincide con",
  clearSearch: "Limpiar búsqueda",
  paletteSearch: "Buscar o ir a…",
  noResults: "Sin resultados",
  groups: {
    sections: "Secciones",
    cases: "Casos de estudio",
    projects: "Proyectos",
    links: "Enlaces",
    prefs: "Preferencias",
  },
  toLight: "Cambiar a tema claro",
  toDark: "Cambiar a tema oscuro",
  switchLang: "Switch to English",
  switchLangHint: "EN",
  notFoundCode: "Error 404",
  notFoundTitle: "Página no encontrada.",
  notFoundText: "No hay nada en esta dirección. Puede que la página se haya movido o que el enlace esté mal.",
  notFoundPath: "Dirección",
  notFoundHome: "Volver al inicio",
}

export const ui = { en, es }

export type UI = typeof en

/** Language of a page from its URL path: `/es/...` is Spanish, everything else English. */
export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en"
}
