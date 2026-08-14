const { expect } = require('@playwright/test');

class FamilyStep {
  constructor(page) {
    this.page = page;
    this.stepLabel = page.getByText('STEP 3 OF 5');
    this.heading = page.getByRole('heading', { name: 'Tell us about your family' });
  }

  async expectLoaded() {
    await expect(this.stepLabel).toBeVisible();
    await expect(this.heading).toBeVisible();
  }
}

module.exports = { FamilyStep };
