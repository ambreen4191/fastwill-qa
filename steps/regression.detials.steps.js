import { allure, expect } from 'allure-playwright';
const COMMON = require('../utils/common.json');


export const regressionSteps = (page) => {
    return {
        async openHomePage() {
            await allure.step('Open home page', async () => {
                await page.goto(COMMON.baseURL);
            });
        },
    }

}