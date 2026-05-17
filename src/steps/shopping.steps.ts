import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/CustomWorld';
import { Verificar } from '../interactions/Verificar';
import { AgregarProductoTask } from '../tasks/AgregarProducto';
import { VerCarritoTask } from '../tasks/VerCarrito';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { FormatoConsola } from '../util/FormatoConsola';

// --- Dado -----------------------------------------------------------------------

/**
 * Usado en los Antecedentes de checkout.feature para agregar un producto
 * como precondición del escenario.
 */
Given(
  'he agregado {string} al carrito',
  async function (this: CustomWorld, nombreProducto: string) {
    try {
      FormatoConsola.paso(`Dado que he agregado "${nombreProducto}" al carrito`);
      await AgregarProductoTask.ejecutar(this.page, nombreProducto);
    } catch (error) {
      FormatoConsola.error(`Error al agregar "${nombreProducto}" al carrito`, error);
      throw error;
    }
  }
);

// --- Cuando ---------------------------------------------------------------------

When(
  'agrego el producto {string} al carrito',
  async function (this: CustomWorld, nombreProducto: string) {
    try {
      FormatoConsola.paso(`Cuando agrego el producto "${nombreProducto}" al carrito`);
      await AgregarProductoTask.ejecutar(this.page, nombreProducto);
    } catch (error) {
      FormatoConsola.error(`Error al agregar el producto "${nombreProducto}" al carrito`, error);
      throw error;
    }
  }
);

When(
  'navego al carrito de compras',
  async function (this: CustomWorld) {
    try {
      FormatoConsola.paso('Cuando navego al carrito de compras');
      await VerCarritoTask.ejecutar(this.page);
    } catch (error) {
      FormatoConsola.error('Error al navegar al carrito de compras', error);
      throw error;
    }
  }
);

// --- Entonces -------------------------------------------------------------------

Then(
  /^el indicador del carrito debe mostrar "([^"]+)" artículo\(s\)$/,
  async function (this: CustomWorld, cantidadEsperada: string) {
    try {
      FormatoConsola.paso(`Entonces el indicador del carrito debe mostrar "${cantidadEsperada}" artículo(s)`);
      await Verificar.esVisible(this.page, InventoryPage.cartBadge);
      await Verificar.tieneTextoExacto(this.page, InventoryPage.cartBadge, cantidadEsperada);
      FormatoConsola.exito(`Indicador del carrito muestra "${cantidadEsperada}"`);
    } catch (error) {
      FormatoConsola.error(`El indicador del carrito no muestra "${cantidadEsperada}"`, error);
      throw error;
    }
  }
);

Then(
  'debo ver {string} en el carrito',
  async function (this: CustomWorld, nombreProducto: string) {
    try {
      FormatoConsola.paso(`Entonces debo ver "${nombreProducto}" en el carrito`);
      await Verificar.urlContiene(this.page, 'cart');
      await Verificar.contieneTexto(this.page, CartPage.itemName, nombreProducto);
      FormatoConsola.exito(`Producto "${nombreProducto}" visible en el carrito`);
    } catch (error) {
      FormatoConsola.error(`El producto "${nombreProducto}" no se encontró en el carrito`, error);
      throw error;
    }
  }
);
