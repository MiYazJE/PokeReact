import { useCallback, useEffect, useState } from 'react';
import API from '../services/api';

const usePokemons = () => {
    const [pokemonsUrl, setPokemonsUrl] = useState({});
    const [pokemonsLoaded] = useState(new Map());
    const [allNames, setAllNames] = useState([]);

    const loadAllPokemons = useCallback(async () => {
        const pokemons = await API.getAllPokemonNames();
        setPokemonsUrl(pokemons);
        setAllNames([...pokemons.keys()]);
    }, []);

    useEffect(() => {
        loadAllPokemons();
    }, [loadAllPokemons]);

    const filterPokemons = (pokemonName) => {
        const searchSerialized = pokemonName.toLowerCase();
        return allNames.filter((n) => n.toLowerCase().includes(searchSerialized));
    };

    const loadPokemonsInfo = async (pokemonsFiltered) => {
        const filtered = pokemonsFiltered.map((pokemonName) => {
            if (pokemonsLoaded.has(pokemonName)) return pokemonsLoaded.get(pokemonName);
            const data = API.getPokemonInfo(pokemonsUrl.get(pokemonName));
            return data;
        });

        return Promise.all(filtered).then((pokemons) => {
            pokemons.forEach((pokemonInfo) => {
                if (!pokemonsLoaded.has(pokemonInfo.name)) {
                    pokemonsLoaded.set(pokemonInfo.name, pokemonInfo);
                }
            });
            return pokemons;
        });
    };

    return { loadPokemonsInfo, filterPokemons };
};

export default usePokemons;
