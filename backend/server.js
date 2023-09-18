require('dotenv').config();
require('module-alias/register')

const config = require('@config')
const app = require('@app')

app.listen(config.app.port, () => {
    console.log(`Servidor rodando na porta ${config.app.port}`);
  });