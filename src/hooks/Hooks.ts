import {
  AfterAll,
  Before,
  After,
  BeforeAll,
  Status,
  setDefaultTimeout
} from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from './CustomWorld';
import { EnvReader } from '../util/EnvReader';
import { FormatoConsola } from '../util/FormatoConsola';

setDefaultTimeout(60_000);

/**
 * Hooks – gestiona el ciclo de vida del browser de Playwright.
 *
 * Ciclo de vida:
 *   BeforeAll  → Lanza el browser (una vez para toda la suite)
 *   Before     → Abre un context + page frescos por escenario
 *   After      → Captura screenshot en fallo, cierra page + context
 *   AfterAll   → Cierra el browser
 */

type BrowserName = 'chromium' | 'firefox' | 'webkit';

const browserLaunchers: Record<BrowserName, typeof chromium> = {
  chromium,
  firefox,
  webkit
};

let browser: Browser;

// ─── BeforeAll ───────────────────────────────────────────────────────────────

BeforeAll({ timeout: 120_000 }, async function () {
  try {
    const browserName = EnvReader.get('BROWSER', 'chromium') as BrowserName;
    const isHeadless   = EnvReader.get('HEADLESS', 'false') === 'true';

    FormatoConsola.separador('Iniciando Suite de Pruebas');
    FormatoConsola.info(`Navegador: ${browserName} | Modo headless: ${isHeadless}`);

    const launcher = browserLaunchers[browserName] ?? chromium;
    browser = await launcher.launch({
      headless: isHeadless,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    FormatoConsola.exito('Navegador lanzado correctamente');
  } catch (error) {
    FormatoConsola.error('Error al lanzar el navegador', error);
    throw error;
  }
});

// ─── Before (per scenario) ───────────────────────────────────────────────────

Before(async function (this: CustomWorld, scenario) {
  try {
    FormatoConsola.separador(`Escenario: ${scenario.pickle.name}`);
    FormatoConsola.info('Creando contexto y página para el escenario');

    this.browser = browser;
    this.context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
    this.page.setDefaultNavigationTimeout(60_000);
    this.page.setDefaultTimeout(60_000);

    FormatoConsola.exito('Contexto y página listos');
  } catch (error) {
    FormatoConsola.error(`Error al inicializar el escenario: ${scenario.pickle.name}`, error);
    throw error;
  }
});

// ─── After (per scenario) ────────────────────────────────────────────────────

After(async function (this: CustomWorld, scenario) {
  const estado  = scenario.result?.status ?? 'desconocido';
  const nombre  = scenario.pickle.name;

  try {
    if (scenario.result?.status === Status.FAILED) {
      FormatoConsola.advertencia(`Escenario FALLIDO: ${nombre}`);
      if (this.page) {
        FormatoConsola.info('Capturando screenshot del fallo');
        const screenshotBuffer = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshotBuffer, 'image/png');
      }
    } else {
      FormatoConsola.exito(`Escenario completado [${estado}]: ${nombre}`);
    }
  } finally {
    await this.page?.close().catch(() => {});
    await this.context?.close().catch(() => {});
    FormatoConsola.info('Contexto y página cerrados');
  }
});

// ─── AfterAll ────────────────────────────────────────────────────────────────

AfterAll({ timeout: 30_000 }, async function () {
  try {
    await browser.close();
    FormatoConsola.separador('Suite de Pruebas Finalizada');
  } catch (error) {
    FormatoConsola.error('Error al cerrar el navegador', error);
    throw error;
  }
});
