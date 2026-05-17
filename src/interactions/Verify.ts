import { Page, expect } from '@playwright/test';

/**
 * Interaction: Verify
 * Assertion actions backed by Playwright's auto-retrying expect library.
 * All methods throw an AssertionError on failure, which Cucumber reports
 * as a failing step.
 */
export const Verify = {
  /**
   * Assert the current page URL matches the given regular expression fragment.
   */
  urlContains: async (page: Page, urlFragment: string): Promise<void> => {
    await expect(page).toHaveURL(new RegExp(urlFragment));
  },

  /**
   * Assert an element matching the selector is visible in the viewport.
   */
  isVisible: async (page: Page, selector: string): Promise<void> => {
    await expect(page.locator(selector)).toBeVisible();
  },

  /**
   * Assert an element contains the expected text (partial match).
   */
  containsText: async (
    page: Page,
    selector: string,
    expectedText: string
  ): Promise<void> => {
    await expect(page.locator(selector)).toContainText(expectedText);
  },

  /**
   * Assert an element's full text matches exactly the expected value.
   */
  hasExactText: async (
    page: Page,
    selector: string,
    expectedText: string
  ): Promise<void> => {
    await expect(page.locator(selector)).toHaveText(expectedText);
  }
};
