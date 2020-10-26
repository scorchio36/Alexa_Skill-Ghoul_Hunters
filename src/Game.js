import React from 'react';
import Location from './Location.js';
import Client from './Client.js';
import StartScreen from './StartScreen.js';
import RoomScreen from './RoomScreen.js';
import GameScreen from './GameScreen.js';

const uniqid = require('uniqid');

// init to null so a variable doesn't have to be created for every new post request
let http_post_payload = null;

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.locationHelper = new Location();
    this.clientHelper = new Client("ws://localhost:8080", this);

    this.state = {
      location: this.locationHelper.getStartingLocation(), // user's current location within the mansion
      clientID: null, // each client will have a unique id created on the server side
      roomID: null, // the game room that the client is currently in
      gameOwner: null, // whether or not the client owns the game room
      userInterface: "startScreen", // state variable to keep track of what UI user sees,
      similarClients: [], // other clients that are in the same room as this client,
      role: null,
      playing: false, // player can move around the mansion
      dead: false // player has been killed by the ghoul in the game
    };

    this.updateLocation = this.updateLocation.bind(this);
    this.wsClientNewMessageReceivedHandler = this.wsClientNewMessageReceivedHandler.bind(this);
    this.getCurrentUI = this.getCurrentUI.bind(this);

  }

  render() {

    return (
        <div>
          {this.getCurrentUI()}
        </div>
    );
  }

  //ONCLICK: Update the current location in the state when the button is clicked
  updateLocation(e) {

    // cache the next location
    let next_location = this.locationHelper.getNextLocation(e.target.id);

    //e.target.id == {NavN, NavE, NavS, NavW} - gets converted to an int in Location class
    this.setState({
      ...this.state,
      location: next_location
    });

    // Currently the payloads will only contain the next location of the player.
    http_post_payload = JSON.stringify({
      action: "update_location",
      location: next_location,
      clientID: this.state.clientID,
      similarClients: this.state.similarClients
    });

    // send a payload with updated location to local test server
    this.clientHelper.sendMessage(http_post_payload);
  }

  // When the client helper receives a new message, this function will be run
  wsClientNewMessageReceivedHandler(message) {
    console.log(message);

    let jsonPayload = JSON.parse(message);

    /* This set of conditionals monitors messages from the WS server. Each message
    will usually contain an 'action' property indicating what action what completed
    on the server side. The following conditionals help decide what changes should
    happen on the client-side based on what happened on the server side. */
    if (jsonPayload.action == "create_room_successful") { // new room created

      this.setState({
          ...this.state,
          roomID: jsonPayload.roomID,
          gameOwner: true, // the creator of the room is the owner
          userInterface: "roomScreen"
        });

      console.log(`Client State: ${JSON.stringify(this.state)}`);
    }

    // client joined an active room successfully
    else if(jsonPayload.action == "join_room_successful") {

      this.setState({
        ...this.state,
        roomID: jsonPayload.roomID,
        gameOwner: false,
        userInterface: "roomScreen",
        similarClients: jsonPayload.similarClients
      });

      console.log(`Client ${this.state.clientID} has joined room ${this.state.roomID}.`);
    }

    // alerts all similar clients that a new player has joined the room
    else if(jsonPayload.action == "new_client_joined_room") {

      this.setState({
          ...this.state,
          similarClients: this.state.similarClients.concat(jsonPayload.similarClientID)
      });

      console.log(`Similar client ${jsonPayload.similarClientID} has joined room.`);
    }

    //client has connected to server and client ID has been created
    else if(jsonPayload.action == "client_id_and_ws_connection_created") {

      this.setState({
        ...this.state,
        clientID: jsonPayload.clientID
      });

      console.log(`New Client, ${jsonPayload.clientID}, created`);
    }

    else if (jsonPayload.action == "game_started") {

      this.setState({
        ...this.state,
        userInterface: "gameScreen",
        role: jsonPayload.role
      });

      console.log(`Game has started. You have been assigned the role of ${jsonPayload.role}`);
    }


    else if (jsonPayload.action == "game_started") {

      this.setState({
        ...this.state,
        userInterface: "gameScreen",
        role: jsonPayload.role
      });

      console.log(`Players can now move around the mansion!`);
    }

    else if (jsonPayload.action == "allow_player_movement") {

      this.setState({
        ...this.state,
        playing: true
      });

      console.log("Player is now allowed to move around the mansion.");

    }

    else if (jsonPayload.action == "killed_by_ghoul") {

      this.setState({
        ...this.state,
        dead: true
      });
    }
  }


  /* Returns JSX code corresponding to the screen/UI that the user should currently
  be seeing on their screens. This will be run everytime the Game component is
  re-rendered or when the Game's state changes. */
  getCurrentUI() {

    if (this.state.userInterface == "startScreen") {
      return (
        <div>
          <StartScreen gameState={this.state} clientHelper={this.clientHelper}/>
        </div>
      );
    }

    else if (this.state.userInterface == "roomScreen") {
      return (
        <div>
          <RoomScreen gameState={this.state} clientHelper={this.clientHelper}/>
        </div>
      );
    }
    else if(this.state.userInterface == "gameScreen") {
      return (
        <div>
          <GameScreen gameState={this.state} clientHelper={this.clientHelper} updateLocationCallback={this.updateLocation}/>
        </div>
      );
    }

  }
}



export default Game;
