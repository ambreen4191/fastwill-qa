// The FastWill homepage renders both a desktop and a mobile version of every
// header CTA — the header nav has:
//   <form class="hidden lg:block">…Start Today…</form>   ← desktop-only
//   <div class="lg:hidden">…Start Today…</div>            ← mobile-only
// plus a mobile-menu-overlay clone and a hero-section CTA at the bottom.
// A bare `.first()` picks whichever is first in DOM order — usually the
// desktop copy — even when the mobile viewport has hidden it, leading to
// intermittent click-doesn't-navigate flakes when the visible copy differs
// from the DOM-first copy. Filtering to visible elements ensures we always
// interact with the CTA the user actually sees.
const firstVisible = (locator) => locator.filter({ visible: true }).first();

class HomeLocators {
  constructor(page) {
    this.logoLink = firstVisible(page.getByRole('link'));
    this.trustLink = firstVisible(page.getByRole('link', { name: 'Trust', exact: true }));
    this.willLink = firstVisible(page.getByRole('link', { name: 'Will', exact: true }));
    this.learnLink = firstVisible(page.getByRole('link', { name: 'Learn', exact: true }));
    this.professionalsLink = firstVisible(page.getByRole('link', { name: 'Professionals', exact: true }));
    this.pricingLink = firstVisible(page.getByRole('link', { name: 'Pricing', exact: true }));
    this.loginLink = firstVisible(page.getByRole('link', { name: 'Log In', exact: true }));
    this.heroHeading = page.getByRole('heading', { name: 'The only estate plan done entirely from home.' });
    this.startTodayButton = firstVisible(page.getByRole('button', { name: 'Start Today' }));
  }
}

module.exports = { HomeLocators };
