// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  adapter: netlify(),
  site: "http://verdecillo.netlify.app/",
  output: "server",
});
