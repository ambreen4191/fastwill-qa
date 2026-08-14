class StepNavigation {
  constructor(page) {
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.backButton = page.getByRole('button', { name: 'BACK' });
  }

  async continue() {
    await this.continueButton.click();
  }

  async back() {
    await this.backButton.click();
  }
}

module.exports = { StepNavigation };
