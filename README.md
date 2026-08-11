# Playwright Bootstrap

A fork-friendly JavaScript starter for end-to-end automation using Playwright, Page Objects, Allure, and Netlify-hosted reports. The included examples target Sauce Demo so the project works immediately after setup.

## Quick start

```powershell
npm.cmd install
npx playwright install
Copy-Item .env.example .env
Copy-Item tests/secrets/users.example.js tests/secrets/users.js
npm.cmd test
```

Change `BASE_URL` in `.env` for your application. Update `tests/secrets/users.js` with test credentials; it is ignored by Git.

## Project layout

```
tests/
  fixtures/   Shared Playwright fixtures and page-object wiring
  locators/   Stable selectors, separated from page actions
  pages/      Page Objects; user-facing actions only
  secrets/    Local credentials; only users.example.js is committed
  specs/      Small, readable test scenarios
```

Add matching files under `tests/locators` and `tests/pages`. Keep selectors in the locator class and user-facing actions in the Page Object. Specs should use page-object methods rather than raw selectors.

## Running tests

```powershell
npm.cmd test             # all projects
npm.cmd run test:ui      # Playwright UI mode
npm.cmd run test:headed  # headed browser
npm.cmd run test:smoke   # @smoke-tagged tests
npm.cmd run report:playwright
```

## Allure reports

The `allure-playwright` reporter writes result files after every test run.

```powershell
npm.cmd run report:allure           # generate and open locally
npm.cmd run report:allure:generate  # generate static site only
```

## Deploy the Allure report to Netlify

Netlify CLI is installed as a project dependency; no global install is required.

```powershell
npx netlify login
npx netlify init
npm.cmd run deploy              # deploy the generated report and print the Unique Deploy URL
```

`netlify.toml` publishes `allure-report`. The deploy script uses `netlify deploy --prod --no-build` so Netlify uploads the already-generated report and prints the immutable Unique Deploy URL for that report run. For CI, set `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` as secure environment variables, run tests, then run `npm run deploy`.

## Customization checklist

1. Replace `BASE_URL` and the example Sauce Demo pages/specs.
2. Add environment-specific `.env` values outside source control.
3. Set CI variables and choose the browser projects you support.
4. Follow [PLAYWRIGHT_STANDARDS.md](./PLAYWRIGHT_STANDARDS.md) for every new test.
