import React, { Component } from 'react';
import firebase from './Firebase/Firebase';
import Scores from './Scores';

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
    if (name.length <= 12) {
      this.setState({ name: event.target.value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { score } = this.props;
    if (name.length >= 1) {
      const database = firebase.database().ref();
      const scores = database.child("scores");
      scores.push({
        "name": `${name}`,
        "score": `${score}`,
      });
      this.setState({ name: "", done: true });
    }
  }

  render() {
    const { done } = this.state;
    const { score } = this.props
    return (
      <div>
        <Scores />
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