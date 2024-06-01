const searchInput = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

const pokemonHead = document.getElementById("pokemon-head");

const hp = document.getElementById("hp");

const attack = document.getElementById("attack");

const defense = document.getElementById("defense");

const specialAttack = document.getElementById("special-attack");

const specialDefense = document.getElementById("special-defense");

const speed = document.getElementById("speed");

const pokemonProfile = document.getElementById("pokemon-profile");

const pokemonName = document.getElementById("pokemon-name");

const pokemonId = document.getElementById("pokemon-id");

const weight = document.getElementById("weight");

const height = document.getElementById("height");

const title = document.querySelector(".title");

const types = document.getElementById("types");

const imgPokemon = document.getElementById("img-pokemon-div");

let id = 0;
let Name = "";
let pokemonDataArr = [];

fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
	.then((res) => res.json())
	.then((data) => {
		pokemonDataArr = data;
		displayPokemon(pokemonDataArr.results, id, Name);
	})
	.catch((err) => {
		pokemonHead.innerHTML =
			'<p class="error-msg">There was an error loading Pokémon data</p>';
	});

const displayPokemon = (pokemons, id1, name1) => {
	if (name1 === "") {
		return;
	} else {
		if (
			!pokemons.some(
				({ id, name }) => id === Number(id1) || name === name1.toLowerCase()
			)
		) {
			alert("Pokémon not found");
		} else {
			pokemons.forEach(({ id, name, url }) => {
				if (id === Number(id1) || name === name1.toLowerCase()) {
					fetch(url)
						.then((res) => res.json())
						.then((data) => {
							hp.textContent = data.stats[0].base_stat;
							attack.textContent = data.stats[1].base_stat;
							defense.textContent = data.stats[2].base_stat;
							specialAttack.textContent = data.stats[3].base_stat;
							specialDefense.textContent = data.stats[4].base_stat;
							speed.textContent = data.stats[5].base_stat;
							pokemonName.textContent = name.toUpperCase();

							pokemonId.textContent = ` #${id}`;

							weight.textContent = `Weight: ${data.weight}`;

							height.textContent = `Height: ${data.height}`;

							const image1 = document.createElement("img");

							image1.id = "sprite";
							image1.src = data.sprites.front_default;
							imgPokemon.appendChild(image1);

							types.style.visibility = "visible";

							if (types.textContent === "") {
								types.textContent = "";
							}

							types.innerHTML =
								data.types.length === 1
									? `
							<div id="type">${data.types[0].type.name.toUpperCase()}</div>
						  `
									: data.types
											.map(
												(el) => `
							  <div id="type">${el.type.name.toUpperCase()}</div>
							`
											)
											.join(" ");
						})
						.catch((err) => {
							pokemonHead.innerHTML =
								'<p class="error-msg">There was an error loading Pokémon data</p>';
						});
				}
			});
		}
	}
};

const update = () => {
	if (imgPokemon.hasChildNodes()) {
		imgPokemon.removeChild(imgPokemon.childNodes[0]);
	}
	displayPokemon(pokemonDataArr.results, searchInput.value, searchInput.value);
};

searchInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		if (searchInput.value === "") {
			alert("please enter a value");
		} else {
			update();
		}
	}
});

searchButton.addEventListener("click", (e) => {
	e.preventDefault();
	if (searchInput.value === "") {
		alert("please enter a value");
	} else {
		update();
	}
});
