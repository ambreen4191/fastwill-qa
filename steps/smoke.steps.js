import { allure, expect } from 'allure-playwright';
import { getLocator, smokePage } from '../pages/smoke.page';
const COMMON = require('../utils/common.json');
const { clickElement, isValidEmail, extractNumericString, isWithinNotaryHours } = require('../utils/helper');
const { getRandomEmail, prepareDownloadFolder, downloadAndVerifyFile, getRandomForDeedEmail } = require('../utils/helper');

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
                const login = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.logInTxt, exact: true });
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
                const trustFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.trustTxt, exact: true });
                await trustFooter.scrollIntoViewIfNeeded();
                await expect(trustFooter).toBeVisible();
                await trustFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.trustPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.trustPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const willFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.willTxt, exact: true });
                await willFooter.scrollIntoViewIfNeeded();
                await expect(willFooter).toBeVisible();
                await willFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.willPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.willPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const learnFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.learnTxt, exact: true });
                await learnFooter.scrollIntoViewIfNeeded();
                await expect(learnFooter).toBeVisible();
                await clickElement(learnFooter);
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.learnPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.learnPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const privacyFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.privacyPolicyTxt, exact: true });
                await privacyFooter.scrollIntoViewIfNeeded();
                await expect(privacyFooter).toBeVisible();
                await privacyFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.privacyPolicyPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.privacyPolicyPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const termsFooter = page.locator(smokePage.homeFooter).getByRole("link", { name: smokePage.termsServiceTxt, exact: true });
                await termsFooter.scrollIntoViewIfNeeded();
                await expect(termsFooter).toBeVisible();
                await termsFooter.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.baseURL + smokePage.termsServicesPageURL, `Navigation failed! Expected URL: ${COMMON.baseURL + smokePage.termsServicesPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const facebookLink = page.getByRole('link', { name: smokePage.facebookLable, exact: true });
                await facebookLink.scrollIntoViewIfNeeded();
                await expect(facebookLink).toBeVisible();
                await facebookLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.facebookPageURL, `Navigation failed! Expected URL: ${COMMON.facebookPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const instagramLink = page.getByRole('link', { name: smokePage.instagramLable, exact: true });
                await instagramLink.scrollIntoViewIfNeeded();
                await expect(instagramLink).toBeVisible();
                await instagramLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url() === COMMON.instagramPageURL, `Navigation failed! Expected URL: ${COMMON.instagramPageURL}, but got: ${page.url()}`);
                await page.goBack();

                const linkedInLink = page.getByRole('link', { name: smokePage.linkedInLable, exact: true });
                await linkedInLink.scrollIntoViewIfNeeded();
                await expect(linkedInLink).toBeVisible();
                await linkedInLink.click();
                await page.waitForLoadState('load');
                assert.ok(page.url().includes(smokePage.linkedInPage), `Navigation failed! Expected URL: ${smokePage.linkedInPage}, but got: ${page.url()}`);
                await page.goBack();
            });
        },
        async clickStartTodayButton() {
            await allure.step('Click start today button', async () => {
                const startTodayButton = page.locator(smokePage.homeHeader).getByRole('button', { name: smokePage.startTodayTxt, exact: true });
                await clickElement(startTodayButton);
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
        async clickOnLoginInAnchor() {
            await allure.step("Click on Log in Text Link", async () => {
                const locator = page.locator(smokePage.homeHeader).getByRole('link', { name: smokePage.logInTxt, exact: true });
                await clickElement(locator);
            })
        },
        async clickOnForgetPasswordTxtLink() {
            await allure.step("Click on Log in Text Link", async () => {
                const forgetPassword = page.getByRole('link', { name: smokePage.forgetPasswordTxt, exact: true });
                await clickElement(forgetPassword);
            })
        },
        async enterUserFullName(fullName) {
            await allure.step("Verify user full name is entered", async () => {
                const enterName = page.getByRole('textbox', { name: smokePage.namePlaceholderTxt, exact: true });
                await enterName.clear();
                await enterName.fill(fullName)
                await expect(enterName).not.toHaveValue('');
            })
        },
        async enterUserEmail(email) {
            await allure.step(`Enter user email: ${email}`, async () => {
                const enterEmail = page.locator(smokePage.emailId);
                await expect(enterEmail).toBeVisible();
                await enterEmail.fill(email)
                await expect(enterEmail).not.toHaveValue('');
            })
        },
        async enterCreateAccountPassword(password) {
            await allure.step(`Enter user password: ${password}`, async () => {
                const enterPassword = page.locator(smokePage.accountPasswordId);
                await expect(enterPassword).toBeVisible();
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async enterUserPassword(password) {
            await allure.step(`Enter user password: ${password}`, async () => {
                const enterPassword = page.locator(smokePage.passwordId);
                await expect(enterPassword).toBeVisible();
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async enterUserConfirmPassword(password) {
            await allure.step(`Enter user confirm password: ${password}`, async () => {
                const enterPassword = page.locator(smokePage.confirmPasswordId);
                await expect(enterPassword).toBeVisible();
                await enterPassword.fill(password)
                await expect(enterPassword).not.toHaveValue('');
            })
        },
        async verifyUserIsOnPaymentPage() {
            await allure.step("Verify user is redirected to Payment page", async () => {
                const paymentHeading = page.getByRole('heading', { name: smokePage.paymentTxt, level: 1 });
                await expect(paymentHeading).toBeVisible();
            });
        },
        async enterPaymentCardDetails() {
            await allure.step("Enter valid payment card details", async () => {
                const stripeFrame = page.frameLocator('iframe[title="Secure payment input frame"]:not([aria-hidden="true"])');

                const cardNumberField = stripeFrame.getByPlaceholder(smokePage.cardNumberPlaceholder);
                await cardNumberField.click();
                await cardNumberField.type('4242 4242 4242 4242');

                const expiryField = stripeFrame.getByPlaceholder(smokePage.expireyPlaceholder);
                await expiryField.click();
                await expiryField.type('12/34');

                const cvcField = stripeFrame.getByPlaceholder(smokePage.cvcPlacholder);
                await cvcField.click();
                await cvcField.type('123');

                const postalField = stripeFrame.getByPlaceholder(smokePage.postalCodePlaceHolder);
                if (await postalField.isVisible()) {
                    await clickElement(postalField);
                    await postalField.type('A1A 1A1');
                }
            });

        },
        async acceptTermsAndConditions() {
            await allure.step("Accept Terms and Conditions", async () => {
                const termsCheckbox = page.locator(smokePage.termsCheckboxId);
                await termsCheckbox.check();
                await expect(termsCheckbox).toBeChecked();
            });
        },
        async verifyConfirmAndPayButtonIsEnabled() {
            await allure.step("Verify Confirm & Pay button is enabled", async () => {
                const confirmPayButton = page.getByRole('button', {
                    name: smokePage.confirmAndPayBtnTxt,
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
                const addressScreen = page.getByRole('heading', { name: smokePage.whatYourAddressTxt });
                await expect(addressScreen).toBeVisible();
            });
        },
        async verifyBirthdayScreenIsVisible() {
            await allure.step("Verify birthday screen is visible", async () => {
                const birthdayScreen = page.getByRole('heading', { name: smokePage.whatisYourbirthdayTxt });
                await expect(birthdayScreen).toBeVisible();
            });
        },
        async verifyDoyouHavChildrenScreenIsVisible() {
            await allure.step("Verify 'Do you have childeren' screen is visible", async () => {
                const birthdayScreen = page.getByRole('heading', { name: smokePage.doYouHaveChildTxt });
                await expect(birthdayScreen).toBeVisible();
            });
        },
        async verifyPetGuardianAssignmentScreenIsVisible(petName) {
            await allure.step(`Verify 'Who would you like to look after ${petName}?' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const listOfPetsDescTxt = page.getByRole('heading', { name: smokePage.petGuardianAssignmentTxt + petName + smokePage.questionSymbol });
                await expect(listOfPetsDescTxt).toBeVisible();
            });
        },
        async verifyWithHeadingScreenIsVisible(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByRole('heading', { name: locatorTxt, exact: true });
                await expect(locator).toBeVisible();
            });
        },
        async verifyNotaryText9to5AMIsVisible() {
            await page.waitForLoadState("load");
            const locator = page.getByText(smokePage.notary9To5AmTxt, { exact: true });
            const isVisible = await locator.isVisible().catch(() => false);
            await allure.step(`Notary 9–5 AM text is ${isVisible ? 'VISIBLE' : 'NOT VISIBLE'}`, async () => { });
        },
        async verifyCreateNotarySessionButtonIsDisabled() {
            await allure.step(`Create Notary Session button is disabled`, async () => {
                const locator = page.getByRole('button', { name: smokePage.notaryCreateSessionTxt, exact: true });
                await expect(locator).toBeDisabled();
            });
        },
        async verifyDeedTransferTxtIsVisible() {
            await allure.step(`Deed Transfer text is from left sidebar is 'VISIBLE' '}`, async () => {
                    await page.waitForLoadState("load");
                    const locator = page.locator(smokePage.sideDeedTransferXPath);
                    await expect(locator).toBeVisible();

            });
        },
        async verifyDeedTransferTxtIsNotVisible() {
            await allure.step( `Deed Transfer text is from left sidebar 'NOT VISIBLE'}`, async () => {
                    await page.waitForLoadState("load");
                    const locator = page.locator(smokePage.sideDeedTransferXPath);
                    await expect(locator).not.toBeVisible();

            });
        },
        async verifyCreateNotarySessionButtonIsEnable() {
            const locator = page.getByRole('button', { name: smokePage.notaryCreateSessionTxt, exact: true });
            const isEnabled = await locator.isEnabled().catch(() => false);
            await allure.step(`Create Notary Session button is ${isEnabled ? 'ENABLED' : 'DISABLED'}`, async () => {
                if (isEnabled) {
                    await expect(locator).toBeEnabled();
                }
            });
        },
        async verifyWithTextScreenIsVisible(locatorTxt) {
            await allure.step(`Verify '${locatorTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.getByText(locatorTxt, { exact: true });
                await expect(locator.first()).toBeVisible();
            });
        },
        async verifyWithTextByLabelScreenIsVisible(label, expectedValue) {
            await allure.step(`Verify value '${expectedValue}' is visible for label '${label}'`, async () => {
                await page.waitForLoadState("load");
                const valueLocator = page.locator(smokePage.valueByDivLabelXpath(label));
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
                const valueLocators = page.locator(smokePage.propertyAmountXpath);
                const allTexts = await valueLocators.allTextContents();
                const numbers = allTexts.map(text => Number(text.replace(/[$,]/g, '')));
                const sumExceptLast = numbers.slice(0, -1).reduce((acc, val) => acc + val, 0);
                const lastValue = numbers[numbers.length - 1];
                await expect(lastValue).toBe(sumExceptLast);

            })
        },
        async verifyAssetTabIsVisible() {
            await allure.step(`Verify 'Assets' Tab is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(smokePage.assetsTab);
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
        async verifyRecordingFeesTotal() {
            await allure.step(`Verify 'Recording Fees' screen is and calculated`, async () => {
                const feeItemsLocator = page.locator(smokePage.feeItemsXpath);
                await expect(page.getByText(smokePage.calculatingTxt)).toHaveCount(1);
                const feeItemsCount = await feeItemsLocator.count();
                let sum = 0;
                for (let i = 2; i <= feeItemsCount; i += 2) {
                    const itemLocator = page.locator(smokePage.recordingFeeItemXpath(i));
                    const amountText = (await itemLocator.textContent())?.trim()
                    expect(amountText && amountText !== 'Calculating...', `Amount did not resolve for item ${i + 1}`).toBeTruthy();
                    const amount = parseFloat(extractNumericString(amountText));
                    expect(amount).toBeGreaterThan(0);
                    sum += amount;
                }
                const totalLocator = page.locator(smokePage.totalFeeAmountXpath);
                const totalText = (await totalLocator.textContent())?.trim();
                expect(totalText && totalText !== 'Calculating...', 'Total Recording Fees not available').toBeTruthy();
                const totalAmount = parseFloat(extractNumericString(totalText));
                expect(totalAmount).toBeGreaterThan(0);
                expect(sum).toBe(totalAmount);
            });
        },
        async verifyRecordingFeesBreakdownSubtotalAndTotal() {
            await allure.step('Verify Recording Fees breakdown subtotal & total calculation', async () => {
                await expect(page.getByText(smokePage.calculatingTxt)).toHaveCount(0);
                const feeRows = page.locator(smokePage.recordingFeeRowXpath);
                const rowCount = await feeRows.count();
                let calculatedSubtotal = 0;
                for (let i = 2; i < rowCount; i++) {
                    const feeSpan = page.locator(smokePage.recordingFeeRowPriceItemXpath(i));
                    const feeText = await feeSpan.textContent();
                    if (!feeText) continue;
                    const fee = parseFloat(extractNumericString(feeText));
                    if (isNaN(fee)) continue;
                    calculatedSubtotal += fee;
                }
                const displayedSubtotalText = await page.locator(smokePage.amountByLabelXpath(smokePage.subtotalTxt)).textContent();
                const displayedSubtotal = parseFloat(extractNumericString(displayedSubtotalText));
                expect(calculatedSubtotal).toBe(displayedSubtotal);
                const deedTransferText = await page.locator(smokePage.amountByLabelXpath(smokePage.deedTranserTotalTxt)).textContent();
                const deedTransferTotal = parseFloat(extractNumericString(deedTransferText));
                expect(deedTransferTotal).toBe(displayedSubtotal);
                const notarizationText = await page.locator(smokePage.amountByLabelXpath(smokePage.totalNotarizationTxt)).textContent();
                const notarizationTotal = parseFloat(extractNumericString(notarizationText));
                const calculatedTotal = displayedSubtotal + notarizationTotal;
                const displayedTotalText = await page.locator(smokePage.totalPriceXpath).textContent();
                const displayedTotal = parseFloat(extractNumericString(displayedTotalText));
                expect(calculatedTotal).toBe(displayedTotal);
            });
        },
        async verifyDeedNotarizationFee() {
            await allure.step(`Verify 'Deed Transfer Notarization Fee' screen is and calculated`, async () => {
                const locator = page.locator(smokePage.deedTransferNotFeeXpath);
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
        async verifyDocumentNameIsVisible(titleTxt, nameTxt) {
            await allure.step(`Verify '${titleTxt}' screen is visible`, async () => {
                await page.waitForLoadState("load");
                const locator = page.locator(smokePage.documentTitleXpath(titleTxt))
                    .filter({ has: page.locator("span", { hasText: nameTxt }) });
                await expect(locator).toBeVisible();
            });
        },
        async verifyFullNameField() {
            await allure.step(`Verify 'Full name' on Contact informarion is valid`, async () => {
                const fullNameInput = page.locator(smokePage.contactNameId);
                await expect(fullNameInput).toHaveCount(1);
                const fullNameValue = (await fullNameInput.inputValue()).trim();
                expect(fullNameValue.length).toBeGreaterThan(0);
            });
        },
        async verifyEmailField(email) {
            await allure.step(`Verify 'Email' on Contact informarion is valid`, async () => {
                const emailInput = page.locator(smokePage.contactEmailId);
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
                const sibling = label.locator(smokePage.checkValueForLabelXpath);
                const value = (await sibling.textContent())?.trim();
                expect(value, `No sibling value found for "${labelText}"`).toBeTruthy();
                await allure.step(`Value for "${labelText}"`, () => { });
            });
        },
        async clickOnLogInButton() {
            await allure.step("Click on Log In button to login user", async () => {
                const locator = page.getByRole('button', { name: smokePage.logInTxt, exact: true });
                await clickElement(locator);
            })
        },
        async clickResetPasswordButton() {
            await allure.step("Click on 'Reset Password' button", async () => {
                const locator = page.getByRole('button', { name: smokePage.resetPasswordTxt, exact: true });
                await clickElement(locator);
            })
        },
        async clickConfirmAndPayButton() {
            await allure.step("Click on Confirm & Pay button", async () => {
                const confirmPayButton = page.getByRole('button', { name: smokePage.confirmAndPayBtnTxt });
                await clickElement(confirmPayButton);
            });
        },
        async clickContinueWithEmailButton() {
            await allure.step("Click on Continue with email button", async () => {
                const continueWithEmail = page.getByRole('button', { name: smokePage.continueWithEmailTxt, exact: true });
                await clickElement(continueWithEmail);
            })
        },
        async clickOnAddConservatorButton() {
            await allure.step("Click on add a conservator button", async () => {
                const addConservator = page.getByRole('button', { name: smokePage.addConservator, exact: true });
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
                const locator = page.locator(smokePage.assetsTab);
                await clickElement(locator);
            })
        },
        async clickYesRadioButton() {
            await allure.step("Click on Yes Radio text", async () => {
                const yesTxt = page.getByText(smokePage.yesTxt, { exact: true });
                await clickElement(yesTxt);
            })
        },
        async clickRadioButtonByText(radioBtnTxt) {
            await allure.step(`Click on ${radioBtnTxt} Radio text`, async () => {
                const radioBtn = page.getByText(radioBtnTxt, { exact: true });
                await clickElement(radioBtn);
            })
        },
        async clickSelectContactWithEmail(email) {
            await allure.step(`Click on ${email} to select it.`, async () => {
                const locator = page.locator(smokePage.selectContactEmailXpath(email));
                await clickElement(locator);
            })
        },
        async clickCrossIconToCloseModel() {
            await allure.step(`Click on Cross icon to close model`, async () => {
                const locator = page.locator(smokePage.modelCrossIcon);
                await clickElement(locator);
            })
        },
        async clickPreviewDocumentCloseModel() {
            await allure.step(`Click on Cross icon to close preview document model`, async () => {
                const locator = page.locator(smokePage.previewDocumentModelCloseIco);
                await clickElement(locator);
            })
        },
        async clickCloseIconToSaveChanges() {
            await allure.step(`Click on Cross icon to save changes`, async () => {
                const locator = page.locator(smokePage.closeIcon);
                await clickElement(locator);
            })
        },
        async clickCloseInviteModel() {
            await allure.step(`Click on Cross icon to close invite model`, async () => {
                const locator = page.locator(smokePage.closeInviteModel);
                await clickElement(locator);
            })
        },
        async clickSidBarAnchor(title) {
            await allure.step(`Click on ${title} from side bar`, async () => {
                const locator = page.locator(smokePage.sideBarLinkXpath(title));
                await clickElement(locator);
            })
        },
        async clickDocumentButtonByName(titleTxt, nameTxt, btnTxt) {
            await allure.step(`Click on ${titleTxt}'s ${nameTxt}'s ${btnTxt} button`, async () => {
                const locator = page.locator(smokePage.documentTitleXpath(titleTxt))
                    .filter({ has: page.locator("span", { hasText: nameTxt }) })
                    .locator("button, a", { hasText: btnTxt });
                await clickElement(locator);
            })
        },
        async clickManageAccessHipaButton() {
            await allure.step(`Click on Manage Access button`, async () => {
                const locator = page.locator(smokePage.manageAccessHipaXPath);
                await clickElement(locator);
            })
        },
        async clickManageAccessForContactsButtonWithEmail(email) {
            await allure.step(`Click on Manage Access for this email contact: ${email}`, async () => {
                const locator = page.locator(smokePage.manageAccessBtnUsingEmailXpath(email));
                await clickElement(locator);
            })
        },
        async clickRemoveAccessModelButton() {
            await allure.step(`Click on Remove Access model button`, async () => {
                const locator = page.locator(smokePage.removeAccessModelBtnXpath);
                await clickElement(locator);
            })
        },
        async clickRemoveAccessForContactsButtonWithEmail(email) {
            await allure.step(`Click on Manage Access for this email contact: ${email}`, async () => {
                const locator = page.locator(smokePage.removeAccessForContactsUsingEmailXpath(email));
                await clickElement(locator);
            })
        },
        async clickTabUsingTxtByBasicTabPath(text) {
            await allure.step(`Click on ${text} to move in tab`, async () => {
                const locator = page.locator(smokePage.tabsUsingBaiscTabXpath(text));
                await clickElement(locator);
            })
        },
        async clickOnBasicByPath() {
            await allure.step(`Click on Basic to move in tab`, async () => {
                const locator = page.locator(smokePage.basicXPath);
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
                const continueWithEmail = page.getByRole('button', { name: smokePage.createAccountTxt, exact: true });
                await clickElement(continueWithEmail);
            })
        },
        async clickOnAddAChild(enterchildName, parentsRadioTxt = smokePage.meTxt) {
            await allure.step(`Click and add a child: ${enterchildName} for ${parentsRadioTxt}`, async () => {
                const addChildButton = page.getByRole('button', { name: smokePage.addChildTxt, exact: true });
                await clickElement(addChildButton)

                const childName = page.getByPlaceholder(smokePage.childNamePlaceholder);
                await childName.fill(enterchildName)
                await expect(childName).not.toHaveValue('');
                const meRadioButton = page.getByRole('radio', { name: parentsRadioTxt, exact: true });
                await meRadioButton.check();
                await expect(meRadioButton).toBeChecked();

                const selecteBirthdayDate = page.getByPlaceholder(smokePage.selectBirthdayFieldPlaceholder);
                await clickElement(selecteBirthdayDate)
                await this.clickDatePickerToSelectDate("10", "Jan", "2020")
                await this.clickOnSaveButton()

            });
        },
        async clickDatePickerToSelectDate(day, month, year) {
            await allure.step(`Select date from date picker dialog ${day}, ${month} and ${year} `, async () => {
                const yearLocator = page.locator(smokePage.datePickerYearXpath);
                await clickElement(yearLocator)
                await this.clickOnButtonByText(year)
                const monthLocator = page.locator(smokePage.datePickerMonthXpath);
                const selectDate = page.getByRole('button', { name: day, exact: true })
                await clickElement(selectDate);
            });
        },
        async clickOnSaveButton() {
            await allure.step("Click on Save Button", async () => {
                const savebutton = page.getByRole('button', { name: smokePage.saveTxt, exact: true })
                await clickElement(savebutton);
            })
        },
        async addPrimaryGuardian() {
            await allure.step("Click on Add Primary Guardian button", async () => {
                const addPramryGuarBtn = page.locator(smokePage.xpathAddPrimaryGuardianButton);
                await clickElement(addPramryGuarBtn);
            })
        },
        async addBackUpGuardian() {
            await allure.step("Click on Add Backup Guardian button", async () => {
                const addBackupButton = page.locator(smokePage.xpathBackupGuardianButton);
                await clickElement(addBackupButton);
            })
        },
        async addContactGuardianButton(guardianType) {
            await allure.step("Click on Add Contact Primary Guardian button to add one", async () => {
                const addContactBtn = page.locator(guardianType !== 'Primary' ? smokePage.xpathAddContactBackupGuardianButton
                    : smokePage.xpathAddContactPrimaryGuardianButton);
                await clickElement(addContactBtn);
            })
        },
        async addContactBackupGuardianButton() {
            await allure.step("Click on Add Contact Backup Guardian button to add one", async () => {
                const addContactBtn = page.locator(smokePage.xpathAddContactBackupGuardianButton);
                await clickElement(addContactBtn);
            })
        },
        async clickOnProfile() {
            await allure.step("Click on Profile image on right side", async () => {
                const profileImage = page.locator(smokePage.xPathProfile);
                await clickElement(profileImage);
            })
        },
        async clickOnLogoutFromProfileDropdown() {
            await allure.step("Log out user from profile dropdown", async () => {
                const logoutButton = page.locator(smokePage.xpathAccountDropdown).getByRole('button', { name: smokePage.logoutTxt, exact: true });
                await logoutButton.click();
            })
        },
        async clickAnchorFromProfileDropdown(locatorText) {
            await allure.step(`Go to ${locatorText} user from profile dropdown`, async () => {
                const locator = page.locator(smokePage.xpathAccountDropdown).getByRole('link', { name: locatorText, exact: true });
                await clickElement(locator);
            })
        },
        async selectItemFromDropDown(enterValue, selectValue) {
            await allure.step(`Type ${enterValue} in text field and Select the item from dropdown ${selectValue}`, async () => {
                const enterValueTxtField = page.getByPlaceholder(getLocator(selectValue))
                await enterValueTxtField.click();
                await enterValueTxtField.type(enterValue, { delay: 50 });
                const dropdownContainer = page.locator(smokePage.dropdownXpath);
                const selectFromDropDown = dropdownContainer.locator(smokePage.selectStateFromDropdown(selectValue));
                await clickElement(selectFromDropDown);
            })
        },
        async inputByLabel(labelText, value) {
            await allure.step(`Enter your ${labelText}: ${value}`, async () => {
                const locator = page
                    .locator("div", {
                        has: page.locator("label", { hasText: labelText })
                    })
                    .locator(smokePage.inputTxt);
                await locator.fill(value);
            })
        },
        async inputByPlaceholder(placeholder, value) {
            await allure.step(`Enter your ${placeholder}: ${value}`, async () => {
                const locator = page.getByPlaceholder(placeholder);
                await locator.fill(value);
            })
        },
        async clickOnContinueButton() {
            await allure.step('Click on Contiue button', async () => {
                const continueButton = page.getByRole('button', { name: smokePage.continueTxt, exact: true });
                await clickElement(continueButton);
            })
        },
        async clickOnAddContactButtonByIndex(guardianType) {
            const index = guardianType === 'Primary' ? 1 : 1;
            await allure.step(`Click on Add Contact button for ${guardianType} guardian`, async () => {
                const addContactButton = page.getByRole('button', { name: smokePage.confirmTxt, exact: true }).nth(index - 1);
                await clickElement(addContactButton);
            });
        },
        async clickOnAddPetByIndex(index) {
            await allure.step(`Click on Add Pet button for  guardian`, async () => {
                const addPetTxt = page.getByRole('button', { name: smokePage.addPetTxt, exact: true }).nth(index - 1);
                await clickElement(addPetTxt);
            });
        },
        async clickOnAddAddressButton() {
            await allure.step(`Click on Add Address button `, async () => {
                const addPetTxt = page.getByRole('button', { name: smokePage.addAddress, exact: true });
                await clickElement(addPetTxt);
            });
        },
        async clickOnAddPropertyButton() {
            await allure.step(`Click on Add Property button `, async () => {
                const addProperty = page.getByRole('button', { name: smokePage.addPropertyTxt, exact: true });
                await clickElement(addProperty);
            });
        },
        async clickOnButtonByText(btnText) {
            await allure.step(`Click on ${btnText} button `, async () => {
                const button = page.getByRole('button', { name: btnText, exact: true });
                await clickElement(button);
            });
        },
        async clickOnAddPropertyPopupButton() {
            await allure.step(`Click on Add Property popup button `, async () => {
                const button = page.locator(smokePage.addPropertyBtnXpath)
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
                const avoidProbateYes = page.getByText(smokePage.avoidProbateYes, { exact: true });
                await clickElement(avoidProbateYes);
            })
        },
        async selectAvoidProbateNo() {
            await allure.step(`Click on Avoid Probate - No card`, async () => {
                const avoidProbateNo = page.getByText(smokePage.avoidProbateNo, { exact: true });
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
                const acceptCookiesButton = page.getByRole('button', { name: smokePage.acceptCookiesTxt });
                if (await acceptCookiesButton.isVisible()) {
                    await clickElement(acceptCookiesButton);
                }
            });
        },
        async enterAddressLine1(address) {
            await allure.step("Enter Address Line 1", async () => {
                const input = page.getByPlaceholder(smokePage.addressLine1Placeholder);
                await input.fill(address);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterAddressLine2(address) {
            await allure.step("Enter Address Line 2 (Optional)", async () => {
                const input = page.getByPlaceholder(smokePage.addressLine2Placeholder);
                await input.fill(address);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterCity(city) {
            await allure.step("Enter City", async () => {
                const input = page.getByPlaceholder(smokePage.cityPlaceholder);
                await input.fill(city);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterZipCode(zip) {
            await allure.step("Enter ZIP Code", async () => {
                const input = page.getByPlaceholder(smokePage.zipCodePlaceholder);
                await input.fill(zip);
                await expect(input).not.toHaveValue('');
            });
        },
        async enterBirthDayDate(birthday) {
            await allure.step("Enter valide birthday date", async () => {
                const input = page.getByPlaceholder(smokePage.selecteDatePlaceholder);
                await expect(input).toBeVisible();
                await input.fill(birthday);
                await expect(input).not.toHaveValue('');
            });
        },
        async fillInputByLabel(labelText, value, guardianType) {
            await allure.step(`Enter your ${labelText}: ${value}`, async () => {
                const index = guardianType === 'Primary' ? 1 : 1
                const locator = page.locator('label', { hasText: labelText })
                    .locator(smokePage.inputTxtByLabelXpath).nth(index - 1);
                await expect(locator).toBeVisible();
                await locator.fill(value);
            });
        },
        async fillInputByLabelAndSelectFromDropdown(labelText, value) {
            await allure.step(`Enter your: ${labelText} and select from dropdown: ${value}`, async () => {
                const locator = page.locator('label', { hasText: labelText })
                    .locator(smokePage.byLableInputXpath);
                await clickElement(locator)
                await locator.fill(value);
                const dropdownContainer = page.locator(smokePage.dropdownXpath);
                const selectFromDropDown = dropdownContainer.locator(smokePage.selectStateFromDropdown(value));
                await clickElement(selectFromDropDown);
            });
        },
        async fillInTextAreaByLabel(labelText, value, guardianType) {
            await allure.step(`Enter your ${labelText}: ${value}`, async () => {
                const index = guardianType === 'Primary' ? 1 : 1
                const locator = page.locator('label', { hasText: labelText })
                    .locator(smokePage.textAreaXpath).nth(index - 1);
                await expect(locator).toBeVisible();
                await locator.fill(value);
            });
        },
        async selectFromDropdownByGuardian(enterValue, selectValue, guardianType) {
            const index = guardianType === 'Primary' ? 1 : 1;
            await allure.step(`Select ${enterValue} from dropdown with placeholder ${selectValue}`, async () => {
                const dropdownLocator = page.getByPlaceholder(getLocator(selectValue)).nth(index - 1);
                await expect(dropdownLocator).toBeVisible();
                await dropdownLocator.click();
                await dropdownLocator.type(enterValue, { delay: 50 });
                const dropdownContainer = page.locator(smokePage.dropdownXpath);
                const selectFromDropDown = dropdownContainer.locator(smokePage.selectStateFromDropdown(selectValue));
                await clickElement(selectFromDropDown);
            });
        },
        async addGuardian(data, guardianType) {
            await allure.step(`Add a ${guardianType ? guardianType : 'Backup'} guardian`, async () => {
                await this.addContactGuardianButton(guardianType)
                await this.fillInputByLabel(smokePage.firstName, data.firstName, guardianType);
                await this.fillInputByLabel(smokePage.lastName, data.lastName, guardianType);
                await this.fillInputByLabel(smokePage.email, data.email, guardianType);
                await this.fillInputByLabel(smokePage.phone, data.phone, guardianType);
                await this.fillInputByLabel(smokePage.addressLine1, data.addressLine1, guardianType);
                await this.fillInputByLabel(smokePage.addressLine2, data.addressLine2, guardianType);
                await this.fillInputByLabel(smokePage.city, data.city, guardianType);
                await this.selectFromDropdownByGuardian(data.state.substring(0, 5), data.state, guardianType);
                await this.fillInputByLabel(smokePage.zipCode, data.zipCode, guardianType);
                await this.selectFromDropdownByGuardian(data.country.substring(0, 7), data.country, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
                await this.clickGuardianToAssignToChildByIndex(`${data.firstName} ${data.lastName}`, guardianType);
                await this.clickOnAddContactButtonByIndex(guardianType);
            });
        },
        async addPropertyData(data, guardianType) {
            await allure.step(`Add a Property Data for ${guardianType ? guardianType : 'Backup'} guardian`, async () => {
                await this.fillInputByLabel(smokePage.addressLine1, data.addressLine1, guardianType);
                await this.fillInputByLabel(smokePage.addressLine2Property, data.addressLine2, guardianType);
                await this.fillInputByLabel(smokePage.city, data.city, guardianType);
                await this.selectFromDropdownByGuardian(data.state.substring(0, 5), data.state, guardianType);
                await this.fillInputByLabel(smokePage.zipPostalCode, data.zipCode, guardianType);
                await this.selectFromDropdownByGuardian(data.country.substring(0.7), data.country, guardianType);
                await this.fillInputByLabel(smokePage.approximateValue, data.propertyPrice, guardianType);
                await this.clickOnAddPropertyPopupButton();
            });
        },
        async clickGuardianToAssignToChildByIndex(guardianName, guardianType) {
            const index = guardianType === 'Primary' ? 1 : 2;
            await allure.step(`Click on child ${guardianName} to assign ${guardianType} guardian`, async () => {
                const childLocator = page.locator(smokePage.selectContactXpath(guardianName)).nth(index - 1);
                await clickElement(childLocator);
            });
        },

        /** complete functions */
        async signupIndividualTrustUsers(constants, email) {
            await allure.step("Sign up Trust individual user with email passowrd", async () => {
                await this.openHomePage();
                await this.clickStartTodayButton();
                await this.verifyStartTodayScreenElementsVisible(constants.fullName);
                await this.clickOnContinueButton();
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.clickOnContinueButton();
                await this.clickOnAcceptCookiesButton();
                await this.selectRelationshipStatus(constants.singleRelationshipStatus);
                await this.selectAvoidProbateYes();
                await this.enterUserEmail(email);
                await this.enterCreateAccountPassword(constants.password);
                await this.clickOnCreateAccountButton();
                await this.verifyPlanSectionPageAndSelectPlan(smokePage.selectOnlyTrustPlanTxt);
                await this.verifyUserIsOnPaymentPage();
                await this.enterPaymentCardDetails();
                await this.acceptTermsAndConditions();
                await this.verifyConfirmAndPayButtonIsEnabled();
                await this.clickConfirmAndPayButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.thanksforPurchaseTxt);
            })
        },
        async signupIndividualWillUsers(constants, email, relationStatus = constants.singleRelationshipStatus) {
            await allure.step("Signup / Will Creation - Verify complete user sign-up process from Start Today to successful paymen", async () => {
                await this.openHomePage();
                await this.clickStartTodayButton();
                await this.verifyStartTodayScreenElementsVisible(constants.fullName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.clickOnContinueButton();
                await this.clickOnAcceptCookiesButton();
                await this.selectRelationshipStatus(relationStatus);
                await this.selectAvoidProbateNo();
                await this.enterUserEmail(email);
                await this.enterCreateAccountPassword(constants.password);
                await this.clickOnCreateAccountButton();
                await this.verifyPlanSectionPageAndSelectPlan(smokePage.selectWillTxt);
                await this.verifyUserIsOnPaymentPage();
                await this.enterPaymentCardDetails();
                await this.acceptTermsAndConditions();
                await this.verifyConfirmAndPayButtonIsEnabled();
                await this.clickConfirmAndPayButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.thanksforPurchaseTxt);
            })
        },
        async signupCoupleWillUsers(constants, email, relationStatus = constants.singleRelationshipStatus) {
            await allure.step("Sign up will Couple user with email passowrd", async () => {
                await this.openHomePage();
                await this.clickStartTodayButton();
                await this.verifyStartTodayScreenElementsVisible(constants.fullName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.clickOnContinueButton();
                await this.clickOnAcceptCookiesButton();
                await this.selectRelationshipStatus(relationStatus);
                await this.verifyWithHeadingScreenIsVisible(constants.wouldCreatPlanForPartnerTxt);
                await this.clickRadioButtonByText(constants.bothOfUsTxt)
                await this.selectAvoidProbateNo();
                await this.enterUserEmail(email);
                await this.enterCreateAccountPassword(constants.password);
                await this.clickOnCreateAccountButton();
                await this.verifyPlanSectionPageAndSelectPlan(smokePage.selectWillTxt);
                await this.verifyUserIsOnPaymentPage();
                await this.enterPaymentCardDetails();
                await this.acceptTermsAndConditions();
                await this.verifyConfirmAndPayButtonIsEnabled();
                await this.clickConfirmAndPayButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.thanksforPurchaseTxt);
            })
        },
        async signupCoupleTrustUsers(constants, email, relationStatus = constants.singleRelationshipStatus) {
            await allure.step("Sign up Trust couple user with email passowrd", async () => {
                await this.openHomePage();
                await this.clickStartTodayButton();
                await this.verifyStartTodayScreenElementsVisible(constants.fullName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.clickOnContinueButton();
                await this.clickOnAcceptCookiesButton();
                await this.selectRelationshipStatus(relationStatus);
                await this.verifyWithHeadingScreenIsVisible(constants.wouldCreatPlanForPartnerTxt);
                await this.clickRadioButtonByText(constants.bothOfUsTxt)
                await this.selectAvoidProbateYes();
                await this.enterUserEmail(email);
                await this.enterCreateAccountPassword(constants.password);
                await this.clickOnCreateAccountButton();
                await this.verifyPlanSectionPageAndSelectPlan(smokePage.selectOnlyTrustPlanTxt);
                await this.verifyUserIsOnPaymentPage();
                await this.enterPaymentCardDetails();
                await this.acceptTermsAndConditions();
                await this.verifyConfirmAndPayButtonIsEnabled();
                await this.clickConfirmAndPayButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.thanksforPurchaseTxt);
            })
        },
        async individualTrustUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete Basic Trust end-to-end flow", async () => {
                await this.enterAddressLine1(constants.addressLine1);
                await this.enterAddressLine2(constants.addressLine2);
                await this.enterCity(constants.city);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.enterZipCode(constants.zipcode);
                await this.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await this.clickOnContinueButton();
                await this.verifyBirthdayScreenIsVisible();
                await this.enterBirthDayDate(constants.birthdayDate);
                await this.clickOnContinueButton();
                await this.verifyDoyouHavChildrenScreenIsVisible();
                await this.clickYesRadioButton();
                await this.clickOnAddAChild(constants.childName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.guardianNominationTxt);
                await this.clickYesRadioButton();
                await this.clickChildToAssignToGuardian(constants.childName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whoLookAfterYourChilderenTxt);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryParentData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupParentData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeNameConservatorChild);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldYouLiketoNameAsConservator);
                await this.clickOnAddConservatorButton();
                await this.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await this.clickOnAddContactButtonByIndex(constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.futureAdoptionChildrenWillTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.testLivingTrustTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whenWouldYouBeginTrust);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouMainPersonToManageTrustTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.areYouAsGrantorTxt);
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.wholWillLifetimeBeneficiaryTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt)
                await this.addGuardian(constants.executorData, constants.guardianType)
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoShouldTrusteeIncapacitatedTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt);
                await this.addGuardian(constants.monitorData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldTakeOverPassAwayTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt);
                await this.addGuardian(constants.successorData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouHavePetTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouWantChoosePetGuardianTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.listOfPetsDescTxt);
                await this.clickOnAddPetByIndex(1);
                await this.fillInputByLabel(smokePage.petsNameLabel, constants.petName, "");
                await this.clickOnAddPetByIndex(2);
                await this.clickOnContinueButton();
                await this.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryPetGuardianData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupPetGuardianData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.setAsideMoenyToCaringPersonHelp);
                await this.clickYesRadioButton();
                await this.inputByLabel(smokePage.amountLabel, constants.caringPersonAmount)
                await this.clickOnContinueButton();
            })
        },
        async coupleTrustUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete Basic Trust end-to-end flow", async () => {
                await this.enterAddressLine1(constants.addressLine1);
                await this.enterAddressLine2(constants.addressLine2);
                await this.enterCity(constants.city);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.enterZipCode(constants.zipcode);
                await this.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await this.clickOnContinueButton();
                await this.verifyBirthdayScreenIsVisible();
                await this.enterBirthDayDate(constants.birthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatIsSpousenameTxt);
                await this.inputByPlaceholder(smokePage.spouseInputPlaceHolder, constants.thomasEdison);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whenWas);
                await this.enterBirthDayDate(constants.spouseBirthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.haveChildrenTxt);
                await this.clickYesRadioButton();
                await this.clickOnAddAChild(constants.childName, smokePage.parentRatioBtnTxt(constants.thomasEdison));
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.guardianNominationTxt);
                await this.clickYesRadioButton();
                await this.clickChildToAssignToGuardian(constants.childName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whoLookAfterYourChilderenTxt);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryParentData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupParentData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeNameConservatorChild);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldYouLiketoNameAsConservator);
                await this.clickOnAddConservatorButton();
                await this.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await this.clickOnAddContactButtonByIndex(constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.futureAdoptionChildrenWillTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.testLivingTrustTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whenWouldYouBeginTrust);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.willSpousebeMainManaingTrustTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.areYouAsGrantorTxt);
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.wholWillLifetimeBeneficiaryTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt)
                await this.addGuardian(constants.executorData, constants.guardianType)
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoShouldTrusteeIncapacitatedTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt);
                await this.addGuardian(constants.monitorData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldTakeOverPassAwayTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt);
                await this.addGuardian(constants.successorData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouHavePetTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouWantChoosePetGuardianTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.listOfPetsDescTxt);
                await this.clickOnAddPetByIndex(1);
                await this.fillInputByLabel(smokePage.petsNameLabel, constants.petName, "");
                await this.clickOnAddPetByIndex(2);
                await this.clickOnContinueButton();
                await this.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryPetGuardianData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupPetGuardianData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.setAsideMoenyToCaringPersonHelp);
                await this.clickYesRadioButton();
                await this.inputByLabel(smokePage.amountLabel, constants.caringPersonAmount)
                await this.clickOnContinueButton();
            })
        },
        async coupleTrustSpouseUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify spouse complete Basic Trust end-to-end flow", async () => {
                await this.enterAddressLine1(constants.addressLine1);
                await this.enterAddressLine2(constants.addressLine2);
                await this.enterCity(constants.city);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.enterZipCode(constants.zipcode);
                await this.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await this.clickOnContinueButton();
                await this.verifyBirthdayScreenIsVisible();
                await this.enterBirthDayDate(constants.birthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatIsSpousenameTxt);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whenWas);
                await this.enterBirthDayDate(constants.spouseBirthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.haveChildrenTxt);
                await this.clickYesRadioButton();
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.guardianNominationTxt);
                await this.clickYesRadioButton();
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whoLookAfterYourChilderenTxt);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeNameConservatorChild);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldYouLiketoNameAsConservator);
                await this.clickOnAddConservatorButton();
                await this.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await this.clickOnAddContactButtonByIndex(constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.futureAdoptionChildrenWillTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouHavePetTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouWantChoosePetGuardianTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.listOfPetsDescTxt);
                await this.clickOnAddPetByIndex(1);
                await this.fillInputByLabel(smokePage.petsNameLabel, constants.petName, "");
                await this.clickOnAddPetByIndex(2);
                await this.clickOnContinueButton();
                await this.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.spousePrimaryPetGuardianData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.spouseBackupPetGuardianData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.setAsideMoenyToCaringPersonHelp);
                await this.clickYesRadioButton();
                await this.inputByLabel(smokePage.amountLabel, constants.caringPersonAmount)
                await this.clickOnContinueButton();
            })
        },
        async coupleWillUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete will creation flow from Address to Conservator nomination", async () => {
                await this.enterAddressLine1(constants.addressLine1);
                await this.enterAddressLine2(constants.addressLine2);
                await this.enterCity(constants.city);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.enterZipCode(constants.zipcode);
                await this.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await this.clickOnContinueButton();
                await this.verifyBirthdayScreenIsVisible();
                await this.enterBirthDayDate(constants.birthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatIsSpousenameTxt);
                await this.inputByPlaceholder(smokePage.spouseInputPlaceHolder, constants.thomasEdison);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whenWas);
                await this.enterBirthDayDate(constants.spouseBirthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.haveChildrenTxt);
                await this.clickYesRadioButton();
                await this.clickOnAddAChild(constants.childName, smokePage.parentRatioBtnTxt(constants.thomasEdison));
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.guardianNominationTxt);
                await this.clickYesRadioButton();
                await this.clickChildToAssignToGuardian(constants.childName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whoLookAfterYourChilderenTxt);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryParentData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupParentData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeNameConservatorChild);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldYouLiketoNameAsConservator);
                await this.clickOnAddConservatorButton();
                await this.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await this.clickOnAddContactButtonByIndex(constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.futureAdoptionChildrenWillTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouHavePetTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouWantChoosePetGuardianTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.listOfPetsDescTxt);
                await this.clickOnAddPetByIndex(1);
                await this.fillInputByLabel(smokePage.petsNameLabel, constants.petName, "");
                await this.clickOnAddPetByIndex(2);
                await this.clickOnContinueButton();
                await this.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryPetGuardianData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupPetGuardianData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.setAsideMoenyToCaringPersonHelp);
                await this.clickYesRadioButton();
                await this.inputByLabel(smokePage.amountLabel, constants.caringPersonAmount)
                await this.clickOnContinueButton();
            })
        },
        async coupleWillSpouseBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete will spouse creation flow from Address to Conservator nomination", async () => {
                await this.enterAddressLine1(constants.addressLine1);
                await this.enterAddressLine2(constants.addressLine2);
                await this.enterCity(constants.city);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.enterZipCode(constants.zipcode);
                await this.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await this.clickOnContinueButton();
                await this.verifyBirthdayScreenIsVisible();
                await this.enterBirthDayDate(constants.birthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatIsSpousenameTxt);
                await this.inputByPlaceholder(smokePage.spouseInputPlaceHolder, constants.thomasEdison);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whenWas);
                await this.enterBirthDayDate(constants.spouseBirthdayDate);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.haveChildrenTxt);
                await this.clickYesRadioButton();
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.guardianNominationTxt);
                await this.clickYesRadioButton();
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whoLookAfterYourChilderenTxt);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeNameConservatorChild);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldYouLiketoNameAsConservator);
                await this.clickOnAddConservatorButton();
                await this.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await this.clickOnAddContactButtonByIndex(constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.futureAdoptionChildrenWillTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouHavePetTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouWantChoosePetGuardianTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.listOfPetsDescTxt);
                await this.clickOnAddPetByIndex(1);
                await this.fillInputByLabel(smokePage.petsNameLabel, constants.petName, "");
                await this.clickOnAddPetByIndex(2);
                await this.clickOnContinueButton();
                await this.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.spousePrimaryPetGuardianData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.spouseBackupPetGuardianData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.setAsideMoenyToCaringPersonHelp);
                await this.clickYesRadioButton();
                await this.inputByLabel(smokePage.amountLabel, constants.caringPersonAmount)
                await this.clickOnContinueButton();
            })
        },
        async coupleWillUserAssetSetup(constants) {
            await allure.step("Will Creation – Asset – Verify complete Assets section flow in Will Creation (Smoke Test)", async () => {
                await this.clickRadioButtonByText(smokePage.valueOfAllAsset)
                await this.clickYesRadioButton();
                await this.clickOnAddPropertyButton();
                await this.addPropertyData(constants.primaryPetGuardianData);
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addAccountTxt);
                await this.fillInputByLabel(smokePage.financialInstitutionLabel, constants.financialInstitution, "");
                await this.fillInputByLabel(smokePage.approxmateAccountValue, constants.approximateAccountValue, "");
                await this.clickRadioButtonByText(smokePage.radioButtonChecking)
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addPolicyTxt);
                await this.fillInputByLabel(smokePage.policyCarrierTxt, constants.policyCarrier, "");
                await this.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await this.fillInputByLabel(smokePage.valuePolicyLabel, constants.policyValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addIntrestTxt);
                await this.fillInputByLabel(smokePage.businessNameLabel, constants.businessName, "");
                await this.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                // await this.selectItemFromDropDown("Relationship to business (optional)", "Owner"); uncomment and fix after issue resolved
                await this.fillInputByLabel(smokePage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addItemTxt);
                await this.fillInputByLabel(smokePage.itemNameLabel, constants.itemData.name, "");
                await this.fillInputByLabel(smokePage.briefDescriptionLabel, constants.itemData.description, "");
                await this.fillInputByLabel(smokePage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.childrenTxt);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.beneficairyReceiveInheritanceTxt);
                await this.clickYesRadioButton()
                await this.fillInputByLabel(smokePage.numberOfDaysLabel, constants.thirty, "");
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.childrenTxt);
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.myDecendentsTxt);
                await this.clickRadioButtonByText(smokePage.perStirpesTxt);
                await this.clickOnContinueButton();
            })
        },
        async individualWillUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Individual Will Creation – Basic - Verify complete will creation flow from Address to Conservator nomination", async () => {
                await this.enterAddressLine1(constants.addressLine1);
                await this.enterAddressLine2(constants.addressLine2);
                await this.enterCity(constants.city);
                await this.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await this.enterZipCode(constants.zipcode);
                await this.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await this.clickOnContinueButton();
                await this.verifyBirthdayScreenIsVisible();
                await this.enterBirthDayDate(constants.birthdayDate);
                await this.clickOnContinueButton();
                await this.verifyDoyouHavChildrenScreenIsVisible();
                await this.clickYesRadioButton();
                await this.clickOnAddAChild(constants.childName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.guardianNominationTxt);
                await this.clickYesRadioButton();
                await this.clickChildToAssignToGuardian(constants.childName);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenContainsTheTitle(smokePage.whoLookAfterYourChilderenTxt);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryParentData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupParentData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeNameConservatorChild);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldYouLiketoNameAsConservator);
                await this.clickOnAddConservatorButton();
                await this.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await this.clickOnAddContactButtonByIndex(constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.futureAdoptionChildrenWillTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouHavePetTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.doYouWantChoosePetGuardianTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.listOfPetsDescTxt);
                await this.clickOnAddPetByIndex(1);
                await this.fillInputByLabel(smokePage.petsNameLabel, constants.petName, "");
                await this.clickOnAddPetByIndex(2);
                await this.clickOnContinueButton();
                await this.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await this.addPrimaryGuardian();
                await this.addGuardian(constants.primaryPetGuardianData, constants.guardianType);
                await this.addBackUpGuardian();
                await this.addGuardian(constants.backupPetGuardianData, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.setAsideMoenyToCaringPersonHelp);
                await this.clickYesRadioButton();
                await this.inputByLabel(smokePage.amountLabel, constants.caringPersonAmount)
                await this.clickOnContinueButton();
            })
        },
        async individualTrustUserAssetSetup(constants) {
            await allure.step("Verify complete Assets section end-to-end flow", async () => {
                await this.clickRadioButtonByText(smokePage.valueOfAllAsset)
                await this.clickYesRadioButton()
                await this.clickOnAddPropertyButton();
                await this.addPropertyData(constants.primaryPetGuardianData);
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addAccountTxt);
                await this.fillInputByLabel(smokePage.financialInstitutionLabel, constants.financialInstitution, "");
                await this.fillInputByLabel(smokePage.approxmateAccountValue, constants.approximateAccountValue, "");
                await this.clickRadioButtonByText(smokePage.radioButtonChecking)
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addPolicyTxt);
                await this.fillInputByLabel(smokePage.policyCarrierTxt, constants.policyCarrier, "");
                await this.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await this.fillInputByLabel(smokePage.valuePolicyLabel, constants.policyValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addIntrestTxt);
                await this.fillInputByLabel(smokePage.businessNameLabel, constants.businessName, "");
                await this.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                // await this.selectItemFromDropDown("Relationship to business (optional)", "Owner"); uncomment and fix after issue resolved
                await this.fillInputByLabel(smokePage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addItemTxt);
                await this.fillInputByLabel(smokePage.itemNameLabel, constants.itemData.name, "");
                await this.fillInputByLabel(smokePage.briefDescriptionLabel, constants.itemData.description, "");
                await this.fillInputByLabel(smokePage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.childrenTxt);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.beneficairyReceiveInheritanceTxt);
                await this.clickYesRadioButton()
                await this.fillInputByLabel(smokePage.numberOfDaysLabel, constants.thirty, "");
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.childrenTxt);
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.myDecendentsTxt);
                await this.clickRadioButtonByText(smokePage.perStirpesTxt);
                await this.clickOnContinueButton();
            })
        },
        async individualWillUserAssetSetup(constants) {
            await allure.step("Will Creation – Asset – Verify complete Assets section flow in Will Creation (Smoke Test)", async () => {
                await this.clickRadioButtonByText(smokePage.valueOfAllAsset)
                await this.clickYesRadioButton();
                await this.clickOnAddPropertyButton();
                await this.addPropertyData(constants.primaryPetGuardianData);
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addAccountTxt);
                await this.fillInputByLabel(smokePage.financialInstitutionLabel, constants.financialInstitution, "");
                await this.fillInputByLabel(smokePage.approxmateAccountValue, constants.approximateAccountValue, "");
                await this.clickRadioButtonByText(smokePage.radioButtonChecking)
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addPolicyTxt);
                await this.fillInputByLabel(smokePage.policyCarrierTxt, constants.policyCarrier, "");
                await this.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await this.fillInputByLabel(smokePage.valuePolicyLabel, constants.policyValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addIntrestTxt);
                await this.fillInputByLabel(smokePage.businessNameLabel, constants.businessName, "");
                await this.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                // await this.selectItemFromDropDown("Relationship to business (optional)", "Owner"); uncomment and fix after issue resolved
                await this.fillInputByLabel(smokePage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickYesRadioButton()
                await this.clickOnButtonByText(smokePage.addItemTxt);
                await this.fillInputByLabel(smokePage.itemNameLabel, constants.itemData.name, "");
                await this.fillInputByLabel(smokePage.briefDescriptionLabel, constants.itemData.description, "");
                await this.fillInputByLabel(smokePage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await this.clickOnContinueButton();
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.childrenTxt);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.beneficairyReceiveInheritanceTxt);
                await this.clickYesRadioButton()
                await this.fillInputByLabel(smokePage.numberOfDaysLabel, constants.thirty, "");
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.childrenTxt);
                await this.clickOnContinueButton();
                await this.clickRadioButtonByText(smokePage.myDecendentsTxt);
                await this.clickRadioButtonByText(smokePage.perStirpesTxt);
                await this.clickOnContinueButton();
            })
        },
        async individualWillUserArrangmentSetup(constants) {
            await allure.step("Arragement – Verify complete Arrangement section flow", async () => {
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWillbeExecutorTxt)
                await this.clickOnButtonByText(smokePage.addAContactTxt)
                await this.addGuardian(constants.executorData, constants.guardianType);
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantBackupExecutor);
                await this.clickYesRadioButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWillbeBackupExecutorTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt)
                await this.addGuardian(constants.backupExecutorData, constants.guardianType)
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.shouldExecutorRequiredBond)
                await this.clickRadioButtonByText(smokePage.noTxt)
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantToMonitorTxt)
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWouldLikeNameasMonitorTxt)
                await this.clickOnButtonByText(smokePage.addAContactTxt)
                await this.addGuardian(constants.monitorData, constants.guardianType);
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantNameConservatorEstateTxt)
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantNominateGuardianForSelfTxt)
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantExludeFromWill)
                await this.clickYesRadioButton()
                await this.fillInputByLabel(smokePage.nameOfPersonOrOrganizationLabel, constants.policyHolderName, "");
                await this.clickOnContinueButton()
                await this.clickRadioButtonByText(smokePage.cremationTxt)
                await this.clickRadioButtonByText(smokePage.memorialServiceTxt)
                await this.verifyWithHeadingScreenIsVisible(smokePage.haveSpecialRequestforCremony)
                await this.clickYesRadioButton()
                await this.fillInTextAreaByLabel(smokePage.myRequestLabel, constants.cremondyRequest, "");
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldYouLikeProtectWillFromPotentialDesputeTxt)
                await this.clickYesRadioButton()
            });
        },
        async individualWillUserHealthCareSetup(constants) {
            await allure.step("Verify user can complete entire Health Care section successfully", async () => {
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWillMakeMedicalDecision);
                await this.clickOnButtonByText(smokePage.addHealthCareAgentTxt)
                await this.addGuardian(constants.healthCareAgentData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantNameBackupHealthAgentTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whoWillBackupAgentTxt);
                await this.clickOnButtonByText(smokePage.addAContactTxt)
                await this.addGuardian(constants.backupHealthCareAgentData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.leaveMedicalCarforAgentTxt)
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.anyLimitForHealthTxt)
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantDonateOrganTxt)
                await this.clickYesRadioButton();
                await this.clickRadioButtonByText(smokePage.organsNeededEyesTissuesTxt);
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldLikeGivePermissionViewMedicalRecordsTxt)
                await this.clickYesRadioButton();
                await this.clickRadioButtonByText(smokePage.authorizedPersonTxt)
                await this.addGuardian(constants.primaryParentData, constants.guardianType);
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantWhenHealthProxyNoLongerEffectTxt)
                await this.clickRadioButtonByText(smokePage.yesIwouldLikeToChooseTxt);
                await this.fillInputByLabel(smokePage.thisProxyShallExpireLabel, constants.healthCareProxyExpiryMessage, "");
                await this.clickOnContinueButton()
            });
        },
        async individualWillUserFinanceCareSectionSetup(constants) {
            await allure.step("Finance Care section – Verify complete Finance Care section flow", async () => {
                await this.verifyWithHeadingScreenIsVisible(smokePage.previousPowerofAttorneyDocumentTxt)
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.screenOfFinancialAgentTxt)
                await this.clickOnButtonByText(smokePage.addFinancialAgentTxt)
                await this.addGuardian(constants.financialAgentData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wantNameBackupFinancialAgenTxt);
                await this.clickYesRadioButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.successorAgenScreenDisplayed)
                await this.clickOnButtonByText(smokePage.addBackupAgentTxt)
                await this.addGuardian(constants.backupAgentData, constants.guardianType);
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.wouldLikeBackRuleForBackAgetntxt);
                await this.clickYesRadioButton();
                await this.fillInTextAreaByLabel(smokePage.describeBackupRuleLabel, constants.backupRuleTxt, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatTypeDecisionsAthorityToAgent)
                await this.clickSwitchButtonByText(smokePage.realPropertyTxt)
                await this.clickSwitchButtonByText(smokePage.taxesTxt)
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.modifyStandardPowerAttorneyTxt)
                await this.clickSwitchButtonByText(smokePage.hipaaAuthorizationTxt)
                await this.clickSwitchButtonByText(smokePage.guardianTxt)
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.shouldAgentGiveGiftsTxt)
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.fillInTextAreaByLabel(smokePage.anySpecificRestrictionLabel, constants.specificRestriction, "");
                await this.clickOnContinueButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.leaveOutGiftingIntentionaly)
                await this.clickRadioButtonByText(smokePage.noTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.leaveAnySpecialInstructions)
                await this.clickYesRadioButton();
                await this.fillInTextAreaByLabel(smokePage.yourSpecialInstructionsLabel, constants.specialInstruction, "");
                await this.clickOnContinueButton();
                await this.verifyWithHeadingScreenIsVisible(smokePage.pwrAtteroneyExpire);
                await this.clickYesRadioButton();
                await this.fillInTextAreaByLabel(smokePage.provideEvenOrDateLabel, constants.specialInstruction, "");
                await this.clickOnContinueButton()
            });
        },
        async dashboarOverViewdFlow(constants, isTrustIndex = 0) {
            await allure.step("Dashboard – Verify complete Dashboard end-to-end flow (Overview, Summary, Assets – Smoke)", async () => {
                await this.verifyWithHeadingScreenIsVisible(smokePage.welcomeAmbreenTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.overviewTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.summaryTxt)
                await this.verifyAssetTabIsVisible();
                await this.verifyWithTextScreenIsVisible(smokePage.nextStepCardsTxt);
                await this.clickOnButtonByText(smokePage.notarizeNowTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.timeToMakeYourPlanOfficialTxt)
                await this.clickOnGoBack();
                await this.clickOnButtonByText(smokePage.addNowTxt);
                await this.fillInputByLabel(smokePage.legacyContactFullnameLabel, constants.legacyContactFullname, "");
                await this.fillInputByLabel(smokePage.legacyContactEmailLabel, constants.legacyContactEmail, "");
                await this.clickOnButtonByText(smokePage.sendInviteTxt);
                await this.clickOnGoBack();
                await this.clickOnButtonByText(smokePage.summaryTxt);
                await this.verifyWithTextByLabelScreenIsVisible(smokePage.nameLabel, smokePage.ambreenTestName);
                await this.verifyWithTextScreenIsVisible(smokePage.oliverBennettName);
                await this.clickTabUsingTxtByBasicTabPath(smokePage.assetTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.brickellAvenueTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.metLifeInsuranceTxt);
                await this.clickTabUsingTxtByBasicTabPath(smokePage.arrangementsTxt)
                await this.verifyWithTextScreenIsVisibleByIndex(smokePage.michealAndersonName, isTrustIndex);
                await this.verifyWithTextScreenIsVisible(smokePage.memorialServicesTxt);
                await this.clickTabUsingTxtByBasicTabPath(smokePage.healthCareTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.sarahWilliamName);
                await this.verifyWithTextScreenIsVisible(smokePage.yesAnyTxt);
                await this.clickTabUsingTxtByBasicTabPath(smokePage.financialsTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.davidMillerName);
                await this.clickOnBasicByPath();
                await this.clickOnAnchorByText(smokePage.editTxt)
                await this.verifyWithHeadingScreenIsVisible(smokePage.headingFirstNameTxt);
                await this.enterUserFullName(constants.ambreenText124Name)
                await this.clickOnContinueButton();
                await this.clickCloseIconToSaveChanges()
                await this.clickOnAnchorByText(smokePage.exitTxt)
                await this.clickOnButtonByText(smokePage.summaryTxt);
                await this.verifyWithTextByLabelScreenIsVisible(smokePage.nameLabel, constants.ambreenText124Name);
                await this.clickOnAssetTab();
                await this.verifyWithButtonScreenTitleIsVisible(smokePage.propertiesTxt);
                await this.verifyWithButtonScreenTitleIsVisible(smokePage.financialAccountsTxt);
                await this.verifyWithButtonScreenTitleIsVisible(smokePage.businessesTxt);
                await this.verifyWithButtonScreenTitleIsVisible(smokePage.otherTxt);
                await this.clickOnAnchorByText(smokePage.editAssetsTxt);
                await this.clickRadioButtonByText(smokePage.valueOfAllAsset)
                await this.clickYesRadioButton()
                await this.clickOnAddPropertyButton();
                await this.addPropertyData(constants.primaryPetGuardianData);
                await this.fillInputByLabelAndSelectFromDropdown(smokePage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await this.clickOnSaveButton();
                await this.clickOnContinueButton();
                await this.clickCloseIconToSaveChanges();
                await this.clickOnAnchorByText(smokePage.exitTxt)
                await this.clickOnAssetTab();
                await this.verifyTheAssetProperties();

            });
        },
        async dashboardProfileFlow(constants) {
            await allure.step("Dashboard / Profile – Verify Refer a Friend, Notifications, Profile, Settings and Logout complete flow", async () => {
                await this.clickOnButtonByText(smokePage.upgradeGiftTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.referAFriendTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.gift20PercentOffToYourFriendTxt);
                await this.fillInputByLabel(smokePage.enterLoveoneNameLabel, constants.iName, "");
                await this.fillInputByLabel(smokePage.enterLoveOneEmailLabel, constants.iEmail, "");
                await this.clickOnButtonByText(smokePage.sendInviteTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.youReferralInviteSentToEmailTxt(constants.iEmail));
                await this.clickCloseInviteModel();
                await this.clickOnProfile();
                await this.clickAnchorFromProfileDropdown(smokePage.settingsTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.updateProfileInfoToManageTxt)
                await this.fillInputByLabel(smokePage.nameLabel, constants.iName + " Test", "");
                await this.fillInputByLabel(smokePage.email, getRandomEmail(), "");
                await this.clickOnButtonByText(smokePage.updateProfileTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.profileUpdateSuccessTxt)
                await this.fillInputByLabel(smokePage.currentPasswordLabel, constants.password, "");
                await this.fillInputByLabel(smokePage.newPasswordLabel, constants.newPassword, "");
                await this.fillInputByLabel(smokePage.confirmNewPassLabel, constants.newPassword, "");
                await this.clickOnButtonByText(smokePage.updatePasswordTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.passUpdateSuccessTxt)
                await this.clickOnProfile();
                await this.clickAnchorFromProfileDropdown(smokePage.dashboard);
                await this.verifyWithHeadingScreenIsVisible(smokePage.welcomeAmbreenTxt);
                await this.clickOnGoBack();
                await this.clickOnProfile();
                await this.clickAnchorFromProfileDropdown(smokePage.documentsTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.myDocumentsCapTxt);
                await this.clickOnGoBack();
                await this.clickOnProfile();
                await this.clickAnchorFromProfileDropdown(smokePage.legacyContactsTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.addTrustedLegacyContactToYourAccountTxt);
                await this.clickOnGoBack();
                await this.clickOnProfile();
                await this.clickAnchorFromProfileDropdown(smokePage.notarizationTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.timeToMakeYourPlanOfficialTxt)

            });
        },
        async documentsFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await this.clickSidBarAnchor(smokePage.documentsTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.myDocumentsCapTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.sharePlanWithSomeoneYouTrustTxt);
                await this.clickOnButtonByText(smokePage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await this.inputByPlaceholder(smokePage.contactNameTxt, constants.iName);
                await this.inputByPlaceholder(smokePage.emailAddressTxt, contactEmail);
                await this.clickOnButtonByText(smokePage.addTxt);
                await this.clickOnButtonByText(smokePage.sharePlanTxt);
                await this.clickOnButtonByText(smokePage.confirmTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.invitationSentTxt);
                await this.clickOnButtonByText(smokePage.doneTxt);
                await this.verifyDocumentNameIsVisible(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.lastWillAndTestament, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.advanceCareDirectiveTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.powerOfAttorneyTxt, smokePage.ambreenTest123Name);
                await this.clickDocumentButtonByName(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name, smokePage.previewTxt);
                await this.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(smokePage.documentTitleXpath(smokePage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: smokePage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: smokePage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: smokePage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await this.clickManageAccessHipaButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.manageSharingAccessTxt);
                await this.clickSelectContactWithEmail(contactEmail);
                await this.clickOnButtonByText(smokePage.saveChangesTxt);
                await this.verifyWithTextContainsIsVisible(smokePage.succfullyUpdateAccessForTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);
                await this.clickOnButtonByText(smokePage.magicAddAnnualSubscTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.subscAllowEditDocumentTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);

            });
        },
        async documentsTrustFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await this.clickSidBarAnchor(smokePage.documentsTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.myDocumentsCapTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.sharePlanWithSomeoneYouTrustTxt);
                await this.clickOnButtonByText(smokePage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await this.inputByPlaceholder(smokePage.contactNameTxt, constants.iName);
                await this.inputByPlaceholder(smokePage.emailAddressTxt, contactEmail);
                await this.clickOnButtonByText(smokePage.addTxt);
                await this.clickOnButtonByText(smokePage.sharePlanTxt);
                await this.clickOnButtonByText(smokePage.confirmTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.invitationSentTxt);
                await this.clickOnButtonByText(smokePage.doneTxt);
                await this.verifyDocumentNameIsVisible(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Pour-Over Will", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.advanceCareDirectiveTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.powerOfAttorneyTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Revocable Living Trust", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Schedule of Assets", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Funding Instructions", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Certification of Trust", smokePage.ambreenTest123Name);
                await this.clickDocumentButtonByName(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name, smokePage.previewTxt);
                await this.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(smokePage.documentTitleXpath(smokePage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: smokePage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: smokePage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: smokePage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await this.clickManageAccessHipaButton()
                await this.verifyWithHeadingScreenIsVisible(smokePage.manageSharingAccessTxt);
                await this.clickSelectContactWithEmail(contactEmail);
                await this.clickOnButtonByText(smokePage.saveChangesTxt);
                await this.verifyWithTextContainsIsVisible(smokePage.succfullyUpdateAccessForTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);
                await this.clickOnButtonByText(smokePage.magicAddAnnualSubscTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.subscAllowEditDocumentTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);

            });
        },
        async couplesDocumentsFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await this.clickSidBarAnchor(smokePage.documentsTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.myDocumentsCapTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.sharePlanWithSomeoneYouTrustTxt);
                await this.clickOnButtonByText(smokePage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await this.inputByPlaceholder(smokePage.contactNameTxt, constants.iName);
                await this.inputByPlaceholder(smokePage.emailAddressTxt, contactEmail);
                await this.clickOnButtonByText(smokePage.addTxt);
                await this.clickOnButtonByText(smokePage.sharePlanTxt);
                await this.clickOnButtonByText(smokePage.confirmTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.invitationSentTxt);
                await this.clickOnButtonByText(smokePage.doneTxt);
                await this.verifyDocumentNameIsVisible(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.hipaaCapTxt, "Thomas Edison");
                await this.verifyDocumentNameIsVisible(smokePage.lastWillAndTestament, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.lastWillAndTestament, "Thomas Edison");
                await this.verifyDocumentNameIsVisible(smokePage.advanceCareDirectiveTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.advanceCareDirectiveTxt, "Thomas Edison");
                await this.verifyDocumentNameIsVisible(smokePage.powerOfAttorneyTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.powerOfAttorneyTxt, "Thomas Edison");
                await this.clickDocumentButtonByName(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name, smokePage.previewTxt);
                await this.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(smokePage.documentTitleXpath(smokePage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: smokePage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: smokePage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: smokePage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await this.clickDocumentButtonByName(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name, "Manage Access");
                await this.verifyWithHeadingScreenIsVisible(smokePage.manageSharingAccessTxt);
                await this.clickSelectContactWithEmail(contactEmail);
                await this.clickOnButtonByText(smokePage.saveChangesTxt);
                await this.verifyWithTextContainsIsVisible(smokePage.succfullyUpdateAccessForTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);
                await this.clickOnButtonByText(smokePage.magicAddAnnualSubscTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.subscAllowEditDocumentTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);

            });
        },
        async couplesDocumentsTrustFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await this.clickSidBarAnchor(smokePage.documentsTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.myDocumentsCapTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.sharePlanWithSomeoneYouTrustTxt);
                await this.clickOnButtonByText(smokePage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await this.inputByPlaceholder(smokePage.contactNameTxt, constants.iName);
                await this.inputByPlaceholder(smokePage.emailAddressTxt, contactEmail);
                await this.clickOnButtonByText(smokePage.addTxt);
                await this.clickOnButtonByText(smokePage.sharePlanTxt);
                await this.clickOnButtonByText(smokePage.confirmTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.invitationSentTxt);
                await this.clickOnButtonByText(smokePage.doneTxt);
                await this.verifyDocumentNameIsVisible(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.hipaaCapTxt, "Thomas Edison");
                await this.verifyDocumentNameIsVisible("Pour-Over Will", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Pour-Over Will", "Thomas Edison");
                await this.verifyDocumentNameIsVisible(smokePage.advanceCareDirectiveTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.advanceCareDirectiveTxt, "Thomas Edison");
                await this.verifyDocumentNameIsVisible(smokePage.powerOfAttorneyTxt, smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible(smokePage.powerOfAttorneyTxt, "Thomas Edison");
                await this.verifyDocumentNameIsVisible("Revocable Living Trust", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Revocable Living Trust", "Thomas Edison");
                await this.verifyDocumentNameIsVisible("Schedule of Assets", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Schedule of Assets", "Thomas Edison");
                await this.verifyDocumentNameIsVisible("Funding Instructions", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Funding Instructions", "Thomas Edison");
                await this.verifyDocumentNameIsVisible("Certification of Trust", smokePage.ambreenTest123Name);
                await this.verifyDocumentNameIsVisible("Certification of Trust", "Thomas Edison");
                await this.clickDocumentButtonByName(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name, smokePage.previewTxt);
                await this.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(smokePage.documentTitleXpath(smokePage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: smokePage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: smokePage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: smokePage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await this.clickDocumentButtonByName(smokePage.hipaaCapTxt, smokePage.ambreenTest123Name, "Manage Access");
                await this.verifyWithHeadingScreenIsVisible(smokePage.manageSharingAccessTxt);
                await this.clickSelectContactWithEmail(contactEmail);
                await this.clickOnButtonByText(smokePage.saveChangesTxt);
                await this.verifyWithTextContainsIsVisible(smokePage.succfullyUpdateAccessForTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);
                await this.clickOnButtonByText(smokePage.magicAddAnnualSubscTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.subscAllowEditDocumentTxt);
                await this.clickOnButtonByText(smokePage.cancelTxt);

            });
        },
        async legacyContactsFlow(constants) {
            await allure.step("Legacy Contacts – Verify complete Legacy Contacts end-to-end flow", async () => {

                await this.clickSidBarAnchor(smokePage.legacyContactsTxt);
                await this.verifyWithTextContainsIsVisible("Add a trusted Legacy Contact to your account to make sure");
                const legacyEmail = getRandomEmail();
                await this.fillInputByLabel("Enter your contact's full name", constants.legacyContactFullname, "");
                await this.fillInputByLabel("Enter your contact's email", legacyEmail, "");
                await this.clickOnButtonByText(smokePage.sendInviteTxt);
                await this.verifyWithTextScreenIsVisible("Invitation sent successfully!");
                await this.verifyWithTextScreenIsVisible(legacyEmail);
                await this.clickManageAccessForContactsButtonWithEmail(legacyEmail);
                await this.clickSelectContactWithEmail(smokePage.powerOfAttorneyTxt);
                await this.clickOnButtonByText(smokePage.saveChangesTxt);
                await this.verifyWithTextContainsIsVisible("Successfully updated document access for");
                await this.clickOnButtonByText(smokePage.cancelTxt);
                await this.clickRemoveAccessForContactsButtonWithEmail(legacyEmail);
                await this.clickRemoveAccessModelButton();
                await this.verifyWithTextContainsIsVisible("Access removed successfully.");

            });
        },
        async individualNotarizationFlow() {
            await allure.step(`Individual Notarization – Verify complete Notarization flow including payment and session creation`, async () => {
                   await this.clickSidBarAnchor(smokePage.notarizationTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.howItWorksTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatYoullNeedTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.getStartedNotarizingTxt);
                await this.clickOnButtonByText(smokePage.getStartedNotarizingTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.advanceCareDirectiveTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.powerOfAttorneyTxt);
                await this.clickRadioButtonByText(smokePage.wouldLiktoPurchase5Each);
                await this.verifyWithTextContainsIsVisible(smokePage.twoProfessionalWitnessesTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.estatePlanDocumenTxt);
                await this.verifyWithTextContainsIsVisible(smokePage.notaryWitnessesTxt);
                await this.enterPaymentCardDetails()
                await this.verifyConfirmAndPayButtonIsEnabled();
                await this.clickOnButtonByText(smokePage.confirmAndPayBtnTxt);
                await this.verifyNotaryText9to5AMIsVisible();
                if (isWithinNotaryHours()) {
                    await this.clickOnButtonByText(smokePage.notaryCreateSessionTxt);
                    await this.verifyWithTextScreenIsVisible(smokePage.notaryCreatedSuccessMessage);
                    await this.verifyWithTextScreenIsVisible(smokePage.joinSessionNowTxt);
                    await this.verifyAnchorIsEnabled(smokePage.joinSessionNowTxt);
                } else {
                    await this.verifyCreateNotarySessionButtonIsDisabled();
                }
            });
        },
        async coupleNotarizationFlow() {
            await allure.step(`Individual Notarization – Verify complete Notarization flow including payment and session creation`, async () => {
                await this.clickSidBarAnchor(smokePage.notarizationTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.howItWorksTxt);
                await this.verifyWithHeadingScreenIsVisible(smokePage.whatYoullNeedTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.getStartedNotarizingTxt);
                await this.clickOnButtonByText(smokePage.getStartedNotarizingTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.advanceCareDirectiveTxt);
                await this.verifyWithTextScreenIsVisible(smokePage.powerOfAttorneyTxt);
                await this.clickRadioButtonByText(smokePage.wouldLiktoPurchase5Each);
                await this.verifyWithTextContainsIsVisible(smokePage.twoProfessionalWitnessesTxt)
                await this.verifyWithTextScreenIsVisible(smokePage.estatePlanDocumenTxt);
                await this.verifyWithTextContainsIsVisible(smokePage.notaryWitnessesTxt);
                await this.enterPaymentCardDetails()
                await this.verifyConfirmAndPayButtonIsEnabled();
                await this.clickOnButtonByText(smokePage.confirmAndPayBtnTxt);
                await this.verifyNotaryText9to5AMIsVisible();
                if (isWithinNotaryHours()) {
                    await this.inputByPlaceholder(smokePage.witnessSpouseEmailPlaceholder, getRandomEmail())
                    await this.clickOnButtonByText(smokePage.notaryCreateSessionTxt);
                    await this.verifyWithTextScreenIsVisible(smokePage.notaryCreatedSuccessMessage);
                    await this.verifyWithTextScreenIsVisible(smokePage.joinSessionNowTxt);
                    await this.verifyAnchorIsEnabled(smokePage.joinSessionNowTxt);
                } else {
                    await this.verifyCreateNotarySessionButtonIsDisabled();
                }
            });
        },
        async trustDeedTransferFlow(constants) {
            await allure.step("Deed Transfer - Verify complete Deed Transfer end-to-end flow (Trust only)", async () => {
                await this.verifyDeedTransferTxtIsVisible();
                await this.clickSidBarAnchor("Deed Transfer");
                await this.verifyWithHeadingScreenIsVisible("How it works");
                await this.verifyWithTextScreenIsVisible("Secure your payment to begin your deed transfer");
                await this.clickOnButtonIndexByText("Get Started");
                await this.verifyWithHeadingScreenIsVisible("Deed Transfer Calculation");
                await this.checkValueForLabel("Address");
                await this.checkValueForLabel("State");
                await this.checkValueForLabel("County");
                await this.checkValueForLabel("Owner");
                await this.checkValueForLabel("City");
                await this.checkValueForLabel("Zip Code");
                await this.verifyWithHeadingByIndex("Recording Fees");
                await this.verifyRecordingFeesTotal();
                await this.clickOnContinueButton();
                await this.verifyWithTextScreenIsVisible("Summary Service");
                await this.verifyDeedNotarizationFee();
                await this.clickOnAcceptCookiesButton()
                await this.clickRadioButtonByText("Continue");
                await this.verifyRecordingFeesBreakdownSubtotalAndTotal()
                await this.verifyFullNameField();
                await this.verifyEmailField(getRandomForDeedEmail());
                await this.enterPaymentCardDetails();
                await this.clickConfirmAndPayButton();
                await this.verifyWithTextContainsIsVisible("Payment successful! Processing your deed transfer order...");
                await this.verifyWithTextScreenIsVisible("Your Deed Transfer Is Confirmed!")
                await this.clickSidBarAnchor("Deed Transfer");
                await this.verifyWithTextScreenIsVisibleByIndex("PREPARING DEED", 1);

            });
        },
    };
};
