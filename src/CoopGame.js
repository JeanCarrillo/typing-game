import React, { Component } from 'react';
// import axios from 'axios';
import GameOver from './GameOver';
// import Type from './Type';
import wordsfr from './wordsfr.js';
import withFirebaseContext from './Firebase/withFirebaseContext';
import Monster from './Monster';
import Player from './Player';
import Projectile from './Projectile';
import arrow from './assets/Archer/Arrow.png';

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

const images = {
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

class CoopGame extends Component {
  constructor(props) {
    super(props);
    this.playerNum = props.playerNum;
    this.host = props.host;
    this.name = props.name;
    this.gameKey = props.gameKey;
    const listenGameData = props.listenGameData;
    listenGameData(this.gameKey);
    this.players = [];
    if (this.host) {
      this.vocabulary = wordsfr;
      this.words = {};
      for (let i = 0; i < this.vocabulary.length; i += 1) {
        if (this.vocabulary[i] !== "" && this.vocabulary[i].length > 2) {
          if (!this.words[this.vocabulary[i].length]) {
            this.words[this.vocabulary[i].length] = [];
          }
          this.words[this.vocabulary[i].length].push(this.vocabulary[i]);
        }
      }
      this.minWordLength = 3;
      this.maxWordLength = this.minWordLength + 4;
      this.monstersGenerationTime = Date.now();
      this.monstersGenerationSpeed = 3000;
      this.networkRefreshTime = Date.now();
      this.networkRefreshSpeed = 0;
      const player1 = new Player('archer', 0, this.name, 48, 39);
      const player2 = new Player('archer', 1, 'test', 52, 39);
      this.players.push(player1);
      this.players.push(player2);
    } else {
      const player1 = new Player('archer', 0, 'test', 48, 39);
      const player2 = new Player('archer', 1, this.name, 52, 39);
      this.players.push(player1);
      this.players.push(player2);
    }
    this.monsters = [];
    this.projectiles = [];
    this.word = '';
    this.state = {
      word: '',
      wordTyped: "",
      monstersKilled: 0,
      gameover: false,
    }
  }

  componentDidMount() {
    this.gameRunning = setInterval(() =>
      this.gameLoop(), 40);
  }

  componentWillUnmount() {
    clearInterval(this.gameRunning);
  }

  updateScore = (score) => {
    let { monstersKilled } = this.state;
    this.setState({
      monstersKilled: monstersKilled += score,
    });
  }

  handleGameOver = () => {
    this.setState({ gameover: true });
    clearInterval(this.gameRunning);
  }

  gameLoop() {
    const { currentGame } = this.props;
    const now = Date.now();
    this.shoot();
    if (this.host) {
      this.checkCollisions();
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
          if ((this.monsters[i].left > this.players[0].posX - 2 && this.monsters[i].left < this.players[0].posX + 2)
            && (this.monsters[i].top > this.players[0].posY - 2 && this.monsters[i].top < this.players[0].posY + 2)) {
            this.players[0].alive = false;
            clearInterval(this.gameRunning);
            this.handleGameOver();
          }
        }
      }
      // Projectiles move
      if (this.projectiles) {
        for (let i = 0; i < this.projectiles.length; i += 1) {
          this.projectiles[i].move();
        }
      }
    }
    // Players actions
    for (let i = 0; i < this.players.length; i += 1) {
      this.players[i].action();
    }
    if (this.host
      && (now - this.networkRefreshTime > this.networkRefreshSpeed)) {
      this.networkRefreshTime = Date.now();
      const { updateGame, clearTempProjectiles } = this.props;
      if (currentGame.tempProjectiles) {
        for (let i = 0; i < currentGame.tempProjectiles.length; i += 1) {
          const projectile = new Projectile('arrow', null, null, currentGame.tempProjectiles[i]);
          this.projectiles.push(projectile);
        }
        clearTempProjectiles(this.gameKey);
      }
      updateGame(this.gameKey, this.monsters, this.projectiles, this.players);
    }
    if (!this.host) {
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
            this.updateScore(score);
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
        if (monster.text && monster.alive) {
          for (let j = 0; j < monster.text.length; j += 1) {
            if (monster.text[j].toLowerCase() === word.toLowerCase()) {
              this.setState({ word: "" });
              let direction;
              monster.left > 50 ? direction = 1 : direction = -1;
              this.players[this.playerNum].updateStatus("shooting", direction);
              let projectile = new Projectile('arrow', monster.left, monster.top);
              if (this.host === true) {
                this.projectiles.push(projectile);
              } else {
                const { clientAction } = this.props;
                clientAction(this.gameKey, projectile);
              }
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
    const rdmLength = Math.floor(Math.random() * this.maxWordLength) + this.minWordLength;
    return this.words[rdmLength][Math.floor(Math.random() * this.words[rdmLength].length)];
  }

  handleChange = (event) => {
    this.setState({ word: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ word: "" });
  }

  render() {
    const { monstersKilled, gameover, word } = this.state;
    return (
      <div className="App">
        <div className="GameArea">
          {
            gameover ?
              <GameOver score={monstersKilled} />
              : <div>
                <p className="Score">Score : {monstersKilled}</p>
              </div>
          }
          {
            this.players && this.players.map((player, i) => (
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
                  src={images[player.type][player.status][player.animation]}
                  style={{
                    transform: `scaleX(${player.direction})`,
                  }}
                />
                {
                  i === this.playerNum && player.alive
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
            this.monsters && this.monsters.map((monster, i) => (
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
                  src={images[monster.img][monster.animation]}
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
            this.projectiles && this.projectiles.map((projectile, i) => (
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
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(CoopGame);
