import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Link to="/Solo">
          <button>
            Solo
          </button>
        </Link>
        <Link to="/Coop">
          <button>
            Multiplayer
          </button>
        </Link>
        <Link to="/Scores">
          <button>
            Scores
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
