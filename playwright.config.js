import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
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
