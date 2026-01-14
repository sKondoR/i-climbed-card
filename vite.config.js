import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


export default defineConfig({
  base: '/',
  plugins: [
    react(),
    federation({
      name: 'microfrontend',
      filename: 'remoteEntry.js',
      exposes: {
        './EditImage': './src/ui/EditImage/EditImage.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'ES2022',
    outDir: 'dist',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      preserveEntrySignatures: 'exports-only',
    },
  },
  server: {
    port: 3001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // Отдаем index.html для всех маршрутов в dev режиме
    historyApiFallback: true,
  },
  preview: {
    port: 3001,
    cors: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
});