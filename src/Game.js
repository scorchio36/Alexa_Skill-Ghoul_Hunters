import React from 'react';
import Location from './Location.js';



class Game extends React.Component {

  constructor(props) {
    super(props);

    this.locationHelper = new Location();

    this.state = {
      location: this.locationHelper.getStartingLocation()
    };

    this.updateLocation = this.updateLocation.bind(this);

    console.log("Here is the starting location:" + this.state.location);

  }

  //ONCLICK: Update the current location in the state when the button is clicked
  updateLocation(e) {

    //e.target.id == {NavN, NavE, NavS, NavW} - gets converted to an int in Location class
    this.setState({
      location: this.locationHelper.getNextLocation(e.target.id)
    });
  }

  render() {

    return (
        <div>
          <h1>Location: {this.state.location}</h1>
          <button onClick={this.updateLocation} id="NavN"> North </button>
          <button onClick={this.updateLocation} id="NavE"> East </button>
          <button onClick={this.updateLocation} id="NavS"> South </button>
          <button onClick={this.updateLocation} id="NavW"> West </button>
        </div>
    );
  }

}

export default Game;
