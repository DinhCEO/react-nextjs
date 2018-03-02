import React from 'react';

class B extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Component B :D'
        }
    }

    render() {
        return (
            <h1>About page {this.state.name}</h1>
        )
    }
}

export default B;