import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Publication date of each post and case study by its URL path, for <lastmod>
// in the sitemap. Read from the front matter: content collections aren't
// available while the config loads.
function contentDates() {
  const dates = {};
  for (const collection of ['posts', 'cases']) {
    for (const lang of ['en', 'es']) {
      const dir = `./src/content/${collection}/${lang}`;
      for (const file of readdirSync(dir).filter((name) => name.endsWith('.mdx'))) {
        const text = readFileSync(`${dir}/${file}`, 'utf8');
        const date = text.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})/m)?.[1];
        const path =
          collection === 'posts'
            ? `/blog/${file.slice(0, -4)}`
            : text.match(/^path:\s*"?([^"\r\n]+)/m)?.[1];
        if (date && path) dates[`${lang === 'es' ? '/es' : ''}${path}/`] = date;
      }
    }
  }
  return dates;
}
const lastmod = contentDates();

// https://astro.build/config
export default defineConfig({
  site: 'https://anibalalpizar.github.io',
  // GitHub Pages serves pages as folders (/projects/). Requiring the slash makes
  // the dev server reject links without it, so they can't slip back in.
  trailingSlash: 'always',
  // Astro 7 strips whitespace between inline elements by default, which can glue
  // words together ("Aníbal" + a link). Keep the previous, safe compression.
  compressHTML: true,
  // Start loading an internal page when its link is hovered or focused, so it
  // opens almost instantly on click. External links are never prefetched.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  markdown: {
    shikiConfig: {
      // Monochrome code: the colours come from CSS (see src/components/mdx/CodeBlock.astro).
      theme: 'css-variables',
      transformers: [
        {
          // ```ts title="env.ts" → the file name shown above the code.
          pre(node) {
            const title = this.options.meta?.__raw?.match(/title="([^"]+)"/)?.[1];
            if (title) node.properties.dataTitle = title;
          },
        },
      ],
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // Links each page to its other-language version (hreflang) in the sitemap.
      i18n: {
        defaultLocale: 'en',
        // Same hreflang codes as the <link rel="alternate"> tags in Layout.astro.
        locales: { en: 'en', es: 'es' },
      },
      // Error pages, the /about redirect and the CV pages (printed to PDF and
      // removed by scripts/build-cv.mjs) aren't real pages to index.
      filter: (page) => !/\/(404|about|cv)\/?$/.test(new URL(page).pathname),
      // Posts and case studies say when they were published.
      serialize(item) {
        const date = lastmod[new URL(item.url).pathname];
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  // The About page was merged into the single-page home.
  redirects: {
    '/about': '/',
  },
});
