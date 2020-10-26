import React from 'react';

class RoomScreen extends React.Component {

  constructor(props) {
    super(props);
    this.similarClientListItems = []; // holds the <li> HTML elements for each similar client
  }

  render() {

    // update the list elements array each time a new client joins the room
    this.renderSimilarClients();

    return (
      <div>
        <h1>Room Code: {this.props.gameState.roomID}</h1>
        <h2>Players:</h2>
        <ul>
          <li key={this.props.gameState.clientID}>You: {this.props.gameState.clientID}</li>
          {this.similarClientListItems}
        </ul>
        {this.renderStartButton()}
      </div>
    )
  }

  // Generate an array filled with a <li> element for each similar client
  renderSimilarClients() {

      let finalListArray = [];

      /* React needs arrays of JSX elements to each have a unique key. In this case,
      I just make the clientID the unique key. I believe the function fails if the
      similarClients array length is 0, so I put a conditional protection before
      the array generation. */
      if (this.props.gameState.similarClients.length > 0) {
        for (let clientID of this.props.gameState.similarClients) {
            finalListArray.push(<li key={clientID}>{clientID}</li>);
        }
      }

      this.similarClientListItems = finalListArray;
  }

  renderStartButton() {
    if(this.props.gameState.gameOwner) {
      return (<button onClick={() => this.props.clientHelper.sendMessage(JSON.stringify({
        action: "start_game",
        clientID: this.props.gameState.clientID
      }))}>Start Game</button>);
    }
    else {
      return (<p>Waiting for owner to start game...</p>);
    }
  }
}

export default RoomScreen;
