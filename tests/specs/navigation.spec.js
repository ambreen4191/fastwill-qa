const { allure } = require('allure-playwright');
const { expect, test } = require('../fixtures/test');

test.describe('Core navigation', () => {
  test('T001 - Homepage loads primary navigation and estate planning CTA', async ({ homePage, page }) => {
    await allure.step('Open the FastWill homepage', async () => {
      await homePage.open();
    });

    await allure.step('Check that the main navigation is visible', async () => {
      await homePage.expectLoaded();
    });

    await allure.step('Check that customers can start an estate plan from the homepage', async () => {
      await expect(page).toHaveTitle(/Online Will & Trust .* FastWill/);
      await expect(homePage.locators.startTodayButton).toBeVisible();
    });
  });

  test('T002 - Header Trust link routes to the trust package page', async ({ homePage, page }) => {
    await allure.step('Open the homepage and choose Trust', async () => {
      await homePage.open();
      await homePage.locators.trustLink.click();
    });

    await allure.step('Confirm the Trust page opens', async () => {
      await expect(page).toHaveURL(/\/trust-package$/);
      await expect(page.getByRole('heading', { name: 'Keep Your Home Out of Probate' })).toBeVisible();
    });
  });

  test('T003 - Header Will link routes to the will package page', async ({ homePage, page }) => {
    await allure.step('Open the homepage and choose Will', async () => {
      await homePage.open();
      await homePage.locators.willLink.click();
    });

    await allure.step('Confirm the Will page opens', async () => {
      await expect(page).toHaveURL(/\/will-package$/);
      await expect(page.getByRole('heading', { name: 'One Less Thing to Worry About' })).toBeVisible();
    });
  });

  test('T004 - Header Learn link routes to the estate planning guide', async ({ homePage, page }) => {
    await allure.step('Open the homepage and choose Learn', async () => {
      await homePage.open();
      await homePage.locators.learnLink.click();
    });

    await allure.step('Confirm the Learn page opens', async () => {
      await expect(page).toHaveURL(/\/estate-planning-guide$/);
      await expect(page.getByRole('heading', { name: 'Estate Planning Explained' })).toBeVisible();
    });
  });

  test('T005 - Header Professionals link routes to the professionals page', async ({ homePage, page }) => {
    await allure.step('Open the homepage and choose Professionals', async () => {
      await homePage.open();
      await homePage.locators.professionalsLink.click();
    });

    await allure.step('Confirm the Professionals page opens', async () => {
      await expect(page).toHaveURL(/\/professionals$/);
      await expect(page.getByRole('heading', { name: 'Add Estate Planning to Your Practice' })).toBeVisible();
    });
  });

  test('T006 - Header Pricing link routes to the plans and pricing page', async ({ homePage, page }) => {
    await allure.step('Open the homepage and choose Pricing', async () => {
      await homePage.open();
      await homePage.locators.pricingLink.click();
    });

    await allure.step('Confirm the Pricing page opens', async () => {
      await expect(page).toHaveURL(/\/plans-and-pricing$/);
      await expect(page.getByRole('heading', { name: 'Modern Estate Planning Simple Pricing' })).toBeVisible();
    });
  });

  test('T007 - Header Log In link routes to the login page', async ({ homePage, page }) => {
    await allure.step('Open the homepage and choose Log In', async () => {
      await homePage.open();
      await homePage.locators.loginLink.click();
    });

    await allure.step('Confirm the Log In page opens', async () => {
      await expect(page).toHaveURL(/\/login$/);
      await expect(page.getByRole('heading', { name: 'Please log in to your account' })).toBeVisible();
    });
  });

  test('T008 - Start Today from home screen opens the first will creation step', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the FastWill homepage', async () => {
      await homePage.open();
    });

    await allure.step('Choose Start Today', async () => {
      await homePage.startPlan();
    });

    await allure.step('Confirm the customer lands on the first will creation step', async () => {
      await expect(page).toHaveURL(/\/will-creation$/);
      await willCreationWizard.planSelection.expectLoaded();
    });
  });

  test('T009 - Start Today from will-package screen opens the first will creation step', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Will package page', async () => {
      await homePage.open('/will-package');
    });

    await allure.step('Choose Start Today', async () => {
      await homePage.startPlan();
    });

    await allure.step('Confirm the customer lands on the first will creation step', async () => {
      await expect(page).toHaveURL(/\/will-creation$/);
      await willCreationWizard.planSelection.expectLoaded();
    });
  });

  test('T010 - Start Today from trust-package screen opens the will creation step', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Trust package page', async () => {
      await homePage.open('/trust-package');
    });

    await allure.step('Choose Start Today', async () => {
      await homePage.startPlan();
    });

    await allure.step('Confirm the customer lands on the will creation step', async () => {
      await expect(page).toHaveURL(/\/will-creation$/);
      await willCreationWizard.planSelection.expectLoaded();
    });
  });

  test('T011 - Verify clicking logo icon navigates to homescreen', async ({ homePage, page }) => {
    await allure.step('Open a public page away from the homepage', async () => {
      await homePage.open('/login');
      await expect(page).toHaveURL(/\/login$/);
    });

    await allure.step('Click the FastWill logo', async () => {
      await homePage.clickLogo();
    });

    await allure.step('Confirm the homepage opens', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(homePage.locators.heroHeading).toBeVisible();
    });
  });
});
