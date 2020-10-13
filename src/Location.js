/* The location class is a helper class that is used to get information about
location and how to update the current location within the game. */


const LOCATION_GRID = [
                        ["Observatory", "Courtyard", "Cellar", "Armory"],
                        ["Master Bedroom", "Ballroom", "Kitchen", "Butler's Pantry"],
                        ["Nursery", "Library", "Dining Hall", "Powder Room"],
                        ["Study", "Gallery", "Grand Foyer", "Parlor"],
                      ];

const STARTING_ROW = 3;
const STARTING_COL = 2;

class Location {

  constructor() {

    this.currentRow = STARTING_ROW;
    this.currentCol = STARTING_COL;
  }

  //The location the user begins at when the game starts
  getStartingLocation() {

      return LOCATION_GRID[this.currentRow][this.currentCol];

  }

  /*Accepts a param that tells you in which direction the user moved. This function
  will update the current column and row based on where the user moved.

    direction:

    0 ==> North
    1 ==> East
    2 ==> South
    3 ==> West

  */
  updateLocation(direction) {

    //I may replace direction with an enum. I will keep it as an integer for now.
    switch(this.convertNavIDtoInteger(direction)) {

      case 0:
        if(this.currentRow == 0) {
          throw "Cannot travel further North.";
        }
        else {
          this.currentRow--;
        }
      break;


      case 1:
        if(this.currentCol == 3) {
          throw "Cannot travel further East.";
        }
        else {
          this.currentCol++;
        }
      break;


      case 2:
        if(this.currentRow == 3) {
          throw "Cannot travel further South.";
        }
        else {
          this.currentRow++;
        }
      break;


      case 3:
        if(this.currentCol == 0) {
          throw "Cannot travel further West.";
        }
        else {
          this.currentCol--;
        }
      break;

    }

  }


  // returns the next location to the caller based on the user's previous movement
  getNextLocation(direction) {

    this.updateLocation(direction);

    return LOCATION_GRID[this.currentRow][this.currentCol];

  }


  /* The element ID of the button that is clicked is passed into the getNextLocation function.
  This ID will be used to differentiate between which button was pressed. The getNextLocation
  function expects integers so, this is a helper function to convert the element ID
  to a corresponding integer. */
  convertNavIDtoInteger(navID) {

    if(navID == "NavN")
      return 0;
    else if(navID == "NavE")
      return 1;
    else if(navID == "NavS")
      return 2;
    else if(navID == "NavW")
      return 3;
    else
      return null;
  }

}

export default Location;
