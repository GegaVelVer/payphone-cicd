const fs = require("fs");
const path = require("path");

// Carpeta principal del proyecto
const raizProyecto = path.join(__dirname, "..");

// Carpeta donde se generará la aplicación
const carpetaDist = path.join(raizProyecto, "dist");

// Archivos que se copiarán al build
const archivos = [
  "index.html",
  "confirmacion.html"
];

// Obtener el token desde una variable de entorno
const payphoneToken = process.env.PAYPHONE_TOKEN;

// Verificar que exista un token
if (!payphoneToken) {
  console.error(
    "❌ ERROR: No se encontró la variable PAYPHONE_TOKEN."
  );

  console.error(
    "Configura el token antes de ejecutar el proceso de build."
  );

  process.exit(1);
}

console.log("\n========================================");
console.log(" INICIANDO BUILD DEL PROYECTO PAYPHONE");
console.log("========================================\n");

// Eliminar la carpeta dist anterior
if (fs.existsSync(carpetaDist)) {
  fs.rmSync(
    carpetaDist,
    {
      recursive: true,
      force: true
    }
  );

  console.log(
    "✅ Se eliminó el build anterior"
  );
}

// Crear una nueva carpeta dist
fs.mkdirSync(
  carpetaDist,
  {
    recursive: true
  }
);

console.log(
  "✅ Se creó la carpeta dist"
);

// Procesar cada archivo
archivos.forEach((nombreArchivo) => {

  const archivoOrigen = path.join(
    raizProyecto,
    nombreArchivo
  );

  const archivoDestino = path.join(
    carpetaDist,
    nombreArchivo
  );

  // Verificar que el archivo exista
  if (!fs.existsSync(archivoOrigen)) {

    console.error(
      `❌ No existe el archivo ${nombreArchivo}`
    );

    process.exit(1);
  }

  // Leer el contenido
  let contenido = fs.readFileSync(
    archivoOrigen,
    "utf8"
  );

  // Reemplazar el marcador por el token
  contenido = contenido.replaceAll(
    "__PAYPHONE_TOKEN__",
    payphoneToken
  );

  // Guardar el archivo en dist
  fs.writeFileSync(
    archivoDestino,
    contenido,
    "utf8"
  );

  console.log(
    `✅ ${nombreArchivo} procesado correctamente`
  );
});

// Verificar que el marcador haya sido reemplazado
archivos.forEach((nombreArchivo) => {

  const archivoGenerado = path.join(
    carpetaDist,
    nombreArchivo
  );

  const contenido = fs.readFileSync(
    archivoGenerado,
    "utf8"
  );

  if (
    contenido.includes(
      "__PAYPHONE_TOKEN__"
    )
  ) {

    console.error(
      `❌ El token no fue reemplazado en ${nombreArchivo}`
    );

    process.exit(1);
  }
});

console.log("\n========================================");
console.log(" 🎉 BUILD GENERADO CORRECTAMENTE");
console.log("========================================");

console.log(
  "\nLos archivos están disponibles en la carpeta dist.\n"
);