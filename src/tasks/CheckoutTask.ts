import { Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutOnePage } from '../pages/CheckoutOnePage';
import { CheckoutTwoPage } from '../pages/CheckoutTwoPage';
import { Click } from '../interactions/Click';
import { Fill } from '../interactions/Fill';

/**
 * Task: CheckoutTask
 * Orchestrates the multi-step checkout process.
 * Each method maps to a distinct step in the checkout flow,
 * keeping step definitions thin and this task easily reusable.
 */
export const CheckoutTask = {
  /**
   * Step 1 – Click the Checkout button from the cart page.
   */
  proceedFromCart: async (page: Page): Promise<void> => {
    await Click.on(page, CartPage.checkoutButton);
  },

  /**
   * Step 2 – Fill in the customer information form on Checkout Step One.
   */
  fillPersonalInfo: async (
    page: Page,
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> => {
    await Fill.field(page, CheckoutOnePage.firstNameInput, firstName);
    await Fill.field(page, CheckoutOnePage.lastNameInput, lastName);
    await Fill.field(page, CheckoutOnePage.postalCodeInput, postalCode);
  },

  /**
   * Step 3 – Click Continue to advance to the Order Overview (Step Two).
   */
  continueToSummary: async (page: Page): Promise<void> => {
    await Click.on(page, CheckoutOnePage.continueButton);
  },

  /**
   * Step 4 – Click Finish to confirm and place the order.
   */
  finishOrder: async (page: Page): Promise<void> => {
    await Click.on(page, CheckoutTwoPage.finishButton);
  }
};
