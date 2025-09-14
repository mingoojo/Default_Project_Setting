import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker.entry"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // 필요 시 dynamic import 관련 문제 방지
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3003, // 원하는 포트로 변경 가능
  },
});