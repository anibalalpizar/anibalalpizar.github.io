import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // The About page was merged into the single-page home.
  redirects: {
    '/about': '/',
  },
});
