/**
 * Utility class for Base64 encoding and decoding.
 * Used to avoid storing sensitive values (e.g., passwords) as plaintext
 * in environment configuration files.
 */
export class Base64 {
  /**
   * Encodes a plain string to Base64.
   * @param value - The string to encode.
   */
  static encode(value: string): string {
    return Buffer.from(value, 'utf-8').toString('base64');
  }

  /**
   * Decodes a Base64 string back to plain text.
   * @param value - The Base64 string to decode.
   */
  static decode(value: string): string {
    return Buffer.from(value, 'base64').toString('utf-8');
  }
}
