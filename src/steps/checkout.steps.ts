import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/CustomWorld';
import { Verify } from '../interactions/Verify';
import { CheckoutTask } from '../tasks/CheckoutTask';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

// ─── When ────────────────────────────────────────────────────────────────────

When(
  'I proceed to checkout',
  async function (this: CustomWorld) {
    await CheckoutTask.proceedFromCart(this.page);
  }
);

When(
  'I enter my information with first name {string}, last name {string} and postal code {string}',
  async function (
    this: CustomWorld,
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await CheckoutTask.fillPersonalInfo(
      this.page,
      firstName,
      lastName,
      postalCode
    );
  }
);

When(
  'I continue to the order summary',
  async function (this: CustomWorld) {
    await CheckoutTask.continueToSummary(this.page);
  }
);

When(
  'I finish the order',
  async function (this: CustomWorld) {
    await CheckoutTask.finishOrder(this.page);
  }
);

// ─── Then ────────────────────────────────────────────────────────────────────

Then(
  'I should see the order confirmation {string}',
  async function (this: CustomWorld, expectedHeader: string) {
    await Verify.urlContains(this.page, 'checkout-complete');
    await Verify.isVisible(this.page, CheckoutCompletePage.completeHeader);
    await Verify.containsText(
      this.page,
      CheckoutCompletePage.completeHeader,
      expectedHeader
    );
  }
);
