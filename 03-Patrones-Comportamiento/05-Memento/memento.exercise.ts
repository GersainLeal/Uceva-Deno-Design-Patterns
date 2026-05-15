/**
 * Patrón: Memento (Ejercicio - archivo de entrega del alumno)
 * Integrantes: [Tu Nombre], [Tu Pareja]
 *
 * Problema real:
 *  Implementar la funcionalidad de deshacer/rehacer (undo/redo) en un editor
 *  de texto simple. El editor debe permitir aplicar cambios al documento y
 *  poder volver a estados anteriores sin exponer la representación interna
 *  del documento a otras partes del sistema.
 *
 * Justificación (por qué Memento):
 *  Memento permite capturar snapshots del estado interno del documento (por
 *  ejemplo, su contenido y posición del cursor) y restaurarlos más tarde sin
 *  romper la encapsulación. Es ideal para implementar undo/redo en editores.
 *
 * Qué incluye este archivo:
 *  - `DocumentMemento`: objeto que encapsula un snapshot del documento.
 *  - `Document`: originador que puede guardar y restaurar su estado.
 *  - `History`: gestor de mementos que soporta undo y redo.
 *  - `main()` con una demo de cambios, undo y redo.
 */

import { COLORS } from '../../helpers/colors.ts';

class DocumentMemento {
  constructor(private readonly content: string, private readonly cursor: number) {}

  getContent(): string {
    return this.content;
  }

  getCursor(): number {
    return this.cursor;
  }
}

class Document {
  private content = '';
  private cursor = 0;

  insert(text: string) {
    const before = this.content.slice(0, this.cursor);
    const after = this.content.slice(this.cursor);
    this.content = before + text + after;
    this.cursor += text.length;
    console.log(`%cInserted: "${text}" -> content: "${this.content}"`, COLORS.blue);
  }

  delete(count: number) {
    const before = this.content.slice(0, Math.max(0, this.cursor - count));
    const after = this.content.slice(this.cursor);
    this.content = before + after;
    this.cursor = Math.max(0, this.cursor - count);
    console.log(`%cDeleted ${count} chars -> content: "${this.content}"`, COLORS.red);
  }

  moveCursor(pos: number) {
    this.cursor = Math.min(Math.max(0, pos), this.content.length);
    console.log(`%cCursor moved to ${this.cursor}`, COLORS.cyan);
  }

  save(): DocumentMemento {
    return new DocumentMemento(this.content, this.cursor);
  }

  restore(m: DocumentMemento) {
    this.content = m.getContent();
    this.cursor = m.getCursor();
    console.log(`%cState restored -> content: "${this.content}", cursor: ${this.cursor}`, COLORS.green);
  }

  show() {
    console.log(`%cDocument: "${this.content}" (cursor: ${this.cursor})`, COLORS.purple);
  }
}

class History {
  private undoStack: DocumentMemento[] = [];
  private redoStack: DocumentMemento[] = [];

  push(m: DocumentMemento) {
    this.undoStack.push(m);
    // limpiar redo al nuevo cambio
    this.redoStack = [];
  }

  undo(current: DocumentMemento | null): DocumentMemento | null {
    if (this.undoStack.length === 0) return null;
    const m = this.undoStack.pop()!;
    if (current) this.redoStack.push(current);
    return m;
  }

  redo(): DocumentMemento | null {
    if (this.redoStack.length === 0) return null;
    return this.redoStack.pop()!;
  }
}

function main() {
  const doc = new Document();
  const history = new History();

  // Estado inicial
  history.push(doc.save());

  // Operaciones del usuario
  doc.insert('Hola');
  history.push(doc.save());

  doc.insert(', mundo');
  history.push(doc.save());

  doc.moveCursor(5);
  doc.insert(' querido');
  history.push(doc.save());

  doc.show();

  // Undo 1
  console.log('%c--- Undo 1 ---', COLORS.yellow);
  const prev1 = history.undo(doc.save());
  if (prev1) doc.restore(prev1);
  doc.show();

  // Undo 2
  console.log('%c--- Undo 2 ---', COLORS.yellow);
  const prev2 = history.undo(doc.save());
  if (prev2) doc.restore(prev2);
  doc.show();

  // Redo
  console.log('%c--- Redo ---', COLORS.yellow);
  const next = history.redo();
  if (next) doc.restore(next);
  doc.show();

  console.log('%cConclusión: Memento permite capturar y restaurar el estado del documento para implementar undo/redo sin romper la encapsulación.', COLORS.green);
}

main();
