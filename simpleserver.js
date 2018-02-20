var http = require('http');
var clientCounter = 0;
http.createServer(function (req, res) {
    clientCounter++;
    console.log('Client number ['+clientCounter+'] served');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);
console.log('Node Server started');
