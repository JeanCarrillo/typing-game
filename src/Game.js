import React, { Component } from 'react';
// import axios from 'axios';
import Player from './Player';
import Monsters from './Monsters';
import Type from './Type';
import wordsfr from './wordsfr.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.vocabulary = wordsfr;
    this.state = {
      wordTyped: "",
      monstersKilled: 0,
      gameover: false,
    }
  }

  componentWillMount() {
    // Gets vocabulary from API
    //
    // this.vocabulary = [];
    // axios.get('https://api.datamuse.com/words?ml=computer')
    // .then((data) => {
    //   for (let i = 0; i < data.data.length; i++) {
    //     if (data.data && data.data[i].word !== "") {
    //       this.vocabulary.push(data.data[i].word)
    //     }
    //   }
    // });
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


  checkWordTyped = (word) => {
    const { gameover } = this.state;
    if (gameover === false) {
      this.setState({ wordTyped: word });
    }
  }

  resetWordTyped = (score) => {
    let { monstersKilled } = this.state;
    this.setState({
      wordTyped: '',
      monstersKilled: monstersKilled += score,
    });
  }

  handleGameOver = () => {
      this.setState({ gameover: true });
      clearInterval(this.gameRunning);
  }

  render() {
    const { wordTyped, monstersKilled, gameover } = this.state;
    return (
      <div className="App">
        <div className="GameArea">
          {
            gameover ?
              <p className="GameOver">
                GAME OVER<br></br>
                Score: {monstersKilled}
              </p>
              : null
          }
          <p className="Score">Score : {monstersKilled}</p>
          <Type checkWordTyped={this.checkWordTyped} />
          <Player />
          <Monsters wordTyped={wordTyped} resetWordTyped={this.resetWordTyped} handleGameOver={this.handleGameOver} vocabulary={this.vocabulary} />
        </div>
      </div>
    );
  }
}

export default Game;
