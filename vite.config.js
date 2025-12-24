import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  root: "src",
  server: {
    port: 3001,
    open: true,
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import'],
      },
    }
  },
  publicDir: "../public",
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name;
          const ext = name.split(".").pop().toLowerCase();
          if (name.includes('favicon') || ext === 'ico' || ext === 'webmanifest') {
            return "assets/favicon/[name][extname]";
          }
          if (/png|jpe?g|svg|gif|webp/i.test(ext)) {
            return "assets/images/[name][extname]";
          }
          if (ext === 'css') {
            return "assets/css/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": resolve(__dirname, "src"),
    },
  },
});