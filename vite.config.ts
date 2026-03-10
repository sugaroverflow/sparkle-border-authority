import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// ES Module equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 450,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "router-vendor";
            if (id.includes("react") || id.includes("scheduler")) return "react-vendor";
            if (id.includes("recharts")) return "charts-vendor";
            if (id.includes("html2canvas")) return "print-vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Use Bun's module resolution order for compatibility
    extensions: [".tsx", ".jsx", ".ts", ".mjs", ".js", ".cjs", ".json"],
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
