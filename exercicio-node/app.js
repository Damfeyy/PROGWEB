const fs = require("fs");

const { somar, multiplicar } = require("./utils");

const resultadoSoma = somar(10, 5);
const resultadoMultiplicacao = multiplicar(10, 5);

const texto = `
Soma: ${resultadoSoma}
Multiplicação: ${resultadoMultiplicacao}
`;

fs.writeFileSync("resultado.txt", texto);

console.log("Arquivo criado com sucesso!");
