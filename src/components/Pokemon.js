import React, { Component } from 'react';
import ImagePokemon from './ImagePokemon';
import './Pokemon.css';

const getImagePokemonType = (type) => `https://veekun.com/dex/media/types/en/${type}.png`;

const getPokemonTypes = (types) => {
    if (!types) return null;
    return (
        types.map(type => (
            <img
                className="imgType"
                src={getImagePokemonType(type.type.name)}
                key={type.type.name}
                alt={""}
            />
        ))
    )
}

class Pokemon extends Component {

    render() {
        const { name, id, sprites, types, description, weight } = this.props.pokemon;
        return (
            <div className="Pokemon">
                <p className="pokemonName">
                    <span>#{id}</span> {name}
                </p>
                <ImagePokemon
                    sprites={sprites}
                    name={name}
                />
                <div className="pokemonTypes">
                    {getPokemonTypes(types)}
                </div>
                <div className="description">
                    <p>
                        {description}
                    </p>
                </div>
                <div className="wrap-weight">
                    Peso: {weight}Kg
                </div>
            </div>
        );
    }
}

export default Pokemon;