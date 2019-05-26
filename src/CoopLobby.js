import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import CoopGame from './CoopGame';

class CoopLobby extends Component {
  constructor(props) {
    super(props);
    this.players = [];
    this.state = {
      launched: false,
    };
  }

  display() {
    const { currentGame, launchGame, host } = this.props;
    if (currentGame && currentGame.launched) {
      return <CoopGame />
    } else if (currentGame && !currentGame.launched) {
      const players = Object.values(currentGame.players)
      return (
        <div className="CoopLobby">
          <h1>{currentGame.name}</h1>
          <h3>Players</h3>
          {
            players.map((player, i) => (
              <p key={`playerId-${i + 1}`}>{player.name}</p>
            ))
          }
          {
            players.length < 2 ?
              <p>Waiting for players...</p>
              : host ?
                <button onClick={() => launchGame()}>Launch game !</button>
                : null
          }
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        {
          this.display()
        }
      </div>
    )
  }
}

export default withFirebaseContext(CoopLobby);