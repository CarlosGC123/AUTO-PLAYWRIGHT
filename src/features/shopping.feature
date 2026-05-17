# language: es
@shopping
Característica: Gestión del carrito de compras

  Como cliente de Sauce Demo
  Quiero poder agregar productos a mi carrito
  Para poder llevar un control de los artículos que deseo comprar

  Antecedentes:
    Dado que estoy autenticado como "standard_user"

  # ─── Criterio de aceptación 3 ───────────────────────────────────────────────
  Escenario: Agregar un producto al carrito desde la página de productos
    Cuando agrego el producto "Sauce Labs Backpack" al carrito
    Entonces el indicador del carrito debe mostrar "1" artículo(s)

  # ─── Criterio de aceptación 4 ───────────────────────────────────────────────
  Escenario: Ver los productos agregados en el carrito de compras
    Cuando agrego el producto "Sauce Labs Backpack" al carrito
    Y navego al carrito de compras
    Entonces debo ver "Sauce Labs Backpack" en el carrito
