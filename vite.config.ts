import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
  // Hardcode base for GitHub Pages repo: stratosedge.github.io/website/
  // Dev server ignores this; it only affects build output.
  base: '/website/',
  // No unused API key defines
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
