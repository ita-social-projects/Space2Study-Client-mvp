import react from "@vitejs/plugin-react"
import path from "path"
import svgrPlugin from "vite-plugin-svgr"
import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src/"),
      "~tests": path.resolve(__dirname, "tests/")
    }
  },
  test: {
    environment: "jsdom",
    watch: false,
    setupFiles: "./tests/setup-tests.js",
    globals: true,
    exclude: [...configDefaults.exclude, "packages/template/*"],
    coverage: {
      all: true,
      reporter: ["lcov", "text"],
      include: ["src/**/*.jsx", "src/**/*.tsx"],
      exclude: ["./tests/setup-tests.js"],
      reportsDirectory: "./tests/coverage"
    },
    reporters: ["vitest-sonar-reporter", "default"],
    outputFile: "test-report.xml"
  }
})
