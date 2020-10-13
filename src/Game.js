import React from 'react';
import Location from './Location.js';

class Game extends React.Component {

  constructor(props) {

    super(props);

    let locationHelper = new Location();

    this.state = {
      location: locationHelper.getStartingLocation()
    };

    console.log("Here is the starting location:" + this.state.location);

  }

  render() {

    return (
        <h1>Game</h1>
    );
  }

}

export default Game;
