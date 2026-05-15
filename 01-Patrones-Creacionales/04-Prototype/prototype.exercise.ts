/**
 * Patrón: Prototype (Ejercicio - archivo de entrega del alumno)
 * 
 *
 * Problema real:
 *  En un videojuego queremos crear enemigos basados en plantillas (arquetipos).
 *  Cada enemigo tiene estadísticas, habilidades y un inventario inicial. Crear
 *  cada enemigo mediante un constructor complejo o cargando todos los valores
 *  desde cero puede ser costoso y verboso. Necesitamos duplicar rápidamente
 *  plantillas para generar múltiples instancias con pequeñas variaciones.
 *
 * Justificación (por qué Prototype):
 *  Prototype permite clonar objetos existentes (arquetipos) para crear nuevas
 *  instancias sin acoplar el código al constructor concreto. Facilita crear
 *  copias rápidas y aplicar cambios sobre la copia, manteniendo la plantilla
 *  original intacta.
 *
 * Qué incluye este archivo:
 *  - Interfaz `CharacterPrototype` y clase `GameCharacter` con `clone()`.
 *  - Ejemplo de clonación profunda para evitar aliasing en el inventario.
 *  - `main()` que clona varias instancias y muestra las diferencias.
 *
 * Conclusión esperada: Demostrar cómo clonar arquetipos ahorra trabajo y mantiene
 * la plantilla original sin cambios.
 */

import { COLORS } from '../../helpers/colors.ts';

interface CharacterPrototype {
  clone(): CharacterPrototype;
}

class GameCharacter implements CharacterPrototype {
  constructor(
    public name: string,
    public hp: number,
    public attack: number,
    public inventory: string[],
  ) {}

  // Implementación de clone que realiza copia profunda del inventario
  clone(): GameCharacter {
    const copiedInventory = [...this.inventory];
    return new GameCharacter(this.name, this.hp, this.attack, copiedInventory);
  }

  describe() {
    console.log(`%c${this.name} (HP:${this.hp} ATK:${this.attack}) Inventario: [${this.inventory.join(', ')}]`, COLORS.blue);
  }
}

// Demo: crear arquetipos y clonar
function main() {
  // Arquetipos (plantillas)
  const goblinTemplate = new GameCharacter('Goblin', 30, 5, ['Daga', 'Monedas']);
  const orcTemplate = new GameCharacter('Orc Guerrero', 80, 12, ['Hacha', 'Armadura ligera']);

  // Clonamos a partir de las plantillas
  const goblin1 = goblinTemplate.clone();
  goblin1.name = 'Goblin A';
  goblin1.inventory.push('Poción pequeña');

  const goblin2 = goblinTemplate.clone();
  goblin2.name = 'Goblin B';
  goblin2.hp = 25; // versión debilitada

  const orc1 = orcTemplate.clone();
  orc1.name = 'Orc Elite';
  orc1.attack = 18;

  console.log('%c--- Plantillas originales ---', COLORS.purple);
  goblinTemplate.describe();
  orcTemplate.describe();

  console.log('%c--- Instancias clonadas ---', COLORS.green);
  goblin1.describe();
  goblin2.describe();
  orc1.describe();

  console.log('%c--- Comprobación de independencia (inventario) ---', COLORS.yellow);
  console.log('Inventario template Goblin:', goblinTemplate.inventory);
  console.log('Inventario goblin1:', goblin1.inventory);

  console.log('%cConclusión: las copias se crean rápidamente desde la plantilla y mantienen independencia de datos.', COLORS.green);
}

main();
