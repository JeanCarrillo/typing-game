import React, { Component } from 'react';
import Game from './Game';
import './App.css';

// import base from './Firebase/Firebase';
// const ref = base.ref('players');
import firebase from './Firebase/Firebase';
// console.log(firebase)
// const database = firebase.database().ref();
// const scores = database.child("scores");
// scores.push({
//   "name": "test",
//   "score": "32",
// });
const scoresRef = firebase.database().ref('scores');
scoresRef.on('value', function(snapshot) {
  console.log(snapshot.val());
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {},
    }
  }

  componentDidMount() {
    // base.syncState('/', {
    //   context: this,
    //   state: 'scores'
    // });
  }

  render() {
    return (
      <div className="App">
        <p>Scores : {this.state.scores[0]}</p>
        <Game />
      </div>
    );
  }
}

export default App;
