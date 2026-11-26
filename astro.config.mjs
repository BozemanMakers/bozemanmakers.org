import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output. The contact form is a Cloudflare Worker in worker/ (POST /api/contact),
// so no Astro adapter is needed and the build stays host-agnostic.
export default defineConfig({
  site: 'https://bozemanmakers.org',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Confirmation pages are not search results.
      filter: (page) => !/\/(thank-you|message-sent)\/$/.test(page),
    }),
  ],
});
