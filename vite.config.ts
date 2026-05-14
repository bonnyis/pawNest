import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  define: { global: "window" },
  plugins: [
    react(),
    removeConsole({
      // 에러가 발생하는 파일이나 소켓 관련 파일 경로를 제외
      external: ["src/shared/lib/socket.ts", "**/node_modules/**"],
      includes: ["log"],
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.join(__dirname, "src") },
      {
        find: "@img",
        replacement: path.join(__dirname, "src/shared/assets/img"),
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://unbribably-unhilly-danyell.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
      },
      "/OrganicAnimalProtectionFacilit": {
        target: "https://openapi.gg.go.kr",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
