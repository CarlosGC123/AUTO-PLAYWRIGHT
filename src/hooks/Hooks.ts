import {
  AfterAll,
  Before,
  After,
  BeforeAll,
  Status
} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from './CustomWorld';
import { EnvReader } from '../util/EnvReader';

/**
 * Hooks – manages the Playwright browser lifecycle outside the system under test.
 *
 * Lifecycle:
 *   BeforeAll  → Launch browser (once for the whole test suite)
 *   Before     → Open a fresh context + page per scenario
 *   After      → Capture screenshot on failure, close page + context
 *   AfterAll   → Close the browser
 */

type BrowserName = 'chromium' | 'firefox' | 'webkit';

const browserLaunchers: Record<BrowserName, typeof chromium> = {
  chromium,
  firefox,
  webkit
};

let browser: Browser;

// ─── BeforeAll ───────────────────────────────────────────────────────────────

BeforeAll(async function () {
  const browserName = EnvReader.get('BROWSER', 'chromium') as BrowserName;
  const isHeadless   = EnvReader.get('HEADLESS', 'false') === 'true';

  const launcher = browserLaunchers[browserName] ?? chromium;
  browser = await launcher.launch({ headless: isHeadless });
});

// ─── Before (per scenario) ───────────────────────────────────────────────────

Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  this.page = await this.context.newPage();
});

// ─── After (per scenario) ────────────────────────────────────────────────────

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotBuffer = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshotBuffer, 'image/png');
  }

  await this.page.close();
  await this.context.close();
});

// ─── AfterAll ────────────────────────────────────────────────────────────────

AfterAll(async function () {
  await browser.close();
});
