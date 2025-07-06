/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Separate config for Storybook tests
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    storybookTest({
      configDir: path.join(__dirname, ".storybook"),
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      provider: "playwright",
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
    setupFiles: [".storybook/vitest.setup.ts"],
    include: [
      "src/**/*.stories.{js,jsx,ts,tsx}",
      "src/**/*.story.{js,jsx,ts,tsx}",
    ],
  },
});
