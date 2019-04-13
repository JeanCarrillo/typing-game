import React, { Component } from 'react';

class Monster extends Component {
    constructor(props) {
        super(props);
        const { text } = this.props;
        this.state = {
            text: text,
        }
    }

    render() {
        return (
            <div
                className="Monster"
                style={{
                    backgroundColor: "red",
                    height: "50px",
                    width: "50px",
                }}
            >
                <p>{this.state.text}</p>
            </div>
        );
    }
}

export default Monster;