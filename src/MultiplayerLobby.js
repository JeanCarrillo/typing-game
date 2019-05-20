import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';

class MultiplayerLobby extends Component {
  render() {
    const { lobbies, removeLobby } = this.props;
    const multiplayerLobbies = lobbies ?
      Object.values(lobbies)
      : [];
    const multiplayerLobbiesKeys = lobbies ?
     Object.keys(lobbies)
     : [];
    return (
      <div className="MultiplayerLobby">
        <h1>Multiplayer games : </h1>
        {
          multiplayerLobbies.map((lobby, i) => (
            <div key={`lobbyId-${i + 1}`}>
              <p>
                <span className="lobbyName">{lobby.name}</span>
                :
              <span className="lobbyPlayers">{lobby.players}</span>
              </p>
              <button onClick={() => removeLobby(`${multiplayerLobbiesKeys[i]}`)}>remove</button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withFirebaseContext(MultiplayerLobby);
