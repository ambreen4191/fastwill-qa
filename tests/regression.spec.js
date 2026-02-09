import { test, describe } from '@playwright/test';
import { generalSteps } from '../steps/general.steps';
import { generalPage } from '../pages/general.page';
import { constants } from '../utils/constants';
const { getRandomEmail } = require('../utils/helper');

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
        await generalStep.verifyWithTextScreenIsVisibleByIndex(generalPage.trustBaseEstatePlanTxt, 1);

    });

});