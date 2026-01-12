export const smokePage = {
    homeHeader: 'nav',
    homeBody: 'main',
    homeFooter: 'footer', 
    linkedInLable: 'LinkedIn', 
    facebookLable: 'Facebook', 
    instagramLable: 'Instagram',
    bannerHeadingEstatePlanning: 'Estate Planning Made Simple', 
    willTxt: 'Will',
    trustTxt: 'Trust',
    learnTxt: 'Learn',
    professionalsTxt: 'Professionals',
    log_inTxt: 'Log In',
    startTodayTxt: 'Start Today',
    privacyPolicyTxt: "Privacy Policy",
    termsServiceTxt: "Terms of Service",
    trustPageURL: 'trust-package',
    willPageURL: 'will-package',
    learnPageURL: 'estate-planning-guide',
    professionalsPageURL:'financial-advisors',
    privacyPolicyPageURL: 'privacy-policy',
    termsServicesPageURL: 'terms-of-service',
    loginPageURL: 'login', 
    linkedInPage: 'fastwill', 
    welcomeFastwillTxt: 'Welcome to FastWill', 
    headingFirstNameTxt: "First, what's your name?", 
    namePlaceholderTxt: 'Enter your name',
    continueTxt: "Continue", 
    emailId: '#email', 
    passwordId: '#password', 
    logoutTxt: 'Logout', 
    xPathProfile: 'a[aria-label="Settings"]+div>button', 
    xpathAccountDropdown: 'a[aria-label="Settings"]+div>div', 
    statPlaceHolderText: 'Search for your state...'

}

export function getLocator(value) {

    switch (value) {
        case 'Alabama':
            return smokePage.statPlaceHolderText;
        case 'Alaska':
            return smokePage.anotherLocator; // example
        default:
            throw new Error(`Locator for "${value}" not defined`);
    }
}
