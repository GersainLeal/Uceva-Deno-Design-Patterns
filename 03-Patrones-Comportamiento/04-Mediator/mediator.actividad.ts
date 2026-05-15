/**
 * Patrón Mediator - Actividad
 *
 * 1. Problema:
 * En una torre de control de aeropuerto, los aviones no deben comunicarse directamente entre sí para evitar confusiones y colisiones. Toda comunicación debe pasar por la torre de control, que coordina los mensajes y permisos.
 *
 * 2. ¿Por qué Mediator es adecuado?
 * El patrón Mediator centraliza la comunicación entre objetos (aviones), reduciendo dependencias y simplificando la coordinación.
 *
 * 3. Implementación funcional:
 */

class ControlTower {
  private airplanes: Airplane[] = [];

  register(airplane: Airplane) {
    this.airplanes.push(airplane);
  }

  notify(sender: Airplane, message: string) {
    for (const airplane of this.airplanes) {
      if (airplane !== sender) {
        airplane.receive(message, sender);
      }
    }
  }
}

class Airplane {
  constructor(private id: string, private tower: ControlTower) {
    tower.register(this);
  }

  requestLanding() {
    console.log(`${this.id} solicita aterrizaje.`);
    this.tower.notify(this, `${this.id} va a aterrizar.`);
  }

  requestTakeoff() {
    console.log(`${this.id} solicita despegue.`);
    this.tower.notify(this, `${this.id} va a despegar.`);
  }

  receive(message: string, sender: Airplane) {
    console.log(`${this.id} recibe de ${sender.id}: ${message}`);
  }
}

// 4. Ejemplo de uso y documentación:
const tower = new ControlTower();
const a1 = new Airplane('Vuelo 1', tower);
const a2 = new Airplane('Vuelo 2', tower);
const a3 = new Airplane('Vuelo 3', tower);

a1.requestLanding();
a2.requestTakeoff();
a3.requestLanding();

/**
 * Documentación:
 * - El problema es la coordinación segura entre aviones.
 * - Mediator centraliza la comunicación y reduce dependencias.
 * - El código muestra cómo la torre de control gestiona los mensajes entre aviones.
 */
