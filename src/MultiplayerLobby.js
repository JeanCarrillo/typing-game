import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';

class MultiplayerLobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (e) => {
    if (e.target.value.length <= 12) {
      this.setState({ name: e.target.value });
    }
  }

  render() {
    return (
      <div className="MultiplayerLobby">
        hello {this.props.match.params.id}
      </div>
    );
  }
}

export default withFirebaseContext(MultiplayerLobby);
