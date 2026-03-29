// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Output dir — GitHub Actions uploads this folder
  outDir: './dist',
  // GitHub Pages serves from root of the repo's pages site
  site: 'https://angusryer.github.io',
  base: '/ryerguitars',
});
