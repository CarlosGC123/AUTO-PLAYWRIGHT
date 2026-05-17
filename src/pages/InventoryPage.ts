/**
 * Page: Inventory / Products Page  (/inventory.html)
 * Holds selectors and dynamic selector builders for the product catalogue.
 */
export const InventoryPage = {
  pageTitle:          '.title',
  inventoryContainer: '#inventory_container',
  inventoryList:      '.inventory_list',
  cartBadge:          '.shopping_cart_badge',
  cartLink:           '.shopping_cart_link',

  /**
   * Resolves the "Add to cart" button selector for a given product name.
   * Sauce Demo data-test format: add-to-cart-{product-name-dashed}
   * Example: "Sauce Labs Backpack" → [data-test="add-to-cart-sauce-labs-backpack"]
   */
  addToCartButton: (productName: string): string => {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    return `[data-test="add-to-cart-${productId}"]`;
  },

  /**
   * Resolves the "Remove" button selector after a product has been added.
   */
  removeButton: (productName: string): string => {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    return `[data-test="remove-${productId}"]`;
  }
} as const;
