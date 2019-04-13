import React, { Component } from 'react';

class Monster extends Component {
    constructor(props) {
        super(props);
        const { text } = this.props;
        this.text = text;
        // Monster is coming from :
        const pos = Math.floor(Math.random() * 100);
        const comingFromSide = Math.floor(Math.random() * 4);
        switch (comingFromSide) {
            // left
            case 1:
                this.monsterStyle = {
                    left: "0%",
                    top: `${pos}%`,
                };
                break;
            // right
            case 2:
                this.monsterStyle = {
                    left: "100%",
                    top: `${pos}%`,
                };
                break;
            // top
            case 3:
                this.monsterStyle = {
                    top: "0%",
                    left: `${pos}%`,
                };
                break;
            // bottom
            default:
                this.monsterStyle = {
                    top: "100%",
                    left: `${pos}%`,
                };
                break;
        }
        this.state = {
            monsterStyle: this.monsterStyle,
        }
    }

    componentWillUnmount() {
        console.log(this.text + " killed")
    }

    componentDidMount() {
        setInterval(() => {
            this.move();
        }, 1000)
    }

    move(){
        let { monsterStyle } = this.state;
        let newMonsterStyle = {...monsterStyle}
        let top = parseInt(newMonsterStyle.top.slice(0, -1))
        if (top < 50){
            if (top + 5 > 50){
                top = 50
            }
            top += 5
        } else {
            if (top - 5 < 50){
                top = 50
            }
            top -= 5
        }
        let left = parseInt(newMonsterStyle.left.slice(0, -1))
        if (left < 50){
            if (left + 5 > 50){
                left = 50
            }
            left += 5
        } else {
            if (left - 5 < 50){
                left = 50
            }
            left -= 5
        }
        newMonsterStyle = {
            top: `${top}%`,
            left: `${left}%`,
        }
        this.setState({ monsterStyle: newMonsterStyle })
    }


    render() {
        const { monsterStyle } = this.state;
        return (
            <div 
            className="Monster"
            style={monsterStyle}
            >
                <div
                    className="MonsterImg"
                />
                <p style={{}}>
                    {this.text}
                </p>
            </div>
        );
    }
}

export default Monster;