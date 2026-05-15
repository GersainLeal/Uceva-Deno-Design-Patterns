/**
 * Patrón Proxy - Actividad
 *
 * 1. Problema:
 * En una empresa, ciertos documentos confidenciales solo pueden ser accedidos por usuarios con rol de administrador. Se requiere un mecanismo para controlar el acceso a estos documentos.
 *
 * 2. ¿Por qué Proxy es adecuado?
 * El patrón Proxy permite controlar el acceso a un objeto, verificando permisos antes de permitir la operación.
 *
 * 3. Implementación funcional:
 */

interface Document {
  display(user: User): void;
}

class ConfidentialDocument implements Document {
  constructor(private content: string) {}
  display(user: User): void {
    console.log(`Contenido: ${this.content}`);
  }
}

class DocumentProxy implements Document {
  constructor(private doc: Document, private allowedRole: string) {}
  display(user: User): void {
    if (user.getRole() === this.allowedRole) {
      this.doc.display(user);
    } else {
      console.log(`Acceso denegado para ${user.getName()}`);
    }
  }
}

class User {
  constructor(private name: string, private role: string) {}
  getName() { return this.name; }
  getRole() { return this.role; }
}

// 4. Ejemplo de uso y documentación:
const doc = new ConfidentialDocument('Datos secretos de la empresa');
const proxy = new DocumentProxy(doc, 'admin');

const user1 = new User('Juan', 'user');
const user2 = new User('Ana', 'admin');

proxy.display(user1); // Acceso denegado
proxy.display(user2); // Muestra el contenido

/**
 * Documentación:
 * - El problema es el control de acceso a información sensible.
 * - Proxy permite verificar permisos antes de mostrar el documento.
 * - El código muestra cómo solo los administradores pueden ver el contenido.
 */
