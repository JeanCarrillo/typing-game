import firebase from 'firebase/app';
import 'firebase/database';

import React, { Component } from 'react';

import socketIOClient from 'socket.io-client';

export const FirebaseContext = React.createContext();

const fbconfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// const serverConf = {
//   ip: process.env.REACT_APP_SERVER_IP,
//   port: process.env.REACT_APP_SERVER_PORT,
// }
// const socket = socketIOClient(`${serverConf.ip}:${serverConf.port}`);
const socket = socketIOClient('localhost:5000');

class FirebaseProvider extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(fbconfig);
    this.scoresRef = firebase.database().ref('scores');
    this.state = {
      host: false,
      playerId: null,
      name: null,
      gameId: null,
      scores: [],
      lobbies: [],
      currentGame: null,
      registerScore: this.registerScore,
      getLobbies: this.getLobbies,
      createGame: this.createGame,
      joinGame: this.joinGame,
      launchGame: this.launchGame,
      clearInterval: this.clearInterval,
      // removeLobby: this.removeLobby,
      // createLobby: this.createLobby,
      // updateGame: this.updateGame,
      // listenGameData: this.listenGameData,
      // clientAction: this.clientAction,
      // clearTempProjectiles: this.clearTempProjectiles,
    }
  }

  componentWillMount() {
    this.scoresRef.on('value', (snapshot) => {
      this.setState({ scores: Object.values(snapshot.val()) });
    });
  }

  componentDidMount() {
    socket.emit('ask player id');
    socket.on('get player id', id => {
      this.setState({ playerId: id });
    });
    // socket.emit('launch game');
    // socket.on('game info', data => console.log(data));
  }

  clearInterval = () => {
    socket.emit('clear interval');
  }

  getLobbies = () => {
    socket.emit('get lobbies');
    socket.on('lobbies list', lobbies => {
      this.setState({ lobbies });
    });
  }

  joinGame = (gameId, playerId, name) => {
    this.setState({ name });
    socket.emit('join game', gameId, playerId, name);
    socket.on('get game', (game) => {
      this.setState({
        currentGame: game,
        gameId,
      });
    });
  }

  createGame = (name) => {
    const { playerId } = this.state;
    socket.emit('create game', name);
    socket.on('get game', (game) => {
      console.log(game)
      this.setState({
        currentGame: game,
        gameId: playerId,
      });
    });
    this.setState({ name, host: true });
  }

  launchGame = () => {
    const { playerId } = this.state;
    socket.emit('launch game', playerId);
  }

  clientAction = (key, projectile) => {
    firebase.database().ref('games/' + key).once('value', (snapshot) => {
      firebase.database().ref('games/' + key).update({
        'tempProjectiles': [projectile],
      });
    });
  }

  registerScore = (name, score) => {
    if (name.length >= 1) {
      const scores = this.db.child('scores');
      scores.push({
        'name': `${name}`,
        'score': `${score}`,
      });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <FirebaseContext.Provider value={this.state} >
        {children}
      </FirebaseContext.Provider>
    )
  }
}

export default FirebaseProvider;