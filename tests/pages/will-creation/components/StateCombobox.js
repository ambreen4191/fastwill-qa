class StateCombobox {
  constructor(page) {
    this.page = page;
    this.input = page.locator('input[name=state]');
    this.option = (state) =>
      page.locator('[data-testid^="state-option-"]').filter({ hasText: state });
    this.noResults = page.getByText('No state found');
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept Cookies' });
  }

  async search(stateSearchText) {
    await this.input.click();
    await this.input.fill(stateSearchText);
  }

  async selectViaKeyboard(state) {
    // Open the dropdown, filter to the target, then use ArrowDown + Enter to
    // pick the highlighted option instead of clicking it.
    await this.search(state);
    await this.dismissCookieBanner();
    await this.input.press('ArrowDown');
    await this.input.press('Enter');
  }

  async dismissCookieBanner() {
    await this.acceptCookiesButton.click({ timeout: 3_000 }).catch(() => {});
  }

  async select(state) {
    // The state field is a search-and-select combobox: typing filters the list,
    // and an option must be clicked to actually set the value.
    await this.search(state);
    await this.dismissCookieBanner();
    const option = this.option(state).first();
    await option.click({ timeout: 3_000 }).catch(async () => {
      // The custom dropdown listens on mousedown and can sit under the sticky
      // footer in headless runs, so fall back to the same event the app handles.
      await option.dispatchEvent('mousedown');
    });
  }
}

module.exports = { StateCombobox };
