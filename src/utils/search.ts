// The text the ⌘K menu (src/components/CommandMenu.astro) searches inside:
// every post, case study and project, as plain text. Served as /search/en.json
// and /search/es.json and fetched the first time the menu opens, so pages don't
// carry it for visitors who never search.
import { getCollection } from "astro:content"
import { experience, kinds, projects } from "../data/site"
import { L, localePath, ui, type Lang } from "../i18n/ui"
import { getPosts } from "./posts"

export interface SearchEntry {
  title: string
  /** What kind of page it is, shown at the right of the result. */
  hint: string
  url: string
  text: string
}

/** MDX source to plain text: tags give up their titles and captions, Markdown its symbols. */
export function plainText(mdx: string) {
  return (
    mdx
      // <Section title="…">, <Figure caption="…" />, <Term name="…">, figure={{ caption: "…" }}.
      // Only components (capitalised): a <td> or <tool-tip> in a code sample is text.
      .replace(/<\/?[A-Z][\s\S]*?>/g, (tag) =>
        [...tag.matchAll(/\b(?:title|caption|name)\s*[=:]\s*"([^"]*)"/g)].map((m) => ` ${m[1]}. `).join("")
      )
      .replace(/^```.*$/gm, " ")
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/^\s*(?:#+|[-*]|\d+\.)\s+/gm, "")
      // **bold** loses its asterisks; a * in a code sample (a regex, say) stays.
      .replace(/\*\*([^*\n]+)\*\*/g, "$1")
      .replace(/`/g, "")
      .replace(/\s+/g, " ")
      .trim()
  )
}

export async function searchData(lang: Lang): Promise<SearchEntry[]> {
  const t = ui[lang]
  const posts = await getPosts(lang)
  const cases = await getCollection("cases", ({ id }) => id.startsWith(`${lang}/`))

  return [
    ...posts.map((post) => ({
      title: post.data.title,
      hint: t.groups.blog,
      url: localePath(lang, post.path),
      text: `${post.data.description} ${plainText(post.body ?? "")}`,
    })),
    ...cases.map((entry) => {
      const job = experience.find((job) => job.id === entry.data.exp)
      const { before, link, after } = entry.data.title
      return {
        title: job ? L(job.company, lang) : `${before}${link}${after}`,
        hint: t.groups.cases,
        url: localePath(lang, entry.data.path),
        // The facts too (client, organization, stack): "Prisma" finds the case that used it.
        text: `${before}${link}${after}. ${entry.data.lead} ${plainText(entry.body ?? "")} ${entry.data.facts
          .map((fact) => fact.value)
          .join(" · ")}`,
      }
    }),
    ...projects.map((project) => ({
      title: project.name,
      hint: L(kinds[project.kind], lang),
      url: localePath(lang, `/projects#p-${project.id}`),
      // With its name: only the featured projects are in the menu by name.
      text: `${project.name}. ${L(project.description, lang)} ${project.stack.join(" · ")}`,
    })),
  ]
}
