import React from 'react';
import Location from './Location.js';
import Client from './Client.js';
import StartScreen from './StartScreen.js';

const uniqid = require('uniqid');

// init to null so a variable doesn't have to be created for every new post request
let http_post_payload = null;

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.locationHelper = new Location();
    this.clientHelper = new Client();

    this.state = {
      location: this.locationHelper.getStartingLocation(),
      clientID: uniqid()
    };

    this.updateLocation = this.updateLocation.bind(this);

  }

  //ONCLICK: Update the current location in the state when the button is clicked
  updateLocation(e) {

    // cache the next location
    let next_location = this.locationHelper.getNextLocation(e.target.id);

    //e.target.id == {NavN, NavE, NavS, NavW} - gets converted to an int in Location class
    this.setState({
      location: next_location
    });

    // Currently the payloads will only contain the next location of the player.
    http_post_payload = JSON.stringify({
      location: next_location
    });

    /* send a POST request payload with updated location to the local test server
    whenever location is updated. */
    this.clientHelper.sendPOSTRequest(http_post_payload);
  }

  render() {

    return (
        <div>
          {/*<h1>Location: {this.state.location}</h1>
          <button onClick={this.updateLocation} id="NavN"> North </button>
          <button onClick={this.updateLocation} id="NavE"> East </button>
          <button onClick={this.updateLocation} id="NavS"> South </button>
          <button onClick={this.updateLocation} id="NavW"> West </button>*/}
          <StartScreen gameState={this.state}/>
        </div>
    );
  }

}

export default Game;
