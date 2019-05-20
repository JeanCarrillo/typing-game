import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';

class Scores extends Component {
  render() {
    const { scores } = this.props;
    const highScores = scores?
    scores.sort((a, b) => (parseInt(a.score) > parseInt(b.score) ? -1 : 1)).slice(0, 20)
    :[];
    return (
      <div className="Scores">
        <h1>Highscores : </h1>
        {
          highScores.map((score, index) => (
            <p key={`scoreId-${index + 1}`}><span className="highScoreName">{score.name}</span> : <span className="highScoreNum">{score.score}</span></p>
          ))
        }
      </div>
    );
  }
}

export default withFirebaseContext(Scores);
