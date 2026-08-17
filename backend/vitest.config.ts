import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    extensions: [".ts", ".js", ".mjs", ".json"],
  },
});
