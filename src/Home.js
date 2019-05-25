import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Monster from './Monster';
import Scores from './Scores';
import CoopLobbies from './CoopLobbies';

function importAll(r) {
  return r.keys().map(r);
}

const zombie1 = importAll(require.context('./assets/Zombie1/animation/', false, /\.(png)$/));
const zombie2 = importAll(require.context('./assets/Zombie2/animation/', false, /\.(png)$/));
const zombie3 = importAll(require.context('./assets/Zombie3/animation/', false, /\.(png)$/));
const troll1 = importAll(require.context('./assets/Troll1/animation/', false, /\.(png)$/));
const troll2 = importAll(require.context('./assets/Troll2/animation/', false, /\.(png)$/));
const troll3 = importAll(require.context('./assets/Troll3/animation/', false, /\.(png)$/));

const images = {
  'zombie1': zombie1,
  'zombie2': zombie2,
  'zombie3': zombie3,
  'troll1': troll1,
  'troll2': troll2,
  'troll3': troll3,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.monsters = [];
    this.monstersGenerationTime = Date.now();
    this.monstersGenerationSpeed = 3000;
    this.state = {
      displayCoopMenu: false,
      leaderboard: false,
    };
  }

  componentDidMount() {
    let monster = new Monster('', ['zombie']);
    this.monsters.push(monster);
    this.homeLoop = setInterval(() =>
      this.loop(), 40);
  }

  componentWillUnmount() {
    clearInterval(this.homeLoop);
  }

  resetMenu = () => {
    this.setState({
      displayCoopMenu: false,
      leaderboard: false,
    })
  }

  menuDisplay() {
    const { leaderboard, displayCoopMenu } = this.state;
    const mainMenu = <div>
      <div className="buttonsContainer">
        <Link to="/Solo">
          <button>
            Solo
          </button>
        </Link>
        <button disabled={true} onClick={() => this.setState({ displayCoopMenu: true, leaderboard: false })}>
          Online Coop
        </button>
        <button onClick={() => this.setState({ leaderboard: !leaderboard })}>
          Leaderboard
        </button>
      </div>
      <p style={{ position: 'absolute', top: '48%', left: '46%', fontSize: '1.3vw', zIndex: 10 }}>Coming soon!</p>
      {
        leaderboard ?
          <Scores />
          : null
      }
    </div>
    if (displayCoopMenu) {
      return <CoopLobbies resetMenu={this.resetMenu} />
    } else {
      return mainMenu;
    }
  }

  loop() {
    const now = Date.now();
    if (now - this.monstersGenerationTime > this.monstersGenerationSpeed) {
      this.monstersGenerationTime = Date.now();
      this.generateMonster();
    }
    // Monsters move
    for (let i = 0; i < this.monsters.length; i += 1) {
      this.monsters[i].move();
    }
    this.cleanMonsters();
    this.setState({ refresh: true });
  }

  generateMonster() {
    let rdmType = Math.ceil(Math.random() * 100);
    const rdmDirX = Math.ceil(Math.random() * 90 + 10);
    const rdmDirY = Math.ceil(Math.random() * 90 + 10);
    if (rdmType < 90) {
      rdmType = "zombie";
    } else {
      rdmType = "troll";
    }
    let monster = new Monster(null, rdmType, rdmDirX, rdmDirY);
    this.monsters.push(monster);
  }

  cleanMonsters() {
    for (let i = 0; i < this.monsters.length; i += 1) {
      // Monster out of map
      if (this.monsters[i].left < -20
        || this.monsters[i].left > 120
        || this.monsters[i].top < -20
        || this.monsters[i].top > 120) {
        this.monsters.splice(i, 1);
      }
    }
  }

  render() {
    const { displayCoopMenu } = this.state;
    return (
      <div className="Home">
        <h1 className="homeTitle">Typing game</h1>
        {
          this.menuDisplay()
        }
        {
          displayCoopMenu ?
          <button className="BackButton" onClick={this.resetMenu}>Back</button>
          : null
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
                src={images[monster.img][monster.animation]}
                style={{
                  maxWidth: `${monster.sizeX}vw`,
                  maxHeight: `${monster.sizeY}vw`,
                  transform: `scaleX(${monster.direction})`,
                }}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Home;
