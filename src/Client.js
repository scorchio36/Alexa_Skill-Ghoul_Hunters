const http = require('http');
const WebSocket = require('isomorphic-ws'); //isomorphic-ws must be used for WS to work in node/browser
const SERVER_PORT = 8080;

let gameComponent = null;

/* Helper class used to talk to the test server (and eventually the real server).
  This client helper class forms a websockets connection with the test server
  upon creation of the helper class. Messages can be sent once the connection is
  established with the sendMessage function */
class Client {

  constructor(hostname, GameComponent) {
    /* messageReceivedCallback is a function that will be called by the user class
    whenever the client helper receives a WS message.*/
    this.wsClient = new WebSocket(hostname);
    /* store the reference to the Game Component. We need this reference so that
    when the WS server receives an 'onmessage' event, Game Component can run it's
    own function to update the UI and state of the game. I would use the this
    keyword to just store this callback in a local variable, but I was getting an
    error. This is a workaround for now. */
    gameComponent = GameComponent;
    // Register WS state handlers with the WS client object
    this.wsClient.onerror = this.handleWS_OnError;
    this.wsClient.onopen = this.handleWS_onConnect;
    this.wsClient.onmessage = this.handleWS_onMessage;
    this.wsClient.onclose = this.handleWS_onClose;
  }

  // send a WS message to the test server
  sendMessage(message) {
      this.wsClient.send(message);
  }

  /* ===== Websockets Handlers ===== */
  handleWS_OnError(error) {
    console.log(error);
  }

  handleWS_onConnect(connection) {
    console.log("WS Client connected.");
  }

  handleWS_onClose() {
    console.log("WS Client disconnected.");
  }

  handleWS_onMessage(message) {
    gameComponent.wsClientNewMessageReceivedHandler(message.data);
  }

  // This function sends a generic HTTP GET request to my local test server
  // Params to be added: path and query (object containing query params)
  sendGETRequest() {

    const options = {
      hostname: 'localhost',
      port: SERVER_PORT,
      path: '/',
      method: 'GET'
    };

    const clientGETReq = http.request(options, function(res) {

      console.log(`STATUS CODE: ${res.statusCode}`);

    });

    clientGETReq.on('error', function(err) {
      console.log('ERROR:' + err);
    });

    clientGETReq.end();

  }

  // This function sends a generic HTTP POST request to my local test server
  sendPOSTRequest(json_payload) {

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/',
      method: 'POST',

    };

    const clientPOSTReq = http.request(options, function(res) {

      console.log(`STATUS CODE: ${res.statusCode}`);

      res.on('data', function(data) {

        process.stdout.write(data);
      });

    });

    clientPOSTReq.write(json_payload);
    clientPOSTReq.end();

    clientPOSTReq.on('error', function(err) {
      console.log('ERROR:' + err);
    });
  }
}




export default Client;
