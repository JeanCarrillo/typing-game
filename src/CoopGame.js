import React, { Component } from 'react';
import GameOver from './GameOver';
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
    const { currentGame } = this.props;
    this.players = [];
    console.log(currentGame)
    for (let i = 0; i < currentGame.players; i += 1) {
      const player = new Player('archer', 48 + i, 39, currentGame.players[i].name);
      this.players.push(player);
    }
    this.monsters = currentGame.monsters;
    this.projectiles = currentGame.projectiles;
    this.state = {
      word: '',
      score: 0,
      gameover: false,
    }
  }

  componentDidMount() {
    this.game = setInterval(() =>
      this.gameLoop(), 40);
  }

  updateScore = (score) => {
    let { monstersKilled } = this.state;
    this.setState({
      monstersKilled: monstersKilled += score,
    });
  }

  handleGameOver = () => {
    this.setState({ gameover: true });
    clearInterval(this.game);
  }

  gameLoop() {
    const { currentGame } = this.props;
    const now = Date.now();
    this.shoot();
    this.checkCollisions();
    // Monsters move
    for (let i = 0; i < this.monsters.length; i += 1) {
      if (this.monsters[i].status !== 'dying'
        && this.monsters[i].status !== 'hurt') {
        this.monsters[i].move();
      }
    }
    // Projectiles move
    if (this.projectiles) {
      for (let i = 0; i < this.projectiles.length; i += 1) {
        this.projectiles[i].move();
      }
    }
    // Players actions
    for (let i = 0; i < this.players.length; i += 1) {
      this.players[i].action();
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
              monster.left > this.players[this.playerNum].posX ? direction = 1 : direction = -1;
              this.players[this.playerNum].updateStatus("shooting", direction);
              let projectile = new Projectile('arrow', monster.left, monster.top, this.players[this.playerNum].posX, this.players[this.playerNum].posY);
              this.projectiles.push(projectile);
              const { clientAction } = this.props;
              clientAction(this.gameKey, projectile);

            }
          }
        }
        return false;
      });
    }
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
