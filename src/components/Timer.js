import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super();

        this.state = {
            seconds: "Start",
            timerMax: +props['timerSeconds']
        };

        this.timer = 0;

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.onTimerEnd = props['onTimerEnd'].bind(this);
    }

    startTimer() {
        if (this.timer) {
            return;
        }

        this.setState({
            seconds: this.state.timerMax
        });

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(this.countDown, 1000);
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;

        this.setState({
            seconds: seconds
        });

        // Check if we're at zero.
        if (!seconds) {
            this.onTimerEnd();

            clearInterval(this.timer);
        }
    }

    render() {
        return(
            <div>
                <button className={"StartButton " + (this.timer !== 0 ? 'Started' : '')} onClick={this.startTimer}>{this.state.seconds}</button>
            </div>
        );
    }
}

export default Timer