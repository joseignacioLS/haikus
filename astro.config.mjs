// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: "https://joseignaciols.github.io/haikus.github.io",
  base: "/haikus.github.io/",
  output: "server",
  adapter: vercelAdapter()
});