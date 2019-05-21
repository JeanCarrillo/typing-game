import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { Link } from 'react-router-dom';

class MultiplayerLobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (e) => {
    if (e.target.value.length <= 12) {
      this.setState({ name: e.target.value });
    }
  }

  render() {
    const {
      lobbies, removeLobby, joinLobby, createLobby
    } = this.props;
    const { name } = this.state;
    const multiplayerLobbies = lobbies ?
      Object.values(lobbies)
      : [];
    const multiplayerLobbiesKeys = lobbies ?
      Object.keys(lobbies)
      : [];
    console.log(multiplayerLobbies)
    return (
      <div className="MultiplayerLobbies">
        <h1>Multiplayer : </h1>
        <form >
          <label>
            Enter your name :
            {' '}
            <input onChange={this.handleChange} type="text" value={name} />
          </label>
        </form>
        <h3>Host game</h3>
        <button onClick={() => createLobby(name)}>Create</button>
        <h3>Current games : </h3>
        {
          multiplayerLobbies.map((lobby, i) => (
            <div key={`lobbyId-${i + 1}`}>
              <p>
                <span className="lobbyName">{lobby.name}</span>
                {' : '}
                <span className="lobbyPlayers">{Object.keys(lobby.players).length}/2</span>
                <button onClick={() => removeLobby(`${multiplayerLobbiesKeys[i]}`)}>Remove</button>
                <Link to={`/Multiplayer/${lobby.name.slice(-1)}`} >
                  <button onClick={() => joinLobby(multiplayerLobbiesKeys[i], name)}>
                    Join
                  </button>
                </Link>
              </p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withFirebaseContext(MultiplayerLobbies);
