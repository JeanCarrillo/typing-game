import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import FirebaseProvider from './Firebase/FirebaseProvider';
import Home from './Home';
import Game from './Game';
import MultiplayerLobby from './MultiplayerLobby';
import Scores from './Scores';
import './App.css';

const App = () => {
  return (
    <FirebaseProvider>
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Solo" component={Game} />
            <Route path="/Multiplayer" component={MultiplayerLobby} />
            <Route path="/Scores" component={Scores} />
          </Switch>
        </div>
      </HashRouter>
    </FirebaseProvider>
  );
}


export default App;
