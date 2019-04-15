import React, { Component } from 'react';
import Player from './Player';
import Monster from './Monster';
import Type from './Type';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    // TO DO: abilities, stuff to do etc. with F1, F2... keys
    // document.addEventListener("keydown", this.checkChar, false)
    //
    // // Difficult setting: monster generated every this.monsterSpeedGeneration ms
    this.monsterSpeedGeneration = 1000;
    this.state = {
      words: [],
      monstersKilled: 0,
      gameover: false,
    }
  }

  componentWillMount() {
    // Gets vocabulary from API
    //
    this.vocabulary = [];
    fetch('https://api.datamuse.com/words?ml=computer')
    .then(results => results.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i) && data.hasOwnProperty(i) !== "") {
          this.vocabulary.push(data[i].word)
        }
      }
    });
    // Vocabulary list for my nephew ;-)
    // this.vocabulary = ["Mario", "Zelda", "Olivier", "Géraldine", "Simon", "Mamounette", 
    // "Amandine", "Philippe", "Lucille", "weekend", "guitare", "batterie", "flute", "harpe", 
    // "saxophone", "Luigi", "Yoshi","Bowser", "Jano", "lapin", "Nintendo", "jeu", "anniversaire", 
    // "ordinateur", "fleur", "Stéphanie", "raquette", "abeille", "bourdon", "frelon", "chat", 
    // "courgette", "carotte", "concombre", "ketchup", "pizza", "burger", "rythme", "baguette", 
    // "rhododendron", "chenapan","école", "devoirs", "mayonnaise", "zombie", "cerveau", "pistolet", 
    // "nerf", "funiculaire","anticonstitutionnellement", "ratatouille", "jardin", "cacahuète", 
    // "dinosaure", "Lego", "cowboy"]
  }
  componentDidMount() {
    this.gameRunning = setInterval(
      () => this.generateMonster()
      , this.monsterSpeedGeneration);
  }

  generateMonster() {
    const { words } = this.state;
    words.push(this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)]);
    this.setState({ words });
  }

  checkWordTyped = (word) => {
    const { gameover } = this.state;
    if (gameover === false) {
      let { words, monstersKilled } = this.state;
      let index = words.indexOf(word);
      if (index !== -1) {
        words[index] = "";
        monstersKilled++;
      }
      this.setState({ words, monstersKilled });
    }
  }

  checkGameOver = (value) => {
    if (value) {
      this.setState({ gameover: true });
      clearInterval(this.gameRunning);
    };
  }

  render() {
    console.log("render")
    const { words, monstersKilled, gameover } = this.state;
    return (
      <div className="App">
        <div className="GameArea">
          <p className="Score">Zombies killed : {monstersKilled}</p>
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
              <p className="GameOver">
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
