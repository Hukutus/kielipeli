import React, { Component } from 'react';
import Timer from "./Timer";
import Link from "react-router-dom/es/Link";

class Assignment extends Component {
    constructor() {
        super();

        this.addWord = this.addWord.bind(this);
    }

    addWord(event) {
        const nextWord = this.props.testAssignment.words[this.props.tempIndex];
        const oldWords = this.props.selectedWords;
        // const index = this.props.tempIndex;

        event.preventDefault();
        this.setState({selectedWords: oldWords + " " + nextWord});
    }

    onTimerEnd() {
        console.log("Timer ended");
    }

    render () {
        return (
            <div className="Landing-body">
                <div className="Landing-border">
                    <div className="Landing-header">
                        <h1>Welcome to WordPlay</h1>
                    </div>

                    <div className="TimerContainer">
                        <Timer onTimerEnd={this.onTimerEnd} timerSeconds={3}></Timer>
                    </div>

                    <div className="ReturnContainer">
                        <Link to="/">
                            <button className="btn">Return to front page</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Assignment
