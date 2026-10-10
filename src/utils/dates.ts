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

/** "2y ago" / "hace 2 años"; months under a year: "5mo ago" / "hace 5 meses". */
export function timeAgo(date: string, lang: Lang, now = new Date()) {
  const d = parse(date)
  let months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  if (now.getDate() < d.getDate()) months--
  months = Math.max(0, months)
  const years = Math.floor(months / 12)

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
