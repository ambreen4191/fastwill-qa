const { allure } = require('allure-playwright');
const { expect, test } = require('../fixtures/test');

test.describe('Authentication', () => {
  test('T012 - Login screen exposes the expected account entry points', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
    });

    await allure.step('Check that customers can see the email and password fields', async () => {
      await loginPage.expectLoaded();
    });

    await allure.step('Check that account recovery and sign-up options are available', async () => {
      await expect(loginPage.locators.forgotPasswordLink).toHaveAttribute('href', /\/forgot-password$/);
      await expect(loginPage.locators.googleLoginLink).toHaveAttribute('href', /\/oauth\/google\?context=login$/);
      await expect(loginPage.locators.createAccountButton).toBeVisible();
      await expect(loginPage.locators.backLink).toHaveAttribute('href', /\/$/);
    });
  });

  test('T013 - Login form blocks empty credentials', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
    });

    await allure.step('Try to log in without entering an email or password', async () => {
      await loginPage.submitEmptyLogin();
    });

    await allure.step('Confirm the form asks for the email before continuing', async () => {
      await expect(loginPage.locators.emailInput).toBeFocused();
      await expect(loginPage.locators.emailInput).not.toHaveJSProperty('validity.valid', true);
    });
  });

  test('T014 - Login form blocks invalid email address', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
    });

    await allure.step('Enter an email address that is not in the right format', async () => {
      await loginPage.locators.emailInput.fill('not-an-email');
      await loginPage.locators.passwordInput.fill('password');
      await loginPage.submitEmptyLogin();
    });

    await allure.step('Confirm the customer stays on the login form until the email is fixed', async () => {
      await expect(loginPage.locators.emailInput).not.toHaveJSProperty('validity.valid', true);
      await expect(loginPage.locators.passwordInput).toHaveValue('password');
    });
  });
});
