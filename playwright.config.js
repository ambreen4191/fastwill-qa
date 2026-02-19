import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 60 * 60 * 1000,
    expect: {
        timeout: 35000
    },
    reporter: [
        ['list'],
        ['allure-playwright']
    ],
    use: {
        baseURL: "https://staging.fastwill.com/",
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        viewport: { width: 1280, height: 720 },
        launchOptions: {
            slowMo: 320,
        }
    }
});
