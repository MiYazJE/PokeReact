import React, { Component } from 'react';

export class Buscador extends Component {

    searchRef = React.createRef();

    sendPokemon = () => {
        let pokemon = this.searchRef.current.value;
        this.props.onSubmit(pokemon);
    }

    render() {
        return (
            <div className="Buscador">
                <div className="wrapInput">
                    <input
                    ref={this.searchRef}
                    type="text"
                    placeholder="Busca un pokemon..." />
                </div>
                <div className="wrapInput">
                    <input 
                    onClick={this.sendPokemon}
                    type="submit" 
                    value="Buscar" />
                </div>
            </div>
        );
    }

}

export default Buscador;
