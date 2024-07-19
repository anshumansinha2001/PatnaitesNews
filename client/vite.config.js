import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/api": env.VITE_BACKEND_API_URL,
      },
    },
    plugins: [react()],
    build: {
      outDir: "dist",
    },
  };
});
