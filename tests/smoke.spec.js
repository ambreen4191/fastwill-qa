import { test, describe } from '@playwright/test';
import { generalSteps } from '../steps/general.steps';
import { smokeSteps } from '../steps/smoke.details.steps';
const COMMON = require('../utils/common.json');
const { getRandomEmail } = require('../utils/helper');
import { generalPage } from '../pages/general.page';
import { constants } from '../utils/constants';
import { getPasswordResetLink } from '../utils/resetPasswordLink';

describe('Smoke Tests', () => {
    test('TC_001 - Homepage - Verify Homepage Load and Navigation Elements', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.verifyNavigationLinks();
        await generalStep.verifyButtonsOnRightHand();
        await generalStep.verifyBannerText();
        await generalStep.verifyFooterNavigationLinks();
    });
    test('TC_002 - Homepage - Verify “Start Today” Button Navigation to First Question Screen', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
    });
    test('TC_003 - Login  - Verify Login Functionality from Homepage to Dashboard', async ({ page }) => {
        const email = COMMON.babytrust;
        const password = COMMON.password;
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickOnLoginInAnchor();
        await generalStep.enterUserEmail(email);
        await generalStep.enterUserPassword(password);
        await generalStep.clickOnLogInButton();

    });
    test('TC_004 - Logout - Verify Logout from Dashboard Returns User to Homepage', async ({ page }) => {
        const email = COMMON.babytrust;
        const password = COMMON.password;
        const generalStep = generalSteps(page);

        await generalStep.openHomePage()
        await generalStep.clickOnLoginInAnchor();
        await generalStep.enterUserEmail(email);
        await generalStep.enterUserPassword(password);
        await generalStep.clickOnLogInButton();
        await generalStep.clickOnProfile();
        await generalStep.clickOnLogoutFromProfileDropdown(generalPage.logoutTxt);

    });
    test('TC_005 - Forgot - Verify complete Forgot Password end-to-end flow', async ({ page }) => {
        const email = COMMON.emailForgetPassword;
        const password = COMMON.password;
        const startTime = new Date();
        const generalStep = generalSteps(page);

        await generalStep.openHomePage()
        await generalStep.clickOnLoginInAnchor();
        await generalStep.clickOnForgetPasswordTxtLink();
        await generalStep.verifyWithHeadingScreenIsVisible(constants.resetPasswordTxt);
        await generalStep.enterUserEmail(email);
        await generalStep.clickResetPasswordButton();
        const resetLink = await getPasswordResetLink(email, constants.emailSubject, startTime);
        await page.goto(resetLink);
        await generalStep.verifyWithHeadingScreenIsVisible(constants.resetPasswordTxt)
        await generalStep.enterUserPassword(password);
        await generalStep.enterUserConfirmPassword(password);
        await generalStep.clickResetPasswordButton();
        await generalStep.enterUserEmail(email);
        await generalStep.enterUserPassword(password);
        await generalStep.clickOnLogInButton();

    });
    test.only('TC_06 - Single Will Complete Flow – Verify complete flow for single will account', async ({ page }) => {
        const email = getRandomEmail();
        const generalStep = generalSteps(page);
        const smokeStep = smokeSteps(page)

        await smokeStep.signupIndividualWillUsers(constants, email);
        await smokeStep.individualWillUserBasicAddressToConservatorSetup(constants);
        await smokeStep.individualWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await generalStep.clickOnButtonByText(generalPage.gotoDashboard);
        await smokeStep.dashboarOverViewdFlow(constants);
        await generalStep.clickSidBarAnchor(generalPage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.documentsFlow(constants)
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.individualNotarizationFlow();
        await generalStep.verifyDeedTransferTxtIsNotVisible();

    });
    test('TC_07 - Single Trust Complete Flow – Verify complete flow for single trust account', async ({ page }) => {
        const email = getRandomEmail();
        const generalStep = generalSteps(page);
        const smokeStep = smokeSteps(page)

        await smokeStep.signupIndividualTrustUsers(constants, email);
        await smokeStep.individualTrustUserBasicAddressToConservatorSetup(constants);
        await smokeStep.individualTrustUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await generalStep.clickOnButtonByText(generalPage.gotoDashboard);
        await smokeStep.dashboarOverViewdFlow(constants, 1);
        await generalStep.clickSidBarAnchor(generalPage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.documentsTrustFlow(constants)
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.individualNotarizationFlow();
        await smokeStep.trustDeedTransferFlow(constants);

    });
    test('TC_08 - Couple Will Complete Flow – Verify complete flow for couple will account', async ({ page }) => {
        const email = getRandomEmail();
        const generalStep = generalSteps(page);
        const smokeStep = smokeSteps(page)

        await smokeStep.signupCoupleWillUsers(constants, email, constants.marriedStatus);
        await smokeStep.coupleWillUserBasicAddressToConservatorSetup(constants)
        await smokeStep.coupleWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await generalStep.clickOnContinueButton();
        await generalStep.verifyWithHeadingScreenIsVisible(constants.headingFirstNameTxt);
        await generalStep.clickOnContinueButton();
        await smokeStep.coupleWillSpouseBasicAddressToConservatorSetup(constants)
        await smokeStep.individualWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await generalStep.clickOnButtonByText(generalPage.backToOverview);
        await smokeStep.dashboarOverViewdFlow(constants);
        await generalStep.clickSidBarAnchor(generalPage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.couplesDocumentsFlow(constants)
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.coupleNotarizationFlow();
        await generalStep.verifyDeedTransferTxtIsNotVisible();

    });
    test('TC_09 - Couple Trust Complete Flow – Verify complete flow for couple trust account', async ({ page }) => {
        const email = getRandomEmail();
        const generalStep = generalSteps(page);
        const smokeStep = smokeSteps(page)

        await smokeStep.signupCoupleTrustUsers(constants, email, constants.marriedStatus)
        await smokeStep.coupleTrustUserBasicAddressToConservatorSetup(constants)
        await smokeStep.coupleWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await generalStep.clickOnContinueButton();
        await generalStep.verifyWithHeadingScreenIsVisible(constants.headingFirstNameTxt);
        await generalStep.clickOnContinueButton();
        await smokeStep.coupleTrustSpouseUserBasicAddressToConservatorSetup(constants)
        await smokeStep.individualWillUserAssetSetup(constants);
        await smokeStep.individualWillUserArrangmentSetup(constants);
        await smokeStep.individualWillUserHealthCareSetup(constants);
        await smokeStep.individualWillUserFinanceCareSectionSetup(constants);
        await generalStep.clickOnButtonByText(generalPage.backToOverview);
        await smokeStep.dashboarOverViewdFlow(constants, 1);
        await generalStep.clickSidBarAnchor(generalPage.dashboard);
        await smokeStep.dashboardProfileFlow(constants);
        await smokeStep.couplesDocumentsTrustFlow(constants);
        await smokeStep.legacyContactsFlow(constants);
        await smokeStep.coupleNotarizationFlow();
        await smokeStep.trustDeedTransferFlow(constants);

    });
   
});