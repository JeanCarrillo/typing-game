import React, { Component } from 'react';
import Game from './Game';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    // base.syncState('/', {
    //   context: this,
    //   state: 'scores'
    // });
  }

  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
