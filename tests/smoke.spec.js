import { test, expect, describe } from '@playwright/test';
import { smokeSteps } from '../steps/smoke.steps';
import COMMON from '../utils/common.json'
import { getRandomEmail } from '../utils/randaom.email';

describe('Smoke Tests', () => {
    test('TC_001 - Homepage - Verify Homepage Load and Navigation Elements', async ({ page }) => {
        const smokeStep = smokeSteps(page);

        await smokeStep.openHomePage();
        await smokeStep.verifyNavigationLinks();
        await smokeStep.verifyButtonsOnRightHand();
        await smokeStep.verifyBannerText();
        await smokeStep.verifyFooterNavigationLinks();
    });
    test('TC_002 - Homepage - Verify “Start Today” Button Navigation to First Question Screen', async ({ page }) => {
        const fullName = 'Ambreen Test'
        const smokeStep = smokeSteps(page);
        await smokeStep.openHomePage()
        await smokeStep.clickStartTodayButton();
        await smokeStep.verifyStartTodayScreenElementsVisible(fullName);
    });

    test('TC_003 - Login  - Verify Login Functionality from Homepage to Dashboard', async ({ page }) => {
        const email = COMMON.email501;
        const password = COMMON.password;

        const smokeStep = smokeSteps(page);
        await smokeStep.openHomePage()
        await smokeStep.clickOnLog_inTextLink();
        await smokeStep.enterUserEmail(email);
        await smokeStep.enterUserPassword(password);
        await smokeStep.clickOnLog_inButton();

    })
    test('TC_004 - Logout  - Verify Logout from Dashboard Returns User to Homepage', async ({ page }) => {
        const email = COMMON.email501;
        const password = COMMON.password;
        const smokeStep = smokeSteps(page);
        await smokeStep.openHomePage()
        await smokeStep.clickOnLog_inTextLink();
        await smokeStep.enterUserEmail(email);
        await smokeStep.enterUserPassword(password);
        await smokeStep.clickOnLog_inButton();
        await smokeStep.clickOnProfile();
        await smokeStep.clickOnLogoutFromProfileDropdown();

    })
    test('TC_005 - Signup / Will Creation  - Verify complete user sign-up process from Start Today to successful payment', async ({ page }) => {
        const email = getRandomEmail();
        const password = COMMON.password;
        const fullName = 'Ambreen Test'
        const enterState = 'Alab';
        const selectStateFromDropdown = 'Alabama';

        const smokeStep = smokeSteps(page);
        await smokeStep.openHomePage()
        await smokeStep.clickStartTodayButton();
        await smokeStep.verifyStartTodayScreenElementsVisible(fullName)
        await smokeStep.clickOnContinueButton();
        await smokeStep.selectItemFromDropDown(enterState, selectStateFromDropdown)

    })

})
