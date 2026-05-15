/**
 * Patrón Adapter - Actividad
 *
 * 1. Problema:
 * En una aplicación, se quiere unificar el registro de logs tanto en consola local como usando una librería externa, pero ambas tienen interfaces distintas. Se requiere una interfaz común para que el sistema pueda registrar logs sin preocuparse del origen.
 *
 * 2. ¿Por qué Adapter es adecuado?
 * Permite que el sistema use indistintamente el logger local o el de la librería externa a través de una interfaz común, desacoplando la lógica de logueo del resto de la aplicación.
 *
 * 3. Implementación funcional:
 */

// Interfaz objetivo
interface LoggerTarget {
  log(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

// Logger local existente
class LocalLogger implements LoggerTarget {
  constructor(private file: string) {}
  log(msg: string) {
    console.log(`[${this.file} Log] ${msg}`);
  }
  warn(msg: string) {
    console.log(`[${this.file} Warning] ${msg}`);
  }
  error(msg: string) {
    console.log(`[${this.file} Error] ${msg}`);
  }
}

// Simulación de una librería externa de logs
class ExternalLogger {
  info(msg: string) { console.log(`[External INFO] ${msg}`); }
  warning(msg: string) { console.log(`[External WARNING] ${msg}`); }
  fatal(msg: string) { console.log(`[External FATAL] ${msg}`); }
}

// Adaptador para la librería externa
class ExternalLoggerAdapter implements LoggerTarget {
  private extLogger = new ExternalLogger();
  constructor(private file: string) {}
  log(msg: string) {
    this.extLogger.info(`[${this.file}] ${msg}`);
  }
  warn(msg: string) {
    this.extLogger.warning(`[${this.file}] ${msg}`);
  }
  error(msg: string) {
    this.extLogger.fatal(`[${this.file}] ${msg}`);
  }
}

// 4. Ejemplo de uso y documentación:
const loggers: LoggerTarget[] = [
  new LocalLogger('local.log'),
  new ExternalLoggerAdapter('externo.log'),
];

for (const logger of loggers) {
  logger.log('Mensaje informativo');
  logger.warn('Mensaje de advertencia');
  logger.error('Mensaje de error');
}

/**
 * Documentación:
 * - El problema es unificar el registro de logs con diferentes orígenes.
 * - Adapter permite usar ambos sistemas de logueo con la misma interfaz.
 * - El código muestra cómo el sistema puede registrar logs sin preocuparse del origen.
 */

/**
 * Documentación:
 * - El problema es la integración de servicios de pago con interfaces distintas.
 * - Adapter permite unificar la interfaz y desacoplar el sistema de los servicios externos.
 * - El código muestra cómo procesar pagos de forma uniforme usando adaptadores.
 */
