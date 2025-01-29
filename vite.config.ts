import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['@fontsource/assistant']
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false
      }
    }
  },
  server: {
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  plugins: [

    react(),
    svgr(),
  ],
})