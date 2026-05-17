/**
 * Utilidad: FormatoConsola
 * Proporciona métodos de registro (logging) con formato visual y colores ANSI
 * para facilitar el seguimiento detallado de la ejecución del script en segundo plano.
 *
 * Niveles disponibles:
 *   separador  → delimitador visual entre bloques importantes
 *   paso       → inicio de un step de Cucumber
 *   tarea      → inicio de una Task de alto nivel
 *   accion     → inicio de una Interaction atómica
 *   pregunta   → consulta (Question) sobre el estado de la UI
 *   resultado  → respuesta booleana/string de una pregunta
 *   exito      → operación completada satisfactoriamente
 *   advertencia→ situación no crítica pero relevante
 *   error      → fallo con detalle del error
 */
export class FormatoConsola {

  private static readonly RESET    = '\x1b[0m';
  private static readonly NEGRITA  = '\x1b[1m';
  private static readonly VERDE    = '\x1b[32m';
  private static readonly ROJO     = '\x1b[31m';
  private static readonly AMARILLO = '\x1b[33m';
  private static readonly CIAN     = '\x1b[36m';
  private static readonly MAGENTA  = '\x1b[35m';
  private static readonly GRIS     = '\x1b[90m';

  // ─── Timestamp ────────────────────────────────────────────────────────────

  private static ahora(): string {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  // ─── Métodos públicos ─────────────────────────────────────────────────────

  static separador(etiqueta?: string): void {
    const linea = '─'.repeat(70);
    if (etiqueta) {
      console.log(`\n${this.GRIS}${linea}${this.RESET}`);
      console.log(`${this.NEGRITA}  ${etiqueta}${this.RESET}`);
      console.log(`${this.GRIS}${linea}${this.RESET}\n`);
    } else {
      console.log(`${this.GRIS}${linea}${this.RESET}`);
    }
  }

  static paso(mensaje: string): void {
    console.log(
      `${this.NEGRITA}${this.CIAN}[PASO]${this.RESET}       ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }

  static tarea(mensaje: string): void {
    console.log(
      `${this.VERDE}[TAREA]${this.RESET}      ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }

  static accion(mensaje: string): void {
    console.log(
      `${this.MAGENTA}[ACCIÓN]${this.RESET}     ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }

  static pregunta(mensaje: string): void {
    console.log(
      `${this.AMARILLO}[PREGUNTA]${this.RESET}   ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }

  static resultado(descripcion: string, valor: boolean | string): void {
    const color = valor === true ? this.VERDE : valor === false ? this.ROJO : this.CIAN;
    console.log(
      `${color}[RESULTADO]${this.RESET}  ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${descripcion}: ${color}${valor}${this.RESET}`
    );
  }

  static exito(mensaje: string): void {
    console.log(
      `${this.VERDE}[ÉXITO]${this.RESET}      ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }

  static advertencia(mensaje: string): void {
    console.warn(
      `${this.AMARILLO}[ADVERTENCIA]${this.RESET} ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }

  static error(mensaje: string, error?: unknown): void {
    const detalle = error instanceof Error ? ` → ${error.message}` : '';
    console.error(
      `${this.ROJO}[ERROR]${this.RESET}      ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}${detalle}`
    );
  }

  static info(mensaje: string): void {
    console.log(
      `${this.CIAN}[INFO]${this.RESET}       ` +
      `${this.GRIS}${this.ahora()}${this.RESET}  ${mensaje}`
    );
  }
}
