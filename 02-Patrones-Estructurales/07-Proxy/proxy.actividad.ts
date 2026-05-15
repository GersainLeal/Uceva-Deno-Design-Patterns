/**
 * Patrón Proxy - Actividad
 *
 * 1. Problema:
 * En una plataforma de descargas, solo los usuarios premium pueden descargar archivos grandes (>100MB). Los usuarios normales solo pueden descargar archivos pequeños.
 *
 * 2. ¿Por qué Proxy es adecuado?
 * El patrón Proxy permite controlar el acceso a la descarga según el tipo de usuario y el tamaño del archivo.
 *
 * 3. Implementación funcional:
 */

interface Downloader {
  download(user: User, file: File): void;
}

class File {
  constructor(public name: string, public sizeMB: number) {}
}

class RealDownloader implements Downloader {
  download(user: User, file: File): void {
    console.log(`${user.getName()} está descargando: ${file.name} (${file.sizeMB}MB)`);
  }
}

class DownloadProxy implements Downloader {
  constructor(private realDownloader: Downloader) {}
  download(user: User, file: File): void {
    if (file.sizeMB > 100 && !user.isPremium()) {
      console.log(`Acceso denegado. ${user.getName()} no es premium y no puede descargar archivos grandes.`);
      return;
    }
    this.realDownloader.download(user, file);
  }
}

class User {
  constructor(private name: string, private premium: boolean) {}
  getName() { return this.name; }
  isPremium() { return this.premium; }
}

// 4. Ejemplo de uso y documentación:
const downloader = new DownloadProxy(new RealDownloader());
const user1 = new User('Juan', false); // usuario normal
const user2 = new User('Ana', true);   // usuario premium

const fileSmall = new File('manual.pdf', 10);
const fileBig = new File('video.mp4', 500);

downloader.download(user1, fileSmall); // Permitido
downloader.download(user1, fileBig);   // Denegado
downloader.download(user2, fileBig);   // Permitido

/**
 * Documentación:
 * - El problema es el control de acceso a descargas grandes según el tipo de usuario.
 * - Proxy permite verificar el tamaño y el tipo de usuario antes de permitir la descarga.
 * - El código muestra cómo solo los usuarios premium pueden descargar archivos grandes.
 */

