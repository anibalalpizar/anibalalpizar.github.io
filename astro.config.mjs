import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://anibalalpizar.github.io',
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
