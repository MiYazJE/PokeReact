import React, { useState } from 'react';
import Suggestions from '../Suggestions/Suggestions';
import './Buscador.css';

const Search = ({
    searchPokemons, pokemonsToSuggest, filterPokemons, showSuggestions,
}) => {
    const [search, setSearch] = useState('');

    const handleOnChange = ({ target }) => {
        setSearch(target.value);
        filterPokemons(target.value);
    };

    const selectPokemon = (name) => {
        setSearch(name);
        searchPokemons(name);
    };

    const handleSearchPokemons = () => {
        if (!search) return;
        searchPokemons(search);
    };

    const handleOnKeyDown = ({ key }) => {
        if (key === 'Enter') {
            searchPokemons(search);
        }
    };

    return (
        <div className="Buscador">
            <div className="wrapInput">
                <input
                    type="text"
                    onChange={handleOnChange}
                    placeholder="Busca un pokemón..."
                    value={search}
                    onKeyDown={handleOnKeyDown}
                />
                {showSuggestions ? (
                    <Suggestions
                        pokemons={pokemonsToSuggest}
                        onClick={selectPokemon}
                    />
                ) : null}
            </div>
            <div className="wrapInput">
                <input
                    onClick={handleSearchPokemons}
                    type="submit"
                    value="Buscar"
                />
            </div>
        </div>
    );
};

export default Search;
