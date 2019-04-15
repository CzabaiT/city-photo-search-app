const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const citySearch = require('./routes/citysearch');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// Set favicon
app.use(favicon(path.join(__dirname, 'dist/city-photo-search-app/favicon.ico')));

// Setting Angular for default route
app.use(express.static(path.join(__dirname, 'dist/city-photo-search-app')));

// City searcher endpoint
app.get('/citysearch', citySearch);

// Handling other endpoints as not implemented
app.all('*', function (req, res, next) {
  next(new Error('not implemented'));
});

// Error handling
app.use(function (err, req, res, next) {
  const error = {
    'missing searchTerm': {
      statusCode: 400,
      message: 'Provide searchTerm in query string'
    },
    'not implemented': {
      statusCode: 501,
      message: 'Not implemented endpoint'
    },
    'not handled': {
      statusCode: 500,
      message: 'Oops! Something went wrong'
    }
  }[err.message || 'not handled'];

  res.status(error.statusCode).json(error);
});

module.exports = app;
