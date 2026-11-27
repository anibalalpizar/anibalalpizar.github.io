// The <Section title="…"> blocks of an MDX post or case study, in order,
// with the anchor each one gets (src/components/mdx/Section.astro).

/** Readable anchor from a title: "Frontend Development" → "frontend-development". */
export function sectionId(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

/** Titles and anchors of the sections in an MDX body, in reading order. */
export function sectionsOf(body: string) {
  return [...body.matchAll(/<Section\s+title="([^"]+)"/g)].map(([, title]) => ({ title, id: sectionId(title) }))
}
