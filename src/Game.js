import React, { Component } from 'react';
// import axios from 'axios';
import GameLoop from './GameLoop';
import GameOver from './GameOver';
import { FirebaseContext } from './Firebase';
// import Type from './Type';
import wordsfr from './wordsfr.js';

class Game extends Component {
  constructor(props) {
    super(props);
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
    this.state = {
      wordTyped: "",
      monstersKilled: 0,
      gameover: false,
    }
  }

  // componentWillMount() {
  // //  Gets vocabulary from API

  //   this.vocabulary = [];
  //   axios.get('https://api.datamuse.com/words?ml=computer')
  //   .then((data) => {
  //     for (let i = 0; i < data.data.length; i++) {
  //       if (data.data && data.data[i].word !== "") {
  //         this.vocabulary.push(data.data[i].word)
  //       }
  //     }
  //   });
  // // Vocabulary list for my nephew ;-)
  // // this.vocabulary = ["Mario", "Zelda", "Olivier", "Géraldine", "Simon", "Mamounette", 
  // // "Amandine", "Philippe", "Lucille", "weekend", "guitare", "batterie", "flute", "harpe", 
  // // "saxophone", "Luigi", "Yoshi","Bowser", "Jano", "lapin", "Nintendo", "jeu", "anniversaire", 
  // // "ordinateur", "fleur", "Stéphanie", "raquette", "abeille", "bourdon", "frelon", "chat", 
  // // "courgette", "carotte", "concombre", "ketchup", "pizza", "burger", "rythme", "baguette", 
  // // "rhododendron", "chenapan","école", "devoirs", "mayonnaise", "zombie", "cerveau", "pistolet", 
  // // "nerf", "funiculaire","anticonstitutionnellement", "ratatouille", "jardin", "cacahuète", 
  // //  "dinosaure", "Lego", "cowboy"]
  // }


  // checkWordTyped = (word) => {
  //   const { gameover } = this.state;
  //   if (gameover === false) {
  //     this.setState({ wordTyped: word });
  //   }
  // }

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

  render() {
    const { monstersKilled, gameover } = this.state;
    return (
      <div className="App">
        <div className="GameArea">
          {
            gameover ?
              <FirebaseContext.Consumer>
                {firebase => <GameOver score={monstersKilled} firebase={firebase} />}
              </FirebaseContext.Consumer>
              : <div>
                <p className="Score">Score : {monstersKilled}</p>
              </div>
          }
          <GameLoop updateScore={this.updateScore} handleGameOver={this.handleGameOver} words={this.words} />
        </div>
      </div>
    );
  }
}

export default Game;
