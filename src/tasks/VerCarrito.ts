import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { Clic } from '../interactions/DarClick';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Tarea: ViewCartTask
 * Navega al carrito de compras haciendo clic en el ícono del carrito en la cabecera.
 */
export const VerCarritoTask = {

  ejecutar: async (page: Page): Promise<void> => {
    try {
      FormatoConsola.tarea('Navegar al carrito de compras');

      await Clic.sobre(page, InventoryPage.cartLink);

      FormatoConsola.exito('Navegación al carrito completada');

    } catch (error) {
      FormatoConsola.error('Error al navegar al carrito de compras', error);
      throw error;
    }
  }
};

