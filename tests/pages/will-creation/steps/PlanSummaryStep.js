const { expect } = require('@playwright/test');

class PlanSummaryStep {
  constructor(page) {
    this.page = page;
    this.stepLabel = page.getByText('STEP 4 OF 5');
    this.heading = page.getByRole('heading', { name: 'Review Your Package' });
  }

  async expectLoaded() {
    await expect(this.stepLabel).toBeVisible();
    await expect(this.heading).toBeVisible();
  }
}

module.exports = { PlanSummaryStep };
