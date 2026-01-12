import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 3 * 60 * 1000,
    expect: {
        timeout: 35000 // Assertion timeout
    },
    reporter: [
        ['list'],
        ['allure-playwright']
    ],
    use: {
        baseURL: 'https://example.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    }
});
