import React from 'react';
import Location from './Location.js';
import Client from './Client.js';
import StartScreen from './StartScreen.js';
import RoomScreen from './RoomScreen.js';
import GameScreen from './GameScreen.js';
import GameOverScreen from './GameOverScreen.js';

const uniqid = require('uniqid');

// init to null so a variable doesn't have to be created for every new post request
let http_post_payload = null;

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.locationHelper = new Location();
    this.clientHelper = new Client("ws://localhost:8080", this);
    this.treasureHidingSpot = " ";

    this.state = {
      location: this.locationHelper.getStartingLocation(), // user's current location within the mansion
      clientID: null, // each client will have a unique id created on the server side
      roomID: null, // the game room that the client is currently in
      gameOwner: null, // whether or not the client owns the game room
      userInterface: "startScreen", // state variable to keep track of what UI user sees,
      similarClients: [], // other clients that are in the same room as this client,
      role: null,
      playing: false, // player can move around the mansion
      dead: false, // player has been killed by the ghoul in the game,
      hasTreasure: false, // is the player currently holding the treasure
      playerWon: false // tells gameOverScreen if player won the game
    };

    this.updateLocation = this.updateLocation.bind(this);
    this.wsClientNewMessageReceivedHandler = this.wsClientNewMessageReceivedHandler.bind(this);
    this.getCurrentUI = this.getCurrentUI.bind(this);
    this.handlePlayAgainButtonClicked = this.handlePlayAgainButtonClicked.bind(this);
    this.handleQuitButtonClicked = this.handleQuitButtonClicked.bind(this);

  }

  render() {

    // renders the screen that the client should currently be seeing
    return (
        <div>
          {this.getCurrentUI()}
        </div>
    );
  }

  //ONCLICK: Update the current location in the state when the button is clicked
  updateLocation(e) {

    // cache the next location
    //e.target.id == {NavN, NavE, NavS, NavW} - gets converted to an int in Location class
    let next_location = this.locationHelper.getNextLocation(e.target.id);

    // change the location of the client
    this.setState({
      ...this.state,
      location: next_location
    });


    /* Since we are handling location updates here, this would be a good place
    to check the win condition for the player/hunter. If the player currently
    has the treasure and steps into the grand foyer, then they win the game. Let
    the server know this with a 'player_wins' action. */
    if (this.state.hasTreasure && next_location == "Grand Foyer") {

      this.clientHelper.sendMessage(JSON.stringify({
        action: "player_wins",
        clientID: this.state.clientID
      }));

      console.log("Player wins!");
    }

    // send a payload with updated location to local test server
    this.clientHelper.sendMessage(JSON.stringify({
      action: "update_location",
      location: next_location,
      clientID: this.state.clientID,
      similarClients: this.state.similarClients
    }));
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

      this.treasureHidingSpot = jsonPayload.searchable;

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


    else if (jsonPayload.action == "game_over_player_wins") {

      this.setState({
        ...this.state,
        userInterface: "gameOverScreen",
        playerWon: jsonPayload.isWinner
      });
    }

    else if (jsonPayload.action == "game_over_ghoul_wins") {

      this.setState({
        ...this.state,
        userInterface: "gameOverScreen",
        playerWon: jsonPayload.isWinner
      });
    }

    else if (jsonPayload.action == "player_quit") {

      // remove clientID that quit from similar clients array
      let newSimilarClients = this.state.similarClients;
      let removalIndex = newSimilarClients.indexOf(jsonPayload.quitterID);
      if (removalIndex != -1) {
        newSimilarClients.splice(removalIndex, 1);
      }

      this.setState({
        ...this.state,
        similarClients: newSimilarClients
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
          <GameScreen gameState={this.state} clientHelper={this.clientHelper} updateLocationCallback={this.updateLocation} treasureHidingSpot={this.treasureHidingSpot}/>
        </div>
      );
    }

    else if(this.state.userInterface == "gameOverScreen") {
      return (
        <div>
          <GameOverScreen
            gameState={this.state}
            clientHelper={this.clientHelper}
            handlePlayAgainButtonClicked={this.handlePlayAgainButtonClicked}
            handleQuitButtonClicked={this.handleQuitButtonClicked} />
        </div>
      );
    }
  }


  handlePlayAgainButtonClicked() {

    this.locationHelper.reset();

    // reset things on the client side
    this.setState({
      ...this.state,
      location: this.locationHelper.getStartingLocation(),
      userInterface: "roomScreen",
      //similarClients: [] server needs to check if anyone left
      role: null,
      playing: false,
      dead: false,
      hasTreasure: false,
      playerWon: false
    });

    // tell the server to reset settings for client
    this.clientHelper.sendMessage(JSON.stringify({
      clientID: this.state.clientID,
      action: 'play_again'
    }));
  }

  // reset things on the client side
  handleQuitButtonClicked() {

    this.locationHelper.reset();

    this.setState({
      ...this.state,
      location: this.locationHelper.getStartingLocation(),
      roomID: null,
      similarClients: [],
      userInterface: "startScreen",
      gameOwner: false,
      role: null,
      playing: false,
      dead: false,
      hasTreasure: false,
      playerWon: false
    });

    // tell the server to reset settings for client
    this.clientHelper.sendMessage(JSON.stringify({
      clientID: this.state.clientID,
      action: 'quit_game'
    }));
  }
}



export default Game;
