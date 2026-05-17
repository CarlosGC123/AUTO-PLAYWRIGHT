/**
 * Página: Login  (/)
 * Contiene todos los selectores CSS/data-test estables de la página de inicio de sesión.
 * Sin lógica — solo referencias a elementos.
 */
export const LoginPage = {
  usernameInput:  '[data-test="username"]',
  passwordInput:  '[data-test="password"]',
  loginButton:    '[data-test="login-button"]',
  errorMessage:   '[data-test="error"]'
} as const;
