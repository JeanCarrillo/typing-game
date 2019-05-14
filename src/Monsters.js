import React, { Component } from 'react';
import Monster from './Monster';
import zombieright from './assets/zombie2-right.png';

class Monsters extends Component {
  constructor(props) {
    super(props);
    this.monstersGenerationSpeed = 1000;
    this.monsters = [];
    this.state = {
      monsters: [],
    }
  }

  componentDidMount() {
    this.gameRunning = setInterval(() => {
      this.gameLoop();
    }, 20);
    this.generatingMonsters = setInterval(() => {
      this.generateMonster();
    }, this.monstersGenerationSpeed);
  }

  gameLoop() {
    for (let i = 0; i < this.monsters.length; i += 1) {
      if (this.monsters[i] !== "") {
        this.monsters[i].move();
        if ((this.monsters[i].left > 48 && this.monsters[i].left < 52)
          && (this.monsters[i].top > 48 && this.monsters[i].top < 52)) {
          const { handleGameOver } = this.props;
          handleGameOver();
          clearInterval(this.generatingMonsters);
          clearInterval(this.gameLoop);
        }
      }
    }
    this.setState({ monsters: this.monsters })
  }

  increaseDifficulty() {
    // this.monstersGenerationSpeed -= 100;
  }

  generateMonster() {
    const { vocabulary } = this.props;
    if (vocabulary && vocabulary.length > 0) {
      const randomText = vocabulary[Math.floor(Math.random() * vocabulary.length)]
      if (randomText !== "") {
        let monster = new Monster(randomText);
        this.monsters.push(monster);
      }
    }
  }

  killMonster = (index) => {
    this.monsters[index] = "";
    this.monstersKilled += 1;
    // const { updateScore } = this.props;
    // updateScore(1);
  }

  render() {
    console.log(zombieright)
    return (
      <div>
        {
          this.monsters.map((monster, index) => (
            monster !== ""
              ? <div>
                <div
                  key={`monsterImg-${index + 1}`}
                  style={{
                    position: 'absolute',
                    zIndex: '3',
                    left: `${monster.left}%`,
                    top: `${monster.top}%`,
                    width: '10vw',
                    height: '10vw',
                    background: `url(${zombieright})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                  <p className='MonsterName'>{monster.text}</p>
                
              </div>

              : null
          ))
        }
      </div>
    );
  }
}

export default Monsters;