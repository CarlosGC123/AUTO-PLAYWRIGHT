import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { Click } from '../interactions/Click';

/**
 * Task: ViewCartTask
 * Navigates to the shopping cart by clicking the cart icon in the header.
 */
export const ViewCartTask = {
  /**
   * Click the shopping cart icon to open the cart page.
   * @param page - The active Playwright Page.
   */
  perform: async (page: Page): Promise<void> => {
    await Click.on(page, InventoryPage.cartLink);
  }
};
