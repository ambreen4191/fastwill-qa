const { expect } = require('@playwright/test');
const { LoginLocators } = require('../locators/LoginLocators');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  async open() {
    await super.open('/login');
  }

  async login(email, password) {
    await this.fill(this.locators.emailInput, email);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async submitEmptyLogin() {
    await this.click(this.locators.loginButton);
  }

  async expectLoaded() {
    await expect(this.locators.heading).toBeVisible();
    await expect(this.locators.emailInput).toBeVisible();
    await expect(this.locators.passwordInput).toBeVisible();
    await expect(this.locators.loginButton).toBeVisible();
  }
}

module.exports = { LoginPage };
