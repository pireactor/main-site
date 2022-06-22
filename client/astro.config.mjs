import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";
import astro from "astro-robots-txt";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  integrations: [solid(),],
  experimental: astro(),
});