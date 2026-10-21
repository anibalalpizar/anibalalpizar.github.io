import { defineCollection, z } from "astro:content"

// One MDX file per case and language: src/content/cases/<en|es>/<slug>.mdx.
// The body uses the components in src/components/mdx (Section, Figure, Detail…),
// passed in by CasePage, so the files don't need imports.
const cases = defineCollection({
  type: "content",
  schema: z.object({
    /** Matches an `experience` id in src/data/site.ts (sets order, role and short name). */
    exp: z.string(),
    /** URL path without the language prefix, e.g. /2024/internship-at-tech-solutions. */
    path: z.string().regex(/^\/\d{4}\/[a-z0-9-]+$/),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    titleHref: z.string().url(),
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

export const collections = { cases }
