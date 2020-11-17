import React from 'react';

class Searchables extends React.Component {
  constructor(props) {
    super(props);
      this.searchable1 = "null";
      this.searchable2 = "null";
      this.searchable3 = "null";
      this.searchable4 = "null";
      this.state = {
        hidingLocation: "all"
      }
  }

  render() {

    if(this.props.gameState.playing) {
      this.updateSearchables();

      return (
        <div>
          <button onClick={(clickEvent) => this.checkIfTreasureFound(clickEvent)} id={this.searchable1}>{this.searchable1}</button>
          <button onClick={(clickEvent) => this.checkIfTreasureFound(clickEvent)} id={this.searchable2}>{this.searchable2}</button>
          <button onClick={(clickEvent) => this.checkIfTreasureFound(clickEvent)} id={this.searchable3}>{this.searchable3}</button>
          <button onClick={(clickEvent) => this.checkIfTreasureFound(clickEvent)} id={this.searchable4}>{this.searchable4}</button>
        </div>
      );
    }
    else if(this.props.gameState.role == "player" && !(this.props.gameState.playing)) {

      return (
        <div>
          Waiting on ghoul to hide the treasure...
        </div>
      )
    }
    else if(this.props.gameState.role == "ghoul" && !(this.props.gameState.playing)) {
      if(this.state.hidingLocation == "all" || this.state.hidingLocation == "goBack") {
        return (
            <div>
              <button id="Observatory" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Observatory</button>
              <button id="Courtyard" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Courtyard</button>
              <button id="Cellar" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Cellar</button>
              <button id="Armory" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Armory</button>
              <button id="Master Bedroom" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Master Bedroom</button>
              <button id="Ballroom" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Ballroom</button>
              <button id="Kitchen" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Kitchen</button>
              <button id="Butler's Pantry" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Butler's Pantry</button>
              <button id="Nursery" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Nursery</button>
              <button id="Library" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Library</button>
              <button id="Dining Hall" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Dining Hall</button>
              <button id="Powder Room" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Powder Room</button>
              <button id="Study" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Study</button>
              <button id="Gallery" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Gallery</button>
              <button id="Grand Foyer" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Grand Foyer</button>
              <button id="Parlor" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Parlor</button>
              <button id="goBack">Go back</button>
            </div>
          );
      }
      else if(this.state.hidingLocation == "Observatory") {
        return (
          <div>
            <button id="constellation table" onClick={(e)=>this.treasureHiddenByGhoul(e)}>consteallation table</button>
            <button id="telescope" onClick={(e)=>this.treasureHiddenByGhoul(e)}>telescope</button>
            <button id="astronomy book pile" onClick={(e)=>this.treasureHiddenByGhoul(e)}>astronomy book pile</button>
            <button id="mechanical lever box" onClick={(e)=>this.treasureHiddenByGhoul(e)}>mechanical lever box</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Courtyard") {
        return (
          <div>
            <button id="fountain" onClick={(e)=>this.treasureHiddenByGhoul(e)}>fountain</button>
            <button id="hedge" onClick={(e)=>this.treasureHiddenByGhoul(e)}>hedge</button>
            <button id="lamps" onClick={(e)=>this.treasureHiddenByGhoul(e)}>lamps</button>
            <button id="statue" onClick={(e)=>this.treasureHiddenByGhoul(e)}>statue</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Cellar") {
        return (
          <div>
            <button id="barrels" onClick={(e)=>this.treasureHiddenByGhoul(e)}>barrels</button>
            <button id="wine glass cabinet" onClick={(e)=>this.treasureHiddenByGhoul(e)}>wine glass cabinet</button>
            <button id="coal heap" onClick={(e)=>this.treasureHiddenByGhoul(e)}>coal heap</button>
            <button id="wine rack" onClick={(e)=>this.treasureHiddenByGhoul(e)}>wine rack</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Armory") {
        return (
          <div>
            <button id="suit of armor" onClick={(e)=>this.treasureHiddenByGhoul(e)}>suit of armor</button>
            <button id="winchester rack" onClick={(e)=>this.treasureHiddenByGhoul(e)}>winchester rack</button>
            <button id="cauldron" onClick={(e)=>this.treasureHiddenByGhoul(e)}>cauldron</button>
            <button id="sword display" onClick={(e)=>this.treasureHiddenByGhoul(e)}>sword display</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Master Bedroom") {
        return (
          <div>
            <button id="mattress" onClick={(e)=>this.treasureHiddenByGhoul(e)}>mattress</button>
            <button id="storage chest" onClick={(e)=>this.treasureHiddenByGhoul(e)}>storage chest</button>
            <button id="nightstand" onClick={(e)=>this.treasureHiddenByGhoul(e)}>nightstand</button>
            <button id="curtains" onClick={(e)=>this.treasureHiddenByGhoul(e)}>curtains</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Ballroom") {
        return (
          <div>
            <button id="chandelier" onClick={(e)=>this.treasureHiddenByGhoul(e)}>chandelier</button>
            <button id="violin" onClick={(e)=>this.treasureHiddenByGhoul(e)}>violin</button>
            <button id="cello" onClick={(e)=>this.treasureHiddenByGhoul(e)}>cello</button>
            <button id="refreshments table" onClick={(e)=>this.treasureHiddenByGhoul(e)}>refreshments table</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Kitchen") {
        return (
          <div>
            <button id="oven" onClick={(e)=>this.treasureHiddenByGhoul(e)}>oven</button>
            <button id="cabinets" onClick={(e)=>this.treasureHiddenByGhoul(e)}>cabinets</button>
            <button id="waste bin" onClick={(e)=>this.treasureHiddenByGhoul(e)}>waste bin</button>
            <button id="prep table" onClick={(e)=>this.treasureHiddenByGhoul(e)}>prep table</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Butler's Pantry") {
        return (
          <div>
            <button id="serving cart" onClick={(e)=>this.treasureHiddenByGhoul(e)}>serving cart</button>
            <button id="freezer" onClick={(e)=>this.treasureHiddenByGhoul(e)}>freezer</button>
            <button id="spice rack" onClick={(e)=>this.treasureHiddenByGhoul(e)}>spice rack</button>
            <button id="silverware drawer" onClick={(e)=>this.treasureHiddenByGhoul(e)}>silverware drawer</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Nursery") {
        return (
          <div>
            <button id="crib" onClick={(e)=>this.treasureHiddenByGhoul(e)}>crib</button>
            <button id="mobile" onClick={(e)=>this.treasureHiddenByGhoul(e)}>mobile</button>
            <button id="rocking horse" onClick={(e)=>this.treasureHiddenByGhoul(e)}>rocking horse</button>
            <button id="diaper bag" onClick={(e)=>this.treasureHiddenByGhoul(e)}>diaper bag</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Library") {
        return (
          <div>
            <button id="history book pile" onClick={(e)=>this.treasureHiddenByGhoul(e)}>history book pile</button>
            <button id="elephant ladder" onClick={(e)=>this.treasureHiddenByGhoul(e)}>elephant ladder</button>
            <button id="study desk" onClick={(e)=>this.treasureHiddenByGhoul(e)}>study desk</button>
            <button id="bookshelf" onClick={(e)=>this.treasureHiddenByGhoul(e)}>bookshelf</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Dining Hall") {
        return (
          <div>
            <button id="wine and cheese cart" onClick={(e)=>this.treasureHiddenByGhoul(e)}>wine and cheese cart</button>
            <button id="the chocolate cake" onClick={(e)=>this.treasureHiddenByGhoul(e)}>the chocolate cake</button>
            <button id="silver dome serving tray" onClick={(e)=>this.treasureHiddenByGhoul(e)}>silver dome serving tray</button>
            <button id="intermediate oven" onClick={(e)=>this.treasureHiddenByGhoul(e)}>intermediate oven</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Powder Room") {
        return (
          <div>
            <button id="toilet" onClick={(e)=>this.treasureHiddenByGhoul(e)}>toilet</button>
            <button id="powder tin" onClick={(e)=>this.treasureHiddenByGhoul(e)}>powder tin</button>
            <button id="medicine cabinet" onClick={(e)=>this.treasureHiddenByGhoul(e)}>medicine cabinet</button>
            <button id="hamper" onClick={(e)=>this.treasureHiddenByGhoul(e)}>hamper</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Study") {
        return (
          <div>
            <button id="side table drawer" onClick={(e)=>this.treasureHiddenByGhoul(e)}>side table drawer</button>
            <button id="desk" onClick={(e)=>this.treasureHiddenByGhoul(e)}>desk</button>
            <button id="safe" onClick={(e)=>this.treasureHiddenByGhoul(e)}>safe</button>
            <button id="bookshelf" onClick={(e)=>this.treasureHiddenByGhoul(e)}>bookshelf</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Gallery") {
        return (
          <div>
            <button id="bust" onClick={(e)=>this.treasureHiddenByGhoul(e)}>bust</button>
            <button id="17th century Rembrandt" onClick={(e)=>this.treasureHiddenByGhoul(e)}>17th century Rembrandt</button>
            <button id="tapestry" onClick={(e)=>this.treasureHiddenByGhoul(e)}>tapestry</button>
            <button id="podium" onClick={(e)=>this.treasureHiddenByGhoul(e)}>podium</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Grand Foyer") {
        return (
          <div>
            <button id="chandelier" onClick={(e)=>this.treasureHiddenByGhoul(e)}>chandelier</button>
            <button id="stairwell" onClick={(e)=>this.treasureHiddenByGhoul(e)}>stairwell</button>
            <button id="coat rack" onClick={(e)=>this.treasureHiddenByGhoul(e)}>coat rack</button>
            <button id="fine vase" onClick={(e)=>this.treasureHiddenByGhoul(e)}>fine vase</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
      else if(this.state.hidingLocation == "Parlor") {
        return (
          <div>
            <button id="fireplace" onClick={(e)=>this.treasureHiddenByGhoul(e)}>fireplace</button>
            <button id="ashtray" onClick={(e)=>this.treasureHiddenByGhoul(e)}>ashtray</button>
            <button id="coffee table" onClick={(e)=>this.treasureHiddenByGhoul(e)}>coffee table</button>
            <button id="lampshade" onClick={(e)=>this.treasureHiddenByGhoul(e)}>lampshade</button>
            <button id="goBack" onClick={(clickEvent)=> this.updateSearchablesDuringHiding(clickEvent)}>Go back</button>
          </div>
        );
      }
    }
  }

  // used to change the searchables as the ghoul hides the treasure
  updateSearchablesDuringHiding(e) {

    this.setState({
      hidingLocation: e.target.id
    });

  }

  treasureHiddenByGhoul(e) {

    this.props.clientHelper.sendMessage(JSON.stringify({
      action: "treasure_hidden",
      location: this.state.hidingLocation,
      searchable: e.target.id,
      clientID: this.props.gameState.clientID,
      roomID: this.props.gameState.roomID
    }));
  }

  updateSearchables() {

    switch(this.props.gameState.location) {

      case "Observatory":
        this.searchable1 = "constellation table";
        this.searchable2 = "telescope";
        this.searchable3 = "astronomy book pile";
        this.searchable4 = "mechanical lever box";
      break;

      case "Courtyard":
        this.searchable1 = "fountain";
        this.searchable2 = "hedge";
        this.searchable3 = "lamps";
        this.searchable4 = "statue";
      break;

      case "Cellar":
        this.searchable1 = "barrels";
        this.searchable2 = "wine glass cabinet";
        this.searchable3 = "coal heap";
        this.searchable4 = "wine rack";
      break;

      case "Armory":
        this.searchable1 = "suit of armor";
        this.searchable2 = "winchester rack";
        this.searchable3 = "cauldron";
        this.searchable4 = "sword display";
      break;

      case "Master Bedroom":
        this.searchable1 = "mattress";
        this.searchable2 = "storage chest";
        this.searchable3 = "nightstand";
        this.searchable4 = "curtains";
      break;

      case "Ballroom":
        this.searchable1 = "chandelier";
        this.searchable2 = "violin";
        this.searchable3 = "cello";
        this.searchable4 = "refreshments table";
      break;

      case "Kitchen":
        this.searchable1 = "oven";
        this.searchable2 = "cabinets";
        this.searchable3 = "waste bin";
        this.searchable4 = "prep table";
      break;

      case "Butler's Pantry":
        this.searchable1 = "serving cart";
        this.searchable2 = "freezer";
        this.searchable3 = "spice rack";
        this.searchable4 = "silverware drawer";
      break;

      case "Nursery":
        this.searchable1 = "crib";
        this.searchable2 = "mobile";
        this.searchable3 = "rocking horse";
        this.searchable4 = "diaper bag";
      break;

      case "Library":
        this.searchable1 = "history book pile";
        this.searchable2 = "elephant ladder";
        this.searchable3 = "study desk";
        this.searchable4 = "bookshelf";
      break;

      case "Dining Hall":
        this.searchable1 = "wine and cheese cart";
        this.searchable2 = "the chocolate cake";
        this.searchable3 = "silver dome serving tray";
        this.searchable4 = "intermediate oven";
      break;

      case "Powder Room":
        this.searchable1 = "toilet";
        this.searchable2 = "powder tin";
        this.searchable3 = "medicine cabinet";
        this.searchable4 = "hamper";
      break;

      case "Study":
        this.searchable1 = "side table drawer";
        this.searchable2 = "desk";
        this.searchable3 = "safe";
        this.searchable4 = "bookshelf";
      break;

      case "Gallery":
        this.searchable1 = "bust";
        this.searchable2 = "17th century Rembrandt";
        this.searchable3 = "tapestry";
        this.searchable4 = "podium";
      break;

      case "Grand Foyer":
        this.searchable1 = "chandelier";
        this.searchable2 = "stairwell";
        this.searchable3 = "coat rack";
        this.searchable4 = "fine vase";
      break;

      case "Parlor":
        this.searchable1 = "fireplace";
        this.searchable2 = "ashtray";
        this.searchable3 = "coffee table";
        this.searchable4 = "lamp shade";
      break;

    }
  }

  checkIfTreasureFound(e) {

    if (e.target.id == this.props.treasureHidingSpot) {

      this.props.gameState.hasTreasure = true;
      console.log("Player has found the treasure!");

    }
  }
}

export default Searchables;
