import React, { Component } from 'react';

class Monster extends Component {
    constructor(props) {
        super(props);
        const { text } = this.props;
        this.text = text
        this.state = {
        }
    }

    componentWillUnmount() {
        console.log(this.text + " killed")
    }

    componentDidMount() {
        let pos = Math.floor(Math.random() * 100)
        let comingFromSide = Math.floor(Math.random() * 4)
        switch (comingFromSide) {
            case 1:
                this.monsterStyle = {
                    left: 0,
                    top: `${pos}%`,
                };
                break;
            case 2:
                this.monsterStyle = {
                    right: 0,
                    top: `${pos}%`,
                };
                break;
            case 3:
                this.monsterStyle = {
                    top: 0,
                    right: `${pos}%`,
                };
                break;
            default:
                this.monsterStyle = {
                    bottom: 0,
                    right: `${pos}%`,
                };;
                break;
        }
    }

    // componentDidMount(){
    //     this.setState({ posX: this.monsterStyle.right})
    // }

    render() {
        return (
            <div
                className="Monster"
                style={this.monsterStyle}
            >
                <p style={{ top:"1em" }}>
                    {this.text}
                </p>
            </div>
        );
    }
}

export default Monster;