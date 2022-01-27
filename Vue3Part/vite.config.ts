import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}

export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    outDir: "../NestPart/src/public",
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/common.scss" as *;`,
      },
    },
  },
});
