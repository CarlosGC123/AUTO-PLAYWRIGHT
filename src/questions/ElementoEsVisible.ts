import { Page } from '@playwright/test';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Pregunta: ElementoEsVisible
 * Consulta si un elemento de la UI es actualmente visible en el viewport.
 */
export class ElementoEsVisible {

  static async ejecutar(page: Page, selector: string): Promise<boolean> {
    try {
      FormatoConsola.pregunta(`¿El elemento es visible? → ${selector}`);

      const elemento  = page.locator(selector);
      const resultado = await elemento.isVisible();

      FormatoConsola.resultado('Elemento visible', resultado);
      return resultado;

    } catch (error) {
      FormatoConsola.error(`Error al verificar visibilidad del elemento: ${selector}`, error);
      return false;
    }
  }
}