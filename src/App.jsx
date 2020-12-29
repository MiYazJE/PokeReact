import React, { useState } from 'react';
import Search from './components/Search/Search';
import Loading from './components/Loading/Loading';
import Pokemon from './components/Pokemon/Pokemon';
import usePokemons from './hooks/usePokemons';
import './App.css';

const App = () => {
    const { filterPokemons, loadPokemonsInfo } = usePokemons();
    const [pokemonsToSuggest, setPokemonsToSuggest] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [pokemonsList, setPokemonsList] = useState([]);

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
        setLoading(true);
        const pokemonsFiltered = filterPokemons(pokemonName);
        const pokemons = await loadPokemonsInfo(pokemonsFiltered);
        setShowSuggestions(false);
        setPokemonsList(pokemons);
        setLoading(false);
    };

    if (loading) return <Loading />;
    return (
        <div className="application" style={{ height: '100vh', overflow: 'auto' }}>
            <Search
                searchPokemons={searchPokemons}
                pokemonsToSuggest={pokemonsToSuggest}
                showSuggestions={showSuggestions}
                filterPokemons={handleFilterPokemons}
            />
            <div className="PokemonList">
                {pokemonsList.map((pokemon) => <Pokemon key={pokemon.name} pokemon={pokemon} />)}
            </div>
        </div>
    );
};

export default App;
