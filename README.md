# Taller Patrones de diseño

---

# Integrantes

## Juan Manuel Martinez Jojoa - 230222002
## Gersain Leal Muñoz - 230222024

---

# Lista de patrones utilizados

---

## Juan Manuel

### Builder
- **Problema:** Personalización flexible de hamburguesas en un restaurante.
- **Por qué Builder:** Permite construir hamburguesas con diferentes ingredientes paso a paso, sin múltiples constructores.
- **Archivo:** 01-Patrones-Creacionales/01-Builder/builder.actividad.ts


### Adapter
- **Problema:** Unificar el registro de logs tanto en consola local como usando una librería externa, ambas con interfaces distintas.
- **Por qué Adapter:** Permite usar ambos sistemas de logueo con la misma interfaz, desacoplando la lógica de logueo del resto de la aplicación.
- **Archivo:** 02-Patrones-Estructurales/01-Adapter/adapter.actividad.ts

### Singleton
- **Problema:** Gestión centralizada de la configuración global de una aplicación.
- **Por qué Singleton:** Garantiza una única instancia y acceso global a la configuración.
- **Archivo:** 01-Patrones-Creacionales/06-Singleton/singleton.actividad.ts


### Mediator
- **Problema:** Gestión de mensajes públicos y privados en un chat grupal.
- **Por qué Mediator:** Centraliza la lógica de envío y reduce dependencias entre usuarios.
- **Archivo:** 03-Patrones-Comportamiento/04-Mediator/mediator.actividad.ts


### Proxy
- **Problema:** Controlar el acceso a descargas grandes según el tipo de usuario (premium o normal).
- **Por qué Proxy:** Permite verificar el tamaño y el tipo de usuario antes de permitir la descarga.
- **Archivo:** 02-Patrones-Estructurales/07-Proxy/proxy.actividad.ts

---

## Gersain

### Flyweight
- **Problema:** Representar documentos/objetos con muchas instancias similares (p. ej. glifos/caracteres en un editor) sin consumir mucha memoria.
- **Por qué Flyweight:** Permite compartir el estado intrínseco (la forma del glifo) entre muchas instancias, manteniendo el estado extrínseco (posición, color) fuera del flyweight y reduciendo el uso de memoria.
- **Archivo:** 02-Patrones-Estructurales/06-Flyweight/flyweight.exercise.ts

### Observer
- **Problema:** Notificar a múltiples suscriptores cuando se publica contenido en categorías distintas (p. ej. sistema de noticias por temas) sin acoplar el emisor a los consumidores.
- **Por qué Observer:** Desacopla al publicador de los suscriptores y permite añadir o quitar observadores dinámicamente, facilitando extensibilidad y mantenimiento.
- **Archivo:** 03-Patrones-Comportamiento/06-Observer/observer.exercise.ts

### Prototype
- **Problema:** Generar rápidamente múltiples enemigos o entidades en un videojuego a partir de plantillas (arquetipos) con pequeñas variaciones.
- **Por qué Prototype:** Permite clonar arquetipos sin depender de constructores complejos, creando copias independientes y eficientes (copia profunda cuando hace falta).
- **Archivo:** 01-Patrones-Creacionales/04-Prototype/prototype.exercise.ts

### Memento
- **Problema:** Implementar undo/redo en un editor de texto (guardar y restaurar snapshots del documento) sin exponer la representación interna del documento.
- **Por qué Memento:** Captura y restaura el estado interno del originador de forma encapsulada, ideal para historial de cambios (undo/redo).
- **Archivo:** 03-Patrones-Comportamiento/05-Memento/memento.exercise.ts

### Strategy
- **Problema:** Calcular el costo de envío en una tienda online usando diferentes políticas (estándar, exprés, gratis sobre cierto monto) intercambiables en tiempo de ejecución.
- **Por qué Strategy:** Encapsula algoritmos de cálculo en estrategias separadas, permitiendo cambiar la política sin modificar el cliente (orden/calculadora).
- **Archivo:** 03-Patrones-Comportamiento/08-Strategy/strategy.exercise.ts
