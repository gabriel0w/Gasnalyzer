const express = require('express');

const app = express();
const routes = require('./routes')

app.get('/', routes);

module.exports = app;