import { allure } from 'allure-playwright';
import { loginPage } from '../pages/login.page';

export const loginSteps = (page) => {
    const lp = loginPage(page);

    return {
        async openLoginPage() {
            await allure.step('Open login page', async () => {
                await lp.open();
            });
        },

        async loginWithCredentials(email, password) {
            await allure.step('Login with valid credentials', async () => {
                await lp.enterEmail(email);
                await lp.enterPassword(password);
                await lp.submit();
            });
        }
    };
};
