import React, { Component } from 'react';
import Monster from './Monster';

class Monsters extends Component {
    constructor(props) {
        super(props);
        const { words } = this.props;
        this.state = {
            words: words,
            refresh: true,
        }
    }

    refreshMonsters() {
        const { refresh } = this.state;
        this.setState({ refresh: !refresh })
    }

    render() {
        const { words } = this.state;
        return (
            <div className="Monsters">
                {
                    words.map((word, wordIndex) => (
                        <Monster text={words[wordIndex]} key={`monsterId-${wordIndex}`} />
                    ))
                }
            </div>
        );
    }
}

export default Monsters;