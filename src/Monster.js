import React, { Component } from 'react';

class Monster extends Component {
    constructor(props) {
        super(props);
        const { text } = this.props;
        this.text = text;
        // Moving speed (setInterval): one step every this.speed ms
        this.speed = 100;
        // Monster is coming from :
        const pos = Math.floor(Math.random() * 100);
        const comingFromSide = Math.floor(Math.random() * 4);
        switch (comingFromSide) {
            // left
            case 1:
                this.monsterStyle = {
                    left: "-10%",
                    top: `${pos}%`,
                };
                break;
            // right
            case 2:
                this.monsterStyle = {
                    left: "110%",
                    top: `${pos}%`,
                };
                break;
            // top
            case 3:
                this.monsterStyle = {
                    top: "-10%",
                    left: `${pos}%`,
                };
                break;
            // bottom
            default:
                this.monsterStyle = {
                    top: "110%",
                    left: `${pos}%`,
                };
                break;
        }
        this.state = {
            monsterStyle: this.monsterStyle,
        }
    }

    componentWillMount() {
        this.gameRunning = setInterval(() => {
            this.move();
        }, this.speed)
    }

    move(){
        const { checkGameOver } = this.props;
        let { monsterStyle } = this.state;
        let newMonsterStyle = {...monsterStyle}
        let top = parseFloat(newMonsterStyle.top.slice(0, -1))
        let left = parseFloat(newMonsterStyle.left.slice(0, -1))
        // adjust percent per move ("steps")
        const speed = 0.1;
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
                <p className="MonsterName">
                    {this.text}
                </p>
            </div>
        );
    }
}

export default Monster;