import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  server: {
    port: 8080,
  },
});
