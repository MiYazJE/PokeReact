import React, { Component } from 'react';
import OptionsImage from './OptionsImage';
import './Pokemon.css';

class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.value.url,
            info: {},
            sprites: [],
            indexImage: 4,
            styles: {
                backgroundColor: getRandomColor(),
                transform: 'scale(1)',
            },
            showControls: false,
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

    handleClick = async (index, value) => {

        const { sprites } = this.state;

        if (index === -1 || index === sprites.length) {
            index = (index === -1) ? sprites.length - 1 : 0;
            return this.handleClick(index + value, value); 
        }

        if (!sprites[index]) {
            return this.handleClick(index + value, value); 
        }

        this.setState({
            styles: {...this.state.styles, transform: 'scale(0)'},
        })
        await sleep(700);
        this.setState({indexImage: index});
        this.setState({
            styles: {...this.state.styles, transform: 'scale(1)'},
        })
    }

    toggleVisibity = () => {
        console.log(this.state.showControls)
        this.setState({showControls: !this.state.showControls});
    }    

    render() {
        const {name} = this.state.info;
        return (
            <div className="Pokemon">
                <p className="pokemonName">
                    {name}
                </p>
                <div 
                    style={{backgroundColor: this.state.styles.backgroundColor}}
                    className="imageWrap"
                    onMouseOver={this.toggleVisibity}
                    onMouseOut={this.toggleVisibity}>
                        <img 
                            style={{ transform: this.state.styles.transform }}
                            src={this.state.sprites && this.state.sprites[this.state.indexImage]} 
                            alt={`${name} visto de frente`} 
                        />
                        {this.state.sprites && <OptionsImage
                            index={this.state.indexImage}
                            onClick={this.handleClick} 
                            style={{ opacity: this.state.showControls ? '1' : '0' }}
                        />}
                </div>
            </div>
        );
    }
}

const sleep = async (time) => await new Promise(r => setTimeout(r, time));

const getRandomColor = () => '#' + Math.random().toString().slice(2, 8);

export default Pokemon;
