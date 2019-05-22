import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import CoopGame from './CoopGame';

class CoopLobby extends Component {
  constructor(props) {
    super(props);
    this.key = null;
    if (props.location.state.key) {
      this.key = props.location.state.key;
    }
    this.canLaunch = false;
    this.multiplayerLobbies = [];
    this.multiplayerLobbiesKeys = [];
    this.players = [];
    this.state = {
      launched: false,
    };
  }

  launchGame = (host, client, key) => {
    const { createGame } = this.props;
    this.gameKey = createGame(host, client, key);
  }

  render() {
    const { launched } = this.state;
    const { lobbies } = this.props;
    const { name, host } = this.props.location.state;
    if (launched === false) {
      if (lobbies) {
        if (host === true) {
          this.multiplayerLobbies = Object.values(lobbies);
          this.multiplayerLobbiesKeys = Object.keys(lobbies);
          for (let i = 0; i < this.multiplayerLobbies.length; i += 1) {
            if (this.multiplayerLobbies[i].name === name) {
              this.key = this.multiplayerLobbiesKeys[i];
            }
          }
          this.players = Object.values(lobbies[this.key].players)
          if (this.players.length > 1) {
            this.canLaunch = true;
          }
        } else {
          this.players = Object.values(lobbies[this.key].players);
        }
      }
      if (lobbies[this.key].launched === true) {
        this.gameKey = lobbies[this.key].gameKey;
        this.setState({ launched: true });
      }
    }
    return (
      !launched ?
        <div className="CoopLobby">
          <h1>Players :</h1>
          {
            this.players.map((player, i) => (
              <p key={`playerId-${i + 1}`}>{player.name}</p>
            ))
          }
          {
            host && this.canLaunch ?
              <button onClick={() => this.launchGame(name, this.players[1].name, this.key)} >
                Launch Game
              </button>
              : host ?
                <p>Waiting for player...</p>
                : null
          }
        </div>
        : <CoopGame
          gameKey={this.gameKey}
          host={host}
          name={name}
        />
    );
  }
}

export default withFirebaseContext(CoopLobby);
