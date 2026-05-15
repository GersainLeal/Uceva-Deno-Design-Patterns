/**
 * Patrón: Flyweight 
 * 
 *
 * Problema real (nuevo):
 *  Un editor de texto debe representar documentos muy largos. Cada carácter
 *  (letra) se dibuja usando un glifo (glyph) que contiene la forma visual.
 *  Si creamos un objeto glifo por cada carácter del documento, el consumo
 *  de memoria crece rápidamente. En cambio, muchos caracteres comparten la
 *  misma forma (por ejemplo, la letra 'a' en una fuente determinada).
 *
 * Justificación (por qué Flyweight):
 *  Flyweight permite compartir instancias de `Glyph` (estado intrínseco: forma
 *  del carácter, font) entre múltiples `Character` ubicados en el documento.
 *  El estado extrínseco (posición, color) se mantiene en el objeto contexto.
 *  Esto reduce el número de objetos en memoria y mejora el rendimiento al
 *  renderizar documentos grandes.
 *
 * Qué incluye este archivo:
 *  - Implementación del Flyweight (`Glyph` + `GlyphFactory`).
 *  - Objetos `Character` que contienen estado extrínseco (posición, color).
 *  - `main()` que genera un documento simulado con muchos caracteres y muestra
 *    cuántos glifos se crearon vs cuántos caracteres existen (demostración).
 *
 * Conclusión esperada: El número de glifos creados coincide con la cantidad de
 *  caracteres únicos (por fuente), no con la longitud total del documento.
 */

import { COLORS } from '../../helpers/colors.ts';

// Flyweight: estado intrínseco compartido (glifo/glyph)
class Glyph {
  constructor(private readonly char: string, private readonly font: string) {}

  render(x: number, y: number, color = 'black') {
    console.log(`%c[Glyph:'${this.char}'@${this.font}] render en (${x}, ${y}) color ${color}`, COLORS.cyan);
  }
}

// Factory que reutiliza Glyphs (pool de flyweights)
class GlyphFactory {
  private pool: Record<string, Glyph> = {};

  getGlyph(char: string, font = 'Default'): Glyph {
    const key = `${char}:${font}`;
    if (!this.pool[key]) {
      console.log(`%cCreando glyph: ${key}`, COLORS.yellow);
      this.pool[key] = new Glyph(char, font);
    }
    return this.pool[key];
  }

  count(): number {
    return Object.keys(this.pool).length;
  }
}

// Contexto: chaque carácter en el documento mantiene estado extrínseco
class Character {
  constructor(private x: number, private y: number, private glyph: Glyph, private color = 'black') {}

  draw() {
    this.glyph.render(this.x, this.y, this.color);
  }
}

// Demo: generar documento simulado y mostrar ahorro de objetos
function main() {
  const factory = new GlyphFactory();

  const textSample = 'El rápido zorro marrón salta sobre el perro perezoso.';
  const chars: Character[] = [];

  // Simulamos un documento grande repitiendo la muestra varias veces
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < textSample.length; j++) {
      const ch = textSample[j];
      const glyph = factory.getGlyph(ch, 'Monospace');
      const x = j * 7; // posición X simplificada
      const y = i * 14; // posición Y por línea
      chars.push(new Character(x, y, glyph, j % 2 === 0 ? 'black' : 'gray'));
    }
  }

  console.log('%c--- Render de 10 caracteres de ejemplo ---', COLORS.green);
  chars.slice(0, 10).forEach((c) => c.draw());

  console.log('%c--- Estadísticas ---', COLORS.purple);
  console.log(`Total de caracteres (documento): %c${chars.length}`, COLORS.blue);
  console.log(`Total de glyphs creados (caracteres únicos por fuente): %c${factory.count()}`, COLORS.blue);

  console.log('%cConclusión: usando Flyweight el número de glyphs es mucho menor que el número total de caracteres.', COLORS.green);
}

main();
