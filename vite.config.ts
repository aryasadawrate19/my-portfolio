import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In local development, proxy frontend /api calls to Vercel dev.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  // Allow Vite to pre-bundle common dependencies (including lucide-react)
  // so dev server start and HMR are faster.
});
