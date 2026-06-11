const alunos = [
  {
    nome: "Ana",
    nota1: 8,
    nota2: 7,
  },
  {
    nome: "Bruno",
    nota1: 5,
    nota2: 4,
  },
  {
    nome: "Carlos",
    nota1: 9,
    nota2: 8,
  },
  {
    nome: "Daniela",
    nota1: 6,
    nota2: 7,
  },
  {
    nome: "Eduardo",
    nota1: 3,
    nota2: 5,
  },
];

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

const alunosComMedia = alunos.map((aluno) => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2),
}));

const aprovados = alunosComMedia.filter((aluno) => aluno.media >= 6);

const reprovados = alunosComMedia.filter((aluno) => aluno.media < 6);

const mediaGeral =
  alunosComMedia.reduce((soma, aluno) => soma + aluno.media, 0) /
  alunosComMedia.length;

console.log("===== ALUNOS =====");

alunosComMedia.forEach((aluno) => {
  console.log(
    `${aluno.nome} | Nota 1: ${aluno.nota1} | Nota 2: ${aluno.nota2} | Média: ${aluno.media.toFixed(1)}`,
  );
});

console.log("\n===== APROVADOS =====");

aprovados.forEach((aluno) => {
  console.log(`${aluno.nome} - Média: ${aluno.media.toFixed(1)}`);
});

console.log("\n===== REPROVADOS =====");

reprovados.forEach((aluno) => {
  console.log(`${aluno.nome} - Média: ${aluno.media.toFixed(1)}`);
});

console.log(`\nMédia geral da turma: ${mediaGeral.toFixed(1)}`);
