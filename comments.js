// create web server
var http = require('http');

// create web server
var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello, Node.js!");
});

// listen on port 8000
server.listen(8000);