import { Page } from '@playwright/test';

/**
 * Contrato para interacciones de clic atómicas.
 *
 * Principio de Segregación de Interfaces (ISP): los consumidores dependen solo
 * de este contrato reducido.
 * Principio de Inversión de Dependencias (DIP): las Tasks de alto nivel dependen
 * de esta abstracción, no del objeto concreto Click.
 */
export interface IInteraccionClic {
  sobre(page: Page, selector: string): Promise<void>;
}

/**
 * Contrato para interacciones de relleno de campos.
 */
export interface IInteraccionRellenar {
  campo(page: Page, selector: string, value: string): Promise<void>;
}

/**
 * Contrato para interacciones de navegación de página.
 */
export interface IInteraccionNavegar {
  a(page: Page, url: string): Promise<void>;
}

/**
 * Contrato para interacciones de aserción y verificación.
 */
export interface IInteraccionVerificar {
  urlContiene(page: Page, urlFragment: string): Promise<void>;
  esVisible(page: Page, selector: string): Promise<void>;
  contieneTexto(page: Page, selector: string, expectedText: string): Promise<void>;
  tieneTextoExacto(page: Page, selector: string, expectedText: string): Promise<void>;
}
