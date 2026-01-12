import { allure, expect } from 'allure-playwright';
import { getLocator, smokePage } from '../pages/smoke.page';
import COMMON from '../utils/common.json';

import assert from 'assert';

export const smokeSteps = (page) => {

    return {
        async openHomePage() {
            await allure.step('Open home page', async () => {
                await page.goto(COMMON.baseURL);
            });
        },

        async verifyNavigationLinks() {
            await allure.step('Verify navigation links', async () => {
                const trustLink = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.trustTxt, exact: true });
                await expect(trustLink).toBeVisible();

                const willLink = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.willTxt, exact: true });
                await expect(willLink).toBeVisible();

                const learnLink = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.learnTxt, exact: true });
                await expect(learnLink).toBeVisible();

                const professionalsLink = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.professionalsTxt, exact: true });
                await expect(professionalsLink).toBeVisible();


            });
        },
        async verifyButtonsOnRightHand() {
            await allure.step("Verify Login and Start Today button on Top Right", async () => {
                const login = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.log_inTxt, exact: true });
                await expect(login).toBeVisible();

                const startToday = page.locator(smokePage.homeHeader).getByRole('button', { name: smokePage.startTodayTxt, exact: true });
                await expect(startToday).toBeVisible();

            })
        },
        async verifyBannerText() {
            await allure.step("Check banner text 'Estate Planning Banner Text'", async () => {
                const bannerHeading = page.getByRole('heading', { name: smokePage.bannerHeadingEstatePlanning });
                await expect(bannerHeading).toBeVisible();
            })
        },
        async verifyFooterNavigationLinks() {
            await allure.step('Verify the footer navigation links', async () => {
                // Trust link
                const trustFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.trustTxt, exact: true });
                await trustFooter.scrollIntoViewIfNeeded();
                await expect(trustFooter).toBeVisible();
                await trustFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.trustPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.trustPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Trust URL is correct: ${page.url()}`);
                await page.goBack();

                // Will link
                const willFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.willTxt, exact: true });
                await willFooter.scrollIntoViewIfNeeded();
                await expect(willFooter).toBeVisible();
                await willFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.willPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.willPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Will URL is correct: ${page.url()}`);
                await page.goBack();

                // Learn link
                const learnFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.learnTxt, exact: true });
                await learnFooter.scrollIntoViewIfNeeded();
                await expect(learnFooter).toBeVisible();
                await learnFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.learnPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.learnPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Learn URL is correct: ${page.url()}`);
                await page.goBack();

                // Professionals link
                const professionalsFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.professionalsTxt, exact: true });
                await professionalsFooter.scrollIntoViewIfNeeded();
                await expect(professionalsFooter).toBeVisible();
                await professionalsFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.professionalsPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.professionalsPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Professionals URL is correct: ${page.url()}`);
                await page.goBack();

                // Privacy Policy link
                const privacyFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.privacyPolicyTxt, exact: true });
                await privacyFooter.scrollIntoViewIfNeeded();
                await expect(privacyFooter).toBeVisible();
                await privacyFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.privacyPolicyPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.privacyPolicyPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Privacy Policy URL is correct: ${page.url()}`);
                await page.goBack();

                // Terms of Service link
                const termsFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.termsServiceTxt, exact: true });
                await termsFooter.scrollIntoViewIfNeeded();
                await expect(termsFooter).toBeVisible();
                await termsFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.termsServicesPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.termsServicesPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Terms of Service URL is correct: ${page.url()}`);
                await page.goBack();

                // Social links

                const facebookLink = page.getByRole('link', { name: smokePage.facebookLable, exact: true });
                await facebookLink.scrollIntoViewIfNeeded();
                await expect(facebookLink).toBeVisible();
                await facebookLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.facebookPageURL, `Navigation failed! Expected URL: ${COMMON.facebookPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Facebook URL is correct: ${page.url()}`);
                await page.goBack();

                const instagramLink = page.getByRole('link', { name: smokePage.instagramLable, exact: true });
                await instagramLink.scrollIntoViewIfNeeded();
                await expect(instagramLink).toBeVisible();
                await instagramLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.instagramPageURL, `Navigation failed! Expected URL: ${COMMON.instagramPageURL}, but got: ${page.url()}`);
                console.log(`Navigation success! Instagram URL is correct: ${page.url()}`);
                await page.goBack();

                const linkedInLink = page.getByRole('link', { name: smokePage.linkedInLable, exact: true });
                await linkedInLink.scrollIntoViewIfNeeded();
                await expect(linkedInLink).toBeVisible();
                await linkedInLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url().includes(smokePage.linkedInPage), `Navigation failed! Expected URL: ${smokePage.linkedInPage}, but got: ${page.url()}`);
                console.log(`Navigation success! LinkedIn URL is correct: ${page.url()}`);
                await page.goBack();
            });
        },
        async clickStartTodayButton() {
            await allure.step('Click start today button', async () => {
                const startTodayButton = page.locator(smokePage.homeHeader).getByRole('button', { name: smokePage.startTodayTxt, exact: true });
                await startTodayButton.click();
            })
        },
        async verifyStartTodayScreenElementsVisible(fullName) {
            await allure.step("Verify 'Welcome to FastWill','First, what's your name?', 'Enter your name' and 'Continue' are visible", async () => {

                const wellcomeFastWill = page.getByRole('heading', { name: smokePage.welcomeFastwillTxt, exact: true });
                await expect(wellcomeFastWill).toBeVisible();
                const firstNameQuestionHeading = page.getByRole('heading', { name: smokePage.headingFirstNameTxt, exact: true });
                await expect(firstNameQuestionHeading).toBeVisible();
                const enterName = page.getByRole('textbox', { name: smokePage.namePlaceholderTxt, exact: true });
                await expect(enterName).toBeVisible();

                const continueButton = page.getByRole('button', { name: smokePage.continueTxt, exact: true });
                await expect(continueButton).toBeVisible();

                await this.enterUserFullName(fullName);
                await expect(continueButton).toBeEnabled();
            })
        },
        async clickOnLog_inTextLink() {
            await allure.step("Click on Log in Text Link", async () => {
                const log_inButton = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.log_inTxt, exact: true });
                await log_inButton.click();
            })
        },
        async enterUserFullName(fullName) {
            await allure.step("Verify user full name is entered", async () => {
                const enterName = page.getByRole('textbox', { name: smokePage.namePlaceholderTxt, exact: true });
                await enterName.fill(fullName)
                await expect(enterName).not.toHaveValue('');
            })
        },
        async enterUserEmail(email) {
            await allure.step("Enter user email", async () => {
                await page.waitForLoadState("load");
                const enterEmail = page.locator(smokePage.emailId);
                await enterEmail.fill(email)
                await expect(enterEmail).not.toHaveValue('');
            })
        },
        async enterUserPassword(password) {
            await allure.step("Enter user password", async () => {
                const enterPassword = page.locator(smokePage.passwordId);
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async clickOnLog_inButton() {
            await allure.step("Click on Log In button to login user", async () => {
                const log_inButton = page.getByRole('button', { name: smokePage.log_inTxt, exact: true });
                await log_inButton.click();
                await page.waitForLoadState("load");
            })
        },

        async clickOnProfile() {
            await allure.step("Click on Profile image on right side", async () => {
                const profileImage = page.locator(smokePage.xPathProfile);
                await profileImage.click();
            })
        },

        async clickOnLogoutFromProfileDropdown() {
            await allure.step("Log out user from profile dropdown", async () => {
                const logoutButton = page.locator(smokePage.xpathAccountDropdown).getByRole('button', { name: smokePage.logoutTxt, exact: true });
                await logoutButton.click();
            })
        },

        async selectItemFromDropDown(enterValue, selectValue) {
            await allure.step(`Select the item from dropdown ${selectValue}`, async () => {
                const enterValueTxtField = page.getByPlaceholder(getLocator(selectValue))
                await enterValueTxtField.click(); // ensure field is focused
                await enterValueTxtField.type(enterValue, { delay: 50 });
                const selectFromDropDown = page.getByText(selectValue)
                selectFromDropDown.click();
            })
        },
        async clickOnContinueButton() {
            await allure.step('Click on Contiue button', async () => {
                const continueButton = page.getByRole('button', { name: smokePage.continueTxt, exact: true });
                continueButton.click();
            })
        }



    };
};
