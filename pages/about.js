import React from 'react';
import {AuthService} from 'service';
import './about.css';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.authService = AuthService;
        this.state       = {
            name: 'dinhceo :D'
        }
    }

    render() {
        console.log(process.env.PORT);
        this.authService.myFunction().then(result => {
            console.log(result);
        });
        return (
            <div>
                <h1 className="about">About page {this.state.name}</h1>
                <span className="dinhceo">dinhceo</span>
            </div>
        )
    }
}

export default About;