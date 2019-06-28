#!/usr/bin/env node
'use strict';

//module dependencies
var server = require('./dist/server');
var debug = require('debug')('express:server');
const fs = require('fs');
var http = require('http');
var https = require('https');
var environment = {production:false};// require('./dist/modules/base/conf/environment').environment;

//create http server
var httpPort = normalizePort(process.env.PORT || 3000);
var app = server.Server.bootstrap().app;
app.set('port', httpPort);

var httpServer;

if (environment.production) {
  console.log('Initializing HTTPS secure server');
  // Certificate
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/081392creare-hoopty.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/081392creare-hoopty.com/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/081392creare-hoopty.com/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  httpServer = https.createServer(credentials, app);

} else {
  console.log('Initializing HTTP server');
  httpServer = http.createServer(app);

}

//listen on provided ports
httpServer.listen(httpPort);

//add error handler
httpServer.on('error', onError);

//start listening on port
httpServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind =
    typeof httpPort === 'string' ? 'Pipe ' + httpPort : 'Port ' + httpPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
