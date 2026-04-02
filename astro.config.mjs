// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Output dir — GitHub Actions uploads this folder
  outDir: './dist',
  site: 'https://www.ryerguitars.com',
});
