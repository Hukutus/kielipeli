import React, { Component } from 'react';

class Assignment extends Component {
    constructor() {
        super();

        this.addWord = this.addWord.bind(this);
    }

    addWord(event) {
        const nextWord = this.props.testAssignment.words[this.props.tempIndex];
        const oldWords = this.props.selectedWords;
        const index = this.props.tempIndex;
        console.log(nextWord, oldWords, index);

        event.preventDefault();
        this.setState({selectedWords: oldWords + " " + nextWord});
    }

    render () {
        return (
            <div>
                <div>
                    <button onClick={this.addWord}>Add word</button>
                </div>
            </div>
        )
    }
}

export default Assignment
