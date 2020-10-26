import React from 'react';

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.initTimerValue
    };
  }

  render() {

    setTimeout(() => {
      this.updateTimer()
    }, 1000);

    return (
      <div>
        <p>Time Left: {this.state.timer}</p>
      </div>
    );
  }

  updateTimer() {
    if (this.state.timer == 0) {
      this.props.timerCompletedCallback();
    }
    else {
      this.setState((prevState) => {
        return {
          timer: prevState.timer - 1
        };
      });
    }
  }

}

export default Timer;
