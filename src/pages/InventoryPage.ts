/**
 * Página: Inventario / Catálogo de productos  (/inventory.html)
 * Contiene selectores y constructores de selectores dinámicos para el catálogo de productos.
 */
export const InventoryPage = {
  pageTitle:          '.title',
  inventoryContainer: '#inventory_container',
  inventoryList:      '.inventory_list',
  cartBadge:          '.shopping_cart_badge',
  cartLink:           '.shopping_cart_link',

  /**
   * Resuelve el selector del botón "Agregar al carrito" para un producto dado.
   * Formato data-test de Sauce Demo: add-to-cart-{nombre-producto-con-guiones}
   * Ejemplo: "Sauce Labs Backpack" → [data-test="add-to-cart-sauce-labs-backpack"]
   */
  addToCartButton: (productName: string): string => {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    return `[data-test="add-to-cart-${productId}"]`;
  },

  /**
   * Resuelve el selector del botón "Eliminar" después de que un producto ha sido agregado.
   */
  removeButton: (productName: string): string => {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    return `[data-test="remove-${productId}"]`;
  }
} as const;
