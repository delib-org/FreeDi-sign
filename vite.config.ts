import { VitePWA } from 'vite-plugin-pwa';
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
     VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,
    

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'FreeDi-sign',
      short_name: 'FreeDi-sign',
      description: 'Deliberative document signing system',
      theme_color: '#5899E0',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})