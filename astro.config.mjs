import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: 'https://psychoStark.github.io',
  base: isGitHubPages ? '/remote-pc-guide' : '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
