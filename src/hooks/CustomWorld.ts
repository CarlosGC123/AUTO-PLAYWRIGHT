import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

/**
 * CustomWorld – extends Cucumber's default World to expose Playwright
 * browser, context, and page instances to every step definition.
 *
 * A new CustomWorld instance is created per scenario by Cucumber.
 * The Hooks file is responsible for assigning the shared browser
 * and creating/destroying the per-scenario context and page.
 */
export class CustomWorld extends World {
  /** Shared browser instance – launched once in BeforeAll */
  browser!: Browser;

  /** Per-scenario browser context – created in Before, closed in After */
  context!: BrowserContext;

  /** Per-scenario page – created in Before, closed in After */
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
