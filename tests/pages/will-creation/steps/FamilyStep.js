const { expect } = require('@playwright/test');
const { StepNavigation } = require('../components/StepNavigation');

class FamilyStep {
  constructor(page) {
    this.page = page;
    this.navigation = new StepNavigation(page);
    this.stepLabel = page.getByText('STEP 3 OF 5');
    this.heading = page.getByRole('heading', { name: 'Tell us about your family' });
    this.maritalStatusLabel = page.getByText('What is your marital status?');
    this.dependentsLabel = page.getByText('Do you have any dependents?');
    this.inheritanceLabel = page.getByText('Who should inherit your estate?');
    this.singleButton = page.getByRole('button', { name: 'Single' });
    this.marriedButton = page.getByRole('button', { name: 'Married' });
    this.civilUnionButton = page.getByRole('button', { name: 'Civil Union' });
    this.engagedButton = page.getByRole('button', { name: 'Engaged' });
    this.divorcedButton = page.getByRole('button', { name: 'Divorced' });
    this.widowedButton = page.getByRole('button', { name: 'Widowed' });
    this.yesDependentsButton = page.getByRole('button', { name: 'Yes' });
    this.noDependentsButton = page.getByRole('button', { name: 'No' });
    this.spouseInheritanceButton = page.getByRole('button', { name: 'Spouse' });
    this.childrenInheritanceButton = page.getByRole('button', { name: 'Children' });
    this.otherFamilyInheritanceButton = page.getByRole('button', { name: 'Other family' });
    this.charityInheritanceButton = page.getByRole('button', { name: 'Charity' });
    this.requiredMaritalStatusMessage = page.getByText('Please select your relationship status.');
    this.requiredDependentsMessage = page.getByText('This field is required.');
    this.requiredInheritanceMessage = page.getByText('Please select at least one person or group who should inherit your estate.');
  }

  async chooseMaritalStatus(status) {
    await this.page.getByRole('button', { name: status, exact: true }).click();
  }

  async chooseDependents(answer) {
    await this.page.getByRole('button', { name: answer, exact: true }).click();
  }

  async chooseInheritanceChoice(choice) {
    await this.page.getByRole('button', { name: choice, exact: true }).click();
  }

  async fillRequiredDetails({
    maritalStatus = 'Single',
    hasDependents = 'No',
    inheritanceChoice = 'Children',
  } = {}) {
    await this.chooseMaritalStatus(maritalStatus);
    await this.chooseDependents(hasDependents);
    await this.chooseInheritanceChoice(inheritanceChoice);
  }

  async continue() {
    await this.navigation.continue();
  }

  async back() {
    await this.navigation.back();
  }

  async expectButtonSelected(locator) {
    await expect(locator).toHaveAttribute('aria-pressed', 'true');
  }

  async expectLoaded() {
    await expect(this.stepLabel).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.maritalStatusLabel).toBeVisible();
    await expect(this.dependentsLabel).toBeVisible();
    await expect(this.inheritanceLabel).toBeVisible();
  }

  async expectIndividualOptions() {
    await expect(this.singleButton).toBeVisible();
    await expect(this.marriedButton).toBeVisible();
    await expect(this.civilUnionButton).toBeVisible();
    await expect(this.engagedButton).toBeVisible();
    await expect(this.divorcedButton).toBeVisible();
    await expect(this.widowedButton).toBeVisible();
  }

  async expectCoupleOptions() {
    await expect(this.marriedButton).toBeVisible();
    await expect(this.civilUnionButton).toBeVisible();
    await expect(this.singleButton).not.toBeVisible();
    await expect(this.engagedButton).not.toBeVisible();
    await expect(this.divorcedButton).not.toBeVisible();
    await expect(this.widowedButton).not.toBeVisible();
  }
}

module.exports = { FamilyStep };
