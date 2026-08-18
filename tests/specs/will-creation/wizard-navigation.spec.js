const { allure } = require('allure-playwright');
const { expect, test } = require('../../fixtures/test');
const { primaryCustomer } = require('../../data/users');

async function openFamilyFromHome(homePage, willCreationWizard, customerType = 'Individual', packageName = 'Will') {
  await willCreationWizard.openAboutYouFromHome(homePage, customerType, packageName);
  await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer());
  await willCreationWizard.aboutYou.continue();
  await willCreationWizard.family.expectLoaded();
  await willCreationWizard.dismissCookieBanner();
}

test.describe('Will creation - Wizard Navigation', () => {
  test('T072 - Progress sidebar returns customer to About You from a later step', async ({ homePage, willCreationWizard, page }) => {
    const details = primaryCustomer();

    await allure.step('Complete About You (with known details) and reach Family', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
      await willCreationWizard.aboutYou.fillPrimaryCustomer(details);
      await willCreationWizard.aboutYou.continue();
      await willCreationWizard.family.expectLoaded();
    });

    await allure.step('Click About You in the progress sidebar', async () => {
      await willCreationWizard.sidebarAboutYou.click();
    });

    await allure.step('Confirm the customer returns to About You with fields preserved', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await willCreationWizard.aboutYou.expectLoaded();
      await expect(willCreationWizard.aboutYou.firstNameInput).toHaveValue(details.firstName);
      await expect(willCreationWizard.aboutYou.emailInput).toHaveValue(details.email);
    });
  });

  test('T073 - Progress sidebar returns customer to Plan Selection from a later step', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Reach the Family step via a Couple Trust flow', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Couple', 'Trust');
    });

    await allure.step('Click Choose Your Plan in the progress sidebar', async () => {
      await willCreationWizard.sidebarPlanSelection.click();
    });

    await allure.step('Confirm the customer returns to Plan Selection with Couple/Trust preserved', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/intro$/);
      await willCreationWizard.planSelection.expectLoaded();
      await willCreationWizard.planSelection.expectCustomerTypeSelected('Couple');
      await willCreationWizard.planSelection.expectPackageSelected('Trust');
    });
  });

  test('T074 - Future steps in the progress sidebar are not clickable', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the plan selection step', async () => {
      await willCreationWizard.openFromHome(homePage);
      await willCreationWizard.planSelection.expectLoaded();
    });

    await allure.step('Confirm About You / Your Family / Plan Summary / Secure Checkout are not buttons', async () => {
      // On Step 1, only "Choose Your Plan" is the current step and no future
      // step is exposed as a clickable button in the sidebar.
      await expect(willCreationWizard.sidebarAboutYou).toHaveCount(0);
      await expect(willCreationWizard.sidebarFamily).toHaveCount(0);
      await expect(willCreationWizard.sidebarPlanSummary).toHaveCount(0);
      await expect(willCreationWizard.sidebarSecureCheckout).toHaveCount(0);
    });
  });

  test('T075 - Deep-linking to a later wizard step redirects to the earliest incomplete step', async ({ willCreationWizard, page }) => {
    await allure.step('Attempt to open Family without completing About You', async () => {
      await page.goto('/will-creation/basic/family');
    });

    await allure.step('Confirm the app redirects away from the Family step', async () => {
      // Any of the following are acceptable guards for a customer who hasn't
      // completed prior steps: bounce to the login page, back to plan
      // selection, or back to About You. What matters is that the customer
      // is NOT allowed to sit on Family without having reached it in-flow.
      await expect(page).not.toHaveURL(/\/will-creation\/basic\/family$/);
      await expect(page).toHaveURL(/\/(login|will-creation\/basic\/(intro|user))/);
    });
  });
});
