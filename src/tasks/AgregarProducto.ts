import { Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { Clic } from '../interactions/DarClick';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Tarea: AddProductTask
 * Agrega un producto al carrito haciendo clic en su botón correspondiente
 * en la página de inventario.
 */
export const AgregarProductoTask = {

  ejecutar: async (page: Page, productName: string): Promise<void> => {
    try {
      FormatoConsola.tarea(`Agregar producto al carrito: "${productName}"`);

      const selector = InventoryPage.addToCartButton(productName);
      await Clic.sobre(page, selector);

      FormatoConsola.exito(`Producto agregado al carrito: "${productName}"`);

    } catch (error) {
      FormatoConsola.error(`Error al agregar el producto al carrito: "${productName}"`, error);
      throw error;
    }
  }
};

