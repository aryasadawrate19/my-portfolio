import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Allow Vite to pre-bundle common dependencies (including lucide-react)
  // so dev server start and HMR are faster.
});
