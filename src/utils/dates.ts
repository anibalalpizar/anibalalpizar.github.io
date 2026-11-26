import type { Lang } from "../i18n/ui"

const LOCALES: Record<Lang, string> = { en: "en-US", es: "es-CR" }

// Noon avoids the date shifting a day when parsed in another time zone.
const parse = (date: string) => new Date(`${date}T12:00:00`)

/** Whole calendar months from `startDate` until now: "21 months" / "21 meses". */
export function monthsSince(startDate: string, lang: Lang, now = new Date()) {
  const start = parse(startDate)
  const months = Math.max(
    0,
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  )
  const unit =
    lang === "es" ? (months === 1 ? "mes" : "meses") : months === 1 ? "month" : "months"
  return `${months} ${unit}`
}

/**
 * "2y ago" / "hace 2 años"; months under a year: "5mo ago" / "hace 5 meses";
 * under a month: "2w ago" / "hace 2 semanas", "3d ago" / "hace 3 días", "today" / "hoy".
 */
export function timeAgo(date: string, lang: Lang, now = new Date()) {
  const d = parse(date)
  let months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  if (now.getDate() < d.getDate()) months--
  months = Math.max(0, months)
  const years = Math.floor(months / 12)

  // A new post said "0mo ago"; count days and weeks instead.
  if (months === 0) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12)
    const days = Math.max(0, Math.round((today.getTime() - d.getTime()) / 86_400_000))
    const weeks = Math.floor(days / 7)
    if (lang === "es") {
      if (days === 0) return "hoy"
      if (weeks >= 1) return weeks === 1 ? "hace 1 semana" : `hace ${weeks} semanas`
      return days === 1 ? "ayer" : `hace ${days} días`
    }
    if (days === 0) return "today"
    if (weeks >= 1) return `${weeks}w ago`
    return days === 1 ? "yesterday" : `${days}d ago`
  }

  if (lang === "es") {
    if (years >= 1) return years === 1 ? "hace 1 año" : `hace ${years} años`
    return months === 1 ? "hace 1 mes" : `hace ${months} meses`
  }
  return years >= 1 ? `${years}y ago` : `${months}mo ago`
}

/** "August 19, 2024" / "19 de agosto de 2024". */
export function formatDate(date: string, lang: Lang) {
  return parse(date).toLocaleDateString(LOCALES[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
]

/** "3 hours ago" / "hace 3 horas", "yesterday" / "ayer", for an ISO date and time. */
export function relativeTime(iso: string, lang: Lang, now = new Date()) {
  const seconds = (Date.parse(iso) - now.getTime()) / 1000
  const format = new Intl.RelativeTimeFormat(LOCALES[lang], { numeric: "auto" })
  const [unit, size] = UNITS.find(([, size]) => Math.abs(seconds) >= size) ?? UNITS.at(-1)!
  return format.format(Math.round(seconds / size), unit)
}
