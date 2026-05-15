/**
 * Patrón Builder - Actividad
 * 
 * 1. Problema:
 * Supón que tienes una aplicación para crear diferentes tipos de hamburguesas personalizadas en un restaurante de comida rápida. Cada hamburguesa puede tener diferentes ingredientes (pan, carne, queso, vegetales, salsas, etc.) y el proceso de construcción puede variar según el pedido del cliente.
 * 
 * 2. ¿Por qué Builder es adecuado?
 * El patrón Builder permite construir objetos complejos paso a paso y con diferentes combinaciones de ingredientes, sin necesidad de crear múltiples constructores o clases hijas para cada tipo de hamburguesa. Así, el proceso de construcción es flexible y escalable.
 * 
 * 3. Implementación funcional:
 */

// Clase producto: Hamburguesa
class Burger {
  private ingredients: string[] = [];

  addIngredient(ingredient: string): void {
    this.ingredients.push(ingredient);
  }

  show(): void {
    console.log('Hamburguesa con: ' + this.ingredients.join(', '));
  }
}

// Builder para construir hamburguesas
class BurgerBuilder {
  private burger: Burger;

  constructor() {
    this.burger = new Burger();
  }

  addBun(type: string): BurgerBuilder {
    this.burger.addIngredient(type + ' bun');
    return this;
  }

  addPatty(type: string): BurgerBuilder {
    this.burger.addIngredient(type + ' patty');
    return this;
  }

  addCheese(type: string): BurgerBuilder {
    this.burger.addIngredient(type + ' cheese');
    return this;
  }

  addVegetable(veg: string): BurgerBuilder {
    this.burger.addIngredient(veg);
    return this;
  }

  addSauce(sauce: string): BurgerBuilder {
    this.burger.addIngredient(sauce + ' sauce');
    return this;
  }
  
  addPan(tipo: string): BurgerBuilder {
    this.burger.addIngredient('pan de ' + tipo);
    return this;
  }
  
  addCarne(tipo: string): BurgerBuilder {
    this.burger.addIngredient('carne de ' + tipo);
    return this;
  }
  
  addQueso(tipo: string): BurgerBuilder {
    this.burger.addIngredient('queso ' + tipo);
    return this;
  }
  
  addVegetal(veg: string): BurgerBuilder {
    this.burger.addIngredient(veg);
    return this;
  }
  
  addSalsa(salsa: string): BurgerBuilder {
    this.burger.addIngredient('salsa ' + salsa);
    return this;
  }

  build(): Burger {
    return this.burger;
  }
}

// 4. Ejemplo de uso y documentación:
// Creamos una hamburguesa personalizada usando el Builder (ingredientes en español)
const burger = new BurgerBuilder()
  .addPan('sésamo')
  .addCarne('res')
  .addQueso('cheddar')
  .addVegetal('lechuga')
  .addVegetal('tomate')
  .addSalsa('BBQ')
  .build();

burger.show(); // Hamburguesa con: pan de sésamo, carne de res, queso cheddar, lechuga, tomate, salsa BBQ

/**
 * Documentación:
 * - El problema es la personalización flexible de hamburguesas.
 * - El patrón Builder permite construir paso a paso y con diferentes combinaciones.
 * - El código muestra cómo crear una hamburguesa personalizada y fácilmente extensible.
 */
