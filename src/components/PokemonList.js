import React, { Component } from 'react';
import Pokemon from './Pokemon';
import './PokemonList.css';

class PokemonList extends Component {

    constructor() {
        super();
        this.state = {
            pokemons: [],
        }
    }

    render() {
        
        return (
            <div className="PokemonList">
                {this.props.filtered.map(pokemon => (
                    <Pokemon key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>
        );  
    }

}

export default PokemonList;
