import { allure } from 'allure-playwright';
import { generalPage } from '../pages/general.page';
import { generalSteps } from './general.steps';
const COMMON = require('../utils/common.json');


export const regressionSteps = (page) => {
    const generalStep = generalSteps(page);
    return {
        async individualTrustUserBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify complete Individual Trust Basic section flow including address, DOB, children logic, trustee conditional flow, successor trustee, pet nomination, guardian nomination, pet reward funding, and completion logic.", async () => {
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterCity(constants.city);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyDoyouHavChildrenScreenIsVisible();
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.gatherInfoAboutChilderenTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickAddAChildAndItsDetails(constants.adultChildName, constants.adultChildDOB);
                await generalStep.verifyWithButtonScreenTitleIsVisible(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.clickAddAChildAndItsDetails(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whichChildWouldULikeToAssignTxt);
                await generalStep.clickChildToAssignToGuardian(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whoLookAfterYourChilderenTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryParentData, constants.guardianType);
                await generalStep.verifyWithButtonScreenTitleIsVisible(generalPage.continueTxt);
                await generalStep.addBackUpGuardian();
                await generalStep.createAndAssignContact(constants.backupParentData, "");
                await generalStep.verifyWithButtonScreenTitleIsVisible(generalPage.continueTxt);
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
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.inputByLabel(generalPage.nameOfYourTrustTxt, constants.silverOakTrust);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whenWouldYouBeginTrust);
                await generalStep.verifyTrustDatePickerPrepopulated();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouMainPersonToManageTrustTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.areYouAsGrantorTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouMainPersonToManageTrustTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldBeTrusteeTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.verifyButtonIsDisabled(generalPage.confirmTxt);
                await generalStep.clickGuardianToAssignToChildByIndex(`${constants.primaryParentData.firstName} ${constants.primaryParentData.lastName}`, constants.guardianType);
                await generalStep.verifyButtonIsEnabled(generalPage.confirmTxt);
                await generalStep.clickOnButtonByText(generalPage.confirmTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.areYouAsGrantorTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoShouldTrusteeIncapacitatedTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.areYouAsGrantorTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wholWillLifetimeBeneficiaryTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.executorData, constants.guardianType)
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoShouldTrusteeIncapacitatedTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.monitorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldTakeOverPassAwayTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.successorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.weAreGoingAssetSectionTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.weAreGoingAssetSectionTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnSendInviteButton(generalPage.editPetXpath);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.dogBella, "");
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.clickOnSendInviteButton(generalPage.deletePetXpath);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryPetGuardianData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.weAreGoingAssetSectionTxt);
                await generalStep.clickOnButtonByText(generalPage.backTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.inputByLabel(generalPage.amountLabel, constants.inValidCaringPersonAmount);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyErrorIsVisible(generalPage.caringPersonAmountError);
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount);
                await generalStep.clickOnContinueButton();
            });
        },
        async individualTrustUserNegativeBasicAddressToConservatorSetup(constants) {
            await allure.step("Verify system blocks progression and shows proper validation messages when required fields, address details, contact details, trustee details, guardian details, and funding inputs are invalid or incomplete.", async () => {
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterAddressLine1(constants.addressLine1);
                await generalStep.enterAddressLine2(constants.addressLine2);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterCity(constants.city);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterZipCode(constants.invalidZipCode);
                await generalStep.selectItemFromDropDown(constants.enterCountery, constants.selectCountryFromDropdown);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.selectItemFromDropDown(constants.enterState, constants.selectStateFromDropdown);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyErrorIsVisible(generalPage.zipcodeFormatError);
                await generalStep.enterZipCode(constants.zipcode);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whatisYourbirthdayTxt);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterBirthDayDate(constants.invalidBirthdayDate);
                await page.keyboard.press(generalPage.enterTxt)
                await generalStep.verifyErrorIsVisible(generalPage.fieldRequiredError);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.enterBirthDayDate(constants.birthdayDate);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyDoyouHavChildrenScreenIsVisible();
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.gatherInfoAboutChilderenTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickAddAChildAndItsDetailsWithValidations(constants.adultChildName, constants.invalidAdultChildDOB);
                await generalStep.clickAddAChildAndItsDetails(constants.childName);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.guardianNominationTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.futureAdoptionChildrenWillTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.testLivingTrustTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.inputByLabel(generalPage.nameOfYourTrustTxt, constants.silverOakTrust);
                await generalStep.verifyButtonIsEnabled(generalPage.continueTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whenWouldYouBeginTrust);
                await generalStep.verifyTrustDatePickerPrepopulated();
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wouldYouMainPersonToManageTrustTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldBeTrusteeTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.verifyButtonIsDisabled(generalPage.confirmTxt);
                await generalStep.createValidateAndAssignContact(constants.trusteeData);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.areYouAsGrantorTxt);
                await generalStep.clickRadioButtonByText(generalPage.noTxt);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.wholWillLifetimeBeneficiaryTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt)
                await generalStep.createAndAssignContact(constants.executorData, constants.guardianType)
                await generalStep.clickOnContinueButton()
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoShouldTrusteeIncapacitatedTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.monitorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.whoWouldTakeOverPassAwayTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnButtonByText(generalPage.selectContactTxt);
                await generalStep.createAndAssignContact(constants.successorData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouHavePetTxt);
                await generalStep.clickYesRadioButton(); 
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doYouWantChoosePetGuardianTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.listOfPetsDescTxt);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.clickOnAddPetByIndex(1);
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.verifyErrorIsVisible(generalPage.petNameRequiredError);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, "   ", "");
                await generalStep.verifyErrorIsVisible(generalPage.petNameRequiredError);
                await generalStep.fillInputByLabel(generalPage.petsNameLabel, constants.petName, "");
                await generalStep.clickOnAddPetByIndex(2);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyPetGuardianAssignmentScreenIsVisible(constants.petName);
                await generalStep.verifyButtonIsNotVisible(generalPage.continueTxt);
                await generalStep.addPrimaryGuardian();
                await generalStep.createAndAssignContact(constants.primaryPetGuardianData, constants.guardianType);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.setAsideMoenyToCaringPersonHelp);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyButtonIsDisabled(generalPage.continueTxt);
                await generalStep.inputByLabel(generalPage.amountLabel, constants.inValidCaringPersonAmount);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyErrorIsVisible(generalPage.caringPersonAmountError);
                await generalStep.inputByLabel(generalPage.amountLabel, constants.assetsTxt);
                await generalStep.clickOnContinueButton();
                await generalStep.verifyErrorIsVisible(generalPage.caringPersonAmountError);
                await generalStep.inputByLabel(generalPage.amountLabel, constants.caringPersonAmount);
                await generalStep.clickOnContinueButton();
            });
        },
        async individualTrustUserAssetSetup(constants) {
            await allure.step("Ensure user can successfully complete entire Assets flow from Intro screen to Backup Residuary with all conditional scenarios (YES/NO), validations, Add/Edit/Delete, distribution types", async () => {
                await generalStep.verifyWithHeadingScreenContainsTheTitle(generalPage.whatisValueOfAssetsTxt);
                await generalStep.clickRadioButtonByText(generalPage.valueOfAllAsset);
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.doyouHaveAnyPropertyTxt);
                await generalStep.clickYesRadioButton();
                await generalStep.verifyWithHeadingScreenIsVisible(generalPage.provideDetailOfPropertyTxt   );
                await generalStep.clickOnAddPropertyButton();
                await generalStep.addPropertyDataWithValidations(constants.propertyData);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, `${constants.primaryPetGuardianData.firstName} ${constants.primaryPetGuardianData.lastName}`, "");
                await generalStep.clickOnButtonByText(generalPage.addPersonTxt);
                await generalStep.fillInputByLabelAndSelectFromDropdown(generalPage.fullNameLabel, constants.adultChildName, "", 1);


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
                // await generalStep.selectItemFromDropDown("Relationship to business (optional)", generalPage.ownerTxt); uncomment and fix after issue resolved
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
    }

}