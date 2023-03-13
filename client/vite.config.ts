import path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve("src") }],
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
