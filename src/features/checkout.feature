# language: en

Feature: Flujo completo de compra

  Como cliente de Sauce Demo
  Quiero completar una compra de inicio a fin
  Para poder adquirir los productos que necesito

  Background:
    Given que estoy autenticado como "standard_user"
    And he agregado "Sauce Labs Backpack" al carrito
    And navego al carrito de compras

  # ─── Criterio de aceptación 5 ───────────────────────────────────────────────
  @checkout
  Scenario: Completar exitosamente el proceso de compra completo
    When procedo al pago
    And ingreso mis datos con nombre "John", apellido "Doe" y código postal "12345"
    And continúo al resumen del pedido
    And finalizo el pedido
    Then debo ver la confirmación del pedido "Thank you for your order!"
