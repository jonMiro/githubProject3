const fs = require("fs");
const core = require("@actions/core");

try {
  const outcome = core.getInput("outcome");
  const readmePath = "README.md";

  const badge =
    outcome === "success"
      ? "![Tests Passed](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)"
      : "![Tests Failed](https://img.shields.io/badge/test-failure-red)";

  let readmeContent = fs.readFileSync(readmePath, "utf8");

  const badgeSection = "## RESULTAT DELS ÚLTIMS TESTS\n";
  const updatedContent = `${badgeSection}${badge}\n`;

  if (readmeContent.includes(badgeSection)) {
    readmeContent = readmeContent.replace(
      new RegExp(`${badgeSection}.*`, "s"),
      updatedContent
    );
  } else {
    readmeContent += `\n${updatedContent}`;
  }

  fs.writeFileSync(readmePath, readmeContent);
  core.info("README.md actualitzat amb èxit!");
} catch (error) {
  core.setFailed(`Error: ${error.message}`);
}
