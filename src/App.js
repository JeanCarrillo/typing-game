import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import FirebaseProvider from './Firebase/FirebaseProvider';
import Home from './Home';
import Game from './Game';
import CoopLobbies from './CoopLobbies';
import CoopLobby from './CoopLobby';
import CoopGame from './CoopGame';
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
            <Route exact path="/Coop" component={CoopLobbies} />
            <Route path="/Coop/:name" component={CoopLobby} />
            <Route path="/Coop/Game/:name" component={CoopGame} />
            <Route path="/Scores" component={Scores} />
          </Switch>
        </div>
      </HashRouter>
    </FirebaseProvider>
  );
}


export default App;
