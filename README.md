# anibalalpizar.github.io

My personal website: experience, projects and case studies, in English and Spanish.

**Live:** https://anibalalpizar.github.io · **Spanish:** https://anibalalpizar.github.io/es/

Built with [Astro](https://astro.build) and MDX. Black and white, Geist Mono everywhere, dark theme by default, and a ⌘K command menu.

## Run it locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to dist/
```

## Where things live

| What | File |
| --- | --- |
| Experience, projects, stack, links | `src/data/site.ts` |
| Email, GitHub, LinkedIn, location | `src/data/cv.json` |
| Interface text in both languages (nav, buttons, labels) | `src/i18n/ui.ts` |
| Case studies | `src/content/cases/<en\|es>/<slug>.mdx` |
| Case study images | `src/assets/cases/<year>/<slug>/` |
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

Images are resized and converted to WebP at build time, and their width and height are read from the file.

## Deploy

Every push to `master` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). The sitemap and the `/about` redirect are generated during the build.

## License

[MIT](LICENSE)
