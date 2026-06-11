let perguntas = [];
let atual = 0;
let pontos = 0;
let tempo = 15;
let intervalo;
let recorde = localStorage.getItem("recorde") || 0;

const elInicio = document.getElementById("inicio");
const elQuiz = document.getElementById("quiz");
const elResultado = document.getElementById("resultado");
const elPergunta = document.getElementById("pergunta");
const elOpcoes = document.getElementById("opcoes");
const elProgresso = document.getElementById("progresso");
const barraProgresso = document.getElementById("barraProgresso");
const btnIniciar = document.getElementById("btnIniciar");
const elTimer = document.getElementById("timer");
const elCategoria = document.getElementById("categoria");

const elDificuldade = document.getElementById("dificuldade");

// Buscar perguntas da API
async function buscarPerguntas() {
  let url = "https://tryvia.ptr.red/api.php" + "?amount=10&type=multiple";

  const categoria = elCategoria.value;

  const dificuldade = elDificuldade.value;

  if (categoria) {
    url += `&category=${categoria}`;
  }

  if (dificuldade) {
    url += `&difficulty=${dificuldade}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    perguntas = data.results;
  } catch (erro) {
    console.log("Erro:", erro);
  }
}

function iniciarTimer() {
  clearInterval(intervalo);

  tempo = 15;

  elTimer.textContent = tempo;

  intervalo = setInterval(() => {
    tempo--;

    elTimer.textContent = tempo;

    if (tempo <= 0) {
      clearInterval(intervalo);

      proximaPergunta();
    }
  }, 1000);
}

btnIniciar.addEventListener("click", async () => {
  btnIniciar.disabled = true;
  btnIniciar.textContent = "Carregando...";

  await buscarPerguntas();

  if (perguntas.length === 0) {
    alert("Não foi possível carregar as perguntas.");
    btnIniciar.disabled = false;
    btnIniciar.textContent = "Iniciar";
    return;
  }

  elInicio.hidden = true;
  elQuiz.hidden = false;

  exibirPergunta();
});
// Embaralhar array
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Montar alternativas
function getAlternativas(pergunta) {
  const todas = [...pergunta.incorrect_answers, pergunta.correct_answer];
  return embaralhar(todas);
}
function exibirPergunta() {
  if (!perguntas[atual]) {
    exibirResultado();
    return;
  }
  const p = perguntas[atual];
  const alternativas = getAlternativas(p);

  // Atualizar progresso
  elProgresso.textContent = `${atual + 1} / ${perguntas.length}`;
  const percentual = ((atual + 1) / perguntas.length) * 100;

  barraProgresso.style.width = `${percentual}%`;

  // Exibir pergunta
  elPergunta.innerHTML = p.question;

  // Criar botões para cada alternativa
  elOpcoes.innerHTML = "";
  alternativas.forEach((alt) => {
    const btn = document.createElement("button");
    btn.innerHTML = alt;
    btn.className = "opcao";
    elOpcoes.appendChild(btn);
  });
  iniciarTimer();
}
// Delegação de eventos nas opções
elOpcoes.addEventListener("click", (e) => {
  if (!e.target.classList.contains("opcao")) return;

  const resposta = e.target.textContent;
  const correta = perguntas[atual].correct_answer;

  if (resposta === correta) {
    pontos++;
    e.target.classList.add("correta");
  } else {
    e.target.classList.add("errada");
  }
  document.querySelectorAll(".opcao").forEach((btn) => (btn.disabled = true));
  clearInterval(intervalo);

  // Avançar após 1 segundo
  setTimeout(() => {
    proximaPergunta();
  }, 1000);
});
function reiniciarQuiz() {
  atual = 0;
  pontos = 0;
  perguntas = [];

  elResultado.hidden = true;
  elInicio.hidden = false;

  btnIniciar.disabled = false;
  btnIniciar.textContent = "Iniciar";

  barraProgresso.style.width = "0%";
}
function exibirResultado() {
  clearInterval(intervalo);
  // Esconder quiz, mostrar resultado
  elQuiz.hidden = true;
  elResultado.hidden = false;

  const total = perguntas.length;
  const pct = Math.round((pontos / total) * 100);

  if (pontos > recorde) {
    recorde = pontos;
    localStorage.setItem("recorde", recorde);
  }

  let msg = "Tente novamente!";
  if (pct >= 80) msg = "Excelente!";
  else if (pct >= 60) msg = "Bom trabalho!";

  elResultado.innerHTML = `
    <h2>${msg}</h2>

    <p>
        Você acertou ${pontos} de ${total}
        (${pct}%)
    </p>

    <p>
        🏆 Recorde: ${recorde} pontos
    </p>

    <button id="btnReiniciar">
        Jogar novamente
    </button>
 `;
  document
    .getElementById("btnReiniciar")
    .addEventListener("click", reiniciarQuiz);
}
function proximaPergunta() {
  elQuiz.classList.add("fade-out");

  setTimeout(() => {
    elQuiz.classList.remove("fade-out");

    atual++;

    if (atual < perguntas.length) {
      exibirPergunta();

      elQuiz.classList.add("fade-in");

      setTimeout(() => {
        elQuiz.classList.remove("fade-in");
      }, 400);
    } else {
      exibirResultado();
    }
  }, 400);
}
