const express = require('express');
const morgan = require('morgan');
const index = require('./routes/index');
const matches = require('./routes/matches');
const json = require('./database/matches.json');

const app = express();

app.use(morgan('dev'));

app.use('/', index);
app.use('/matches', matches);

// sets the current user to the first user in the matches
app.set('user', json.matches[0]);

module.exports = app;