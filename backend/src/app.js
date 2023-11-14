const express = require('express');
const config = require('@config');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.listen(config.app.port, () => {
  console.log(`Express rodando na porta ${config.app.port}`);
});

module.exports = app;
