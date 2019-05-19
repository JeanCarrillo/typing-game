import React, { Component } from 'react';
import Scores from './Scores';
import { FirebaseContext } from './Firebase';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      done: false,
    }
  }

  handleChange = (event) => {
    const { name } = this.state;
    if (name.length <= 12 && event.target.value.length <= 12) {
      this.setState({ name: event.target.value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { firebase, score } = this.props;
    if (name.length >= 1) {
      firebase.registerScore(name, score);
      this.setState({ name: "", done: true });
    }
  }

  render() {
    const { done } = this.state;
    const { score } = this.props
    return (
      <div>
        <FirebaseContext.Consumer>
          {firebase => <Scores firebase={firebase} />}
        </FirebaseContext.Consumer>

        <p className="GameOver">
          GAME OVER<br></br>
          Score: {score}
        </p>
        {
          !done
            ? <div className="EnterName">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Enter your nickname :
                  <input className="TypeTextBox" type="text" autoFocus={true} value={this.state.name} onChange={this.handleChange} />
                  <input type="submit" value="Submit" style={{ display: "none" }} />
                </label>
              </form>
            </div>
            : null
        }
      </div>
    );
  }
}

export default GameOver;