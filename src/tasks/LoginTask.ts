import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Fill } from '../interactions/Fill';
import { Click } from '../interactions/Click';

/**
 * Task: LoginTask
 * Orchestrates filling in credentials and submitting the login form.
 * Navigation to the login page is handled separately (see Hooks / step definitions).
 */
export const LoginTask = {
  /**
   * Fill username and password fields and click the Login button.
   * @param page     - The active Playwright Page.
   * @param username - The account username.
   * @param password - The plain-text password (already decoded by the caller).
   */
  perform: async (
    page: Page,
    username: string,
    password: string
  ): Promise<void> => {
    await Fill.field(page, LoginPage.usernameInput, username);
    await Fill.field(page, LoginPage.passwordInput, password);
    await Click.on(page, LoginPage.loginButton);
  }
};
