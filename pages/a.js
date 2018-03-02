import React from 'react';

class A extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Component A :D'
        }
    }

    render() {
        return (
            <h1>About page {this.state.name}</h1>
        )
    }
}

export default A;