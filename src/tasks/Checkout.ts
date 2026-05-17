import { Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutOnePage } from '../pages/CheckoutOnePage';
import { CheckoutTwoPage } from '../pages/CheckoutTwoPage';
import { Clic } from '../interactions/DarClick';
import { Rellenar } from '../interactions/Rellenar';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Tarea: CheckoutTask
 * Orquesta el proceso de pago en múltiples pasos.
 * Cada método corresponde a un paso distinto del flujo de compra.
 */
export const CheckoutTask = {

  procederDesdeCarrito: async (page: Page): Promise<void> => {
    try {
      FormatoConsola.tarea('Proceder al pago desde el carrito');
      await Clic.sobre(page, CartPage.checkoutButton);
      FormatoConsola.exito('Acceso al formulario de pago');
    } catch (error) {
      FormatoConsola.error('Error al proceder al pago', error);
      throw error;
    }
  },

  rellenarDatosPersonales: async (
    page: Page,
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> => {
    try {
      FormatoConsola.tarea(`Rellenar datos personales: ${firstName} ${lastName} - ${postalCode}`);
      await Rellenar.campo(page, CheckoutOnePage.firstNameInput, firstName);
      await Rellenar.campo(page, CheckoutOnePage.lastNameInput, lastName);
      await Rellenar.campo(page, CheckoutOnePage.postalCodeInput, postalCode);
      FormatoConsola.exito('Datos personales rellenados correctamente');
    } catch (error) {
      FormatoConsola.error('Error al rellenar los datos personales', error);
      throw error;
    }
  },

  continuarAlResumen: async (page: Page): Promise<void> => {
    try {
      FormatoConsola.tarea('Continuar al resumen del pedido');
      await Clic.sobre(page, CheckoutOnePage.continueButton);
      FormatoConsola.exito('Navegación al resumen del pedido');
    } catch (error) {
      FormatoConsola.error('Error al continuar al resumen del pedido', error);
      throw error;
    }
  },

  finalizarPedido: async (page: Page): Promise<void> => {
    try {
      FormatoConsola.tarea('Finalizar el pedido');
      await Clic.sobre(page, CheckoutTwoPage.finishButton);
      FormatoConsola.exito('Pedido finalizado correctamente');
    } catch (error) {
      FormatoConsola.error('Error al finalizar el pedido', error);
      throw error;
    }
  }
};

