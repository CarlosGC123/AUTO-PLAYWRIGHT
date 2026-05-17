import { Page } from '@playwright/test';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Pregunta: TextoContiene
 * Consulta si el contenido textual de un elemento incluye el fragmento esperado.
 */
export class TextoContiene {

  static async ejecutar(
    page: Page,
    selector: string,
    texto: string
  ): Promise<boolean> {
    try {
      FormatoConsola.pregunta(`¿El elemento contiene el texto "${texto}"? → ${selector}`);

      const contenido = await page.locator(selector).textContent();
      const resultado = (contenido ?? '').includes(texto);

      FormatoConsola.resultado(`Texto encontrado "${texto}"`, resultado);
      return resultado;

    } catch (error) {
      FormatoConsola.error(`Error al leer el texto del elemento: ${selector}`, error);
      return false;
    }
  }
}