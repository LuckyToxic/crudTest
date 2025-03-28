import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/crudTest/", 
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
