Feature: Autenticación de usuarios

  Como cliente de Sauce Demo
  Quiero poder iniciar sesión en la aplicación
  Para poder acceder al catálogo de productos

  # ─── Criterio de aceptación 1 ───────────────────────────────────────────────
  @login
  Scenario Outline: Inicio de sesión exitoso con usuario estándar
    Given que estoy en la página de inicio de sesión de Sauce Demo
    When inicio sesión con el usuario "standard_user" y la contraseña válida
    Then debo ver la página de productos

  # ─── Criterio de aceptación 2 – Casos de fallo con datos ───────────────────
  # Cubre tanto el usuario bloqueado como credenciales inválidas en un solo esquema.
  @login_fallido
  Scenario Outline: Intento de inicio de sesión fallido muestra un mensaje de error
    Given que estoy en la página de inicio de sesión de Sauce Demo
    When inicio sesión con el usuario "<usuario>" y la contraseña "<contraseña>"
    Then debo ver el mensaje de error "<errorEsperado>"

    Examples:
      | usuario         | contraseña     | errorEsperado                                                                 |
      | locked_out_user | secret_sauce   | Epic sadface: Sorry, this user has been locked out.                           |
      | invalid_user    | wrong_password | Epic sadface: Username and password do not match any user in this service     |
