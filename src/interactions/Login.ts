import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Rellenar } from './Rellenar';
import { Clic } from './DarClick';
import { FormatoConsola } from '../util/FormatoConsola';

/**
 * Interacción: Login
 * Encapsula el flujo de inicio de sesión: rellena usuario y contraseña
 * y hace clic en el botón de acceso. Utiliza Fill y Click, que incluyen
 * validación previa de estado del elemento mediante preguntas.
 */
export class IniciarSesion {

  static async ejecutar(page: Page, usuario: string, password: string): Promise<void> {
    try {
      FormatoConsola.accion(`Iniciando sesión como usuario: ${usuario}`);

      await Rellenar.campo(page, LoginPage.usernameInput, usuario);
      await Rellenar.campo(page, LoginPage.passwordInput, password);
      await Clic.sobre(page, LoginPage.loginButton);

      FormatoConsola.exito(`Sesión iniciada correctamente como: ${usuario}`);

    } catch (error) {
      FormatoConsola.error(`Error al iniciar sesión con usuario: ${usuario}`, error);
      throw error;
    }
  }
}
