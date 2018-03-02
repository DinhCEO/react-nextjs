import React from 'react';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'dinhceo :D'
        }
    }

    render() {
        console.log(process.env.PORT);
        return (
            <div>
                <h1 className="about">About page {this.state.name}</h1>
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