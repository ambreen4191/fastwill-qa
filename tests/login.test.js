import { test, expect } from '@playwright/test';
import { loginSteps } from '../steps/login.steps';

test('User logs in successfully', async ({ page }) => {
    const steps = loginSteps(page);

    await steps.openLoginPage();
    await steps.loginWithCredentials(
        'test@example.com',
        'Password123'
    );

    await expect(page).toHaveURL(/dashboard/);
});
