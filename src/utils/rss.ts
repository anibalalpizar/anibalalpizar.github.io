import rss from "@astrojs/rss"
import { getContainerRenderer } from "@astrojs/mdx/container-renderer"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { loadRenderers } from "astro:container"
import { render } from "astro:content"
import { mdxComponents } from "../components/mdx"
import { FULL_NAME, SITE_URL } from "../data/site"
import { locales, localePath, ui, type Lang } from "../i18n/ui"
import { getPosts } from "./posts"

/**
 * A post's HTML as the page shows it, cleaned up for feed readers: no scripts,
 * buttons, decorations, classes or styles, and every link and image absolute.
 */
function forFeed(html: string, url: string) {
  let figure = 0
  const absolute = (path: string) => new URL(path, url).href
  return (
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style|button)\b[\s\S]*?<\/\1>/g, "")
      // The frame's "+" marks, corners and bullets.
      .replace(/<span[^>]*aria-hidden="true"[^>]*><\/span>/g, "")
      // "Fig. 01": the number comes from a CSS counter on the page.
      .replace(/<span class="count"[^>]*><\/span>/g, () => String(++figure).padStart(2, "0"))
      // "Full size" is for phones on the page; the image itself links there too.
      .replace(/<a [^>]*class="full"[^>]*>[\s\S]*?<\/a>/g, "")
      .replace(/\s(?:class|style|tabindex|aria-[\w-]+|data-[\w-]+)(?:="[^"]*")?/g, "")
      .replace(/\s(href|src)="([^"]+)"/g, (_, name, value) => ` ${name}="${absolute(value)}"`)
      .replace(/\ssrcset="([^"]+)"/g, (_, value: string) =>
        ` srcset="${value.replace(/(^|,\s*)(\S+)/g, (__, sep, path) => sep + absolute(path))}"`
      )
  )
}

/** One feed per language: /rss.xml and /es/rss.xml. */
export async function blogFeed(lang: Lang) {
  const t = ui[lang]
  const posts = await getPosts(lang)
  const title = `${t.navBlog} — ${FULL_NAME}`
  const blogUrl = new URL(localePath(lang, "/blog"), SITE_URL).href
  // Renders each post's MDX to HTML, so feed readers can show the whole article.
  const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) })
  const contents = await Promise.all(
    posts.map(async (post) => {
      const url = new URL(localePath(lang, post.path), SITE_URL).href
      const { Content } = await render(post)
      // The request's URL gives the components the page's language.
      const html = await container.renderToString(Content, {
        props: { components: mdxComponents },
        request: new Request(url),
      })
      return forFeed(html, url)
    })
  )
  return rss({
    title,
    description: t.blogDescription,
    // The feed links to the blog in its language; item links resolve against the origin.
    site: blogUrl,
    trailingSlash: true,
    items: posts.map((post, i) => ({
      title: post.data.title,
      description: post.data.description,
      content: contents[i],
      // Noon, like src/utils/dates.ts, so the day doesn't shift in other time zones.
      pubDate: new Date(`${post.data.date}T12:00:00`),
      link: localePath(lang, post.path),
      categories: post.data.tags,
    })),
    // The feed's own address (atom:link rel="self"), which feed validators expect.
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      `<language>${locales[lang]}</language>`,
      `<atom:link href="${new URL(lang === "es" ? "/es/rss.xml" : "/rss.xml", SITE_URL).href}" rel="self" type="application/rss+xml"/>`,
      // The picture feed readers show next to the blog's name.
      `<image><url>${new URL("/logo.jpg", SITE_URL).href}</url><title>${title}</title><link>${blogUrl}</link></image>`,
    ].join(""),
  })
}
