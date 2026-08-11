const { allure } = require('allure-playwright');
const { expect, test } = require('../fixtures/test');

test.describe('Core navigation', () => {
  test('homepage loads primary navigation and estate planning CTA @smoke', async ({ homePage, page }) => {
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

  test('header links route to key public pages @smoke', async ({ homePage, page }) => {
    const routes = [
      {
        name: 'Trust',
        locator: () => homePage.locators.trustLink,
        url: /\/trust-package$/,
        heading: 'Keep Your Home Out of Probate',
      },
      {
        name: 'Will',
        locator: () => homePage.locators.willLink,
        url: /\/will-package$/,
        heading: 'One Less Thing to Worry About',
      },
      {
        name: 'Learn',
        locator: () => homePage.locators.learnLink,
        url: /\/estate-planning-guide$/,
        heading: 'Estate Planning Explained',
      },
      {
        name: 'Professionals',
        locator: () => homePage.locators.professionalsLink,
        url: /\/professionals$/,
        heading: 'Add Estate Planning to Your Practice',
      },
      {
        name: 'Pricing',
        locator: () => homePage.locators.pricingLink,
        url: /\/plans-and-pricing$/,
        heading: 'Modern Estate Planning Simple Pricing',
      },
      {
        name: 'Log In',
        locator: () => homePage.locators.loginLink,
        url: /\/login$/,
        heading: 'Please log in to your account',
      },
    ];

    for (const route of routes) {
      await allure.step(`Open the homepage and choose ${route.name}`, async () => {
        await homePage.open();
        await route.locator().click();
      });

      await allure.step(`Confirm the ${route.name} page opens`, async () => {
        await expect(page).toHaveURL(route.url);
        await expect(page.getByRole('heading', { name: route.heading })).toBeVisible();
      });
    }
  });

  test('Start Today opens the first will creation step @smoke', async ({ homePage, page }) => {
    await allure.step('Open the FastWill homepage', async () => {
      await homePage.open();
    });

    await allure.step('Choose Start Today', async () => {
      await homePage.startPlan();
    });

    await allure.step('Confirm the customer lands on the first will creation step', async () => {
      await expect(page).toHaveURL(/\/will-creation$/);
      await expect(page.getByText('STEP 1 OF 5')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Start your plan' })).toBeVisible();
    });
  });
});
