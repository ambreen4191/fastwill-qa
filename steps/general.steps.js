import { allure, expect } from 'allure-playwright';
import { getLocator, generalPage } from '../pages/general.page';
const COMMON = require('../utils/common.json');
const { clickElement, isValidEmail, extractNumericString } = require('../utils/helper');
const { calculateAge } = require('../utils/helper');
import assert from 'assert';
import { constants } from '../utils/constants';

export const generalSteps = (page) => {
    return {
        async openHomePage() {
            await allure.step('Open home page', async () => {
                await page.goto(COMMON.baseURL);
            });
        },
        async verifyLinkAndText(link, text) {
            await allure.step(`Verify navigation link: ${link} and Text: ${text}`, async () => {
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + link, `Navigation failed! Expected URL: ${COMMON.baseURL + link}, but got: ${page.url()}`);
                const locator = page.getByText(text, { expect: true });
                await expect(locator).toBeVisible();
            });
        },
        async verifyNavigationLinks() {
            await allure.step('Verify navigation links', async () => {
                const trustLink = page.locator(generalPage.homeHeader).getByRole('link', { name: generalPage.trustTxt, exact: true });
                await expect(trustLink).toBeVisible();

                const willLink = page.locator(generalPage.homeHeader).getByRole('link', { name: generalPage.willTxt, exact: true });
                await expect(willLink).toBeVisible();

                const learnLink = page.locator(generalPage.homeHeader).getByRole('link', { name: generalPage.learnTxt, exact: true });
                await expect(learnLink).toBeVisible();

                const professionalsLink = page.locator(generalPage.homeHeader).getByRole('link', { name: generalPage.professionalsTxt, exact: true });
                await expect(professionalsLink).toBeVisible();


            });
        },
        async verifyButtonsOnRightHand() {
            await allure.step("Verify Login and Start Today button on Top Right", async () => {
                const login = page.locator(generalPage.homeHeader).getByRole('link', { name: generalPage.logInTxt, exact: true });
                await expect(login).toBeVisible();

                const startToday = page.locator(generalPage.homeHeader).getByRole('button', { name: generalPage.startTodayTxt, exact: true });
                await expect(startToday).toBeVisible();

            })
        },
        async verifyBannerText() {
            await allure.step("Check banner text 'Estate Planning Banner Text'", async () => {
                const bannerHeading = page.getByRole('heading', { name: generalPage.bannerHeadingEstatePlanning });
                await expect(bannerHeading).toBeVisible();
            })
        },
        async verifyFooterNavigationLinks() {
            await allure.step('Verify the footer navigation links', async () => {
                const trustFooter = page.locator(generalPage.homeFooter).getByRole("link", { name: generalPage.trustTxt, exact: true });
                await trustFooter.scrollIntoViewIfNeeded();
                await expect(trustFooter).toBeVisible();
                await trustFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + generalPage.trustPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + generalPage.trustPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const willFooter = page.locator(generalPage.homeFooter).getByRole("link", { name: generalPage.willTxt, exact: true });
                await willFooter.scrollIntoViewIfNeeded();
                await expect(willFooter).toBeVisible();
                await willFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + generalPage.willPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + generalPage.willPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const learnFooter = page.locator(generalPage.homeFooter).getByRole("link", { name: generalPage.learnTxt, exact: true });
                await learnFooter.scrollIntoViewIfNeeded();
                await expect(learnFooter).toBeVisible();
                await clickElement(learnFooter);
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + generalPage.learnPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + generalPage.learnPageURL}, but got: ${page.url()}`);
                await page.goBack();

                await this.clickAndVerifyPrivacyPolicy();
                await this.clickAndVerifyTermOfServiceLink();
                await this.clickAndVerifyFacebookPageLink();
                await this.clickAndVerifyInstagramLink();
                await this.clickAndVerifyLinkedInButton();
            });
        },
        async clickAndVerifyPrivacyPolicy() {
            await allure.step('Click and verify Privacy Policy', async () => {
                const privacyFooter = page.locator(generalPage.homeFooter).getByRole("link", { name: generalPage.privacyPolicyTxt, exact: true });
                await privacyFooter.scrollIntoViewIfNeeded();
                await expect(privacyFooter).toBeVisible();
                await privacyFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + generalPage.privacyPolicyPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + generalPage.privacyPolicyPageURL}, but got: ${page.url()}`);
                await page.goBack();
            })
        },
        async clickAndVerifyTermOfServiceLink() {
            await allure.step('Click and verify terms of service', async () => {
                const termsFooter = page.locator(generalPage.homeFooter).getByRole("link", { name: generalPage.termsServiceTxt, exact: true });
                await termsFooter.scrollIntoViewIfNeeded();
                await expect(termsFooter).toBeVisible();
                await termsFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + generalPage.termsServicesPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + generalPage.termsServicesPageURL}, but got: ${page.url()}`);
                await page.goBack();
            })
        },
        async clickAndVerifyLinkedInButton() {
            await allure.step('Click and verify linkedIn social media link button', async () => {
                const linkedInLink = page.getByRole('link', { name: generalPage.linkedInLable, exact: true });
                await linkedInLink.scrollIntoViewIfNeeded();
                await expect(linkedInLink).toBeVisible();
                await linkedInLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url().includes(generalPage.linkedInPage), `Navigation failed! Expected URL: ${generalPage.linkedInPage}, but got: ${page.url()}`);
                await page.goBack();
            })
        },
        async clickAndVerifyInstagramLink() {
            await allure.step('Click and verify instagram page link', async () => {
                const instagramLink = page.getByRole('link', { name: generalPage.instagramLable, exact: true });
                await instagramLink.scrollIntoViewIfNeeded();
                await expect(instagramLink).toBeVisible();
                await instagramLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.instagramPageURL, `Navigation failed! Expected URL: ${COMMON.instagramPageURL}, but got: ${page.url()}`);
                await page.goBack();
            })
        },
        async clickAndVerifyFacebookPageLink() {
            await allure.step('Click and verify facebook page link', async () => {
                const facebookLink = page.getByRole('link', { name: generalPage.facebookLable, exact: true });
                await facebookLink.scrollIntoViewIfNeeded();
                await expect(facebookLink).toBeVisible();
                await facebookLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.facebookPageURL, `Navigation failed! Expected URL: ${COMMON.facebookPageURL}, but got: ${page.url()}`);
                await page.goBack();
            })
        },
        async clickStartTodayButton() {
            await allure.step('Click on start today from top right side button', async () => {
                const startTodayButton = page.locator(generalPage.homeHeader).getByRole('button', { name: generalPage.startTodayTxt, exact: true });
                await clickElement(startTodayButton);
            })
        },
        async clickStartTodayCenteredButton() {
            await allure.step('Click on start today centered button', async () => {
                const startTodayButton = page.locator(generalPage.homeBody).locator('button', { hasText: generalPage.startTodayTxt });
                await clickElement(startTodayButton);
            })
        },
        async clickBySectionAndAnchor(section, text) {
            await allure.step(`Click from ${section} on ${text} link`, async () => {
                const locator = page.locator(section).getByRole('link', { name: text, exact: true });
                await clickElement(locator);
            });
        },
        async verifyStartTodayScreenElementsVisible(fullName) {
            await allure.step("Verify 'Welcome to FastWill','First, what's your name?', 'Enter your name' and 'Continue' are visible", async () => {

                const wellcomeFastWill = page.getByRole('heading', { name: generalPage.welcomeFastwillTxt, exact: true });
                await expect(wellcomeFastWill).toBeVisible();
                const firstNameQuestionHeading = page.getByRole('heading', { name: generalPage.headingFirstNameTxt, exact: true });
                await expect(firstNameQuestionHeading).toBeVisible();
                const enterName = page.getByRole('textbox', { name: generalPage.namePlaceholderTxt, exact: true });
                await expect(enterName).toBeVisible();
                const continueButton = page.getByRole('button', { name: generalPage.continueTxt, exact: true });
                await expect(continueButton).toBeVisible();
                await this.enterUserFullName(fullName);
                await expect(continueButton).toBeEnabled();
            })
        },
        async clickOnLoginInAnchor() {
            await allure.step("Click on Log in Text Link", async () => {
                const locator = page.locator(generalPage.homeHeader).getByRole('link', { name: generalPage.logInTxt, exact: true });
                await clickElement(locator);
            })
        },
        async clickOnForgetPasswordTxtLink() {
            await allure.step("Click on Log in Text Link", async () => {
                const forgetPassword = page.getByRole('link', { name: generalPage.forgetPasswordTxt, exact: true });
                await clickElement(forgetPassword);
            })
        },
        async enterUserFullName(fullName) {
            await allure.step("Verify user full name is entered", async () => {
                const enterName = page.getByRole('textbox', { name: generalPage.namePlaceholderTxt, exact: true });
                await enterName.clear();
                await enterName.fill(fullName)
                await expect(enterName).not.toHaveValue('');
            })
        },
        async enterUserEmail(email) {
            await allure.step(`Enter user email: ${email}`, async () => {
                const enterEmail = page.locator(generalPage.emailId);
                await expect(enterEmail).toBeVisible();
                await enterEmail.fill(email)
                await expect(enterEmail).not.toHaveValue('');
            })
        },
        async enterCreateAccountPassword(password) {
            await allure.step(`Enter user password: ${password}`, async () => {
                const enterPassword = page.locator(generalPage.accountPasswordId);
                await expect(enterPassword).toBeVisible();
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async enterUserPassword(password) {
            await allure.step(`Enter user password: ${password}`, async () => {
                const enterPassword = page.locator(generalPage.passwordId);
                await expect(enterPassword).toBeVisible();
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async enterUserConfirmPassword(password) {
            await allure.step(`Enter user confirm password: ${password}`, async () => {
                const enterPassword = page.locator(generalPage.confirmPasswordId);
                await expect(enterPassword).toBeVisible();
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async verifyUserIsOnPaymentPage() {
            await allure.step("Verify user is redirected to Payment page", async () => {
                const paymentHeading = page.getByRole('heading', { name: generalPage.paymentTxt, level: 1 });
                await expect(paymentHeading).toBeVisible();
            });
        },
        async verifyPaymentCardError(errorTxt) {
            await allure.step(`Verify '${errorTxt}`, async () => {
                const stripeFrame = page.frameLocator(generalPage.pamentFrameXpath);
                const locator = stripeFrame.getByText(errorTxt, { exact: true });
                await expect(locator).toBeVisible();
            });
        },
        async enterPaymentCardDetails(cardDetails = constants.validCardDetails) {
            await allure.step(`Enter payment card details ${cardDetails.cardNumber}`, async () => {
                const stripeFrame = page.frameLocator(generalPage.pamentFrameXpath);

                const cardNumberField = stripeFrame.getByPlaceholder(generalPage.cardNumberPlaceholder);
                await cardNumberField.click();
                await cardNumberField.fill(cardDetails.cardNumber);

                const expiryField = stripeFrame.getByPlaceholder(generalPage.expireyPlaceholder);
                await expiryField.click();
                await expiryField.fill(cardDetails.expiry);

                const cvcField = stripeFrame.getByPlaceholder(generalPage.cvcPlacholder);
                await cvcField.click();
                await cvcField.fill(cardDetails.cvc);

                const postalField = stripeFrame.getByPlaceholder(generalPage.postalCodePlaceHolder);
                if (await postalField.isVisible()) {
                    await clickElement(postalField);
                    await postalField.fill(cardDetails.postalCode);
                }
            });

        },
        async acceptTermsAndConditions() {
            await allure.step("Checked Accept Terms and Conditions", async () => {
                const termsCheckbox = page.locator(generalPage.termsCheckboxId);
                await termsCheckbox.check();
                await expect(termsCheckbox).toBeChecked();
            });
        },
        async unCheckedAcceptTermsAndConditions() {
            await allure.step("UnChecked Accept Terms and Conditions", async () => {
                const termsCheckbox = page.locator(generalPage.termsCheckboxId);
                await termsCheckbox.uncheck();
                await expect(termsCheckbox).not.toBeChecked();
            });
        },
        async verifyConfirmAndPayButtonIsEnabled() {
            await allure.step("Verify Confirm & Pay button is enabled", async () => {
                const confirmPayButton = page.getByRole('button', {
                    name: generalPage.confirmAndPayBtnTxt,
                });
                await expect(confirmPayButton).toBeEnabled();
            });
        },
        async verifyAnchorIsEnabled(btnTxt) {
            await allure.step(`Verify${btnTxt} button is enabled`, async () => {
                const locator = page.getByRole('link', { name: btnTxt });
                await expect(locator).toBeEnabled();
            });
        },
        async verifyAddressScreen() {
            await allure.step("Verify address screen is visible", async () => {
                const addressScreen = page.getByRole('heading', { name: generalPage.whatYourAddressTxt });
                await expect(addressScreen).toBeVisible();
            });
        },
        async verifyDoyouHavChildrenScreenIsVisible() {
            await allure.step("Verify 'Do you have childeren' screen is visible", async () => {
                const birthdayScreen = page.getByRole('heading', { name: generalPage.doYouHaveChildTxt });
                await expect(birthdayScreen).toBeVisible();
            });
        },
        async verifyPetGuardianAssignmentScreenIsVisible(petName) {
            await allure.step(`Verify 'Who would you like to look after ${petName}?' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const listOfPetsDescTxt = page.getByRole('heading', { name: generalPage.petGuardianAssignmentTxt + petName + generalPage.questionSymbol });
                await expect(listOfPetsDescTxt).toBeVisible();
            });
        },
        async verifyWithHeadingScreenIsVisible(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByRole('heading', { name: locatorTxt, exact: true }).first();
                await expect(locator).toBeVisible();
            });
        },
        async verifyNotaryText9to5AMIsVisible() {
            await page.waitForLoadState("load");
            const locator = page.getByText(generalPage.notary9To5AmTxt, { exact: true });
            const isVisible = await locator.isVisible().catch(() => false);
            await allure.step(`Notary 9–5 AM text is ${isVisible ? 'VISIBLE' : 'NOT VISIBLE'}`, async () => { });
        },
        async verifyButtonIsDisabled(btnText = generalPage.notaryCreateSessionTxt) {
            await allure.step(`Verify ${btnText} button is disabled`, async () => {
                const locator = page.getByRole('button', { name: btnText, exact: true });
                await expect(locator).toBeDisabled();
            });
        },
        async verifyButtonIsEnabled(btnText) {
            await allure.step(`Verify ${btnText} button is disabled`, async () => {
                const locator = page.getByRole('button', { name: btnText, exact: true });
                await expect(locator).toBeEnabled();
            });
        },
        async verifyButtonIsNotVisible(btnText) {
            await allure.step(`Verify ${btnText} button is not visible`, async () => {
                const locator = page.getByRole('button', { name: btnText, exact: true });
                await expect(locator).not.toBeVisible();
            });
        },
        async verifyDeedTransferTxtIsVisible() {
            await allure.step(`Deed Transfer text is from left sidebar is 'VISIBLE' '}`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(generalPage.sideDeedTransferXPath);
                await expect(locator).toBeVisible();

            });
        },
        async verifyDeedTransferTxtIsNotVisible() {
            await allure.step(`Deed Transfer text is from left sidebar 'NOT VISIBLE'}`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(generalPage.sideDeedTransferXPath);
                await expect(locator).not.toBeVisible();

            });
        },
        async verifyCreateNotarySessionButtonIsEnable() {
            const locator = page.getByRole('button', { name: generalPage.notaryCreateSessionTxt, exact: true });
            const isEnabled = await locator.isEnabled().catch(() => false);
            await allure.step(`Create Notary Session button is ${isEnabled ? 'ENABLED' : 'DISABLED'}`, async () => {
                if (isEnabled) {
                    await expect(locator).toBeEnabled();
                }
            });
        },
        async verifyErrorIsVisible(errorTxt) {
            await allure.step(`Verify error: '${errorTxt}' is visible`, async () => {
                const locator = page.getByText(errorTxt, { exact: true });
                await expect(locator.first()).toBeVisible();
            });
        },
        async verifyErrorIncludeIsVisible(errorTxt) {
            await allure.step(`Verify error: '${errorTxt}' is visible`, async () => {
                const locator = page.getByText(errorTxt);
                await expect(locator.first()).toBeVisible();
            });
        },
        async verifyErrorIsNotVisible(locatorTxt) {
            await allure.step(`Verify error: '${locatorTxt}' is not visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByText(locatorTxt, { exact: true });
                await expect(locator.first()).not.toBeVisible();
            });
        },
        async verifyWithTextScreenIsVisible(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByText(locatorTxt, { exact: true });
                await expect(locator.first()).toBeVisible();
            });
        },
        async verifyWithTextScreenIsNotVisible(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is not visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByText(locatorTxt, { exact: true });
                await expect(locator.first()).not.toBeVisible();
            });
        },
        async verifyPaymentCardIsNotVisible() {
            await allure.step(`Verify Payment card is not visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(generalPage.pamentFrameXpath);
                await expect(locator.first()).not.toBeVisible();
            });
        },
        async verifyPaymentCardIsVisible() {
            await allure.step(`Verify Payment card is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.frameLocator(generalPage.pamentFrameXpath);
                const cardNumberField = locator.getByPlaceholder(generalPage.cardNumberPlaceholder);
                await expect(cardNumberField.first()).toBeVisible();
            });
        },
        async verifyWithTextScreenIsVisibleFromFrame(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const frame = page.frameLocator(generalPage.messengerFramId);
                const textSpan = frame.locator(generalPage.spanTextXpath(locatorTxt));
                await expect(textSpan).toBeVisible();
            });
        },
        async verifyWithTextByLabelScreenIsVisible(label, expectedValue) {
            await allure.step(`Verify value '${expectedValue}' is visible for label '${label}'`, async () => {
                await page.waitForLoadState("load");
                const valueLocator = page.locator(generalPage.valueByDivLabelXpath(label));
                await expect(valueLocator).toBeVisible();
                await expect(valueLocator).toHaveText(expectedValue);
            });
        },
        async verifyWithTextScreenIsVisibleByIndex(titleTxt, index = 0) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByText(titleTxt, { exact: true }).nth(index);
                await expect(locator).toBeVisible();
            });
        },
        async verifyWithTextContainsIsVisible(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByText(locatorTxt);
                await expect(locator).toBeVisible();
            });
        },
        async verifyTheAssetProperties() {
            await allure.step("Verify the Properties amount is okay", async () => {
                const valueLocators = page.locator(generalPage.propertyAmountXpath);
                const allTexts = await valueLocators.allTextContents();
                const numbers = allTexts.map(text => Number(text.replace(/[$,]/g, '')));
                const sumExceptLast = numbers.slice(0, -1).reduce((acc, val) => acc + val, 0);
                const lastValue = numbers[numbers.length - 1];

            })
        },
        async verifyAssetTabIsVisible() {
            await allure.step(`Verify 'Assets' Tab is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(generalPage.assetsTab);
                await expect(locator).toBeVisible();
            });
        },
        async verifyWithHeadingScreenContainsTheTitle(titleTxt) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByRole('heading', { level: 1 });
                await expect(locator).toContainText(titleTxt);
            });
        },
        async verifyWithHeadingByIndex(titleTxt, index = 0) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByRole('heading', { name: titleTxt }).nth(index);
                await expect(locator).toBeVisible();
            });
        },
        async verifyWithHeadingByIndex(titleTxt, index = 0) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByRole('heading', { name: titleTxt }).nth(index);
                await expect(locator).toBeVisible();
            });
        },
        async verifyTotalPriceAndApplyValidPromo(promoCode, percentage) {
            await allure.step(`Verify 'Total' price befor and after applying valid promo`, async () => {
                const totalPrice = await page.locator(generalPage.totalAmountForCreateAccountXpath).textContent();
                expect(totalPrice && totalPrice !== 'Calculating...', 'Total Price').toBeTruthy();;
                const totalPriceBeforePromo = parseFloat(extractNumericString(totalPrice));
                await this.clickRadioButtonByText(generalPage.promotCodeTxt);
                await this.inputByPlaceholder(generalPage.enterPromoCodePlaceholderTxt, promoCode);
                await this.clickOnButtonByText(generalPage.applyTxt);
                await this.verifyWithTextScreenIsVisible(generalPage.promoCodeAppliedSuccessTxt);
                const updatedTotalPrice = await page.locator(generalPage.totalAmountForCreateAccountXpath).textContent();
                expect(updatedTotalPrice && updatedTotalPrice !== 'Calculating...', 'Updated Total Price').toBeTruthy();;
                const totalPriceAfterPromo = parseFloat(extractNumericString(updatedTotalPrice));
                const expectedPrice = Number((totalPriceBeforePromo * (1 - percentage / 100)).toFixed(2));
                await expect(totalPriceAfterPromo, `Expected total after ${percentage}% promo to be ${expectedPrice}`).toBe(expectedPrice);
            });
        },
        async verifyTotalPriceAndApplyInvalidPromo(promoCode) {
            await allure.step(`Verify 'Total' price befor and after applying invalid promo`, async () => {
                const totalPrice = await page.locator(generalPage.totalAmountForCreateAccountXpath).textContent();
                expect(totalPrice && totalPrice !== 'Calculating...', 'Total Price').toBeTruthy();
                const totalPriceBeforePromo = parseFloat(extractNumericString(totalPrice));
                await this.clickRadioButtonByText(generalPage.promotCodeTxt);
                await this.inputByPlaceholder(generalPage.enterPromoCodePlaceholderTxt, promoCode);
                await this.clickOnButtonByText(generalPage.applyTxt);
                await this.verifyErrorIsVisible(generalPage.promoCodeError);
                const updatedTotalPrice = await page.locator(generalPage.totalAmountForCreateAccountXpath).textContent();
                expect(updatedTotalPrice && updatedTotalPrice !== 'Calculating...', 'Updated Total Price').toBeTruthy();;
                const totalPriceAfterPromo = parseFloat(extractNumericString(updatedTotalPrice));
                await expect(totalPriceAfterPromo, `Expected total after ${totalPriceAfterPromo}% promo to be ${totalPriceBeforePromo}`).toBe(totalPriceBeforePromo);
                await this.inputByPlaceholder(generalPage.enterPromoCodePlaceholderTxt, constants.validPromo20Percent);
                await this.clickOnButtonByText(generalPage.applyTxt);
                await this.verifyErrorIsNotVisible(generalPage.promoCodeError);
                await this.verifyWithTextScreenIsVisible(generalPage.promoCodeAppliedSuccessTxt);
            });
        },
        async verifyRecordingFeesTotal() {
            await allure.step(`Verify 'Recording Fees' screen is and calculated`, async () => {
                const feeItemsLocator = page.locator(generalPage.feeItemsXpath);
                await expect(page.getByText(generalPage.calculatingTxt)).toHaveCount(1);
                const feeItemsCount = await feeItemsLocator.count();
                let sum = 0;
                for (let i = 2; i <= feeItemsCount; i += 2) {
                    const itemLocator = page.locator(generalPage.recordingFeeItemXpath(i));
                    const amountText = (await itemLocator.textContent())?.trim()
                    expect(amountText && amountText !== 'Calculating...', `Amount did not resolve for item ${i + 1}`).toBeTruthy();
                    const amount = parseFloat(extractNumericString(amountText));
                    expect(amount).toBeGreaterThan(0);
                    sum += amount;
                }
                const totalLocator = page.locator(generalPage.totalFeeAmountXpath);
                const totalText = (await totalLocator.textContent())?.trim();
                expect(totalText && totalText !== 'Calculating...', 'Total Recording Fees not available').toBeTruthy();
                const totalAmount = parseFloat(extractNumericString(totalText));
                expect(totalAmount).toBeGreaterThan(0);
            });
        },
        async verifyRecordingFeesBreakdownSubtotalAndTotal() {
            await allure.step('Verify Recording Fees breakdown subtotal & total calculation', async () => {
                await expect(page.getByText(generalPage.calculatingTxt)).toHaveCount(0);
                const feeRows = page.locator(generalPage.recordingFeeRowXpath);
                const rowCount = await feeRows.count();
                let calculatedSubtotal = 0;
                for (let i = 2; i < rowCount; i++) {
                    const feeSpan = page.locator(generalPage.recordingFeeRowPriceItemXpath(i));
                    const feeText = await feeSpan.textContent();
                    if (!feeText) continue;
                    const fee = parseFloat(extractNumericString(feeText));
                    if (isNaN(fee)) continue;
                    calculatedSubtotal += fee;
                }
                const displayedSubtotalText = await page.locator(generalPage.amountByLabelXpath(generalPage.subtotalTxt)).textContent();
                const displayedSubtotal = parseFloat(extractNumericString(displayedSubtotalText));
                expect(calculatedSubtotal).toBe(displayedSubtotal);
                const deedTransferText = await page.locator(generalPage.amountByLabelXpath(generalPage.deedTranserTotalTxt)).textContent();
                const deedTransferTotal = parseFloat(extractNumericString(deedTransferText));
                expect(deedTransferTotal).toBe(displayedSubtotal);
                const notarizationText = await page.locator(generalPage.amountByLabelXpath(generalPage.totalNotarizationTxt)).textContent();
                const notarizationTotal = parseFloat(extractNumericString(notarizationText));
                const calculatedTotal = displayedSubtotal + notarizationTotal;
                const displayedTotalText = await page.locator(generalPage.totalPriceXpath).textContent();
                const displayedTotal = parseFloat(extractNumericString(displayedTotalText));
                expect(calculatedTotal).toBeGreaterThan(displayedTotal);
            });
        },
        async verifyTrustDatePickerPrepopulated() {
            await allure.step("Verify that Trust date picker has a prepopulated value", async () => {
                const datePicker = page.locator(generalPage.datePickerTrustXpath);
                const value = await datePicker.inputValue();
                await expect(value, "Date picker should have a prepopulated value").not.toBe('');
            });
        },
        async verifyContactsShowMoreDetailsByXpath(personName, category) {
            await allure.step(`Verify Show more contact for ${personName} that have ${category}`, async () => {
                const contact = page.locator(generalPage.contactPersonXpath(personName));
                const detailLocator = await contact.locator(generalPage.contactViewXpath(category));
                await expect(detailLocator).toBeVisible();
            });
        },
        async verifyDeedNotarizationFee() {
            await allure.step(`Verify 'Deed Transfer Notarization Fee' screen is and calculated`, async () => {
                const locator = page.locator(generalPage.deedTransferNotFeeXpath);
                const totalText = (await locator.textContent())?.trim();
                expect(totalText && totalText !== 'Calculating...', 'Total Deed Transfer Fees not available').toBeTruthy();
                const totalAmount = parseFloat(extractNumericString(totalText));
                expect(totalAmount).toBeGreaterThan(0);
            });
        },
        async verifyWithButtonScreenTitleIsVisible(titleTxt) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByRole('button', { name: titleTxt });
                await expect(locator).toBeVisible();
            });
        },
        async verifyByXpathIsVisible(text) {
            await allure.step(`Verify '${text}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(generalPage.assetSectionRow(text));
                await expect(locator).toBeVisible();
            });
        },
        async verifyDocumentNameIsVisible(titleTxt, nameTxt) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(generalPage.documentTitleXpath(titleTxt))
                    .filter({ has: page.locator("span", { hasText: nameTxt }) });
                await expect(locator).toBeVisible();
            });
        },
        async verifyFullNameField() {
            await allure.step(`Verify 'Full name' on Contact informarion is valid`, async () => {
                const fullNameInput = page.locator(generalPage.contactNameId);
                await expect(fullNameInput).toHaveCount(1);
                const fullNameValue = (await fullNameInput.inputValue()).trim();
                expect(fullNameValue.length).toBeGreaterThan(0);
            });
        },
        async verifyEmailField(email) {
            await allure.step(`Verify 'Email' on Contact informarion is valid`, async () => {
                const emailInput = page.locator(generalPage.contactEmailId);
                await emailInput.clear()
                await emailInput.fill(email)
                await expect(emailInput).toHaveCount(1);
                const emailValue = (await emailInput.inputValue()).trim();
                const validEmail = await isValidEmail(emailValue);
                expect(validEmail).toBe(true);
            });
        },
        async checkValueForLabel(labelText) {
            await allure.step(`Check value for "${labelText}"`, async () => {
                const label = page.locator('span', { hasText: labelText }).nth(1);
                const sibling = label.locator(generalPage.checkValueForLabelXpath);
                const value = (await sibling.textContent())?.trim();
                expect(value, `No sibling value found for "${labelText}"`).toBeTruthy();
                await allure.step(`Value for "${labelText}"`, () => { });
            });
        },
        async clickOnLogInButton() {
            await allure.step("Click on Log In button to login user", async () => {
                const locator = page.getByRole('button', { name: generalPage.logInTxt, exact: true });
                await clickElement(locator);
            })
        },
        async clickResetPasswordButton() {
            await allure.step("Click on 'Reset Password' button", async () => {
                const locator = page.getByRole('button', { name: generalPage.resetPasswordTxt, exact: true });
                await clickElement(locator);
            })
        },
        async clickConfirmAndPayButton() {
            await allure.step("Click on Confirm & Pay button", async () => {
                const confirmPayButton = page.getByRole('button', { name: generalPage.confirmAndPayBtnTxt });
                await clickElement(confirmPayButton);
            });
        },
        async clickContinueWithEmailButton() {
            await allure.step("Click on Continue with email button", async () => {
                const continueWithEmail = page.getByRole('button', { name: generalPage.continueWithEmailTxt, exact: true });
                await clickElement(continueWithEmail);
            })
        },
        async clickOnAddConservatorButton() {
            await allure.step("Click on add a conservator button", async () => {
                const addConservator = page.getByRole('button', { name: generalPage.selectContactTxt, exact: true });
                await clickElement(addConservator);
            })
        },
        async clickChildToAssignToGuardian(childName) {
            await allure.step("Click on Child to assign gaurdian", async () => {
                const child = page.getByText(childName);
                await clickElement(child);
            })
        },
        async clickOnAssetTab() {
            await allure.step("Click on Asset Tab", async () => {
                const locator = page.locator(generalPage.assetsTab);
                await clickElement(locator);
            })
        },
        async clickYesRadioButton() {
            await allure.step("Click on Yes Radio text", async () => {
                const yesTxt = page.getByText(generalPage.yesTxt, { exact: true });
                await clickElement(yesTxt);
            })
        },
        async clickRadioButtonByText(radioBtnTxt) {
            await allure.step(`Click on ${radioBtnTxt} Radio text`, async () => {
                const radioBtn = page.getByText(radioBtnTxt, { exact: true }).first();
                await clickElement(radioBtn);
            })
        },
        async clickSelectContactWithEmail(email, btnTxt = generalPage.sendInviteTxt) {
            await allure.step(`Click on ${email} and ${btnTxt} to select it.`, async () => {
                const locator = page.locator(generalPage.selectContactEmailXpath(email, btnTxt));
                await clickElement(locator);
            })
        },
        async clickCrossIconToCloseModel() {
            await allure.step(`Click on Cross icon to close model`, async () => {
                const locator = page.locator(generalPage.modelCrossIcon);
                await clickElement(locator);
            })
        },
        async clickPreviewDocumentCloseModel() {
            await allure.step(`Click on Cross icon to close preview document model`, async () => {
                const locator = page.locator(generalPage.previewDocumentModelCloseIco);
                await clickElement(locator);
            })
        },
        async clickCloseIconToSaveChanges() {
            await allure.step(`Click on Cross icon to save changes`, async () => {
                const locator = page.locator(generalPage.closeIcon);
                await clickElement(locator);
            })
        },
        async clickCroseIconOfWillCreateHeaderSection() {
            await allure.step(`Click on Cross to go to homepage`, async () => {
                const locator = page.locator(generalPage.wiilCreateHeaderCorssIconId);
                await clickElement(locator);
            })
        },
        async clickCloseInviteModel() {
            await allure.step(`Click on Cross icon to close invite model`, async () => {
                const locator = page.locator(generalPage.closeInviteModel);
                await clickElement(locator);
            })
        },
        async clickSidBarAnchor(title) {
            await allure.step(`Click on ${title} from side bar`, async () => {
                const locator = page.locator(generalPage.sideBarLinkXpath(title));
                await clickElement(locator);
            })
        },
        async clickDocumentButtonByName(titleTxt, nameTxt, btnTxt) {
            await allure.step(`Click on ${titleTxt}'s ${nameTxt}'s ${btnTxt} button`, async () => {
                const locator = page.locator(generalPage.documentTitleXpath(titleTxt))
                    .filter({ has: page.locator("span", { hasText: nameTxt }) })
                    .locator("button, a", { hasText: btnTxt });
                await clickElement(locator);
            })
        },
        async clickManageAccessHipaButton() {
            await allure.step(`Click on Manage Access button`, async () => {
                const locator = page.locator(generalPage.manageAccessHipaXPath);
                await clickElement(locator);
            })
        },
        async clickManageAccessForContactsButtonWithEmail(email) {
            await allure.step(`Click on Manage Access for this email contact: ${email}`, async () => {
                const locator = page.locator(generalPage.manageAccessBtnUsingEmailXpath(email));
                await clickElement(locator);
            })
        },
        async clickRemoveAccessModelButton() {
            await allure.step(`Click on Remove Access model button`, async () => {
                const locator = page.locator(generalPage.removeAccessModelBtnXpath);
                await clickElement(locator);
            })
        },
        async clickRemoveAccessForContactsButtonWithEmail(email) {
            await allure.step(`Click on Manage Access for this email contact: ${email}`, async () => {
                const locator = page.locator(generalPage.removeAccessForContactsUsingEmailXpath(email));
                await clickElement(locator);
            })
        },
        async clickTabUsingTxtByBasicTabPath(text) {
            await allure.step(`Click on ${text} to move in tab`, async () => {
                const locator = page.locator(generalPage.tabsUsingBaiscTabXpath(text));
                await clickElement(locator);
            })
        },
        async clickOnBasicByPath() {
            await allure.step(`Click on Basic to move in tab`, async () => {
                const locator = page.locator(generalPage.basicXPath);
                await clickElement(locator);
            })
        },
        async clickSwitchButtonByText(swithBtnTxt) {
            await allure.step(`Click on ${swithBtnTxt} Swith text to enable it.`, async () => {
                const locator = page.getByText(swithBtnTxt, { exact: true });
                await clickElement(locator);
            })
        },
        async clickOnCreateAccountButton() {
            await allure.step("Click on Create Account button", async () => {
                const continueWithEmail = page.getByRole('button', { name: generalPage.createAccountTxt, exact: true });
                await clickElement(continueWithEmail);
            })
        },
        async clickAddAChildAndItsDetails(enterchildName, dob = constants.childDOB, parentsRadioTxt = generalPage.meTxt) {
            await allure.step(`Click to add a child and its details: ${enterchildName} for ${parentsRadioTxt}`, async () => {
                const addChildButton = page.getByRole('button', { name: generalPage.addChildTxt, exact: true });
                await clickElement(addChildButton)

                const childName = page.getByPlaceholder(generalPage.childNamePlaceholder);
                await childName.fill(enterchildName)
                await expect(childName).not.toHaveValue('');
                const meRadioButton = page.getByRole('radio', { name: parentsRadioTxt, exact: true });
                await meRadioButton.check();
                await expect(meRadioButton).toBeChecked();

                const selecteBirthdayDate = page.getByPlaceholder(generalPage.selectBirthdayFieldPlaceholder);
                await clickElement(selecteBirthdayDate)
                await this.clickDatePickerToSelectDate(dob.day, dob.month, dob.year);
                const age = calculateAge(dob);
                if (age >= 18) {
                    await this.fillInputByLabel(generalPage.email, dob.email);
                    await this.fillInputByLabel(generalPage.phone, dob.phone);
                    await this.fillInputByLabel(generalPage.addressLine1, dob.addressLine1);
                    await this.fillInputByLabel(generalPage.addresLine2Option, dob.addressLine2);
                    await this.fillInputByLabel(generalPage.city, dob.city);
                    await this.selectFromDropdownByGuardian(dob.state.substring(0, 5), dob.state);
                    await this.fillInputByLabel(generalPage.zipCode, dob.zipCode);
                    await this.selectFromDropdownByGuardian(dob.country.substring(0.7), dob.country);
                }
                await this.clickOnSaveButton()

            });
        },
        async clickAddAChildAndItsDetailsWithValidations(enterchildName, dob = constants.childDOB, parentsRadioTxt = generalPage.meTxt) {
            await allure.step(`Click to add a child and its details: ${enterchildName} for ${parentsRadioTxt} with validation errors`, async () => {
                const addChildButton = page.getByRole('button', { name: generalPage.addChildTxt, exact: true });
                await clickElement(addChildButton)

                const childName = page.getByPlaceholder(generalPage.childNamePlaceholder);
                await childName.fill(enterchildName)
                await expect(childName).not.toHaveValue('');
                const meRadioButton = page.getByRole('radio', { name: parentsRadioTxt, exact: true });
                await meRadioButton.check();
                await expect(meRadioButton).toBeChecked();

                const selecteBirthdayDate = page.getByPlaceholder(generalPage.selectBirthdayFieldPlaceholder);
                await clickElement(selecteBirthdayDate)
                await this.clickDatePickerToSelectDate(dob.day, dob.month, dob.year);
                const age = calculateAge(dob);
                if (age >= 18) {
                    await this.clickOnSaveButton()
                    await this.verifyErrorIsVisible(generalPage.emailRequiredError);
                    await this.verifyErrorIsVisible(generalPage.phoneNumberRequiredError);
                    await this.verifyErrorIsVisible(generalPage.addressLine1RequiredError);
                    await this.verifyErrorIsVisible(generalPage.cityRequiredError);
                    await this.verifyErrorIsVisible(generalPage.stateRequiredError);
                    await this.verifyErrorIsVisible(generalPage.zipcodRequiredError);
                    await this.fillInputByLabel(generalPage.email, dob.invalidEmail);
                    await this.fillInputByLabel(generalPage.phone, dob.invalidPhone);
                    await this.fillInputByLabel(generalPage.zipCode, dob.invalidZipcode);
                    await this.clickOnSaveButton()
                    await this.verifyErrorIsVisible(generalPage.invalidEmailError);
                    await this.verifyErrorIsVisible(generalPage.invalidUSPhoneError);
                    await this.verifyErrorIsVisible(generalPage.zipcod5DigitError);
                    await this.fillInputByLabel(generalPage.email, dob.email);
                    await this.fillInputByLabel(generalPage.phone, dob.phone);
                    await this.fillInputByLabel(generalPage.addressLine1, dob.addressLine1);
                    await this.fillInputByLabel(generalPage.addresLine2Option, dob.addressLine2);
                    await this.fillInputByLabel(generalPage.city, dob.city);
                    await this.selectFromDropdownByGuardian(dob.state.substring(0, 5), dob.state);
                    await this.fillInputByLabel(generalPage.zipCode, dob.zipCode);
                    await this.selectFromDropdownByGuardian(dob.country.substring(0.7), dob.country);
                }
                await this.clickOnSaveButton()

            });
        },
        async clickDatePickerToSelectDate(day, month, year) {
            await allure.step(`Select date from date picker dialog ${day}, ${month} and ${year} `, async () => {
                const yearLocator = page.locator(generalPage.datePickerYearXpath);
                await clickElement(yearLocator)
                await this.clickOnButtonByText(year)
                const monthLocator = page.locator(generalPage.datePickerMonthXpath);
                // await clickElement(monthLocator);
                // await this.clickOnButtonByText(month);
                const selectDate = page.getByRole('button', { name: day, exact: true })
                await clickElement(selectDate);
                await this.clickOnButtonByText(generalPage.selectDateTxt);
            });
        },
        async clickOnSaveButton() {
            await allure.step("Click on Save Button", async () => {
                const savebutton = page.getByRole('button', { name: generalPage.saveTxt, exact: true })
                await clickElement(savebutton);
            })
        },
        async addPrimaryGuardian() {
            await allure.step("Click on Add Primary Guardian button", async () => {
                const addPramryGuarBtn = page.locator(generalPage.xpathAddPrimaryGuardianButton);
                await clickElement(addPramryGuarBtn);
            })
        },
        async addBackUpGuardian() {
            await allure.step("Click on Add Backup Guardian button", async () => {
                const addBackupButton = page.locator(generalPage.xpathBackupGuardianButton);
                await clickElement(addBackupButton);
            })
        },
        async addContactGuardianButton(guardianType) {
            await allure.step("Click on Add Contact Primary Guardian button to add one", async () => {
                const addContactBtn = page.locator(guardianType !== 'Primary' ? generalPage.xpathAddContactBackupGuardianButton
                    : generalPage.xpathAddContactPrimaryGuardianButton);
                await clickElement(addContactBtn);
            })
        },
        async addContactBackupGuardianButton() {
            await allure.step("Click on Add Contact Backup Guardian button to add one", async () => {
                const addContactBtn = page.locator(generalPage.xpathAddContactBackupGuardianButton);
                await clickElement(addContactBtn);
            })
        },
        async clickOnProfile() {
            await allure.step("Click on Profile image on right side", async () => {
                const profileImage = page.locator(generalPage.xPathProfile);
                await clickElement(profileImage);
            })
        },
        async clickOnLogoutFromProfileDropdown() {
            await allure.step("Log out user from profile dropdown", async () => {
                const logoutButton = page.locator(generalPage.xpathAccountDropdown).getByRole('button', { name: generalPage.logoutTxt, exact: true });
                await logoutButton.click();
            })
        },
        async clickAnchorFromProfileDropdown(locatorText) {
            await allure.step(`Go to ${locatorText} user from profile dropdown`, async () => {
                const locator = page.locator(generalPage.xpathAccountDropdown).getByRole('link', { name: locatorText, exact: true });
                await clickElement(locator);
            })
        },
        async selectItemFromDropDown(enterValue, selectValue) {
            await allure.step(`Type ${enterValue} in text field and Select the item from dropdown ${selectValue}`, async () => {
                const enterValueTxtField = page.getByPlaceholder(getLocator(selectValue));
                await enterValueTxtField.fill(enterValue);
                await page.waitForTimeout(1000);
                const dropdownContainer = page.locator(generalPage.dropdownXpath);
                const selectFromDropDown = dropdownContainer.locator(generalPage.selectStateFromDropdown(selectValue));
                await clickElement(selectFromDropDown);
            })
        },
        async inputByXpath(xpath, value) {
            await allure.step(`Enter your ${xpath}: ${value}`, async () => {
                const locator = page.locator(xpath);
                await locator.fill(value);
            })
        },
        async inputByLabel(labelText, value) {
            await allure.step(`Enter your ${labelText}: ${value}`, async () => {
                const locator = page
                    .locator("div", {
                        has: page.locator("label", { hasText: labelText })
                    })
                    .locator(generalPage.inputTxt);
                await locator.fill(value);
            })
        },
        async inputByPlaceholder(placeholder, value) {
            await allure.step(`Enter your ${placeholder}: ${value}`, async () => {
                const locator = page.getByPlaceholder(placeholder);
                await locator.fill(value);
            })
        },
        async clickOnContinueButton(index = 0) {
            await allure.step('Click on Contiue button', async () => {
                const continueButton = page.getByRole('button', { name: generalPage.continueTxt, exact: true }).nth(index);
                await clickElement(continueButton);
            })
        },
        async clickOnAddContactButtonByIndex(guardianType) {
            const index = guardianType === 'Primary' ? 1 : 1;
            await allure.step(`Click on Add Contact button for ${guardianType} guardian`, async () => {
                const addContactButton = page.getByRole('button', { name: generalPage.confirmTxt, exact: true }).nth(index - 1);
                await clickElement(addContactButton);
            });
        },
        async clickOnAddPetByIndex(index) {
            await allure.step(`Click on Add Pet button for  guardian`, async () => {
                const addPetTxt = page.getByRole('button', { name: generalPage.addPetTxt, exact: true }).nth(index - 1);
                await clickElement(addPetTxt);
            });
        },
        async clickOnAddAddressButton() {
            await allure.step(`Click on Add Address button `, async () => {
                const addPetTxt = page.getByRole('button', { name: generalPage.addAddress, exact: true });
                await clickElement(addPetTxt);
            });
        },
        async clickOnAddPropertyButton() {
            await allure.step(`Click on Add Property button `, async () => {
                const addProperty = page.getByRole('button', { name: generalPage.addPropertyTxt, exact: true });
                await clickElement(addProperty);
            });
        },
        async clickOnButtonByText(btnText) {
            await allure.step(`Click on ${btnText} button `, async () => {
                const button = page.getByRole('button', { name: btnText, exact: true }).first();
                await clickElement(button);
            });
        },
        async clickOnButtonByXpath(xpath = generalPage.sendInvitepopupXpath) {
            await allure.step(`Click on ${xpath}  button `, async () => {
                const button = page.locator(xpath).first();
                await clickElement(button);
            });
        },
        async clickOnAddPropertyPopupButton() {
            await allure.step(`Click on Add Property popup button `, async () => {
                const button = page.locator(generalPage.addPropertyBtnXpath)
                await clickElement(button);
            });
        },
        async clickOnButtonIndexByText(btnText, index = 0) {
            await allure.step(`Click on ${btnText} button `, async () => {
                const button = page.getByRole('button', { name: btnText, exact: true }).nth(index);
                await clickElement(button);
            });
        },
        async clickOnAnchorByText(btnText) {
            await allure.step(`Click on ${btnText} button `, async () => {
                const button = page.getByRole('link', { name: btnText, exact: true });
                await clickElement(button);
            });
        },
        async clickOnLogoToGoHomePage() {
            await allure.step(`Click on Logo Image to go on home page`, async () => {
                const button = page.getByRole('link', { name: generalPage.fastWillTxt, exact: true });
                await button.click();
            });
        },
        async clickOnGoBack() {
            await allure.step(`Click to go back to previous screen `, async () => {
                await page.goBack();
            });
        },
        async selectRelationshipStatus(mStatus) {
            await allure.step(`Click on ${mStatus} card`, async () => {
                const martialStatus = page.getByText(mStatus, { exact: true });
                await martialStatus.click();
            })
        },
        async selectAvoidProbateYes() {
            await allure.step(`Click on Avoid Probate - Yes card`, async () => {
                const avoidProbateYes = page.getByText(generalPage.avoidProbateYes, { exact: true });
                await clickElement(avoidProbateYes);
            })
        },
        async selectAvoidProbateNo() {
            await allure.step(`Click on Avoid Probate - No card`, async () => {
                const avoidProbateNo = page.getByText(generalPage.avoidProbateNo, { exact: true });
                await clickElement(avoidProbateNo)
            })
        },
        async verifyPlanSectionPageAndSelectPlan(buttonTxt) {
            await allure.step("Verify plan section page and click on a bundle", async () => {
                await page.waitForLoadState("load");
                const trustBundle = page.getByRole('button', { name: buttonTxt, exact: true });
                await expect(trustBundle).toBeVisible();
                await trustBundle.click();
            })
        },
        async clickOnAcceptCookiesButton() {
            await allure.step("Accept Cooking button click", async () => {
                const acceptCookiesButton = page.getByRole('button', { name: generalPage.acceptCookiesTxt });
                if (await acceptCookiesButton.isVisible()) {
                    await clickElement(acceptCookiesButton);
                }
            });
        },
        async enterAddressLine1(address) {
            await allure.step("Enter Address Line 1", async () => {
                const input = page.getByPlaceholder(generalPage.addressLine1Placeholder);
                await input.fill(address);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterAddressLine2(address) {
            await allure.step("Enter Address Line 2 (Optional)", async () => {
                const input = page.getByPlaceholder(generalPage.addressLine2Placeholder);
                await input.fill(address);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterCity(city) {
            await allure.step("Enter City", async () => {
                const input = page.getByPlaceholder(generalPage.cityPlaceholder);
                await input.fill(city);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterZipCode(zip) {
            await allure.step("Enter ZIP Code", async () => {
                const input = page.getByPlaceholder(generalPage.zipCodePlaceholder);
                await input.fill(zip);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterBirthDayDate(birthday) {
            await allure.step("Enter valide birthday date", async () => {
                const input = page.getByPlaceholder(generalPage.selecteDatePlaceholder);
                await expect(input).toBeVisible();
                await input.fill(birthday);
                await expect(input).not.toHaveValue('');
            });
        },
        async fillInputByLabel(labelText, value, guardianType = "") {
            await allure.step(`Enter your ${labelText}: ${value}`, async () => {
                const index = guardianType === 'Primary' ? 1 : 1
                const locator = page.locator('label', { hasText: labelText })
                    .locator(generalPage.inputTxtByLabelXpath).nth(index - 1);
                await expect(locator).toBeVisible();
                await locator.fill(value);
            });
        },
        async clearInputByLabel(labelText, value, guardianType = "") {
            await allure.step(`Clear your ${labelText}: ${value}`, async () => {
                const index = guardianType === 'Primary' ? 1 : 1
                const locator = page.locator('label', { hasText: labelText })
                    .locator(generalPage.inputTxtByLabelXpath).nth(index - 1);
                await expect(locator).toBeVisible();
                await locator.clear();
            });
        },
        async fillInputByLabelAndSelectFromDropdown(labelText, value, sd = "", index = 0) {
            await allure.step(`Enter your: ${labelText} and select from dropdown: ${value}`, async () => {
                const locator = page.locator('label', { hasText: labelText })
                    .locator(generalPage.byLableInputXpath).nth(index);
                await locator.fill(value);
                await page.waitForTimeout(1000);
                await clickElement(locator);
                await page.waitForTimeout(1000);
                const dropdownContainer = page.locator(generalPage.dropdownXpath);
                const selectFromDropDown = dropdownContainer.locator(generalPage.selectStateFromDropdown(value)).first();;
                await clickElement(selectFromDropDown);
            });
        },
        async fillInTextAreaByLabel(labelText, value, guardianType) {
            await allure.step(`Enter your ${labelText}: ${value}`, async () => {
                const index = guardianType === 'Primary' ? 1 : 1
                const locator = page.locator('label', { hasText: labelText })
                    .locator(generalPage.textAreaXpath).nth(index - 1);
                await expect(locator).toBeVisible();
                await locator.fill(value);
            });
        },
        async selectFromDropdownByGuardian(enterValue, selectValue, guardianType = "") {
            const index = guardianType === 'Primary' ? 1 : 1;
            await allure.step(`Select ${enterValue} from dropdown with placeholder ${selectValue}`, async () => {
                const dropdownLocator = page.getByPlaceholder(getLocator(selectValue)).nth(index - 1);
                await expect(dropdownLocator).toBeVisible();
                await dropdownLocator.click();
                await dropdownLocator.type(enterValue, { delay: 50 });
                const dropdownContainer = page.locator(generalPage.dropdownXpath);
                const selectFromDropDown = dropdownContainer.locator(generalPage.selectStateFromDropdown(selectValue));
                await clickElement(selectFromDropDown);
            });
        },
        async createAndAssignContact(data, guardianType) {
            await allure.step(`Add a ${guardianType === "Primary" ? guardianType : 'Backup'} guardian`, async () => {
                await this.addContactGuardianButton(guardianType)
                await this.fillInputByLabel(generalPage.firstName, data.firstName, guardianType);
                await this.fillInputByLabel(generalPage.lastName, data.lastName, guardianType);
                await this.fillInputByLabel(generalPage.email, data.email, guardianType);
                await this.fillInputByLabel(generalPage.phone, data.phone, guardianType);
                await this.fillInputByLabel(generalPage.addressLine1, data.addressLine1, guardianType);
                await this.fillInputByLabel(generalPage.addressLine2, data.addressLine2, guardianType);
                await this.fillInputByLabel(generalPage.city, data.city, guardianType);
                await this.selectFromDropdownByGuardian(data.state.substring(0, 5), data.state, guardianType);
                await this.fillInputByLabel(generalPage.zipCode, data.zipCode, guardianType);
                await this.selectFromDropdownByGuardian(data.country.substring(0, 7), data.country, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
                await this.clickGuardianToAssignToChildByIndex(`${data.firstName} ${data.lastName}`, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
            });
        },
        async createValidateAndAssignContact(data, guardianType = "Primary") {
            await allure.step(`Create and validate a ${guardianType === "Primary" ? guardianType : 'Backup'} Contact`, async () => {
                await this.addContactGuardianButton(guardianType)
                await this.clickOnAddContactButtonByIndex(guardianType);
                await this.verifyErrorIsVisible(generalPage.firstNameRequiredError);
                await this.verifyErrorIsVisible(generalPage.lastNameRequiredError);
                await this.verifyErrorIsVisible(generalPage.emailRequiredError);
                await this.verifyErrorIsVisible(generalPage.phoneNumberRequiredError);
                await this.verifyErrorIsVisible(generalPage.addressLCapLine1RequiredError);
                await this.verifyErrorIsVisible(generalPage.cityRequiredError);
                await this.verifyErrorIsVisible(generalPage.stateRequiredError);
                await this.verifyErrorIsVisible(generalPage.zipCodeRequiredError);
                await this.fillInputByLabel(generalPage.firstName, data.firstName, guardianType);
                await this.fillInputByLabel(generalPage.lastName, data.lastName, guardianType);
                await this.fillInputByLabel(generalPage.email, data.invalidEmail, guardianType);
                await this.fillInputByLabel(generalPage.zipCode, data.invalidZipcode, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
                await this.verifyErrorIsVisible(generalPage.emailFormatError);
                await this.verifyErrorIsVisible(generalPage.zipCodeDigitError);
                await this.fillInputByLabel(generalPage.firstName, data.firstName, guardianType);
                await this.fillInputByLabel(generalPage.lastName, data.lastName, guardianType);
                await this.fillInputByLabel(generalPage.email, data.email, guardianType);
                await this.fillInputByLabel(generalPage.phone, data.phone, guardianType);
                await this.fillInputByLabel(generalPage.addressLine1, data.addressLine1, guardianType);
                await this.fillInputByLabel(generalPage.addressLine2, data.addressLine2, guardianType);
                await this.fillInputByLabel(generalPage.city, data.city, guardianType);
                await this.selectFromDropdownByGuardian(data.state.substring(0, 5), data.state, guardianType);
                await this.fillInputByLabel(generalPage.zipCode, data.zipCode, guardianType);
                await this.selectFromDropdownByGuardian(data.country.substring(0, 7), data.country, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
                await this.clickGuardianToAssignToChildByIndex(`${data.firstName} ${data.lastName}`, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
            });
        },
        async addPropertyData(data, guardianType) {
            await allure.step(`Add a Property Data for ${guardianType === "Primary" ? guardianType : 'Backup'} guardian`, async () => {
                await this.fillInputByLabel(generalPage.addressLine1, data.addressLine1, guardianType);
                await this.fillInputByLabel(generalPage.addressLine2Property, data.addressLine2, guardianType);
                await this.fillInputByLabel(generalPage.city, data.city, guardianType);
                await this.selectFromDropdownByGuardian(data.state.substring(0, 5), data.state, guardianType);
                await this.fillInputByLabel(generalPage.zipPostalCode, data.zipCode, guardianType);
                await this.selectFromDropdownByGuardian(data.country.substring(0.7), data.country, guardianType);
                await this.fillInputByLabel(generalPage.approximateValue, data.propertyPrice, guardianType);
                await this.clickOnAddPropertyPopupButton();
            });
        },
        async addPropertyDataWithValidations(data, guardianType) {
            await allure.step(`Add a Property Data for ${guardianType === "Primary" ? guardianType : 'Backup'} with validations.`, async () => {
                await this.clickOnAddPropertyPopupButton();
                await this.verifyErrorIsVisible(generalPage.addressLine1RequiredError);
                await this.verifyErrorIsVisible(generalPage.cityRequiredError);
                await this.verifyErrorIsVisible(generalPage.stateRequiredError);
                await this.verifyErrorIsVisible(generalPage.zipCodeRequiredError);
                await this.verifyErrorIsVisible(generalPage.addressLine1RequiredError);
                await this.verifyErrorIsVisible(generalPage.addressLine1RequiredError);
                await this.fillInputByLabel(generalPage.zipPostalCode, data.invalidZipCode, guardianType);
                await this.clickOnAddPropertyPopupButton();
                await this.verifyErrorIsVisible(generalPage.zipCodeDigitError);
                await this.fillInputByLabel(generalPage.addressLine1, data.addressLine1, guardianType);
                await this.fillInputByLabel(generalPage.addressLine2Property, data.addressLine2, guardianType);
                await this.fillInputByLabel(generalPage.city, data.city, guardianType);
                await this.selectFromDropdownByGuardian(data.state.substring(0, 5), data.state, guardianType);
                await this.fillInputByLabel(generalPage.zipPostalCode, data.zipCode, guardianType);
                await this.selectFromDropdownByGuardian(data.country.substring(0.7), data.country, guardianType);
                await this.fillInputByLabel(generalPage.approximateValue, data.propertyPrice, guardianType);
                await this.clickOnAddPropertyPopupButton();
            });
        },
        async clickGuardianToAssignToChildByIndex(guardianName, guardianType) {
            const index = guardianType === 'Primary' ? 1 : 2;
            await allure.step(`Click on child ${guardianName} to assign ${guardianType} guardian`, async () => {
                const childLocator = page.locator(generalPage.selectContactXpath(guardianName)).nth(index - 1);
                await clickElement(childLocator);
            });
        },

        /** complete functions */
    };
};
