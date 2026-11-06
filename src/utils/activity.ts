// Live numbers for the home "Activity" section and the npm download counts on
// the project cards: GitHub contributions and latest push, and npm downloads.
// Fetched once per build; the site rebuilds every night (.github/workflows/deploy.yml).
//
// A source that fails is left out and the section shows the rest, so an outage
// never blocks publishing a change. The nightly rebuild sets ACTIVITY_REQUIRED=true
// instead: there a failure stops the deploy, and the site online keeps yesterday's numbers.
import { GITHUB_URL, projects } from "../data/site"

export type Day = { date: string; count: number; level: number }

export type Contributions = {
  total: number
  /** Oldest first; the first day is a Sunday, like GitHub's calendar. */
  days: Day[]
  longestStreak: number
  /** Days in a row up to today (in Costa Rica); today without contributions yet doesn't break it. */
  currentStreak: number
}

export type Push = { repo: string; url: string; date: string }

export type Week = { start: string; downloads: number }

export type Npm = {
  /** All-time downloads of every package. */
  total: number
  /** Most downloaded first. */
  packages: { name: string; url: string; downloads: number }[]
  /** The last 52 full weeks (ending yesterday), all packages together, oldest first. */
  weeks: Week[]
}

export type Activity = {
  /** When the data was fetched (ISO). */
  updated: string
  contributions: Contributions | null
  lastPush: Push | null
  npm: Npm | null
}

const USER = new URL(GITHUB_URL).pathname.replace(/^\/|\/$/g, "")
const PACKAGES = projects.flatMap((project) => (project.npm ? [project.npm] : []))
// A plain client name: GitHub's API rejects requests without one.
const HEADERS = { "User-Agent": "anibalalpizar.github.io build" }
const DAY = 86_400_000
// Same zone as the clock under the hero (Facts.astro).
export const TIME_ZONE = "America/Costa_Rica"

const isoDay = (time: number) => new Date(time).toISOString().slice(0, 10)
const dayTime = (date: string) => Date.parse(`${date}T00:00:00Z`)

/**
 * fetch with a timeout. Busy (429) or failing (5xx) servers, timeouts and network
 * errors get up to two more tries, 3s and then 6s later; anything else throws.
 */
async function request(url: string, headers: Record<string, string> = {}) {
  for (let attempt = 1; ; attempt++) {
    let problem: string
    try {
      const response = await fetch(url, {
        headers: { ...HEADERS, ...headers },
        signal: AbortSignal.timeout(15_000),
      })
      if (response.ok) return response
      problem = `${response.status} ${response.statusText}`
      if (response.status !== 429 && response.status < 500) attempt = 3
    } catch (error) {
      problem = (error as Error).message
    }
    if (attempt >= 3) throw new Error(`${url}: ${problem}`)
    await new Promise((resolve) => setTimeout(resolve, attempt * 3_000))
  }
}

// GitHub has no public API for the contribution calendar, so this reads the same
// HTML fragment the profile page loads. If GitHub changes it, this throws instead
// of guessing.
async function loadContributions(): Promise<Contributions> {
  const html = await (await request(`https://github.com/users/${USER}/contributions`)).text()

  // Each day is a <td data-date data-level id>; its count is in <tool-tip for="that id">.
  const counts = new Map<string, number>()
  for (const [, id, text] of html.matchAll(/<tool-tip\b[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const match = text.trim().match(/^(No|\d[\d,]*) contributions? on /)
    if (!match) throw new Error(`unexpected day label "${text.trim()}"`)
    counts.set(id, match[1] === "No" ? 0 : Number(match[1].replace(/,/g, "")))
  }

  const days: Day[] = []
  for (const [cell] of html.matchAll(/<td\b[^>]*\sdata-date="[^"]*"[^>]*>/g)) {
    const attr = (name: string) => cell.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
    const date = attr("data-date")
    const level = Number(attr("data-level"))
    const count = counts.get(attr("id") ?? "")
    if (!date || count === undefined || !(level >= 0 && level <= 4)) throw new Error("unexpected day cell")
    days.push({ date, count, level })
  }
  days.sort((a, b) => a.date.localeCompare(b.date))
  if (days.length < 360) throw new Error(`only ${days.length} days found`)

  let longestStreak = 0
  let run = 0
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0
    longestStreak = Math.max(longestStreak, run)
  }
  // GitHub's calendar ends on today's date in UTC, which can already be
  // tomorrow in Costa Rica: empty days from today on don't break the streak.
  const today = new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE })
  let currentStreak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak++
    else if (days[i].date < today) break
  }

  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    days,
    longestStreak,
    currentStreak,
  }
}

/** The most recent public push; null when there was none in the last 90 days. */
async function loadLastPush(): Promise<Push | null> {
  // On GitHub Actions the workflow's token avoids the 60-requests-an-hour limit.
  const token = process.env.GITHUB_TOKEN
  const response = await request(
    `https://api.github.com/users/${USER}/events/public?per_page=100`,
    token ? { Authorization: `Bearer ${token}` } : {}
  )
  const events: { type: string; created_at: string; repo: { name: string } }[] = await response.json()
  const push = events.find((event) => event.type === "PushEvent")
  if (!push) return null
  const [owner, name] = push.repo.name.split("/")
  return {
    repo: owner === USER ? name : push.repo.name,
    url: `https://github.com/${push.repo.name}`,
    date: push.created_at,
  }
}

type Range = { downloads: { day: string; downloads: number }[] }

async function loadNpm(): Promise<Npm> {
  // When each package was published, from the registry (the downloads API is the
  // one with a tight rate limit).
  const created = await Promise.all(
    PACKAGES.map(async (name) => {
      const meta: { time: { created: string } } = await (
        await request(`https://registry.npmjs.org/${name}`)
      ).json()
      return meta.time.created.slice(0, 10)
    })
  )

  // One "bulk" request covers every package and up to 365 days, so the whole
  // history takes a couple of requests, made one after another.
  const totals = new Map(PACKAGES.map((name) => [name, 0]))
  const byDay = new Map<string, number>()
  const last = isoDay(Date.now() - DAY)
  for (let start = created.sort()[0]; start <= last; ) {
    const end = isoDay(Math.min(dayTime(start) + 364 * DAY, dayTime(last)))
    const body: Range | Record<string, Range | null> = await (
      await request(`https://api.npmjs.org/downloads/range/${start}:${end}/${PACKAGES.join(",")}`)
    ).json()
    // With a single package the answer isn't keyed by name.
    const ranges = PACKAGES.length === 1 ? { [PACKAGES[0]]: body as Range } : (body as Record<string, Range | null>)
    for (const name of PACKAGES) {
      for (const { day, downloads } of ranges[name]?.downloads ?? []) {
        totals.set(name, totals.get(name)! + downloads)
        byDay.set(day, (byDay.get(day) ?? 0) + downloads)
      }
    }
    start = isoDay(dayTime(end) + DAY)
  }

  // 52 seven-day weeks ending yesterday.
  const yesterday = dayTime(isoDay(Date.now() - DAY))
  const weeks: Week[] = Array.from({ length: 52 }, (_, i) => {
    const start = yesterday - (52 - i) * 7 * DAY + DAY
    let downloads = 0
    for (let d = 0; d < 7; d++) downloads += byDay.get(isoDay(start + d * DAY)) ?? 0
    return { start: isoDay(start), downloads }
  })

  const packages = [...totals]
    .map(([name, downloads]) => ({ name, url: `https://www.npmjs.com/package/${name}`, downloads }))
    .sort((a, b) => b.downloads - a.downloads)

  return { total: packages.reduce((sum, p) => sum + p.downloads, 0), packages, weeks }
}

async function load(): Promise<Activity> {
  const required = process.env.ACTIVITY_REQUIRED === "true"

  async function settle<T>(source: string, task: () => Promise<T>): Promise<T | null> {
    try {
      return await task()
    } catch (error) {
      const message = `${source}: ${(error as Error).message}`
      if (required) throw new Error(`Activity data is required in this build. ${message}`)
      // On GitHub Actions this shows up as a warning on the run's summary page.
      console.warn(process.env.GITHUB_ACTIONS ? `::warning title=Activity::${message}` : `[activity] ${message}`)
      return null
    }
  }

  const [contributions, lastPush, npm] = await Promise.all([
    settle("GitHub contributions", loadContributions),
    settle("GitHub latest push", loadLastPush),
    settle("npm downloads", loadNpm),
  ])
  return { updated: new Date().toISOString(), contributions, lastPush, npm }
}

let cached: Promise<Activity> | undefined

/** Fetched once per build, however many pages use it. */
export function getActivity() {
  return (cached ??= load())
}

/** All-time downloads of an npm package, or undefined if npm couldn't be reached. */
export function downloadsOf(activity: Activity, name: string | undefined) {
  return activity.npm?.packages.find((p) => p.name === name)?.downloads
}
