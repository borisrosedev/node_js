// Définir une fonction qui admet 2 paramètres a et b et qui retourne la
// somme des deux.
const process = require("process"); // j'importe la bibliothèque native process
//console.log(process.argv) // je veux voir ce que process contient

function calculate(a, b) {
  return parseInt(a) + parseInt(b);
}

console.log(calculate(process.argv[2], process.argv[3]));
