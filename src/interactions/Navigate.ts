import { Page } from '@playwright/test';
import { IInteraccionNavegar } from './types';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Interacción: Navigate
 * Dirige el navegador hacia una URL y espera que la página alcance
 * el estado 'domcontentloaded' antes de continuar.
 */
export const Navegar: IInteraccionNavegar = {

  a: async (page: Page, url: string): Promise<void> => {
    try {
      FormatoConsola.accion(`Navegando a → ${url}`);

      await page.goto(url, { waitUntil: 'domcontentloaded' });

      FormatoConsola.exito(`Navegación completada → ${url}`);

    } catch (error) {
      FormatoConsola.error(`Error al navegar a: ${url}`, error);
      throw error;
    }
  }
};

