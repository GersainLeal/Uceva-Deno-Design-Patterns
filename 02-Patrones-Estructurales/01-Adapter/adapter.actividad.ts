/**
 * Patrón Adapter - Actividad
 *
 * 1. Problema:
 * Supón que desarrollas una aplicación de pagos en línea y necesitas integrar diferentes servicios de pago (PayPal, Stripe y MercadoPago), cada uno con su propia interfaz. Tu sistema requiere una interfaz unificada para procesar pagos sin importar el proveedor.
 *
 * 2. ¿Por qué Adapter es adecuado?
 * El patrón Adapter permite que clases con interfaces incompatibles trabajen juntas. Así, puedes integrar servicios de terceros sin modificar su código, adaptando sus métodos a una interfaz común.
 *
 * 3. Implementación funcional:
 */

// Interfaz objetivo
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// Servicios de pago externos
class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Pagando $${amount} con PayPal`);
  }
}
class StripeService {
  makeCharge(amount: number): void {
    console.log(`Pagando $${amount} con Stripe`);
  }
}
class MercadoPagoService {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con MercadoPago`);
  }
}

// Adaptadores
class PayPalAdapter implements PaymentProcessor {
  private service = new PayPalService();
  processPayment(amount: number): void {
    this.service.sendPayment(amount);
  }
}
class StripeAdapter implements PaymentProcessor {
  private service = new StripeService();
  processPayment(amount: number): void {
    this.service.makeCharge(amount);
  }
}
class MercadoPagoAdapter implements PaymentProcessor {
  private service = new MercadoPagoService();
  processPayment(amount: number): void {
    this.service.pay(amount);
  }
}

// 4. Ejemplo de uso y documentación:
const payments: PaymentProcessor[] = [
  new PayPalAdapter(),
  new StripeAdapter(),
  new MercadoPagoAdapter(),
];

for (const processor of payments) {
  processor.processPayment(100);
}

/**
 * Documentación:
 * - El problema es la integración de servicios de pago con interfaces distintas.
 * - Adapter permite unificar la interfaz y desacoplar el sistema de los servicios externos.
 * - El código muestra cómo procesar pagos de forma uniforme usando adaptadores.
 */
