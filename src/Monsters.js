import React, { Component } from 'react';
import Monster from './Monster';

function importAll(r) {
  return r.keys().map(r);
}
const zombie1 = importAll(require.context('./assets/Zombie1/animation/', false, /\.(png)$/));
const zombie2 = importAll(require.context('./assets/Zombie2/animation/', false, /\.(png)$/));
const zombie3 = importAll(require.context('./assets/Zombie3/animation/', false, /\.(png)$/));
const troll1 = importAll(require.context('./assets/Troll1/animation/', false, /\.(png)$/));
const troll2 = importAll(require.context('./assets/Troll2/animation/', false, /\.(png)$/));
const troll3 = importAll(require.context('./assets/Troll3/animation/', false, /\.(png)$/));

class Monsters extends Component {
  constructor(props) {
    super(props);
    this.minWordLength = 3;
    this.maxWordLength = this.minWordLength + 4;
    // Temp values for player, will be variables if player moves someday
    this.playerPosX = 48;
    this.playerPosY = 40;
    this.wordTyped = '';
    this.images = {
      'zombie1': zombie1,
      'zombie2': zombie2,
      'zombie3': zombie3,
      'troll1': troll1,
      'troll2': troll2,
      'troll3': troll3,
    };
    this.monstersGenerationTime = Date.now();
    this.monstersGenerationSpeed = 3000;
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
        if (monster.text.toLowerCase() === wordTyped.toLowerCase()) {
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
        if ((this.monsters[i].left > this.playerPosX - 2 && this.monsters[i].left < this.playerPosX + 2)
          && (this.monsters[i].top > this.playerPosY - 2 && this.monsters[i].top < this.playerPosX + 2)) {
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
    let rdmType = Math.ceil(Math.random() * 100);
    if (rdmType < 80) {
      rdmType = "zombie";
    } else {
      rdmType = "troll";
    }
    if (rdmType === "zombie") {
      this.text = this.getWord();
    }
    if (rdmType === "troll") {
      this.text = this.getWord() + ' ' + this.getWord() + ' ' + this.getWord();
    }
    if (this.text && this.text !== "") {
      let monster = new Monster(this.text, rdmType);
      this.monsters.push(monster);
    }
  }

  getWord() {
    const { words } = this.props;
    const rdmLength = Math.floor(Math.random() * this.maxWordLength) + this.minWordLength;
    return words[rdmLength][Math.floor(Math.random() * words[rdmLength].length)];
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
                src={this.images[monster.img][monster.animation]}
                style={{
                  bottom: 0,
                  transform: `scaleX(${monster.direction})`,
                }}
              />
              {
                monster.alive
                  ? <p className='MonsterName'>{monster.text}</p>
                  : null
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default Monsters;