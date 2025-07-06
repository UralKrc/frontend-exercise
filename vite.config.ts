/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: true,
    // Include test files
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    // Exclude storybook files from regular tests
    exclude: [
      "node_modules",
      "dist",
      ".storybook",
      "**/*.stories.{js,jsx,ts,tsx}",
      "**/*.story.{js,jsx,ts,tsx}",
    ],
    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.stories.{js,jsx,ts,tsx}",
        "**/*.story.{js,jsx,ts,tsx}",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "vite.config.ts",
      ],
    },
  },
});
