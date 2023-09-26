const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  dialect: 'mysql', // Por exemplo, 'mysql', 'postgres', 'sqlite'
  // Outras opções de configuração, como host, port, etc.
});

module.exports = {
    Sequelize,
    sequelize
}