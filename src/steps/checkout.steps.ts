import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/CustomWorld';
import { Verificar } from '../interactions/Verificar';
import { CheckoutTask } from '../tasks/Checkout';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { FormatoConsola } from '../util/FormatoConsola';

// --- Cuando ---------------------------------------------------------------------

When(
  'procedo al pago',
  async function (this: CustomWorld) {
    try {
      FormatoConsola.paso('Cuando procedo al pago');
      await CheckoutTask.procederDesdeCarrito(this.page);
    } catch (error) {
      FormatoConsola.error('Error al proceder al pago', error);
      throw error;
    }
  }
);

When(
  'ingreso mis datos con nombre {string}, apellido {string} y código postal {string}',
  async function (
    this: CustomWorld,
    nombre: string,
    apellido: string,
    codigoPostal: string
  ) {
    try {
      FormatoConsola.paso(`Cuando ingreso mis datos: ${nombre} ${apellido} - ${codigoPostal}`);
      await CheckoutTask.rellenarDatosPersonales(this.page, nombre, apellido, codigoPostal);
    } catch (error) {
      FormatoConsola.error('Error al ingresar los datos personales', error);
      throw error;
    }
  }
);

When(
  'continúo al resumen del pedido',
  async function (this: CustomWorld) {
    try {
      FormatoConsola.paso('Cuando continúo al resumen del pedido');
      await CheckoutTask.continuarAlResumen(this.page);
    } catch (error) {
      FormatoConsola.error('Error al continuar al resumen del pedido', error);
      throw error;
    }
  }
);

When(
  'finalizo el pedido',
  async function (this: CustomWorld) {
    try {
      FormatoConsola.paso('Cuando finalizo el pedido');
      await CheckoutTask.finalizarPedido(this.page);
    } catch (error) {
      FormatoConsola.error('Error al finalizar el pedido', error);
      throw error;
    }
  }
);

// --- Entonces -------------------------------------------------------------------

Then(
  'debo ver la confirmación del pedido {string}',
  async function (this: CustomWorld, encabezadoEsperado: string) {
    try {
      FormatoConsola.paso(`Entonces debo ver la confirmación del pedido "${encabezadoEsperado}"`);
      await Verificar.urlContiene(this.page, 'checkout-complete');
      await Verificar.esVisible(this.page, CheckoutCompletePage.completeHeader);
      await Verificar.contieneTexto(this.page, CheckoutCompletePage.completeHeader, encabezadoEsperado);
      FormatoConsola.exito(`Confirmación de pedido verificada: "${encabezadoEsperado}"`);
    } catch (error) {
      FormatoConsola.error(`No se pudo confirmar el pedido: "${encabezadoEsperado}"`, error);
      throw error;
    }
  }
);
