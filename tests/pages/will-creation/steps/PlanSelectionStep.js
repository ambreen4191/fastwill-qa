const { expect } = require('@playwright/test');
const { StepNavigation } = require('../components/StepNavigation');

class PlanSelectionStep {
  constructor(page) {
    this.page = page;
    this.navigation = new StepNavigation(page);
    this.stepLabel = page.getByText('STEP 1 OF 5');
    this.heading = page.getByRole('heading', { name: 'Start your plan' });
    this.individualButton = page.getByRole('button', { name: 'Individual' });
    this.coupleButton = page.getByRole('button', { name: 'Couple' });
    this.trustButton = page.getByRole('button', { name: 'Trust', exact: true });
    this.willButton = page.getByRole('button', { name: 'Will', exact: true });
    this.viewDocsButton = page.getByRole('button', { name: 'View docs' });
    this.soundsGoodButton = page.getByRole('button', { name: 'Sounds good' });
    this.willPackageHeading = page.getByRole('heading', { name: 'Will Package' });
    this.trustPackageHeading = page.getByRole('heading', { name: 'Trust Package' });
    this.willDocumentsDialog = page.getByLabel('Your Will documents, explained');
    this.trustDocumentsDialog = page.getByLabel('Your Trust documents, explained');
    this.willDocumentsHeading = page.getByRole('heading', { name: 'Your Will documents, explained' });
    this.trustDocumentsHeading = page.getByRole('heading', { name: 'Your Trust documents, explained' });
  }

  async chooseCustomerType(customerType) {
    const locator = customerType === 'Couple' ? this.coupleButton : this.individualButton;
    await locator.click();
  }

  async choosePackage(packageName) {
    const locator = packageName === 'Trust' ? this.trustButton : this.willButton;
    await locator.click();
  }

  async choosePlanAndContinue(customerType, packageName) {
    await this.chooseCustomerType(customerType);
    await this.choosePackage(packageName);
    await this.navigation.continue();
  }

  async viewDocs() {
    await this.viewDocsButton.click();
  }

  async closeDocsExplanation() {
    await this.soundsGoodButton.click();
  }

  async expectLoaded() {
    await expect(this.stepLabel).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.individualButton).toBeVisible();
    await expect(this.coupleButton).toBeVisible();
    await expect(this.trustButton).toBeVisible();
    await expect(this.willButton).toBeVisible();
  }

  async expectCustomerTypeSelected(customerType) {
    const locator = customerType === 'Couple' ? this.coupleButton : this.individualButton;
    await expect(locator).toHaveAttribute('aria-pressed', 'true');
  }

  async expectPackageSelected(packageName) {
    const locator = packageName === 'Trust' ? this.trustButton : this.willButton;
    await expect(locator).toHaveAttribute('aria-pressed', 'true');
  }

  async expectWillPackageDetails() {
    await expect(this.willPackageHeading).toBeVisible();
  }

  async expectTrustPackageDetails() {
    await expect(this.trustPackageHeading).toBeVisible();
  }
}

module.exports = { PlanSelectionStep };
