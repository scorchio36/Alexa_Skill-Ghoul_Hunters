import React from 'react';
import Timer from './Timer.js';
import Searchables from './Searchables.js';

const HIDE_TREASURE_TIME = 60;
const HEADSTART_TIME = 15;

class GameScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        {this.renderRole()}
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
          <Searchables gameState={this.props.gameState} clientHelper={this.props.clientHelper} treasureHidingSpot={this.props.treasureHidingSpot}/>
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
          <Searchables gameState={this.props.gameState} clientHelper={this.props.clientHelper}/>
          <Timer initTimerValue={HIDE_TREASURE_TIME} timerCompletedCallback={() => this.hideTreasureCallback()}/>
        </div>
      );
    }
  }

  // Show the player what their role is in the game
  renderRole() {

    if (this.props.gameState.role == "ghoul") {
      return (
        <div>
          <h1>You are the GHOUL.</h1>
        </div>
      );
    }
    else {
      return (
        <div>
          <h1>You are a PLAYER.</h1>
        </div>
      );
    }
  }
}

export default GameScreen;
