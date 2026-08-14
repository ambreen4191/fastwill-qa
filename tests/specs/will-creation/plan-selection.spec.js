const { allure } = require('allure-playwright');
const { expect, test } = require('../../fixtures/test');

test.describe('Will creation - Plan Selection', () => {
  test('T015 - About You page opens after choosing Individual Will', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the homepage and choose Start Today', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Choose Individual and Will', async () => {
      await willCreationWizard.planSelection.choosePlanAndContinue('Individual', 'Will');
    });

    await allure.step('Confirm the About You page opens', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await willCreationWizard.aboutYou.expectLoaded();
    });
  });

  test('T016 - About You page opens after choosing Individual Trust', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the homepage and choose Start Today', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Choose Individual and Trust', async () => {
      await willCreationWizard.planSelection.choosePlanAndContinue('Individual', 'Trust');
    });

    await allure.step('Confirm the About You page opens', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await willCreationWizard.aboutYou.expectLoaded();
    });
  });

  test('T017 - About You page opens after choosing Couple Will', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the homepage and choose Start Today', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Choose Couple and Will', async () => {
      await willCreationWizard.planSelection.choosePlanAndContinue('Couple', 'Will');
    });

    await allure.step('Confirm the About You page opens', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await willCreationWizard.aboutYou.expectLoaded();
    });
  });

  test('T018 - About You page opens after choosing Couple Trust', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the homepage and choose Start Today', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Choose Couple and Trust', async () => {
      await willCreationWizard.planSelection.choosePlanAndContinue('Couple', 'Trust');
    });

    await allure.step('Confirm the About You page opens', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await willCreationWizard.aboutYou.expectLoaded();
    });
  });

  test('T019 - Default selected plan can continue to About You without manually choosing buttons', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the homepage and choose Start Today', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Continue with the default selected plan', async () => {
      await willCreationWizard.planSelection.expectLoaded();
      await willCreationWizard.planSelection.navigation.continue();
    });

    await allure.step('Confirm the About You page opens', async () => {
      await willCreationWizard.aboutYou.expectLoaded();
    });
  });

  test('T020 - View docs opens Will documents explanation', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the plan selection step', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Open the Will documents explanation', async () => {
      await willCreationWizard.planSelection.choosePackage('Will');
      await willCreationWizard.planSelection.viewDocs();
    });

    await allure.step('Confirm Will document details are shown', async () => {
      await expect(willCreationWizard.planSelection.willDocumentsHeading).toBeVisible();
      await expect(willCreationWizard.planSelection.willDocumentsDialog.getByText('Last Will & Testament')).toBeVisible();
      await expect(willCreationWizard.planSelection.willDocumentsDialog.getByText('Power of Attorney')).toBeVisible();
    });
  });

  test('T021 - View docs opens Trust documents explanation', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the plan selection step', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Open the Trust documents explanation', async () => {
      await willCreationWizard.planSelection.choosePackage('Trust');
      await willCreationWizard.planSelection.viewDocs();
    });

    await allure.step('Confirm Trust document details are shown', async () => {
      await expect(willCreationWizard.planSelection.trustDocumentsHeading).toBeVisible();
      await expect(willCreationWizard.planSelection.trustDocumentsDialog).toBeVisible();
    });
  });

  test('T022 - Sounds good closes the documents explanation', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the plan selection step', async () => {
      await willCreationWizard.openFromHome(homePage);
    });

    await allure.step('Open and close the documents explanation', async () => {
      await willCreationWizard.planSelection.choosePackage('Will');
      await willCreationWizard.planSelection.viewDocs();
      await expect(willCreationWizard.planSelection.willDocumentsHeading).toBeVisible();
      await willCreationWizard.planSelection.closeDocsExplanation();
    });

    await allure.step('Confirm the customer returns to the plan selection details', async () => {
      await expect(willCreationWizard.planSelection.willDocumentsHeading).not.toBeVisible();
      await willCreationWizard.planSelection.expectLoaded();
      await willCreationWizard.planSelection.expectWillPackageDetails();
    });
  });
});
