import React from 'react';
import {AuthService} from 'service';

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
                <h1 className="about">About page</h1>
                <h1 className="about">State page {this.state.name}</h1>
                <style jsx>
                    {`
                        .about {
                            font: 15px Helvetica, Arial, sans-serif;
                            background: #eee;
                            padding: 20px;
                            text-align: center;
                            transition: 100ms ease-in background;
                        }
                    `}
                </style>
            </div>
        )
    }
}

export default About;