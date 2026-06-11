const produtos = [
  {
    nome: "Notebook",
    preco: 3500,
    categoria: "Eletrônicos",
  },
  {
    nome: "Mouse",
    preco: 120,
    categoria: "Eletrônicos",
  },
  {
    nome: "Cadeira",
    preco: 450,
    categoria: "Móveis",
  },
  {
    nome: "Mesa",
    preco: 700,
    categoria: "Móveis",
  },
  {
    nome: "Monitor",
    preco: 900,
    categoria: "Eletrônicos",
  },
];
const container = document.getElementById("container");

// Cria cards
produtos.forEach((produto) => {
  const card = document.createElement("div");

  card.classList.add("card");

  if (produto.categoria === "Eletrônicos") {
    card.classList.add("eletronico");
  }

  card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        <p>Categoria: ${produto.categoria}</p>
    `;

  container.appendChild(card);
});

//  mostrar eletrônicos
document.getElementById("btnEletronicos").addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    if (!card.classList.contains("eletronico")) {
      card.classList.toggle("oculto");
    }
  });
});

// limpar

document.getElementById("btnLimpar").addEventListener("click", () => {
  container.innerHTML = "";
});
