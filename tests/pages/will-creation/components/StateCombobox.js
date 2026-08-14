class StateCombobox {
  constructor(page) {
    this.input = page.locator('input[name=state]');
    this.option = (state) =>
      page.locator('[data-testid^="state-option-"]').filter({ hasText: state });
  }

  async search(stateSearchText) {
    await this.input.fill(stateSearchText);
  }

  async select(state) {
    // The state field is a search-and-select combobox: typing filters the list,
    // and an option must be clicked to actually set the value.
    await this.search(state);
    await this.option(state).first().click();
  }
}

module.exports = { StateCombobox };
