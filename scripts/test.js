const fs = require("fs");
const path = require("path");

// Ubicación de los archivos principales
const indexPath = path.join(__dirname, "..", "index.html");
const confirmacionPath = path.join(
  __dirname,
  "..",
  "confirmacion.html"
);

// Función para comprobar cada prueba
function verificar(condicion, mensaje) {
  if (!condicion) {
    console.error("❌ PRUEBA FALLIDA: " + mensaje);
    process.exit(1);
  }

  console.log("✅ " + mensaje);
}

console.log("\n========================================");
console.log(" PRUEBAS DEL PROYECTO PAYPHONE");
console.log("========================================\n");

// Prueba 1: verificar que exista index.html
verificar(
  fs.existsSync(indexPath),
  "El archivo index.html existe"
);

// Prueba 2: verificar que exista confirmacion.html
verificar(
  fs.existsSync(confirmacionPath),
  "El archivo confirmacion.html existe"
);

// Leer los archivos
const indexHtml = fs.readFileSync(indexPath, "utf8");

const confirmacionHtml = fs.readFileSync(
  confirmacionPath,
  "utf8"
);

// Prueba 3: verificar la Cajita de Pagos
verificar(
  indexHtml.includes("PPaymentButtonBox"),
  "La Cajita de Pagos de Payphone está configurada"
);

// Prueba 4: verificar el monto de $4.00
verificar(
  /amount\s*:\s*400/.test(indexHtml),
  "El monto de la transacción está configurado en 400 centavos"
);

// Prueba 5: verificar el marcador del token en index
verificar(
  indexHtml.includes("__PAYPHONE_TOKEN__"),
  "index.html utiliza el marcador seguro del token"
);

// Prueba 6: verificar el marcador en confirmación
verificar(
  confirmacionHtml.includes("__PAYPHONE_TOKEN__"),
  "confirmacion.html utiliza el marcador seguro del token"
);

// Prueba 7: verificar la función de confirmación
verificar(
  confirmacionHtml.includes("/api/confirm"),
  "La función Confirm del API de Payphone está configurada"
);

// Prueba 8: verificar el identificador de transacción
verificar(
  indexHtml.includes("clientTransactionId"),
  "Se genera un identificador para cada transacción"
);

// Prueba 9: verificar que el token anterior no esté guardado
verificar(
  !indexHtml.includes("8DW3"),
  "index.html no contiene el token original"
);

// Prueba 10: verificar que confirmación no tenga el token anterior
verificar(
  !confirmacionHtml.includes("8DW3"),
  "confirmacion.html no contiene el token original"
);

console.log("\n========================================");
console.log(" 🎉 TODAS LAS PRUEBAS FUERON APROBADAS");
console.log("========================================\n");