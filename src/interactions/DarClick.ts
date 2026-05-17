import { Page } from '@playwright/test';
import { IInteraccionClic } from './types';
import { ElementoEsClickable } from '../questions/ElementoEsClickable';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Interacción: Click
 * Valida que el elemento sea clickable (usando ElementoEsClickable)
 * antes de ejecutar el clic. Lanza un error descriptivo si no está disponible.
 */
export const Clic: IInteraccionClic = {

  sobre: async (page: Page, selector: string): Promise<void> => {
    try {
      FormatoConsola.accion(`Click → ${selector}`);

      const esClickable = await ElementoEsClickable.ejecutar(page, selector);
      if (!esClickable) {
        throw new Error(`El elemento no está disponible para hacer click: ${selector}`);
      }

      await page.locator(selector).click();
      FormatoConsola.exito(`Click ejecutado correctamente → ${selector}`);

    } catch (error) {
      FormatoConsola.error(`Error al hacer click en: ${selector}`, error);
      throw error;
    }
  }
};

