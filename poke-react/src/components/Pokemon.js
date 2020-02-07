import React, { Component } from 'react';

class Pokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.value.url,
            info: {},
        }
    }

    async componentDidMount() {
        const res  = await fetch(this.state.url);
        const data = await res.json();
        this.setState({info: data});
    }

    render() {
        const {name} = this.state.info;
        return (
            <div className="pokemon">
                <p>
                    {name}
                </p>
            </div>
        );
    }
}

export default Pokemon;
