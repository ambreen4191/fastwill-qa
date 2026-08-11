class HomeLocators {
  constructor(page) {
    this.logoLink = page.getByRole('link').first();
    this.trustLink = page.getByRole('link', { name: 'Trust', exact: true }).first();
    this.willLink = page.getByRole('link', { name: 'Will', exact: true }).first();
    this.learnLink = page.getByRole('link', { name: 'Learn', exact: true }).first();
    this.professionalsLink = page.getByRole('link', { name: 'Professionals', exact: true }).first();
    this.pricingLink = page.getByRole('link', { name: 'Pricing', exact: true }).first();
    this.loginLink = page.getByRole('link', { name: 'Log In', exact: true }).first();
    this.heroHeading = page.getByRole('heading', { name: 'Estate Planning Made Simple' });
    this.startTodayButton = page.getByRole('button', { name: 'Start Today' }).first();
  }
}

module.exports = { HomeLocators };
