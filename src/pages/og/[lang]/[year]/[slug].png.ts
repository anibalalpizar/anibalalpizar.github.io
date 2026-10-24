import type { APIRoute, GetStaticPaths } from "astro"
import { getCollection, type CollectionEntry } from "astro:content"
import { ui, type Lang } from "../../../../i18n/ui"
import { renderOgImage } from "../../../../utils/ogImage"

// One social preview per case study and language, e.g.
// /og/es/2024/internship-at-tech-solutions.png
export const getStaticPaths = (async () => {
  const entries = await getCollection("cases")
  return entries.map((entry) => {
    const lang = entry.id.split("/")[0] as Lang
    const [, year, slug] = entry.data.path.split("/")
    return { params: { lang, year, slug }, props: { entry, lang } }
  })
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const { entry, lang } = props as { entry: CollectionEntry<"cases">; lang: Lang }
  const { title, date } = entry.data
  const png = await renderOgImage({
    kicker: `${ui[lang].caseStudy} · ${date.slice(0, 4)}`,
    title: `${title.before}${title.link}${title.after}`,
  })
  return new Response(png, { headers: { "Content-Type": "image/png" } })
}
