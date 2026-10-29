# anibalalpizar.github.io

Personal website: experience, projects, case studies and a blog, in English and Spanish.

**Live:** https://anibalalpizar.github.io · **Spanish:** https://anibalalpizar.github.io/es/

Built with [Astro](https://astro.build) and MDX.

## Run it locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks and then builds to dist/
```

## Where things live

| What | File |
| --- | --- |
| Experience, projects, stack, links | `src/data/site.ts` |
| Email, GitHub, LinkedIn, location | `src/data/cv.json` |
| Interface text in both languages (nav, buttons, labels) | `src/i18n/ui.ts` |
| Case studies | `src/content/cases/<en\|es>/<slug>.mdx` |
| Case study images | `src/assets/cases/<year>/<slug>/` |
| Blog posts | `src/content/posts/<en\|es>/<slug>.mdx` |
| Blog post images | `src/assets/posts/<slug>/` |
| CV | `public/Aníbal_CV.pdf` |

Values that change with the language are written as `{ en: "…", es: "…" }`; plain strings are shared by both.

## Writing a case study

Each case is two MDX files with the same name, one in `en/` and one in `es/`. The page URL comes from `path` in the frontmatter, and the Experience row it belongs to from `exp` (an id in `site.ts`). The frontmatter is validated in `src/content/config.ts`, so a typo stops the build instead of publishing a broken page.

```mdx
---
exp: tech-solutions
path: /2024/internship-at-tech-solutions
date: "2024-08-19"
titleHref: https://www.techkeppercr.com/
title:
  before: "Development of a Custom Web Application for a Restaurant for "
  link: "techkeppercr"
  after: ""
lead: "One paragraph that introduces the project."
facts:
  - key: client
    value: "techkeppercr"
---

<Section title="Frontend Development">

Plain Markdown paragraphs go here.

</Section>

<Figure src="cases/2024/internship-at-tech-solutions/nextjs.jpg" caption="How the pieces of Next.js fit together" />
```

These components are available in every MDX file without importing them:

| Component | Use |
| --- | --- |
| `<Section title="…">` | A numbered section (01, 02…). Numbers are added automatically. |
| `<Figure src="…" caption="…" />` | An image on the grid plate, numbered "Fig. 01". `src` is a path inside `src/assets`. Optional: `tone="light"` / `"dark"` for monochrome diagrams that should invert with the theme, `mode="bleed"` for full-width photos, `source="https://…"` for credits. |
| `<Detail letter="A" title="…" figure={{ … }}>` | The boxed "Detail A" callout, with an optional figure. |
| `<Terms>` + `<Term name="…">…</Term>` | A "term: description" list. |
| `<Video youtubeId="…" caption="…" />` | A YouTube video that only loads when clicked. |
| `<Quote cite="…">…</Quote>` | A quote with an author. A plain Markdown quote (`> …`) looks the same, without the author. |

Images are resized and converted to WebP at build time, and their width and height are read from the file.

## Writing a blog post

A post is also two MDX files with the same name, one in `en/` and one in `es/`. The file name is the URL: `src/content/posts/en/my-post.mdx` becomes `/blog/my-post/`, and the Spanish one `/es/blog/my-post/`.

```mdx
---
title: "Redesigning my personal site"
description: "One or two sentences, up to 160 characters. Shown under the title, in search results and in the RSS feed."
date: "2026-10-24"
tags: ["Astro", "MDX"]
---

<Section title="Why redesign it">

Plain Markdown paragraphs go here.

</Section>
```

The reading time is calculated from the text. Posts are listed newest first, and the list, the ⌘K menu, the RSS feeds and the link preview image update on their own.

Inside a `<Section>`, besides paragraphs and the components above, posts can use plain Markdown:

| Markdown | Result |
| --- | --- |
| `` `code` `` | Inline code. |
| ```` ```ts title="env.ts" ```` | A code block with the file name and a Copy button. Without `title`, the bar shows the language. |
| `### Title` | A subheading inside the section. |
| `- item` / `1. item` | A list with "+" marks / a numbered list ("01."). |
| `> text` | A quote. |

## Deploy

Every push to `master` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). The sitemap, the RSS feeds (`/rss.xml` and `/es/rss.xml`), the link preview images and the `/about` redirect are generated during the build.

## License

[MIT](LICENSE)
