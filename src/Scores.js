import React, { Component } from 'react';

class Scores extends Component {
  render() {
    const { firebase } = this.props;
    const scores = firebase.scores.sort((a, b) => (parseInt(a.score) > parseInt(b.score) ? -1 : 1)).slice(0, 20);
    return (
      <div className="Scores">
        <h1>Highscores : </h1>
        {
          scores
          ? scores.map((score, index) => (
            <p key={`scoreId-${index + 1}`}><span className="highScoreName">{score.name}</span> : <span className="highScoreNum">{score.score}</span></p>
          ))
          : null
        }
      </div>
    );
  }
}

export default Scores;
