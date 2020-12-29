import React from 'react';

const PokemonItem = ({ name, image, onClick }) => (
    <div onClick={onClick} key={name} className="pokemonSuggested">
        <p>{name}</p>
        <img src={image} alt="" />
    </div>
);

const Suggestions = ({ onClick, pokemons }) => (
    <div className="Suggestions">
        {pokemons.map(({ name, image }) => (
            <PokemonItem onClick={() => onClick(name)} key={name} name={name} image={image} />
        ))}
    </div>
);

export default Suggestions;
