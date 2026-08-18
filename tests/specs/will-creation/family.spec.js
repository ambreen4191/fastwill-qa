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

test.describe('Will creation - Your Family', () => {
  test('T040 - Family page loads after valid About You details', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Family page after valid About You details', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Confirm the Family page is loaded', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
      await willCreationWizard.family.expectLoaded();
    });
  });

  test('T041 - Individual flow shows all marital status options', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page for an Individual Will', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Confirm all individual marital status options appear', async () => {
      await willCreationWizard.family.expectIndividualOptions();
    });
  });

  test('T042 - Couple flow shows only Married and Civil Union marital options', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page for a Couple Will', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Couple', 'Will');
    });

    await allure.step('Confirm only couple marital status options appear', async () => {
      await willCreationWizard.family.expectCoupleOptions();
    });
  });

  test('T043 - Family page requires marital status', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Fill every required family field except marital status', async () => {
      await willCreationWizard.family.chooseDependents('No');
      await willCreationWizard.family.chooseInheritanceChoice('Children');
      await willCreationWizard.family.continue();
    });

    await allure.step('Confirm marital status is required', async () => {
      await expect(willCreationWizard.family.requiredMaritalStatusMessage).toBeVisible();
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
    });
  });

  test('T044 - Family page requires dependents selection', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Fill every required family field except dependents', async () => {
      await willCreationWizard.family.chooseMaritalStatus('Single');
      await willCreationWizard.family.chooseInheritanceChoice('Children');
      await willCreationWizard.family.continue();
    });

    await allure.step('Confirm dependents selection is required', async () => {
      await expect(willCreationWizard.family.requiredDependentsMessage).toBeVisible();
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
    });
  });

  test('T045 - Family page requires at least one inheritance choice', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Fill every required family field except inheritance choice', async () => {
      await willCreationWizard.family.chooseMaritalStatus('Single');
      await willCreationWizard.family.chooseDependents('No');
      await willCreationWizard.family.continue();
    });

    await allure.step('Confirm inheritance choice is required', async () => {
      await expect(willCreationWizard.family.requiredInheritanceMessage).toBeVisible();
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
    });
  });

  test('T046 - Customer can select Single marital status', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select Single marital status', async () => {
      await willCreationWizard.family.chooseMaritalStatus('Single');
    });

    await allure.step('Confirm Single is selected', async () => {
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.singleButton);
    });
  });

  test('T047 - Customer can select Yes for dependents', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select Yes for dependents', async () => {
      await willCreationWizard.family.chooseDependents('Yes');
    });

    await allure.step('Confirm Yes is selected', async () => {
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.yesDependentsButton);
    });
  });

  test('T048 - Customer can select No for dependents', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select No for dependents', async () => {
      await willCreationWizard.family.chooseDependents('No');
    });

    await allure.step('Confirm No is selected', async () => {
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.noDependentsButton);
    });
  });

  test('T049 - Customer can select Children as inheritance choice', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select Children as inheritance choice', async () => {
      await willCreationWizard.family.chooseInheritanceChoice('Children');
    });

    await allure.step('Confirm Children is selected', async () => {
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.childrenInheritanceButton);
    });
  });

  test('T050 - Customer can select multiple inheritance choices', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select Children and Other family as inheritance choices', async () => {
      await willCreationWizard.family.chooseInheritanceChoice('Children');
      await willCreationWizard.family.chooseInheritanceChoice('Other family');
    });

    await allure.step('Confirm both inheritance choices are selected', async () => {
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.childrenInheritanceButton);
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.otherFamilyInheritanceButton);
    });
  });

  test('T051 - Couple flow includes Spouse inheritance option', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page for a Couple Will', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Couple', 'Will');
    });

    await allure.step('Confirm Spouse inheritance option appears', async () => {
      await expect(willCreationWizard.family.spouseInheritanceButton).toBeVisible();
    });
  });

  test('T052 - Individual flow does not show Spouse inheritance option', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page for an Individual Will', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Confirm Spouse inheritance option does not appear', async () => {
      await expect(willCreationWizard.family.spouseInheritanceButton).not.toBeVisible();
    });
  });

  test('T053 - Back button returns customer to About You step', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Go back to About You', async () => {
      await willCreationWizard.family.back();
    });

    await allure.step('Confirm the customer returns to About You', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
      await willCreationWizard.aboutYou.expectLoaded();
    });
  });

  test('T054 - Valid family details continue to Plan Summary', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Enter valid family details', async () => {
      await willCreationWizard.family.fillRequiredDetails({
        maritalStatus: 'Single',
        hasDependents: 'No',
        inheritanceChoice: 'Children',
      });
      await willCreationWizard.family.continue();
    });

    await allure.step('Confirm the customer moves to Plan Summary', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/cart$/);
      await willCreationWizard.planSummary.expectLoaded();
    });
  });

  test('T055 - Marital status is single-select — selecting a new option deselects the previous one', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select Single then switch to Married', async () => {
      await willCreationWizard.family.chooseMaritalStatus('Single');
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.singleButton);
      await willCreationWizard.family.chooseMaritalStatus('Married');
    });

    await allure.step('Confirm only Married is selected and Single is deselected', async () => {
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.marriedButton);
      await expect(willCreationWizard.family.singleButton).not.toHaveAttribute('aria-pressed', 'true');
    });
  });

  test('T056 - Inheritance choices are multi-select and each can be toggled off', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the Family page', async () => {
      await openFamilyFromHome(homePage, willCreationWizard, 'Individual', 'Will');
    });

    await allure.step('Select Children and Charity as inheritance choices', async () => {
      await willCreationWizard.family.chooseInheritanceChoice('Children');
      await willCreationWizard.family.chooseInheritanceChoice('Charity');
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.childrenInheritanceButton);
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.charityInheritanceButton);
    });

    await allure.step('Toggle Children off by clicking it again', async () => {
      await willCreationWizard.family.chooseInheritanceChoice('Children');
    });

    await allure.step('Confirm Children is no longer selected but Charity still is', async () => {
      await expect(willCreationWizard.family.childrenInheritanceButton).not.toHaveAttribute('aria-pressed', 'true');
      await willCreationWizard.family.expectButtonSelected(willCreationWizard.family.charityInheritanceButton);
    });
  });
});
