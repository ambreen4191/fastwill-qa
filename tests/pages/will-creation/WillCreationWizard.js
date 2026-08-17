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
