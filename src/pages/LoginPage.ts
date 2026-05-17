/**
 * Page: Login Page  (/)
 * Holds all stable CSS/data-test selectors for the Sauce Demo login page.
 * No logic — only element references.
 */
export const LoginPage = {
  usernameInput:  '[data-test="username"]',
  passwordInput:  '[data-test="password"]',
  loginButton:    '[data-test="login-button"]',
  errorMessage:   '[data-test="error"]'
} as const;
