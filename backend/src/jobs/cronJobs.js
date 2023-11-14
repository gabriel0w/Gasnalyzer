const cron = require('node-cron');
const tokenCleanup = require('./tasks/tokenCleanup');

const startAll = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Rodando a tarefa de limpeza de tokens expirados');
    await tokenCleanup();
  });
};

module.exports = { startAll };
