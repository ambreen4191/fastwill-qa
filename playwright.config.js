require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  // Multi-step wizard flows (home → plan → about-you → family → plan summary)
  // can eat the default 30s on slow staging responses before per-assertion
  // timeouts even engage. Give the whole test 60s of headroom.
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  reporter: [['html', { open: 'never' }], ['allure-playwright', { resultsDir: 'allure-results', detail: true, suiteTitle: false }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.fastwill.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
  outputDir: 'test-results/',
});
