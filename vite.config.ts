import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // tsconfig.json의 paths 설정과 동일하게 맞춰줍니다.
      // 이게 없으면 "@/..." import를 Vite가 실행 시점에 찾지 못합니다.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 프론트에서는 /api로만 호출하고, 개발 서버가 실제 Spring Boot(8080)로 중계합니다.
      // 이렇게 하면 백엔드에 별도 CORS 설정을 추가하지 않아도 됩니다.
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET || "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});