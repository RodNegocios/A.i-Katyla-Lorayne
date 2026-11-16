import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  // Production assets must resolve from the domain root on Hostinger.
  base: process.env.VITE_BASE_PATH || '/',
  // Keep the development entry separate from the compiled root index.html.
  // Hostinger's HTML/Git integration copies files but does not run Vite.
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL('./index.dev.html', import.meta.url))
    }
  }
});
