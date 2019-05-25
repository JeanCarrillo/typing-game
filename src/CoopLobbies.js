import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { Link } from 'react-router-dom';

class CoopLobbies extends Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const {
      lobbies, removeLobby, joinLobby, createLobby,
    } = this.props;
    const { name } = this.state;
    const multiplayerLobbies = lobbies ?
      Object.values(lobbies)
      : [];
    const multiplayerLobbiesKeys = lobbies ?
      Object.keys(lobbies)
      : [];
    return (
      <div className="CoopLobbies">
        <h1>Coop</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your name :
            {' '}
            <input onChange={this.handleChange} type="text" value={name} />
          </label>
        </form>
        <Link to={{
          pathname: `/Coop/${name}`,
          state: {
            name,
            host: true,
          }
        }}>
          <button onClick={() => createLobby(name)}>Create game</button>
        </Link>
        <h3>Current games : </h3>
        <div className="coopGames">
          {
            multiplayerLobbies.map((lobby, i) => (
              <div key={`lobbyId-${i + 1}`}>
                <p>
                  <span className="lobbyName">{lobby.name}</span>
                  {' : '}
                  <span className="lobbyPlayers">{Object.keys(lobby.players).length}/2</span>
                  <button onClick={() => removeLobby(`${multiplayerLobbiesKeys[i]}`)}>Remove</button>
                  <Link to={{
                    pathname: `/Coop/${lobby.name}`,
                    state: {
                      name,
                      host: false,
                      key: `${multiplayerLobbiesKeys[i]}`,
                    }
                  }}>
                    <button onClick={() => joinLobby(multiplayerLobbiesKeys[i], name)}>
                      Join
                  </button>
                  </Link>
                </p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default withFirebaseContext(CoopLobbies);