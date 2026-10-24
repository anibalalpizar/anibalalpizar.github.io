import rss from "@astrojs/rss"
import { FULL_NAME, SITE_URL } from "../data/site"
import { locales, localePath, ui, type Lang } from "../i18n/ui"
import { getPosts } from "./posts"

/** One feed per language: /rss.xml and /es/rss.xml. */
export async function blogFeed(lang: Lang) {
  const t = ui[lang]
  const posts = await getPosts(lang)
  return rss({
    title: `${t.navBlog} — ${FULL_NAME}`,
    description: t.blogDescription,
    // The feed links to the blog in its language; item links resolve against the origin.
    site: new URL(localePath(lang, "/blog"), SITE_URL).href,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      // Noon, like src/utils/dates.ts, so the day doesn't shift in other time zones.
      pubDate: new Date(`${post.data.date}T12:00:00`),
      link: localePath(lang, post.path),
      categories: post.data.tags,
    })),
    customData: `<language>${locales[lang]}</language>`,
  })
}
