import React, { Component } from 'react';
import PokemonList from './components/PokemonList';
import Buscador from './components/Buscador';
import Loading from './components/Loading';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pokemonBuscar: '',
			pokemons: {},
			pokemonsToSuggest: [],
			filtered: [],
			show: false,
			items: 20,
			loading: false,
		}
	}

	async fetchDescription(url) {

		let description = '';

		const res = await fetch(url);
		const data = await res.json();

		// Get only the spanish description, last one
		data.flavor_text_entries.forEach(text => {
			if (text.language.name === 'es')
				description = text.flavor_text;
		})

		return description;
	}

	readAllPokemons = async () => {

		const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
		const data = await res.json();

		const pokemonsToSuggest = [];

		let pokemons = await data.results.map(async pokemon => {

			const data = await fetch(pokemon.url);
			const res = await data.json();

			let description = await this.fetchDescription(res.species.url); 

			pokemonsToSuggest.push({
				name: res.name, 
				image: res.sprites.front_default
			});
			
			res.description = description;
			res.sprites = Object.values(res.sprites);
			
			return res;
		});

		await Promise.all(pokemons)
			.then(values => {
				this.setState({ 
					pokemons: values,
					pokemonsToSuggest
				})
			})
	}

	filterPokemons = async () => {

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

	async componentDidMount() {
		this.setState({ loading: true });
		await this.readAllPokemons();
		this.refs.myScroll.addEventListener('scroll', this.handleScroll, true);
		this.setState({ loading: false });
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
				{!this.state.loading && <Buscador 
					onSubmit={this.handleSubmit} 
					pokemonsToSuggest={this.state.pokemonsToSuggest}/>
				}
				{this.state.show &&
					<PokemonList 
						filtered={this.state.filtered.slice(0, this.state.items)}/>
				}
				{this.state.loading && <Loading />}
			</div>
		);
	}

}

export default App;
