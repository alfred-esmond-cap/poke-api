const pokemonList = document.querySelector("#pokemon-list");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonData = [];
const promises = [];

for (let i = 1; i <= 151; i++) {
  const promise = fetch(URL + i)
    .then((response) => response.json())
    .then((data) => pokemonData.push(data));
  promises.push(promise);
}

Promise.all(promises).then(() => {
  pokemonData.sort((a, b) => a.id - b.id);
  pokemonData.forEach((poke) => showPokemon(poke));
});

function showPokemon(poke) {
  const div = document.createElement("div");
  div.classList.add("pokemon");

  const pokemonType = poke.types[0].type.name;
  div.classList.add(pokemonType);

  div.innerHTML = `
    <div class="back-pokeball">
      <img src="img/pokeball.png" alt="pokeball" />
    </div>

    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${poke.id}</p>
        <h3 class="pokemon-name">${poke.name}</h3>
      </div>
      
      <div class="pokemon-types">
        <p class="type">${poke.types[0].type.name}</p>
      </div>
      
      <div class="pokemon-stats">
        <p class="height">${poke.height * 10}cm</p>
        <p class="weight">${poke.weight / 10}kg</p>
      </div>
    </div>

    <div class="pokemon-img">
      <img
        src="${poke.sprites.other["official-artwork"].front_default}"
        alt="${poke.name}"/>
    </div>
  `;

  pokemonList.append(div);
}
