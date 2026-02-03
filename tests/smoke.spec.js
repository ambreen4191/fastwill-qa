import { test, describe } from '@playwright/test';
import { smokeSteps } from '../steps/smoke.steps';
const COMMON = require('../utils/common.json');
const { getRandomEmail } = require('../utils/helper');
import { smokePage } from '../pages/smoke.page';
import { constants } from '../utils/Constants';
import { getPasswordResetLink } from '../utils/resetPasswordLink';

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
        const smokeStep = smokeSteps(page);

        await smokeStep.openHomePage();
        await smokeStep.clickStartTodayButton();
        await smokeStep.verifyStartTodayScreenElementsVisible(constants.fullName);
    });
    test('TC_003 - Login  - Verify Login Functionality from Homepage to Dashboard', async ({ page }) => {
        const email = COMMON.babytrust;
        const password = COMMON.password;
        const smokeStep = smokeSteps(page);

        await smokeStep.openHomePage();
        await smokeStep.clickOnLoginInAnchor();
        await smokeStep.enterUserEmail(email);
        await smokeStep.enterUserPassword(password);
        await smokeStep.clickOnLogInButton();

    });
    test('TC_004 - Logout - Verify Logout from Dashboard Returns User to Homepage', async ({ page }) => {
        const email = COMMON.babytrust;
        const password = COMMON.password;
        const smokeStep = smokeSteps(page);

        await smokeStep.openHomePage()
        await smokeStep.clickOnLoginInAnchor();
        await smokeStep.enterUserEmail(email);
        await smokeStep.enterUserPassword(password);
        await smokeStep.clickOnLogInButton();
        await smokeStep.clickOnProfile();
        await smokeStep.clickOnLogoutFromProfileDropdown(smokePage.logoutTxt);

    });
    test('TC_005 - Forgot - Verify complete Forgot Password end-to-end flow', async ({ page }) => {
        const email = COMMON.emailForgetPassword;
        const password = COMMON.password;
        const startTime = new Date();
        const smokeStep = smokeSteps(page);

        await smokeStep.openHomePage()
        await smokeStep.clickOnLoginInAnchor();
        await smokeStep.clickOnForgetPasswordTxtLink();
        await smokeStep.verifyWithHeadingScreenIsVisible(constants.resetPasswordTxt);
        await smokeStep.enterUserEmail(email);
        await smokeStep.clickResetPasswordButton();
        const resetLink = await getPasswordResetLink(email, constants.emailSubject, startTime);
        await page.goto(resetLink);
        await smokeStep.verifyWithHeadingScreenIsVisible(constants.resetPasswordTxt)
        await smokeStep.enterUserPassword(password);
        await smokeStep.enterUserConfirmPassword(password);
        await smokeStep.clickResetPasswordButton();
        await smokeStep.enterUserEmail(email);
        await smokeStep.enterUserPassword(password);
        await smokeStep.clickOnLogInButton();

    });
    test('TC_06 - Single Will Complete Flow – Verify complete flow for single will account', async ({ page }) => {
        const email = getRandomEmail();
        const smokeStep = smokeSteps(page);

        await smokeStep.signupIndividualWillUsers(constants, email);
        await smokeStep.individualWillUserBasicAddressToConservatorSetup(constants);
        await smokeStep.individualWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await smokeStep.clickOnButtonByText(smokePage.gotoDashboard);
        await smokeStep.dashboarOverViewdFlow(constants);
        await smokeStep.clickSidBarAnchor(smokePage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.documentsFlow(constants)
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.individualNotarizationFlow();
        await smokeStep.verifyDeedTransferTxtIsNotVisible();

    });
    test('TC_07 - Single Trust Complete Flow – Verify complete flow for single trust account', async ({ page }) => {
        const email = getRandomEmail();
        const smokeStep = smokeSteps(page);

        await smokeStep.signupIndividualTrustUsers(constants, email);
        await smokeStep.individualTrustUserBasicAddressToConservatorSetup(constants);
        await smokeStep.individualTrustUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await smokeStep.clickOnButtonByText(smokePage.gotoDashboard);
        await smokeStep.dashboarOverViewdFlow(constants, 1);
        await smokeStep.clickSidBarAnchor(smokePage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.documentsTrustFlow(constants)
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.individualNotarizationFlow();
        await smokeStep.trustDeedTransferFlow(constants);

    });
    test('TC_08 - Couple Will Complete Flow – Verify complete flow for couple will account', async ({ page }) => {
        const email = getRandomEmail();
        const smokeStep = smokeSteps(page);

        await smokeStep.signupCoupleWillUsers(constants, email, constants.marriedStatus);
        await smokeStep.coupleWillUserBasicAddressToConservatorSetup(constants)
        await smokeStep.coupleWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await smokeStep.clickOnContinueButton();
        await smokeStep.verifyWithHeadingScreenIsVisible(constants.headingFirstNameTxt);
        await smokeStep.clickOnContinueButton();
        await smokeStep.coupleWillSpouseBasicAddressToConservatorSetup(constants)
        await smokeStep.individualWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await smokeStep.clickOnButtonByText(smokePage.backToOverview);
        await smokeStep.dashboarOverViewdFlow(constants);
        await smokeStep.clickSidBarAnchor(smokePage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.couplesDocumentsFlow(constants)
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.coupleNotarizationFlow();
        await smokeStep.verifyDeedTransferTxtIsNotVisible();

    });
    test('TC_09 - Couple Trust Complete Flow – Verify complete flow for couple trust account', async ({ page }) => {
        const email = getRandomEmail();
        const smokeStep = smokeSteps(page);

        await smokeStep.signupCoupleTrustUsers(constants, email, constants.marriedStatus)
        await smokeStep.coupleTrustUserBasicAddressToConservatorSetup(constants)
        await smokeStep.coupleWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await smokeStep.clickOnContinueButton();
        await smokeStep.verifyWithHeadingScreenIsVisible(constants.headingFirstNameTxt);
        await smokeStep.clickOnContinueButton();
        await smokeStep.coupleTrustSpouseUserBasicAddressToConservatorSetup(constants)
        await smokeStep.individualWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await smokeStep.clickOnButtonByText(smokePage.backToOverview);
        await smokeStep.dashboarOverViewdFlow(constants, 1);
        await smokeStep.clickSidBarAnchor(smokePage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.couplesDocumentsTrustFlow(constants);
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.coupleNotarizationFlow();
        await smokeStep.trustDeedTransferFlow(constants);

    });
   
});