const http = require('http');
const SERVER_PORT = 8080;

/* Helper class used to talk to the test server (and eventually the real server).
Client will send post and get requests to the server whenever changes occur in the
game state. Currently the protocol is pure HTTP. However, if time allows, I would
rather use websockets to maintain connections with the server to improve game quality
*/

class Client {


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
