export const loginPage = (page) => ({
    emailInput: page.locator('#email'),
    passwordInput: page.locator('#password'),
    loginButton: page.locator('#login'),

    async open() {
        await page.goto('/login');
    },

    async enterEmail(email) {
        await this.emailInput.fill(email);
    },

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    },

    async submit() {
        await this.loginButton.click();
    }
});
