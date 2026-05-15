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
