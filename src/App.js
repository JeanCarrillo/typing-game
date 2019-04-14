import React, { Component } from 'react';
import Player from './Player';
import Monster from './Monster';
import Type from './Type';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    // document.addEventListener("keydown", this.checkChar, false)
    this.vocabulary = [];
    this.state = {
      words: [],
      monstersKilled: 0,
      gameover: false,
    }
  }

  componentWillMount() {
    fetch('https://api.datamuse.com/words?ml=computer')
      .then(results => results.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i)) {
              this.vocabulary.push(data[i].word)
          }
        }
      });
  }
  
  componentDidMount() {
    this.gameRunning = setInterval(
      () => this.generateMonster(),
      1000)
  }

  generateMonster() {
    const { words } = this.state;
    words.push(this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)]);
    this.setState({ words });
  }

  checkWordTyped = (word) => {
    let { words, monstersKilled } = this.state;
    let index = words.indexOf(word);
    if (index !== -1) {
      words[index] = "";
      monstersKilled++
    }
    this.setState({ words, monstersKilled })
  }

  checkGameOver = (value) => {
    if (value) {
      this.setState({ gameover: true })
      clearInterval(this.gameRunning)
    }
  }

  render() {
    const { words, monstersKilled, gameover } = this.state;
    return (
      <div className="App">
        <div className="GameArea">
          <p className="Score">Monsters Killed : {monstersKilled}</p>
          <Type checkWordTyped={this.checkWordTyped} />
          <Player />
          {
            words.map((word, wordIndex) => (
              words[wordIndex] !== "" ?
                <Monster text={word} key={`monsterId-${wordIndex}`} checkGameOver={this.checkGameOver} />
                : null
            ))
          }
          {
            gameover ?
              <p style={{ top: "10%", left: "40%", fontSize: "4em", color: "red" }}>
                GAME OVER<br></br>
                Score: {monstersKilled}
              </p>
              : null
          }
        </div>
      </div>
    );
  }
}

export default App;