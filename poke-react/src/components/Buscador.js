import React, { Component } from 'react';
import Suggestions from './Suggestions';
import './Buscador.css';

export class Buscador extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonsSuggested: [],
            showSuggestions: false,
            userInput: '',
        }
    }

    searchRef = React.createRef();

    sendPokemon = () => {
        this.setState({ showSuggestions: false });
        this.props.onSubmit(this.state.userInput);
    }

    handleInputChange = () => {

        // Update user input
        this.setState({
            userInput: this.searchRef.current.value,
        });

        const searched = this.searchRef.current.value.toLowerCase();

        // If the word to search its empty, hide suggestions
        if (!searched) {
            this.setState({ showSuggestions: false });
            return;
        }

        const { pokemonsToSuggest: pokemons } = this.props;

        let pokemonsFiltered = pokemons.filter(({ name }) => {
            return name.toLowerCase().indexOf(searched) !== -1;
        })

        this.setState({
            pokemonsSuggested: pokemonsFiltered,
            showSuggestions: true,
        });

    }

    handleClick = (name) => {
        this.setState({
            userInput: name,
            showSuggestions: false,
        });
    }

    render() {
        const { pokemonsSuggested, showSuggestions, userInput } = this.state;
        return (
            <div className="Buscador">
                <div className="wrapInput">
                    <input
                        ref={this.searchRef}
                        type="text"
                        onChange={this.handleInputChange}
                        placeholder="Busca un pokemón..."
                        value={userInput}
                    />
                    {showSuggestions && <Suggestions
                        pokemons={pokemonsSuggested.slice(0, 5)}
                        onClick={this.handleClick}
                    />}
                </div>
                <div className="wrapInput">
                    <input
                        onClick={this.sendPokemon}
                        type="submit"
                        value="Buscar" />
                </div>
            </div>
        );
    }

}

export default Buscador;
