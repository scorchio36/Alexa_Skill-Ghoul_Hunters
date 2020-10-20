import React from 'react';
const uniqid = require('uniqid'); // use this to generate unique client ID on the client side

class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxSubmitGETToCreateRoom = this.ajaxSubmitGETToCreateRoom.bind(this);
  }



  render() {

      return (
        <div>
          <h1>Ghoul Hunters</h1>
          <button onClick={this.ajaxSubmitGETToCreateRoom}>Host a Game</button>
          <form>
            <input type="text" id="join-game-text-box"></input>
          </form><button onClick={this.ajaxSubmitGetToJoinRoom}>Join a Game</button>
        </div>
      );
  }

  // I will use pure JS Ajax to submit these forms. I don't want the page to change
  ajaxSubmitGETToCreateRoom() {

    console.log("AJAX SUBMIT GET TO CREATE ROOM");
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

      // check whether request has been complete
      if(xhr.readyState === XMLHttpRequest.DONE) {
        //check whether the request was successful
        if(xhr.status === 200) {
          console.log(xhr.responseText);
        }
      }
    }

    xhr.open("GET", "http://localhost:8080/create_room?clientID=" + this.props.gameState.clientID, true);
    xhr.send(null);
  }

  ajaxSubmitGETToJoinRoom() {

    /*let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {

    }

    xhr.open("GET", "http://localhost:8080")*/
  }
}

export default StartScreen;
