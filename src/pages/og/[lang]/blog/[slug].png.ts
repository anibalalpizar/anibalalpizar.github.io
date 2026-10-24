import type { APIRoute, GetStaticPaths } from "astro"
import { ui, type Lang } from "../../../../i18n/ui"
import { renderOgImage } from "../../../../utils/ogImage"
import { getPosts, type Post } from "../../../../utils/posts"

// One social preview per post and language, e.g.
// /og/es/blog/redesigning-my-personal-site.png
export const getStaticPaths = (async () => {
  const langs: Lang[] = ["en", "es"]
  const all = await Promise.all(langs.map(async (lang) => ({ lang, posts: await getPosts(lang) })))
  return all.flatMap(({ lang, posts }) =>
    posts.map((post) => ({ params: { lang, slug: post.slugName }, props: { post, lang } }))
  )
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const { post, lang } = props as { post: Post; lang: Lang }
  const t = ui[lang]
  const png = await renderOgImage({
    kicker: `${t.navBlog} · ${post.data.date}`,
    aside: `${post.minutes} ${t.minRead}`,
    title: post.data.title,
  })
  return new Response(png, { headers: { "Content-Type": "image/png" } })
}
