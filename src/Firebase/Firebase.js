import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.scoresRef = firebase.database().ref('scores');
    this.scoresRef.on('value', (snapshot) => {
      this.updateScores(Object.values(snapshot.val()));
    })
    this.db = firebase.database().ref();
  }

  registerScore = (name, score) => {
    if (name.length >= 1) {
      const scores = this.db.child("scores");
      scores.push({
        "name": `${name}`,
        "score": `${score}`,
      });
    }
  }

  updateScores = (val) => {
    this.scores = val;
  }
}

export default Firebase;

