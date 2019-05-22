import React, { Component } from 'react';
// import axios from 'axios';
import CoopGameLoop from './CoopGameLoop';
import GameOver from './GameOver';
// import Type from './Type';
import wordsfr from './wordsfr.js';
import withFirebaseContext from './Firebase/withFirebaseContext';

class CoopGame extends Component {
  constructor(props) {
    super(props);
    this.gameKey = props.gameKey;
    const listenGameData = props.listenGameData;
    listenGameData(this.gameKey);
    this.host = props.host;
    if (this.host === true) {
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
    }
    this.state = {
      wordTyped: "",
      monstersKilled: 0,
      gameover: false,
    }
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

  render() {
    const { monstersKilled, gameover } = this.state;
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
          <CoopGameLoop host={this.host} gameKey={this.gameKey} updateScore={this.updateScore} handleGameOver={this.handleGameOver} words={this.words} />
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(CoopGame);
