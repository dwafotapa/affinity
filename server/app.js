const express = require('express');
const morgan = require('morgan');
const index = require('./routes/index');
const matches = require('./routes/matches');
const error = require('./routes/error');
const json = require('./database/matches.json');

const app = express();

// logging middleware
app.use(morgan('dev'));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
});

// routing middleware
app.use('/api', index);
app.use('/api/matches', matches);
app.use('*', error);

// sets the current user to the first user in the matches
app.set('user', json.matches[0]);  

module.exports = app;