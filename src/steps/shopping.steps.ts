import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/CustomWorld';
import { Verify } from '../interactions/Verify';
import { AddProductTask } from '../tasks/AddProductTask';
import { ViewCartTask } from '../tasks/ViewCartTask';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

// ─── Given ───────────────────────────────────────────────────────────────────

/**
 * Used in Background sections to add a product as a precondition.
 * Reads naturally as "And I have added X to the cart".
 */
Given(
  'I have added {string} to the cart',
  async function (this: CustomWorld, productName: string) {
    await AddProductTask.perform(this.page, productName);
  }
);

// ─── When ────────────────────────────────────────────────────────────────────

When(
  'I add the product {string} to the cart',
  async function (this: CustomWorld, productName: string) {
    await AddProductTask.perform(this.page, productName);
  }
);

When(
  'I navigate to the shopping cart',
  async function (this: CustomWorld) {
    await ViewCartTask.perform(this.page);
  }
);

// ─── Then ────────────────────────────────────────────────────────────────────

Then(
  'the cart badge should show {string} item(s)',
  async function (this: CustomWorld, expectedCount: string) {
    await Verify.isVisible(this.page, InventoryPage.cartBadge);
    await Verify.hasExactText(this.page, InventoryPage.cartBadge, expectedCount);
  }
);

Then(
  'I should see {string} in the cart',
  async function (this: CustomWorld, productName: string) {
    await Verify.urlContains(this.page, 'cart');
    await Verify.containsText(this.page, CartPage.itemName, productName);
  }
);
