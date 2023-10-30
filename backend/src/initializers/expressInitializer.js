const express = require('express');
const config = require('@config');

const app = express();

app.listen(config.app.port, () => {
  console.log(`Express rodando na porta ${config.app.port}`);
});

module.exports = app;
