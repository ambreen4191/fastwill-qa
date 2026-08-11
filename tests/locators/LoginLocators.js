class LoginLocators {
  constructor(page) {
    this.heading = page.getByRole('heading', { name: 'Please log in to your account' });
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.googleLoginLink = page.getByRole('link', { name: 'Continue with Google' });
    this.createAccountButton = page.getByRole('button', { name: 'Create account' });
    this.backLink = page.getByRole('link', { name: 'BACK' });
  }
}

module.exports = { LoginLocators };
