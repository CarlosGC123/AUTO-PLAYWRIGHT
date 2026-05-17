import { Page } from '@playwright/test';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Pregunta: UrlContiene
 * Consulta si la URL actual del navegador contiene el fragmento esperado.
 */
export class UrlContiene {

  static async ejecutar(page: Page, fragmento: string): Promise<boolean> {
    try {
      FormatoConsola.pregunta(`¿La URL contiene "${fragmento}"?`);

      const url       = page.url();
      const resultado = url.includes(fragmento);

      FormatoConsola.resultado(`URL contiene "${fragmento}"`, resultado);
      return resultado;

    } catch (error) {
      FormatoConsola.error(`Error al leer la URL actual`, error);
      return false;
    }
  }
}