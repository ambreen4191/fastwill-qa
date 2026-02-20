import { allure } from 'allure-playwright';
import { generalPage } from '../pages/general.page';
import { generalSteps } from './general.steps';
const { isWithinNotaryHours } = require('../utils/helper');
const { getRandomEmail, prepareDownloadFolder, downloadAndVerifyFile, getRandomForDeedEmail } = require('../utils/helper');

export const smokeSteps = (page) => {
    const generalStep = generalSteps(page);
    return {
        async signupIndividualTrustUsers(constants, email) {
            await allure.step("Sign up Trust individual user with email passowrd", async () => {
                await generalStep.openHomePage();
                await generalStep.clickStartTodayButton();
                await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
                await generalStep.clickOnContinueButton();
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.clickOnAcceptCookiesButton();
                await generalStep.selectRelationshipStatus(constants.singleRelationshipStatus);
                await generalStep.selectAvoidProbateYes();
                await generalStep.enterUserEmail(email);
                await generalStep.enterCreateAccountPassword(constants.password);
                await generalStep.clickOnCreateAccountButton();
                await generalStep.verifyPlanSectionPageAndSelectPlan(generalPage.selectTrustOnly);
                await generalStep.verifyUserIsOnPaymentPage();
                await generalStep.enterPaymentCardDetails();
                await generalStep.acceptTermsAndConditions();
                await generalStep.verifyConfirmAndPayButtonIsEnabled();
                await generalStep.clickConfirmAndPayButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.thanksforPurchaseTxt);
            })
        },
        async signupIndividualWillUsers(constants, email, relationStatus = constants.singleRelationshipStatus) {
            await allure.step("Signup / Will Creation - Verify complete user sign-up process from Start Today to successful paymen", async () => {
                await generalStep.openHomePage();
                await generalStep.clickStartTodayButton();
                await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.clickOnAcceptCookiesButton();
                await generalStep.selectRelationshipStatus(relationStatus);
                await generalStep.selectAvoidProbateNo();
                await generalStep.enterUserEmail(email);
                await generalStep.enterCreateAccountPassword(constants.password);
                await generalStep.clickOnCreateAccountButton();
                await generalStep.verifyPlanSectionPageAndSelectPlan(generalPage.selectWillOnlyTxt);
                await generalStep.verifyUserIsOnPaymentPage();
                await generalStep.enterPaymentCardDetails();
                await generalStep.acceptTermsAndConditions();
                await generalStep.verifyConfirmAndPayButtonIsEnabled();
                await generalStep.clickConfirmAndPayButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.thanksforPurchaseTxt);
            })
        },
        async signupCoupleWillUsers(constants, email, relationStatus = constants.singleRelationshipStatus) {
            await allure.step("Sign up will Couple user with email passowrd", async () => {
                await generalStep.openHomePage();
                await generalStep.clickStartTodayButton();
                await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.clickOnAcceptCookiesButton();
                await generalStep.selectRelationshipStatus(relationStatus);
                await generalStep.verifyWithHeadingScreenIsVisible(constants.wouldCreatPlanForPartnerTxt);
                await generalStep.clickRadioButtonByText(constants.bothOfUsTxt)
                await generalStep.selectAvoidProbateNo();
                await generalStep.enterUserEmail(email);
                await generalStep.enterCreateAccountPassword(constants.password);
                await generalStep.clickOnCreateAccountButton();
                await generalStep.verifyPlanSectionPageAndSelectPlan(generalPage.selectWillOnlyTxt);
                await generalStep.verifyUserIsOnPaymentPage();
                await generalStep.enterPaymentCardDetails();
                await generalStep.acceptTermsAndConditions();
                await generalStep.verifyConfirmAndPayButtonIsEnabled();
                await generalStep.clickConfirmAndPayButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.thanksforPurchaseTxt);
            })
        },
        async signupCoupleTrustUsers(constants, email, relationStatus = constants.singleRelationshipStatus) {
            await allure.step("Sign up Trust couple user with email passowrd", async () => {
                await generalStep.openHomePage();
                await generalStep.clickStartTodayButton();
                await generalStep.verifyStartTodayScreenElementsVisible(constants.fullName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(constants.whatStatYouLivedTxt);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.clickOnAcceptCookiesButton();
                await generalStep.selectRelationshipStatus(relationStatus);
                await generalStep.verifyWithHeadingScreenIsVisible(constants.wouldCreatPlanForPartnerTxt);
                await generalStep.clickRadioButtonByText(constants.bothOfUsTxt)
                await generalStep.selectAvoidProbateYes();
                await generalStep.enterUserEmail(email);
                await generalStep.enterCreateAccountPassword(constants.password);
                await generalStep.clickOnCreateAccountButton();
                await generalStep.verifyPlanSectionPageAndSelectPlan(generalPage.selectTrustOnly);
                await generalStep.verifyUserIsOnPaymentPage();
                await generalStep.enterPaymentCardDetails();
                await generalStep.acceptTermsAndConditions();
                await generalStep.verifyConfirmAndPayButtonIsEnabled();
                await generalStep.clickConfirmAndPayButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.thanksforPurchaseTxt);
            })
        },
        async individualTrustUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete Basic Trust end-to-end flow", async () => {
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyDoyouHavChildrenScreenIsVisible();
                await generalStep.clickYesRadioButton();
                await generalStep.clickAddAChildAndItsDetails(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickChildToAssignToGuardian(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryParentData, constants.guardianType);
                /** uncomment the below code when bug related this gets fixed */
                // await generalStep.addBackUpGuardian();
                // await generalStep.createAndAssignContact(constants.backupParentData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeNameConservatorChild);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldYouLiketoNameAsConservator);
                await generalStep.clickOnAddConservatorButton();
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.clickOnAddContactButtonByIndex(constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.testLivingTrustTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whenWouldYouBeginTrust);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouMainPersonToManageTrustTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.areYouAsGrantorTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wholWillLifetimeBeneficiaryTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.executorData, constants.guardianType)
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoShouldTrusteeIncapacitatedTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.monitorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldTakeOverPassAwayTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.successorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryPetGuardianData, constants.guardianType);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupPetGuardianData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount)
                await generalStep.clickOnContinueButton();
            })
        },
        async coupleTrustUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete Basic Trust end-to-end flow", async () => {
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatIsSpousenameTxt);
                await generalStep.inputByPlaceholder(generalPage.spouseInputPlaceHolder, constants.thomasEdison);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whenWas);
                await generalStep.enterBirthDayDate(constants.spouseBirthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.haveChildrenTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickAddAChildAndItsDetails(constants.childName, constants.childDOB, generalPage.parentRatioBtnTxt(constants.thomasEdison));
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickChildToAssignToGuardian(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryParentData, constants.guardianType);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupParentData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeNameConservatorChild);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldYouLiketoNameAsConservator);
                await generalStep.clickOnAddConservatorButton();
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.clickOnAddContactButtonByIndex(constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.testLivingTrustTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whenWouldYouBeginTrust);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.willSpousebeMainManaingTrustTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.areYouAsGrantorTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wholWillLifetimeBeneficiaryTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.executorData, constants.guardianType)
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoShouldTrusteeIncapacitatedTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.monitorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldTakeOverPassAwayTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.successorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryPetGuardianData, constants.guardianType);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupPetGuardianData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount)
                await generalStep.clickOnContinueButton();
            })
        },
        async coupleTrustSpouseUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify spouse complete Basic Trust end-to-end flow", async () => {
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatIsSpousenameTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whenWas);
                await generalStep.enterBirthDayDate(constants.spouseBirthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.haveChildrenTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeNameConservatorChild);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldYouLiketoNameAsConservator);
                await generalStep.clickOnAddConservatorButton();
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.clickOnAddContactButtonByIndex(constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount)
                await generalStep.clickOnContinueButton();
            })
        },
        async coupleWillUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete will creation flow from Address to Conservator nomination", async () => {
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatIsSpousenameTxt);
                await generalStep.inputByPlaceholder(generalPage.spouseInputPlaceHolder, constants.thomasEdison);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whenWas);
                await generalStep.enterBirthDayDate(constants.spouseBirthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.haveChildrenTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickAddAChildAndItsDetails(constants.childName, constants.childDOB, generalPage.parentRatioBtnTxt(constants.thomasEdison));
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickChildToAssignToGuardian(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryParentData, constants.guardianType);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupParentData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeNameConservatorChild);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldYouLiketoNameAsConservator);
                await generalStep.clickOnAddConservatorButton();
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.clickOnAddContactButtonByIndex(constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryPetGuardianData, constants.guardianType);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupPetGuardianData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount)
                await generalStep.clickOnContinueButton();
            })
        },
        async coupleWillSpouseBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete will spouse creation flow from Address to Conservator nomination", async () => {
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatIsSpousenameTxt);
                await generalStep.inputByPlaceholder(generalPage.spouseInputPlaceHolder, constants.thomasEdison);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whenWas);
                await generalStep.enterBirthDayDate(constants.spouseBirthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.haveChildrenTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeNameConservatorChild);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldYouLiketoNameAsConservator);
                await generalStep.clickOnAddConservatorButton();
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.clickOnAddContactButtonByIndex(constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount)
                await generalStep.clickOnContinueButton();
            })
        },
        async coupleWillUserAssetSetup(constants, beneficiaryTxt = generalPage.beneficairyReceiveInheritanceTxt) {
            await allure.step("Will Creation – Asset – Verify complete Assets section flow in Will Creation (Smoke Test)", async () => {
                await generalStep.clickRadioButtonByText(generalPage.valueOfAllAsset)
                await generalStep.clickYesRadioButton();
                await generalStep.clickOnAddPropertyButton();
                await generalStep.addPropertyData(constants.primaryPetGuardianData);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addAccountTxt);
                await generalStep.fillInputByLabel(generalPage.financialInstitutionLabel, constants.financialInstitution, "");
                await generalStep.fillInputByLabel(generalPage.approxmateAccountValue, constants.approximateAccountValue, "");
                await generalStep.clickRadioButtonByText(generalPage.radioButtonChecking)
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addPolicyTxt);
                await generalStep.fillInputByLabel(generalPage.policyCarrierTxt, constants.policyCarrier, "");
                await generalStep.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await generalStep.fillInputByLabel(generalPage.valuePolicyLabel, constants.policyValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addIntrestTxt);
                await generalStep.fillInputByLabel(generalPage.businessNameLabel, constants.businessName, "");
                await generalStep.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                await generalStep.selectItemFromDropDown(generalPage.ownerTxt.substring(0, 3), generalPage.ownerTxt);
                await generalStep.fillInputByLabel(generalPage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addItemTxt);
                await generalStep.fillInputByLabel(generalPage.itemNameLabel, constants.itemData.name, "");
                await generalStep.fillInputByLabel(generalPage.briefDescriptionLabel, constants.itemData.description, "");
                await generalStep.fillInputByLabel(generalPage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(beneficiaryTxt);
                if (beneficiaryTxt === generalPage.beneficairyReceiveInheritanceTxt) {
                    await generalStep.clickYesRadioButton();
                }
                await generalStep.fillInputByLabel(generalPage.numberOfDaysLabel, constants.thirty, "");
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.myDecendentsTxt);
                await generalStep.clickRadioButtonByText(generalPage.perStirpesTxt);
                await generalStep.clickOnContinueButton();
            })
        },
        async individualWillUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Individual Will Creation – Basic - Verify complete will creation flow from Address to Conservator nomination", async () => {
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyDoyouHavChildrenScreenIsVisible();
                await generalStep.clickYesRadioButton();
                await generalStep.clickAddAChildAndItsDetails(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.clickChildToAssignToGuardian(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryParentData, constants.guardianType);
                // await generalStep.addBackUpGuardian();
                // await generalStep.createAndAssignContact(constants.backupParentData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeNameConservatorChild);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldYouLiketoNameAsConservator);
                await generalStep.clickOnAddConservatorButton();
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.clickOnAddContactButtonByIndex(constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryPetGuardianData, constants.guardianType);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupPetGuardianData, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount)
                await generalStep.clickOnContinueButton();
            })
        },
        async individualTrustUserAssetSetup(constants) {
            await allure.step("Verify complete Assets section end-to-end flow", async () => {
                await generalStep.clickRadioButtonByText(generalPage.valueOfAllAsset)
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.currentAddressPropTxt);
                await generalStep.clickYesRadioButton();     
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.provideDetailOfPropertyTxt);           
                await generalStep.clickOnButtonByXpath(generalPage.editPetXpath);
                await generalStep.clickOnButtonByText(generalPage.updatePropertyTxt);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnAddPropertyButton();
                await generalStep.addPropertyData(constants.primaryPetGuardianData);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addAccountTxt);
                await generalStep.fillInputByLabel(generalPage.financialInstitutionLabel, constants.financialInstitution, "");
                await generalStep.fillInputByLabel(generalPage.approxmateAccountValue, constants.approximateAccountValue, "");
                await generalStep.clickRadioButtonByText(generalPage.radioButtonChecking)
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addPolicyTxt);
                await generalStep.fillInputByLabel(generalPage.policyCarrierTxt, constants.policyCarrier, "");
                await generalStep.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await generalStep.fillInputByLabel(generalPage.valuePolicyLabel, constants.policyValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addIntrestTxt);
                await generalStep.fillInputByLabel(generalPage.businessNameLabel, constants.businessName, "");
                await generalStep.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                await generalStep.selectItemFromDropDown(generalPage.ownerTxt.substring(0, 3), generalPage.ownerTxt);
                await generalStep.fillInputByLabel(generalPage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addItemTxt);
                await generalStep.fillInputByLabel(generalPage.itemNameLabel, constants.itemData.name, "");
                await generalStep.fillInputByLabel(generalPage.briefDescriptionLabel, constants.itemData.description, "");
                await generalStep.fillInputByLabel(generalPage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.beneficairyReceiveInheritanceTxt);
                await generalStep.clickYesRadioButton()
                await generalStep.fillInputByLabel(generalPage.numberOfDaysLabel, constants.thirty, "");
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.myDecendentsTxt);
                await generalStep.clickRadioButtonByText(generalPage.perStirpesTxt);
                await generalStep.clickOnContinueButton();
            })
        },
        async individualWillUserAssetSetup(constants, beneficiariesTxt = generalPage.beneficairyReceiveInheritanceTxt) {
            await allure.step("Will Creation – Asset – Verify complete Assets section flow in Will Creation (Smoke Test)", async () => {
                await generalStep.clickRadioButtonByText(generalPage.valueOfAllAsset)
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doyouHaveAnyPropertyTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.currentAddressPropTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.provideDetailOfPropertyTxt);                
                await generalStep.clickOnButtonByXpath(generalPage.editPetXpath);
                await generalStep.clickOnButtonByText(generalPage.updatePropertyTxt);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnAddPropertyButton();
                await generalStep.addPropertyData(constants.primaryPetGuardianData);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addAccountTxt);
                await generalStep.fillInputByLabel(generalPage.financialInstitutionLabel, constants.financialInstitution, "");
                await generalStep.fillInputByLabel(generalPage.approxmateAccountValue, constants.approximateAccountValue, "");
                await generalStep.clickRadioButtonByText(generalPage.radioButtonChecking)
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addPolicyTxt);
                await generalStep.fillInputByLabel(generalPage.policyCarrierTxt, constants.policyCarrier, "");
                await generalStep.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await generalStep.fillInputByLabel(generalPage.valuePolicyLabel, constants.policyValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addIntrestTxt);
                await generalStep.fillInputByLabel(generalPage.businessNameLabel, constants.businessName, "");
                await generalStep.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                await generalStep.selectItemFromDropDown(generalPage.ownerTxt.substring(0, 3), generalPage.ownerTxt);
                await generalStep.fillInputByLabel(generalPage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addItemTxt);
                await generalStep.fillInputByLabel(generalPage.itemNameLabel, constants.itemData.name, "");
                await generalStep.fillInputByLabel(generalPage.briefDescriptionLabel, constants.itemData.description, "");
                await generalStep.fillInputByLabel(generalPage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(beneficiariesTxt);
                await generalStep.fillInputByLabel(generalPage.numberOfDaysLabel, constants.thirty, "");
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.myDecendentsTxt);
                await generalStep.clickRadioButtonByText(generalPage.perStirpesTxt);
                await generalStep.clickOnContinueButton();
            })
        },
        async coupleSpouseWillUserAssetSetup(constants, beneficiariesTxt = generalPage.beneficairyReceiveInheritanceTxt) {
            await allure.step("Will Creation – Asset – Verify complete Assets section flow in Will Creation (Smoke Test)", async () => {
                await generalStep.clickRadioButtonByText(generalPage.valueOfAllAsset);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.provideDetailOfPropertyTxt);
                await generalStep.clickOnAddPropertyButton();
                await generalStep.addPropertyData(constants.primaryPetGuardianData);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addAccountTxt);
                await generalStep.fillInputByLabel(generalPage.financialInstitutionLabel, constants.financialInstitution, "");
                await generalStep.fillInputByLabel(generalPage.approxmateAccountValue, constants.approximateAccountValue, "");
                await generalStep.clickRadioButtonByText(generalPage.radioButtonChecking)
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addPolicyTxt);
                await generalStep.fillInputByLabel(generalPage.policyCarrierTxt, constants.policyCarrier, "");
                await generalStep.selectItemFromDropDown(constants.policyType.substring(0, 6), constants.policyType);
                await generalStep.fillInputByLabel(generalPage.valuePolicyLabel, constants.policyValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addIntrestTxt);
                await generalStep.fillInputByLabel(generalPage.businessNameLabel, constants.businessName, "");
                await generalStep.selectItemFromDropDown(constants.businessType.substring(0, 6), constants.businessType);
                await generalStep.selectItemFromDropDown(generalPage.ownerTxt.substring(0, 3), generalPage.ownerTxt);
                await generalStep.fillInputByLabel(generalPage.valueOfOwnershipLabel, constants.businessOwnershipValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickYesRadioButton()
                await generalStep.clickOnButtonByText(generalPage.addItemTxt);
                await generalStep.fillInputByLabel(generalPage.itemNameLabel, constants.itemData.name, "");
                await generalStep.fillInputByLabel(generalPage.briefDescriptionLabel, constants.itemData.description, "");
                await generalStep.fillInputByLabel(generalPage.estimateValueLabel, constants.itemData.estimatedValue, "");
                await generalStep.clickOnContinueButton();
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`);
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(beneficiariesTxt);
                if (beneficiariesTxt === generalPage.beneficairyReceiveInheritanceTxt) {
                    await generalStep.clickYesRadioButton();
                }
                await generalStep.fillInputByLabel(generalPage.numberOfDaysLabel, constants.thirty, "");
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.childrenTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.clickRadioButtonByText(generalPage.myDecendentsTxt);
                await generalStep.clickRadioButtonByText(generalPage.perStirpesTxt);
                await generalStep.clickOnContinueButton();
            })
        },
        async individualWillUserArrangmentSetup(constants) {
            await allure.step("Arragement – Verify complete Arrangement section flow", async () => {
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWillbeExecutorTxt)
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.executorData, constants.guardianType);
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantBackupExecutor);
                await generalStep.clickYesRadioButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWillbeBackupExecutorTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.backupExecutorData, constants.guardianType)
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.shouldExecutorRequiredBond)
                await generalStep.clickRadioButtonByText(generalPage.noTxt)
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantToMonitorTxt)
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldLikeNameasMonitorTxt)
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.monitorData, constants.guardianType);
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantNameConservatorEstateTxt)
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantNominateGuardianForSelfTxt)
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantExludeFromWill)
                await generalStep.clickYesRadioButton()
                await generalStep.fillInputByLabel(generalPage.nameOfPersonOrOrganizationLabel, constants.policyHolderName, "");
                await generalStep.clickOnContinueButton()
                await generalStep.clickRadioButtonByText(generalPage.cremationTxt)
                await generalStep.clickRadioButtonByText(generalPage.memorialServiceTxt)
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.haveSpecialRequestforCremony)
                await generalStep.clickYesRadioButton()
                await generalStep.fillInTextAreaByLabel(generalPage.myRequestLabel, constants.cremondyRequest, "");
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouLikeProtectWillFromPotentialDesputeTxt)
                await generalStep.clickYesRadioButton()
            });
        },
        async individualWillUserHealthCareSetup(constants) {
            await allure.step("Verify user can complete entire Health Care section successfully", async () => {
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWillMakeMedicalDecision);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.healthCareAgentData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantNameBackupHealthAgentTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWillBackupAgentTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.backupHealthCareAgentData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.leaveMedicalCarforAgentTxt)
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.selectTaskYounWantYourHealthCarAgentManageTxt);
                await generalStep.clickSwitchButtonByText(generalPage.hipaaAuthorizationTxt);
                await generalStep.clickSwitchButtonByText(generalPage.guardianTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.anyLimitForHealthTxt)
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantDonateOrganTxt)
                await generalStep.clickYesRadioButton();
                await generalStep.clickRadioButtonByText(generalPage.organsNeededEyesTissuesTxt);
                await generalStep.clickYesRadioButton();// remove this line when issue gets fixed
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldLikeGivePermissionViewMedicalRecordsTxt)
                await generalStep.clickYesRadioButton();
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.primaryParentData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantWhenHealthProxyNoLongerEffectTxt)
                await generalStep.clickRadioButtonByText(generalPage.yesIwouldLikeToChooseTxt);
                await generalStep.fillInputByLabel(generalPage.thisProxyShallExpireLabel, constants.healthCareProxyExpiryMessage, "");
                await generalStep.clickOnContinueButton()
            });
        },
        async individualWillUserFinanceCareSectionSetup(constants) {
            await allure.step("Finance Care section – Verify complete Finance Care section flow", async () => {
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.previousPowerofAttorneyDocumentTxt)
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.screenOfFinancialAgentTxt)
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.financialAgentData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wantNameBackupFinancialAgenTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.successorAgenScreenDisplayed)
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.backupAgentData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldLikeBackRuleForBackAgetntxt);
                await generalStep.clickYesRadioButton();
                await generalStep.fillInTextAreaByLabel(generalPage.describeBackupRuleLabel, constants.backupRuleTxt, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whatTypeDecisionsAthorityToAgent);
                await generalStep.clickSwitchButtonByText(generalPage.realPropertyTxt)
                await generalStep.clickSwitchButtonByText(generalPage.taxesTxt)
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.shouldAgentGiveGiftsTxt)
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.fillInTextAreaByLabel(generalPage.anySpecificRestrictionLabel, constants.specificRestriction, "");
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.leaveOutGiftingIntentionaly)
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.leaveAnySpecialInstructions)
                await generalStep.clickYesRadioButton();
                await generalStep.fillInTextAreaByLabel(generalPage.yourSpecialInstructionsLabel, constants.specialInstruction, "");
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.pwrAtteroneyExpire);
                await generalStep.clickYesRadioButton();
                await generalStep.fillInTextAreaByLabel(generalPage.provideEvenOrDateLabel, constants.specialInstruction, "");
                await generalStep.clickOnContinueButton()
            });
        },
        async dashboarOverViewdFlow(constants, isTrustIndex = 0) {
            await allure.step("Dashboard – Verify complete Dashboard end-to-end flow (Overview, Summary, Assets – Smoke)", async () => {
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.welcomeAmbreenTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.overviewTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.summaryTxt)
                await generalStep.verifyAssetTabIsVisible();
                await generalStep.verifyWithTextScreenIsVisible(generalPage.nextStepCardsTxt);
                await generalStep.clickOnButtonByText(generalPage.notarizeNowTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.timeToMakeYourPlanOfficialTxt)
                await generalStep.clickOnGoBack();
                await generalStep.clickOnButtonByText(generalPage.addNowTxt);
                await generalStep.inputByPlaceholder(generalPage.chooseContactPlaceHolderTxt, `${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`);
                await generalStep.clickRadioButtonByText(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName} (${constants.primaryParentData.email})`);
                await generalStep.clickOnButtonByText(generalPage.sendInviteTxt);
                await generalStep.clickOnGoBack();
                await generalStep.clickOnButtonByText(generalPage.summaryTxt);
                await generalStep.verifyWithTextByLabelScreenIsVisible(generalPage.nameLabel, generalPage.ambreenTestName);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.oliverBennettName);
                await generalStep.clickTabUsingTxtByBasicTabPath(generalPage.assetTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.brickellAvenueTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.metLifeInsuranceTxt);
                await generalStep.clickTabUsingTxtByBasicTabPath(generalPage.arrangementsTxt)
                await generalStep.verifyWithTextScreenIsVisibleByIndex(generalPage.michealAndersonName, isTrustIndex);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.memorialServicesTxt);
                await generalStep.clickTabUsingTxtByBasicTabPath(generalPage.healthCareTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.sarahWilliamName);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.yesAnyTxt);
                await generalStep.clickTabUsingTxtByBasicTabPath(generalPage.financialsTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.davidMillerName);
                await generalStep.clickOnBasicByPath();
                await generalStep.clickOnAnchorByText(generalPage.editTxt)
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.headingFirstNameTxt);
                await generalStep.enterUserFullName(constants.ambreenText124Name)
                await generalStep.clickOnContinueButton();
                await generalStep.clickCloseIconToSaveChanges();
                await generalStep.clickOnAnchorByText(generalPage.exitTxt);
                await generalStep.clickOnButtonByText(generalPage.summaryTxt);
                await generalStep.verifyWithTextByLabelScreenIsVisible(generalPage.nameLabel, constants.ambreenText124Name);
                await generalStep.clickOnAssetTab();
                await generalStep.verifyByXpathIsVisible(generalPage.realEstateTxt);
                await generalStep.verifyByXpathIsVisible(generalPage.financialAccountsTxt);
                await generalStep.verifyByXpathIsVisible(generalPage.businessIntrestTxt);
                await generalStep.verifyByXpathIsVisible(generalPage.lifeInsuranceTxt);
                await generalStep.verifyByXpathIsVisible(generalPage.otherTxt);
                await generalStep.clickOnAnchorByText(generalPage.editAssetsTxt);
                await generalStep.clickRadioButtonByText(generalPage.valueOfAllAsset)
                await generalStep.clickYesRadioButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.currentAddressPropTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.clickOnAddPropertyButton();
                await generalStep.addPropertyData(constants.secondaryPetGuardianData);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnSaveButton();
                await generalStep.clickOnContinueButton();
                await generalStep.clickCloseIconToSaveChanges();
                await generalStep.clickOnAnchorByText(generalPage.exitTxt)
                await generalStep.clickOnAssetTab();
                await generalStep.verifyTheAssetProperties();

            });
        },
        async dashboardProfileFlow(constants) {
            await allure.step("Dashboard / Profile – Verify Refer a Friend, Notifications, Profile, Settings and Logout complete flow", async () => {
                await generalStep.clickOnButtonByText(generalPage.upgradeGiftTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.referAFriendTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.gift20PercentOffToYourFriendTxt);
                await generalStep.fillInputByLabel(generalPage.enterLoveoneNameLabel, constants.iName, "");
                await generalStep.fillInputByLabel(generalPage.enterLoveOneEmailLabel, constants.iEmail, "");
                await generalStep.clickOnButtonByText(generalPage.sendInviteTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.youReferralInviteSentToEmailTxt(constants.iEmail));
                await generalStep.clickCloseInviteModel();
                await generalStep.clickOnProfile();
                await generalStep.clickAnchorFromProfileDropdown(generalPage.settingsTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.updateProfileInfoToManageTxt)
                await generalStep.fillInputByLabel(generalPage.nameLabel, constants.iName + " Test", "");
                await generalStep.fillInputByLabel(generalPage.email, getRandomEmail(), "");
                await generalStep.clickOnButtonByText(generalPage.updateProfileTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.profileUpdateSuccessTxt)
                await generalStep.fillInputByLabel(generalPage.currentPasswordLabel, constants.password, "");
                await generalStep.fillInputByLabel(generalPage.newPasswordLabel, constants.newPassword, "");
                await generalStep.fillInputByLabel(generalPage.confirmNewPassLabel, constants.newPassword, "");
                await generalStep.clickOnButtonByText(generalPage.updatePasswordTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.passUpdateSuccessTxt)
                await generalStep.clickOnProfile();
                await generalStep.clickAnchorFromProfileDropdown(generalPage.dashboard);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.welcomeAmbreenTxt);
                await generalStep.clickOnGoBack();
                await generalStep.clickOnProfile();
                await generalStep.clickAnchorFromProfileDropdown(generalPage.documentsTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.myDocumentsCapTxt);
                await generalStep.clickOnGoBack();
                await generalStep.clickOnProfile();
                await generalStep.clickAnchorFromProfileDropdown(generalPage.legacyContactsTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.addTrustedLegacyContactToYourAccountTxt);
                await generalStep.clickOnGoBack();
                await generalStep.clickOnProfile();
                await generalStep.clickAnchorFromProfileDropdown(generalPage.notarizationTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.timeToMakeYourPlanOfficialTxt)

            });
        },
        async documentsFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await generalStep.clickSidBarAnchor(generalPage.documentsTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.myDocumentsCapTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.sharePlanWithSomeoneYouTrustTxt);
                await generalStep.clickOnButtonByText(generalPage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await generalStep.inputByPlaceholder(generalPage.contactNameTxt, constants.iName);
                await generalStep.inputByPlaceholder(generalPage.emailAddressTxt, contactEmail);
                await generalStep.clickOnButtonByText(generalPage.addTxt);
                await generalStep.clickOnButtonByText(generalPage.sharePlanTxt);
                await generalStep.clickOnButtonByText(generalPage.confirmTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.invitationSentTxt);
                await generalStep.clickOnButtonByText(generalPage.doneTxt);
                await generalStep.verifyDocumentNameIsVisible(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.lastWillAndTestament, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.advanceCareDirectiveTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.powerOfAttorneyTxt, generalPage.ambreenTest123Name);
                await generalStep.clickDocumentButtonByName(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name, generalPage.previewTxt);
                await generalStep.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(generalPage.documentTitleXpath(generalPage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: generalPage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: generalPage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: generalPage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await generalStep.clickRadioButtonByText(generalPage.addFastWillLifeTimeMembTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.subscAllowEditDocumentTxt);
                await generalStep.clickOnButtonByText(generalPage.cancelTxt);

            });
        },
        async documentsTrustFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await generalStep.clickSidBarAnchor(generalPage.documentsTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.myDocumentsCapTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.sharePlanWithSomeoneYouTrustTxt);
                await generalStep.clickOnButtonByText(generalPage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await generalStep.inputByPlaceholder(generalPage.contactNameTxt, constants.iName);
                await generalStep.inputByPlaceholder(generalPage.emailAddressTxt, contactEmail);
                await generalStep.clickOnButtonByText(generalPage.addTxt);
                await generalStep.clickOnButtonByText(generalPage.sharePlanTxt);
                await generalStep.clickOnButtonByText(generalPage.confirmTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.invitationSentTxt);
                await generalStep.clickOnButtonByText(generalPage.doneTxt);
                await generalStep.verifyDocumentNameIsVisible(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.pourOverWillTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.advanceCareDirectiveTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.powerOfAttorneyTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.revocableLivingTrustTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.scheduleOfAssetsTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.fundingInstructionTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.certificationOfTrustTxt, generalPage.ambreenTest123Name);
                await generalStep.clickDocumentButtonByName(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name, generalPage.previewTxt);
                await generalStep.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(generalPage.documentTitleXpath(generalPage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: generalPage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: generalPage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: generalPage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await generalStep.clickRadioButtonByText(generalPage.addFastWillLifeTimeMembTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.subscAllowEditDocumentTxt);
                await generalStep.clickOnButtonByText(generalPage.cancelTxt);

            });
        },
        async couplesDocumentsFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await generalStep.clickSidBarAnchor(generalPage.estatePlanTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.myDocumentsCapTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.sharePlanWithSomeoneYouTrustTxt);
                await generalStep.clickOnButtonByText(generalPage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await generalStep.inputByPlaceholder(generalPage.contactNameTxt, constants.iName);
                await generalStep.inputByPlaceholder(generalPage.emailAddressTxt, contactEmail);
                await generalStep.clickOnButtonByText(generalPage.addTxt);
                await generalStep.clickOnButtonByText(generalPage.sharePlanTxt);
                await generalStep.clickOnButtonByText(generalPage.confirmTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.invitationSentTxt);
                await generalStep.clickOnButtonByText(generalPage.doneTxt);
                await generalStep.verifyDocumentNameIsVisible(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.hipaaCapTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.lastWillAndTestament, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.lastWillAndTestament, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.advanceCareDirectiveTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.advanceCareDirectiveTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.powerOfAttorneyTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.powerOfAttorneyTxt, generalPage.thomasEdisonName);
                await generalStep.clickDocumentButtonByName(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name, generalPage.previewTxt);
                await generalStep.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(generalPage.documentTitleXpath(generalPage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: generalPage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: generalPage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: generalPage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await generalStep.clickDocumentButtonByName(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name, generalPage.manageAccessTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.manageSharingAccessTxt);
                await generalStep.clickSelectContactWithEmail(contactEmail);
                await generalStep.clickOnButtonByText(generalPage.sendInviteTxt);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.succfullyUpdateAccessForTxt);
                await generalStep.clickOnButtonByText(generalPage.cancelTxt);
                await generalStep.clickRadioButtonByText(generalPage.addFastWillLifeTimeMembTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.subscAllowEditDocumentTxt);
                await generalStep.clickOnButtonByText(generalPage.cancelTxt);

            });
        },
        async couplesDocumentsTrustFlow(constants) {
            await allure.step("Documents – Verify complete Documents page end-to-end flow", async () => {
                await generalStep.clickSidBarAnchor(generalPage.estatePlanTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.myDocumentsCapTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.sharePlanWithSomeoneYouTrustTxt);
                await generalStep.clickOnButtonByText(generalPage.shareMyPlanTxt);
                const contactEmail = getRandomEmail();
                await generalStep.inputByPlaceholder(generalPage.contactNameTxt, constants.iName);
                await generalStep.inputByPlaceholder(generalPage.emailAddressTxt, contactEmail);
                await generalStep.clickOnButtonByText(generalPage.addTxt);
                await generalStep.clickOnButtonByText(generalPage.sharePlanTxt);
                await generalStep.clickOnButtonByText(generalPage.confirmTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.invitationSentTxt);
                await generalStep.clickOnButtonByText(generalPage.doneTxt);
                await generalStep.verifyDocumentNameIsVisible(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.hipaaCapTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.pourOverWillTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.pourOverWillTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.advanceCareDirectiveTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.advanceCareDirectiveTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.powerOfAttorneyTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.powerOfAttorneyTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.revocableLivingTrustTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.revocableLivingTrustTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.scheduleOfAssetsTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.scheduleOfAssetsTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.fundingInstructionTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.fundingInstructionTxt, generalPage.thomasEdisonName);
                await generalStep.verifyDocumentNameIsVisible(generalPage.certificationOfTrustTxt, generalPage.ambreenTest123Name);
                await generalStep.verifyDocumentNameIsVisible(generalPage.certificationOfTrustTxt, generalPage.thomasEdisonName);
                await generalStep.clickDocumentButtonByName(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name, generalPage.previewTxt);
                await generalStep.clickPreviewDocumentCloseModel();
                await prepareDownloadFolder();
                const download = page.locator(generalPage.documentTitleXpath(generalPage.hipaaCapTxt))
                    .filter({ has: page.locator("span", { hasText: generalPage.ambreenTest123Name }) })
                    .locator("button, a", { hasText: generalPage.downloadTxt });
                await downloadAndVerifyFile(page, download);
                await prepareDownloadFolder();
                const downloadAll = page.getByRole("link", { name: generalPage.downloadAllTxt })
                await downloadAndVerifyFile(page, downloadAll);
                await generalStep.clickDocumentButtonByName(generalPage.hipaaCapTxt, generalPage.ambreenTest123Name, generalPage.manageAccessTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.manageSharingAccessTxt);
                await generalStep.clickSelectContactWithEmail(contactEmail);
                await generalStep.clickOnButtonByText(generalPage.sendInviteTxt);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.succfullyUpdateAccessForTxt);
                await generalStep.clickOnButtonByText(generalPage.cancelTxt);
                await generalStep.clickRadioButtonByText(generalPage.addFastWillLifeTimeMembTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.subscAllowEditDocumentTxt);
                await generalStep.clickOnButtonByText(generalPage.cancelTxt);

            });
        },
        async legacyContactsFlow(constants) {
            await allure.step("Legacy Contacts – Verify complete Legacy Contacts end-to-end flow", async () => {
                await generalStep.clickSidBarAnchor(generalPage.legacyContactsTxt);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.addTrustedLegacyContactaccountTxt);
                await generalStep.inputByPlaceholder(generalPage.chooseContactPlaceHolderTxt, `${constants.backupPetGuardianData.firstName} ${constants.backupPetGuardianData.lastName}`);
                await generalStep.clickRadioButtonByText(`${constants.backupPetGuardianData.firstName} ${constants.backupPetGuardianData.lastName} (${constants.backupPetGuardianData.email})`);
                await generalStep.clickOnButtonByXpath(generalPage.sendInviteBtnXpath);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.invitationSentSuccessTxt);
                await generalStep.verifyWithTextScreenIsVisible(constants.backupPetGuardianData.email);
                const legacyEmail = getRandomEmail();
                await generalStep.inputByPlaceholder(generalPage.chooseContactPlaceHolderTxt, generalPage.otherEnterManuallyTxt);
                await generalStep.clickRadioButtonByText(generalPage.otherEnterManuallyTxt);
                await generalStep.fillInputByLabel(generalPage.legacyContactFullnameLabel, constants.legacyContactFullname, "");
                await generalStep.fillInputByLabel(generalPage.legacyContactEmailLabel, legacyEmail, "");
                await generalStep.clickOnButtonByXpath(generalPage.sendInviteBtnXpath);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.invitationSentSuccessTxt);
                await generalStep.verifyWithTextScreenIsVisible(legacyEmail);
                await generalStep.inputByPlaceholder(generalPage.chooseContactPlaceHolderTxt, generalPage.otherEnterManuallyTxt);
                await generalStep.clickRadioButtonByText(generalPage.otherEnterManuallyTxt);
                await generalStep.fillInputByLabel(generalPage.legacyContactFullnameLabel, constants.legacyContactFullname, "");
                await generalStep.fillInputByLabel(generalPage.legacyContactEmailLabel, legacyEmail, "");
                await generalStep.clickOnButtonByXpath(generalPage.sendInviteBtnXpath);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.invitationSentFailureTxt);

            });
        },
        async individualNotarizationFlow() {
            await allure.step(`Individual Notarization – Verify complete Notarization flow including payment and session creation`, async () => {
                await generalStep.clickSidBarAnchor(generalPage.notarizationTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.howItWorksTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatYoullNeedTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.getStartedNotarizingTxt);
                await generalStep.clickOnButtonByText(generalPage.getStartedNotarizingTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.advanceCareDirectiveTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.powerOfAttorneyTxt);
                await generalStep.clickRadioButtonByText(generalPage.wouldLiktoPurchase5Each);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.twoProfessionalWitnessesTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.estatePlanDocumenTxt);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.notaryWitnessesTxt);
                await generalStep.enterPaymentCardDetails()
                await generalStep.verifyConfirmAndPayButtonIsEnabled();
                await generalStep.clickOnButtonByText(generalPage.confirmAndPayBtnTxt);
                await generalStep.verifyNotaryText9to5AMIsVisible();
                if (isWithinNotaryHours()) {
                    await generalStep.clickOnButtonByText(generalPage.notaryCreateSessionTxt);
                    await generalStep.verifyWithTextScreenIsVisible(generalPage.notaryCreatedSuccessMessage);
                    await generalStep.verifyWithTextScreenIsVisible(generalPage.joinSessionNowTxt);
                    await generalStep.verifyAnchorIsEnabled(generalPage.joinSessionNowTxt);
                } else {
                    await generalStep.verifyButtonIsDisabled();
                }
            });
        },
        async coupleNotarizationFlow() {
            await allure.step(`Individual Notarization – Verify complete Notarization flow including payment and session creation`, async () => {
                await generalStep.clickSidBarAnchor(generalPage.notarizationTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.howItWorksTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatYoullNeedTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.getStartedNotarizingTxt);
                await generalStep.clickOnButtonByText(generalPage.getStartedNotarizingTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.advanceCareDirectiveTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.powerOfAttorneyTxt);
                await generalStep.clickRadioButtonByText(generalPage.wouldLiktoPurchase5Each);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.twoProfessionalWitnessesTxt)
                await generalStep.verifyWithTextScreenIsVisible(generalPage.estatePlanDocumenTxt);
                await generalStep.verifyWithTextContainsIsVisible(generalPage.notaryWitnessesTxt);
                await generalStep.enterPaymentCardDetails()
                await generalStep.verifyConfirmAndPayButtonIsEnabled();
                await generalStep.clickOnButtonByText(generalPage.confirmAndPayBtnTxt);
                await generalStep.verifyNotaryText9to5AMIsVisible();
                if (isWithinNotaryHours()) {
                    await generalStep.inputByPlaceholder(generalPage.witnessSpouseEmailPlaceholder, getRandomEmail())
                    await generalStep.clickOnButtonByText(generalPage.notaryCreateSessionTxt);
                    await generalStep.verifyWithTextScreenIsVisible(generalPage.notaryCreatedSuccessMessage);
                    await generalStep.verifyWithTextScreenIsVisible(generalPage.joinSessionNowTxt);
                    await generalStep.verifyAnchorIsEnabled(generalPage.joinSessionNowTxt);
                } else {
                    await generalStep.verifyButtonIsDisabled();
                }
            });
        },
        async trustDeedTransferFlow(constants) {
            await allure.step("Deed Transfer - Verify complete Deed Transfer end-to-end flow (Trust only)", async () => {
                await generalStep.verifyDeedTransferTxtIsVisible();
                await generalStep.clickSidBarAnchor(generalPage.deedTranserTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.howItWorksTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.securePaymentToDeedTransferTxt);
                await generalStep.clickOnButtonIndexByText(generalPage.getStartedTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.deedTransferCalculationTxt);
                await generalStep.checkValueForLabel(generalPage.addressTxt);
                await generalStep.checkValueForLabel(generalPage.state);
                await generalStep.checkValueForLabel(generalPage.countyTxt);
                await generalStep.checkValueForLabel(generalPage.ownerTxt);
                await generalStep.checkValueForLabel(generalPage.city);
                await generalStep.checkValueForLabel(generalPage.zipCode);
                await generalStep.verifyWithHeadingByIndex(generalPage.recordingFeesTxt);
                await generalStep.verifyRecordingFeesTotal();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithTextScreenIsVisible(generalPage.summaryServiceTxt);
                await generalStep.verifyDeedNotarizationFee();
                await generalStep.clickOnAcceptCookiesButton()
                await generalStep.clickRadioButtonByText(generalPage.continueTxt);
                await generalStep.verifyRecordingFeesBreakdownSubtotalAndTotal()
                await generalStep.verifyFullNameField();
                await generalStep.verifyEmailField(getRandomForDeedEmail());
                await generalStep.enterPaymentCardDetails();
                await generalStep.clickConfirmAndPayButton();
                await generalStep.verifyWithTextContainsIsVisible(generalPage.paymentSuccessDeedTransferTxt);
                await generalStep.verifyWithTextScreenIsVisible(generalPage.deedTransferConfirmedTxt)
                await generalStep.clickSidBarAnchor(generalPage.deedTranserTxt);
                await generalStep.verifyWithTextScreenIsVisibleByIndex(generalPage.preparingDeedCapTxt, 1);

            });
        },
    }

}