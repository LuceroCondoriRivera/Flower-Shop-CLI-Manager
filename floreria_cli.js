const readline = require("readline");

/**
 * Servicio de gestión de florería
 */
class FloreriaService {
  constructor() {
    this.flores = [];
  }

  cargarDesdeString(entrada) {
    this.flores = entrada
      .split(",")
      .map(f => f.trim())
      .filter(f => f.length > 0);
  }

  obtenerFlores() {
    return [...this.flores];
  }

  agregarFlor(flor) {
    this.flores.push(flor.trim());
  }

  editarFlor(actual, nueva) {
    const index = this.flores.indexOf(actual);
    if (index === -1) {
      console.log("Flor no encontrada");
      return;
    }
    this.flores[index] = nueva.trim();
  }

  eliminarFlor(flor) {
    const index = this.flores.indexOf(flor);
    if (index === -1) {
      console.log("Flor no encontrada");
      return;
    }
    this.flores.splice(index, 1);
  }

}

// =====================
// MENU
// =====================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const floreria = new FloreriaService();

function mostrarMenu() {
  console.log(`
 === MENÚ FLORERÍA ===
1. Cargar flores iniciales
2. Mostrar flores
3. Agregar flor
4. Modificar flor
5. Eliminar flor
0. Salir
`);
}

function iniciar() {
  mostrarMenu();
  rl.question("Selecciona una opción: ", opcion => {
    switch (opcion) {
      case "1":
        rl.question("Ingresa flores separadas por coma: ", input => {
          floreria.cargarDesdeString(input);
          console.log("Flores cargadas");
          iniciar();
        });
        break;

      case "2":
        console.log("Flores:", floreria.obtenerFlores());
        iniciar();
        break;

      case "3":
        rl.question("Nueva flor: ", flor => {
          floreria.agregarFlor(flor);
          console.log(" Flor agregada");
          iniciar();
        });
        break;

      case "4":
        rl.question("Flor a modificar: ", actual => {
          rl.question("Nuevo nombre: ", nueva => {
            floreria.editarFlor(actual, nueva);
            console.log("Flor modificada");
            iniciar();
          });
        });
        break;

      case "5":
        rl.question("Flor a eliminar: ", flor => {
          floreria.eliminarFlor(flor);
          console.log(" Flor eliminada");
          iniciar();
        });
        break;

      case "0":
        console.log(" Saliendo...");
        rl.close();
        break;

      default:
        console.log(" Opción inválida");
        iniciar();
    }
  });
}

// Iniciar programa
iniciar();