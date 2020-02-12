import React, { Component } from 'react';
import ControlsImage from './ControlsImage';
import './ImagePokemon.css';

export class ImagePokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexImage: 4,
            styles: {
                backgroundColor: getRandomColor(),
                transform: 'scale(1)',
            },
            showControls: false,
        }
    }

    changeImageWithTransition = async (index) => {

        this.setState({
            styles: {...this.state.styles, transform: 'scale(0)'},
        })

        await sleep(700);

        this.setState({
            indexImage: index,
            styles: {...this.state.styles, transform: 'scale(1)'},
        })
    }

    handleClick = async (index, value) => {

        const { sprites } = this.props;

        if (index === -1 || index === sprites.length) {
            index = (index === -1) ? sprites.length - 1 : 0;
            return this.handleClick(index + value, value); 
        }

        if (!sprites[index]) {
            return this.handleClick(index + value, value); 
        }

        await this.changeImageWithTransition(index);
    }

    handleMouseOverOut = () => {
        this.setState({showControls: !this.state.showControls});
    }  

    render() {
        return (
            <div
                className="imageWrap"
                style={{ backgroundColor: this.state.styles.backgroundColor }}
                onMouseOver={this.handleMouseOverOut}
                onMouseOut={this.handleMouseOverOut}>
                <img
                    style={{ transform: this.state.styles.transform }}
                    src={this.props.sprites && this.props.sprites[this.state.indexImage]}
                    alt={""}
                />
                {this.props.sprites && <ControlsImage
                    onClick={this.handleClick}
                    index={this.state.indexImage}
                    style={{ opacity: this.state.showControls ? '1' : '0' }}
                />}
            </div>
        );
    }

}

const sleep = async (time) => await new Promise(r => setTimeout(r, time));
const getRandomColor = () => '#' + Math.random().toString().slice(2, 8);

export default ImagePokemon;
