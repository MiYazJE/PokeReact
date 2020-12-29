import React from 'react';
import './ImagePokemon.css';

const getRandomColor = () => `#${Math.random().toString().slice(2, 8)}`;

const ImagePokemon = ({ image }) => (
    <div
        className="imageWrap"
        style={{ backgroundColor: getRandomColor() }}
    >
        <img
            className="pokemon"
            src={image}
            alt=""
        />
    </div>
);

export default ImagePokemon;
