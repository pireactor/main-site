import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";

import astro from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  integrations: [solid(),],
  experimental: astro(),
});