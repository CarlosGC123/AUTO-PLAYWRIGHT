import { Page } from '@playwright/test';

/**
 * Interaction: Fill
 * Atomic action that clears and types a value into an input field.
 * Playwright auto-waits for the element to be visible and editable.
 */
export const Fill = {
  /**
   * Clear the field and fill it with the provided value.
   */
  field: async (page: Page, selector: string, value: string): Promise<void> => {
    await page.fill(selector, value);
  }
};
