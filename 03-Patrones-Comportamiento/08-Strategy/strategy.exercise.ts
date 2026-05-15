/**
 * Patrón: Strategy (Ejercicio - archivo de entrega del alumno)
 * Integrantes: [Tu Nombre], [Tu Pareja]
 *
 * Problema real:
 *  Una plataforma de comercio electrónico necesita calcular el costo de envío
 *  de un pedido usando diferentes políticas (estándar, exprés, gratis si
 *  supera cierto monto). Queremos intercambiar la política de cálculo en
 *  tiempo de ejecución sin acoplar la lógica del pedido a las fórmulas.
 *
 * Justificación (por qué Strategy):
 *  Strategy permite encapsular algoritmos (políticas de envío) en clases
 *  separadas y usarlas desde un contexto (`ShippingCalculator`). Así se pueden
 *  añadir o cambiar estrategias sin modificar el cliente.
 *
 * Qué incluye este archivo:
 *  - Interfaz `ShippingStrategy` y estrategias concretas.
 *  - `Order` y `ShippingCalculator` que usan una estrategia.
 *  - `main()` con ejemplos de uso y cambio de estrategia en tiempo de ejecución.
 */

import { COLORS } from '../../helpers/colors.ts';

// Strategy: interfaz común para todas las políticas de envío
interface ShippingStrategy {
  calculate(orderAmount: number, weightKg: number): number;
}

// Estrategias concretas
class StandardShipping implements ShippingStrategy {
  calculate(orderAmount: number, weightKg: number): number {
    // tarifa base + coste por kg
    return 5 + weightKg * 1.5;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(orderAmount: number, weightKg: number): number {
    // más cara, coste por kg mayor
    return 15 + weightKg * 3;
  }
}

class FreeOverAmountShipping implements ShippingStrategy {
  constructor(private threshold: number) {}

  calculate(orderAmount: number, weightKg: number): number {
    if (orderAmount >= this.threshold) return 0;
    return 7 + weightKg * 2;
  }
}

// Contexto: orden y calculadora de envío
class Order {
  constructor(public amount: number, public weightKg: number) {}
}

class ShippingCalculator {
  constructor(private strategy: ShippingStrategy) {}

  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(order: Order): number {
    return this.strategy.calculate(order.amount, order.weightKg);
  }
}

// Demo
function main() {
  const order = new Order(120, 2.5);

  const standard = new StandardShipping();
  const express = new ExpressShipping();
  const freeOver100 = new FreeOverAmountShipping(100);

  const calculator = new ShippingCalculator(standard);

  console.log('%c--- Cálculo con estrategia Standard ---', COLORS.green);
  console.log(`Coste envío: %c${calculator.calculate(order)} €`, COLORS.blue);

  console.log('%c--- Cambiando a Express ---', COLORS.yellow);
  calculator.setStrategy(express);
  console.log(`Coste envío: %c${calculator.calculate(order)} €`, COLORS.blue);

  console.log('%c--- Cambiando a FreeOverAmount (umbral 100) ---', COLORS.yellow);
  calculator.setStrategy(freeOver100);
  console.log(`Coste envío: %c${calculator.calculate(order)} €`, COLORS.blue);

  console.log('%cConclusión: Strategy permite cambiar la política de envío sin alterar la lógica del cliente.', COLORS.green);
}

main();
