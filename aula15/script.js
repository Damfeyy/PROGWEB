const form = document.getElementById("formTarefa");
const input = document.getElementById("tarefa");
const lista = document.getElementById("listaTarefas");
const busca = document.getElementById("busca");

// Carrega tarefas salvas

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Salvar localStorage

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Criar item lista

function criarTarefa(texto, concluida = false) {
  const li = document.createElement("li");

  if (concluida) {
    li.classList.add("concluida");
  }

  li.innerHTML = `
        <span>${texto}</span>
        <button class="remover">X</button>
    `;

  lista.appendChild(li);
}

function renderizarTarefas() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    criarTarefa(tarefa.texto, tarefa.concluida);
  });
}

// Add tarefa

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const texto = input.value.trim();

  if (texto === "") return;

  tarefas.push({
    texto,
    concluida: false,
  });

  salvarTarefas();

  renderizarTarefas();

  input.value = "";
});

// Delega eventos

lista.addEventListener("click", (event) => {
  const li = event.target.closest("li");

  if (!li) return;

  const texto = li.querySelector("span").textContent;

  const indice = tarefas.findIndex((tarefa) => tarefa.texto === texto);

  // Remove

  if (event.target.classList.contains("remover")) {
    tarefas.splice(indice, 1);

    salvarTarefas();

    renderizarTarefas();

    return;
  }

  tarefas[indice].concluida = !tarefas[indice].concluida;

  salvarTarefas();

  renderizarTarefas();
});

// busca

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase();

  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    const texto = item.querySelector("span").textContent.toLowerCase();

    item.style.display = texto.includes(termo) ? "flex" : "none";
  });
});

// Inicia

renderizarTarefas();
