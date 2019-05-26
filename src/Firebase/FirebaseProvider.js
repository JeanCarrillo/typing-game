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
const socket = socketIOClient('localhost:5000')

class FirebaseProvider extends Component {
  constructor(props) {
    super(props);
    // Socket
    // Firebase
    firebase.initializeApp(fbconfig);
    this.scoresRef = firebase.database().ref('scores');
    this.lobbiesRef = firebase.database().ref('lobbies');
    this.gamesRef = firebase.database().ref('games');
    this.db = firebase.database().ref();
    // const lobbies = this.db.child('lobbies');
    // lobbies.push({
    //   'name': `test`,
    //   'players': {
    //     '1': {
    //     'name': `test`,
    //     'playerNum' : 1,
    //     },
    //   },
    // });
    // const lobbies = this.db.child("lobbies");           
    // lobbies.push({
    //   'name': 'Room 1',
    //   'players': ['', ''],
    //   'messages': {},
    // });
    this.state = {
      scores: [],
      lobbies: [],
      games: [],
      currentGame: {
        'players': [],
        'monsters': [],
        'projectiles': [],
      },
      registerScore: this.registerScore,
      removeLobby: this.removeLobby,
      createLobby: this.createLobby,
      joinLobby: this.joinLobby,
      createGame: this.createGame,
      updateGame: this.updateGame,
      listenGameData: this.listenGameData,
      clientAction: this.clientAction,
      clearTempProjectiles: this.clearTempProjectiles,
    }
  }

  componentWillMount() {
    this.scoresRef.on('value', (snapshot) => {
      this.setState({ scores: Object.values(snapshot.val()) });
    });
    this.lobbiesRef.on('value', (snapshot) => {
      this.setState({ lobbies: snapshot.val() });
    });
  }
  
  componentDidMount() {
    socket.emit('create game');
    socket.on('get game', data => console.log(data));
    socket.emit('launch game');
    socket.on('game info', data => console.log(data));
  }

  joinLobby = (key, name) => {
    firebase.database().ref('lobbies/' + key).once('value', (snapshot) => {
      const players = snapshot.val().players
      players.push({
        'name': name,
        'playerNum': 2,
      })
      firebase.database().ref('lobbies/' + key).update({
        players,
      });
    });
  }

  createLobby = (name) => {
    // const lobbies = this.db.child("lobbies");           
    // lobbies.push({
    //   'name': 'Room 1',
    //   'players': ['', ''],
    //   'messages': {},
    // });
    if (name.length > 0) {
      const lobbies = this.db.child('lobbies');
      lobbies.push({
        'name': `${name}`,
        'launched': false,
        'players': {
          '0': {
            'name': `${name}`,
            'playerNum': 1,
          },
        },
      });
    }
  }

  removeLobby = (key) => {
    this.lobbiesRef.child(`${key}`).remove();
  }

  createGame = (host, client, lobbyKey) => {
    const games = this.db.child('games');
    const gameRef = games.push({
      'host': `${host}`,
      'client': `${client}`,
      'players': [],
      'monsters': [],
      'projectiles': [],
    });
    const gameKey = gameRef.getKey();
    firebase.database().ref('lobbies/' + lobbyKey).update({
      'launched': true,
      'gameKey': `${gameKey}`
    }, (err) => {
      if (err) {
        console.log('fail')
      } else {
        // console.log('success')
      }
    });
    return gameKey;
  }

  updateGame = (key, monsters, projectiles, players) => {
    firebase.database().ref('games/' + key).update({
      // 'players': players,
      'monsters': monsters,
      'projectiles': projectiles,
      // score,
    }, (err) => {
      if (err) {
        console.log('fail')
      } else {
        // console.log('success')
      }
    });
  }

  clientAction = (key, projectile) => {
    firebase.database().ref('games/' + key).once('value', (snapshot) => {
        firebase.database().ref('games/' + key).update({
          'tempProjectiles': [projectile],
        });
    });
    // firebase.database().ref('games/' + key).update({
    //   'tempProjectiles': projectiles,
    // }, (err) => {
    //   if (err) {
    //     console.log('fail')
    //   } else {
    //     // console.log('success')
    //   }
    // });
  }

  clearTempProjectiles = (key) => {
      firebase.database().ref('games/' + key).update({'tempProjectiles':[]});
  }


  listenGameData = (key) => {
    firebase.database().ref('games/' + key).on('value', (snapshot) => {
      this.setState({ currentGame: snapshot.val() });
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