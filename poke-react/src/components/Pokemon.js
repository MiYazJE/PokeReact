import React, { Component } from 'react';
import './Pokemon.css';

const OptionsImage = ({ onClick, index }) => {
    return (
        <div>
            <button 
                className="passLeft" 
                onClick={() => onClick(index - 1, -1)}
            >Left</button>
            <button 
                className="passRight" 
                onClick={() => onClick(index + 1, 1)}
            >Right</button>
        </div>
    )
}

class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.value.url,
            info: {},
            sprites: [],
            indexImage: 4,
            color: getRandomColor(),
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

    handleClick = (index, value) => {

        const { sprites } = this.state;

        if (index === -1 || index === sprites.length) {
            index = (index === -1) ? sprites.length - 1 : 0;
            return this.handleClick(index + value, value); 
        }

        if (!sprites[index]) {
            return this.handleClick(index + value, value); 
        }

        this.setState({indexImage: index});
    }

    render() {
        const {name} = this.state.info;
        return (
            <div className="Pokemon">
                <p className="pokemonName">
                    {name}
                </p>
                <div style={this.state.color} className="image">
                    <img 
                        src={this.state.sprites && this.state.sprites[this.state.indexImage]} 
                        alt={`${name} visto de frente`} 
                    />
                </div>
                {this.state.sprites && <OptionsImage
                    index={this.state.indexImage}
                    onClick={this.handleClick} 
                />}
            </div>
        );
    }
}

const getRandomColor = () => {
    const color = '#' + Math.random().toString().slice(2, 8);
    return {backgroundColor: color};
}

export default Pokemon;
