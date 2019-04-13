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
    this.words = [];
  }

  componentWillMount(){
    // TO DO : get words from API
    setInterval(() => this.generateMonster(), 3000)
}


  generateMonster() {
    this.words.push(this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)])
    console.log("parent " + this.words)
}  

  checkWordTyped = (word) => {
    let index = this.words.indexOf(word);
    if (index !== -1) this.words.splice(index, 1);
    console.log(this.words)
  }

  render() {
    return (
      <div className="App">
        <h1>Super typing game</h1>
        <Type checkWordTyped={this.checkWordTyped} />
        <div className="GameArea">
        {//  <Player />
        }
          <Monsters words={this.words} />
        </div>
      </div>
    );
  }
}

export default App;
