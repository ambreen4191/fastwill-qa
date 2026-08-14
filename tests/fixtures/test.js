const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { WillCreationWizard } = require('../pages/will-creation/WillCreationWizard');
const test = base.extend({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  willCreationWizard: async ({ page }, use) => use(new WillCreationWizard(page)),
});
module.exports = { test, expect };
