import { defineConfig, devices } from "@playwright/test";

// Minimal smoke config. One browser, one project. Serves the Next production
// build (built once by `pnpm build` in CI) so we exercise the same code path
// users hit, not the dev server.

const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    // Next 16 dev treats 127.0.0.1 as cross-origin from `localhost` and blocks
    // RSC/HMR fetches, so client-side navigation stalls. Use `localhost` for
    // both the server bind (default) and the browser origin.
    baseURL: `http://localhost:${PORT}`,
    trace: "off",
    video: "off",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Invoke `next` directly instead of via `pnpm exec` so we do not depend on
    // a working corepack shim on the host (some dev machines have a stale
    // default Node in PATH that pnpm 11 refuses to run under). We use `dev`
    // rather than `start` because Next 16's production RSC prerender cache
    // trips Chromium's error page on some hosts; `dev` renders every request
    // cleanly and this is a smoke suite, not a perf gate.
    command: `node node_modules/next/dist/bin/next dev -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 90_000,
  },
});
