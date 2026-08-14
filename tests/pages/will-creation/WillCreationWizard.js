const { BasePage } = require('../BasePage');
const { AboutYouStep } = require('./steps/AboutYouStep');
const { FamilyStep } = require('./steps/FamilyStep');
const { PlanSelectionStep } = require('./steps/PlanSelectionStep');

class WillCreationWizard extends BasePage {
  constructor(page) {
    super(page);
    this.planSelection = new PlanSelectionStep(page);
    this.aboutYou = new AboutYouStep(page);
    this.family = new FamilyStep(page);
  }

  async open() {
    await super.open('/will-creation');
  }

  async openFromHome(homePage, path = '/') {
    await homePage.open(path);
    await homePage.startPlan();
  }

  async openAboutYouFromHome(homePage, customerType = 'Individual', packageName = 'Will') {
    await this.openFromHome(homePage);
    await this.planSelection.choosePlanAndContinue(customerType, packageName);
    // Wait for the About You step to finish loading before interacting with it,
    // otherwise a Continue click can race the Livewire step transition.
    await this.aboutYou.expectLoaded();
  }
}

module.exports = { WillCreationWizard };
