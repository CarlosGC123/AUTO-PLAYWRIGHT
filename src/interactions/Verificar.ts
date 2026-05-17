import { Page, expect } from '@playwright/test';
import { IInteraccionVerificar } from './types';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Interacción: Verify
 * Acciones de aserción respaldadas por la librería expect de Playwright con
 * reintentos automáticos. Todos los métodos lanzan AssertionError en caso de
 * fallo, que Cucumber reporta como paso fallido.
 */
export const Verificar: IInteraccionVerificar = {

  urlContiene: async (page: Page, urlFragment: string): Promise<void> => {
    try {
      FormatoConsola.accion(`Verificar que la URL contiene: "${urlFragment}"`);
      await expect(page).toHaveURL(new RegExp(urlFragment));
      FormatoConsola.exito(`URL contiene: "${urlFragment}"`);
    } catch (error) {
      FormatoConsola.error(`La URL no contiene: "${urlFragment}"`, error);
      throw error;
    }
  },

  esVisible: async (page: Page, selector: string): Promise<void> => {
    try {
      FormatoConsola.accion(`Verificar visibilidad del elemento → ${selector}`);
      await expect(page.locator(selector)).toBeVisible();
      FormatoConsola.exito(`Elemento visible → ${selector}`);
    } catch (error) {
      FormatoConsola.error(`El elemento no es visible: ${selector}`, error);
      throw error;
    }
  },

  contieneTexto: async (
    page: Page,
    selector: string,
    expectedText: string
  ): Promise<void> => {
    try {
      FormatoConsola.accion(`Verificar que el elemento contiene "${expectedText}" → ${selector}`);
      await expect(page.locator(selector)).toContainText(expectedText);
      FormatoConsola.exito(`El elemento contiene "${expectedText}"`);
    } catch (error) {
      FormatoConsola.error(`El elemento no contiene "${expectedText}": ${selector}`, error);
      throw error;
    }
  },

  tieneTextoExacto: async (
    page: Page,
    selector: string,
    expectedText: string
  ): Promise<void> => {
    try {
      FormatoConsola.accion(`Verificar texto exacto "${expectedText}" → ${selector}`);
      await expect(page.locator(selector)).toHaveText(expectedText);
      FormatoConsola.exito(`Texto exacto confirmado "${expectedText}"`);
    } catch (error) {
      FormatoConsola.error(`Texto exacto no coincide "${expectedText}": ${selector}`, error);
      throw error;
    }
  }
};

