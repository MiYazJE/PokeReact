import React from 'react';

const Suggestions = ({ onClick, pokemons }) => {
    if (!pokemons) return null;
    return (
        <div className="Suggestions">
            {pokemons.map(({ name, image }) => (
                <div onClick={() => onClick(name)} key={name} className="pokemonSuggested">
                    <p>{name}</p>
                    <img src={image} alt={""} />
                </div>
            ))}
        </div>
    )
}

export default Suggestions;