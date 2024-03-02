import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "modules",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  },
});
