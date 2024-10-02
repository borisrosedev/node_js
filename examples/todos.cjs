const fs = require("fs");
const process = require("process");
const chalk = require("chalk");
const bcrypt = require("bcrypt");

if (!fs.existsSync("todos.txt")) {
  fs.writeFileSync("todos.txt", "");
}

const argv = process.argv;

if (argv[2] == "add" && argv[3]) {
  let str = "";
  for (const index in argv) {
    if (index >= 3) {
      str += argv[index] + " ";
    }
  }
  fs.appendFileSync("todos.txt", str + "\n");
}

if (argv[2] == "read") {
  console.log(chalk.blue(fs.readFileSync("todos.txt", "utf-8")));
}

if (argv[2] == "delete" && !argv[3]) {
  fs.unlinkSync("todos.txt");
}

// Trouver le moyen de supprimer une ligne spécifique du fichier

if (argv[2] == "delete" && argv[3]) {
  const content = fs.readFileSync("todos.txt", "utf-8");
  const contentToDos = content.split("\n");
  const lineToDelete = Number(argv[3]) - 1;
  const elementToDelete = contentToDos[lineToDelete];
  const updatedToDos = contentToDos.filter(el => el !== elementToDelete);
  const stringifyToDos = updatedToDos.join("\n");
  fs.writeFileSync("todos.txt", stringifyToDos);
}
