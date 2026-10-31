import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"

// One MDX file per case and language: src/content/cases/<en|es>/<slug>.mdx.
// The body uses the components in src/components/mdx (Section, Figure, Detail…),
// passed in by CasePage (src/components/mdx/index.ts), so the files don't need imports.
const cases = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/cases" }),
  schema: z.object({
    /** Matches an `experience` id in src/data/site.ts (sets order, role and short name). */
    exp: z.string(),
    /** URL path without the language prefix, e.g. /2024/internship-at-tech-solutions. */
    path: z.string().regex(/^\/\d{4}\/[a-z0-9-]+$/),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    titleHref: z.url(),
    /** The title, split around the part that links to titleHref. */
    title: z.object({ before: z.string(), link: z.string(), after: z.string() }),
    lead: z.string(),
    /** Search-result description; defaults to the first sentence of the lead. */
    description: z.string().max(160).optional(),
    facts: z.array(
      z.object({ key: z.enum(["client", "organization", "stack"]), value: z.string() })
    ),
  }),
})

// Blog posts: src/content/posts/<en|es>/<slug>.mdx, with the same slug in both
// languages (/blog/<slug>/ and /es/blog/<slug>/). Same MDX components as the cases.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    /** Intro under the title, and the description for search results and the RSS feed. */
    description: z.string().max(160),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    tags: z.array(z.string()).min(1),
  }),
})

export const collections = { cases, posts }
