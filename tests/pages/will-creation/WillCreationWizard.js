const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');
const { AboutYouStep } = require('./steps/AboutYouStep');
const { FamilyStep } = require('./steps/FamilyStep');
const { PlanSummaryStep } = require('./steps/PlanSummaryStep');
const { PlanSelectionStep } = require('./steps/PlanSelectionStep');

class WillCreationWizard extends BasePage {
  constructor(page) {
    super(page);
    this.planSelection = new PlanSelectionStep(page);
    this.aboutYou = new AboutYouStep(page);
    this.family = new FamilyStep(page);
    this.planSummary = new PlanSummaryStep(page);
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept Cookies' });

    // Refer A Friend widget — visible alongside the wizard on every step.
    this.referAFriend = {
      heading: page.getByRole('heading', { name: 'Refer A Friend' }),
      nameInput: page.getByPlaceholder('Enter your name'),
      emailInput: page.getByPlaceholder('Enter your email'),
    };

    // Exit-flow confirmation dialog. The wizard shell renders two "Exit will
    // creation" buttons (desktop and mobile shell) — filter to the visible
    // one so we don't try to click a hidden viewport variant.
    this.exitButton = page.getByRole('button', { name: 'Exit will creation' }).filter({ visible: true }).first();
    this.exitDialogHeading = page.getByRole('heading', { name: /Are you sure you want to exit/ });
    this.exitConfirmLink = page.getByRole('link', { name: 'Exit' });
    this.keepBuildingButton = page.getByRole('button', { name: 'Keep Building' });
    this.exitLossWarning = page.getByText("If you exit now, your answers won't be saved.");
    this.exitSavedNotice = page.getByText('Your progress is saved automatically.');

    // Progress sidebar — previously completed steps are clickable, current /
    // future steps are not. In the DOM the clickable versions have `cursor:
    // pointer` on their wrapper; role varies (button on some renders, div on
    // others), so match by the step label under the "Your progress" nav.
    const progressNav = page.getByRole('navigation', { name: 'Your progress' });
    this.sidebarPlanSelection = progressNav.locator('[class*="cursor-pointer"]', { hasText: 'Choose Your Plan' }).first();
    this.sidebarAboutYou = progressNav.locator('[class*="cursor-pointer"]', { hasText: 'About You' }).first();
    this.sidebarFamily = progressNav.locator('[class*="cursor-pointer"]', { hasText: 'Your Family' }).first();
    this.sidebarPlanSummary = progressNav.locator('[class*="cursor-pointer"]', { hasText: 'Plan Summary' }).first();
    this.sidebarSecureCheckout = progressNav.locator('[class*="cursor-pointer"]', { hasText: 'Secure Checkout' }).first();
  }

  async openExitDialog() {
    await this.exitButton.click();
    await expect(this.exitDialogHeading).toBeVisible();
  }

  async keepBuilding() {
    await this.keepBuildingButton.click();
  }

  async confirmExit() {
    await this.exitConfirmLink.click();
  }

  async open() {
    await super.open('/will-creation');
  }

  async openFromHome(homePage, path = '/') {
    await homePage.open(path);
    await this.dismissCookieBanner();
    await homePage.startPlan();
    await this.dismissCookieBanner();
  }

  async openAboutYouFromHome(homePage, customerType = 'Individual', packageName = 'Will') {
    await this.openFromHome(homePage);
    await this.planSelection.choosePlanAndContinue(customerType, packageName);
    // Wait for the About You step to finish loading before interacting with it,
    // otherwise a Continue click can race the Livewire step transition.
    await this.aboutYou.expectLoaded();
  }

  async dismissCookieBanner() {
    await this.acceptCookiesButton.click({ timeout: 3_000 }).catch(() => {});
  }
}

module.exports = { WillCreationWizard };
