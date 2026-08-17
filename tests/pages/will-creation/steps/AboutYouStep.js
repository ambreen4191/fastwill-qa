const { expect } = require('@playwright/test');
const { StateCombobox } = require('../components/StateCombobox');
const { StepNavigation } = require('../components/StepNavigation');

class AboutYouStep {
  constructor(page) {
    this.page = page;
    this.navigation = new StepNavigation(page);
    this.stateCombobox = new StateCombobox(page);
    this.stepLabel = page.getByText('STEP 2 OF 5');
    this.heading = page.getByRole('heading', { name: 'First, tell us about yourself' });
    this.firstNameInput = page.locator('#fld-user-first-name');
    this.middleNameInput = page.locator('#fld-user-middle-name');
    this.lastNameInput = page.locator('#fld-user-last-name');
    this.emailInput = page.locator('#fld-user-email');
    this.phoneInput = page.locator('#fld-user-phone-number');
    this.stateInput = this.stateCombobox.input;
    this.lovedOneFirstNameInput = page.locator('#fld-firstName');
    this.lovedOneEmailInput = page.locator('#fld-emails');
    this.requiredStateMessage = page.getByText('Please select your state.');
    this.invalidEmailMessage = page.getByText('The user.email field must be a valid email address.');
    this.invalidPhoneMessage = page.getByText('The phone number format is invalid. Please enter a valid phone number.');
    // Scope required-field errors to the specific input so a message for one
    // field can't accidentally satisfy an assertion about another.
    this.firstNameError = this.firstNameInput.locator('xpath=..').getByRole('alert');
    this.lastNameError = this.lastNameInput.locator('xpath=..').getByRole('alert');
    this.emailError = this.emailInput.locator('xpath=..').getByRole('alert');
  }

  async fillPrimaryCustomer({ firstName, middleName, lastName, email, phone, state }) {
    // Every text input is bound with `wire:model.live.blur`, so the value only
    // commits to the Livewire component (and unlocks Continue) on blur. Filling
    // without an explicit blur leaves the field's server-side model empty, so
    // the form stays invalid even though the DOM shows a value. Blur after each
    // fill to force the commit.
    if (firstName) await this.#fillAndCommit(this.firstNameInput, firstName);
    if (middleName) await this.#fillAndCommit(this.middleNameInput, middleName);
    if (lastName) await this.#fillAndCommit(this.lastNameInput, lastName);
    if (phone) await this.#fillAndCommit(this.phoneInput, phone);
    if (state) await this.stateCombobox.select(state);
    if (email) await this.#fillAndCommit(this.emailInput, email);
  }

  async #fillAndCommit(input, value) {
    // Some fields (e.g., phone) use an x-mask that rewrites the DOM value, so
    // don't assert equality here — just commit the value with a blur.
    await input.fill(value);
    await input.blur();
  }

  async fillLovedOneInvite({ firstName, email }) {
    if (firstName) await this.lovedOneFirstNameInput.fill(firstName);
    if (email) await this.lovedOneEmailInput.fill(email);
  }

  async continue() {
    await this.navigation.continue();
  }

  async back() {
    await this.navigation.back();
  }

  async expectLoaded() {
    await expect(this.stepLabel).toBeVisible();
    await expect(this.heading).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.stateInput).toBeVisible();
  }
}

module.exports = { AboutYouStep };
