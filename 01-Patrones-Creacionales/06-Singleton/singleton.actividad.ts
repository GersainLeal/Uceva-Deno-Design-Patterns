/**
 * Patrón Singleton - Actividad
 *
 * 1. Problema:
 * En una aplicación, solo debe existir una única instancia de la clase que gestiona la configuración global (por ejemplo, idioma, tema, etc.), para evitar inconsistencias y garantizar acceso centralizado.
 *
 * 2. ¿Por qué Singleton es adecuado?
 * El patrón Singleton asegura que solo exista una instancia de una clase y proporciona un punto de acceso global, evitando duplicidad y garantizando consistencia.
 *
 * 3. Implementación funcional:
 */

class AppConfig {
  private static instance: AppConfig;
  private config: Record<string, string> = {};

  private constructor() {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  set(key: string, value: string) {
    this.config[key] = value;
  }

  get(key: string): string | undefined {
    return this.config[key];
  }
}

// 4. Ejemplo de uso y documentación:
const config1 = AppConfig.getInstance();
config1.set('theme', 'dark');

const config2 = AppConfig.getInstance();
console.log(config2.get('theme')); // 'dark'
console.log(config1 === config2); // true

/**
 * Documentación:
 * - El problema es la gestión centralizada de la configuración global.
 * - Singleton garantiza una única instancia y acceso global.
 * - El código muestra cómo acceder y modificar la configuración desde cualquier parte de la app.
 */
