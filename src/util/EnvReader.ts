import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Utility class to safely read environment variables.
 * Enforces required variables and provides typed defaults.
 */
export class EnvReader {
  /**
   * Retrieves the value of an environment variable.
   * @param key - The environment variable name.
   * @param defaultValue - Optional fallback value if the key is not set.
   * @throws Error if the variable is not defined and no default is provided.
   */
  static get(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined || value === '') {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(
        `[EnvReader] Required environment variable "${key}" is not defined. ` +
        `Check your .env file.`
      );
    }
    return value;
  }
}
