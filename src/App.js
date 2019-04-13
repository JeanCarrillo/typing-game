import React, { Component } from 'react';
// import Player from './Player';
import Monsters from './Monsters';
import Type from './Type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // document.addEventListener("keydown", this.checkChar, false)
    this.vocabulary = ["test", "blabla", "hop", "zoup", "youpi", "coucou"];
    this.currentWords = [];
  }

  componentWillMount(){
    // TO DO : get words from API
  }

  getCurrentWords = (words) => {
    this.currentWords = words;
  }

  checkWordTyped = (word) => {
    for (let i = 0; i < this.currentWords.length; i++) {
      if (word === this.currentWords[i]) {
        console.log(this.currentWords)
        this.currentWords.slice(i, 1)
        console.log(this.currentWords)
        return <Monsters vocabulary={this.vocabulary} getCurrentWords={this.getCurrentWords} monsterKilled={i} />
      }
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Super typing game</h1>
        <Type checkWordTyped={this.checkWordTyped} />
        <div className="GameArea">
        {//  <Player />
        }
          <Monsters vocabulary={this.vocabulary} getCurrentWords={this.getCurrentWords} />
        </div>
      </div>
    );
  }
}

export default App;
