import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use environment variable to switch between deployments
  // For Vercel: Use "/" (root path)
  // For GitHub Pages: Use "/ai-girlfriend/" (subdirectory)
  base: process.env.GITHUB_PAGES === "true" ? "/ai-girlfriend/" : "/",
});
