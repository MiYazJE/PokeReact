import React, { Component } from 'react';

const OptionsImage = ({sprites, onClick}) => {
    return Object.keys(sprites).map((typeImage) => {
        return (sprites[typeImage]) ?
                <div key={typeImage} className="ImageType">
                    <button onClick={() => onClick(typeImage)}>
                        {typeImage}
                    </button>
                </div>
        : null;
    })
}

class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.value.url,
            info: {},
            actualImage: 'front_default',
        }
    }

    async componentDidMount() {
        const res  = await fetch(this.state.url);
        const data = await res.json();
        this.setState({info: data});
    }

    handleClick = (actualImage) => {
        this.setState({actualImage: actualImage});
    }

    render() {
        const {name, sprites} = this.state.info;
        return (
            <div className="pokemon">
                <p className="pokemonName">
                    {name}
                </p>
                <img 
                    src={sprites && sprites[this.state.actualImage]} 
                    alt={`${name} visto de frente`} 
                />
                {sprites && <OptionsImage
                    sprites={sprites} 
                    onClick={this.handleClick} 
                />}
            </div>
        );
    }
}

export default Pokemon;
