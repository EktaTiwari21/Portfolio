import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/*.pdf', '**/*.log', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/scratch*']
    }
  }
});
