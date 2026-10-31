import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
      // Error pages and the /about redirect aren't real pages to index.
      filter: (page) => !/\/(404|about)\/?$/.test(new URL(page).pathname),
    }),
  ],
  // The About page was merged into the single-page home.
  redirects: {
    '/about': '/',
  },
});
