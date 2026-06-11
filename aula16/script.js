const input = document.getElementById("pokemonInput");
const resultado = document.getElementById("resultado");

let pokemonAtual = 1;

const coresTipos = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// busca Pok

async function buscarPokemon(valor) {
  resultado.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${valor.toString().toLowerCase()}`,
    );

    if (!resposta.ok) {
      throw new Error("Pokemon não encontrado");
    }

    const pokemon = await resposta.json();

    pokemonAtual = pokemon.id;

    const tipos = pokemon.types.map((tipo) => tipo.type.name).join(", ");

    const corPrincipal = coresTipos[pokemon.types[0].type.name] || "#777";

    const statsHTML = pokemon.stats
      .map(
        (stat) => `
                <p>
                    ${stat.stat.name}: ${stat.base_stat}
                </p>
            `,
      )
      .join("");

    resultado.innerHTML = `
            <div
                class="card"
                style="background:${corPrincipal}"
            >

                <h2>
                    #${pokemon.id} ${pokemon.name}
                </h2>

                <img
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                >

                <p>
                    <strong>Tipo(s):</strong>
                    ${tipos}
                </p>

                <div class="stats">

                    <h3>Estatísticas</h3>

                    ${statsHTML}

                </div>

            </div>
        `;
  } catch (erro) {
    resultado.innerHTML = `
            <p class="erro">
                Pokemon não encontrado!
            </p>
        `;
  }
}

document.getElementById("buscarBtn").addEventListener("click", () => {
  const valor = input.value.trim();

  if (valor) {
    buscarPokemon(valor);
  }
});

document.getElementById("anteriorBtn").addEventListener("click", () => {
  if (pokemonAtual > 1) {
    pokemonAtual--;

    buscarPokemon(pokemonAtual);
  }
});

document.getElementById("proximoBtn").addEventListener("click", () => {
  pokemonAtual++;

  buscarPokemon(pokemonAtual);
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const valor = input.value.trim();

    if (valor) {
      buscarPokemon(valor);
    }
  }
});

buscarPokemon(1);
