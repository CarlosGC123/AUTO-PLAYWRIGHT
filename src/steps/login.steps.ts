import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/CustomWorld';
import { Navigate } from '../interactions/Navigate';
import { Verify } from '../interactions/Verify';
import { LoginTask } from '../tasks/LoginTask';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { EnvReader } from '../util/EnvReader';
import { Base64 } from '../util/Base64';

// ─── Given ───────────────────────────────────────────────────────────────────

Given(
  'I am on the Sauce Demo login page',
  async function (this: CustomWorld) {
    await Navigate.to(this.page, EnvReader.get('BASE_URL'));
  }
);

/**
 * Shared step used by the Background sections of shopping.feature and
 * checkout.feature to establish a logged-in session.
 */
Given(
  'I am logged in as {string}',
  async function (this: CustomWorld, username: string) {
    const password = Base64.decode(EnvReader.get('PASSWORD'));
    await Navigate.to(this.page, EnvReader.get('BASE_URL'));
    await LoginTask.perform(this.page, username, password);
  }
);

// ─── When ────────────────────────────────────────────────────────────────────

When(
  'I log in with username {string} and valid password',
  async function (this: CustomWorld, username: string) {
    const password = Base64.decode(EnvReader.get('PASSWORD'));
    await LoginTask.perform(this.page, username, password);
  }
);

When(
  'I log in with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await LoginTask.perform(this.page, username, password);
  }
);

// ─── Then ────────────────────────────────────────────────────────────────────

Then(
  'I should see the products page',
  async function (this: CustomWorld) {
    await Verify.urlContains(this.page, 'inventory');
    await Verify.isVisible(this.page, InventoryPage.pageTitle);
  }
);

Then(
  'I should see an error message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    await Verify.isVisible(this.page, LoginPage.errorMessage);
    await Verify.containsText(this.page, LoginPage.errorMessage, expectedMessage);
  }
);
