import firebase from 'firebase/app';
import 'firebase/database';

import React, { Component } from 'react';

export const FirebaseContext = React.createContext();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class FirebaseProvider extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.scoresRef = firebase.database().ref('scores');
    this.lobbiesRef = firebase.database().ref('lobbies');
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
      currentGame: {},
      registerScore: this.registerScore,
      removeLobby: this.removeLobby,
      createLobby: this.createLobby,
      joinLobby: this.joinLobby,
    }
  }

  componentWillMount() {
    this.scoresRef.on('value', (snapshot) => {
      this.setState({ scores: Object.values(snapshot.val()) });
    });
    this.lobbiesRef.on('value', (snapshot => {
      this.setState({ lobbies: snapshot.val() });
    }));
  }

  joinLobby = (key, name) => {
    firebase.database().ref('lobbies/' + key).once('value', (snapshot) => {
      const players = snapshot.val().players
      console.log(players)
      // players[0]="gregory";
      firebase.database().ref('lobbies/' + key).update({
        players,
      }, function(error) {
        if (error) {
          console.log('fail')
        } else {
          console.log('success')
        }
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
        'players': {
          '1': {
          'name': `${name}`,
          'playerNum' : 1,
          },
        },
      });
    }
  }

  removeLobby = (key) => {
    // const lobbies = this.db.child('lobbies');
    this.lobbiesRef.child(`${key}`).remove();
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