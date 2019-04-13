import React, { Component } from 'react';
import Player from './Player';
import Monster from './Monster';
import Type from './Type';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    // document.addEventListener("keydown", this.checkChar, false)
    this.vocabulary = ["test", "blabla", "hop", "zoup", "youpi", "coucou"];
    this.state = {
      words: [],
      monstersKilled: 0,
    }
  }

  componentDidMount() {
    // TO DO : get words from API
    setInterval(() => this.generateMonster(), 1000)
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

  render() {
    console.log("parent render")
    const { words, monstersKilled } = this.state;
    return (
      <div className="App">
        <div className="GameArea">
        <p className="Score">Monsters Killed : {monstersKilled}</p>
        <Type checkWordTyped={this.checkWordTyped} />
          <Player />
          {
            words.map((word, wordIndex) => (
              words[wordIndex]!== "" ?
              <Monster text={word} key={`monsterId-${wordIndex}`} />
              : null
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
