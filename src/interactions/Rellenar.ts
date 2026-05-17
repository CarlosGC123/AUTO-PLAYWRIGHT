import { Page } from '@playwright/test';
import { IInteraccionRellenar } from './types';
import { ElementoEsEscribible } from '../questions/ElementoEsEscribible';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Interacción: Fill
 * Valida que el elemento sea escribible (usando ElementoEsEscribible)
 * antes de limpiar y rellenar el campo. Lanza un error descriptivo si no está disponible.
 */
export const Rellenar: IInteraccionRellenar = {

  campo: async (page: Page, selector: string, value: string): Promise<void> => {
    try {
      FormatoConsola.accion(`Escribir en → ${selector}`);
      FormatoConsola.info(`  Texto a escribir: "${value}"`);

      const esEscribible = await ElementoEsEscribible.ejecutar(page, selector);
      if (!esEscribible) {
        throw new Error(`El elemento no está disponible para escribir: ${selector}`);
      }

      await page.locator(selector).fill(value);
      FormatoConsola.exito(`"${value}" escrito correctamente en → ${selector}`);

    } catch (error) {
      FormatoConsola.error(`Error al escribir en: ${selector}`, error);
      throw error;
    }
  }
};

