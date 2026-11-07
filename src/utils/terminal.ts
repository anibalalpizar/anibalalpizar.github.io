// What the terminal (src/components/Terminal.astro) prints, in one language.
// Served as /terminal/en.json and /terminal/es.json and fetched the first time
// the terminal opens, so pages don't carry it for visitors who never do.
import { basics } from "../data/cv.json"
import {
  CV_URL,
  EMAIL,
  experience,
  FULL_NAME,
  GITHUB_URL,
  kinds,
  LINKEDIN_URL,
  projects,
  stack,
} from "../data/site"
import { L, localePath, ui, type Lang } from "../i18n/ui"
import { downloadsOf, getActivity } from "./activity"
import { getPosts } from "./posts"

export async function terminalData(lang: Lang) {
  const t = ui[lang]
  const activity = await getActivity()
  const posts = await getPosts(lang)
  const current = experience.find((job) => job.endDate == null)
  const year = (date: string | null) => (date ? new Date(date).getFullYear() : t.now)

  return {
    home: localePath(lang, "/"),
    pages: {
      home: localePath(lang, "/"),
      projects: localePath(lang, "/projects"),
      blog: localePath(lang, "/blog"),
    },
    profile: {
      name: FULL_NAME,
      role: current ? `${L(current.role, lang)} ${t.currentlyAt} ${L(current.company, lang)}` : "",
      location: `${basics.location.city}, ${basics.location.region}`,
    },
    links: { github: GITHUB_URL, linkedin: LINKEDIN_URL, email: EMAIL, cv: L(CV_URL, lang) },
    experience: experience.map((job) => ({
      // "2024" for a job within one year, "2025–Now" otherwise.
      years: [...new Set([year(job.startDate), year(job.endDate)])].join("–"),
      company: L(job.company, lang),
      role: L(job.role, lang),
      href: job.casePath && localePath(lang, job.casePath),
    })),
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      kind: L(kinds[project.kind], lang),
      description: L(project.description, lang),
      stack: project.stack.join(", "),
      github: project.github,
      downloads: downloadsOf(activity, project.npm),
    })),
    stack: stack.map((group) => ({ label: L(group.label, lang), items: group.items.join(", ") })),
    posts: posts.map((post) => ({
      slug: post.slugName,
      title: post.data.title,
      date: post.data.date,
      href: localePath(lang, post.path),
    })),
    strings: { ...t.terminal, downloads: t.downloads },
  }
}
