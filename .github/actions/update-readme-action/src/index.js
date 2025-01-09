const fs = require("fs");
const core = require("@actions/core");

try {
  // Obtener el resultado de las pruebas de Cypress desde los inputs
  const outcome = core.getInput("outcome");
  const readmePath = "README.md";

  // Configurar los badges dependiendo del resultado de las pruebas
  const badge =
    outcome === "success"
      ? "![Tests Passed](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
      : "![Tests Failed](https://img.shields.io/badge/test-failure-red)";

  // Leer el contenido del README.md
  let readmeContent = fs.readFileSync(readmePath, "utf8");

  // Definir la sección donde se va a insertar o actualizar el badge
  const badgeSection = "<!---Start place for the badge -->";
  const updatedContent = `${badgeSection}\n${badge}\n<!---End place for the badge -->`;

  // Verificar si el README.md contiene el bloque del badge
  if (readmeContent.includes(badgeSection)) {
    // Reemplazar el contenido dentro del bloque de badges
    readmeContent = readmeContent.replace(
      new RegExp(`${badgeSection}.*${badgeSection}`, "s"),
      updatedContent
    );
  } else {
    // Si no existe el bloque, agregar el badge al final del README.md
    readmeContent += `\n${updatedContent}`;
  }

  // Guardar el archivo actualizado
  fs.writeFileSync(readmePath, readmeContent);
  core.info("README.md actualizado con éxito!");
} catch (error) {
  core.setFailed(`Error: ${error.message}`);
}
