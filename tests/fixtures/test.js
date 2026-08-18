const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { WillCreationWizard } = require('../pages/will-creation/WillCreationWizard');

// The sticky cookie banner (id="cookie-banner") sits at the bottom of every
// page and overlaps the sticky footer's Continue / BACK buttons. It's a fixed
// element, so Playwright's action-ability check calls it a click-intercepting
// subtree. Hide it globally so button clicks land cleanly.
const HIDE_COOKIE_BANNER_CSS = `
  #cookie-banner, [id^="cookie-banner"] { display: none !important; }
`;

const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(({ css }) => {
      const inject = () => {
        if (document.getElementById('__hide-cookie-banner')) return;
        const style = document.createElement('style');
        style.id = '__hide-cookie-banner';
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject);
      } else {
        inject();
      }
    }, { css: HIDE_COOKIE_BANNER_CSS });
    await use(page);
  },
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  willCreationWizard: async ({ page }, use) => use(new WillCreationWizard(page)),
});
module.exports = { test, expect };
