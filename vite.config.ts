import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import eslint from "vite-plugin-eslint";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    solidPlugin(),
    eslint(),
    Icons({
      compiler: "solid",
    }),
  ],
  // resolve: { alias: { "~icons": "/node_modules/@iconify" } },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
