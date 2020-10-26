import React from 'react';
import Timer from './Timer.js';

const HIDE_TREASURE_TIME = 10;
const HEADSTART_TIME = 15;

class GameScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        {this.renderGameHUD()}
      </div>
    );

  }

  /* Timer function will call this once timer hits 0. This function let's the
  server know that the treasure is now hidden */
  hideTreasureCallback() {
    this.props.clientHelper.sendMessage(JSON.stringify({
      action: "treasure_hidden",
      clientID: this.props.gameState.clientID
    }));
  }

  renderGameHUD() {

    if (this.props.gameState.playing && !this.props.gameState.dead) {
      return (
        <div>
          <h1>Location: {this.props.gameState.location}</h1>
          <button onClick={(clickEvent) => this.props.updateLocationCallback(clickEvent) } id="NavN"> North </button>
          <button onClick={(clickEvent) => this.props.updateLocationCallback(clickEvent)} id="NavE"> East </button>
          <button onClick={(clickEvent) => this.props.updateLocationCallback(clickEvent)} id="NavS"> South </button>
          <button onClick={(clickEvent) => this.props.updateLocationCallback(clickEvent)} id="NavW"> West </button>
        </div>
      );
    }
    else if(this.props.gameState.dead) {
      return (
        <div>
          <h1> BOO! You have been killed by the ghoul! </h1>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Waiting on ghoul to hide the treasure...</p>
          <Timer initTimerValue={HIDE_TREASURE_TIME} timerCompletedCallback={() => this.hideTreasureCallback()}/>
        </div>
      );
    }
  }
}

export default GameScreen;
