import { getCollection, type CollectionEntry } from "astro:content"
import type { Lang } from "../i18n/ui"

export type Post = CollectionEntry<"posts"> & {
  /** File name without the language folder, e.g. "redesigning-my-personal-site". */
  slugName: string
  /** Path without the language prefix, e.g. /blog/redesigning-my-personal-site. */
  path: string
  /** Whole minutes at 200 words a minute, at least 1. */
  minutes: number
}

/** Words of prose and code; MDX tags, attributes and Markdown symbols don't count. */
function readingMinutes(body: string) {
  const text = body.replace(/<[^>]+>/g, " ").replace(/[#*_>`|-]+/g, " ")
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

/** Posts in one language, newest first (the order of the list and of Previous / Next). */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const entries = await getCollection("posts", ({ id }) => id.startsWith(`${lang}/`))
  return entries
    .map((entry) => {
      const slugName = entry.id.slice(lang.length + 1)
      return { ...entry, slugName, path: `/blog/${slugName}`, minutes: readingMinutes(entry.body ?? "") }
    })
    .sort((a, b) => b.data.date.localeCompare(a.data.date))
}
