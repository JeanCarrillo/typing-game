import React, { Component } from 'react';
import Monster from './Monster';

class Monsters extends Component {
    constructor(props) {
        super(props);
        const { vocabulary } = this.props;
        this.vocabulary = vocabulary;
        this.words = [];
        this.state={
            count: 0
        }
    }

    componentWillReceiveProps(){
        const { monsterKilled } = this.props;
        this.words.slice(monsterKilled, 1)
    }

    componentWillMount() {
        setInterval(() => this.generateMonster(), 3000)
        const { count } = this.state;
        setInterval(() => this.setState({ count: count + 1 }), 1000)
        // Callback
        const { getCurrentWords } = this.props;
        getCurrentWords(this.words);
    }

    // Adds a monster and callback
    generateMonster() {
        this.words.push(this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)])
        const { getCurrentWords } = this.props;
        getCurrentWords(this.words);
    }

    render() {
        return (
            <div className="Monsters">
                {
                    this.words.map((word, wordIndex) => (
                        <Monster ref={`monsterId-${wordIndex}`} text={this.words[wordIndex]} key={wordIndex}/>
                    ))
                }
            </div>
        );
    }
}

export default Monsters;