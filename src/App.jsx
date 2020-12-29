import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import Search from './components/Search/Search';
import Loading from './components/Loading/Loading';
import Pokemon from './components/Pokemon/Pokemon';
import usePokemons from './hooks/usePokemons';
import useLoadMore from './hooks/useLoadMore';
import './App.css';

const App = () => {
    const refScroll = useRef();
    const { filterPokemons, loadPokemonsInfo } = usePokemons();
    const [loadMore] = useLoadMore({ element: refScroll });

    const [pokemonsToSuggest, setPokemonsToSuggest] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pokemonsList, setPokemonsList] = useState([]);
    const [littePokemonList, setLittlePokemonList] = useState([]);

    useEffect(() => {
        if (loadMore) {
            const reduceList = pokemonsList.slice(0, 20);
            setLittlePokemonList((prev) => [...prev, ...reduceList]);
            setPokemonsList((prev) => prev.slice(20));
        }
    }, [loadMore]);

    const handleFilterPokemons = async (searched) => {
        if (!searched) {
            setShowSuggestions(false);
            return;
        }
        let filtered = filterPokemons(searched);
        if (filtered.length > 5) filtered = filtered.slice(0, 5);
        const pokemons = await loadPokemonsInfo(filtered);
        setPokemonsToSuggest(pokemons);
        setShowSuggestions(true);
    };

    const searchPokemons = async (pokemonName) => {
        setShowSuggestions(false);
        setLoading(true);
        const pokemonsFiltered = filterPokemons(pokemonName);
        const pokemons = await loadPokemonsInfo(pokemonsFiltered);

        setLittlePokemonList([]);
        setPokemonsList(pokemons);
        setLittlePokemonList(pokemons.slice(0, 20));
        setPokemonsList(pokemons.slice(20));
        setLoading(false);
    };

    return (
        <div ref={refScroll} className="application" style={{ height: '100vh', overflow: 'auto' }}>
            <Search
                searchPokemons={searchPokemons}
                pokemonsToSuggest={pokemonsToSuggest}
                showSuggestions={showSuggestions}
                filterPokemons={handleFilterPokemons}
            />
            {loading ? <Loading /> : (
                <div className="PokemonList">
                    {littePokemonList
                        .map((pokemon) => (
                            <Pokemon key={pokemon.name} pokemon={pokemon} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default App;
