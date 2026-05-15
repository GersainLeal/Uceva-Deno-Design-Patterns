/**
 * Patrón Mediator - Actividad
 *
 * 1. Problema:
 * En un sistema de chat grupal, los usuarios pueden enviar mensajes públicos o privados. El mediador (el chat) decide si el mensaje es público (para todos) o privado (solo para el destinatario).
 *
 * 2. ¿Por qué Mediator es adecuado?
 * El patrón Mediator centraliza la lógica de envío de mensajes y reduce dependencias directas entre usuarios.
 *
 * 3. Implementación funcional:
 */

class ChatMediator {
  private users: User[] = [];

  register(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string, recipient?: User) {
    if (recipient) {
      // Mensaje privado
      recipient.receiveMessage(`Privado de ${sender.getName()}: ${message}`);
    } else {
      // Mensaje público
      for (const user of this.users) {
        if (user !== sender) {
          user.receiveMessage(`Público de ${sender.getName()}: ${message}`);
        }
      }
    }
  }
}

class User {
  constructor(private name: string, private chat: ChatMediator) {
    chat.register(this);
  }

  getName() { return this.name; }

  sendPublic(message: string) {
    this.chat.sendMessage(this, message);
  }

  sendPrivate(message: string, recipient: User) {
    this.chat.sendMessage(this, message, recipient);
  }

  receiveMessage(message: string) {
    console.log(`${this.name} recibe: ${message}`);
  }
}

// 4. Ejemplo de uso y documentación:
const chat = new ChatMediator();
const alice = new User('Alice', chat);
const bob = new User('Bob', chat);
const carol = new User('Carol', chat);

alice.sendPublic('¡Hola a todos!');
bob.sendPrivate('Hola Alice, ¿cómo estás?', alice);
carol.sendPublic('¡Bienvenidos al chat!');

/**
 * Documentación:
 * - El problema es la gestión de mensajes públicos y privados en un chat grupal.
 * - Mediator centraliza la lógica de envío y reduce dependencias entre usuarios.
 * - El código muestra cómo el mediador decide el tipo de mensaje y su destinatario.
 */

