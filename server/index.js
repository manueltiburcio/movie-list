const express = require('express');
const db = require('./db');

// Middleware
const morgan = require('morgan');
const cors = require('cors');

// Router
const router = require('./routes.js');

const app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Serve the client files
app.use(express.static('client/dist'));

// Set up our routes
app.use(router);


// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
