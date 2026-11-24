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
      // The form-success page is not a search result.
      filter: (page) => !page.endsWith('/thank-you/'),
    }),
  ],
});
