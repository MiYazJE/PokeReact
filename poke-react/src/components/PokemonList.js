import React, { Component } from 'react';
import Pokemon from './Pokemon';
import './PokemonList.css';

class PokemonList extends Component {

    constructor() {
        super();
        this.state = {
            url: 'https://pokeapi.co/api/v2/pokemon',
            pokemons: [],
        }
    }

    async componentDidMount() {
        const res  = await fetch(this.state.url);
        const data = await res.json();
        this.setState({pokemons: data.results});
    }
    
    render() {
        
        return (
            <div className="PokemonList">
                {this.state.pokemons.map(pokemon => (
                    <Pokemon key={pokemon.name} value={pokemon} />
                ))}
            </div>
        );  
    }

}

export default PokemonList;
