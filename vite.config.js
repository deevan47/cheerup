import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' because the site is served from the root of its own domain (see CNAME)
// and the pages are real paths like /gifts, not '#/gifts'. A relative base would
// break asset URLs on any page below the root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { rollupOptions: { input: 'index.html' } },
});
