import { Page } from '@playwright/test';

/**
 * Interaction: Navigate
 * Atomic action that moves the browser to a specified URL.
 * Playwright waits for the page to reach the 'load' state by default.
 */
export const Navigate = {
  /**
   * Navigate directly to an absolute URL.
   */
  to: async (page: Page, url: string): Promise<void> => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }
};
