/**
 * Patrón: Observer (Ejercicio - archivo de entrega del alumno)
 * Integrantes: [Tu Nombre], [Tu Pareja]
 *
 * Problema real:
 *  Un sitio de noticias permite a los usuarios suscribirse a distintas
 *  categorías (politica, deportes, tecnología). Cuando se publica una
 *  noticia en una categoría, todos los usuarios suscritos deben recibir una
 *  notificación. El sistema debe permitir suscribir, desuscribir y notificar
 *  con bajo acoplamiento entre el editor y los suscriptores.
 *
 * Justificación (por qué Observer):
 *  Observer permite que el `Publisher` (sujeto) notifique a múltiples
 *  `Subscribers` (observadores) sin conocer sus implementaciones concretas.
 *  Esto favorece extensibilidad (añadir nuevos tipos de consumidor) y
 *  desacopla la lógica de publicación de la lógica de entrega de notificaciones.
 *
 * Qué incluye este archivo:
 *  - Interfaz `Subscriber` y clase `Publisher` (sujeto).
 *  - Observadores concretos (`EmailSubscriber`, `MobileSubscriber`).
 *  - Demo con suscripción, publicación y desuscripción.
 */

import { COLORS } from '../../helpers/colors.ts';

// Interfaz Observer
interface Subscriber {
  id: string;
  update(topic: string, message: string): void;
}

// Sujeto (Publisher)
class Publisher {
  private subscribers: Map<string, Subscriber[]> = new Map();

  subscribe(topic: string, subscriber: Subscriber) {
    if (!this.subscribers.has(topic)) this.subscribers.set(topic, []);
    this.subscribers.get(topic)!.push(subscriber);
    console.log(`%c[Publisher] ${subscriber.id} suscrito a ${topic}`, COLORS.green);
  }

  unsubscribe(topic: string, subscriberId: string) {
    const list = this.subscribers.get(topic);
    if (!list) return;
    this.subscribers.set(topic, list.filter(s => s.id !== subscriberId));
    console.log(`%c[Publisher] ${subscriberId} desuscrito de ${topic}`, COLORS.red);
  }

  publish(topic: string, message: string) {
    console.log(`%c[Publisher] Publicando en ${topic}: ${message}`, COLORS.purple);
    const list = this.subscribers.get(topic) ?? [];
    list.forEach(sub => sub.update(topic, message));
  }
}

// Observadores concretos
class EmailSubscriber implements Subscriber {
  constructor(public id: string, private email: string) {}
  update(topic: string, message: string) {
    console.log(`%c[Email->${this.email}] (${this.id}) Recibido en ${topic}: ${message}`, COLORS.blue);
  }
}

class MobileSubscriber implements Subscriber {
  constructor(public id: string, private phone: string) {}
  update(topic: string, message: string) {
    console.log(`%c[Push->${this.phone}] (${this.id}) Recibido en ${topic}: ${message}`, COLORS.cyan);
  }
}

// Demo
function main() {
  const publisher = new Publisher();

  const alice = new EmailSubscriber('alice', 'alice@example.com');
  const bob = new MobileSubscriber('bob', '+123456789');
  const carla = new EmailSubscriber('carla', 'carla@example.com');

  // Suscripciones
  publisher.subscribe('tecnologia', alice);
  publisher.subscribe('deportes', bob);
  publisher.subscribe('tecnologia', carla);
  publisher.subscribe('deportes', carla);

  // Publicaciones
  publisher.publish('tecnologia', 'Nueva versión del framework lanzada');
  publisher.publish('deportes', 'Resultado del partido: 3-1');

  // Desuscribir y volver a publicar
  publisher.unsubscribe('deportes', 'carla');
  publisher.publish('deportes', 'Convocatoria para la selección nacional');

  console.log('%cConclusión: Observer permite notificar a múltiples suscriptores sin acoplar el publisher a implementaciones concretas.', COLORS.green);
}

main();
