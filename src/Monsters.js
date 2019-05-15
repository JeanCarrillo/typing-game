import React, { Component } from 'react';
import Monster from './Monster';
// import zombie1right from './assets/zombie1-right.png';
// import zombie1left from './assets/zombie1-left.png';
// import zombie2right from './assets/zombie2-right.png';
// import zombie2left from './assets/zombie2-left.png';
function importAll(r) {
  return r.keys().map(r);
}
const zombie1 = importAll(require.context('./assets/Zombie1/animation/', false, /\.(png)$/));
const zombie2 = importAll(require.context('./assets/Zombie2/animation/', false, /\.(png)$/));
const zombie3 = importAll(require.context('./assets/Zombie3/animation/', false, /\.(png)$/));

class Monsters extends Component {
  constructor(props) {
    super(props);
    this.wordTyped = '';
    this.images = {
      'zombie1': zombie1,
      'zombie2': zombie2,
      'zombie3': zombie3,
    };
    this.monstersGenerationTime = Date.now();
    this.monstersGenerationSpeed = 2000;
    this.monsters = [];
    this.state = {
      monsters: [],
    }
  }

  componentDidMount() {
    this.gameRunning = setInterval(() =>
      this.gameLoop(), 50);
  }

  // componentWillReceiveProps(prevProps, prevState) {
  //   // const { wordTyped } = this.props;
  //   // this.monsters.find((monster, i) =>{
  //   //   if (monster.text === wordTyped){
  //   //     return this.monsters[i] = "";
  //   //   }
  //   //   return false;
  //   // })
  // }

  // killMonster = (index) => {
  //   this.monsters[index] = "";
  //   this.monstersKilled += 1;
  //   // const { updateScore } = this.props;
  //   // updateScore(1);
  // }

  gameLoop() {
    const now = Date.now();
    // Kill monster
    const { wordTyped, resetWordTyped } = this.props;
    if (wordTyped !== '') {
      let score = 0;
      this.monsters.find((monster, i) => {
        if (monster.text === wordTyped) {
          score += 1;
          return this.monsters[i].alive = false;
          // return this.monsters.splice(i, 1);
        }
        return false;
      });
      resetWordTyped(score);
    }
    // Monster generation call
    if (now - this.monstersGenerationTime > this.monstersGenerationSpeed) {
      this.monstersGenerationTime = Date.now();
      this.generateMonster();
      this.increaseDifficulty();
    }
    // Monsters move
    for (let i = 0; i < this.monsters.length; i += 1) {
      if (this.monsters[i] !== "") {
        this.monsters[i].move();
        if ((this.monsters[i].left > 48 && this.monsters[i].left < 52)
          && (this.monsters[i].top > 48 && this.monsters[i].top < 52)) {
          const { handleGameOver } = this.props;
          clearInterval(this.gameRunning);
          handleGameOver();
        }
      }
    }
    this.setState({ monsters: this.monsters })
  }

  increaseDifficulty() {
    this.monstersGenerationSpeed -= 10;
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

  render() {
    return (
      <div>
        {
          this.monsters.map((monster, index) => (
            <div
              key={`monsterImg-${index + 1}`}
              className='MonsterContainer'
              style={{
                left: `${monster.left}%`,
                top: `${monster.top}%`,
              }}>
              <img
                alt="Zombie"
                key={`monsterImg-${index + 1}`}
                className='Monster'
                src= {this.images[monster.img][monster.animation]}
                style={{
                  bottom: 0,
                  transform: `scaleX(${monster.direction})`,
                }}
              />
              <p className='MonsterName'>{monster.text}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Monsters;