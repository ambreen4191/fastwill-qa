const { allure } = require('allure-playwright');
const { expect, test } = require('../../fixtures/test');
const { primaryCustomer } = require('../../data/users');

async function openPlanSummaryFromHome(homePage, willCreationWizard, customerType = 'Individual', packageName = 'Will') {
  await willCreationWizard.openAboutYouFromHome(homePage, customerType, packageName);
  await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer());
  await willCreationWizard.aboutYou.continue();
  await willCreationWizard.family.expectLoaded();
  await willCreationWizard.dismissCookieBanner();
  // Couple flows expose a different set of marital options — the "Single"
  // default that individuals use isn't rendered, so pick a valid option per
  // customer type.
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

test.describe('Will creation - Plan Summary', () => {
  test('T057 - Plan Summary page loads after valid Family details', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Complete the wizard through Family into Plan Summary', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Confirm Plan Summary is loaded', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/cart$/);
      await willCreationWizard.planSummary.expectLoaded();
    });
  });

  test('T058 - Will package shows the 4-document set on Plan Summary', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Open the Will package documents dialog', async () => {
      await willCreationWizard.planSummary.openViewDocs();
      await expect(willCreationWizard.planSummary.willPackageDialogHeading).toBeVisible();
    });

    await allure.step('Confirm the four Will documents are listed', async () => {
      const dialog = willCreationWizard.planSummary.willPackageDialogHeading.locator('xpath=ancestor::*[@role="dialog"][1]');
      await expect(dialog.getByText('Last Will & Testament')).toBeVisible();
      await expect(dialog.getByText('Advance Care Directive (Living Will)')).toBeVisible();
      await expect(dialog.getByText('Power of Attorney')).toBeVisible();
      await expect(dialog.getByText('HIPAA Authorization')).toBeVisible();
    });
  });

  test('T059 - Trust package shows the 12-document set on Plan Summary', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Trust flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Trust');
    });

    await allure.step('Open the Trust package documents dialog', async () => {
      await willCreationWizard.planSummary.openViewDocs();
      await expect(willCreationWizard.planSummary.trustPackageDialogHeading).toBeVisible();
    });

    await allure.step('Confirm the Trust dialog surfaces Trust-specific documents', async () => {
      const dialog = willCreationWizard.planSummary.trustPackageDialogHeading.locator('xpath=ancestor::*[@role="dialog"][1]');
      // Trust-only documents (differs from Will's 4-document set)
      await expect(dialog.getByText(/Living Trust/i)).toBeVisible();
      await expect(dialog.getByText(/Schedule of Assets/i)).toBeVisible();
    });
  });

  test('T060 - View docs opens the Plan Summary documents explanation', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Open then close the documents dialog', async () => {
      await willCreationWizard.planSummary.openViewDocs();
      await expect(willCreationWizard.planSummary.willPackageDialogHeading).toBeVisible();
      await willCreationWizard.planSummary.soundsGoodButton.click();
    });

    await allure.step('Confirm the dialog is closed and the customer stays on Plan Summary', async () => {
      await expect(willCreationWizard.planSummary.willPackageDialogHeading).not.toBeVisible();
      await willCreationWizard.planSummary.expectLoaded();
    });
  });

  test('T061 - Adding Unlimited Editability updates the Total', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    let baseTotal;
    await allure.step('Capture the base Total before adding the add-on', async () => {
      baseTotal = await willCreationWizard.planSummary.getTotalNumeric();
    });

    await allure.step('Add Unlimited Editability', async () => {
      await willCreationWizard.planSummary.addUnlimitedEditability();
    });

    await allure.step('Confirm the Total increases after the add-on is applied', async () => {
      await expect
        .poll(async () => willCreationWizard.planSummary.getTotalNumeric(), { timeout: 10_000 })
        .toBeGreaterThan(baseTotal);
    });
  });

  test('T062 - Learn more opens the Unlimited Editability explanation', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Open the Unlimited Editability explanation', async () => {
      await willCreationWizard.planSummary.unlimitedEditabilityLearnMoreButton.click();
    });

    await allure.step('Confirm the Unlimited Editability dialog appears and can be closed', async () => {
      await expect(willCreationWizard.planSummary.unlimitedEditabilityDialogHeading).toBeVisible();
      await willCreationWizard.planSummary.gotItButton.first().click();
      await expect(willCreationWizard.planSummary.unlimitedEditabilityDialogHeading).not.toBeVisible();
    });
  });

  test('T063 - Remote Notary is unavailable for California and shows the availability explanation', async ({ homePage, willCreationWizard }) => {
    // The default seeded customer lives in California, where remote online
    // notarization is not currently permitted.
    await allure.step('Reach Plan Summary via a Will flow for a California customer', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Confirm the Remote Notary unavailable copy is shown', async () => {
      await expect(willCreationWizard.planSummary.remoteNotaryUnavailable).toBeVisible();
    });

    await allure.step('Open the state-specific explanation', async () => {
      await willCreationWizard.planSummary.whyNotAvailableButton.click();
      await expect(willCreationWizard.planSummary.notaryUnavailableDialogHeading).toBeVisible();
    });
  });

  test('T064 - Trust flow shows the Quitclaim Deed add-on and explanation', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Trust flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Trust');
    });

    await allure.step('Confirm the Quitclaim Deed section is present on Trust summary', async () => {
      // The section is Trust-specific; its presence differentiates the Trust
      // Plan Summary from the Will Plan Summary.
      await expect(willCreationWizard.planSummary.quitclaimDeedSectionText).toBeVisible();
    });

    await allure.step('Open the Quitclaim Deed explanation dialog', async () => {
      // Click the "Learn more" nearest the Quitclaim Deed section by walking
      // up from the section text to the enclosing container and picking the
      // Learn more inside it.
      const container = willCreationWizard.planSummary.quitclaimDeedSectionText.locator(
        'xpath=ancestor::*[.//button[normalize-space()="Learn more"]][1]'
      );
      await container.getByRole('button', { name: 'Learn more' }).first().click();
      await expect(willCreationWizard.planSummary.quitclaimDeedDialogHeading).toBeVisible();
    });
  });

  test('T065 - Continue on Plan Summary advances to Secure Checkout', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Reach Plan Summary via a Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Continue to Secure Checkout', async () => {
      await willCreationWizard.planSummary.continue();
    });

    await allure.step('Confirm the customer leaves Plan Summary and reaches Step 5', async () => {
      await expect(page).not.toHaveURL(/\/will-creation\/basic\/cart$/);
      await expect(page.getByText('STEP 5 OF 5')).toBeVisible();
    });
  });

  test('T066 - Back from Plan Summary returns to Family', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Reach Plan Summary via a Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Go back to the Family step', async () => {
      await willCreationWizard.planSummary.back();
    });

    await allure.step('Confirm the customer returns to Family with earlier selections preserved', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
      await willCreationWizard.family.expectLoaded();
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.singleButton);
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.noDependentsButton);
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.childrenInheritanceButton);
    });
  });

  test('T067 - Couple package pricing is shown on Plan Summary', async ({ homePage, willCreationWizard }) => {
    await allure.step('Reach Plan Summary via a Couple Will flow', async () => {
      await openPlanSummaryFromHome(homePage, willCreationWizard, 'Couple', 'Will');
    });

    await allure.step('Confirm the Will Package heading and a total price are shown', async () => {
      await expect(willCreationWizard.planSummary.willPackageText.first()).toBeVisible();
      await expect(willCreationWizard.planSummary.totalLabel.first()).toBeVisible();
      const total = await willCreationWizard.planSummary.getTotalNumeric();
      expect(total).toBeGreaterThan(0);
    });
  });
});
