import React, { Component } from 'react';
import PokemonList from './components/PokemonList';
import Buscador from './components/Buscador';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			pokemonBuscar: '',
			pokemons: {},
			filtered: [],
			show: false,
		}
		this.readAllPokemons();
	}

	readAllPokemons = async () => {

		const res  = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
		const data = await res.json();
		
		let info = await data.results.map(async pokemon => {
			const data = await fetch(pokemon.url);
			const res  = await data.json(); 
			res.sprites = Object.values(res.sprites);
			return res;
		});

		Promise.all(info)
			.then(values => {
				this.setState({pokemons: values})
			})
	}

	filterPokemons = () => {
		let searched = this.state.pokemonBuscar.toLowerCase();
		let filtered = this.state.pokemons.filter(pokemon => {
			return pokemon.name.toLowerCase().includes(searched);
		});
		this.setState({
			show: true,
			filtered
		})
	}

	handleSubmit = (pokemonBuscar) => {
		this.setState({
			 pokemonBuscar 
		}, () => {
			this.filterPokemons();
		});
	}

	render() {
		return (
			<div>
				<Buscador onSubmit={this.handleSubmit} />
				{this.state.show && <PokemonList filtered={this.state.filtered} />}
			</div>
		);
	}

}

export default App;
