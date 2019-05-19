import React, { Component } from 'react';
import Game from './Game';
import './App.css';
import { FirebaseContext } from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <FirebaseContext.Consumer>
          {firebase => <Game firebase={firebase} />}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

export default App;
