const { expect } = require('@playwright/test');
const { InventoryLocators } = require('../locators/InventoryLocators');
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new InventoryLocators(page);
  }

  async addToCart(productName) {
    await this.locators.addToCartButton(productName).click();
  }

  async expectLoaded() {
    await expect(this.locators.title).toBeVisible();
  }
}

module.exports = { InventoryPage };
