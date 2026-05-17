import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

/**
 * CustomWorld – extiende el World por defecto de Cucumber para exponer las
 * instancias de browser, context y page de Playwright a cada step definition.
 *
 * Cucumber crea una nueva instancia de CustomWorld por escenario.
 * El archivo Hooks es responsable de asignar el browser compartido
 * y de crear/destruir el context y la page por escenario.
 */
export class CustomWorld extends World {
  /** Instancia de browser compartida – lanzada una vez en BeforeAll */
  browser!: Browser;

  /** Contexto de navegación por escenario – creado en Before, cerrado en After */
  context!: BrowserContext;

  /** Página por escenario – creada en Before, cerrada en After */
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
