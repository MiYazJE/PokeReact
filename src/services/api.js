const BASE_POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';
const LAST_POKEMON_INDEX = 1118;

async function getAllPokemonNames() {
    const res = await fetch(`${BASE_POKEMON_API}?limit=${LAST_POKEMON_INDEX}`);
    const pokemons = await res.json();
    return pokemons.results
        .reduce((map, pokemon) => map.set(pokemon.name, pokemon.url), new Map());
}

async function getPokemonDescription(url) {
    const res = await fetch(url);
    const data = await res.json();
    const descriptions = data.flavor_text_entries.filter((d) => d.language.name === 'es');
    return descriptions && descriptions[0] ? descriptions[0].flavor_text : 'NO DESCRIPTION';
}

function getImage(sprites) {
    if (sprites.other.dream_world
        && sprites.other.dream_world.front_default) {
        return sprites.other.dream_world.front_default;
    }
    if (sprites.other['official-atwork']
        && sprites.other['official-atwork'].front_default) {
        return sprites.other['official-atwork'].front_default;
    }
    return sprites.front_default;
}

async function getPokemonInfo(pokemonUrl) {
    const res = await fetch(pokemonUrl);
    const {
        id, name, types, sprites, weight, species,
    } = await res.json();
    const description = await getPokemonDescription(species.url);
    return {
        id,
        name,
        types,
        sprites,
        weight,
        description,
        image: getImage(sprites),
    };
}

export default {
    getAllPokemonNames,
    getPokemonInfo,
};
