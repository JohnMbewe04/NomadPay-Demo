import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": 
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:; " +
        "connect-src *; " +
        "img-src * blob: data:; " +
        "style-src 'self' 'unsafe-inline' blob: data:; " +
        "font-src * data:;"
    },
    proxy: {
      '/subgraphs': {
        target: 'https://api.thegraph.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/subgraphs/, '/subgraphs'),
      },
    },
  }
});
