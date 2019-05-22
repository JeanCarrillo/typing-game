import React, { Component } from 'react';
import Monster from './Monster';
import Player from './Player';
import Projectile from './Projectile';
import arrow from './assets/Archer/Arrow.png';
import withFirebaseContext from './Firebase/withFirebaseContext';

function importAll(r) {
  return r.keys().map(r);
}

const archerStand = importAll(require.context('./assets/Archer/Stand/', false, /\.(png)$/));
const archerShot = importAll(require.context('./assets/Archer/Shot/', false, /\.(png)$/));
const zombie1 = importAll(require.context('./assets/Zombie1/animation/', false, /\.(png)$/));
const zombie2 = importAll(require.context('./assets/Zombie2/animation/', false, /\.(png)$/));
const zombie3 = importAll(require.context('./assets/Zombie3/animation/', false, /\.(png)$/));
const troll1 = importAll(require.context('./assets/Troll1/animation/', false, /\.(png)$/));
const troll2 = importAll(require.context('./assets/Troll2/animation/', false, /\.(png)$/));
const troll3 = importAll(require.context('./assets/Troll3/animation/', false, /\.(png)$/));

class CoopGameLoop extends Component {
  constructor(props) {
    super(props);
    this.host = props.host;
    this.gameKey = props.gameKey;
    if (this.host === true) {
      this.minWordLength = 3;
      this.maxWordLength = this.minWordLength + 4;
      this.monstersGenerationTime = Date.now();
      this.monstersGenerationSpeed = 3000;
    }
    this.players = [];
    const player = new Player('archer');
    this.players.push(player);
    this.monsters = [];
    this.projectiles = [];
    this.word = '';
    this.images = {
      'archer': {
        'shooting': archerShot,
        'standing': archerStand,
      },
      'zombie1': zombie1,
      'zombie2': zombie2,
      'zombie3': zombie3,
      'troll1': troll1,
      'troll2': troll2,
      'troll3': troll3,
    };
    this.state = {
      // players: this.players,
      // monsters: [],
      // projectiles: [],
      word: '',
    }
  }

  componentDidMount() {
    this.gameRunning = setInterval(() =>
      this.gameLoop(), 40);
  }

  componentWillUnmount() {
    clearInterval(this.gameRunning);
  }

  gameLoop() {
    this.shoot();
    if (this.host === true) {
      this.checkCollisions();
      // Monster generation call
      const now = Date.now();
      if (now - this.monstersGenerationTime > this.monstersGenerationSpeed) {
        this.monstersGenerationTime = Date.now();
        this.generateMonster();
        this.increaseDifficulty();
      }
      // Monsters move
      for (let i = 0; i < this.monsters.length; i += 1) {
        if (this.monsters[i] !== "") {
          this.monsters[i].move();
          if ((this.monsters[i].left > this.players[0].posX - 2 && this.monsters[i].left < this.players[0].posX + 2)
            && (this.monsters[i].top > this.players[0].posY - 2 && this.monsters[i].top < this.players[0].posY + 2)) {
            this.players[0].alive = false;
            const { handleGameOver } = this.props;
            clearInterval(this.gameRunning);
            handleGameOver();
          }
        }
      }
      // Projectiles move
      for (let i = 0; i < this.projectiles.length; i += 1) {
        this.projectiles[i].move();
      }
    }
    // Players actions
    for (let i = 0; i < this.players.length; i += 1) {
      this.players[i].action();
    }
    if (this.host === true) {
      const { updateGame } = this.props;
      updateGame(this.gameKey, this.monsters, this.projectiles, this.players);
    }
    if (this.host === false) {
      const { currentGame } = this.props;
      // this.players = currentGame.players ? currentGame.players : [];
      this.monsters = currentGame.monsters ? currentGame.monsters : [];
      this.projectiles = currentGame.projectiles ? currentGame.projectiles : [];
    }
    this.setState({
      refresh: true,
    });
  }

  checkCollisions() {
    for (let i = 0; i < this.projectiles.length; i += 1) {
      for (let j = 0; j < this.monsters.length; j += 1) {
        // Collision with alive monster
        if (this.monsters[j].alive === true) {
          if ((this.projectiles[i].top > this.monsters[j].top - 2 && this.projectiles[i].top < this.monsters[j].top + 2)
            && (this.projectiles[i].left > this.monsters[j].left - 2 && this.projectiles[i].left < this.monsters[j].left + 2)) {
            const score = 1;
            const { updateScore } = this.props;
            updateScore(score);
            this.projectiles.splice(i, 1);
            this.monsters[j].text.splice(0, 1);
            if (this.monsters[j].text.length === 0) {
              this.monsters[j].updateStatus('dying');
              return this.monsters[j].alive = false;
            } else {
              return this.monsters[j].updateStatus('hurt');
            }
          }
        }
      }
      // Projectile out of map
      if (this.projectiles[i].left < -10
        || this.projectiles[i].left > 110
        || this.projectiles[i].top < -10
        || this.projectiles[i].top > 110) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  shoot() {
    const { word } = this.state;
    if (word !== '') {
      this.monsters.find((monster, i) => {
        for (let j = 0; j < monster.text.length; j += 1) {
          if (monster.alive === true) {
            if (monster.text[j].toLowerCase() === word.toLowerCase()) {
              this.setState({ word: "" });
              let direction;
              monster.left > 50 ? direction = 1 : direction = -1;
              this.players[0].updateStatus("shooting", direction);
              if (this.host === true) {
              let projectile = new Projectile('arrow', monster.left, monster.top);
              this.projectiles.push(projectile);
              } 
              // else {
              //   const { updateGame } = this.props;
              //   updateGame(this.gameKey, this.monsters, this.projectiles, this.players, this.host);
              // }
            }
          }
        }
        return false;
      });
    }
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
    let text = [];
    if (rdmType === "zombie") {
      text = [this.getWord()];
    }
    if (rdmType === "troll") {
      text = [this.getWord(), this.getWord(), this.getWord()];
    }
    if (text) {
      let monster = new Monster(text, rdmType);
      this.monsters.push(monster);
    }
  }

  getWord() {
    const { words } = this.props;
    const rdmLength = Math.floor(Math.random() * this.maxWordLength) + this.minWordLength;
    return words[rdmLength][Math.floor(Math.random() * words[rdmLength].length)];
  }

  handleChange = (event) => {
    this.setState({ word: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ word: "" });
  }

  render() {
    const { word } = this.state;
    return (
      <div>
        {
          this.players.map((player, i) => (
            <div
              key={`player-${i + 1}`}
              className='PlayerContainer'
              style={{
                top: `${player.posY - 4}%`,
                left: `${player.posX - 4}%`,
              }}>
              <img
                className='PlayerImg'
                alt='Player'
                src={this.images[player.type][player.status][player.animation]}
                style={{
                  transform: `scaleX(${player.direction})`,
                }}
              />
              {
                player.alive
                  ? <div className="Type">
                    <form onSubmit={this.handleSubmit}>
                      <input className="TypeTextBox" type="text" autoFocus={true} value={word} onChange={this.handleChange} />
                      <input type="submit" value="Submit" style={{ display: "none" }} />
                    </form>
                  </div>
                  : null
              }
            </div>
          ))
        }
        {
          this.monsters.map((monster, i) => (
            <div
              key={`monsterImg-${i + 1}`}
              className='MonsterContainer'
              style={{
                left: `${monster.left}%`,
                top: `${monster.top}%`,
              }}>
              <img
                alt="Monster"
                key={`monsterImg-${i + 1}`}
                className='Monster'
                src={this.images[monster.img][monster.animation]}
                style={{
                  maxWidth: `${monster.sizeX}vw`,
                  maxHeight: `${monster.sizeY}vw`,
                  transform: `scaleX(${monster.direction})`,
                }}
              />
              {
                monster.alive
                  ? <p className='MonsterName'>
                    {
                      monster.text.map((word, i) => (
                        <span key={`wordIndex-${i + 1}`}>
                          {word}
                          {' '}
                        </span>
                      ))
                    }
                  </p>
                  : null
              }
            </div>
          ))
        }
        {
          this.projectiles.map((projectile, i) => (
            <div
              key={`projectile-${i + 1}`}
              className='ProjectileContainer'
              style={{
                top: `${projectile.top}%`,
                left: `${projectile.left}%`,
                transform: `rotate(${-projectile.angle}deg)`,
              }}>
              <img
                className='ProjectileImg'
                alt='Projectile'
                src={arrow}
                style={{
                  maxWidth: '2vw',
                  maxHeight: '2vw',
                }}
              />
            </div>
          ))
        }
      </div >
    );
  }
}

export default withFirebaseContext(CoopGameLoop);