import React, { Component } from 'react';
import Monster from './Monster';

class Monsters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: props.words
        }
    }

    componentDidMount() {
        setInterval(() => {
            const { words } = this.props;
            this.setState({ words })
        }, 40)
    }

    render() {
        const { words } = this.state;
        console.log(words)
        return (
            <div className="Monsters">
                {
                    words.map((word, wordIndex) => (
                        <Monster ref={`monsterId-${wordIndex}`} text={words[wordIndex]} key={wordIndex} />
                    ))
                }
            </div>
        );
    }
}

export default Monsters;