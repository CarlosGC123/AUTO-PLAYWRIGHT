/**
 * Página: Checkout Paso 2 – Resumen del pedido  (/checkout-step-two.html)
 */
export const CheckoutTwoPage = {
  summaryContainer: '#checkout_summary_container',
  summaryItemName:  '.inventory_item_name',
  itemTotalLabel:   '.summary_subtotal_label',
  taxLabel:         '.summary_tax_label',
  totalLabel:       '.summary_total_label',
  finishButton:     '[data-test="finish"]',
  cancelButton:     '[data-test="cancel"]'
} as const;
