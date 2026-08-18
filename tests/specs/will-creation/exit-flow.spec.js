const { allure } = require('allure-playwright');
const { expect, test } = require('../../fixtures/test');
const { primaryCustomer } = require('../../data/users');

async function openPlanSummaryFromHome(homePage, willCreationWizard, customerType = 'Individual', packageName = 'Will') {
  await willCreationWizard.openAboutYouFromHome(homePage, customerType, packageName);
  await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer());
  await willCreationWizard.aboutYou.continue();
  await willCreationWizard.family.expectLoaded();
  await willCreationWizard.dismissCookieBanner();
  const maritalStatus = customerType === 'Couple' ? 'Married' : 'Single';
  await willCreationWizard.family.fillRequiredDetails({
    maritalStatus,
    hasDependents: 'No',
    inheritanceChoice: 'Children',
  });
  await willCreationWizard.family.continue();
  await willCreationWizard.planSummary.expectLoaded();
  await willCreationWizard.dismissCookieBanner();
}

test.describe('Will creation - Exit Flow', () => {
  test('T068 - Exit will creation opens the confirmation dialog', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the About You step so an Exit button is visible', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Click Exit will creation', async () => {
      await willCreationWizard.openExitDialog();
    });

    await allure.step('Confirm both dialog actions are available', async () => {
      await expect(willCreationWizard.keepBuildingButton).toBeVisible();
      await expect(willCreationWizard.exitConfirmLink).toBeVisible();
    });
  });

  test('T069 - Keep Building keeps the customer on the current step with data intact', async ({ homePage, willCreationWizard, page }) => {
    const details = primaryCustomer();

    await allure.step('Open About You and enter details', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
      await willCreationWizard.aboutYou.fillPrimaryCustomer(details);
    });

    await allure.step('Open the exit dialog then choose Keep Building', async () => {
      await willCreationWizard.openExitDialog();
      await willCreationWizard.keepBuilding();
    });

    await allure.step('Confirm the customer stays on About You with entered details intact', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await expect(willCreationWizard.aboutYou.firstNameInput).toHaveValue(details.firstName);
      await expect(willCreationWizard.aboutYou.emailInput).toHaveValue(details.email);
    });
  });

  test('T070 - Exit from an unauthenticated step navigates home and warns progress will not be saved', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You step (before any account is created)', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Open the exit dialog and verify the loss warning copy', async () => {
      await willCreationWizard.openExitDialog();
      await expect(willCreationWizard.exitLossWarning).toBeVisible();
    });

    await allure.step('Confirm Exit navigates back to the homepage', async () => {
      await willCreationWizard.confirmExit();
      await expect(page).toHaveURL(/staging\.fastwill\.com\/?$/);
    });
  });

  test('T071 - Exit from Plan Summary navigates to the dashboard and notes progress is saved', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Reach the Plan Summary step (this creates the customer account)', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Open the exit dialog and verify the saved-progress copy', async () => {
      await willCreationWizard.openExitDialog();
      await expect(willCreationWizard.exitSavedNotice).toBeVisible();
    });

    await allure.step('Confirm Exit navigates to the customer dashboard', async () => {
      await willCreationWizard.confirmExit();
      await expect(page).toHaveURL(/\/dashboard\/user/);
    });
  });
});
