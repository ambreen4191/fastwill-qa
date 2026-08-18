const { expect } = require('@playwright/test');
const { StepNavigation } = require('../components/StepNavigation');

class PlanSummaryStep {
  constructor(page) {
    this.page = page;
    this.navigation = new StepNavigation(page);
    this.stepLabel = page.getByText('STEP 4 OF 5');
    this.heading = page.getByRole('heading', { name: 'Review Your Package' });

    // Package headings shown in the summary card.
    this.willPackageText = page.getByText('Will Package', { exact: true });
    this.trustPackageText = page.getByText('Trust Package', { exact: true });

    // View docs opens the package explanation dialog.
    this.viewDocsButton = page.getByRole('button', { name: 'View docs' });
    this.willPackageDialogHeading = page.getByRole('heading', { name: "What's in your Will Package" });
    this.trustPackageDialogHeading = page.getByRole('heading', { name: "What's in your Trust Package" });
    this.soundsGoodButton = page.getByRole('button', { name: 'Sounds good' });

    // Unlimited Editability add-on.
    this.addUnlimitedEditabilityButton = page.getByRole('button', { name: 'Add Unlimited Editability' });
    this.unlimitedEditabilityLearnMoreButton = page
      .locator('section, div, article')
      .filter({ hasText: 'Unlimited Editability' })
      .getByRole('button', { name: 'Learn more' })
      .first();
    this.unlimitedEditabilityDialogHeading = page.getByRole('heading', { name: 'Unlimited Editability' });
    this.gotItButton = page.getByRole('button', { name: 'Got it' });

    // Remote Notary — availability differs by state.
    this.remoteNotaryUnavailable = page.getByText(
      "Not available in California — online notarization isn't permitted there yet."
    );
    this.whyNotAvailableButton = page.getByRole('button', { name: 'Why not available?' });
    this.notaryUnavailableDialogHeading = page.getByRole('heading', {
      name: 'Remote notarization in California',
    });

    // Quitclaim Deed add-on — only surfaces in Trust flows. The Trust summary
    // shows a "Quitclaim Deed" section with its own Learn more button; the
    // dialog it opens is titled "Quitclaim Deed Transfer".
    this.quitclaimDeedDialogHeading = page.getByRole('heading', { name: 'Quitclaim Deed Transfer' });
    this.quitclaimDeedSectionText = page.getByText(/Quitclaim Deed/i).first();

    // Totals.
    this.totalLabel = page.getByText('Total', { exact: true });
    // First "$..." value that appears in the DOM after the "Total" label.
    // Scoped so a stray "$" on the page (Klarna installment, package price)
    // can't hijack it.
    this.totalValue = this.totalLabel.first().locator('xpath=following::*[contains(text(),"$")][1]');
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
  }

  async openViewDocs() {
    await this.viewDocsButton.first().click();
  }

  async closeDialog() {
    // Both "Sounds good" and "Got it" close the summary/learn-more dialogs.
    const closer = this.soundsGoodButton
      .or(this.gotItButton)
      .first();
    await closer.click();
  }

  async addUnlimitedEditability() {
    await this.addUnlimitedEditabilityButton.first().click();
  }

  async getTotalNumeric() {
    // Extract the first "$NNN(.NN)?" that appears near the Total label. We
    // capture the numeric value so comparisons don't depend on locale spacing.
    const text = await this.totalValue.first().innerText();
    const match = text.match(/\$\s*([\d,]+(?:\.\d{2})?)/);
    if (!match) throw new Error(`Could not read Total from "${text}"`);
    return parseFloat(match[1].replace(/,/g, ''));
  }
}

module.exports = { PlanSummaryStep };
