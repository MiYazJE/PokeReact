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
			items: 20,
			loading: false,
		}
	}

	readAllPokemons = async () => {

		if (Object.keys(this.state.pokemons).length !== 0) return;

		const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
		const data = await res.json();

		let info = await data.results.map(async pokemon => {
			const data = await fetch(pokemon.url);
			const res = await data.json();
			res.sprites = Object.values(res.sprites);
			return res;
		});

		await Promise.all(info)
			.then(values => {
				this.setState({ pokemons: values })
			})
	}

	filterPokemons = async () => {

		await this.readAllPokemons();

		let searched = this.state.pokemonBuscar.toLowerCase();
		let filtered = this.state.pokemons.filter(pokemon => {
			return pokemon.name.toLowerCase().includes(searched);
		});

		this.setState({
			show: true,
			filtered,
		})
	}

	handleSubmit = (pokemonBuscar) => {
		this.setState({
			pokemonBuscar
		}, async () => {
			await this.filterPokemons();
		});
	}

	componentDidMount() {
		this.refs.myScroll.addEventListener('scroll', this.handleScroll, true);
	}

	// Load more pokemons when reach the limit (infinity scroll) 
	handleScroll = () => {

		const { scrollTop, clientHeight, scrollHeight } = this.refs.myScroll;

		if (scrollTop + clientHeight + 100 >= scrollHeight) {
			this.setState({ items: this.state.items + 20 })
		}

	}

	render() {
		return (
			<div ref="myScroll" className="application" style={{ height: "100vh", overflow: "auto" }}>
				<Buscador onSubmit={this.handleSubmit} />
				{this.state.show &&
					<PokemonList filtered={this.state.filtered.slice(0, this.state.items)} />}
			</div>
		);
	}

}

export default App;
