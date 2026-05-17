import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { Click } from '../interactions/Click';

/**
 * Task: AddProductTask
 * Finds and clicks the "Add to cart" button for a named product
 * on the Inventory page.
 */
export const AddProductTask = {
  /**
   * Add a product to the cart by its display name.
   * @param page        - The active Playwright Page.
   * @param productName - The full product display name (e.g. "Sauce Labs Backpack").
   */
  perform: async (page: Page, productName: string): Promise<void> => {
    const selector = InventoryPage.addToCartButton(productName);
    await Click.on(page, selector);
  }
};
