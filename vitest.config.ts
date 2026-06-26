// Standalone Vitest config. Intentionally does NOT extend the Lovable
// vite.config.ts: that config injects the TanStack Start / Nitro plugins which
// transform route files and expect a full SSR build pipeline — neither of which
// belongs in a unit-test run. We wire up just React + path aliases here.
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Focus coverage on code with real behavior. The shadcn/Radix UI wrappers
      // and static route layouts are excluded — they carry no logic worth gating.
      include: ["src/lib/**", "src/hooks/**", "src/server.ts", "src/start.ts"],
    },
  },
});
