const { allure } = require('allure-playwright');
const { expect, test } = require('../../fixtures/test');
const { primaryCustomer } = require('../../data/users');

test.describe('Will creation - About You', () => {
  test('T023 - About You page requires first name', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Fill every required field except first name', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ firstName: undefined }));
    });

    await allure.step('Try to continue', async () => {
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm only the first name error appears and the customer stays on About You', async () => {
      await expect(willCreationWizard.aboutYou.firstNameError).toBeVisible();
      await expect(willCreationWizard.aboutYou.firstNameError).toHaveText(/This field is required\./);
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
    });
  });

  test('T024 - About You page requires last name', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Fill every required field except last name', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ lastName: undefined }));
    });

    await allure.step('Try to continue', async () => {
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm only the last name error appears and the customer stays on About You', async () => {
      await expect(willCreationWizard.aboutYou.lastNameError).toBeVisible();
      await expect(willCreationWizard.aboutYou.lastNameError).toHaveText(/This field is required\./);
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
    });
  });

  test('T025 - About You page requires email', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Fill every required field except email', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ email: undefined }));
    });

    await allure.step('Try to continue', async () => {
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm only the email error appears and the customer stays on About You', async () => {
      await expect(willCreationWizard.aboutYou.emailError).toBeVisible();
      await expect(willCreationWizard.aboutYou.emailError).toHaveText(/The email is required\./);
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
    });
  });

  test('T026 - About You page requires state', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Fill every required field except state', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ state: undefined }));
    });

    await allure.step('Try to continue', async () => {
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm only the state error appears and the customer stays on About You', async () => {
      await expect(willCreationWizard.aboutYou.requiredStateMessage).toBeVisible();
      await expect(willCreationWizard.aboutYou.requiredStateMessage).toHaveText(/Please select your state\./);
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
    });
  });

  test('T027 - About You page blocks invalid email address', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Enter customer details with an email address that is not in the right format', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ email: 'not-an-email' }));
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm the customer stays on About You until the email is fixed', async () => {
      await expect(willCreationWizard.aboutYou.invalidEmailMessage).toBeVisible();
      await expect(willCreationWizard.aboutYou.emailInput).not.toHaveJSProperty('validity.valid', true);
    });
  });

  test('T028 - About You page continues to Your Family after valid details', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Enter valid customer details', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer());
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm the customer moves to the Your Family step', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
      await willCreationWizard.family.expectLoaded();
    });
  });

  test('T029 - Back button returns customer to plan selection step', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Go back to the plan selection step', async () => {
      await willCreationWizard.aboutYou.back();
    });

    await allure.step('Confirm the customer returns to plan selection', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/intro$/);
      await willCreationWizard.planSelection.expectLoaded();
    });
  });

  test('T030 - Back button preserves previously selected customer/package choices', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open About You after choosing Couple Trust', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Couple', 'Trust');
    });

    await allure.step('Go back to the plan selection step', async () => {
      await willCreationWizard.aboutYou.back();
    });

    await allure.step('Confirm Couple and Trust remain selected', async () => {
      await willCreationWizard.planSelection.expectLoaded();
      await willCreationWizard.planSelection.expectCustomerTypeSelected('Couple');
      await willCreationWizard.planSelection.expectPackageSelected('Trust');
      await willCreationWizard.planSelection.expectTrustPackageDetails();
    });
  });

  test('T031 - Middle name is optional and valid details continue successfully', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Enter valid customer details with a middle name', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ middleName: 'Anne' }));
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm the customer moves to the Your Family step', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
      await willCreationWizard.family.expectLoaded();
    });
  });

  test('T032 - Phone number is optional and valid details continue successfully without phone', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Enter valid customer details without a phone number', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ phone: undefined }));
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm the customer moves to the Your Family step', async () => {
      await expect(page).toHaveURL(/\/will-creation\/basic\/family$/);
      await willCreationWizard.family.expectLoaded();
    });
  });

  test('T033 - Invalid phone number shows phone format validation', async ({ homePage, willCreationWizard, page }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Enter customer details with an invalid phone number', async () => {
      await willCreationWizard.aboutYou.fillPrimaryCustomer(primaryCustomer({ phone: 'abc' }));
      await willCreationWizard.aboutYou.continue();
    });

    await allure.step('Confirm the phone format error appears and the customer stays on About You', async () => {
      await expect(willCreationWizard.aboutYou.invalidPhoneMessage).toBeVisible();
      await expect(page).toHaveURL(/\/will-creation\/basic\/user$/);
    });
  });

  test('T034 - State search filters and selects the intended state', async ({ homePage, willCreationWizard }) => {
    await allure.step('Open the About You page', async () => {
      await willCreationWizard.openAboutYouFromHome(homePage, 'Individual', 'Will');
    });

    await allure.step('Search for California in the state combobox', async () => {
      await willCreationWizard.aboutYou.stateCombobox.search('Calif');
    });

    await allure.step('Select California from the filtered state results', async () => {
      await expect(willCreationWizard.aboutYou.stateCombobox.option('California').first()).toBeVisible();
      await willCreationWizard.aboutYou.stateCombobox.option('California').first().click();
    });

    await allure.step('Confirm California is selected', async () => {
      await expect(willCreationWizard.aboutYou.stateInput).toHaveValue('California');
    });
  });
});
