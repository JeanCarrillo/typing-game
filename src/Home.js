import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Link to="/solo">
          <button>
            Solo
          </button>
        </Link>
        <Link to="/multiplayer">
          <button>
            Multiplayer
          </button>
        </Link>
        <Link to="/scores">
          <button>
            Scores
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
