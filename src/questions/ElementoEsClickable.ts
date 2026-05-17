import { Page } from '@playwright/test';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Pregunta: ElementoEsClickable
 * Consulta si un elemento de la UI está disponible para recibir un clic:
 * debe ser visible y estar habilitado.
 */
export class ElementoEsClickable {

  static async ejecutar(page: Page, selector: string): Promise<boolean> {
    try {
      FormatoConsola.pregunta(`¿El elemento es clickable? → ${selector}`);

      const elemento   = page.locator(selector);
      const visible    = await elemento.isVisible();
      const habilitado = await elemento.isEnabled();
      const resultado  = visible && habilitado;

      FormatoConsola.resultado('Elemento clickable', resultado);
      return resultado;

    } catch (error) {
      FormatoConsola.error(`Error al verificar si el elemento es clickable: ${selector}`, error);
      return false;
    }
  }
}