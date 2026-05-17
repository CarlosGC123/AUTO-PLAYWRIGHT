import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/CustomWorld';
import { Navegar } from '../interactions/Navigate';
import { IniciarSesion } from '../interactions/Login';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { EnvReader } from '../util/EnvReader';
import { Base64 } from '../util/Base64';
import { FormatoConsola } from '../util/FormatoConsola';
import { expect } from '@playwright/test';

import { UrlContiene } from '../questions/UrlContiene';
import { ElementoEsVisible } from '../questions/ElementoEsVisible';
import { TextoContiene } from '../questions/TextoContiene';

// --- Dado -----------------------------------------------------------------------

Given(
  'que estoy en la página de inicio de sesión de Sauce Demo',
  async function (this: CustomWorld) {
    try {
      FormatoConsola.paso('Dado que estoy en la página de inicio de sesión de Sauce Demo');
      await Navegar.a(this.page, EnvReader.get('BASE_URL'));
    } catch (error) {
      FormatoConsola.error('Error al navegar a la página de inicio de sesión', error);
      throw error;
    }
  }
);

/**
 * Paso compartido por los Antecedentes de shopping.feature y checkout.feature
 * para establecer una sesión autenticada como precondición del escenario.
 */
Given('que estoy autenticado como {string}',
  async function (this: CustomWorld, usuario: string) {
    try {
      FormatoConsola.paso(`Dado que estoy autenticado como "${usuario}"`);
      const contraseña = Base64.decode(EnvReader.get('PASSWORD'));
      await Navegar.a(this.page, EnvReader.get('BASE_URL'));
      await IniciarSesion.ejecutar(this.page, usuario, contraseña);
    } catch (error) {
      FormatoConsola.error(`Error al autenticarse como "${usuario}"`, error);
      throw error;
    }
  }
);

// --- Cuando ---------------------------------------------------------------------

When(
  'inicio sesión con el usuario {string} y la contraseña válida',
  async function (this: CustomWorld, usuario: string) {
    try {
      FormatoConsola.paso(`Cuando inicio sesión con el usuario "${usuario}" y la contraseña válida`);
      const contraseña = Base64.decode(EnvReader.get('PASSWORD'));
      await IniciarSesion.ejecutar(this.page, usuario, contraseña);
    } catch (error) {
      FormatoConsola.error(`Error al iniciar sesión con usuario "${usuario}"`, error);
      throw error;
    }
  }
);

When(
  'inicio sesión con el usuario {string} y la contraseña {string}',
  async function (this: CustomWorld, usuario: string, password: string) {
    try {
      FormatoConsola.paso(`Cuando inicio sesión con el usuario "${usuario}" y contraseña personalizada`);
      await IniciarSesion.ejecutar(this.page, usuario, password);
    } catch (error) {
      FormatoConsola.error(`Error al iniciar sesión con usuario "${usuario}"`, error);
      throw error;
    }
  }
);

// --- Entonces -------------------------------------------------------------------

Then(
  'debo ver la página de productos',
  async function (this: CustomWorld) {
    try {
      FormatoConsola.paso('Entonces debo ver la página de productos');

      const urlOk = await UrlContiene.ejecutar(this.page, 'inventory');
      expect(urlOk).toBeTruthy();

      const tituloVisible = await ElementoEsVisible.ejecutar(
        this.page,
        InventoryPage.pageTitle
      );
      expect(tituloVisible).toBeTruthy();

      FormatoConsola.exito('Página de productos confirmada');
    } catch (error) {
      FormatoConsola.error('No se pudo confirmar la página de productos', error);
      throw error;
    }
  }
);

Then(
  'debo ver el mensaje de error {string}',
  async function (this: CustomWorld, mensajeEsperado: string) {
    try {
      FormatoConsola.paso(`Entonces debo ver el mensaje de error "${mensajeEsperado}"`);

      const contieneTexto = await TextoContiene.ejecutar(
        this.page,
        LoginPage.errorMessage,
        mensajeEsperado
      );
      expect(contieneTexto).toBeTruthy();

      FormatoConsola.exito(`Mensaje de error confirmado: "${mensajeEsperado}"`);
    } catch (error) {
      FormatoConsola.error(`No se encontró el mensaje de error: "${mensajeEsperado}"`, error);
      throw error;
    }
  }
);
