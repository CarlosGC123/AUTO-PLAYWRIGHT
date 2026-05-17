import * as dotenv from 'dotenv';
import * as path from 'path';

// Permite elegir el archivo de entorno desde fuera (tasks.json / launch.json).
// Si no se especifica ENV_FILE, usa '.env' por defecto.
const archivoEnv = process.env.ENV_FILE ?? '.env';
dotenv.config({ path: path.resolve(process.cwd(), archivoEnv) });

/**
 * Clase utilitaria para leer variables de entorno de forma segura.
 * Hace obligatorias las variables requeridas y provee valores por defecto tipados.
 */
export class EnvReader {
  /**
   * Obtiene el valor de una variable de entorno.
   * @param key          - El nombre de la variable de entorno.
   * @param defaultValue - Valor de respaldo opcional si la clave no está definida.
   * @throws Error si la variable no está definida y no se proporcionó valor por defecto.
   */
  static get(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined || value === '') {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(
        `[EnvReader] La variable de entorno requerida "${key}" no está definida. ` +
        `Verifica tu archivo .env.`
      );
    }
    return value;
  }
}
