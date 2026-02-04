import { test, describe } from '@playwright/test';
import { generalSteps } from '../steps/general.steps';
import { generalPage } from '../pages/general.page';

describe('Regression Tests', () => {
    test('TC_001 - Header Logo Navigation - Verify that clicking the FastWill logo redirects the user to the homepage', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.clickOnAnchorByText(generalPage.fastWillTxt)
        await generalStep.verifyLinkAndText("", generalPage.bannerHeadingEstatePlanning);
    });  
    test('TC_002 - Trust Page Link - Verify that the Trust link in the header redirects to the Trust page', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.trustTxt);
        await generalStep.verifyLinkAndText(generalPage.trustPageURL, generalPage.createTrustThatWorksTxt);
    }); 
    test('TC_003 - Will Link - Verify Will link navigation', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.willTxt);
        await generalStep.verifyLinkAndText(generalPage.willPageURL, generalPage.createYourWillTxt);
    }); 
    test('TC_004 - Learn Link - Verify Learn link navigation', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.learnTxt);
        await generalStep.verifyLinkAndText(generalPage.learnPageURL, generalPage.estatePlaningExpTxt);
    }); 
    test('TC_005 - Professionals Link - Verify Professionals link navigation', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.professionalsTxt);
        await generalStep.verifyLinkAndText(generalPage.professionalsURL, generalPage.buildYourBusinessTxt);
    });
    test('TC_006 - Pricing Link - Verify Pricing link navigation', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.pricingTxt);
        await generalStep.verifyLinkAndText(generalPage.pricingURL, generalPage.modernEstatePlaningSimplePricTxt);
    });
    test('TC_007 - Login Button - Verify Login button redirects to login page', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickBySectionAndAnchor(generalPage.homeHeader, generalPage.logInTxt);
        await generalStep.verifyLinkAndText(generalPage.loginPageURL, generalPage.pleaseLoginToAccountTxt);
    });
    test('TC_008 - Start Today Button (Header) - Verify Start Today button redirects to signup/onboarding', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickStartTodayButton();
        await generalStep.verifyLinkAndText(generalPage.welcomeFastWillURL, generalPage.welcomeFastwillTxt);
    });
    test('TC_009 - Start Today Button (Hero Section) - Verify Start Today CTA in hero section', async ({ page }) => {
        const generalStep = generalSteps(page);

        await generalStep.openHomePage();
        await generalStep.clickStartTodayCenteredButton();
        await generalStep.verifyLinkAndText(generalPage.welcomeFastWillURL, generalPage.welcomeFastwillTxt);
    });
   
   
});