import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://anibalalpizar.github.io',
  integrations: [mdx()],
  // The About page was merged into the single-page home.
  redirects: {
    '/about': '/',
  },
});
