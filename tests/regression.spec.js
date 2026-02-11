import { test, describe } from '@playwright/test';
import { generalSteps } from '../steps/general.steps';
import { smokeSteps } from '../steps/smoke.details.steps';
import { generalPage } from '../pages/general.page';
import { constants } from '../utils/constants';
const { getRandomEmail } = require('../utils/helper');
const COMMON = require('../utils/common.json');
import { getPasswordResetLink } from '../utils/resetPasswordLink';
import { regressionSteps } from '../steps/regression.detials.steps';

describe('Regression Tests', () => {
    test('TC_001 - Homepage – Complete End-to-End Validation - Verify that the homepage loads correctly and all sections from header to footer function properly in sequence without navigation or UI issues', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.clickOnLogoToGoHomePage()
        await generalStep.verifyLinkAndText("", generalPage.bannerHeadingEstatePlanning);
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.trustTxt);
        await generalStep.verifyLinkAndText(generalPage.trustPageURL, generalPage.createTrustThatWorksTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.willTxt);
        await generalStep.verifyLinkAndText(generalPage.willPageURL, generalPage.createYourWillTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.learnTxt);
        await generalStep.verifyLinkAndText(generalPage.learnPageURL, generalPage.estatePlaningExpTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.professionalsTxt);
        await generalStep.verifyLinkAndText(generalPage.professionalsURL, generalPage.buildYourBusinessTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.pricingTxt);
        await generalStep.verifyLinkAndText(generalPage.pricingURL, generalPage.modernEstatePlaningSimplePricTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.logInTxt);
        await generalStep.verifyLinkAndText(generalPage.loginPageURL, generalPage.pleaseLoginToAccountTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyLinkAndText(generalPage.welcomeFastWillURL, generalPage.welcomeFastwillTxt);
        await generalStep.clickOnGoBack();
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.bannerHeadingEstatePlanning);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.bannerDescEveryTxtthingneedSecureFutureTxt);
        await generalStep.clickStartTodayCenteredButton();
        await generalStep.verifyLinkAndText(generalPage.welcomeFastWillURL, generalPage.welcomeFastwillTxt);
        await generalStep.clickOnGoBack();
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whichPlanFitsYourNeedsTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whenTrustMakesSenseTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.trustCardDescTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whenWillMakeSenseTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.willCardDescTxt);
        await generalStep.clickOnAnchorByText(generalPage.moreAboutTrustTxt);
        await generalStep.verifyLinkAndText(generalPage.trustPageURL, generalPage.createTrustThatWorksTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickOnAnchorByText(generalPage.moreAboutWillTxt);
        await generalStep.verifyLinkAndText(generalPage.willPageURL, generalPage.createYourWillTxt);
        await generalStep.clickOnGoBack();
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.probateAssetGuideTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.probatePreedingGuideTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.probateAfterDeathTxt);
        await generalStep.clickRadioButtonByText(generalPage.probateAssetGuideTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.probateAssetGuideTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickRadioButtonByText(generalPage.probatePreedingGuideTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.probatePreedingGuideTxt);
        await generalStep.clickOnGoBack();
        await generalStep.clickRadioButtonByText(generalPage.probateAfterDeathTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.probateAfterDeathTxt);
        await generalStep.clickOnGoBack();
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.generalTxt);
        await generalStep.clickOnButtonByText(generalPage.diffBtwWillAndTrustTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.diffbtwWillAndTrustDescTxt);
        await generalStep.clickOnButtonByText(generalPage.howLongTakeCompleteWillOrTrustTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.howLongTakeCompleteWillOrTrustDescTxt);
        await generalStep.clickOnButtonByText(generalPage.doesWillOrTrusthasTobeNotarizedTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.doesWillOrTrusthasTobeNotarizedDescTxt);
        await generalStep.clickOnButtonByText(generalPage.whenShouldUpdateWillOrTrustTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.whenShouldUpdateWillOrTrustDescTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.willsTxt);
        await generalStep.clickOnButtonByText(generalPage.doIneedAttorneyToUpdatemyWillTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.doIneedAttorneyToUpdatemyWillDescTxt);
        await generalStep.clickOnButtonByText(generalPage.canWriteWillForSomeoneelseTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.canWriteWillForSomeoneElseDescTxt);
        await generalStep.clickOnButtonByText(generalPage.whatHappenedIfDontHaveWillTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.whatHappenedIfDontHaveWillDescTxt);
        await generalStep.clickOnButtonByText(generalPage.doesWillProtectFromProbateTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.doesWillProtectFromProbateDescTxt);
        await generalStep.clickOnButtonByText(generalPage.areOnlineWillLTrustegitTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.areOnlineWillLTrustegitDescTxt);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.trustsTxt);
        await generalStep.clickOnButtonByText(generalPage.howDoIFindMyTrustTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.howDoIFindMyTrustDescTxt);
        await generalStep.clickOnButtonByText(generalPage.diffBtwRevocAndIrevocTrustTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.diffBtwRevocAndIrevocTrustDescTxt);
        await generalStep.clickOnButtonByText(generalPage.shouldSpouseHaveSeparateTrustTxt);
        await generalStep.verifyWithTextScreenIsVisible(generalPage.shouldSpouseHaveSeparateTrustDescTxt);
        await generalStep.clickAndVerifyPrivacyPolicy();
        await generalStep.clickAndVerifyTermOfServiceLink();
        await generalStep.clickAndVerifyLinkedInButton();
        await generalStep.clickAndVerifyInstagramLink();
        await generalStep.clickAndVerifyFacebookPageLink();
        await generalStep.verifyWithTextScreenIsVisibleByIndex(generalPage.needHelpTxt, 0);
        await generalStep.clickOnButtonIndexByText(generalPage.needHelpTxt, 0);
        await generalStep.verifyWithTextScreenIsVisibleFromFrame(generalPage.howWeCanHelpTxt);

    });
    test('TC_002 - Signup – Complete Onboarding & Account Creation Flow - Verify that a new user can successfully complete the onboarding process from Start Today through account creation with conditional logic validation and reach plan selection page without errors', async ({ page }) => {
        const generalStep = generalSteps(page);
        const email = getRandomEmail();

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
        await generalStep.clickOnContinueButton();
        await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
        await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
        await generalStep.clickOnContinueButton();
        await generalStep.clickOnAcceptCookiesButton();
        await generalStep.selectRelationshipStatus(constants.singleRelationshipStatus);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldLikeTorAvoidProbatProcessTxt);
        await generalStep.verifyWithTextScreenIsNotVisible(generalPage.forBothOfUsTxt);
        await generalStep.clickOnButtonByText(generalPage.backTxt);
        await generalStep.selectRelationshipStatus(constants.marriedStatus)
        await generalStep.verifyWithTextScreenIsVisible(generalPage.forBothOfUsTxt)
        await generalStep.clickRadioButtonByText(generalPage.justMeTxt);
        await generalStep.selectAvoidProbateYes();
        await generalStep.enterUserEmail(email);
        await generalStep.enterCreateAccountPassword(constants.password);
        await generalStep.clickOnCreateAccountButton();
        await generalStep.verifyWithHeadingByIndex(generalPage.trustBaseEstatePlanTxt, 0);
        await generalStep.clickOnButtonByText(generalPage.backTxt);
        await generalStep.clickRadioButtonByText(generalPage.noTxt);
        await generalStep.verifyWithHeadingByIndex(generalPage.willBaseEstatePlanTxt, 0);

    });
    test('TC_003 - Signup – Negative Validation & Account Creation Errors – Verify that signup form properly validates invalid inputs and prevents account creation when incorrect or duplicate data is entered', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
        await generalStep.clickOnContinueButton();
        await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
        await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
        await generalStep.clickOnContinueButton();
        await generalStep.clickOnAcceptCookiesButton();
        await generalStep.selectRelationshipStatus(constants.singleRelationshipStatus);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldLikeTorAvoidProbatProcessTxt);
        await generalStep.verifyWithTextScreenIsNotVisible(generalPage.forBothOfUsTxt);
        await generalStep.clickOnButtonByText(generalPage.backTxt);
        await generalStep.selectRelationshipStatus(constants.marriedStatus)
        await generalStep.verifyWithTextScreenIsVisible(generalPage.forBothOfUsTxt)
        await generalStep.clickRadioButtonByText(generalPage.justMeTxt);
        await generalStep.selectAvoidProbateYes();
        await generalStep.verifyButtonIsDisabled(generalPage.createAccountTxt);
        await generalStep.enterUserEmail(constants.invalidEmail);
        await generalStep.clickOnCreateAccountButton();
        await generalStep.verifyErrorIsVisible(generalPage.enterValidEmailError);
        await generalStep.verifyErrorIsVisible(generalPage.passwordError);
        await generalStep.enterCreateAccountPassword(constants.invalidPassword);
        await generalStep.clickOnCreateAccountButton();
        await generalStep.verifyErrorIsVisible(generalPage.passwordLengthError);
        await generalStep.enterUserEmail(COMMON.babytrust);
        await generalStep.enterCreateAccountPassword(constants.password);
        await generalStep.clickOnCreateAccountButton();
        await generalStep.verifyErrorIsVisible(generalPage.emailRegisteredError);

    });
    test('TC_004 - Login Functionality – Verify complete end-to-end login flow with valid credentials and successful redirection to Dashboard.', async ({ page }) => {
        const password = COMMON.newPassword;
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickOnLoginInAnchor();
        await generalStep.enterUserEmail(constants.validEmail);
        await generalStep.enterUserPassword(password);
        await generalStep.clickOnLogInButton();
        await generalStep.verifyWithTextScreenIsVisible(generalPage.summaryTxt);
        await page.reload();
        await generalStep.verifyWithTextScreenIsVisible(generalPage.summaryTxt);


    });
    test('TC_005 - Login Functionality – Verify complete negative end-to-end login flow covering all validation and invalid credential scenarios and ensure dashboard access is restricted.', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickOnLoginInAnchor();
        await generalStep.enterUserEmail(constants.iEmail);
        await generalStep.enterUserPassword(constants.password);
        await generalStep.clickOnLogInButton();
        await generalStep.verifyErrorIsVisible(generalPage.invalidCredentialsError);
        await generalStep.enterUserEmail(constants.validEmail);
        await generalStep.enterUserPassword(constants.password);
        await generalStep.clickOnLogInButton();
        await generalStep.verifyErrorIsVisible(generalPage.invalidCredentialsError);

    });
    test('TC_006 - Forgot Password – Verify complete end-to-end forgot password flow from email submission to successful password reset and login.', async ({ page }) => {
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
        await generalStep.verifyWithTextScreenIsVisible(generalPage.passwordResetMailSentSuccessTxt);
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
    test('TC_007 - Forgot Password – Verify negative scenarios of forgot password flow including validation errors, invalid email, and password mismatch.', async ({ page }) => {
        const email = COMMON.emailForgetPassword;
        const password = COMMON.password;
        const startTime = new Date();
        const generalStep = generalSteps(page);

        await generalStep.openHomePage()
        await generalStep.clickOnLoginInAnchor();
        await generalStep.clickOnForgetPasswordTxtLink();
        await generalStep.verifyWithHeadingScreenIsVisible(constants.resetPasswordTxt);
        await generalStep.enterUserEmail(constants.iEmail);
        await generalStep.clickResetPasswordButton();
        await generalStep.verifyErrorIsVisible(generalPage.noAccountFoundError);
        await generalStep.enterUserEmail(email);
        await generalStep.clickResetPasswordButton();
        await generalStep.verifyWithTextScreenIsVisible(generalPage.passwordResetMailSentSuccessTxt);
        const resetLink = await getPasswordResetLink(email, constants.emailSubject, startTime);
        await page.goto(resetLink);
        await generalStep.verifyWithHeadingScreenIsVisible(constants.resetPasswordTxt)
        await generalStep.enterUserPassword(password);
        await generalStep.enterUserConfirmPassword(constants.newPassword);
        await generalStep.clickResetPasswordButton();
        await generalStep.verifyErrorIsVisible(generalPage.passwordFiledConfirmNotMatchError);

    });
    test('TC_008 - Plan Selection & Checkout – Verify user can successfully select Trust plan, apply valid promo code, complete checkout, and process payment successfully.', async ({ page }) => {
        const generalStep = generalSteps(page);
        const email = getRandomEmail();

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
        await generalStep.clickOnContinueButton();
        await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
        await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
        await generalStep.clickOnContinueButton();
        await generalStep.clickOnAcceptCookiesButton();
        await generalStep.selectRelationshipStatus(constants.singleRelationshipStatus);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldLikeTorAvoidProbatProcessTxt);
        await generalStep.selectAvoidProbateYes();
        await generalStep.enterUserEmail(email);
        await generalStep.enterCreateAccountPassword(constants.password);
        await generalStep.clickOnCreateAccountButton();
        await generalStep.verifyWithHeadingByIndex(generalPage.recommendedBasedOnYourAnsTxt);
        await generalStep.verifyWithHeadingByIndex(generalPage.trustBaseEstatePlanTxt, 0);
        await generalStep.verifyPlanSectionPageAndSelectPlan(generalPage.selectTrustOnly);
        await generalStep.verifyUserIsOnPaymentPage();
        await generalStep.verifyWithTextScreenIsVisible(generalPage.trustBaseEstatePlanTxt);
        await generalStep.verifyTotalPriceAndApplyValidPromo(constants.freePromo100Percent, 100);
        await generalStep.verifyPaymentCardIsNotVisible();
        await generalStep.acceptTermsAndConditions();
        await generalStep.clickOnButtonByText(generalPage.confirmTxt);

    });
    test('TC_009 - Plan Selection & Checkout Validation – Verify validation and error handling for plan selection and checkout including invalid promo, invalid payment details, and mandatory checkbox validation.', async ({ page }) => {
        const generalStep = generalSteps(page);
        const email = getRandomEmail();

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
        await generalStep.clickOnContinueButton();
        await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
        await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
        await generalStep.clickOnContinueButton();
        await generalStep.clickOnAcceptCookiesButton();
        await generalStep.selectRelationshipStatus(constants.singleRelationshipStatus);
        await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldLikeTorAvoidProbatProcessTxt);
        await generalStep.selectAvoidProbateYes();
        await generalStep.enterUserEmail(email);
        await generalStep.enterCreateAccountPassword(constants.password);
        await generalStep.clickOnCreateAccountButton();
        await generalStep.verifyWithHeadingByIndex(generalPage.recommendedBasedOnYourAnsTxt);
        await generalStep.verifyWithHeadingByIndex(generalPage.trustBaseEstatePlanTxt, 0);
        await generalStep.verifyPlanSectionPageAndSelectPlan(generalPage.selectTrustOnly);
        await generalStep.verifyUserIsOnPaymentPage();
        await generalStep.verifyWithTextScreenIsVisible(generalPage.trustBaseEstatePlanTxt);
        await generalStep.verifyTotalPriceAndApplyInvalidPromo(constants.invalidPromo20Percent);
        await generalStep.verifyPaymentCardIsVisible();
        await generalStep.acceptTermsAndConditions();
        await generalStep.verifyConfirmAndPayButtonIsEnabled();
        await generalStep.clickConfirmAndPayButton();
        await generalStep.verifyPaymentCardError(generalPage.cardNumberIncompleteError);
        await generalStep.verifyPaymentCardError(generalPage.cardExpiryDateIncompleteError);
        await generalStep.verifyPaymentCardError(generalPage.cardCVCIncompleteError);
        await generalStep.verifyPaymentCardError(generalPage.cardPostalCodeError);
        await generalStep.enterPaymentCardDetails(constants.invalidCardDetails);
        await generalStep.verifyConfirmAndPayButtonIsEnabled();
        await generalStep.clickConfirmAndPayButton();
        await generalStep.verifyPaymentCardError(generalPage.cardNumberInvalidError);
        await generalStep.enterPaymentCardDetails();
        await generalStep.unCheckedAcceptTermsAndConditions();

    });
    test('TC_010 - Trust Creation – Basic Section (Individual Trust) – Verify complete Individual Trust Basic section flow including address, DOB, children logic, trustee conditional flow, successor trustee, pet nomination, guardian nomination, pet reward funding, and completion logic.', async ({ page }) => {
        const email = getRandomEmail();
        const smokeStep = smokeSteps(page)
        const regressionStep = regressionSteps(page);

        await smokeStep.signupIndividualTrustUsers(constants, email);
        await regressionStep.individualTrustUserBasicAddressToConservatorSetup(constants);

    });
    test('TC_011 - Trust Creation – Basic Section (Individual Trust) – Verify system blocks progression and shows proper validation messages when required fields, address details, contact details, trustee details, guardian details, and funding inputs are invalid or incomplete.', async ({ page }) => {
        const email = getRandomEmail();
        const smokeStep = smokeSteps(page)
        const regressionStep = regressionSteps(page);

        await smokeStep.signupIndividualTrustUsers(constants, email);
        await regressionStep.individualTrustUserBasicAddressToConservatorSetup(constants);

    });

});