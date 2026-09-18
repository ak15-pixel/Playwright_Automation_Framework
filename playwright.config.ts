import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 60 * 1000,
  retries: 1,
  workers: 2,

  use: {
    headless: false,
    viewport: null,
    navigationTimeout: 60 * 1000,

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",

    launchOptions: {
      args: ["--start-maximized"],
    },
  },

  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],

  reporter: [["html", { open: "never" }]],
  
});