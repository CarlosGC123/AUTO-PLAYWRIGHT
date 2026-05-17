import { Page } from '@playwright/test';

/**
 * Interaction: Click
 * Atomic action that clicks an element.
 * Playwright auto-waits for the element to be visible, stable, and enabled.
 */
export const Click = {
  /**
   * Click the element matching the given selector.
   */
  on: async (page: Page, selector: string): Promise<void> => {
    await page.click(selector);
  }
};
