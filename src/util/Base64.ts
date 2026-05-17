/**
 * Clase utilitaria para codificación y decodificación en Base64.
 * Se usa para evitar almacenar valores sensibles (ej. contraseñas) como texto plano
 * en los archivos de configuración de entorno.
 */
export class Base64 {
  /**
   * Codifica una cadena de texto plano a Base64.
   * @param value - La cadena a codificar.
   */
  static encode(value: string): string {
    return Buffer.from(value, 'utf-8').toString('base64');
  }

  /**
   * Decodifica una cadena Base64 de vuelta a texto plano.
   * @param value - La cadena Base64 a decodificar.
   */
  static decode(value: string): string {
    return Buffer.from(value, 'base64').toString('utf-8');
  }
}
