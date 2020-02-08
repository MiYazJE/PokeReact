import React, { Component } from 'react';
import ImagePokemon from './ImagePokemon';
import './Pokemon.css';

const getImagePokemonType = (type) => `https://veekun.com/dex/media/types/en/${type}.png`;

const getPokemonTypes = (types) => {
    return (
        types.map(type => (
            <img 
                className="imgType"
                src={getImagePokemonType(type.type.name)}
                key={type.type.name}
            /> 
        ))
    )
}

class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.value.url,
            info: {},
            sprites: [],
        }
    }

    async componentDidMount() {
        const res  = await fetch(this.state.url);
        const data = await res.json();

        this.setState({
            info: data,
            sprites: Object.values(data.sprites),
        });
    }

    render() {
        const {name, id} = this.state.info;
        return (
            <div className="Pokemon">
                <p className="pokemonName">
                    <span>#{id}</span> {name}
                </p>
                <ImagePokemon 
                    sprites={this.state.sprites} 
                    name={name}
                />
                <div className="pokemonTypes">
                    {this.state.info.types && getPokemonTypes(this.state.info.types)}
                </div>
            </div>
        );
    }
}

export default Pokemon;
