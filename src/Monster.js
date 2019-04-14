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
        // Calculate speedX and speedY (distance per step)
        let posX = parseFloat(this.monsterStyle.left.slice(0, -1));
        let posY = parseFloat(this.monsterStyle.top.slice(0, -1));
        let directionX = 50 - posX;
        let directionY = 50 - posY;
        let len = Math.sqrt(directionX * directionX + directionY * directionY);
        directionX /= len;
        directionY /= len;
        // Adjust speed here (distance per step)
        this.speedX = directionX * 0.1
        this.speedY = directionY * 0.1
        // Moving speed (setInterval): one step every this.moveInterval ms
        this.moveInterval = 100;
        this.state = {
            monsterStyle: this.monsterStyle,
        }
    }

    componentWillMount() {
        this.gameRunning = setInterval(() => {
            this.move();
        }, this.moveInterval);
    }

    move() {
        const { checkGameOver } = this.props;
        let { monsterStyle } = this.state;
        let newMonsterStyle = { ...monsterStyle };
        let top = parseFloat(newMonsterStyle.top.slice(0, -1));
        let left = parseFloat(newMonsterStyle.left.slice(0, -1));
        if ((left >= 48 && left <= 52) && (top >= 48 && top <= 52)) {
            checkGameOver(true);
        } else {
            top += this.speedY;
            left += this.speedX;
        }
        newMonsterStyle = {
            top: `${top}%`,
            left: `${left}%`,
        };
        this.setState({ monsterStyle: newMonsterStyle });
    }


    render() {
        const { monsterStyle } = this.state;
        return (
            <div
                className="Monster"
                style={monsterStyle}
            >
                <div className="MonsterImg" />
                <p className="MonsterName">
                    {this.text}
                </p>
            </div>
        );
    }
}

export default Monster;