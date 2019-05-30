import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import CoopLobby from './CoopLobby';

class CoopLobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosed: false,
      name: "",
    };
  }

  componentWillMount() {
    const { getLobbies } = this.props;
    getLobbies();
  }

  handleChange = (e) => {
    if (e.target.value.length <= 12) {
      this.setState({ name: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  join(key) {
    const { name } = this.state;
    const { joinGame } = this.props;
    joinGame(key, name);
    this.setState({ choosed: true });
  }

  create() {
    const { name } = this.state;
    const { createGame } = this.props;
    createGame(name);
    this.setState({ choosed: true });
  }

  display() {
    const {
      lobbies,
    } = this.props;
    const { name, choosed } = this.state;
    if (choosed) {
      return <CoopLobby />
    } else {
      return <div className="CoopLobbies">
        <h1>Coop</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your name :
          {' '}
            <input onChange={this.handleChange} type="text" value={name} />
          </label>
        </form>
        <button onClick={() => this.create()}>Create game</button>
        <h3>Current games : </h3>
        <div className="coopGames">
          {
            lobbies.map((lobby, i) => (
              <div key={`lobbyId-${i + 1}`}>
                <p>
                  <span className="lobbyName">{lobby.name}</span>
                  {' : '}
                  <span className="lobbyPlayers">{Object.keys(lobby.players).length}/2</span>
                    <button onClick={() => this.join(lobby.key)}>
                      Join
                </button>
                </p>
              </div>
            ))
          }
        </div>
      </div>
    }
  }

  render() {
    return (
      <div>
        {
          this.display()
        }
      </div>
    );
  }
}

export default withFirebaseContext(CoopLobbies);