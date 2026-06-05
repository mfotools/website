import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Static firm website for www.myfinance-online.co.za.
//
// build.format defaults to 'directory' → emits /services/index.html rather
// than /services.html. This is the most portable layout: ANY static host
// (Apache, nginx, IIS, b12, etc.) serves index.html as a folder's default
// document, so clean URLs (/services) work with zero rewrite config.
//
// Deploy: copy the ENTIRE contents of MFO/dist/ into the host's web root.
// Nothing server-side is required — it's pure static HTML/CSS.
export default defineConfig({
  site: 'https://www.myfinance-online.co.za',
  integrations: [tailwind(), sitemap()],
});
