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

    componentWillMount() {
    }

    componentDidMount() {
        setInterval(() => {
            this.move();
        }, 200)
    }

    move(){
        const { checkGameOver } = this.props;
        let { monsterStyle } = this.state;
        let newMonsterStyle = {...monsterStyle}
        let top = parseInt(newMonsterStyle.top.slice(0, -1))
        const speed = 1;
        if (top < 50){
            if (top + speed > 50){
                top = 50
            }
            top += speed
        } else {
            if (top - speed < 50){
                top = 50
            }
            top -= speed
        }
        let left = parseInt(newMonsterStyle.left.slice(0, -1))
        if (left < 50){
            if (left + speed > 50){
                left = 50
            }
            left += speed
        } else {
            if (left - speed < 50){
                left = 50
            }
            left -= speed
        }
        newMonsterStyle = {
            top: `${top}%`,
            left: `${left}%`,
        }
        this.setState({ monsterStyle: newMonsterStyle })
        if ( top === 50 && left === 50){
            checkGameOver(true);
        }
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