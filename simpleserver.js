
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
console.log(`Server has ${numCPUs} cpu cores`);

var clientCounter = 0;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    clientCounter++;
    console.log('Client number ['+clientCounter+'] served');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
