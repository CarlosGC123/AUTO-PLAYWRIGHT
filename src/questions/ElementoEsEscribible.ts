import { Page } from '@playwright/test';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Pregunta: ElementoEsEscribible
 * Consulta si un elemento de la UI está disponible para recibir texto:
 * debe ser visible, estar habilitado y ser editable.
 */
export class ElementoEsEscribible {

  static async ejecutar(page: Page, selector: string): Promise<boolean> {
    try {
      FormatoConsola.pregunta(`¿El elemento es escribible? → ${selector}`);

      const elemento   = page.locator(selector);
      const visible    = await elemento.isVisible();
      const habilitado = await elemento.isEnabled();
      const editable   = await elemento.isEditable();

      const resultado = visible && habilitado && editable;

      FormatoConsola.resultado('Elemento escribible', resultado);
      return resultado;

    } catch (error) {
      FormatoConsola.error(`Error al verificar si el elemento es escribible: ${selector}`, error);
      return false;
    }
  }
}
