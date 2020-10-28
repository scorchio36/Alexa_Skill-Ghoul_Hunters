import React from 'react';

class GameOverScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div>
        {this.renderGameResult()}
        <button onClick={() => this.props.handlePlayAgainButtonClicked()}>Play Again</button>
        <button onClick={() => this.props.handleQuitButtonClicked()}>Quit</button>
      </div>
    );
  }

  renderForGameOwner() {

    if (this.props.gameState.gameOwner) {
      return (
        <div>
          <button>Play Again</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <h1>Waiting for game owner to start new game...</h1>
        </div>
      );
    }
  }

  renderGameResult() {

    if (this.props.gameState.playerWon) {
      return (
        <div>
          <h1>You won the game!</h1>
        </div>
      );
    }
    else {
      return (
          <div>
            <h1>You lost the game...</h1>
          </div>
      );
    }
  }
}

export default GameOverScreen;
