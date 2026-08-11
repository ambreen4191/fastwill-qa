const { expect } = require('@playwright/test');
const { HomeLocators } = require('../locators/HomeLocators');
const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new HomeLocators(page);
  }

  async expectLoaded() {
    await expect(this.locators.heroHeading).toBeVisible();
    await expect(this.locators.trustLink).toBeVisible();
    await expect(this.locators.willLink).toBeVisible();
    await expect(this.locators.learnLink).toBeVisible();
    await expect(this.locators.professionalsLink).toBeVisible();
    await expect(this.locators.pricingLink).toBeVisible();
    await expect(this.locators.loginLink).toBeVisible();
  }

  async startPlan() {
    await this.click(this.locators.startTodayButton);
  }
}

module.exports = { HomePage };
